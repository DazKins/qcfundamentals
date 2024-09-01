import Chapter from "@/components/chapter";
import { getChapterPageMetadata } from "@/course/courseStructure";

const CHAPTER_ID = "quantum-algorithms";

export const metadata = getChapterPageMetadata(CHAPTER_ID);

const Page = () => {
  return (
    <Chapter>
      <p>
        In this chapter we&apos;ll start to take a look at some interesting
        algorithms that we can run on quantum computers.
      </p>
      <p>
        We&apos;ll look at some scenarios in which quantum computers can be more
        powerful than a classical computer by being able to solve specific
        problems faster using things like superposition and entanglement.
      </p>
    </Chapter>
  );
};

export default Page;
