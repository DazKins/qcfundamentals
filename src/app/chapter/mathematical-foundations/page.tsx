import Chapter from "@/components/chapter";
import { getChapterPageMetadata } from "@/course/courseStructure";

const CHAPTER_ID = "mathematical-foundations";

export const metadata = getChapterPageMetadata(CHAPTER_ID);

const Page = () => {
  return (
    <Chapter>
      <p>
        The aim of this chapter is to provide you with a strong mathematical
        grounding for the language of quantum computing. Not all of the concepts
        introduced here will be used directly, but will help get you in the
        right frame of mind for the rest of the course.
      </p>
      <p>
        If you are already familiar with the mathematical concepts outlined here
        you are welcome to skip ahead to the next chapter.
      </p>
    </Chapter>
  );
};

export default Page;
