import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";
import katex from "katex";
import ts from "typescript";

const root = fileURLToPath(new URL("../../", import.meta.url));
const pagePath = join(
  root,
  "src/app/chapter/quantum-algorithms/article/shor/page.tsx",
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
const headings = [];
const links = [];
const formulas = [];

function visit(node) {
  if (ts.isJsxOpeningElement(node) || ts.isJsxSelfClosingElement(node)) {
    const name = node.tagName.getText(ast);
    const attributes = Object.fromEntries(
      node.attributes.properties
        .filter(ts.isJsxAttribute)
        .map((attribute) => [attribute.name.text, attribute.initializer]),
    );
    if (name === "h2") {
      headings.push(
        node.parent.children.map((child) => child.getText(ast)).join(""),
      );
    }
    if (name === "ArticleLink") {
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
    if (name === "MathBlock" || name === "InlineMathBlock") {
      const value = attributes.latex;
      const latex = ts.isStringLiteral(value)
        ? value.text
        : ts.isArrayLiteralExpression(value.expression)
          ? value.expression.elements
              .map((element) => element.text)
              .join(" \\\\[3ex] ")
          : value.expression.text;
      formulas.push({ latex, displayMode: name === "MathBlock" });
    }
  }
  ts.forEachChild(node, visit);
}
visit(ast);

test("lesson has valid TSX, a direct answer, and real H2 headings", () => {
  assert.equal(ast.parseDiagnostics.length, 0);
  for (const title of [
    "What you will learn",
    "Prerequisites",
    "How Shor&apos;s algorithm works",
    "Why factoring matters",
    "From the order to the factors",
    "Exercise: factor 15",
    "Related lessons",
  ]) {
    assert.ok(headings.includes(title), "Missing H2: " + title);
  }
  assert.ok(
    normalizedSource.includes(
      "Shor&apos;s algorithm factors a composite integer into primes.",
    ),
  );
  assert.ok(
    !normalizedSource.includes("won&apos;t even use any quantum computing"),
  );
});

test("Shor links order finding, the QFT and the quantum-algorithms chapter", () => {
  assert.ok(links.length >= 5);
  for (const link of links) {
    assert.ok(existsSync(link), "Broken internal link: " + link);
  }
  const targets = links.map((link) => link.split("/").slice(-2, -1)[0]);
  assert.ok(targets.includes("order-finding"));
  assert.ok(targets.includes("quantum-fourier-transform"));
  assert.ok(normalizedSource.includes('href="/chapter/quantum-algorithms"'));
});

test("order finding and the QFT link back to Shor and the chapter", () => {
  const orderFinding = readFileSync(
    join(
      root,
      "src/app/chapter/quantum-algorithms/article/order-finding/page.tsx",
    ),
    "utf8",
  );
  const qft = readFileSync(
    join(
      root,
      "src/app/chapter/quantum-algorithms/article/quantum-fourier-transform/page.tsx",
    ),
    "utf8",
  );
  assert.ok(orderFinding.includes('articleId="shor"'));
  assert.ok(orderFinding.includes('articleId="quantum-fourier-transform"'));
  assert.ok(orderFinding.includes('href="/chapter/quantum-algorithms"'));
  assert.ok(!orderFinding.includes("factor prime numbers"));
  assert.ok(qft.includes('articleId="shor"'));
  assert.ok(qft.includes('articleId="order-finding"'));
  assert.ok(qft.includes('href="/chapter/quantum-algorithms"'));
});

test("all lesson formulas parse with KaTeX", () => {
  assert.ok(formulas.length > 0);
  for (const formula of formulas) {
    assert.doesNotThrow(() =>
      katex.renderToString(formula.latex, {
        displayMode: formula.displayMode,
        throwOnError: true,
        strict: "ignore",
      }),
    );
  }
});

test("the worked example factors 15 from the order of 7", () => {
  const modPow = (base, exponent, modulus) => {
    let value = 1;
    for (let i = 0; i < exponent; i++) value = (value * base) % modulus;
    return value;
  };
  const gcd = (a, b) => (b === 0 ? a : gcd(b, a % b));
  assert.equal(modPow(7, 4, 15), 1);
  assert.notEqual(modPow(7, 2, 15), 1);
  assert.equal(gcd(15, 7 ** 2 - 1), 3);
  assert.equal(gcd(15, 7 ** 2 + 1), 5);
  assert.ok(normalizedSource.includes("\\gcd(15, 48) = 3"));
  assert.ok(normalizedSource.includes("\\gcd(15, 50) = 5"));
});
