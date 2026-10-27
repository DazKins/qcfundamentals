import assert from "node:assert/strict";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

// Run after `npm run build`: node --test tests/metadata.test.mjs
// Inspect rendered HTML so missing exports and Next.js metadata inheritance are
// covered as well as the shared metadata helpers. No additional test dependency.
const root = fileURLToPath(new URL("../", import.meta.url));
const appDirectory = path.join(root, "src/app");
const outputDirectory = path.join(root, ".next/server/app");
const origin = "https://qcfundamentals.com";

assert.ok(
  existsSync(outputDirectory),
  "Build the app with `npm run build` before running metadata tests.",
);

function pageRoutes(directory, segments = []) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    if (entry.isDirectory()) {
      return pageRoutes(path.join(directory, entry.name), [
        ...segments,
        entry.name,
      ]);
    }
    return entry.name === "page.tsx" ? [`/${segments.join("/")}`] : [];
  });
}

function decode(value) {
  return value.replace(
    /&(?:#(x[\da-f]+|\d+)|([a-z]+));/gi,
    (entity, code, name) => {
      if (code) {
        return String.fromCodePoint(
          code[0].toLowerCase() === "x"
            ? parseInt(code.slice(1), 16)
            : Number(code),
        );
      }
      return (
        { amp: "&", quot: '"', apos: "'", lt: "<", gt: ">" }[name] ?? entity
      );
    },
  );
}

function attributes(tag) {
  return Object.fromEntries(
    [...tag.matchAll(/([\w:-]+)="([^"]*)"/g)].map(([, key, value]) => [
      key,
      decode(value),
    ]),
  );
}

function metadataFor(route) {
  const filename = route === "/" ? "index.html" : `${route.slice(1)}.html`;
  const html = readFileSync(path.join(outputDirectory, filename), "utf8");
  const head = html.match(/<head>([\s\S]*?)<\/head>/)?.[1];
  assert.ok(head, `${route}: missing rendered head`);
  const titles = [...head.matchAll(/<title>([\s\S]*?)<\/title>/g)];
  assert.equal(titles.length, 1, `${route}: expected one title`);
  const h1s = [...html.matchAll(/<h1>([^<]*)<\/h1>/g)];
  assert.equal(h1s.length, 1, `${route}: expected one h1`);
  const tags = [...head.matchAll(/<(meta|link)\b[^>]*>/g)].map(
    ([tag, kind]) => ({
      kind,
      ...attributes(tag),
    }),
  );

  function oneTag(predicate, label, attribute) {
    const matches = tags.filter(predicate);
    assert.equal(matches.length, 1, `${route}: expected one ${label}`);
    assert.ok(matches[0][attribute]?.trim(), `${route}: empty ${label}`);
    return matches[0][attribute];
  }

  return {
    title: decode(titles[0][1]),
    h1: decode(h1s[0][1]),
    meta: (name) =>
      oneTag(
        (tag) =>
          tag.kind === "meta" && (tag.name === name || tag.property === name),
        name,
        "content",
      ),
    canonical: oneTag(
      (tag) => tag.kind === "link" && tag.rel === "canonical",
      "canonical link",
      "href",
    ),
  };
}

const routes = pageRoutes(appDirectory).sort();
const metadataByRoute = new Map();

for (const route of routes) {
  test(`${route} has complete, self-referencing search and social metadata`, () => {
    const metadata = metadataFor(route);
    metadataByRoute.set(route, metadata);
    const canonical = new URL(route, origin).href;
    const description = metadata.meta("description");

    assert.ok(metadata.title.trim(), `${route}: empty title`);
    assert.match(
      metadata.title,
      /QCFundamentals$/,
      `${route}: missing site name`,
    );
    // Next.js may omit the trailing slash on the origin-only homepage URL.
    assert.equal(new URL(metadata.canonical).href, canonical);
    assert.equal(new URL(metadata.meta("og:url")).href, canonical);
    assert.equal(metadata.meta("og:title"), metadata.title);
    assert.equal(metadata.meta("twitter:title"), metadata.title);
    assert.equal(metadata.meta("og:description"), description);
    assert.equal(metadata.meta("twitter:description"), description);
    assert.equal(metadata.meta("og:image"), `${origin}/qc.png`);
    assert.equal(metadata.meta("twitter:image"), `${origin}/qc.png`);
    assert.equal(
      metadata.meta("og:type"),
      route.startsWith("/chapter/") ? "article" : "website",
    );
  });
}

test("all page titles and descriptions are unique", () => {
  assert.equal(
    metadataByRoute.size,
    routes.length,
    "Every discovered page must be checked",
  );
  const titles = new Set();
  const descriptions = new Set();
  for (const [route, metadata] of metadataByRoute) {
    assert.ok(!titles.has(metadata.title), `${route}: duplicate title`);
    const description = metadata.meta("description");
    assert.ok(
      !descriptions.has(description),
      `${route}: duplicate description`,
    );
    titles.add(metadata.title);
    descriptions.add(description);
  }
});

