import Link from "next/link";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  chapterId: string;
  articleId: string;
};

const ArticleLink = ({ children, chapterId, articleId }: Props) => {
  return (
    <Link href={`/chapter/${chapterId}/article/${articleId}`}>{children}</Link>
  );
};

export default ArticleLink;
