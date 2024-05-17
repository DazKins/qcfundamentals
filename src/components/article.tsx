"use client";

import {
  getArticleDefinition,
  getChapterDefinition,
  getNextArticleId,
  getNextChapterId,
  getPreviousArticleId,
  getPreviousChapterId,
} from "@/course/courseStructure";
import useNav from "@/hooks/nav";
import { ReactNode } from "react";

const Article = ({ children }: { children: ReactNode }) => {
  const nav = useNav();

  const chapterId = nav.getCurrentChapterId();

  if (!chapterId) {
    throw Error("no chapter");
  }

  const articleId = nav.getCurrentArticleId();

  if (!articleId) {
    throw Error("no article");
  }

  const articleDefinition = getArticleDefinition(chapterId, articleId);
  const chapterDefinition = getChapterDefinition(chapterId);

  const nextArticleId = getNextArticleId(chapterId, articleId);
  const nextChapterId = getNextChapterId(chapterId);

  const previousArticleId = getPreviousArticleId(chapterId, articleId);
  const previousChapterId = getPreviousChapterId(chapterId);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row gap-8">
        <a href={`/chapter/${chapterId}`}>
          {"<"} Current Chapter ({chapterDefinition.title})
        </a>
        {previousArticleId &&
          (getArticleDefinition(chapterId, previousArticleId).comingSoon ? (
            <p>
              {"<"} Previous Article (
              {getArticleDefinition(chapterId, previousArticleId).title}){" "}
              <i>(Coming Soon)</i>
            </p>
          ) : (
            <a href={`/chapter/${chapterId}/article/${previousArticleId}`}>
              {"<"} Previous Article (
              {getArticleDefinition(chapterId, previousArticleId).title})
            </a>
          ))}
        {!previousArticleId &&
          previousChapterId &&
          (getChapterDefinition(previousChapterId).comingSoon ? (
            <p>
              {"<"} Previous Chapter (
              {getChapterDefinition(previousChapterId).title}){" "}
              <i>(Coming Soon)</i>
            </p>
          ) : (
            <a href={`/chapter/${previousChapterId}`}>
              {"<"} Previous Chapter (
              {getChapterDefinition(previousChapterId).title})
            </a>
          ))}
      </div>
      <h1>{articleDefinition.title}</h1>
      {children}
      {nextArticleId &&
        (getArticleDefinition(chapterId, nextArticleId).comingSoon ? (
          <p>
            {">"} Next Article (
            {getArticleDefinition(chapterId, nextArticleId).title}){" "}
            <i>(Coming Soon)</i>
          </p>
        ) : (
          <a href={`/chapter/${chapterId}/article/${nextArticleId}`}>
            {">"} Next Article (
            {getArticleDefinition(chapterId, nextArticleId).title})
          </a>
        ))}
      {!nextArticleId &&
        nextChapterId &&
        (getChapterDefinition(nextChapterId).comingSoon ? (
          <p>
            {">"} Next Chapter ({getChapterDefinition(nextChapterId).title}){" "}
            <i>(Coming Soon)</i>
          </p>
        ) : (
          <a href={`/chapter/${nextChapterId}`}>
            {">"} Next Chapter ({getChapterDefinition(nextChapterId).title})
          </a>
        ))}
    </div>
  );
};

export default Article;
