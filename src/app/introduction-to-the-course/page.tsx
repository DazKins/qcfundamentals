const Page = () => {
  return (
    <div className="flex flex-col gap-4">
      <h1>Introduction to the course</h1>
      <p>
        QCFundamentals is designed to give you an introduction to the
        fundamentals of quantum computing from a fairly low level.
      </p>
      <p>
        This course is intended to be accessible to anyone with a high school
        level of mathematics. However, anyone starting from a more advanced
        point can skip over the &quot;Mathematical Foundations&quot; chapter.
      </p>
      <p>
        The course is deliberately designed to take a &quot;mathematics
        first&quot; approach. This means we prioritise teaching the formal
        mathematical notation of concepts. There are many other courses out
        there that will primarily focus on visuals, animations and intuition.
        This is not wrong. We highly encourage you check them out (you can see
        them detailed in the{" "}
        <a href="additionalMaterials">Additional Materials</a> section), but the
        aim of QCFundamentals is to teach you in a way that will easily allow
        you to continue on to further study. The mathematical language/notation
        we use in the course is the same as the language used in academic papers
        and textbooks so you should be able to easily transition to reading more
        advanced materials.
      </p>
    </div>
  );
};

export default Page;
