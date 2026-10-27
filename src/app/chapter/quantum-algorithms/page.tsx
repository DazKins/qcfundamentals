import Chapter from "@/components/chapter";
import { getChapterPageMetadata } from "@/course/courseStructure";

const CHAPTER_ID = "quantum-algorithms";

export const metadata = getChapterPageMetadata(CHAPTER_ID);

const Page = () => {
  return (
    <Chapter>
      <p>
        A quantum algorithm uses superposition and interference, and sometimes
        entanglement, to answer a specific question in fewer steps than the best
        classical method we know.
      </p>
      <p>
        Each lesson below derives one algorithm in full.{" "}
        <a href="/chapter/quantum-algorithms/article/deutsch-jozsa">
          Deutsch-Jozsa
        </a>{" "}
        separates constant and balanced functions with a single query.{" "}
        <a href="/chapter/quantum-algorithms/article/grover-search">
          Grover search
        </a>{" "}
        finds a marked item in an unordered list. The{" "}
        <a href="/chapter/quantum-algorithms/article/quantum-fourier-transform">
          quantum Fourier transform
        </a>{" "}
        is the engine of{" "}
        <a href="/chapter/quantum-algorithms/article/order-finding">
          order finding
        </a>
        , and{" "}
        <a href="/chapter/quantum-algorithms/article/shor">
          Shor&apos;s algorithm
        </a>{" "}
        turns that order into the prime factors of a composite integer.
      </p>
    </Chapter>
  );
};

export default Page;
