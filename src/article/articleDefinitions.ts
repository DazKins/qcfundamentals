import { getPageMetadata } from "@/util/metadata";

export type ArticleDefinition = {
  title: string;
  description: string;
  document: string;
  date: Date;
};

export const ArticleDefinitions: ArticleDefinition[] = [
  {
    title: "Multi-Qubit Computation",
    description: "Performing quantum computation on multiple qubits",
    document: "multi-qubit-computation",
    date: new Date(9999, 4, 12),
  },
  {
    title: "Bra-ket notation",
    description: "Linear algebra without the matrices",
    document: "bra-ket-notation",
    date: new Date(2024, 3, 3),
  },
  {
    title: "What is a Qubit?",
    description: "An introduction to the fundamental unit of quantum computing",
    document: "what-is-a-qubit",
    date: new Date(2024, 2, 2),
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
