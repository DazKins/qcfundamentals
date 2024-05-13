import {
  getArticleDefinition,
  getArticlePageMetadata,
} from "@/article/articleDefinitions";
import Article from "@/components/article";
import InlineMathBlock from "@/components/inlineMathBlock";
import MathBlock from "@/components/mathBlock";
import Table from "@/components/table";
import Image from "next/image";

const DOCUMENT_NAME = "what-is-a-qubit";
const ARTICLE_DEFINITION = getArticleDefinition(DOCUMENT_NAME);

export const metadata = getArticlePageMetadata(ARTICLE_DEFINITION);

const Page = () => {
  return (
    <Article articleDefinition={ARTICLE_DEFINITION}>
      <h2>Classical Computers</h2>
      <p>
        We&apos;re all familiar with classical computers where information is
        represented in bits. Bits can be either <InlineMathBlock latex="0" /> or{" "}
        <InlineMathBlock latex="1" />.
      </p>
      <p>
        These bits can then be manipulated using logic gates. The most simple
        logic gate is the <InlineMathBlock latex="NOT" /> gate which inverts the
        input sending <InlineMathBlock latex="0" /> &rarr;{" "}
        <InlineMathBlock latex="1" /> and <InlineMathBlock latex="1" /> &rarr;{" "}
        <InlineMathBlock latex="0" />.
      </p>
      <p>
        We can&apos;t achieve much with a single bit. More interesting behaviour
        can be implemented with logic gates that act on more than one bit. A
        common example is the <InlineMathBlock latex="AND" /> gate which takes
        two inputs and outputs <InlineMathBlock latex="1" /> if both inputs are{" "}
        <InlineMathBlock latex="1" /> and <InlineMathBlock latex="0" />{" "}
        otherwise. We can characterise the behaviour of these gates with truth
        tables:
      </p>
      <div className="flex flex-col gap-8 sm:flex-row justify-around">
        <Table
          data={[
            ["A", "NOT A"],
            [0, 1],
            [1, 0],
          ]}
          headerRow={true}
        />
        <Table
          data={[
            ["A", "B", " A AND B"],
            [0, 0, 0],
            [0, 1, 0],
            [1, 0, 0],
            [1, 1, 1],
          ]}
          headerRow={true}
        />
        <Table
          data={[
            ["A", "B", " A OR B"],
            [0, 0, 0],
            [0, 1, 1],
            [1, 0, 1],
            [1, 1, 1],
          ]}
          headerRow={true}
        />
      </div>
      <p>
        Chaining many of these gates together can allow us to perform complex
        algorithms and computations such as adding numbers together, applying
        corrections to images, playing video games and running chatbot AIs!
      </p>
      <h2>Qubits</h2>
      <p>
        In quantum computing, we represent information using qubits (pronounced
        kew-bits). It&apos;s just a mashup of the word &quot;quantum&quot; and
        the word &quot;bit&quot;.
      </p>
      <p>
        Qubits also have the states <InlineMathBlock latex="0" /> and{" "}
        <InlineMathBlock latex="1" /> but they can exist in a superposition of
        the two.
      </p>
      <p>
        A superposition is a fundamental concept from the world of quantum
        mechanics where a system can exist in a state such that, upon
        observation, it has some probability to be obvserved in any of the
        possible states. This is exactly the same concept talked about in the
        famous{" "}
        <a href="https://en.wikipedia.org/wiki/Schr%C3%B6dinger%27s_cat">
          Schrödinger&apos;s cat
        </a>{" "}
        thought experiment. Just as the cat exists in a superposition of being
        dead and live, a qubit can exist in a superposition of being
        <InlineMathBlock latex="0" /> and <InlineMathBlock latex="1" />.
      </p>
      <p>
        In order to demonstrate some of the mathematics here we&apos;ll
        introduce a new bit of notation called{" "}
        <a href="https://en.wikipedia.org/wiki/Bra%E2%80%93ket_notation">
          Bra-ket notation
        </a>
        . Instead of writing <InlineMathBlock latex="0" /> and{" "}
        <InlineMathBlock latex="1" /> we&apos;ll write{" "}
        <InlineMathBlock latex="\ket{0}" /> and{" "}
        <InlineMathBlock latex="\ket{1}" />. The need for this notation
        won&apos;t be very clear in this post, but it&apos;s the standard
        notation used in most quantum computing. These are actually 2D vectors,
        but we won&apos;t discuss that here.
      </p>
      <p>
        We&apos;ll represent a superposition like this:{" "}
        <InlineMathBlock latex="a\ket{0} + b\ket{1}" />
        where we are multiplying the vectors <InlineMathBlock latex="\ket{0}" />{" "}
        and <InlineMathBlock latex="\ket{1}" /> by the numbers{" "}
        <InlineMathBlock latex="a" /> and <InlineMathBlock latex="b" />{" "}
        respectively. It&apos;s important to know that the numbers{" "}
        <InlineMathBlock latex="a" /> and <InlineMathBlock latex="b" /> are{" "}
        <a href="https://en.wikipedia.org/wiki/Complex_number">
          complex numbers
        </a>
        . Complex numbers have a real part and imaginary part, that is, some
        part multiplied by <InlineMathBlock latex="i = √-1" />. I won&apos;t go
        into detail on complex numbers in this article.
      </p>
      <p>
        As mentioned earlier when we observe (or measure) a qubit, we will get
        either <InlineMathBlock latex="\ket{0}" /> or{" "}
        <InlineMathBlock latex="\ket{1}" />. Not both, or none, we will always
        get one of the two. This phenonmenon is called collapse and represents
        how a quantum system breaks superposition when a system is observed.
      </p>
      <p>
        We can calculate the exact probability of measuring each possible
        outcome using the complex coefficients measured earlier. The probability
        of measuring <InlineMathBlock latex="\ket{0}" /> is{" "}
        <InlineMathBlock latex="|a|^2" /> (the <InlineMathBlock latex="|.|" />{" "}
        here means the modulus or norm) and likewise the probability of
        measuring <InlineMathBlock latex="\ket{1}" /> is{" "}
        <InlineMathBlock latex="|b|^2" />. We know from basic mathematics that
        probabilities must sum to 1, so we can see the constraint on the
        coefficients in the superposition:
        <InlineMathBlock latex="|a|^2 + |b|^2 = 1" />
      </p>
      <h2>Visualising a qubit</h2>
      <p>
        We have a useful tool for visualising the qubit called a Bloch sphere
        (named after the physicist Felix Bloch).
      </p>
      <p>
        The Bloch sphere places the state <InlineMathBlock latex="\ket{0}" /> at
        the north pole, and the state <InlineMathBlock latex="\ket{1}" /> at the
        south pole. Any superposition states lie somewhere in between and the
        latitude represents the probability of measuring each state. For
        example, a qubit that lies on the equator has an exact 50/50 chance to
        be <InlineMathBlock latex="\ket{0}" /> or{" "}
        <InlineMathBlock latex="\ket{1}" />.
      </p>
      <p>Some example states are shown below:</p>
      <div className="flex flex-col gap-8 sm:flex-row items-center justify-around">
        <div>
          <Image
            src="/article/what-is-a-qubit/bloch-0.png"
            alt="bloch-sphere-0"
            width={300}
            height={500}
          />
          <div className="text-center mt-2">
            <InlineMathBlock latex="\ket{0}" />
          </div>
        </div>
        <div>
          <Image
            src="/article/what-is-a-qubit/bloch-1.png"
            alt="bloch-sphere-1"
            width={300}
            height={500}
          />
          <div className="text-center mt-2">
            <InlineMathBlock latex="\ket{1}" />
          </div>
        </div>
        <div>
          <Image
            src="/article/what-is-a-qubit/bloch-+.png"
            alt="bloch-sphere-+"
            width={300}
            height={500}
          />
          <div className="text-center mt-2">
            <InlineMathBlock latex="1/√2\ket{0} + 1/√2\ket{1}" />
          </div>
        </div>
      </div>
      <p>
        As you can see, the state{" "}
        <InlineMathBlock latex="1/√2\ket{0} + 1/√2\ket{1}" /> lies on the
        equator as there is a probability{" "}
        <InlineMathBlock latex="(1/√2)^2 = 1/2" /> to measure{" "}
        <InlineMathBlock latex="\ket{0}" /> and likewise to measure{" "}
        <InlineMathBlock latex="\ket{1}" />.
      </p>
      <p>
        A qubit can theoretically exist in any state on the Bloch sphere and you
        can see there are a few other states labelled on the diagram. For now,
        we will just focus on some of the simpler ones.
      </p>
      <p>
        The Bloch sphere is a useful tool for visualising qubits and their
        superpositions, but it&apos;s important to remember that it&apos;s just
        a representation. The actual state of a qubit is a complex number and
        cannot be directly visualised in 3D space.
      </p>
      <h2>Quantum Gates</h2>
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
        The most basic one is the quantum <InlineMathBlock latex="NOT" /> gate
        that we refer to with an <InlineMathBlock latex="X" />. Just like the
        classical <InlineMathBlock latex="NOT" /> gate it takes{" "}
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
        <InlineMathBlock latex="1/√2\ket{0} + 1/√2\ket{1}" /> and{" "}
        <InlineMathBlock latex="\ket{1}" /> &rarr;
        <InlineMathBlock latex="1/√2\ket{0} - 1/√2\ket{1}" />. These 50/50
        superposition states are so common that there is a special notation for
        them:
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
      <p>
        Now a single qubit, as interesting as it is, isn&apos;t very powerful
        and won&apos;t allow us to do any interesting computation. There are
        many multi-qubit gates such as <InlineMathBlock latex="CNOT" />,{" "}
        <InlineMathBlock latex="CZ" />, <InlineMathBlock latex="SWAP" /> etc.
        but we&apos;ll save them for another time. We&apos;ll need some more
        advanced tooling/notation to work with those.
      </p>
      <h2>Quantum Circuits</h2>
      <p>
        Now we have gates, we can chain as many of them as we like to build
        circuits.
      </p>
      <h2>Conclusion</h2>
      <p>
        I hope this short post and the qubit simulator have given you a taste
        for quantum computing. But we&apos;re just scratching the surface here!
        When we scale to multiple qubits we&apos;ll get to see superdense
        coding, entanglement, teleportation and loads more interesting stuff! I
        hope to write some more posts on this stuff soon.
      </p>
    </Article>
  );
};

export default Page;
