import { getPageMetadata } from "@/util/metadata";

export type ChapterId = string;

export type ChapterDefinition = {
  id: ChapterId;
  title: string;
  articles: ArticleDefinition[];
  comingSoon?: boolean;
};

export type ArticleId = string;

export type ArticleDefinition = {
  id: ArticleId;
  title: string;
  comingSoon?: boolean;
};

export const ChapterDefinitions: ChapterDefinition[] = [
  {
    id: "mathematical-foundations",
    title: "Mathematical Foundations",
    articles: [
      {
        title: "Groups",
        id: "groups",
      },
      {
        title: "Fields",
        id: "fields",
        comingSoon: false,
      },
      {
        title: "Vector Spaces",
        id: "vector-spaces",
        comingSoon: true,
      },
      {
        title: "Bra-Ket Notation",
        id: "bra-ket-notation",
        comingSoon: true,
      },
      {
        title: "Tensor Product",
        id: "tensor-product",
      },
    ],
  },
  {
    id: "qubits-and-gates",
    title: "Qubits and Gates",
    articles: [
      {
        title: "Qubits",
        id: "qubits",
      },
      {
        title: "Single Qubit Gates",
        id: "single-qubit-gates",
      },
      {
        title: "Multi Qubit Gates",
        id: "multi-qubit-gates",
      },
    ],
  },
  {
    id: "use-cases",
    title: "Use Cases",
    comingSoon: true,
    articles: [
      {
        title: "Entanglement",
        id: "entanglement",
        comingSoon: true,
      },
      {
        title: "Teleportation",
        id: "teleportation",
        comingSoon: true,
      },
      {
        title: "Superdense Coding",
        id: "superdense-coding",
        comingSoon: true,
      },
    ],
  },
  {
    id: "quantum-algorithms",
    title: "Quantum Algorithms",
    comingSoon: true,
    articles: [
      {
        title: "Deutsch-Jozsa",
        id: "deutsch-jozsa",
        comingSoon: true,
      },
      {
        title: "Grover",
        id: "grover",
        comingSoon: true,
      },
      {
        title: "Order Finding",
        id: "order-finding",
        comingSoon: true,
      },
      {
        title: "Shor",
        id: "shor",
        comingSoon: true,
      },
    ],
  },
];

const chapterCount = ChapterDefinitions.length;

export const getNextChapterId = (chapterId: ChapterId): ChapterId | null => {
  const index = ChapterDefinitions.findIndex(
    (chapterDefinition) => chapterDefinition.id == chapterId
  );

  if (index < chapterCount - 1) return ChapterDefinitions[index + 1].id;

  return null;
};

export const getNextArticleId = (
  chapterId: ChapterId,
  articleId: ArticleId
): ArticleId | null => {
  const chapterDefinition = getChapterDefinition(chapterId);

  const articleDefinitions = chapterDefinition.articles;

  const articleCount = articleDefinitions.length;

  const index = articleDefinitions.findIndex(
    (articleDefinition) => articleDefinition.id == articleId
  );

  if (index < articleCount - 1) return articleDefinitions[index + 1].id;

  return null;
};

export const getPreviousChapterId = (
  chapterId: ChapterId
): ChapterId | null => {
  const index = ChapterDefinitions.findIndex(
    (chapterDefinition) => chapterDefinition.id == chapterId
  );

  if (index > 0) return ChapterDefinitions[index - 1].id;

  return null;
};

export const getPreviousArticleId = (
  chapterId: ChapterId,
  articleId: ArticleId
): ArticleId | null => {
  const chapterDefinition = getChapterDefinition(chapterId);

  const articleDefinitions = chapterDefinition.articles;

  const index = articleDefinitions.findIndex(
    (articleDefinition) => articleDefinition.id == articleId
  );

  if (index > 0) return articleDefinitions[index - 1].id;

  return null;
};

export const getChapterDefinition = (
  chapterId: ChapterId
): ChapterDefinition => {
  const chapterDefinition = ChapterDefinitions.find((chapterDefinition) => {
    return chapterDefinition.id === chapterId;
  });

  if (!chapterDefinition) {
    throw new Error(`No chapter definition found for ${chapterId}`);
  }

  return chapterDefinition;
};

export const getChapterPageMetadata = (chapterId: string) => {
  const chapterDefinition = getChapterDefinition(chapterId);

  return getPageMetadata({
    title: chapterDefinition.title,
    // image: `/chapter/${chapterDefinition.id}/header.png`,
    type: "article",
  });
};

export const getArticleDefinition = (
  chapterId: ChapterId,
  articleId: string
): ArticleDefinition => {
  const chapterDefinition = getChapterDefinition(chapterId);

  const articleDefinition = chapterDefinition.articles.find(
    (articleDefinition) => {
      return articleDefinition.id === articleId;
    }
  );

  if (!articleDefinition) {
    throw new Error(
      `No article definition found for chapter: ${chapterId} and article: ${articleId}`
    );
  }

  return articleDefinition;
};

export const getArticlePageMetadata = (
  chapterId: ChapterId,
  articleId: ArticleId
) => {
  const articleDefinition = getArticleDefinition(chapterId, articleId);

  return getPageMetadata({
    title: articleDefinition.title,
    // image: `/article/${articleDefinition.id}/header.png`,
    type: "article",
  });
};
