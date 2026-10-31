import { getPageMetadata } from "@/util/metadata";

export type ChapterId = string;

export type ChapterDefinition = {
  id: ChapterId;
  // Short label used in navigation and on the homepage.
  title: string;
  description: string;
  articles: ArticleDefinition[];
  comingSoon?: boolean;
  // Document title, without the site suffix. Defaults to `${title} Overview`.
  pageTitle?: string;
  // Visible H1. Defaults to title, so navigation labels can stay short.
  heading?: string;
};

export type ArticleId = string;

export type ArticleDefinition = {
  id: ArticleId;
  // Short label used in navigation, contents lists and the homepage.
  title: string;
  description: string;
  comingSoon?: boolean;
  // Document title, without the site suffix. Defaults to title.
  pageTitle?: string;
  // Visible H1. Defaults to title, so navigation labels can stay short.
  heading?: string;
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
        pageTitle: "What Is a Mathematical Group?",
        heading: "What Is a Mathematical Group?",
        description:
          "What a mathematical group is: symmetries of a triangle, then closure, associativity, an identity, inverses and a well-defined operation.",
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
        pageTitle: "Dirac Bra-Ket Notation Explained",
        heading: "Dirac Bra-Ket Notation Explained",
        description:
          "Dirac bra-ket notation explained: kets are states, bras are dual vectors, the inner product is a bra acting on a ket, and an outer product is an operator.",
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
        pageTitle: "Pauli X, Y, Z and the Hadamard Gate",
        heading: "Pauli X, Y, Z and the Hadamard Gate",
        description:
          "How Pauli X, Y and Z and the Hadamard gate act on one qubit, with outer products, circuits and the superposition the Hadamard gate creates.",
      },
      {
        title: "Multiple Qubits",
        id: "multiple-qubits",
        pageTitle: "Multiple Qubits and Tensor Products",
        heading: "Multiple Qubits and Tensor Products",
        description:
          "How the tensor product builds a multiple-qubit state, combines quantum states and forms the computational basis, with examples.",
      },
      {
        title: "Multi Qubit Gates",
        id: "multi-qubit-gates",
        pageTitle: "CNOT and SWAP: Two-Qubit Gates",
        heading: "CNOT and SWAP: Two-Qubit Gates",
        description:
          "How the CNOT gate flips a target qubit and the SWAP gate exchanges two qubits, written as operators, and why quantum states cannot be cloned.",
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
        pageTitle: "Quantum Entanglement",
        heading: "Quantum Entanglement",
        description:
          "Quantum entanglement: how it differs from a separable state, how a circuit creates an EPR pair, and how measurement links the two qubits.",
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
      "A chapter deriving Deutsch-Jozsa, Grover search, the quantum Fourier transform, order finding and Shor's algorithm from the circuit up.",
    title: "Quantum Algorithms",
    pageTitle: "Quantum Algorithms: Deutsch-Jozsa to Shor",
    heading: "Quantum Algorithms: Deutsch-Jozsa to Shor",
    articles: [
      {
        title: "Deutsch-Jozsa",
        id: "deutsch-jozsa",
        pageTitle: "The Deutsch-Jozsa Algorithm",
        heading: "The Deutsch-Jozsa Algorithm",
        description:
          "How the Deutsch-Jozsa algorithm tells a constant function from a balanced one with a single quantum query, including an n-bit exercise.",
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
        pageTitle: "Quantum Order-Finding Algorithm",
        heading: "Quantum Order-Finding Algorithm",
        description:
          "How quantum order finding uses modular arithmetic, the quantum Fourier transform and continued fractions to recover the period Shor's algorithm needs.",
      },
      {
        title: "Shor's Algorithm",
        id: "shor",
        pageTitle: "Shor's Algorithm for Factoring",
        heading: "Shor's Algorithm for Factoring",
        description:
          "How Shor's algorithm factors a composite integer: quantum order finding supplies the period, then the greatest common divisor recovers the prime factors.",
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

  const pageTitle =
    chapterDefinition.pageTitle ?? `${chapterDefinition.title} Overview`;

  return getPageMetadata({
    title: `${pageTitle} | QCFundamentals`,
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
    title: `${articleDefinition.pageTitle ?? articleDefinition.title} | QCFundamentals`,
    description: articleDefinition.description,
    path: `/chapter/${chapterId}/article/${articleDefinition.id}`,
    image: "/qc.png",
    type: "article",
  });
};
