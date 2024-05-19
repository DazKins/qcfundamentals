"use client";

import {
  getChapterDefinition,
  getNextChapterId,
  getPreviousChapterId,
} from "@/course/courseStructure";
import useNav from "@/hooks/nav";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const Chapter = ({ children }: Props) => {
  const nav = useNav();

  const chapterId = nav.getCurrentChapterId();

  if (!chapterId) {
    throw new Error("no chapter");
  }

  const chapterDefinition = getChapterDefinition(chapterId);
  const nextChapterId = getNextChapterId(chapterId);
  const previousChapterId = getPreviousChapterId(chapterId);

  return (
    <div className="flex flex-col gap-4">
      <p>
        <a href="/">{"<"} Home</a>
      </p>
      <h1>{chapterDefinition.title}</h1>
      {children}
      <h2>Contents</h2>
      <ul className="list-inside">
        {chapterDefinition.articles.map((articleDefinition) => (
          <li key={articleDefinition.id}>
            {articleDefinition.comingSoon ? (
              <>
                {articleDefinition.title}
                <i> (coming soon)</i>
              </>
            ) : (
              <a
                href={`/chapter/${chapterDefinition.id}/article/${articleDefinition.id}`}
              >
                {articleDefinition.title}
              </a>
            )}
          </li>
        ))}
      </ul>

      <div className="flex flex-row gap-8">
        {previousChapterId &&
          (getChapterDefinition(previousChapterId).comingSoon ? (
            <p>
              {"< "}Previous Chapter (
              {getChapterDefinition(previousChapterId).title}){" "}
              <i>(Coming Soon)</i>
            </p>
          ) : (
            <a href={`/chapter/${previousChapterId}`}>
              {"< "}Previous Chapter (
              {getChapterDefinition(previousChapterId).title})
            </a>
          ))}
        {nextChapterId &&
          (getChapterDefinition(nextChapterId).comingSoon ? (
            <p>
              {"> "}Next Chapter ({getChapterDefinition(nextChapterId).title}){" "}
              <i>(Coming Soon)</i>
            </p>
          ) : (
            <a href={`/chapter/${nextChapterId}`}>
              {"> "}Next Chapter ({getChapterDefinition(nextChapterId).title})
            </a>
          ))}
      </div>
    </div>
  );
};

export default Chapter;
