import { ArticleDefinition } from "@/article/articleDefinitions";
import { ReactNode } from "react";

const Article = ({
  children,
  articleDefinition,
}: {
  children: ReactNode;
  articleDefinition: ArticleDefinition;
}) => {
  return (
    <div className="flex flex-col gap-4">
      <h1>{articleDefinition.title}</h1>
      <h2 className="text-lightgrey">{articleDefinition.description}</h2>
      {children}
    </div>
  );
};

export default Article;
