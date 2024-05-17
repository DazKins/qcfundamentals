import { ChapterDefinitions } from "@/course/courseStructure";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col gap-6 items-center">
      <p>Welcome to Quantum Computing Fundamentals.</p>
      <p>
        At the moment this website is a collection of articles I have written on
        the subject of quantum computing. In the future I hope to grow the site
        to include a more complete set of learning resources and include some
        fun and interactive tools.
      </p>
      <ul className="list-inside">
        {ChapterDefinitions.map((chapterDefinition) => (
          <li>
            {chapterDefinition.comingSoon ? (
              <>
                {chapterDefinition.title}
                <i> (coming soon)</i>
              </>
            ) : (
              <a href={`/chapter/${chapterDefinition.id}`}>
                {chapterDefinition.title}
              </a>
            )}
            <ul className="list-inside ps-10">
              {chapterDefinition.articles.map((articleDefinition) => (
                <li>
                  {articleDefinition.comingSoon ? (
                    <>
                      {articleDefinition.title}
                      <i> (coming soon)</i>
                    </>
                  ) : (
                    <a href={`/chapter/${chapterDefinition.id}/article/${articleDefinition.id}`}>
                      {articleDefinition.title}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}
