import { getPageMetadata } from "@/util/metadata";

export type ChapterId = string;

export type ChapterDefinition = {
  id: ChapterId;
  title: string;
  description: string;
  articles: ArticleDefinition[];
  comingSoon?: boolean;
};

export type ArticleId = string;

export type ArticleDefinition = {
  id: ArticleId;
  title: string;
  description: string;
  comingSoon?: boolean;
};

export const ChapterDefinitions: ChapterDefinition[] = [
  {
    id: "mathematical-foundations",
    description:
      "Build the mathematical foundations for quantum computing, from complex numbers, groups and fields to vector spaces, linear algebra and bra-ket notation.",
    title: "Mathematical Foundations",
    articles: [
      {
        title: "Complex Numbers",
        id: "complex-numbers",
        description:
          "Learn complex numbers for quantum computing, including arithmetic, conjugates, the complex plane, polar representation and Euler's formula, with exercises.",
      },
      {
        title: "Groups",
        id: "groups",
        description:
          "Understand mathematical groups through rotations and reflections of a triangle, then explore closure, associativity, identity and inverses with exercises.",
      },
      {
        title: "Fields",
        id: "fields",
        description:
          "Explore the axioms of mathematical fields, using arithmetic modulo three to understand addition, multiplication, inverses and distributivity.",
      },
      {
        title: "Vector Spaces",
        id: "vector-spaces",
        description:
          "Learn the rules of vector spaces, vector addition and scalar multiplication, then explore bases, linear independence, spanning sets and dimension.",
      },
      {
        title: "Linear Algebra",
        id: "linear-algebra",
        description:
          "Study linear operators and inner products for quantum computing, including orthogonality, normalisation and orthonormal bases, with worked exercises.",
      },
      {
        title: "Bra-Ket Notation",
        id: "bra-ket-notation",
        description:
          "Learn to use bras, kets, inner products and outer products, and express vectors and linear operators in the notation used throughout quantum computing.",
      },
    ],
  },
  {
    id: "qubits-and-gates",
    description:
      "Learn the building blocks of quantum computation: qubits, single-qubit gates, tensor products and multi-qubit gates, with worked examples and exercises.",
    title: "Qubits and Gates",
    articles: [
      {
        title: "Qubits",
        id: "qubits",
        description:
          "Understand qubit states, superposition and measurement probabilities, then explore the Bloch sphere, normalisation and global phase with exercises.",
      },
      {
        title: "Single Qubit Gates",
        id: "single-qubit-gates",
        description:
          "Learn how single-qubit gates act on quantum states, from the NOT and Hadamard gates to circuit diagrams and outer-product representations.",
      },
      {
        title: "Multiple Qubits",
        id: "multiple-qubits",
        description:
          "Learn how tensor products describe multiple qubits, combine quantum states and build computational bases, with worked examples and exercises.",
      },
      {
        title: "Multi Qubit Gates",
        id: "multi-qubit-gates",
        description:
          "Explore multi-qubit quantum gates, including CNOT and SWAP, and use linear operators to understand quantum circuits and the no-cloning theorem.",
      },
    ],
  },
  {
    id: "entanglement",
    description:
      "Explore quantum entanglement and its uses in quantum communication, with lessons on entangled states, quantum teleportation and superdense coding.",
    title: "Entanglement",
    articles: [
      {
        title: "Entanglement",
        id: "entanglement",
        description:
          "Learn how entangled states differ from separable states, how quantum circuits create EPR pairs, and how measurement links the outcomes of entangled qubits.",
      },
      {
        title: "Teleportation",
        id: "teleportation",
        description:
          "Follow quantum teleportation step by step, using an entangled pair, quantum gates and two classical bits to transfer an unknown qubit state.",
      },
      {
        title: "Superdense Coding",
        id: "superdense-coding",
        description:
          "Work through superdense coding: use a shared entangled pair and one transmitted qubit to communicate two classical bits, with circuit diagrams and exercises.",
      },
    ],
  },
  {
    id: "quantum-algorithms",
    description:
      "Study quantum algorithms step by step, including Deutsch-Jozsa, Grover search, the quantum Fourier transform, order finding and Shor's algorithm.",
    title: "Quantum Algorithms",
    articles: [
      {
        title: "Deutsch-Jozsa",
        id: "deutsch-jozsa",
        description:
          "Derive the Deutsch-Jozsa algorithm and learn how a quantum oracle distinguishes constant and balanced functions with one query, including an n-bit exercise.",
      },
      {
        title: "Grover Search",
        id: "grover-search",
        description:
          "Explore Grover search through quantum oracles, reflections and rotations, and derive its quadratic speedup for finding an item in an unordered list.",
      },
      {
        title: "Quantum Fourier Transform",
        id: "quantum-fourier-transform",
        description:
          "Build the quantum Fourier transform from the discrete Fourier transform, then derive its quantum circuit using Hadamard gates and controlled rotations.",
      },
      {
        title: "Order Finding",
        id: "order-finding",
        description:
          "Learn quantum order finding with modular arithmetic, the quantum Fourier transform and continued fractions, preparing for integer factorisation.",
      },
      {
        title: "Shor's Algorithm",
        id: "shor",
        description:
          "Learn how Shor's algorithm uses quantum order finding and classical greatest common divisors to factor composite integers, with a worked exercise.",
      },
    ],
  },
];

