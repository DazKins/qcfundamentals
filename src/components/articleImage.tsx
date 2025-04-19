"use client";

import useNav from "@/hooks/nav";
import Image, { StaticImageData } from "next/image";

type Props = {
  src: string | StaticImageData;
  alt: string;
};

const ArticleImage = ({src, alt}: Props) => {
  const nav = useNav();

  const chapterId = nav.getCurrentChapterId();

  if (!chapterId) {
    throw Error("no chapter");
  }

  const articleId = nav.getCurrentArticleId();

  if (!articleId) {
    throw Error("no article");
  }

  return (
    <div className="w-full flex justify-center">
      <Image
        src={typeof src === "string" ? `/chapter/${chapterId}/article/${articleId}/${src}.png` : src}
        width={1000}
        height={400}
        alt={alt}
        className="rounded-default overflow-hidden"
      />
    </div>
  );
};

export default ArticleImage;
