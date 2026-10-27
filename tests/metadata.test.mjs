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

test("the entanglement chapter overview and lesson have distinct titles", () => {
  const chapter = metadataByRoute.get("/chapter/entanglement");
  const lesson = metadataByRoute.get(
    "/chapter/entanglement/article/entanglement",
  );
  assert.ok(chapter && lesson);
  assert.match(chapter.title, /Overview/);
  assert.notEqual(chapter.title, lesson.title);
});
