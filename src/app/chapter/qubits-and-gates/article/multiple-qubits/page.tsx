import { getArticlePageMetadata } from "@/course/courseStructure";
import Article from "@/components/article";
import InlineMathBlock from "@/components/inlineMathBlock";
import MathBlock from "@/components/mathBlock";
import Exercise from "@/components/exercise";
import ArticleLink from "@/components/articleLink";

const CHAPTER_ID = "qubits-and-gates";
const ARTICLE_ID = "multiple-qubits";

export const metadata = getArticlePageMetadata(CHAPTER_ID, ARTICLE_ID);

const Page = () => {
  return (
    <Article>
      <p>
        Quite soon, we&apos;re going to need to look at systems containing more
        than one qubit. Since our definitions of qubits and gates are quite
        mathematical, we need to make sure we have a solid mathematical
        framework for representing these systems.
      </p>
      <h2>Tensor Product</h2>
      <p>
        The tensor product is a new operation we will introduce that can act
        between two vectors or operators. It is denoted by the symbol{" "}
        <InlineMathBlock latex="\otimes" />. As we deal with more and more
        qubits, writing out this <InlineMathBlock latex="\otimes" /> symbol will
        get tedious so we will add some special syntax to our{" "}
        <ArticleLink
          chapterId={"mathematical-foundations"}
          articleId={"bra-ket-notation"}
        >
          bra-ket notation
        </ArticleLink>{" "}
        for this:
      </p>
      <MathBlock latex="\ket{\psi} \otimes \ket{\phi} = \ket{\psi\phi}" />
      <p>
        This notation is useful and should remain unambiguous as long as we only
        use a single character to represent a vector, which should always be the
        case.
      </p>
      <p>
        If we have three qubits in the states{" "}
        <InlineMathBlock latex="\ket{0}" />, <InlineMathBlock latex="\ket{1}" />{" "}
        and <InlineMathBlock latex="\ket{0}" /> we will represent the combined
        state of the three qubits as the tensor product of the three:
      </p>
      <MathBlock latex="\ket{0} \otimes \ket{1} \otimes \ket{0} = \ket{010}" />
      <p>
        The result can then be thought of as a binary number, in this case
        representing the number <InlineMathBlock latex="2" />. This starts to
        give us a hint of how we will achieve more meaninful computation as we
        can see that multiple qubits can be used to represent numbers.
      </p>
      <p>
        A mathematical technicality we need to note here is how the
        dimensionality of vectors changes with this tensor product. We know that
        a single qubit has a dimension of <InlineMathBlock latex="2" /> since it
        has two basis vectors <InlineMathBlock latex="\ket{0}" /> and{" "}
        <InlineMathBlock latex="\ket{1}" />. When we tensor product two qubits
        together though we end up with 4 basis vectors:
      </p>
      <MathBlock
        latex={[
          "\\ket{\\psi} = a\\ket{0} + b\\ket{1}\\ \\ \\textmd{and}\\ \\ \\ket{\\phi} = c\\ket{0} + d\\ket{1}",
          "\\textmd{then}\\ \\ \\ket{\\psi\\phi} = \\ket{\\psi} \\otimes \\ket{\\phi} = (a\\ket{0} + b\\ket{1}) \\otimes (c\\ket{0} + d\\ket{1})",
          "= ac\\ket{0} \\otimes \\ket{0} + ad\\ket{0}\\otimes\\ket{1} + bc\\ket{1}\\otimes\\ket{0} + bd\\ket{1}\\otimes\\ket{1}",
          "= ac\\ket{00} + ad\\ket{01} + bc\\ket{10} + bd\\ket{11}",
        ]}
      />
      <p>
        This gives us the intuition that tensor producting two vectors together,
        multiplies their dimensions.
      </p>
      <p>
        Here&apos;s how we define the tensor product of gates (linear
        operators):
      </p>
      <MathBlock latex="(A \otimes B)(\ket{\phi} \otimes \ket{\psi}) = A\ket{\phi} \otimes B\ket{\psi}" />
      <p>
        So this means the tensor product of 2 1-qubit gates would simply
        represent the 2 gates acting independantly on either qubit. Let&apos;s
        look at an example of applying a Hadamard gate to one qubit and an{" "}
        <InlineMathBlock latex="X" /> gate to another:
      </p>
      <MathBlock latex="(H \otimes X)(\ket{0} \otimes \ket{0}) = H\ket{0} \otimes X\ket{0} = \ket{+} \otimes \ket{1} = \ket{+1}" />
      <p>
        There will often be times when we want to apply the same single qubit
        gate to many qubits at the same time. To do this we introduce the
        notation:
      </p>
      <MathBlock latex="A^{\otimes n} = \underbrace{A \otimes A \otimes \ldots \otimes A}_{n\ \ \text{times}}" />
      <p>
        Be careful not to confuse this with the <InlineMathBlock latex="A^n" />{" "}
        notation. This would represent applying the operator{" "}
        <InlineMathBlock latex="A" /> <InlineMathBlock latex="n" /> times on the
        same qubit.
      </p>
      <p>
        We can also use the tensor product on bras. Here&apos;s how it works on
        the inner product operation:
      </p>
      <MathBlock latex="\braket{\psi \phi | \alpha \beta} = (\bra{\psi} \otimes \bra{\phi})(\ket{\alpha} \otimes \ket{\beta}) = \braket{\psi|\alpha}\braket{\phi|\beta}" />
      <h2>Exercises</h2>
      <h3>Exercise 1</h3>
      <Exercise
        problem={
          <>
            <p>
              Show that the 4 basis vectors <InlineMathBlock latex="\ket{00}" />
              , <InlineMathBlock latex="\ket{01}" />,{" "}
              <InlineMathBlock latex="\ket{10}" /> and{" "}
              <InlineMathBlock latex="\ket{11}" /> are orthonormal
            </p>
          </>
        }
        solution={
          <>
            <h4>Normality</h4>
            <p>
              For the vector <InlineMathBlock latex="\ket{01}" />:
            </p>
            <MathBlock latex="\braket{01|01} = (\bra{0} \otimes \bra{1})(\ket{0} \otimes \ket{1}) = \braket{0|0}\braket{1|1} = 1 \times 1 = 1" />
            <p>The other vectors follow similarly.</p>
            <h4>Orthogonality</h4>
            <p>
              As an example, we will show for the vectors{" "}
              <InlineMathBlock latex="\ket{11}" /> and{" "}
              <InlineMathBlock latex="\ket{01}" />:
            </p>
            <MathBlock latex="\braket{11|01} = (\bra{1} \otimes \bra{1})(\ket{0} \otimes \ket{1}) = \braket{1|0}\braket{1|1} = 0 \times 1 = 0" />
          </>
        }
      />
      <h3>Exercise 2</h3>
      <Exercise
        problem={
          <>
            <p>
              Show that when applying <InlineMathBlock latex="H^{\otimes n}" />{" "}
              to a state of n <InlineMathBlock latex="\ket{0}" /> qubits we get
              an even super position of all n-bit binary numbers.
            </p>
          </>
        }
        solution={
          <>
            <MathBlock
              latex={[
                "H^{\\otimes n}\\ket{\\underbrace{00\\ldots 0}_{n\\ \\ \\text{times}}}",
                "= (H \\otimes H \\otimes \\ldots \\otimes H)(\\ket{0} \\otimes \\ket{0} \\otimes \\ldots \\otimes \\ket{0})",
                "= H\\ket{0} \\otimes H\\ket{0} \\otimes \\ldots \\otimes H\\ket{0}",
                "= \\ket{+} \\otimes \\ket{+} \\otimes \\ldots \\otimes \\ket{+}",
                "= \\frac{1}{\\sqrt{2}}(\\ket{0} + \\ket{1}) \\otimes \\frac{1}{\\sqrt{2}}(\\ket{0} + \\ket{1}) \\otimes \\ldots \\otimes \\frac{1}{\\sqrt{2}}(\\ket{0} + \\ket{1})",
                "= \\frac{1}{2^{n/2}}(\\ket{0} + \\ket{1}) \\otimes (\\ket{0} + \\ket{1}) \\otimes \\ldots \\otimes (\\ket{0} + \\ket{1})",
              ]}
            />
            <p>
              From this point we should understand how we expand the brackets
              here. Due to the distributivity of the tensor product, we will
              pick a ket from each bracket in turn until we have exhausted all
              possible combination of kets. Since the kets in each bracket are
              just <InlineMathBlock latex="\ket{0}" /> and{" "}
              <InlineMathBlock latex="\ket{1}" />, this means we are essentially
              choosing every possible combination of n{" "}
              <InlineMathBlock latex="0" />s and <InlineMathBlock latex="1" />
              s.
            </p>
            <p>
              There are <InlineMathBlock latex="2^n" /> different such
              combinations and each of them form an integer in base-2, so we can
              write this state as:
            </p>
            <MathBlock latex="\frac{1}{2^{n/2}}\sum_{i=0}^{2^n}\ket{i}" />
            <p>
              Although we write our computational basis states in terms of{" "}
              <InlineMathBlock latex="0" /> and <InlineMathBlock latex="1" />,
              it is quite commonplace to sometimes represent a ket with a single
              numerical value corresponding to that number&apos;s binary
              representation. e.g. <InlineMathBlock latex="\ket{3}" /> for{" "}
              <InlineMathBlock latex="\ket{11}" />.
            </p>
          </>
        }
      />
      <h3>Exercise 3</h3>
      <Exercise
        problem={
          <>
            <p>
              Given we have the 4 basis vectors for the 2-qubit system (defined
              in Exercise 1), are all possible states of the 2-qubit system
              seperable?
            </p>
            <p>
              Seperable here means that the state of the 2-qubit system can be
              written as the tensor product of two 1-qubit states.
            </p>
          </>
        }
        solution={
          <>
            <p>No!</p>
            <p>Consider the following 2-qubit state:</p>
            <MathBlock latex="\frac{1}{\sqrt{2}}(\ket{00} + \ket{11})" />
            <p>
              If we tried to equate this state to some tensor product of 2
              single qubits we would get:
            </p>
            <MathBlock
              latex={[
                "(a\\ket{0} + b\\ket{1})\\otimes (c\\ket{0} + d\\ket{1}) = \\frac{1}{\\sqrt{2}}(\\ket{00} + \\ket{11})",
                "= ac\\ket{00} + ad\\ket{01} + bc\\ket{10} + bd\\ket{11} = \\frac{1}{\\sqrt{2}}(\\ket{00} + \\ket{11})",
              ]}
            />
            <p>
              Comparing coefficients we have the following constraints:{" "}
              <InlineMathBlock latex="ac = 1" />,{" "}
              <InlineMathBlock latex="ad = 0" />,{" "}
              <InlineMathBlock latex="bc = 0" /> and{" "}
              <InlineMathBlock latex="bd = 1" />. The second constraint tells us
              either <InlineMathBlock latex="a" /> or{" "}
              <InlineMathBlock latex="d" /> must be zero. But checking the first
              constraint <InlineMathBlock latex="a" /> can&apos;t be zero and
              the fourth constraint tells us <InlineMathBlock latex="d" />{" "}
              can&apos;t be zero. This is a contradiction.
            </p>
            <p>
              This is one of the most important results in quantum computing and
              we&apos;ll discuss much more about what this state is and what it
              means when we discuss &quot;entanglement&quot;.
            </p>
          </>
        }
      />
    </Article>
  );
};

export default Page;
