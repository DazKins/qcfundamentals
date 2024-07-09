import { getArticlePageMetadata } from "@/course/courseStructure";
import Article from "@/components/article";
import InlineMathBlock from "@/components/inlineMathBlock";
import MathBlock from "@/components/mathBlock";
import Exercise from "@/components/exercise";
import ArticleImage from "@/components/articleImage";

const CHAPTER_ID = "mathematical-foundations";
const ARTICLE_ID = "complex-numbers";

export const metadata = getArticlePageMetadata(CHAPTER_ID, ARTICLE_ID);

const Page = () => {
  return (
    <Article>
      <p>
        A concept that will be very important later on is that of complex
        numbers. Complex numbers originally come from solutions of square roots,
        so we&apos;ll start there.
      </p>
      <p>
        We all know how to solve equations like this{" "}
        <InlineMathBlock latex="x^2 = 4" />. We don&apos;t even need to try
        particularly hard since we can just try values of{" "}
        <InlineMathBlock latex="x" /> until we find one that works. In this
        case, we know that both <InlineMathBlock latex="2" /> and{" "}
        <InlineMathBlock latex="-2" /> are solutions. Having two solutions is
        key here. If we have a positive solution to such an equation, we can
        also say its negative is a solution since a negative times a negative is
        a positive.
      </p>
      <p>
        It seems then that when squaring a number we should always get a
        positive result. If we tried to solve the equation
        <InlineMathBlock latex="x^2 = -1" />, we would find that there is no
        solution.
      </p>
      <p>Or would we?</p>
      <p>
        With our current knowledge, there is no known solution. But what if we
        were to just pretend one exists? Let&apos;s define a constant,{" "}
        <InlineMathBlock latex="i" />, that is the &quot;solution&quot; to the
        equation <InlineMathBlock latex="i^2 = -1" />. We can&apos;t express any
        meaningful value to <InlineMathBlock latex="i" />, but we can still see
        how it behaves in equations.
      </p>
      <p>
        One of the most basic and principle properties we will be able to study
        is the powers of <InlineMathBlock latex="i" />:
      </p>
      <MathBlock
        latex={[
          "i^0 = 1",
          "i^1=i",
          "i^2=-1",
          "i^3=i\\cdot i^2 = i \\cdot (-1) = -i",
          "i^4 = i^2 \\cdot i^2 = (-1) \\cdot (-1) = 1",
        ]}
      />
      <p>From this we can see that:</p>
      <MathBlock
        latex={[
          "i^0 = i^4 = i^8 = \\cdots = i^{4n} = 1",
          "i^1 = i^5 = i^9 = \\cdots = i^{4n + 1} = i",
          "i^2 = i^6 = i^{10} = \\cdots = i^{4n + 2} = -1",
          "i^3 = i^7 = i^{11} = \\cdots = i^{4n + 3}= -i",
        ]}
      />
      <p>
        It&apos;s quite suprising that the powers of{" "}
        <InlineMathBlock latex="i" /> follow this &quot;circular&quot; pattern.
        There&apos;s no number we know that behaves like this! Normally a number
        will simply grow larger and larger as we raise it to higher powers.
      </p>
      <p>
        This &quot;circular&quot; idea will be our first step to a visual
        intuition of the complex numbers. We will imagine these numbers as lying
        on a circle that extends the standard number line:
      </p>
      <ArticleImage src="complex-circle" alt="" />
      <p>
        This starts to give us an intuition that complex numbers might be well
        visualised as 2-dimensional. Just as we would represent a point in 2
        dimensions with an <InlineMathBlock latex="x" /> component and a{" "}
        <InlineMathBlock latex="y" /> component, we will represent our complex
        numbers as having a real component and an imaginary component.
      </p>
      <p>
        We will write them as <InlineMathBlock latex="a + bi" /> where{" "}
        <InlineMathBlock latex="a" /> is the real component and{" "}
        <InlineMathBlock latex="b" /> is the imaginary component as it is the
        coefficient of <InlineMathBlock latex="i" />.
      </p>
      <p>
        Let&apos;s take a look at how we plot these numbers on the 2D plane:
      </p>
      <ArticleImage src={"argand"} alt="" />
      <p>So we can see how they plot just like 2D points.</p>
      <p>
        In the same way we can calculate the distance of a point from the origin
        using pythagoras: <InlineMathBlock latex="\sqrt{x^2 + y^2}" />, we can
        also calculate the distance of a complex number from{" "}
        <InlineMathBlock latex="0" /> as{" "}
        <InlineMathBlock latex="\sqrt{a^2 + b^2}" />. This value we will call
        the modulus of the complex number and will be represented like this:
      </p>
      <MathBlock latex="|a + bi| = \sqrt{a^2 + b^2}" />
      <p>
        Another concept we&apos;ll introduce is the complex conjugate. This will
        be represented with the <InlineMathBlock latex="^*" /> symbol and will
        simply make the complex part negative:
      </p>
      <MathBlock latex="(a + bi)^* = a - bi" />
      <p>
        Here&apos;s an interesting property we&apos;ll show. For a complex
        number <InlineMathBlock latex="z = a + bi" /> we have:
      </p>
      <MathBlock latex="z z^* = (a + bi)(a - bi) = a^2 - abi + abi - b^2i^2 = a^2 + b^2 = |z|^2" />
      <h2>Polar Representation</h2>
      <p>
        We also know that we can represent points in 2D space using polar
        coordinates. We can do the same for complex numbers:
      </p>
      <ArticleImage src="polar" alt="" />
      <p>
        We will represent the distance from the origin as{" "}
        <InlineMathBlock latex="r" /> and the angle from the postive-real line
        as <InlineMathBlock latex="\theta" />
      </p>
      <p>
        Some knowledge of trigonometry shows us that for a complex number{" "}
        <InlineMathBlock latex="z" /> we can represent it in polar form as such:
      </p>
      <MathBlock latex="z = r\cos{\theta} + ir\sin{\theta}" />
      <p>
        The polar system has another more interesting representation however,
        that is quite extraordinary!
      </p>
      <p>
        We will begin in an unusual and seemingly unrelated place: the taylor
        expansion of <InlineMathBlock latex="e^x" />:
      </p>
      <MathBlock latex="e^x = 1 + x + \frac{x^2}{2!} + \frac{x^3}{3!} + \ldots + \frac{x^n}{n!} + \ldots" />
      <p>
        We&apos;re going to check what happens when we introduce{" "}
        <InlineMathBlock latex="i" /> into the exponent:
      </p>
      <MathBlock latex="e^{ix} = 1 + ix + \frac{(ix)^2}{2!} + \frac{(ix)^3}{3!} + \ldots + \frac{(ix)^n}{n!} + \ldots" />
      <p>
        Now we can apply our power rules of <InlineMathBlock latex="i" /> to
        simplify:
      </p>
      <MathBlock latex="e^{ix} = 1 + ix - \frac{x^2}{2!} - i\frac{x^3}{3!} + \frac{x^4}{4!} + i\frac{x^5}{5!} - \frac{x^6}{6!} - i\frac{x^7}{7!} + \ldots" />
      <p>
        We&apos;ve expanded the series out to more terms here to make the
        pattern more visible. Notice now we have some terms with an{" "}
        <InlineMathBlock latex="i" /> in them and some without. If we group the
        like terms and factor out the <InlineMathBlock latex="i" /> we get:
      </p>
      <MathBlock latex="e^{ix} = \Bigl(1 - \frac{x^2}{2!} + \frac{x^4}{4!} - \frac{x^6}{6!} + \ldots \Bigr) + i\Bigl(x - \frac{x^3}{3!} + \frac{x^5}{5!} - \frac{x^7}{7!} + \ldots \Bigr)" />
      <p>
        Our amazing discovery now comes as we realise that the two infinite
        series in the brackets are the taylor expansions for{" "}
        <InlineMathBlock latex="\cos" /> and <InlineMathBlock latex="\sin" />{" "}
        respectively! So let&apos;s substitute them in:
      </p>
      <MathBlock latex="e^{ix} = \cos{x} + i\sin{x}" />
      <p>
        That&apos;s quite the incredible formula! Trigonometric functions,
        exponentials and complex numbers all together!
      </p>
      <p>
        Going back to our polar representation from earlier, we can now simplify
        it to:
      </p>
      <MathBlock latex="z = r(\cos{\theta} + i\sin{\theta}) = r e^{i\theta}" />
      <p>
        This is a very useful representation that we will use heavily. Note that
        can also re-state our definition of modulus and conjugate in this form:
      </p>
      <MathBlock
        latex={["|re^{i\\theta}| = r", "(re^{i\\theta})^* = re^{-i\\theta}"]}
      />
      <h2>Exercises</h2>
      <h3>Exercise 1</h3>
      <Exercise
        problem={
          <>
            <p>
              Using the exponential form of the polar representation shown
              above, prove Euler&apos;s formula:
            </p>
            <MathBlock latex="e^{i\pi} + 1 = 0" />
          </>
        }
        solution={
          <>
            <MathBlock
              latex={["e^{i\\pi} = \\cos{\\pi} + i \\sin{\\pi} = -1 + i0 = -1"]}
            />
            <p>
              This is one of the most famous and remarkable formulas in all of
              mathematics. Congratulations on now being able to prove it!
            </p>
          </>
        }
      />
      <h3>Exercise 2</h3>
      <Exercise
        problem={
          <>
            <p>
              Prove the following properties about the conjugation operation:
            </p>
            <MathBlock
              latex={[
                "(z^*)^* = z",
                "(z + z^\\prime)^* = z^* + z^{\\prime*}",
                "(z z^\\prime)^* = z^* z^{\\prime*}",
              ]}
            />
          </>
        }
        solution={
          <>
            <p>
              Note that when it comes to proving these statements, we are free
              to choose either the cartesian or polar representation. We will
              present the proof using whichever one is easier.
            </p>
            <p>For the first statement:</p>
            <MathBlock latex="(z^*)^* = (a - bi)^* = a + bi = z" />
            <p>The second:</p>
            <MathBlock
              latex={[
                "(z + z^\\prime)^* = (a + bi + a^\\prime + b^\\prime i)^*",
                "= ((a + a^\\prime) + i(b + b^\\prime))^*",
                " = (a + a^\\prime) - i(b + b^\\prime)",
                " = a - bi + a^\\prime - b^\\prime i",
                " = z^* + z^{\\prime*}",
              ]}
            />
            <p>The third is easiest to prove with the polar representation:</p>
            <MathBlock
              latex={[
                "(re^{i\\theta} r^{\\prime}e^{i\\theta^{\\prime}})^* = (r r^{\\prime} e^{i(\\theta + \\theta^{\\prime})})^*",
                "= r r^{\\prime} e^{-i(\\theta + \\theta^{\\prime})}",
                "= r e^{-i\\theta} r^{\\prime} e^{-i\\theta^{\\prime}}",
                "= z^* z^{\\prime*}",
              ]}
            />
          </>
        }
      />
      <h3>Exercise 3</h3>
      <Exercise
        problem={
          <>
            <p>
              Just as we showed some properties of the conjugate operator, now
              let&apos;s have a look at a property of the modulus.
            </p>
            <p>Prove the following:</p>
            <MathBlock latex="|z z^\prime| = |z| |z^\prime|" />
          </>
        }
        solution={
          <>
            <MathBlock
              latex={[
                "|z z^\\prime| = |(re^{i\\theta} r^\\prime e^{i\\theta^\\prime})|",
                "= |r r^\\prime e^{i(\\theta + \\theta^\\prime)}|",
                "= r r^\\prime = |z| |z^\\prime|",
              ]}
            />
          </>
        }
      />
    </Article>
  );
};

export default Page;
