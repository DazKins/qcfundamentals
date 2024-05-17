import {
  getArticleDefinition,
  getArticlePageMetadata,
} from "@/course/courseStructure";
import Article from "@/components/article";
import InlineMathBlock from "@/components/inlineMathBlock";
import MathBlock from "@/components/mathBlock";

const CHAPTER_ID = "qubits-and-gates";
const ARTICLE_ID = "multi-qubit-gates";

export const metadata = getArticlePageMetadata(CHAPTER_ID, ARTICLE_ID);

const Page = () => {
  return (
    <Article>
      <p>
        Quantum computation isn&apos;t very
        interesting if we can only perform operations on a single qubit.
        We&apos;ll therefore want to look at how we can apply operations across
        multiple qubits.
      </p>
      <h2>Multi-Qubit Operators</h2>
      <p>
        We can also define multi-qubit operators that act on multiple qubits at
        once. A common example of this is the{" "}
        <InlineMathBlock latex="\textmd{CNOT}" /> gate (short for
        &quot;Controlled-NOT&quot;). The{" "}
        <InlineMathBlock latex="\textmd{CNOT}" /> gate is a two-qubit gate that
        flips the second qubit only if the first qubit is a 1 and leaves it
        alone otherwise:
      </p>
      <MathBlock
        latex={[
          "\\textmd{CNOT}\\ket{00} = \\ket{00}",
          "\\textmd{CNOT}\\ket{01} = \\ket{01}",
          "\\textmd{CNOT}\\ket{10} = \\ket{11}",
          "\\textmd{CNOT}\\ket{11} = \\ket{10}",
        ]}
      />
      <p>
        We can define the <InlineMathBlock latex="\textmd{CNOT}" /> gate using
        bra-ket notation:
      </p>
      <MathBlock
        latex={[
          "\\textmd{CNOT} = \\ket{00}\\bra{00} + \\ket{01}\\bra{01} + \\ket{11}\\bra{10} + \\ket{10}\\bra{11}",
        ]}
      />
      <p>
        Using some of the math we discussed earlier, we can simplify this into a
        more intuitive form:
      </p>
      <MathBlock latex="\textmd{CNOT} = \ket{0}\bra{0} \otimes I + \ket{1}\bra{1} \otimes X" />
      <p>
        Another example of a multi-qubit operator is the{" "}
        <InlineMathBlock latex="\textmd{SWAP}" /> gate. The
        <InlineMathBlock latex="\textmd{SWAP}" /> gate swaps the values of two
        qubits:
      </p>
      <MathBlock
        latex={[
          "\\textmd{SWAP}\\ket{00} = \\ket{00}",
          "\\textmd{SWAP}\\ket{01} = \\ket{10}",
          "\\textmd{SWAP}\\ket{10} = \\ket{01}",
          "\\textmd{SWAP}\\ket{11} = \\ket{11}",
        ]}
      />
      <p>And can be defined similarly:</p>
      <MathBlock
        latex={[
          "\\textmd{SWAP} = \\ket{00}\\bra{00} + \\ket{01}\\bra{10} + \\ket{10}\\bra{01} + \\ket{11}\\bra{11}",
        ]}
      />
      <p>
        This pretty much covers the basics of multi-qubit computation. You might
        be surprised to learn that we don&apos;t really use many complex
        multi-qubit gates in quantum computing since, when combined with single
        qubit gates, they are powerful enough to perform any operation we need!
      </p>
    </Article>
  );
};

export default Page;
