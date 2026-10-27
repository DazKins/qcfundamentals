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
  "src/app/chapter/mathematical-foundations/article/bra-ket-notation/page.tsx",
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

test("lesson has valid TSX, learning sections, and real H2 headings", () => {
  assert.equal(ast.parseDiagnostics.length, 0);
  for (const title of [
    "What you will learn",
    "Prerequisites",
    "Related lessons",
  ]) {
    assert.ok(headings.includes(title), "Missing H2: " + title);
  }
  assert.ok(headings.length >= 9);
  assert.ok(
    normalizedSource.includes("Bra-ket notation, also called Dirac notation"),
  );
});

test("all lesson links point to existing internal pages", () => {
  assert.ok(links.length >= 7);
  for (const link of links)
    assert.ok(existsSync(link), "Broken internal link: " + link);
});

test("all lesson formulas parse with KaTeX", () => {
  assert.ok(formulas.length > 0);
  for (const formula of formulas) {
    assert.doesNotThrow(() =>
      katex.renderToString(formula.latex, {
        displayMode: formula.displayMode,
        throwOnError: true,
        // Existing multi-line display blocks intentionally use line breaks.
        strict: "ignore",
      }),
    );
  }
});

test("a d-dimensional basis uses exactly the labels 0 through d-1", () => {
  const latex = formulas.map((formula) => formula.latex);
  assert.ok(
    latex.some((formula) =>
      formula.includes("\\ket{0},\\ket{1},\\ldots,\\ket{d-1}"),
    ),
  );
  assert.ok(
    latex.some((formula) =>
      formula.includes("v_{d-1}\\ket{d-1} = \\sum_{i=0}^{d-1}"),
    ),
  );
  assert.ok(
    latex.some((formula) =>
      formula.includes("\\ket{d-1}\\bra{d-1} = \\sum_{i=0}^{d-1}"),
    ),
  );
  assert.ok(
    latex.every(
      (formula) =>
        !formula.includes("\\ket{d}") && !formula.includes("\\bra{d}"),
    ),
  );
  assert.ok(normalizedSource.includes("Distinct basis vectors are orthogonal"));
});

test("the corrected basis expansion and projector sum reproduce vectors", () => {
  for (let dimension = 1; dimension <= 8; dimension++) {
    const basis = Array.from({ length: dimension }, (_, i) =>
      Array.from({ length: dimension }, (_, j) => Number(i === j)),
    );
    const coefficients = Array.from({ length: dimension }, (_, i) => i - 2.5);
    const expansion = Array.from({ length: dimension }, (_, row) =>
      basis.reduce((sum, ket, i) => sum + coefficients[i] * ket[row], 0),
    );
    const identity = Array.from({ length: dimension }, (_, row) =>
      Array.from({ length: dimension }, (_, column) =>
        basis.reduce((sum, ket) => sum + ket[row] * ket[column], 0),
      ),
    );
    const transformed = identity.map((row) =>
      row.reduce((sum, entry, column) => sum + entry * coefficients[column], 0),
    );
    assert.deepEqual(expansion, coefficients);
    assert.deepEqual(transformed, coefficients);
  }
});

test("Pauli multiplication follows cyclic rather than alphabetical order", () => {
  assert.ok(
    formulas.some(({ latex }) => latex === "XY=iZ,\\quad YZ=iX,\\quad ZX=iY"),
  );
  assert.ok(!normalizedSource.includes("alphabetical order"));
  const x = [
    [
      [0, 0],
      [1, 0],
    ],
    [
      [1, 0],
      [0, 0],
    ],
  ];
  const y = [
    [
      [0, 0],
      [0, -1],
    ],
    [
      [0, 1],
      [0, 0],
    ],
  ];
  const z = [
    [
      [1, 0],
      [0, 0],
    ],
    [
      [0, 0],
      [-1, 0],
    ],
  ];
  const multiply = (a, b) =>
    a.map((row) =>
      b[0].map((_, column) =>
        row.reduce(
          ([real, imaginary], [leftReal, leftImaginary], index) => [
            real +
              leftReal * b[index][column][0] -
              leftImaginary * b[index][column][1],
            imaginary +
              leftReal * b[index][column][1] +
              leftImaginary * b[index][column][0],
          ],
          [0, 0],
        ),
      ),
    );
  const scaleByI = (matrix, sign) =>
    matrix.map((row) =>
      row.map(([real, imaginary]) => [
        -sign * imaginary || 0,
        sign * real || 0,
      ]),
    );
  for (const [first, second, remaining] of [
    [x, y, z],
    [y, z, x],
    [z, x, y],
  ]) {
    assert.deepEqual(multiply(first, second), scaleByI(remaining, 1));
    assert.deepEqual(multiply(second, first), scaleByI(remaining, -1));
  }
});
