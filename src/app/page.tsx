import { ArticleDefinitions } from "@/article/articleDefinitions";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col gap-6 items-center">
      <p>Welcome to Quantum Computing Fundamentals.</p>
      <p>
        At the moment this website is a collection of articles I have written on
        the subject of quantum computing. In the future I hope to grow the site
        to include a more complete set of learning resources and include some
        fun and interactive tools.
      </p>
      {ArticleDefinitions.map((articleDefinition, index) => {
        return (
          <p key={index}>
            <a href={`/article/${articleDefinition.document}`}>
              {articleDefinition.title}
            </a>
          </p>
        );
      })}
    </div>
  );
}
