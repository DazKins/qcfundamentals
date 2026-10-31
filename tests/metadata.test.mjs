import assert from "node:assert/strict";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";
import { canonicalUrl } from "../src/util/canonicalUrl.mjs";
import { canonicalLinkHeaders } from "../src/util/indexablePages.mjs";

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
    const canonical = canonicalUrl(route);
    const description = metadata.meta("description");

    assert.ok(metadata.title.trim(), `${route}: empty title`);
    assert.match(
      metadata.title,
      /QCFundamentals$/,
      `${route}: missing site name`,
    );
    // Exact string, not URL-normalized: the homepage must stay the bare origin,
    // and every other page must be that origin plus its slash-free path.
    assert.equal(metadata.canonical, canonical);
    assert.equal(metadata.meta("og:url"), canonical);
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
        title: "Dirac Bra-Ket Notation Explained | QCFundamentals",
        h1: "Dirac Bra-Ket Notation Explained",
        description:
          "Dirac bra-ket notation explained: kets are states, bras are dual vectors, the inner product is a bra acting on a ket, and an outer product is an operator.",
      },
    ],
    [
      "/chapter/mathematical-foundations/article/groups",
      {
        title: "What Is a Mathematical Group? | QCFundamentals",
        h1: "What Is a Mathematical Group?",
        description:
          "What a mathematical group is: symmetries of a triangle, then closure, associativity, an identity, inverses and a well-defined operation.",
      },
    ],
    [
      "/chapter/qubits-and-gates/article/single-qubit-gates",
      {
        title: "Pauli X, Y, Z and the Hadamard Gate | QCFundamentals",
        h1: "Pauli X, Y, Z and the Hadamard Gate",
        description:
          "How Pauli X, Y and Z and the Hadamard gate act on one qubit, with outer products, circuits and the superposition the Hadamard gate creates.",
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
        title: "CNOT and SWAP: Two-Qubit Gates | QCFundamentals",
        h1: "CNOT and SWAP: Two-Qubit Gates",
        description:
          "How the CNOT gate flips a target qubit and the SWAP gate exchanges two qubits, written as operators, and why quantum states cannot be cloned.",
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
    assert.equal(metadata.canonical, canonicalUrl(route));
  }
});

test("configured Link canonicals match the self-referencing HTML canonical", () => {
  const headers = canonicalLinkHeaders(appDirectory);
  assert.equal(headers.length, routes.length);
  const qft = "/chapter/quantum-algorithms/article/quantum-fourier-transform";
  for (const header of headers) {
    const metadata = metadataByRoute.get(header.source);
    assert.ok(metadata, `${header.source}: page was not rendered`);
    assert.equal(header.headers.length, 1);
    assert.equal(
      header.headers[0].value,
      `<${metadata.canonical}>; rel="canonical"`,
    );
  }
  assert.equal(
    metadataByRoute.get(qft).canonical,
    "https://qcfundamentals.com/chapter/quantum-algorithms/article/quantum-fourier-transform",
  );
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