test("high-impression pages use query-aligned titles, descriptions and headings", () => {
  const expected = new Map([
    [
      "/chapter/mathematical-foundations/article/bra-ket-notation",
      {
        title: "Bra-Ket Notation for Quantum Computing | QCFundamentals",
        h1: "Bra-Ket Notation for Quantum Computing",
        description:
          "Dirac bra-ket notation for quantum computing: what a bra and a ket represent, how the inner product is written, and how outer products represent operators.",
      },
    ],
    [
      "/chapter/mathematical-foundations/article/groups",
      {
        title: "Mathematical Groups | QCFundamentals",
        h1: "Mathematical Groups",
        description:
          "What a mathematical group is, using rotations and reflections of a triangle, then closure, associativity, the identity and inverses.",
      },
    ],
    [
      "/chapter/qubits-and-gates/article/single-qubit-gates",
      {
        title: "Single-Qubit Gates: Pauli and Hadamard | QCFundamentals",
        h1: "Single-Qubit Gates: Pauli and Hadamard",
        description:
          "How the Pauli X, Y and Z gates and the Hadamard gate change a single-qubit state, with circuit diagrams and outer products.",
      },
    ],
    [
      "/chapter/qubits-and-gates/article/multiple-qubits",
      {
        title: "Multiple Qubits and Tensor Products | QCFundamentals",
        h1: "Multiple Qubits and Tensor Products",
        description:
          "How the tensor product builds a multiple-qubit state, combines quantum states and forms the computational basis, with examples.",
      },
    ],
    [
      "/chapter/qubits-and-gates/article/multi-qubit-gates",
      {
        title: "Multi-Qubit Gates: CNOT and SWAP | QCFundamentals",
        h1: "Multi-Qubit Gates: CNOT and SWAP",
        description:
          "How CNOT and SWAP act on two qubits, how to write those gates as linear operators, and why the no-cloning theorem holds.",
      },
    ],
    [
      "/chapter/entanglement/article/entanglement",
      {
        title: "Quantum Entanglement | QCFundamentals",
        h1: "Quantum Entanglement",
        description:
          "Quantum entanglement: how it differs from a separable state, how a circuit creates an EPR pair, and how measurement links the two qubits.",
      },
    ],
    [
      "/chapter/quantum-algorithms",
      {
        title: "Quantum Algorithms: Deutsch-Jozsa to Shor | QCFundamentals",
        h1: "Quantum Algorithms: Deutsch-Jozsa to Shor",
        description:
          "A chapter deriving Deutsch-Jozsa, Grover search, the quantum Fourier transform, order finding and Shor's algorithm from the circuit up.",
      },
    ],
    [
      "/chapter/quantum-algorithms/article/deutsch-jozsa",
      {
        title: "The Deutsch-Jozsa Algorithm | QCFundamentals",
        h1: "The Deutsch-Jozsa Algorithm",
        description:
          "How the Deutsch-Jozsa algorithm tells a constant function from a balanced one with a single quantum query, including an n-bit exercise.",
      },
    ],
    [
      "/chapter/quantum-algorithms/article/order-finding",
      {
        title: "Quantum Order-Finding Algorithm | QCFundamentals",
        h1: "Quantum Order-Finding Algorithm",
        description:
          "How quantum order finding uses modular arithmetic, the quantum Fourier transform and continued fractions to recover the period Shor's algorithm needs.",
      },
    ],
    [
      "/chapter/quantum-algorithms/article/shor",
      {
        title: "Shor's Algorithm for Factoring | QCFundamentals",
        h1: "Shor's Algorithm for Factoring",
        description:
          "How Shor's algorithm factors a composite integer: quantum order finding supplies the period, then the greatest common divisor recovers the prime factors.",
      },
    ],
  ]);

  for (const [route, page] of expected) {
    const metadata = metadataByRoute.get(route);
    assert.ok(metadata, `${route}: page was not rendered`);
    assert.equal(metadata.title, page.title);
    assert.equal(metadata.h1, page.h1);
    assert.equal(metadata.meta("description"), page.description);
    assert.ok(
      page.description.length <= 160,
      `${route}: description is ${page.description.length} characters`,
    );
    assert.equal(new URL(metadata.canonical).href, new URL(route, origin).href);
  }
});

test("the entanglement chapter overview and lesson have distinct titles", () => {
  const chapter = metadataByRoute.get("/chapter/entanglement");
  const lesson = metadataByRoute.get(
    "/chapter/entanglement/article/entanglement",
  );
  assert.ok(chapter && lesson);
  assert.match(chapter.title, /Overview/);
  assert.notEqual(chapter.title, lesson.title);
});
