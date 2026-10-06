import { ChapterDefinitions } from "@/course/courseStructure";
import { getPageMetadata } from "@/util/metadata";

export const metadata = getPageMetadata({
  title: "Quantum Computing Fundamentals | QCFundamentals",
  description:
    "Learn quantum computing with a mathematics-first course covering complex numbers, qubits, gates, entanglement and quantum algorithms, with worked exercises.",
  path: "/",
  image: "/qc.png",
});

export default function Home() {
  return (
    <div className="flex flex-col gap-6 items-center">
      <p>Welcome to Quantum Computing Fundamentals.</p>
      <p>
        Below you&apos;ll find a complete set of learning materials for getting
        started in quantum computing. The course is divided into chapters which
        can be read however you want.
      </p>
      <p>
        <a href="/introduction-to-the-course">Introduction to the Course</a>
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
      <p>
        <a href="/afterword-next-steps">Afterword & Next Steps</a>
      </p>
    </div>
  );
}
