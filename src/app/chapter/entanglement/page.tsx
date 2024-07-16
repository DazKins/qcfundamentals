import Chapter from "@/components/chapter";
import { getChapterPageMetadata } from "@/course/courseStructure";

const CHAPTER_ID = "entanglement";

export const metadata = getChapterPageMetadata(CHAPTER_ID);

const Page = () => {
  return (
    <Chapter>
      <p>
        Now we&apos;ve covered some of the basic principles of quantum computing,
        we&apos;ll look at one of the most important and interesting phenomena in
        quantum mechanics: entanglement. Entanglement will be central to many of
        the applications/algorithms we will study later.
      </p>
      <p>
        We&apos;ll also begin to study some of the ways in which these quantum
        effects can be practically used in the real world.
      </p>
    </Chapter>
  );
};

export default Page;
