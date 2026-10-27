import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

// Run after `npm run build` to check the rendered homepage and start links.
const html = await readFile(".next/server/app/index.html", "utf8");
const intro = await readFile(
  ".next/server/app/introduction-to-the-course.html",
  "utf8",
);
assert.equal((html.match(/<h1(?:\s[^>]*)?>/g) ?? []).length, 1);
assert.match(
  html,
  /Quantum Computing Fundamentals: a free, maths-first course/,
);
for (const heading of [
  "Who is this course for?",
  "What you will learn",
  "Course chapters and lessons",
]) {
  assert.ok(
    html.includes(`<h2>${heading}</h2>`),
    `Missing heading: ${heading}`,
  );
}
assert.match(html, /href="\/introduction-to-the-course"/);
assert.match(
  html,
  /href="\/chapter\/mathematical-foundations\/article\/complex-numbers"/,
);
assert.match(intro, /href="\/additional-materials"/);
assert.doesNotMatch(intro, /href="additionalMaterials"/);
console.log("Verified homepage headings, course positioning and start links");
