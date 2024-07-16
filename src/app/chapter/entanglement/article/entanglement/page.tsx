import { getArticlePageMetadata } from "@/course/courseStructure";
import Article from "@/components/article";
import MathBlock from "@/components/mathBlock";
import ArticleImage from "@/components/articleImage";
import InlineMathBlock from "@/components/inlineMathBlock";
import Exercise from "@/components/exercise";

const CHAPTER_ID = "mathematical-foundations";
const ARTICLE_ID = "bra-ket-notation";

export const metadata = getArticlePageMetadata(CHAPTER_ID, ARTICLE_ID);

const Page = () => {
  return (
    <Article>
      <p>
        We&apos;ve studied how we can represent multiple qubits using the tensor
        product.
      </p>
      <p>
        Sometimes, these multi-qubit systems are what we call
        &quot;seperable&quot;. This means that the whole system can be
        represented as a tensor product of it&apos;s component qubits.
      </p>
      <p>For example, the following state is seperable:</p>
      <MathBlock latex="\frac{1}{\sqrt{2}}\ket{00} + \frac{1}{\sqrt{2}}\ket{10} = \Bigl(\frac{1}{\sqrt{2}}\ket{0} + \frac{1}{\sqrt{2}}\ket{1}\Bigr) \otimes \ket{0}" />
      <p>
        Because we can represent this 2-qubit state as the tensor product of two
        single qubits it is seperable.
      </p>
      <p>
        A great question is: do non-separable separable states exist? If so,
        what do they look like?
      </p>
      <p>Let&apos;s examine the following circuit:</p>
      <ArticleImage src="entangler" alt="" />
      <p>
        We know how to work with these! We start in the state
        <InlineMathBlock latex="\ket{00}" />. We&apos;ll then apply the Hadamard
        gate to the first bit while leaving the second bit alone (i.e. applying
        the identity operation):
      </p>
      <MathBlock
        latex={[
          "(H \\otimes I)\\ket{00} = \\Bigl(\\frac{1}{\\sqrt{2}}\\ket{0} + \\frac{1}{\\sqrt{2}}\\ket{1}\\Bigr) \\otimes \\ket{0}",
          "= \\frac{1}{\\sqrt{2}}\\ket{00} + \\frac{1}{\\sqrt{2}}\\ket{10}",
        ]}
      />
      <p>
        And then we apply the <InlineMathBlock latex="\text{CNOT}" /> gate.
        Remember that the <InlineMathBlock latex="\text{CNOT}" /> gate flips the
        second qubit only when the first qubit is in the state{" "}
        <InlineMathBlock latex="\ket{1}" />, so we have:
      </p>
      <MathBlock
        latex={[
          "\\text{CNOT}\\Bigl(\\frac{1}{\\sqrt{2}}\\ket{00} + \\frac{1}{\\sqrt{2}}\\ket{10}\\Bigr) = \\frac{1}{\\sqrt{2}}\\text{CNOT}\\ket{00} + \\frac{1}{\\sqrt{2}}\\text{CNOT}\\ket{10}",
          "\\frac{1}{\\sqrt{2}}\\ket{00} + \\frac{1}{\\sqrt{2}}\\ket{11}",
        ]}
      />
      <p>
        So we&apos;ve ended in a 2-qubit state that is in the even superposition
        of <InlineMathBlock latex="\ket{00}" /> and{" "}
        <InlineMathBlock latex="\ket{11}" />. Is this seperable? Give it a go!
        See if you can find two single qubit states that can be tensored
        together to give this state.
      </p>
      <p>
        Hopefully you don&apos;t find any, because this state is in fact
        non-separable! Because the two qubits have different values in both
        kets, we can&apos;t represent this state as a tensor product of two
        single qubit states.
      </p>
      <p>
        Just take a moment to ponder what this means. In classical computation,
        we could have many bits, but we could always pick out a single bit and
        describe it&apos;s state independantly. This is not the case in quantum
        computation. The state of a qubit can be dependent on the state of
        another qubit. This is a very powerful concept that we will exploit in
        many quantum algorithms.
      </p>
      <p>
        These 2-qubit entangled states are called EPR pairs, named after the
        three physicists who first described them in a famous paper in 1935:
        Einstein, Podolsky, and Rosen.
      </p>
      <p>There are 4 of these pairs:</p>
      <MathBlock
        latex={[
          "\\ket{\\beta_{00}} = \\frac{1}{\\sqrt{2}}\\ket{00} + \\frac{1}{\\sqrt{2}}\\ket{11}",
          "\\ket{\\beta_{10}} = \\frac{1}{\\sqrt{2}}\\ket{00} - \\frac{1}{\\sqrt{2}}\\ket{11}",
          "\\ket{\\beta_{01}} = \\frac{1}{\\sqrt{2}}\\ket{01} + \\frac{1}{\\sqrt{2}}\\ket{10}",
          "\\ket{\\beta_{11}}=\\frac{1}{\\sqrt{2}}\\ket{01} - \\frac{1}{\\sqrt{2}}\\ket{10}",
        ]}
      />
      <p>
        Hopefully you can see by what we&apos;ve discussed before, that these
        states are all indeed, non-separable.
      </p>
      <p>They have a slightly more succinct representation:</p>
      <MathBlock latex="\ket{\beta_{xy}} = \frac{1}{\sqrt{2}}\ket{0y} + \frac{1}{\sqrt{2}}(-1)^x\ket{1\bar{y}}" />
      <p>
        where <InlineMathBlock latex="x" /> and <InlineMathBlock latex="y" />{" "}
        are either <InlineMathBlock latex="0" /> or{" "}
        <InlineMathBlock latex="1" /> and <InlineMathBlock latex="\bar{y}" /> is
        the &quot;not&quot; of <InlineMathBlock latex="y" />.
      </p>
      <p>
        Also note the <InlineMathBlock latex="(-1)^x" />. This might seem a bit
        weird at first, but it&apos;s essentially saying:{" "}
        <InlineMathBlock latex="1" /> when <InlineMathBlock latex="x" /> is even
        (in our case just <InlineMathBlock latex="0" />) and{" "}
        <InlineMathBlock latex="-1" /> when <InlineMathBlock latex="x" /> is odd
        (in our case just <InlineMathBlock latex="1" />
        ). I&apos;m drawing special attention to this now, since things like
        this are quite common and will pop-up a lot with quantum algorithms.
        Take a second to familiarise yourself with it.
      </p>
      <p>
        Taking a step back from the maths for a second, what could we achieve
        with this entanglement property? Although we draw it as a circuit, there
        is nothing that actually says the two qubits need to be nearby. This
        means that two entangled qubits could be many many light years apart.
      </p>
      <p>
        Let&apos;s devise a hypothetical scenario where Alice and Bob get
        together to create an entangled pair{" "}
        <InlineMathBlock latex="\ket{\beta_{00}}" />, Alice takes the first
        qubit, Bob takes the other and then they travel far apart:
      </p>
      <ArticleImage src="alicebobentangled" alt="" />
      <p>
        If Alice measures her qubit as <InlineMathBlock latex="\ket{0}" /> then
        the system of both their qubits collapses to{" "}
        <InlineMathBlock latex="\ket{00}" /> since the other possibility,{" "}
        <InlineMathBlock latex="\ket{11}" />, is not possible.
      </p>
      <p>
        This means that Bob has a 100% chance to measure{" "}
        <InlineMathBlock latex="\ket{0}" />. But the outcome of Bob&apos;s
        measurement was decided by Alice&apos;s measurement, so did her
        measurement somehow influence Bob&apos;s? Did her measurement cause some
        information to be sent to Bob&apos;s qubit to tell it the measurement
        result? If Alice and Bob were light years apart, did this information
        travel faster than the speed of light?
      </p>
      <p>
        The answer to all these questions is no. Them measuring the same value
        was a consequence of quantum correlation that isn&apos;t so intuitive in
        the normal classical world. We will see later on that this phenomenon
        doesn&apos;t let communication happen faster than the speed of light.
      </p>
      <p>
        There are many people who have done a better job of explaining this
        phenomenon. It is a deep philosophical topic in the world of quantum
        mechanics and we won&apos;t get to side-tracked down that rabbit hole
        for now.
      </p>
      <p>
        When dealing with unintuitive quantum effects like this, just remember
        one thing: &quot;trust the math&quot;. As long as the math checks out,
        you can be confident that the quantum effects are real and can be
        exploited in quantum algorithms.
      </p>
      <h2>Exercises</h2>
      <h3>Exercise 1</h3>
      <Exercise
        problem={
          <>
            <p>
              Look again at the circuit diagram above that generates the first
              EPR pair. How could we re-use the same circuit the generate the
              other 3 EPR pairs?
            </p>
          </>
        }
        solution={
          <>
            <p>
              To generate the first EPR pair we start with the initial state{" "}
              <InlineMathBlock latex="\ket{00}" />. If we try inputting
              different initial states, we can generate the other EPR pairs. For
              example:
            </p>
            <MathBlock latex="\text{CNOT}\cdot (H \otimes I)\ket{01} = \text{CNOT}\Bigl(\frac{1}{\sqrt{2}}\ket{01} + \frac{1}{\sqrt{2}}\ket{11}\Bigr) = \frac{1}{\sqrt{2}}\ket{01} + \frac{1}{\sqrt{2}}\ket{10}" />
            <p>In general we find that:</p>
            <MathBlock latex="\text{CNOT}\cdot (H \otimes I)\ket{xy} = \ket{\beta_{xy}}" />
          </>
        }
      />
      <h3>Exercise 2</h3>
      <Exercise
        problem={
          <>
            <h4>Three qubit entanglement</h4>
            <ol className="list-decimal list-inside">
              <li>
                Give a possible state for a &quot;maximally entangled&quot;
                three qubit system. &quot;Maximally entangled&quot; here means
                that measuring any one of the qubits completely defines what the
                other qubits should be.
              </li>
              <li>Give a quantum circuit that creates this state.</li>
              <li>
                Show a 3-qubit system state in which measuring a{" "}
                <InlineMathBlock latex="\ket{0}" /> for any of the qubits leaves
                the other 2 qubits entagled, but measuring a{" "}
                <InlineMathBlock latex="\ket{1}" /> leaves the other 2 qubits
                separable.
              </li>
            </ol>
          </>
        }
        solution={
          <>
            <h4>Question 1</h4>
            <p>The following state:</p>
            <MathBlock latex="\frac{1}{\sqrt{2}}\ket{000} + \frac{1}{\sqrt{2}}\ket{111}" />
            <p>
              has the properties we desire, since there are only two states in
              which all the qubits are different. Therefore measuring one will
              immediately tell us the value of the others.
            </p>
            <p>
              This state is called the GHZ state and is the simplest 3 qubit
              entangled state.
            </p>
            <h4>Question 2</h4>
            <p>
              To get an idea of how we would create this circuit, consider what
              would happen if we just appended an extra{" "}
              <InlineMathBlock latex="\ket{0}" /> to our 2-qubit EPR pair:
            </p>
            <MathBlock latex="\frac{1}{\sqrt{2}}\ket{000} + \frac{1}{\sqrt{2}}\ket{110}" />
            <p>
              Just by inspection we can see that we want to flip the third qubit
              when the first/second qubit is <InlineMathBlock latex="\ket{1}" />
              . We know we can achieve this behaviour with a{" "}
              <InlineMathBlock latex="\text{CNOT}" /> gate between the second
              (or first) and third qubit. So our circuit becomes:
            </p>
            <ArticleImage src="3entangler" alt="" />
            <h4>Question 3</h4>
            <p>
              It gets pretty hard to reason about this stuff with 3 qubits. 3
              qubits presents many more different possibilities for entangled
              states. In this scenario, we&apos;re looking for a 3 qubit
              entangled state that can, upon measurement of one qubit, give us a
              2 qubit entangled state.
            </p>
            <p>
              This tells us we need at least 3 kets in our equation, since
              measurement will eliminate at least one of them and we need the
              remaining two to form the 2 qubit entanglement.
            </p>
            <p>
              Let&apos;s try to build this state up from our 2 qubit entangled
              pair. We&apos;ll append a third{" "}
              <InlineMathBlock latex="\ket{0}" /> qubit to the pair{" "}
              <InlineMathBlock latex="\ket{\beta_{01}}" />:
            </p>
            <MathBlock latex="\frac{1}{\sqrt{2}}\ket{010} + \frac{1}{\sqrt{2}}\ket{100}" />
            <p>
              This covers our first condition. To satisfy the second condition
              we simply add a third ket where the first 2 qubits are{" "}
              <InlineMathBlock latex="\ket{00}" /> when the third is{" "}
              <InlineMathBlock latex="\ket{1}" />. So our final state is:
            </p>
            <MathBlock latex="\frac{1}{\sqrt{3}}\ket{010} + \frac{1}{\sqrt{3}}\ket{100} \frac{1}{\sqrt{3}}\ket{001}" />
            <p>
              Although we only focussed on the third qubit in our setup, you can
              check that these properties hold for any of the qubits.
            </p>
            <p>
              This is called the W state. It&apos;s quite interesting because
              although the 3 qubits are entangled, they seem slightly less
              entangled than the GHZ state from earlier since measuring one
              qubit isn&apos;t always enough to fully break the entanglement.
            </p>
          </>
        }
      />
    </Article>
  );
};

export default Page;
