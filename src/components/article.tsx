import { ArticleDefinition } from "@/article/articleDefinitions";
import Image from "next/image";
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
      <a href="/">{"<"} Home</a>
      <h1>{articleDefinition.title}</h1>
      <h2 className="text-lightgrey">{articleDefinition.description}</h2>
      <h3 className="text-darkgrey">{articleDefinition.date.toDateString()}</h3>
      {children}
    </div>
  );
};

export default Article;
