import { ArticleId, ChapterId } from "@/course/courseStructure";
import { usePathname } from "next/navigation";

type Nav = {
  getCurrentChapterId: () => ChapterId | null;
  getCurrentArticleId: () => ArticleId | null;
};

const useNav = (): Nav => {
  const pathName = usePathname();

  return {
    getCurrentChapterId: () => {
      const results = /\/chapter\/([a-z\-]*)/.exec(pathName);

      return results ? results[1] : null;
    },
    getCurrentArticleId: () => {
      const results = /\/chapter\/[a-z\-]*\/article\/([a-z\-]*)/.exec(pathName);

      return results ? results[1] : null;
    },
  };
};

export default useNav;
