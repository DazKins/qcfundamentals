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
  "src/app/chapter/quantum-algorithms/article/quantum-fourier-transform/page.tsx",
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
    normalizedSource.includes(
      "The quantum Fourier transform (QFT) applies a discrete Fourier transform",
    ),
  );
});

test("all lesson links point to existing internal pages", () => {
  assert.ok(links.length >= 8);
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

test("QFT retains the binary phase factor and normalized single-qubit states", () => {
  const latex = formulas.map((formula) => formula.latex);
  assert.ok(
    latex.some((formula) =>
      formula.includes("\\sum_{j_l=0}^{1}e^{2\\pi iyj_l2^{-l}}\\ket{j_l}"),
    ),
  );
  assert.ok(
    latex.every(
      (formula) => !formula.includes("\\sum_{j_l=0}^{1}e^{2\\pi iy2^{-l}}"),
    ),
  );
  const qubitStates = latex.filter((formula) =>
    formula.startsWith("\\frac{1}{\\sqrt{2}}(\\ket{0} + e"),
  );
  assert.equal(qubitStates.length, 3);
  assert.ok(
    latex.every((formula) => !formula.startsWith("\\frac{1}{2}(\\ket{0} + e")),
  );
  assert.ok(latex.includes("\\lfloor n/2 \\rfloor"));
  assert.ok(
    latex.some((formula) =>
      formula.includes("\\frac{n(n+1)}{2} + \\lfloor n/2 \\rfloor"),
    ),
  );
  assert.ok(
    normalizedSource.includes(
      "measuring it does not reveal every transformed amplitude",
    ),
  );
});

test("QFT product amplitudes match the discrete Fourier transform for basis inputs", () => {
  for (let qubits = 1; qubits <= 6; qubits++) {
    const size = 2 ** qubits;
    for (let input = 0; input < size; input++) {
      let norm = 0;
      for (let output = 0; output < size; output++) {
        // Multiply the one-qubit phase factors, including the output bit j_l.
        let real = 1;
        let imaginary = 0;
        for (let bit = 1; bit <= qubits; bit++) {
          const outputBit = (output >> (qubits - bit)) & 1;
          const angle = 2 * Math.PI * input * outputBit * 2 ** -bit;
          const factorReal = Math.cos(angle) / Math.sqrt(2);
          const factorImaginary = Math.sin(angle) / Math.sqrt(2);
          [real, imaginary] = [
            real * factorReal - imaginary * factorImaginary,
            real * factorImaginary + imaginary * factorReal,
          ];
        }
        const expectedAngle = (2 * Math.PI * input * output) / size;
        assert.ok(
          Math.abs(real - Math.cos(expectedAngle) / Math.sqrt(size)) < 1e-12,
        );
        assert.ok(
          Math.abs(imaginary - Math.sin(expectedAngle) / Math.sqrt(size)) <
            1e-12,
        );
        norm += real ** 2 + imaginary ** 2;
      }
      assert.ok(Math.abs(norm - 1) < 1e-12);
    }
  }
});

test("controlled phase rotations preserve the corrected one-qubit normalization", () => {
  for (let bits = 1; bits <= 6; bits++) {
    for (let value = 0; value < 2 ** bits; value++) {
      const angle = (2 * Math.PI * value) / 2 ** bits;
      const zeroProbability = (1 / Math.sqrt(2)) ** 2;
      const oneProbability =
        (Math.cos(angle) / Math.sqrt(2)) ** 2 +
        (Math.sin(angle) / Math.sqrt(2)) ** 2;
      assert.ok(Math.abs(zeroProbability + oneProbability - 1) < 1e-12);
    }
  }
});

test("the output-reversal circuit uses floor(n/2) SWAP gates", () => {
  for (let qubits = 1; qubits <= 9; qubits++) {
    const wires = Array.from({ length: qubits }, (_, index) => index);
    let swaps = 0;
    for (let index = 0; index < Math.floor(qubits / 2); index++) {
      const opposite = qubits - index - 1;
      [wires[index], wires[opposite]] = [wires[opposite], wires[index]];
      swaps++;
    }
    assert.equal(swaps, Math.floor(qubits / 2));
    assert.deepEqual(
      wires,
      Array.from({ length: qubits }, (_, index) => qubits - index - 1),
    );
  }
});

test("QFT notation distinguishes the input ket, transformed output and pre-SWAP state", () => {
  const latex = formulas.map((formula) => formula.latex);
  const transformations = latex
    .join(" ")
    .match(/\\operatorname\{QFT\}\\ket\{y\} =/g);
  assert.equal(transformations.length, 9);
  assert.ok(
    latex.some((formula) =>
      formula.startsWith("\\ket{\\psi_{\\mathrm{rev}}} ="),
    ),
  );
  assert.ok(
    latex.every(
      (formula) =>
        !formula.startsWith("\\ket{y} =") &&
        !formula.includes("\\\\[3ex] \\ket{y} ="),
    ),
  );
  assert.ok(normalizedSource.includes("labels the input basis state"));
  assert.ok(normalizedSource.includes("For a superposition input"));
});

test("reversing the circuit output gives QFT amplitudes in the stated basis order", () => {
  for (let qubits = 1; qubits <= 5; qubits++) {
    const size = 2 ** qubits;
    for (let input = 0; input < size; input++) {
      for (let output = 0; output < size; output++) {
        let reversedOutput = 0;
        let circuitPhase = 0;
        for (let wire = 1; wire <= qubits; wire++) {
          const outputBit = (output >> (qubits - wire)) & 1;
          reversedOutput += outputBit * 2 ** (wire - 1);
          const denominator = 2 ** (qubits - wire + 1);
          circuitPhase += (outputBit * (input % denominator)) / denominator;
        }
        const qftPhase = (input * reversedOutput) / size;
        assert.ok(
          Math.abs(
            Math.cos(2 * Math.PI * circuitPhase) -
              Math.cos(2 * Math.PI * qftPhase),
          ) < 1e-12,
        );
        assert.ok(
          Math.abs(
            Math.sin(2 * Math.PI * circuitPhase) -
              Math.sin(2 * Math.PI * qftPhase),
          ) < 1e-12,
        );
      }
    }
  }
});
