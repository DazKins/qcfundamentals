import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";

const root = fileURLToPath(new URL("../../", import.meta.url));
const pagePath = join(
  root,
  "src/app/chapter/mathematical-foundations/article/vector-spaces/page.tsx",
);
const source = readFileSync(pagePath, "utf8");
const normalizedSource = source.replace(/\s+/g, " ");

test("the opening defines a vector space before the axioms", () => {
  assert.ok(
    normalizedSource.includes(
      "A vector space is a set of vectors closed under addition and under multiplication by scalars",
    ),
  );
  assert.ok(normalizedSource.includes("size of that basis is the dimension"));
  assert.ok(
    normalizedSource.includes(
      "Quantum computing writes each qubit state as a vector",
    ),
  );
  assert.ok(
    !normalizedSource.includes(
      "The next stop on our tour of abstract mathematics is vector spaces.",
    ),
  );
});