const chapterCount = ChapterDefinitions.length;

export const getNextChapterId = (chapterId: ChapterId): ChapterId | null => {
  const index = ChapterDefinitions.findIndex(
    (chapterDefinition) => chapterDefinition.id == chapterId,
  );

  if (index < chapterCount - 1) return ChapterDefinitions[index + 1].id;

  return null;
};

export const getNextArticleId = (
  chapterId: ChapterId,
  articleId: ArticleId,
): ArticleId | null => {
  const chapterDefinition = getChapterDefinition(chapterId);

  const articleDefinitions = chapterDefinition.articles;

  const articleCount = articleDefinitions.length;

  const index = articleDefinitions.findIndex(
    (articleDefinition) => articleDefinition.id == articleId,
  );

  if (index < articleCount - 1) return articleDefinitions[index + 1].id;

  return null;
};

export const getPreviousChapterId = (
  chapterId: ChapterId,
): ChapterId | null => {
  const index = ChapterDefinitions.findIndex(
    (chapterDefinition) => chapterDefinition.id == chapterId,
  );

  if (index > 0) return ChapterDefinitions[index - 1].id;

  return null;
};

export const getPreviousArticleId = (
  chapterId: ChapterId,
  articleId: ArticleId,
): ArticleId | null => {
  const chapterDefinition = getChapterDefinition(chapterId);

  const articleDefinitions = chapterDefinition.articles;

  const index = articleDefinitions.findIndex(
    (articleDefinition) => articleDefinition.id == articleId,
  );

  if (index > 0) return articleDefinitions[index - 1].id;

  return null;
};

export const getChapterDefinition = (
  chapterId: ChapterId,
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
    title: `${chapterDefinition.title} Overview | QCFundamentals`,
    description: chapterDefinition.description,
    path: `/chapter/${chapterDefinition.id}`,
    image: "/qc.png",
    type: "article",
  });
};

export const getArticleDefinition = (
  chapterId: ChapterId,
  articleId: string,
): ArticleDefinition => {
  const chapterDefinition = getChapterDefinition(chapterId);

  const articleDefinition = chapterDefinition.articles.find(
    (articleDefinition) => {
      return articleDefinition.id === articleId;
    },
  );

  if (!articleDefinition) {
    throw new Error(
      `No article definition found for chapter: ${chapterId} and article: ${articleId}`,
    );
  }

  return articleDefinition;
};

export const getArticlePageMetadata = (
  chapterId: ChapterId,
  articleId: ArticleId,
) => {
  const articleDefinition = getArticleDefinition(chapterId, articleId);

  return getPageMetadata({
    title: `${articleDefinition.title} | QCFundamentals`,
    description: articleDefinition.description,
    path: `/chapter/${chapterId}/article/${articleDefinition.id}`,
    image: "/qc.png",
    type: "article",
  });
};
