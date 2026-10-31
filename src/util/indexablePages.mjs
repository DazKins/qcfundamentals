import { readdirSync } from "node:fs";
import path from "node:path";
import { canonicalUrl } from "./canonicalUrl.mjs";

export function indexableRoutes(appDirectory = "src/app") {
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

  return pageRoutes(appDirectory).sort();
}

// HTTP Link headers are a second self-referencing canonical signal. Google
// accepts rel=canonical in the response header as well as in HTML, and the
// value must match the <link rel="canonical"> on that page.
export function canonicalLinkHeaders(appDirectory = "src/app") {
  return indexableRoutes(appDirectory).map((route) => ({
    source: route,
    headers: [
      {
        key: "Link",
        value: `<${canonicalUrl(route)}>; rel="canonical"`,
      },
    ],
  }));
}
