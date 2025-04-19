import { getArticlePageMetadata } from "@/course/courseStructure";
import Article from "@/components/article";
import InlineMathBlock from "@/components/inlineMathBlock";
import MathBlock from "@/components/mathBlock";
import Exercise from "@/components/exercise";
import Table from "@/components/table";
import ArticleImage from "@/components/articleImage";

import twoxnotImage from "./images/2xnot.png";
import notImage from "./images/not.png";
import quantCircuitImage from "./images/quant-circuit.png";

const CHAPTER_ID = "qubits-and-gates";
const ARTICLE_ID = "single-qubit-gates";

export const metadata = getArticlePageMetadata(CHAPTER_ID, ARTICLE_ID);

const Page = () => {
  return (
    <Article>
      <p>
        The <InlineMathBlock latex="1" />s and <InlineMathBlock latex="0" />s in
        classical computers are fairly useless by themselves. In order to
        represent meaningful computation we need to be able to manipulate them.
      </p>
      <p>
        We achieve this using logic gates. The most simple logic gate is the{" "}
        <InlineMathBlock latex="\textmd{NOT}" /> gate which inverts the input
        sending <InlineMathBlock latex="0" /> &rarr;{" "}
        <InlineMathBlock latex="1" /> and <InlineMathBlock latex="1" /> &rarr;{" "}
        <InlineMathBlock latex="0" />.
      </p>
      <p>
        We can better represent the operation of this gate with something called
        a truth table. This is a table that shows all possible inputs and their
        corresponding outputs. For the <InlineMathBlock latex="\textmd{NOT}" />{" "}
        gate this would look like:
      </p>
      <div className="flex flex-row justify-around">
        <Table
          data={[
            ["A", "NOT A"],
            [0, 1],
            [1, 0],
          ]}
          headerRow={true}
        />
      </div>
      <p>
        For the NOT gate this is fairly simple, but we will find this
        representation more useful as we introduce more gates later.
      </p>
      <p>
        In order to represent more complicated circuits without needing crazy
        mathematical formula to solve, we have special symbols assigned to each
        gate that can be used in a circuit diagram. The{" "}
        <InlineMathBlock latex="\textmd{NOT}" /> gate is represented as:
      </p>
      <ArticleImage src={notImage} alt="A classical NOT gate circuit symbol" />
      <p>From this one gate we can build a very simple circuit such as:</p>
      <ArticleImage
        src={twoxnotImage}
        alt="A classical circuit consisting of two NOT gates, one after the other"
      />
      <p>
        In circuit diagrams like this we can think of the bits as
        &quot;flowing&quot; from left to right. So in the above circuit we would
        read it as &quot;apply the <InlineMathBlock latex="\textmd{NOT}" /> gate
        to the input, then apply another{" "}
        <InlineMathBlock latex="\textmd{NOT}" /> gate to the output of the first{" "}
        <InlineMathBlock latex="\textmd{NOT}" /> gate&quot;. Clearly this
        circuit implements the identity operation. That is, the operation that
        takes <InlineMathBlock latex="1" /> &rarr; <InlineMathBlock latex="1" />{" "}
        and <InlineMathBlock latex="0" /> &rarr; <InlineMathBlock latex="0" />.
      </p>
      <p>
        A little thinking shows us there are only 4 possible single bit gates.
        The <InlineMathBlock latex="\textmd{NOT}" /> gate that we have already
        seen, the identity gate that we described above, a gate that maps all
        inputs to <InlineMathBlock latex="1" /> and a gate that maps all inputs
        to <InlineMathBlock latex="0" />.
      </p>
      <h2>Quantum Gates</h2>
      <p>
        Just like in classical computation, we will have gates that allow us to
        manipulate qubits. Quantum gates are the quantum equivalent of classical
        logic gates. They take qubits as input and produce qubits as output. We
        can use these gates to perform complex algorithms and computations just
        like we can with their classical counterpart.
      </p>
      <p>
        Now remember how we said our qubits will be represented as vectors? Well
        we know we can act on vectors with operators. We will use these
        operators to represent our gates!
      </p>
      <p>
        Since qubits are more than just classical bits, we have a slightly more
        interesting set of single qubit gates to study. We&apos;ve already seen
        some of these linear operator gates in a previous article, let&apos;s
        restate them here:
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
        We will represent these gates in circuit diagrams very similar to the
        way we represent classical gates. For example a circuit where we apply
        the X gate followed by a Z gate would look like:
      </p>
      <ArticleImage
        src={quantCircuitImage}
        alt="A quantum circuit consisting of an X gate followed by a Z gate"
      />
      <p>
        Note that quantum circuits can be a bit confusing since the mathematical
        definition of this circuit is <InlineMathBlock latex="ZX\ket{\psi}" />{" "}
        and not <InlineMathBlock latex="XZ\ket{\psi}" />. This is because we
        read circuits from left to right but apply operators from right to left.
      </p>
      <p>
        Let&apos;s introduce a new single qubit gate we haven&apos;t seen
        before: the Hadamard gate (named after the mathematician Jacques
        Hadamard). This gate is useful for creating superpositions. It takes{" "}
        <InlineMathBlock latex="\ket{0}" /> &rarr;
        <InlineMathBlock latex="\ket{+}" /> and{" "}
        <InlineMathBlock latex="\ket{1}" /> &rarr;
        <InlineMathBlock latex="\ket{-}" />.
      </p>
      <p>We can define the Hadamard gates in terms of an outer product:</p>
      <MathBlock latex="H = \frac{1}{\sqrt{2}}(\ket{0}\bra{0} + \ket{1}\bra{0} + \ket{0}\bra{1} - \ket{1}\bra{1})" />
      <p>
        Sometimes it can be helpful to factor the bras out from the kets for
        operators like this:
      </p>
      <MathBlock
        latex={[
          "H = \\frac{1}{\\sqrt{2}}(\\ket{0} + \\ket{1})\\bra{0} + \\frac{1}{\\sqrt{2}}(\\ket{0} - \\ket{1})\\bra{1}",
          "= \\ket{+}\\bra{0} + \\ket{-}\\bra{1}",
        ]}
      />
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
            <p>
              The proof follows from some fairly simple, yet tedious, algebra:
            </p>
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
              Quite a lot of terms! We can use what we know about how outer
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
              These algebraic manipulations are getting pretty tedious. We
              won&apos;t really need to do these too much going forward, but
              it&apos;s good to make sure we understand the theory behind it.
            </p>
            <p>
              Note that there&apos;s a slightly different way we could have
              looked at solving these. Instead of trying to multiply operators
              represented as sums of outer products, we could have checked how
              it operates on some arbitrary vector{" "}
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
                <InlineMathBlock latex="\ket{+}" /> can&apos;t be written as a
                linear multiple of <InlineMathBlock latex="\ket{-}" /> and
                vice-versa.
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
              <InlineMathBlock latex="\ket{1}" /> doesn&apos;t work as we end up
              with <InlineMathBlock latex="\frac{1}{\sqrt{2}}" /> on the left
              hand side and <InlineMathBlock latex="-\frac{1}{\sqrt{2}}" /> on
              the right hand side.
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
              Perhaps the mechanics of taking an inner product here aren&apos;t
              so clear. Essentially taking an inner product of a vector is about
              turning it into a bra and then acting on it&apos;s ket. Turning a
              ket to bra simply means flipping the bracket and so:
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
