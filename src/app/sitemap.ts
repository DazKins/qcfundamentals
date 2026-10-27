import type { MetadataRoute } from "next";
import { ChapterDefinitions } from "@/course/courseStructure";

const SITE_URL = "https://qcfundamentals.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "/",
    "/introduction-to-the-course",
    "/about",
    "/additional-materials",
    "/afterword-next-steps",
    ...ChapterDefinitions.filter((chapter) => !chapter.comingSoon).flatMap(
      (chapter) => [
        `/chapter/${chapter.id}`,
        ...chapter.articles
          .filter((article) => !article.comingSoon)
          .map((article) => `/chapter/${chapter.id}/article/${article.id}`),
      ],
    ),
  ];

  return paths.map((path) => ({ url: new URL(path, SITE_URL).href }));
}
