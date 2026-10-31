export const SITE_ORIGIN = "https://qcfundamentals.com";

// Absolute, slash-free preferred URL. The homepage has no path, so it stays the
// origin. Next.js emits that same origin (not origin + "/") for the root canonical.
export const canonicalUrl = (path) => {
  const withSlash = path.startsWith("/") ? path : `/${path}`;
  const normalized =
    withSlash.length > 1 && withSlash.endsWith("/")
      ? withSlash.slice(0, -1)
      : withSlash;

  return normalized === "/" ? SITE_ORIGIN : `${SITE_ORIGIN}${normalized}`;
};
