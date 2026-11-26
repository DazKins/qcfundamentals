import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";
import ts from "typescript";

const root = fileURLToPath(new URL("../../", import.meta.url));
const pagePath = join(
  root,
  "src/app/chapter/entanglement/article/superdense-coding/page.tsx",
);
const source = readFileSync(pagePath, "utf8");
const normalizedSource = source.replace(/\s+/g, " ");
const ast = ts.createSourceFile(
  pagePath,
  source,
  ts.ScriptTarget.Latest,
  true,
  ts.ScriptKind.TSX,
);
const links = [];

function visit(node) {
  if (ts.isJsxOpeningElement(node) || ts.isJsxSelfClosingElement(node)) {
    const name = node.tagName.getText(ast);
    if (name === "ArticleLink") {
      const attributes = Object.fromEntries(
        node.attributes.properties
          .filter(ts.isJsxAttribute)
          .map((attribute) => [attribute.name.text, attribute.initializer]),
      );
      links.push(
        join(
          root,
          "src/app/chapter",
          attributes.chapterId.text,
          "article",
          attributes.articleId.text,
          "page.tsx",
        ),
      );
    }
  }
  ts.forEachChild(node, visit);
}
visit(ast);

test("the opening defines superdense coding before the existing lesson", () => {
  assert.equal(ast.parseDiagnostics.length, 0);
  const opening = normalizedSource.indexOf(
    "Superdense coding sends two classical bits by transmitting one qubit",
  );
  const existing = normalizedSource.indexOf(
    "We&apos;re now getting pretty familiar with the fact that a qubit can",
  );
  assert.ok(opening >= 0, "Missing the definition");
  assert.ok(existing > opening, "Definition must come before the old opening");
  assert.ok(normalizedSource.includes("pre-shared Bell pair"));
  assert.ok(
    normalizedSource.includes(
      "Two classical bits is the limit for one transmitted qubit together with that pre-shared pair",
    ),
  );
});

test("superdense coding links the entanglement and teleportation lessons", () => {
  assert.ok(links.length >= 2);
  for (const link of links) {
    assert.ok(existsSync(link), "Broken internal link: " + link);
  }
  const targets = links.map((link) => link.split("/").slice(-2, -1)[0]);
  assert.ok(targets.includes("entanglement"));
  assert.ok(targets.includes("teleportation"));
});

test("the circuit cases and exercises are unchanged", () => {
  assert.ok(normalizedSource.includes("U_{00} = I"));
  assert.ok(normalizedSource.includes("U_{01} = X"));
  assert.ok(normalizedSource.includes("U_{10} = Z"));
  assert.ok(normalizedSource.includes("U_{11} = ZX"));
  assert.ok(normalizedSource.includes("<h2>Exercises</h2>"));
  assert.ok(normalizedSource.includes("ket{b_0b_1}"));
});
