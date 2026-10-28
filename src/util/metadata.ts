import type { Metadata } from "next";
import { SITE_ORIGIN, canonicalUrl } from "./canonicalUrl.mjs";

export const getPageMetadata = ({
  title,
  description,
  path,
  image,
  type,
}: {
  title: string;
  description?: string;
  // Leave unset for shared layouts so child pages never inherit a root canonical.
  path?: string;
  image?: string;
  type?: "website" | "article";
}): Metadata => {
  // Absolute self URL. A relative path depends on metadataBase resolution; an
  // absolute URL is the preferred URL Google documents for rel=canonical.
  const canonical = path ? canonicalUrl(path) : undefined;

  return {
    openGraph: {
      title: title,
      type: type ?? "website",
      url: canonical,
      images: image,
      description,
    },
    twitter: {
      title,
      images: image,
      description,
    },
    title: title,
    description,
    alternates: canonical ? { canonical } : undefined,
    metadataBase: new URL(SITE_ORIGIN),
  };
};
