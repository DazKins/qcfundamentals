import Chapter from "@/components/chapter";
import { getChapterPageMetadata } from "@/course/courseStructure";

const CHAPTER_ID = "qubits-and-gates";

export const metadata = getChapterPageMetadata(CHAPTER_ID);

const Page = () => {
  return (
    <Chapter>
      <p>
        In this chapter we&apos;ll begin to take a look at the fundamental
        building blocks of quantum computation
      </p>
      <p>
        We&apos;ll introduce the notion of quantum bits, the fundamental unit of
        quantum information, and how we can manipulate them with gates in order
        to achieve meaninful computation.
      </p>
    </Chapter>
  );
};

export default Page;
