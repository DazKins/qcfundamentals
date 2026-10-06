import { ChapterDefinitions } from "@/course/courseStructure";

export default function Home() {
  return (
    <div className="flex flex-col gap-6 items-center">
      <h1>Quantum Computing Fundamentals: a free, maths-first course</h1>
      <p>
        Learn the mathematics behind quantum computing, from complex numbers and
        linear algebra to qubits, quantum gates, entanglement and algorithms.
        Work through written explanations, equations and exercises at your own
        pace, using the notation you will encounter in textbooks and research
        papers.
      </p>
      <h2>Who is this course for?</h2>
      <p>
        Start with high-school mathematics; no previous quantum computing
        knowledge is required. The Mathematical Foundations chapter introduces
        the tools you will need. If you already know complex vector spaces,
        linear algebra and bra-ket notation, you can begin with Qubits and
        Gates.
      </p>
      <h2>What you will learn</h2>
      <ul className="list-disc list-inside self-start">
        <li>Read and use bra-ket notation to describe quantum states</li>
        <li>
          Calculate how quantum gates change single- and multi-qubit states
        </li>
        <li>
          Follow entanglement, teleportation and superdense coding protocols
        </li>
        <li>
          Work through Grover search, the quantum Fourier transform and
          Shor&apos;s algorithm
        </li>
      </ul>
      <p>
        <a href="/introduction-to-the-course">
          Start with the course introduction
        </a>
        {" or "}
        <a href="/chapter/mathematical-foundations/article/complex-numbers">
          begin the first lesson: Complex Numbers
        </a>
        .
      </p>
      <h2>Course chapters and lessons</h2>
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
