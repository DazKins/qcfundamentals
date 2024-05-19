import { ChapterDefinitions } from "@/course/courseStructure";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col gap-6 items-center">
      <p>Welcome to Quantum Computing Fundamentals.</p>
      <p>
        Below you'll find a complete set of learning materials for getting
        started in quantum computing. The course is divided into chapters which
        can be read however you want.
      </p>
      <p>
        <i>
          The course is not currently complete and many articles are still a WIP
        </i>
      </p>
      <ul className="list-inside">
        {ChapterDefinitions.map((chapterDefinition) => (
          <li key={chapterDefinition.id}>
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
          </li>
        ))}
      </ul>
    </div>
  );
}
