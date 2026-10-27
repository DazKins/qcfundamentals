import assert from "node:assert/strict";
import { readdirSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";
import ts from "typescript";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

function elementsIn(relativePath) {
  const source = ts.createSourceFile(
    relativePath,
    readFileSync(join(root, relativePath), "utf8"),
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TSX,
  );
  const elements = [];
  function visit(node) {
    if (ts.isJsxOpeningElement(node) || ts.isJsxSelfClosingElement(node)) {
      elements.push({
        tag: node.tagName.getText(source),
        attributes: Object.fromEntries(
          node.attributes.properties
            .filter(ts.isJsxAttribute)
            .map(({ name, initializer }) => [
              name.getText(source),
              initializer && ts.isStringLiteral(initializer)
                ? initializer.text
                : initializer?.getText(source),
            ]),
        ),
      });
    }
    ts.forEachChild(node, visit);
  }
  visit(source);
  return elements;
}

function tsxFiles(directory) {
  return readdirSync(join(root, directory), { withFileTypes: true }).flatMap(
    (entry) => {
      const path = join(directory, entry.name);
      return entry.isDirectory()
        ? tsxFiles(path)
        : path.endsWith(".tsx")
          ? [path]
          : [];
    },
  );
}

test("the document declares its English language", () => {
  const html = elementsIn("src/app/layout.tsx").find(
    ({ tag }) => tag === "html",
  );
  assert.equal(html?.attributes.lang, "en");
});

test("the logo names the home link", () => {
  const logo = elementsIn("src/components/topBar.tsx").find(
    ({ tag, attributes }) => tag === "Image" && attributes.src === "/logo.svg",
  );
  assert.equal(logo?.attributes.alt, "QCFundamentals home");
});

test("the Bloch sphere examples describe each state vector", () => {
  const images = elementsIn(
    "src/app/chapter/qubits-and-gates/article/qubits/page.tsx",
  ).filter(({ tag }) => tag === "Image");
  for (const [src, description] of [
    ["{bloch0Image}", /north pole.*zero state/],
    ["{bloch1Image}", /south pole.*one state/],
    ["{blockplusImage}", /positive x-axis.*equator.*plus state/],
  ]) {
    const image = images.find(({ attributes }) => attributes.src === src);
    assert.match(image?.attributes.alt ?? "", description);
  }
});

test("images have alternatives rather than filename-like labels", () => {
  let checked = 0;
  for (const file of tsxFiles("src")) {
    for (const { tag, attributes } of elementsIn(file)) {
      if (!["Image", "ArticleImage"].includes(tag)) continue;
      assert.ok(Object.hasOwn(attributes, "alt"), `${file}: missing alt`);
      const alt = attributes.alt;
      if (alt?.startsWith("{")) continue; // The shared component forwards alt.
      assert.ok(alt?.trim(), `${file}: missing image description`);
      assert.doesNotMatch(alt, /^[\w+]+(?:[-_/][\w+]+)+$/);
      assert.doesNotMatch(alt, /\.(?:png|jpe?g|svg|webp|gif)$/i);
      checked += 1;
    }
  }
  assert.ok(checked > 0, "no image alternatives were inspected");
});
