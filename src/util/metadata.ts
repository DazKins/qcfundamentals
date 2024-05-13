import { Metadata } from "next";

export const getPageMetadata = ({
  title,
  description,
  image,
  type,
}: {
  title: string;
  description?: string;
  image: string;
  type?: "website" | "article";
}): Metadata => {
  return {
    openGraph: {
      title: title,
      type: type ?? "website",
      images: image,
      description,
    },
    twitter: {
      title,
      images: image,
      description,
    },
    title: title,
    metadataBase: new URL("https://dazkins.com"),
  };
};
