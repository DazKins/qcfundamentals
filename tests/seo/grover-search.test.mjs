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
  "src/app/chapter/quantum-algorithms/article/grover-search/page.tsx",
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
  assert.ok(headings.length >= 11);
  assert.ok(
    normalizedSource.includes(
      "Grover&apos;s algorithm is a quantum algorithm for unstructured search",
    ),
  );
});

test("all lesson links point to existing internal pages", () => {
  assert.ok(links.length >= 6);
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

test("Grover states the quadratic query advantage and its circuit assumptions", () => {
  assert.ok(normalizedSource.includes("quadratic query speedup"));
  assert.ok(!normalizedSource.includes("exponentially faster"));
  assert.ok(
    normalizedSource.includes(
      "pad the search space with non-matching candidates",
    ),
  );
  assert.ok(normalizedSource.includes("relative to the unmarked states"));
  assert.ok(
    normalizedSource.includes(
      "https://quantum.cloud.ibm.com/learning/en/courses/fundamentals-of-quantum-algorithms/grover-algorithm/introduction",
    ),
  );
});

test("Grover formulas preserve the corrected bounds, bra sum and rotation angle", () => {
  const latex = formulas.map((formula) => formula.latex);
  assert.ok(
    latex.some((formula) => formula.includes("\\sum_{x=0}^{N-1}\\ket{x}")),
  );
  assert.ok(
    latex.some((formula) => formula.includes("\\sum_{x\\neq \\omega}\\bra{x}")),
  );
  assert.ok(
    latex.some((formula) => formula.includes("\\sum_{y=0}^{N-1}\\braket{x|y}")),
  );
  assert.ok(
    latex.every((formula) => !formula.includes("\\sum_{x=0}^{N}\\ket{x}")),
  );
  assert.ok(latex.includes("(2r+1)\\theta"));
  assert.ok(latex.includes("r = \\frac{\\pi}{4\\theta} - \\frac{1}{2}"));
  assert.ok(latex.includes("r \\approx \\frac{\\pi}{4}\\sqrt{N}-\\frac{1}{2}"));
  assert.ok(latex.includes("\\sin^2((2r+1)\\theta)"));
  assert.ok(latex.every((formula) => !formula.includes("(n+1)2\\theta")));
});

test("oracle plus diffusion agrees with the corrected Grover rotation and probability", () => {
  for (const size of [2, 4, 8, 16, 32, 64]) {
    const theta = Math.asin(1 / Math.sqrt(size));
    const idealIterations = Math.PI / (4 * theta) - 0.5;
    const chosenIterations = Math.round(idealIterations);
    for (const marked of new Set([0, Math.floor(size / 3), size - 1])) {
      let state = Array(size).fill(1 / Math.sqrt(size));
      for (
        let iterations = 0;
        iterations <= chosenIterations + 2;
        iterations++
      ) {
        const angle = (2 * iterations + 1) * theta;
        assert.ok(Math.abs(state[marked] - Math.sin(angle)) < 1e-12);
        assert.ok(Math.abs(state[marked] ** 2 - Math.sin(angle) ** 2) < 1e-12);
        for (let index = 0; index < size; index++) {
          if (index !== marked) {
            assert.ok(
              Math.abs(state[index] - Math.cos(angle) / Math.sqrt(size - 1)) <
                1e-12,
            );
          }
        }
        assert.ok(
          Math.abs(
            state.reduce((sum, amplitude) => sum + amplitude ** 2, 0) - 1,
          ) < 1e-12,
        );
        state[marked] *= -1;
        const mean =
          state.reduce((sum, amplitude) => sum + amplitude, 0) / size;
        state = state.map((amplitude) => 2 * mean - amplitude);
      }
      const probability = (iterations) =>
        Math.sin((2 * iterations + 1) * theta) ** 2;
      assert.ok(
        probability(chosenIterations) + 1e-12 >=
          probability(Math.max(0, chosenIterations - 1)),
      );
      assert.ok(
        probability(chosenIterations) + 1e-12 >=
          probability(chosenIterations + 1),
      );
    }
  }
});

test("the non-solution bra sum gives the claimed inner product", () => {
  for (const size of [2, 4, 8, 16]) {
    for (let marked = 0; marked < size; marked++) {
      let overlap = 0;
      for (let x = 0; x < size; x++) {
        if (x === marked) continue;
        for (let y = 0; y < size; y++) {
          overlap += Number(x === y) / Math.sqrt((size - 1) * size);
        }
      }
      assert.ok(Math.abs(overlap - Math.sqrt((size - 1) / size)) < 1e-12);
    }
  }
});
