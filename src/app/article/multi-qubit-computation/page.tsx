import {
  getArticleDefinition,
  getArticlePageMetadata,
} from "@/article/articleDefinitions";
import Article from "@/components/article";
import InlineMathBlock from "@/components/inlineMathBlock";
import MathBlock from "@/components/mathBlock";

const DOCUMENT_NAME = "multi-qubit-computation";
const ARTICLE_DEFINITION = getArticleDefinition(DOCUMENT_NAME);

export const metadata = getArticlePageMetadata(ARTICLE_DEFINITION);

const Page = () => {
  return (
    <Article articleDefinition={ARTICLE_DEFINITION}>
      <i>
        If you haven&apos;t already, I&apos;d recommend reading the articles on{" "}
        <a href="/article/what-is-a-qubit">single qubits</a> and{" "}
        <a href="/article/bra-ket-notation">bra-ket notation</a> first.
      </i>
      <p>
        Just like classical computation, quantum computation isn&apos;t very
        interesting if we can only perform operations on a single qubit.
        We&apos;ll therefore want to look at how we can apply operations across
        multiple qubits.
      </p>
      <p>
        In order to achieve this we&apos;ll first start by adding some new
        tooling to our mathematical toolbox. We&apos;ll introduce the concept of
        a tensor product, which will allow us to combine multiple qubits into a
        single system.
      </p>
      <h2>Tensor Product</h2>
      <p>
        Normally, we use <InlineMathBlock latex="\ket{0}" /> and{" "}
        <InlineMathBlock latex="\ket{1}" /> to represent our quantum 1s and 0s.
        Whenever dealing with multipled qubits, we&apos;ll apply something
        called the tensor product to &quot;attach&quot; them together and
        represent the state of the whole system:
      </p>
      <MathBlock latex="\ket{0} \otimes \ket{0}" />
      <p>
        As we work with more equations (and eventually more qubits) writing out
        the <InlineMathBlock latex="\otimes" /> symbol will get tiresome, so
        notationally it proves useful to write it like this:
      </p>
      <MathBlock
        latex={[
          "\\ket{0} \\otimes \\ket{0} = \\ket{00}",
          "\\bra{0} \\otimes \\bra{0} = \\bra{00}",
          "\\ket{0}\\bra{0} \\otimes \\ket{0}\\bra{0} = \\ket{00}\\bra{00}",
        ]}
      />
      <p>
        This also fits better our intuition about a strings of 1s and 0s forming
        a base 2 binary number. A fact that will be very important when
        performing any kind of numberical operation.
      </p>
      <p>
        The tensor product acts a bit like a normal product but in bra-ket
        notation we have many objects other than numbers. Here are the rules
        that define the tensor product:
      </p>
      <h3>Scalar Distribution</h3>
      <MathBlock latex="k(\ket{a} \otimes \ket{b}) = (k\ket{a}) \otimes \ket{b} = \ket{a} \otimes (k\ket{b})" />
      <p>
        It&apos;s very important to note that the scalar value doesn&apos;t
        distribute across both kets like a normal product. Instead, it only
        applies to one of the kets.
      </p>
      <h3>Linearity</h3>
      <MathBlock latex="\ket{a} \otimes (\ket{b} + \ket{c}) = \ket{a} \otimes \ket{b} + \ket{a} \otimes \ket{c}" />
      <p>
        The tensor product distributes on the right and left in the same way
        like this.
      </p>
      <h3>Operator Tensor Product</h3>
      <p>We will also define a tensor product on operators as such:</p>
      <MathBlock latex="(A \otimes B)(\ket{v} \otimes \ket{w}) = A\ket{v} \otimes B\ket{w}" />
      <p>
        This rule will allow us to apply single qubit operations to individual
        qubits in a multi-qubit system. For example, applying two separate
        Hadamard gates to two qubits:
      </p>
      <MathBlock
        latex={[
          "(H \\otimes H)(\\ket{0} \\otimes \\ket{0})",
          "= H\\ket{0} \\otimes H\\ket{0}",
          "= \\frac{1}{\\sqrt{2}}(\\ket{0} + \\ket{1}) \\otimes \\frac{1}{\\sqrt{2}}(\\ket{0} + \\ket{1})",
          "= \\frac{1}{2}(\\ket{00} + \\ket{01} + \\ket{10} + \\ket{11})",
        ]}
      />
      <p>
        So this shows us that applying a Hadamard gate to two qubits will put
        them into a superposition of all possible states of those two qubits.
        Each qubit can take <InlineMathBlock latex="2" /> values, so combined
        the total number of states is
        <InlineMathBlock latex="2^2 = 4" />. It&apos;s fairly easy to see that
        applying a Hadamard gate to
        <InlineMathBlock latex="n" /> qubits will put them into a superposition
        of all
        <InlineMathBlock latex="2^n" /> states of those qubits.
      </p>
      <h3>Bra Tensor Product</h3>
      <p>
        Now we have an operator tensor product defined, we can also define the
        tensor product between bras and kets:
      </p>
      <MathBlock
        latex={[
          "(\\bra{a} \\otimes \\bra{b})(\\ket{c} \\otimes \\ket{d}) = \\braket{a|c}\\braket{b|d}",
          "(\\ket{a} \\otimes \\ket{b})(\\bra{c} \\otimes \\bra{d}) = \\ket{a}\\bra{c} \\otimes \\ket{b}\\bra{d}",
        ]}
      />
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
