import assert from "node:assert/strict";
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

// Run after `npm run build` to verify the actual metadata route output.
async function pagePaths(directory = "src/app") {
  const routes = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const file = path.join(directory, entry.name);
    if (entry.isDirectory()) routes.push(...(await pagePaths(file)));
    else if (entry.name === "page.tsx") {
      routes.push(`/${path.relative("src/app", directory)}`);
    }
  }
  return routes;
}

const xml = await readFile(".next/server/app/sitemap.xml.body", "utf8");
const robots = await readFile(".next/server/app/robots.txt.body", "utf8");
const locations = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(
  (match) => match[1],
);
const expected = (await pagePaths()).map(
  (route) => new URL(route, "https://qcfundamentals.com").href,
);
assert.match(
  xml,
  /<urlset xmlns="http:\/\/www.sitemaps.org\/schemas\/sitemap\/0.9">/,
);
assert.equal(
  new Set(locations).size,
  locations.length,
  "Duplicate sitemap URL",
);
assert.deepEqual(
  locations.sort(),
  expected.sort(),
  "Sitemap must match real pages",
);
assert.match(robots, /User-Agent: \*/i);
assert.match(robots, /Allow: \/(?:\r?\n|$)/);
assert.match(robots, /Sitemap: https:\/\/qcfundamentals.com\/sitemap.xml/);
assert.doesNotMatch(robots, /Disallow: \/(?:\r?\n|$)/);
console.log(`Verified ${locations.length} sitemap URLs and robots.txt`);
