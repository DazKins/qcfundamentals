import { getArticlePageMetadata } from "@/course/courseStructure";
import Article from "@/components/article";
import InlineMathBlock from "@/components/inlineMathBlock";
import MathBlock from "@/components/mathBlock";
import Image from "next/image";
import Exercise from "@/components/exercise";
import ArticleImage from "@/components/articleImage";

const CHAPTER_ID = "qubits-and-gates";
const ARTICLE_ID = "qubits";

export const metadata = getArticlePageMetadata(CHAPTER_ID, ARTICLE_ID);

const Page = () => {
  return (
    <Article>
      <p>
        We&apos;re all familiar with classical computers where information is
        represented in bits. Bits can be either <InlineMathBlock latex="0" /> or{" "}
        <InlineMathBlock latex="1" />.
      </p>
      <p>
        Having many of these <InlineMathBlock latex="0" />s and{" "}
        <InlineMathBlock latex="1" />s allows us to represent more complex
        things like numbers, text, images, and videos.
      </p>
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
        dead and alive, a qubit can exist in a superposition of being
        <InlineMathBlock latex="0" /> and <InlineMathBlock latex="1" />.
      </p>
      <p>
        We&apos;ll start to make use of{" "}
        <a href="/chapter/mathematical-foundations/article/bra-ket-notation">
          Bra-ket notation
        </a>{" "}
        by writing our qubit states <InlineMathBlock latex="0" /> and{" "}
        <InlineMathBlock latex="1" /> as <InlineMathBlock latex="\ket{0}" /> and{" "}
        <InlineMathBlock latex="\ket{1}" />. So we are representing our qubits
        as vectors. In fact, these two vectors will form an orthonormal basis:
      </p>
      <MathBlock latex="\braket{0|0} = 1,\ \ \braket{1|1} = 1,\ \ \braket{0|1} = 0" />
      <p>
        We refer to <InlineMathBlock latex="\ket{0}" /> and{" "}
        <InlineMathBlock latex="\ket{1}" /> as the computational basis states.
      </p>
      <p>
        A superposition will be represented like this:{" "}
        <InlineMathBlock latex="a\ket{0} + b\ket{1}" />
        where we are multiplying the vectors <InlineMathBlock latex="\ket{0}" />{" "}
        and <InlineMathBlock latex="\ket{1}" /> by the complex numbers{" "}
        <InlineMathBlock latex="a" /> and <InlineMathBlock latex="b" />{" "}
        respectively. And so our set of possible qubit states forms a vector
        space.
      </p>
      <p>
        When we observe (or measure) a qubit in the computational basis, we will
        get either <InlineMathBlock latex="\ket{0}" /> or{" "}
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
      <p>
        We can make this bit more mathematical by saying the probability of
        getting result <InlineMathBlock latex="\ket{a}" /> when measuring a
        qubit in state <InlineMathBlock latex="\ket{\psi}" /> is given by:
      </p>
      <MathBlock latex="P(a|\psi) = |\braket{a|\psi}|^2" />
      <p>
        This definition is a lot more powerful, because it allows us to measure
        the probability of measurement in any state, not just the computational
        basis states. What it means to measure in a different basis we&apos;ll
        get to later.
      </p>
      <p>
        One last important result we&apos;ll state on these probabilities is
        that if we have{" "}
        <InlineMathBlock latex="\ket{\psi} = a\ket{0} + b\ket{1}" />:
      </p>
      <MathBlock
        latex={[
          "\\braket{\\psi|\\psi} = (a^*\\bra{0} + b^*\\bra{1})(a\\ket{0} + b\\ket{1})",
          "= a^*a\\braket{0|0} + a^*b\\braket{0|1} + b^*a\\braket{1|0} + b^*b\\braket{1|1}",
          "= a^*a + b^*b",
          "= |a|^2 + |b|^2",
          "= 1",
        ]}
      />
      <p>
        This is the normalisation property and is the equivalent of saying
        measurement probabilities must sum to 1. If{" "}
        <InlineMathBlock latex="\braket{\psi|\psi} \neq 1" /> then we do not
        have a valid qubit state.
      </p>
      <h2>Visualising a qubit</h2>
      <p>
        We have a useful tool for visualising the qubit called the Bloch sphere
        (named after the physicist Felix Bloch).
      </p>
      <p>
        The Bloch sphere places the state <InlineMathBlock latex="\ket{0}" /> at
        the north pole, and the state <InlineMathBlock latex="\ket{1}" /> at the
        south pole. Any superposition states lie somewhere in between and the
        latitude represents the probability of measuring either{" "}
        <InlineMathBlock latex="\ket{0}" /> or{" "}
        <InlineMathBlock latex="\ket{1}" />. For example, a qubit that lies on
        the equator has an exact 50/50 chance.
      </p>
      <p>Some example states are shown below:</p>
      <div className="flex flex-col gap-8 sm:flex-row items-center justify-around">
        <div>
          <Image
            src="/article/qubits/bloch-0.png"
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
            src="/article/qubits/bloch-1.png"
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
            src="/article/qubits/bloch-+.png"
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
        A qubit can exist in any state on the Bloch sphere and you can see there
        are a few other states labelled on the diagram. These labellings are
        common practice and are mathematically defined as:
      </p>
      <MathBlock
        latex={[
          "\\ket{+} = \\frac{1}{\\sqrt{2}}\\ket{0} + \\frac{1}{\\sqrt{2}}\\ket{1}",
          "\\ket{-} = \\frac{1}{\\sqrt{2}}\\ket{0} - \\frac{1}{\\sqrt{2}}\\ket{1}",
          "\\ket{R} = \\frac{1}{\\sqrt{2}}\\ket{0} + \\frac{i}{\\sqrt{2}}\\ket{1}",
          "\\ket{L} = \\frac{1}{\\sqrt{2}}\\ket{0} - \\frac{i}{\\sqrt{2}}\\ket{1}",
        ]}
      />
      <p>
        These states seem fairly arbitrary for now, but we will see how they
        might arise later in the course.
      </p>
      <p>
        A key point to note about the bloch sphere is that it can&apos;t
        uniquely represent every possible choice of co-efficients of{" "}
        <InlineMathBlock latex="\ket{0}" /> and{" "}
        <InlineMathBlock latex="\ket{1}" />. To see this we&apos;ll first have
        to show how to calculate a qubit&apos;s point on the bloch sphere.
      </p>
      <p>
        Just like polar coordinates on earth where we use latitude and
        longitude, any position on a sphere can be represented with just two
        angles. The angle <InlineMathBlock latex="\theta" /> represents the
        angle down from the &quot;north pole&quot; (
        <InlineMathBlock latex="\ket{0}" />
        ). e.g for state <InlineMathBlock latex="\ket{1}" /> we have{" "}
        <InlineMathBlock latex="\theta = \pi" />. The second angle{" "}
        <InlineMathBlock latex="\phi" /> represents the rotation around the
        &quot;equator&quot;. e.g. for state <InlineMathBlock latex="\ket{+}" />{" "}
        we have <InlineMathBlock latex="\phi = 0" /> and for state{" "}
        <InlineMathBlock latex="\ket{-}" /> we have{" "}
        <InlineMathBlock latex="\phi = \pi" />. For convenience, we constrain{" "}
        <InlineMathBlock latex="0 \leq \theta \leq \pi" /> and{" "}
        <InlineMathBlock latex="0 \leq \phi < 2\pi " />.
      </p>
      <ArticleImage src="blochangles" alt="" />
      <p>
        The actual position of the qubit on the bloch sphere will be called the
        bloch vector and with a little trigonometry, we find it is given by:
      </p>
      <MathBlock latex="\mathbf{r} = (\cos{\phi}\sin{\theta},\sin{\phi}\sin{\theta},\cos{\theta})" />
      <p>
        where <InlineMathBlock latex="\ket{0}" /> is at{" "}
        <InlineMathBlock latex="(0, 0, 1)" />,{" "}
        <InlineMathBlock latex="\ket{+}" /> is at{" "}
        <InlineMathBlock latex="(1,0,0)" /> etc.
      </p>
      <p>
        Given these constraints we can see the following equation shows us how
        we can take a point on the bloch sphere back to the qubit state:
      </p>
      <MathBlock latex="\ket{\psi} = \cos{\frac{\theta}{2}}\ket{0} + e^{i\phi}\sin{\frac{\theta}{2}}\ket{1}" />
      <p>
        Try plugging in a few values of <InlineMathBlock latex="\theta" /> and{" "}
        <InlineMathBlock latex="\phi" /> to convince yourself this works.
      </p>
      <p>But hang on...</p>
      <p>
        The coefficient of <InlineMathBlock latex="\ket{0}" /> is{" "}
        <InlineMathBlock latex="\cos{\frac{\theta}{2}}" /> which, since our
        angle <InlineMathBlock latex="\theta" /> is always real, is a real
        number. But we said coefficients could be complex numbers here, so how
        do we plot a qubit with a complex coefficient of{" "}
        <InlineMathBlock latex="\ket{0}" /> on our bloch sphere?
      </p>
      <p>
        To anwer this question we&apos;ll talk about something called global
        phase.
      </p>
      <h2>Global Phase</h2>
      <p>
        We already saw earlier that we have a nice way to say mathematically the
        probability of measuring a state <InlineMathBlock latex="\ket{\psi}" />{" "}
        in some basis <InlineMathBlock latex="\ket{a}" /> as{" "}
        <InlineMathBlock latex="|\braket{a|\psi}|^2" />. We want to see what
        happens to this probability when we multiply through by a &quot;global
        phase&quot;.
      </p>
      <p>
        A global phase, just means multiplying the state by a complex number of
        magnitude 1. Thanks to the polar representation of complex numbers, we
        have a very easy way to represent such a number:{" "}
        <InlineMathBlock latex="e^{i\theta}" />.
      </p>
      <p>
        First we need to check whether we&apos;re allowed to do this. If we
        multply some state <InlineMathBlock latex="\ket{\psi}" /> by{" "}
        <InlineMathBlock latex="e^{i\theta}" /> to get a new state{" "}
        <InlineMathBlock latex="\ket{\psi^\prime}" />, is this new state
        normalisable? Let&apos;s check:
      </p>
      <MathBlock latex="\braket{\psi^\prime|\psi^\prime} = (e^{-i\theta}\bra{\psi})(e^{i\theta}\ket{\psi}) = e^{-i\theta}e^{i\theta}\braket{\psi|\psi} = \braket{\psi|\psi}" />
      <p>
        So as long as our original state <InlineMathBlock latex="\ket{\psi}" />{" "}
        is normalisable we can multiply by a global phase.
      </p>
      <p>
        Now let&apos;s see how this global phase affects measurement of some
        basis <InlineMathBlock latex="\ket{a}" />:
      </p>
      <MathBlock latex="P(a|\psi^\prime) = |\braket{a|\psi^\prime}|^2 = |\bra{a}e^{i\theta}\ket{\psi}|^2 = |e^{i\theta}\braket{a|\psi}|^2 = (|e^{i\theta}||\braket{a|\psi}|)^2 = |\braket{a|\psi}|^2 = P(a|\psi)" />
      <p>
        These two results are quite interesting. They show us that multiplying a
        qubit by a global phase doesn&apos;t change the probability of measuring
        it in any basis. This is a very important property of qubits, and it
        means that the global phase of a qubit is unobservable. We would say
        that the two states <InlineMathBlock latex="\ket{\psi}" /> and{" "}
        <InlineMathBlock latex="\ket{\psi^\prime}" /> are physically equivalent.
      </p>
      <p>
        Ok, so now we&apos;re ready to answer our original question. How do we
        plot our qubit with a complex coefficient of{" "}
        <InlineMathBlock latex="\ket{0}" /> on the bloch sphere? Let&apos;s
        specify our coefficients in polar form:
      </p>
      <MathBlock latex="\ket{\psi} = r_{0}e^{i\theta_0}\ket{0} + r_{1}e^{i\theta_1}\ket{1}" />
      <p>
        Now that we know we can multiply by global phase, let&apos;s multiply
        through by <InlineMathBlock latex="e^{-i\theta_0}" />:
      </p>
      <MathBlock latex="\ket{\psi^\prime} = e^{-i\theta_0}\ket{\psi} = r_{0}\ket{0} + r_{1}e^{i(\theta_1 - \theta_0)}\ket{1}" />
      <p>
        So we&apos;ve managed to make the coefficient of{" "}
        <InlineMathBlock latex="\ket{0}" /> real without physically changing the
        qubit.
      </p>
      <p>
        We can then match the parameters to the bloch sphere equation to get the
        angles:
      </p>
      <MathBlock
        latex={[
          "\\ket{\\psi^\\prime} = r_{0}\\ket{0} + r_{1}e^{i(\\theta_1 - \\theta_0)}\\ket{1}",
          "\\cos{\\frac{\\theta}{2}} + e^{i\\phi}\\sin{\\frac{\\theta}{2}}",
          "\\therefore \\phi = \\theta_1 - \\theta_0",
          "\\cos{\\frac{\\theta}{2}} = r_{0}",
          "\\sin{\\frac{\\theta}{2}} = r_{1}",
          "\\therefore \\tan{\\frac{\\theta}{2}} = \\frac{r_{1}}{r_{0}}",
          "\\theta = 2\\tan^{-1}{\\frac{r_{1}}{r_{0}}}",
        ]}
      />
      <p>
        So we can see that we can plot any qubit state on the bloch sphere, even
        if the coefficient of <InlineMathBlock latex="\ket{0}" /> is complex.{" "}
      </p>
      <p>
        The process we&apos;ve gone through here is a very important one and
        extends well beyond the bloch sphere. There will be many applications in
        the future when it will be useful for us to multiply by some global
        phase in order to make a coefficient real. Since multiplying by a global
        phase represents a rotation on the complex plane, it is always possible
        to make any given coefficient real through this process.
      </p>
      <h2>Exercises</h2>
      <h3>Exercise 1</h3>
      <Exercise
        problem={
          <>
            <p>
              Calculate the probability of measuring{" "}
              <InlineMathBlock latex="\ket{R}" /> when in the state{" "}
              <InlineMathBlock latex="\ket{+}" />.
            </p>
          </>
        }
        solution={
          <>
            <MathBlock
              latex={[
                "P(R|+) = |\\braket{R|+}|^2",
                "= \\Bigl|\\Bigl(\\frac{1}{\\sqrt{2}}\\bra{0}-\\frac{i}{\\sqrt{2}}\\bra{1}\\Bigr)\\Bigl(\\frac{1}{\\sqrt{2}}\\ket{0} + \\frac{1}{\\sqrt{2}}\\ket{1}\\Bigr)\\Bigr|^2",
                "= \\Bigl|\\frac{1}{2}\\braket{0|0} + \\frac{1}{2}\\braket{0|1} - \\frac{i}{2}\\braket{1|0} - \\frac{i}{2}\\braket{1|1}\\Bigr|^2",
                "= \\Bigl|\\frac{1}{2} - \\frac{i}{2}\\Bigr|^2",
                "= \\frac{1}{2}^2 + \\frac{1}{2}^2",
                "= \\frac{1}{2}",
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
              Without further calculation, by observation of the bloch sphere
              calculate some of the other observation probabilities for
              different states. e.g. the probability of measuring{" "}
              <InlineMathBlock latex="\ket{0}" /> when in the state{" "}
              <InlineMathBlock latex="\ket{L}" />, the probability of measuring{" "}
              <InlineMathBlock latex="\ket{0}" /> when in the state{" "}
              <InlineMathBlock latex="\ket{-}" /> etc.
            </p>
          </>
        }
        solution={
          <>
            <p>
              The pattern we are starting to observe is that points opposite
              eachother on the bloch sphere are orthogonal basis states. That
              is, when in some state, the probability of measuring the state on
              the opposite side of the bloch sphere is always 0.
            </p>
            <p>
              Hence we will never measure <InlineMathBlock latex="\ket{-}" />{" "}
              when in state <InlineMathBlock latex="\ket{+}" />, we will never
              measure <InlineMathBlock latex="\ket{R}" /> when in state{" "}
              <InlineMathBlock latex="\ket{L}" /> etc.
            </p>
            <p>
              The other pattern we see is that for the points halfway between a
              pair of orthogonal basis states, we have a measurement probability
              of <InlineMathBlock latex="\frac{1}{2}" />. Note that since we are
              on a sphere, there is a continuous circle of points halfway
              between any two opposite points so there are an infinite number of
              states with such a probability.
            </p>
            <p>
              Hence we have a <InlineMathBlock latex="\frac{1}{2}" />{" "}
              probability to measure either <InlineMathBlock latex="\ket{0}" />{" "}
              or <InlineMathBlock latex="\ket{1}" /> from state{" "}
              <InlineMathBlock latex="\ket{+}" />,{" "}
              <InlineMathBlock latex="\ket{-}" />,{" "}
              <InlineMathBlock latex="\ket{R}" />,{" "}
              <InlineMathBlock latex="\ket{L}" />.
            </p>
            <p>
              One thing we haven&apos;t seen yet are states with non{" "}
              <InlineMathBlock latex="\frac{1}{2}" /> measurement probabilities.
              We can intuit from our observations so far that the probability of
              measuring a given state from another state is proportional to the
              distance between them on the sphere.
            </p>
            <p>
              So we will find that a state halfway between{" "}
              <InlineMathBlock latex="\ket{+}" /> and{" "}
              <InlineMathBlock latex="\ket{0}" /> will have a higher probability
              to be measured as <InlineMathBlock latex="\ket{0}" /> than{" "}
              <InlineMathBlock latex="\ket{1}" />.
            </p>
          </>
        }
      />
      <h3>Exercise 3</h3>
      <Exercise
        problem={
          <>
            <p>
              Show that the state
              <InlineMathBlock latex="\ket{\psi} = i\ket{0} + 2\ket{1}" /> is
              not normalised.
            </p>
            <p>
              Then normalise it. That means, find a factor that we can multiply
              by to meet to the normalisation requirement.
            </p>
            <p>
              Find the position of this normalised state on the bloch sphere
              (the angles <InlineMathBlock latex="\theta" /> and{" "}
              <InlineMathBlock latex="\phi" />
              ).
            </p>
          </>
        }
        solution={
          <>
            <p>
              We show that <InlineMathBlock latex="\ket{\psi}" /> is not
              normalised by showing{" "}
              <InlineMathBlock latex="\braket{\psi|\psi} \neq 1" />:
            </p>
            <MathBlock
              latex={[
                "\\braket{\\psi|\\psi} = (-i\\bra{0} + 2\\bra{1})(i\\ket{0} + 2\\ket{1})",
                "= (-i)(i) + 2 \\times 2 = 5",
              ]}
            />
            <p>
              To normalise this state, we need to find some factor{" "}
              <InlineMathBlock latex="k" /> such that{" "}
              <InlineMathBlock latex="\bra{\psi}k^*k\ket{\psi} = 1" />. This is
              easy to calculate:
            </p>
            <MathBlock
              latex={[
                "\\bra{\\psi}k^*k\\ket{\\psi} = (-ik)(ik) + (2k)^2 = 5k^2",
                "\\therefore k^2 = \\frac{1}{5}",
              ]}
            />
            <p>
              So <InlineMathBlock latex="k" /> could be{" "}
              <InlineMathBlock latex="\frac{1}{\sqrt{5}}" /> or{" "}
              <InlineMathBlock latex="-\frac{1}{\sqrt{5}}" />. We&apos;ll just
              focus on the positive case here since the two possibilities are
              equivalent by a global phase of <InlineMathBlock latex="-1" />.
            </p>
            <p>So our normalised state is:</p>
            <MathBlock latex="\ket{\psi^\prime} = \frac{i}{\sqrt{5}}\ket{0}+\frac{2}{\sqrt{5}}\ket{1}" />
            <p>
              Note that this is a common pattern. If you ever need to normalise
              a state you can divide through by{" "}
              <InlineMathBlock latex="\sqrt{\braket{\psi|\psi}}" />.
            </p>
            <p>
              In order to plot on the bloch sphere we now need to write our
              coefficients in polar form:
            </p>
            <MathBlock latex="\ket{\psi^\prime} = \frac{1}{\sqrt{5}}e^{i\pi/2}\ket{0} + \frac{2}{\sqrt{5}}e^{i0}\ket{1}" />
            <p>And we can use this to calculate our angles:</p>
            <MathBlock latex="\phi = 0 - \frac{\pi}{2} = -\frac{\pi}{2}" />
            <MathBlock latex="\theta = 2\tan^{-1}{\frac{2/\sqrt{5}}{1/\sqrt{5}}} = 2\tan^{-1}{2} \approx 2.214" />
            <p>
              Looking at the angle diagrams from earlier this tells us our state
              lives somewhere between <InlineMathBlock latex="\ket{1}" /> and{" "}
              <InlineMathBlock latex="\ket{L}" />.
            </p>
          </>
        }
      />
    </Article>
  );
};

export default Page;
