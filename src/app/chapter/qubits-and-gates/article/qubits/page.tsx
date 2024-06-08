import { getArticlePageMetadata } from "@/course/courseStructure";
import Article from "@/components/article";
import InlineMathBlock from "@/components/inlineMathBlock";
import MathBlock from "@/components/mathBlock";
import Table from "@/components/table";
import Image from "next/image";
import Exercise from "@/components/exercise";

const CHAPTER_ID = "qubits-and-gates";
const ARTICLE_ID = "qubits";

export const metadata = getArticlePageMetadata(CHAPTER_ID, ARTICLE_ID);

const Page = () => {
  return (
    <Article>
      <h2>Classical Computers</h2>
      <p>
        We&apos;re all familiar with classical computers where information is
        represented in bits. Bits can be either <InlineMathBlock latex="0" /> or{" "}
        <InlineMathBlock latex="1" />.
      </p>
      <p>
        These bits can then be manipulated using logic gates. The most simple
        logic gate is the <InlineMathBlock latex="\textmd{NOT}" /> gate which
        inverts the input sending <InlineMathBlock latex="0" /> &rarr;{" "}
        <InlineMathBlock latex="1" /> and <InlineMathBlock latex="1" /> &rarr;{" "}
        <InlineMathBlock latex="0" />.
      </p>
      <p>
        We can&apos;t achieve much with a single bit. More interesting behaviour
        can be implemented with logic gates that act on more than one bit. A
        common example is the <InlineMathBlock latex="\textmd{AND}" /> gate
        which takes two inputs and outputs <InlineMathBlock latex="1" /> if both
        inputs are <InlineMathBlock latex="1" /> and{" "}
        <InlineMathBlock latex="0" /> otherwise. We can characterise the
        behaviour of these gates with truth tables:
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
        We&apos;ll start to make use of{" "}
        <a href="/chapter/mathematical-foundations/article/bra-ket-notation">
          Bra-ket notation
        </a>
        . By writing our qubit states <InlineMathBlock latex="0" /> and{" "}
        <InlineMathBlock latex="1" /> as <InlineMathBlock latex="\ket{0}" /> and{" "}
        <InlineMathBlock latex="\ket{1}" />. So we are representing our qubits
        as vectors. In fact, these two vectors will be orthonormal basis
        vectors:
      </p>
      <MathBlock latex="\braket{0|0} = 1,\ \ \braket{1|1} = 1,\ \ \braket{0|1} = 0" />
      <p>
        We&apos;ll represent a superposition like this:{" "}
        <InlineMathBlock latex="a\ket{0} + b\ket{1}" />
        where we are multiplying the vectors <InlineMathBlock latex="\ket{0}" />{" "}
        and <InlineMathBlock latex="\ket{1}" /> by the complex numbers{" "}
        <InlineMathBlock latex="a" /> and <InlineMathBlock latex="b" />{" "}
        respectively. And so our set of possible qubit states forms a vector
        space.
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
        <InlineMathBlock latex="|a|^2" /> and likewise the probability of
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
            <InlineMathBlock latex="\frac{1}{\sqrt{2}}\ket{0} + \frac{1}{\sqrt{2}}\ket{1}" />
          </div>
        </div>
      </div>
      <p>
        As you can see, the state{" "}
        <InlineMathBlock latex="\frac{1}{\sqrt{2}}\ket{0} + \frac{1}{\sqrt{2}}\ket{1}" />{" "}
        lies on the equator as there is a probability{" "}
        <InlineMathBlock latex="(\frac{1}{\sqrt{2}})^2 = 1/2" /> to measure{" "}
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
      <p>
        Now remember how we said our qubits will be represented as vectors? Well
        we know we can act on vectors with operators; we will use these
        operators to represent our gates!
      </p>
      <p>
        We&apos;ve already seen some of these linear operator gates in a previous
        article, let&apos;s restate them here:
      </p>
      <MathBlock
        latex={[
          "I = \\ket{0}\\bra{0} + \\ket{1}\\bra{1}",
          "X = \\ket{0}\\bra{1} + \\ket{1}\\bra{0}",
          "Y = -i\\ket{0}\\bra{1} + i\\ket{1}\\bra{0}",
          "Z = \\ket{0}\\bra{0} - \\ket{1}\\bra{1}",
        ]}
      />
      <p>
        Another famous gate we haven&apos;t discussed yet is the Hadamard gate (named
        after the mathematician Jacques Hadamard). This gate is useful for
        creating superpositions. It takes <InlineMathBlock latex="\ket{0}" />{" "}
        &rarr;
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
      <p>
        You might remember these <InlineMathBlock latex="\ket{+}" /> and{" "}
        <InlineMathBlock latex="\ket{-}" /> states from our bloch sphere diagram
        earlier.
      </p>
      <p>We can define the Hadamard gates in terms of an outer product:</p>
      <MathBlock latex="H = \frac{1}{\sqrt{2}}(\ket{0}\bra{0} + \ket{1}\bra{0} + \ket{0}\bra{1} - \ket{1}\bra{1})" />
      <p>
        Sometimes it can be helpful to factor the bras out from the kets for
        operators like this:
      </p>
      <MathBlock latex="H = \frac{1}{\sqrt{2}}(\ket{0} + \ket{1})\bra{0} + \frac{1}{\sqrt{2}}(\ket{0} - \ket{1})\bra{1}" />
      <p>
        This is a useful representation as it more clearly shows us what happens
        to the basis states.
      </p>
      <h2>Exercises</h2>
      <h3>Exercise 1</h3>
      <Exercise
        problem={
          <>
            <p>Prove that the hadamard gate is its own inverse.</p>
            <p>
              In other words show that <InlineMathBlock latex="HH = I" />.
            </p>
          </>
        }
        solution={
          <>
            <p>The proof follows from some fairly simple algebra:</p>
            <MathBlock
              latex={[
                "HH = \\frac{1}{\\sqrt{2}}(\\ket{0} + \\ket{1})\\bra{0} + \\frac{1}{\\sqrt{2}}(\\ket{0} - \\ket{1})\\bra{1} \\times \\frac{1}{\\sqrt{2}}(\\ket{0} + \\ket{1})\\bra{0} + \\frac{1}{\\sqrt{2}}(\\ket{0} - \\ket{1})\\bra{1}",
                "= \\frac{1}{2}(\\ket{0}\\bra{0} + \\ket{1}\\bra{0} + \\ket{0}\\bra{1} - \\ket{1}\\bra{1})(\\ket{0}\\bra{0} + \\ket{1}\\bra{0} + \\ket{0}\\bra{1} - \\ket{1}\\bra{1})",
                "= \\frac{1}{2}(\\ket{0}\\bra{0}\\ket{0}\\bra{0} + \\ket{1}\\bra{0}\\ket{0}\\bra{0} + \\ket{0}\\bra{1}\\ket{0}\\bra{0} - \\ket{1}\\bra{1}\\ket{0}\\bra{0}",
                "+ \\ket{0}\\bra{0}\\ket{1}\\bra{0} + \\ket{1}\\bra{0}\\ket{1}\\bra{0} + \\ket{0}\\bra{1}\\ket{1}\\bra{0} - \\ket{1}\\bra{1}\\ket{1}\\bra{0}",
                "+ \\ket{0}\\bra{0}\\ket{0}\\bra{1} + \\ket{1}\\bra{0}\\ket{0}\\bra{1} + \\ket{0}\\bra{1}\\ket{0}\\bra{1} - \\ket{1}\\bra{1}\\ket{0}\\bra{1}",
                "- \\ket{0}\\bra{0}\\ket{1}\\bra{1} - \\ket{1}\\bra{0}\\ket{1}\\bra{1} - \\ket{0}\\bra{1}\\ket{1}\\bra{1} + \\ket{1}\\bra{1}\\ket{1}\\bra{1})",
              ]}
            />
            <p>
              Quite a lots of terms! We can use what we know about how outer
              products of basis vectors work to simplify:
            </p>
            <MathBlock
              latex={[
                "= \\frac{1}{2}(\\ket{0}\\bra{0} + \\ket{1}\\bra{0} + \\ket{0}\\bra{0} - \\ket{1}\\bra{0} + \\ket{0}\\bra{1} + \\ket{1}\\bra{1} - \\ket{0}\\bra{1} + \\ket{1}\\bra{1})",
                "= \\frac{1}{2}(2\\ket{0}\\bra{0} + 2\\ket{1}\\bra{1})",
                "= \\ket{0}\\bra{0} + \\ket{1}\\bra{1} = I",
              ]}
            />
          </>
        }
      />
      <h3>Exercise 2</h3>
      <Exercise
        problem={
          <>
            <p>
              Show that <InlineMathBlock latex="HXH = Z" />
            </p>
          </>
        }
        solution={
          <>
            <p>
              We&apos;ll start by looking at <InlineMathBlock latex="XH" />:
            </p>
            <MathBlock
              latex={[
                "XH = (\\ket{0}\\bra{1} + \\ket{1}\\bra{0})\\Bigl(\\frac{1}{\\sqrt{2}}(\\ket{0} + \\ket{1})\\bra{0} + \\frac{1}{\\sqrt{2}}(\\ket{0} - \\ket{1})\\bra{1}\\Bigr)",
                "= \\frac{1}{\\sqrt{2}}(\\ket{0}\\bra{1}\\ket{0}\\bra{0} + \\ket{1}\\bra{0}\\ket{0}\\bra{0} + \\ket{0}\\bra{1}\\ket{1}\\bra{0} + \\ket{1}\\bra{0}\\ket{1}\\bra{0}",
                "+ \\ket{0}\\bra{1}\\ket{0}\\bra{1} + \\ket{1}\\bra{0}\\ket{0}\\bra{1} - \\ket{0}\\bra{1}\\ket{1}\\bra{1} - \\ket{1}\\bra{0}\\ket{1}\\bra{1})",
                "= \\frac{1}{\\sqrt{2}}(\\ket{1}\\bra{0} + \\ket{0}\\bra{0} + \\ket{1}\\bra{1} - \\ket{0}\\bra{1})",
              ]}
            />
            <p>
              Now let&apos;s apply <InlineMathBlock latex="H" /> to this:
            </p>
            <MathBlock
              latex={[
                "HXH = \\frac{1}{2}\\Bigl((\\ket{0} + \\ket{1})\\bra{0} + (\\ket{0} - \\ket{1})\\bra{1}\\Bigr)\\Bigl(\\ket{1}\\bra{0} + \\ket{0}\\bra{0} + \\ket{1}\\bra{1} - \\ket{0}\\bra{1}\\Bigr)",
                "= \\frac{1}{2}(\\ket{0}\\bra{0}\\ket{1}\\bra{0} + \\ket{0}\\bra{0}\\ket{0}\\bra{0} + \\ket{0}\\bra{0}\\ket{1}\\bra{1} - \\ket{0}\\bra{0}\\ket{0}\\bra{1}",
                "+ \\ket{1}\\bra{0}\\ket{1}\\bra{0} + \\ket{1}\\bra{0}\\ket{0}\\bra{0} + \\ket{1}\\bra{0}\\ket{1}\\bra{1} - \\ket{1}\\bra{0}\\ket{0}\\bra{1}",
                "+ \\ket{0}\\bra{1}\\ket{1}\\bra{0} + \\ket{0}\\bra{1}\\ket{0}\\bra{0} + \\ket{0}\\bra{1}\\ket{1}\\bra{1} - \\ket{0}\\bra{1}\\ket{0}\\bra{1}",
                "- \\ket{1}\\bra{1}\\ket{1}\\bra{0} - \\ket{1}\\bra{1}\\ket{0}\\bra{0} - \\ket{1}\\bra{1}\\ket{1}\\bra{1} + \\ket{1}\\bra{1}\\ket{0}\\bra{1})",
              ]}
            />
            <p>
              Ok, this is getting out of hand quite quickly! Lets simplify down:
            </p>
            <MathBlock
              latex={[
                "=\\frac{1}{2}(\\ket{0}\\bra{0} - \\ket{0}\\bra{1} + \\ket{1}\\bra{0} - \\ket{1}\\bra{1} + \\ket{0}\\bra{0} + \\ket{0}\\bra{1} - \\ket{1}\\bra{0} - \\ket{1}\\bra{1})",
                "=\\frac{1}{2}(2\\ket{0}\\bra{0} - 2\\ket{1}\\bra{1})",
                "=\\ket{0}\\bra{0} - \\ket{1}\\bra{1} = Z",
              ]}
            />
            <p>
              These algebraic manipulations are getting pretty tedious. We won&apos;t
              really need to do these too much going forward, but it&apos;s good to
              make sure we understand the theory behind it.
            </p>
            <p>
              Note that there&apos;s a slightly different way we could have looked at
              solving these. Instead of trying to multiply operators represented
              as sums of outer products, we could have checked how it operates
              on some arbitrary vector{" "}
              <InlineMathBlock latex="\ket{v} = a\ket{0} + b\ket{1}" /> and then
              validated that <InlineMathBlock latex="HXH\ket{v} = Z\ket{v}" />.
            </p>
          </>
        }
      />
      <h3>Exercise 3</h3>
      <Exercise
        problem={
          <>
            <p>
              Prove that the vectors <InlineMathBlock latex="\ket{+}" /> and{" "}
              <InlineMathBlock latex="\ket{-}" /> form an orthonormal basis for
              the single qubit state.
            </p>
            <p>To recap that requires us to prove the following:</p>
            <ul>
              <li>
                <strong>Linear independence</strong>: Show that{" "}
                <InlineMathBlock latex="\ket{+}" /> can&apos;t be written as a linear
                multiple of <InlineMathBlock latex="\ket{-}" /> and vice-versa.
              </li>
              <li>
                <strong>Spanning</strong>: Show that any qubit state can be
                written as a linear combination of{" "}
                <InlineMathBlock latex="\ket{+}" /> and{" "}
                <InlineMathBlock latex="\ket{-}" />
              </li>
              <li>
                <strong>Normality</strong>: Show that{" "}
                <InlineMathBlock latex="\braket{+|+} = \braket{-|-} = 1" />
              </li>
              <li>
                <strong>Orthogonality</strong>: Show that{" "}
                <InlineMathBlock latex="\braket{+|-} = \braket{-|+} = 0" />
              </li>
            </ul>
          </>
        }
        solution={
          <>
            <h4>Linear independence</h4>
            <p>
              Assume that there did exist some coefficient{" "}
              <InlineMathBlock latex="a" /> such that{" "}
              <InlineMathBlock latex="\ket{+} = a\ket{-}" />. Then we would have
              the following:
            </p>
            <MathBlock latex="\frac{1}{\sqrt{2}}\ket{0} + \frac{1}{\sqrt{2}}\ket{1} = \frac{a}{\sqrt{2}}\ket{0} - \frac{a}{\sqrt{2}}\ket{1}" />
            <p>
              Since we know <InlineMathBlock latex="\ket{0}" /> and{" "}
              <InlineMathBlock latex="\ket{1}" /> are linearly independant, we
              know that their corresponding coefficients on either side of the
              equals sign must be equal.
            </p>
            <p>
              Looking at the coefficient for <InlineMathBlock latex="\ket{0}" />{" "}
              this tells us that <InlineMathBlock latex="a = 1" /> but subbing
              this value in for the coefficient of{" "}
              <InlineMathBlock latex="\ket{1}" /> doesn&apos;t work as we end up with{" "}
              <InlineMathBlock latex="\frac{1}{\sqrt{2}}" /> on the left hand
              side and <InlineMathBlock latex="-\frac{1}{\sqrt{2}}" /> on the
              right hand side.
            </p>
            <p>
              A similar argument also proves{" "}
              <InlineMathBlock latex="\ket{-} \neq a\ket{+}" /> so we have
              proved linear independence.
            </p>
            <h4>Spanning</h4>
            <p>
              Assume we have a vector in our standard basis{" "}
              <InlineMathBlock latex="\ket{v} = a\ket{0} + b\ket{1}" />. We
              propose to represent this in the form{" "}
              <InlineMathBlock latex="c\ket{+} + d\ket{-}" />. We can find the
              value of <InlineMathBlock latex="c" /> and{" "}
              <InlineMathBlock latex="d" /> by solving a linear equation:
            </p>
            <MathBlock
              latex={[
                "a\\ket{0} + b\\ket{1} = c\\ket{+} + d\\ket{-}",
                "= \\frac{c}{\\sqrt{2}}(\\ket{0} + \\ket{1}) + \\frac{d}{\\sqrt{2}}(\\ket{0} - \\ket{1})",
                "= \\frac{c + d}{\\sqrt{2}}\\ket{0} + \\frac{c - d}{\\sqrt{2}}\\ket{1}",
              ]}
            />
            <p>Comparing coefficients we now have:</p>
            <MathBlock latex="a = \frac{c + d}{\sqrt{2}}\ \ \ \ \textmd{and}\ \ \ \ b = \frac{c - d}{\sqrt{2}}" />
            <p>And then adding these 2 equations together gives:</p>
            <MathBlock
              latex={[
                "a + b = \\frac{2c}{\\sqrt{2}} = \\sqrt{2}c",
                "\\textmd{so}\\ \\ c = \\frac{a + b}{\\sqrt{2}}",
              ]}
            />
            <p>
              Subbing this result back into the equation for{" "}
              <InlineMathBlock latex="a" /> stated earlier, we can find{" "}
              <InlineMathBlock latex="d" />:
            </p>
            <MathBlock
              latex={[
                "a = \\frac{c + d}{\\sqrt{2}}",
                "\\sqrt{2}a = c + d",
                "\\sqrt{2}a = \\frac{a + b}{\\sqrt{2}} + d",
                "2a = a + b + \\sqrt{2}d",
                "a - b = \\sqrt{2}d",
                "d = \\frac{a - b}{\\sqrt{2}}",
              ]}
            />
            <p>
              We have therefore shown that the coefficients of{" "}
              <InlineMathBlock latex="\ket{+}" /> and{" "}
              <InlineMathBlock latex="\ket{-}" /> are uniquely determined by the
              coefficients of <InlineMathBlock latex="\ket{0}" /> and{" "}
              <InlineMathBlock latex="\ket{1}" /> which are spanning. So any
              vector of our space can be written as a linear combination of{" "}
              <InlineMathBlock latex="\ket{+}" /> and{" "}
              <InlineMathBlock latex="\ket{-}" /> and hence they are spanning.
            </p>
            <h4>Normality</h4>
            <p>
              Perhaps the mechanics of taking an inner product here aren&apos;t so
              clear. Essentially taking an inner product of a vector is about
              turning it into a bra and then acting on it&apos;s ket. Turning a ket
              to bra simply means flipping the bracket and so:
            </p>
            <MathBlock
              latex={[
                "\\bra{+} = \\frac{1}{\\sqrt{2}}(\\bra{0} + \\bra{1})",
                "\\bra{-} = \\frac{1}{\\sqrt{2}}(\\bra{0} - \\bra{1})",
              ]}
            />
            <p>We can then check the inner products:</p>
            <MathBlock
              latex={[
                "\\braket{+|+} = \\frac{1}{2}(\\bra{0} + \\bra{1})(\\ket{0} + \\ket{1})",
                "= \\frac{1}{2}(\\braket{0|0} + \\braket{0|1} + \\braket{1|0} + \\braket{1|1}) = 1",
              ]}
            />
            <MathBlock
              latex={[
                "\\braket{-|-} = \\frac{1}{2}(\\bra{0}-\\bra{1})(\\ket{0} - \\ket{1})",
                "= \\frac{1}{2}(\\braket{0|0} - \\braket{0|1} - \\braket{1|0} + \\braket{1|1}) = 1",
              ]}
            />
            <h4>Orthogonality</h4>
            <MathBlock
              latex={[
                "\\braket{+|-} = \\frac{1}{2}(\\bra{0} + \\bra{1})(\\ket{0} - \\ket{1})",
                "= \\frac{1}{2}(\\braket{0|0} - \\braket{0|1} + \\braket{1|0} - \\braket{1|1}) = 0",
              ]}
            />
          </>
        }
      />
    </Article>
  );
};

export default Page;
