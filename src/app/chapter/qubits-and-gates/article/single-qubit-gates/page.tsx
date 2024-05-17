import {
  getArticleDefinition,
  getArticlePageMetadata,
} from "@/course/courseStructure";
import Article from "@/components/article";
import InlineMathBlock from "@/components/inlineMathBlock";
import MathBlock from "@/components/mathBlock";

const CHAPTER_ID = "qubits-and-gates";
const ARTICLE_ID = "single-qubit-gates";

export const metadata = getArticlePageMetadata(CHAPTER_ID, ARTICLE_ID);

const Page = () => {
  return (
    <Article>
      <p>
        Just like in classical computers, qubits are fairly useless unless we
        can actually perform some operations on them. We can do this using
        quantum gates. Quantum gates are the quantum equivalent of classical
        logic gates. They take qubits as input and produce qubits as output. We
        can use these gates to perform complex algorithms and computations just
        like we can with classical logic gates.
      </p>
      <p>Let&apos;s take a look at some of them:</p>
      <p>
        The most basic one is the quantum{" "}
        <InlineMathBlock latex="\textmd{NOT}" /> gate that we refer to with an{" "}
        <InlineMathBlock latex="X" />. Just like the classical{" "}
        <InlineMathBlock latex="\textmd{NOT}" /> gate it takes{" "}
        <InlineMathBlock latex="\ket{0}" /> &rarr;{" "}
        <InlineMathBlock latex="\ket{1}" /> and{" "}
        <InlineMathBlock latex="\ket{1}" /> &rarr;{" "}
        <InlineMathBlock latex="\ket{0}" />. The more formal notation we&apos;ll
        use for this is: <InlineMathBlock latex="X\ket{0} = \ket{1}" /> and{" "}
        <InlineMathBlock latex="X\ket{1} = \ket{0}" />. But how does this act on
        superposition states? Quantum gates are something we call linear
        operators. The fact that they are linear means they distribute over
        addition so for superposition states we do the following:{" "}
      </p>
      <MathBlock
        latex={[
          "X(a\\ket{0} + b\\ket{1})",
          "= X(a\\ket{0}) + X(b\\ket{1})",
          "= aX\\ket{0} + bX\\ket{1}",
          "= a\\ket{1} + b\\ket{0}",
        ]}
      />
      <p>
        So the effect of the <InlineMathBlock latex="X" /> gate on a
        superposition state is to swap the coefficients{" "}
        <InlineMathBlock latex="a" /> and <InlineMathBlock latex="b" />. This,
        in effect, swaps the probabilites of observing{" "}
        <InlineMathBlock latex="\ket{0}" /> or{" "}
        <InlineMathBlock latex="\ket{1}" />.
      </p>
      <p>
        Another famous gate is the Hadamard gate (named after the mathematician
        Jacques Hadamard). This gate is useful for creating superpositions. It
        takes <InlineMathBlock latex="\ket{0}" /> &rarr;
        <InlineMathBlock latex="\frac{1}{\sqrt{2}}\ket{0} + \frac{1}{\sqrt{2}}\ket{1}" />{" "}
        and <InlineMathBlock latex="\ket{1}" /> &rarr;
        <InlineMathBlock latex="\frac{1}{\sqrt{2}}\ket{0} - \frac{1}{\sqrt{2}}\ket{1}" />
        . These 50/50 superposition states are so common that there is a special
        notation for them:
      </p>
      <MathBlock
        latex={[
          "\\ket{+} = \\frac{1}{\\sqrt{2}}\\ket{0} + \\frac{1}{\\sqrt{2}}\\ket{1}",
          "\\ket{-} = \\frac{1}{\\sqrt{2}}\\ket{0} - \\frac{1}{\\sqrt{2}}\\ket{1}",
        ]}
      />
      <p>We&apos;ll use this from now on.</p>
      <p>
        An interesting fact about the <InlineMathBlock latex="H" /> gate is that
        it is it&apos;s own inverse! By that we mean that if you apply{" "}
        <InlineMathBlock latex="H" /> twice, the qubit goes back to whatever
        state it started in. Let&apos;s validate this for{" "}
        <InlineMathBlock latex="\ket{0}" />:
      </p>
      <MathBlock
        latex={[
          "HH\\ket{0} = \\ket{0}",
          "H\\ket{+} = H(\\frac{1}{\\sqrt{2}}\\ket{0} + \\frac{1}{\\sqrt{2}}\\ket{1})",
          "= \\frac{1}{\\sqrt{2}}H\\ket{0} + \\frac{1}{\\sqrt{2}}H\\ket{1}",
          "= \\frac{1}{\\sqrt{2}}(\\frac{1}{\\sqrt{2}}\\ket{0} + \\frac{1}{\\sqrt{2}}\\ket{1}) + \\frac{1}{\\sqrt{2}}(\\frac{1}{\\sqrt{2}}\\ket{0} - \\frac{1}{\\sqrt{2}}\\ket{1})",
          "= (\\frac{1}{2}\\ket{0} + \\frac{1}{2}\\ket{1}) + (\\frac{1}{2}\\ket{0} - \\frac{1}{2}\\ket{1})",
          "= \\ket{0}",
        ]}
      />
      <p>
        This property is true for the <InlineMathBlock latex="X" /> gate and
        true for a few other common gates we haven&apos;t covered here, the{" "}
        <InlineMathBlock latex="Y" /> and <InlineMathBlock latex="Z" /> gate. It
        isn&apos;t true of all quantum gates though. The{" "}
        <InlineMathBlock latex="S" /> gate for example will only return the
        original state after 4 applications.
      </p>
      <p>At this point</p>
    </Article>
  );
};

export default Page;
