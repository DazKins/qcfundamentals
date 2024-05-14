import { getPageMetadata } from "@/util/metadata";

export type ArticleDefinition = {
  title: string;
  description: string;
  document: string;
};

export const ArticleDefinitions: ArticleDefinition[] = [
  {
    title: "What is a Qubit?",
    description: "An introduction to the fundamental unit of quantum computing",
    document: "what-is-a-qubit",
  },
  {
    title: "Bra-ket notation",
    description: "Linear algebra without the matrices",
    document: "bra-ket-notation",
  },
  {
    title: "Multi-Qubit Computation",
    description: "Performing quantum computation on multiple qubits",
    document: "multi-qubit-computation",
  },
];

export const getArticleDefinition = (documentName: string): ArticleDefinition => {
  const articleDefinition = ArticleDefinitions.find((articleDefinition) => {
    return articleDefinition.document === documentName;
  });

  if (!articleDefinition) {
    throw new Error(`No article definition found for ${documentName}`);
  }

  return articleDefinition;
};

export const getArticlePageMetadata = (articleDefinition: ArticleDefinition) => {
  return getPageMetadata({
    title: articleDefinition.title,
    description: articleDefinition.description,
    image: `/article/${articleDefinition.document}/header.png`,
    type: "article",
  });
};
