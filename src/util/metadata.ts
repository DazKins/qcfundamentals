import type { Metadata } from "next";

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
  return {
    openGraph: {
      title: title,
      type: type ?? "website",
      url: path,
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
    alternates: path ? { canonical: path } : undefined,
    metadataBase: new URL("https://qcfundamentals.com"),
  };
};
