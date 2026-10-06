import Article from "@/components/article";
import ArticleImage from "@/components/articleImage";
import ArticleLink from "@/components/articleLink";
import InlineMathBlock from "@/components/inlineMathBlock";
import MathBlock from "@/components/mathBlock";
import { getArticlePageMetadata } from "@/course/courseStructure";

import quantumfouriertransformImage from "./images/quantumfouriertransform.png";

const CHAPTER_ID = "quantum-algorithms";
const ARTICLE_ID = "quantum-fourier-transform";

export const metadata = getArticlePageMetadata(CHAPTER_ID, ARTICLE_ID);

const Page = () => {
  return (
    <Article>
      <p>
        The quantum Fourier transform (QFT) applies a discrete Fourier transform
        to the amplitudes of a quantum state. It changes how information is
        encoded in the state, making it a useful building block for algorithms
        that work with phases and periodicity.
      </p>
      <p>
        We&apos;ll start with the discrete Fourier transform, rewrite the QFT of
        a computational basis state as a product of single-qubit states, and use
        that expression to build a circuit with Hadamard and controlled phase
        gates.
      </p>
      <h2>What you will learn</h2>
      <ul>
        <li>
          Interpret the complex phase factors in the discrete Fourier transform.
        </li>
        <li>
          Use binary fractions to derive the QFT&apos;s product representation.
        </li>
        <li>
          Follow the Hadamard, controlled phase and SWAP gates in a QFT circuit.
        </li>
        <li>
          Understand why the circuit uses a quadratic number of gates in the
          number of qubits.
        </li>
      </ul>
      <h2>Prerequisites</h2>
      <p>
        Start with{" "}
        <ArticleLink
          chapterId="mathematical-foundations"
          articleId="complex-numbers"
        >
          complex numbers and rotations
        </ArticleLink>
        ,{" "}
        <ArticleLink
          chapterId="mathematical-foundations"
          articleId="bra-ket-notation"
        >
          bra-ket notation
        </ArticleLink>
        , and the tensor products in{" "}
        <ArticleLink chapterId="qubits-and-gates" articleId="multiple-qubits">
          Multiple Qubits
        </ArticleLink>
        . You&apos;ll also use the Hadamard gate from{" "}
        <ArticleLink
          chapterId="qubits-and-gates"
          articleId="single-qubit-gates"
        >
          Single Qubit Gates
        </ArticleLink>{" "}
        and controlled operations from{" "}
        <ArticleLink chapterId="qubits-and-gates" articleId="multi-qubit-gates">
          Multi Qubit Gates
        </ArticleLink>
        .
      </p>
      <h2>The discrete Fourier transform</h2>
      <p>
        The discrete fourier transform is a mathematical operation that takes,
        as input, a sequence of numbers{" "}
        <InlineMathBlock latex="x_0, \ldots, x_{N-1}" /> and outputs a new
        sequence of numbers <InlineMathBlock latex="y_0, \ldots, y_{N-1}" />{" "}
        where:
      </p>
      <MathBlock latex="y_k = \frac{1}{\sqrt{N}}\sum_{j=0}^{N-1}x_je^{2\pi ijk/N}" />
      <p>Looks scary? Let&apos;s break it down.</p>
      <p>
        Firstly, let&apos;s revise our complex numbers a bit. Remember that{" "}
        <InlineMathBlock latex="e^{i \theta}" /> merely represents a rotation of{" "}
        <InlineMathBlock latex="\theta" /> radians around the complex unit
        circle. Since we know that <InlineMathBlock latex="2\pi" /> is a full
        rotation this means the exponential term is just{" "}
        <InlineMathBlock latex="jk/N" /> full rotations around the circle.
      </p>
      <p>
        In fact, to make this more obvious we will define a symbol to simplify
        our equation:
      </p>
      <MathBlock latex="\omega_N = e^{2\pi i/N}" />
      <p>
        So <InlineMathBlock latex="\omega_N" /> is a{" "}
        <InlineMathBlock latex="1/N" />
        -th rotation around the unit circle.{" "}
        <InlineMathBlock latex="\omega^{2}_N" /> is a{" "}
        <InlineMathBlock latex="2/N" />
        -th rotation and so on. We can then also see that{" "}
        <InlineMathBlock latex="\omega^{N}_N" /> is the same as{" "}
        <InlineMathBlock latex="\omega^{0}_N" /> since doing a full rotation is
        the same as doing no rotation. And from there it&apos;s fairly clear
        that we get relations like:{" "}
        <InlineMathBlock latex="\omega^{2}_N = \omega^{N+2}_N = \omega^{2N+2}_N" />
        . So we end up with a circular pattern very similar to the powers of{" "}
        <InlineMathBlock latex="i" />.
      </p>
      <p>
        Just to be clear, let&apos;s now re-write our original equation with{" "}
        <InlineMathBlock latex="\omega" />:
      </p>
      <MathBlock latex="y_k = \frac{1}{\sqrt{N}}\sum_{j=0}^{N-1}x_j\omega_{N}^{jk}" />
      <p>
        So our fourier transform is starting to make some more sense. Each term{" "}
        <InlineMathBlock latex="y_k" /> in the output sequence is a sum of all
        the input terms <InlineMathBlock latex="x_j" /> multiplied by a rotation
        of <InlineMathBlock latex="jk/N" /> around the unit circle.
      </p>
      <p>
        The rotation patterns can be seen easier if we look at a concrete
        example in the case when <InlineMathBlock latex="N=5" />:
      </p>
      <MathBlock
        latex={[
          "y_0 = \\frac{1}{\\sqrt{N}}(x_0\\omega^0_5 +x_1\\omega^0_5 +x_2\\omega^0_5 +x_3\\omega^0_5 +x_4\\omega^0_5)",
          "y_1 = \\frac{1}{\\sqrt{N}}(x_0\\omega^0_5 +x_1\\omega^1_5 +x_2\\omega^2_5 +x_3\\omega^3_5 +x_4\\omega^4_5)",
          "y_2 = \\frac{1}{\\sqrt{N}}(x_0\\omega^0_5 +x_1\\omega^2_5 +x_2\\omega^4_5 +x_3\\omega^6_5 +x_4\\omega^8_5)",
          "y_3 = \\frac{1}{\\sqrt{N}}(x_0\\omega^0_5 +x_1\\omega^3_5 +x_2\\omega^6_5 +x_3\\omega^9_5 +x_4\\omega^{12}_5)",
          "y_4 = \\frac{1}{\\sqrt{N}}(x_0\\omega^0_5 +x_1\\omega^4_5 +x_2\\omega^8_5 +x_3\\omega^{12}_5 +x_4\\omega^{16}_5)",
        ]}
      />
      <p>
        We can then simplify all of our omegas using the rules we learned
        earlier:
      </p>
      <MathBlock
        latex={[
          "y_0 = \\frac{1}{\\sqrt{N}}(x_0 +x_1 +x_2 +x_3 +x_4)",
          "y_1 = \\frac{1}{\\sqrt{N}}(x_0 +x_1\\omega^1_5 +x_2\\omega^2_5 +x_3\\omega^3_5 +x_4\\omega^4_5)",
          "y_2 = \\frac{1}{\\sqrt{N}}(x_0 +x_1\\omega^2_5 +x_2\\omega^4_5 +x_3\\omega^1_5 +x_4\\omega^3_5)",
          "y_3 = \\frac{1}{\\sqrt{N}}(x_0 +x_1\\omega^3_5 +x_2\\omega^1_5 +x_3\\omega^4_5 +x_4\\omega^2_5)",
          "y_4 = \\frac{1}{\\sqrt{N}}(x_0 +x_1\\omega^4_5 +x_2\\omega^3_5 +x_3\\omega^2_5 +x_4\\omega^1_5)",
        ]}
      />
      <p>
        It&apos;s not immediately clear what&apos;s useful about this. Usually
        this idea is first presented in a mathematics course where it can be
        used to analyze signals. In that context, the fourier transform is used
        to decompose a signal into its constituent frequencies. This is useful
        because it allows us to understand the signal better and to filter out
        noise.
      </p>
      <p>
        For our case though, we&apos;ll simply stick with the definition and see
        how we can apply this to our quantum algorithms. It&apos;s use will
        hopefully become apparent later.
      </p>
      <h2>From the discrete transform to the QFT</h2>
      <p>
        The quantum Fourier transform is a linear operation. On a computational
        basis state <InlineMathBlock latex="\ket{y}" />, it acts as follows:
      </p>
      <MathBlock latex="\operatorname{QFT}\ket{y} = \frac{1}{\sqrt{N}}\sum_{j=0}^{N-1}\omega_N^{yj}\ket{j}" />
      <p>
        Here <InlineMathBlock latex="y" /> labels the input basis state, and{" "}
        <InlineMathBlock latex="j" /> runs over the output basis states. The
        phase factors depend on both indices. For a superposition input, apply
        this rule to each basis state and add the results with the original
        amplitudes.
      </p>
      <p>
        Note also that although <InlineMathBlock latex="y" /> and{" "}
        <InlineMathBlock latex="j" /> are used like normal numbers in this
        equation, we know that the kets are actually formed of a tensor product
        of <InlineMathBlock latex="\ket{1}" />s and{" "}
        <InlineMathBlock latex="\ket{0}" />s that are the binary representation
        of the number. We should therefore assume that{" "}
        <InlineMathBlock latex="y" /> and <InlineMathBlock latex="j" /> are
        formed from the same number of bits and therefore{" "}
        <InlineMathBlock latex="N = 2^n" /> for some{" "}
        <InlineMathBlock latex="n" />.
      </p>
      <h2>Deriving the product representation</h2>
      <p>
        To understand how we implement this in a quantum circuit, we will use
        some algebra to transform this summation formula into a different tensor
        product form, that will more easily translate into a circuit.
      </p>
      <p>
        To do this, our first step is to split the <InlineMathBlock latex="j" />{" "}
        summation into it&apos;s individual bits:
      </p>
      <MathBlock latex="\operatorname{QFT}\ket{y} = \frac{1}{\sqrt{N}}\sum_{j_1=0}^{1} \ldots \sum_{j_n=0}^{1}\omega_N^{yj}\ket{j_1, \ldots, j_n}" />
      <p>
        Then we&apos;ll look at a slightly different representation of our{" "}
        <InlineMathBlock latex="\omega" /> term. We know that{" "}
        <InlineMathBlock latex="\omega_N^{yj} = e^{2\pi iyj/N}" />. But since{" "}
        <InlineMathBlock latex="N = 2^n" /> the division by{" "}
        <InlineMathBlock latex="N" /> here is simply shifting the bits of{" "}
        <InlineMathBlock latex="j" /> to after the decimal point. i.e. if{" "}
        <InlineMathBlock latex="n = 4" /> and{" "}
        <InlineMathBlock latex="j = 0101" /> in binary, then we have{" "}
        <InlineMathBlock latex="j/2^n = j/N = 0.0101" />.
      </p>
      <p>
        In general, this shifting the bits to the right of the decimal point can
        be represented as:
      </p>
      <MathBlock latex="j/N = j/2^n = \sum_{l=1}^{n}j_l2^{-l}" />
      <p>
        So our <InlineMathBlock latex="\omega" /> term becomes:
      </p>
      <MathBlock latex="\omega_N^{yj} = e^{2\pi iy\sum_{l=1}^{n}j_l2^{-l}}" />
      <p>And our main equation becomes:</p>
      <MathBlock latex="\operatorname{QFT}\ket{y} = \frac{1}{\sqrt{N}}\sum_{j_1=0}^{1} \ldots \sum_{j_n=0}^{1}e^{2\pi iy\sum_{l=1}^{n}j_l2^{-l}}\ket{j_1, \ldots, j_n}" />
      <p>
        Since the exponential co-efficient is now represented as a sum of
        <InlineMathBlock latex="j" />s individual bits, we can also separate the
        ket into a tensor product of the individual bits:
      </p>
      <MathBlock
        latex={[
          "\\operatorname{QFT}\\ket{y} = \\frac{1}{\\sqrt{N}}\\sum_{j_1=0}^{1} \\ldots \\sum_{j_n=0}^{1}e^{2\\pi iyj_12^{-1}}\\ket{j_1} \\otimes \\ldots \\otimes e^{2\\pi iyj_n2^{-n}}\\ket{j_n}",
          "= \\frac{1}{\\sqrt{N}}\\sum_{j_1=0}^{1} \\ldots \\sum_{j_n=0}^{1} \\bigotimes_{l=1}^{n}e^{2\\pi iyj_l2^{-l}}\\ket{j_l}",
        ]}
      />
      <p>
        And now, since we know the tensor product stitches together the{" "}
        <InlineMathBlock latex="\ket{1}" />s and{" "}
        <InlineMathBlock latex="\ket{0}" />
        s, we can move the tensor product to the outside to do this instead of
        summing over each bit:
      </p>
      <MathBlock latex="\operatorname{QFT}\ket{y} = \frac{1}{\sqrt{N}}\bigotimes_{l=1}^{n}\sum_{j_l=0}^{1}e^{2\pi iyj_l2^{-l}}\ket{j_l}" />
      <p>
        And now our summation is just for 2 terms, so we can remove the big
        summation and write it explicitly:
      </p>
      <MathBlock
        latex={[
          "\\operatorname{QFT}\\ket{y} = \\frac{1}{\\sqrt{N}}\\bigotimes_{l=1}^{n}\\Bigl[e^{2\\pi iy0\\cdot 2^{-l}}\\ket{0} + e^{2\\pi iy1 \\cdot 2^{-l}}\\ket{1}\\Bigr]",
          "\\operatorname{QFT}\\ket{y} = \\frac{1}{\\sqrt{N}}\\bigotimes_{l=1}^{n}\\Bigl[\\ket{0} + e^{2\\pi iy2^{-l}}\\ket{1}\\Bigr]",
        ]}
      />
      <p>
        The last step will involve that <InlineMathBlock latex="y2^{-l}" /> term
        in the exponent. If <InlineMathBlock latex="y" /> has bits{" "}
        <InlineMathBlock latex="y_1,\ldots,y_n" /> then multiplying by{" "}
        <InlineMathBlock latex="2^{-l}" /> is shifting these bits{" "}
        <InlineMathBlock latex="l" /> places to the right. e.g. if{" "}
        <InlineMathBlock latex="y = 01011" /> and{" "}
        <InlineMathBlock latex="l=3" /> we have{" "}
        <InlineMathBlock latex="y2^{-l} = 01.011" />. In general this is of the
        form:{" "}
        <InlineMathBlock latex="y2^{-l} = y_1 \ldots y_{n-l}.y_{n-l+1} \ldots y_n" />{" "}
        where the decimal place ends up between the{" "}
        <InlineMathBlock latex="n-l" />
        th and <InlineMathBlock latex="n-l+1" />
        th digit.
      </p>
      <p>
        But, notice that this number is multiplying{" "}
        <InlineMathBlock latex="2\pi i" /> in the exponent so any whole part of
        this number (i.e. any number to the left of the decimal point)
        represents a full rotation so can be ignored. So we end up with:
      </p>
      <MathBlock
        latex={[
          "\\operatorname{QFT}\\ket{y} = \\frac{1}{\\sqrt{N}}\\bigotimes_{l=1}^{n}\\Bigl[\\ket{0} + e^{2\\pi i0.y_{n-l+1}\\ldots y_n}\\ket{1}\\Bigr]",
        ]}
      />
      <p>
        To clean this up, let&apos;s drop the big{" "}
        <InlineMathBlock latex="\otimes" /> symbol and replace{" "}
        <InlineMathBlock latex="N" /> with <InlineMathBlock latex="2^n" />:
      </p>
      <MathBlock latex="\operatorname{QFT}\ket{y} = \frac{(\ket{0} + e^{2\pi i0.y_n}\ket{1})(\ket{0} + e^{2\pi i0.y_{n-1}y_n}\ket{1}) \ldots (\ket{0} + e^{2\pi i0.y_1 \ldots y_n}\ket{1})}{2^{n/2}}" />
      <p>
        This is the product representation of the quantum fourier transform.
        It&apos;s useful because it better shows the behaviour on individual
        bits and will allow us to construct a circuit easier.
      </p>
      <h2>Building the QFT circuit</h2>
      <p>
        To build the circuit, we&apos;ll need to invent some new gates. The
        quantum gates we&apos;ve studied previously have mostly been focussed
        with discrete jumps around the Bloch Sphere. As we can see from our
        equation above, the quantum fourier transform will involve rotations of
        the phase of the <InlineMathBlock latex="\ket{1}" /> state. So
        let&apos;s create the gates:
      </p>
      <MathBlock
        latex={[
          "R_x\\ket{0} = \\ket{0}",
          "R_x\\ket{1} = e^{2\\pi i / 2^x}\\ket{1}",
        ]}
      />
      <p>
        So all of these gates leave the <InlineMathBlock latex="\ket{0}" />{" "}
        state alone and rotate the phase of the{" "}
        <InlineMathBlock latex="\ket{1}" /> state by a{" "}
        <InlineMathBlock latex="1/2^x" />
        th of a full rotation. i.e. <InlineMathBlock latex="R_1" /> rotates{" "}
        <InlineMathBlock latex="\ket{1}" /> by 180 degress and{" "}
        <InlineMathBlock latex="R_2" /> rotates{" "}
        <InlineMathBlock latex="\ket{1}" /> by 90 degrees etc.
      </p>
      <p>
        Let&apos;s now present the quantum circuit for the quantum fourier
        transform and then examine why it works:
      </p>
      <ArticleImage
        src={quantumfouriertransformImage}
        alt="The quantum circuit for the quantum fourier transform consisting of Hadmard gates and R gates"
      />
      <p>
        Notice that our <InlineMathBlock latex="R" /> gates are controlled
        gates. Just like we&apos;ve seen other controlled gates previously,
        these gates only apply their rotation if the control qubit is in the{" "}
        <InlineMathBlock latex="\ket{1}" /> state.
      </p>
      <p>
        To see that this works, let&apos;s start by just following the{" "}
        <InlineMathBlock latex="\ket{y_1}" /> qubit for now.
      </p>
      <p>
        Applying the first Hadamard gate gives us{" "}
        <InlineMathBlock latex="\frac{1}{\sqrt{2}}(\ket{0} + e^{2\pi i0.y_1}\ket{1})" />{" "}
        since if <InlineMathBlock latex="y_1 = 0" /> then{" "}
        <InlineMathBlock latex="e^{2\pi i0.y_1} = 1" /> and if{" "}
        <InlineMathBlock latex="y_1 = 1" /> then{" "}
        <InlineMathBlock latex="e^{2\pi i0.y_1} = -1" />.
      </p>
      <p>
        The controlled <InlineMathBlock latex="R_2" /> gate then takes us to{" "}
        <InlineMathBlock latex="\frac{1}{\sqrt{2}}(\ket{0} + e^{2\pi i0.y_1y_2}\ket{1})" />{" "}
        since the <InlineMathBlock latex="\ket{1}" /> state will undergo a
        further 90 degree rotation if <InlineMathBlock latex="y_2 = 1" />.
      </p>
      <p>
        Continuing on in this fashion, the first qubit ends in the state{" "}
        <InlineMathBlock latex="\frac{1}{\sqrt{2}}(\ket{0} + e^{2\pi i0.y_1 \ldots y_n}\ket{1})" />
        . Our total state so far is then:
      </p>
      <MathBlock latex="\frac{(\ket{0} + e^{2\pi i0.y_1 \ldots y_n}\ket{1})}{2^{1/2}}\ket{y_2, \ldots, y_n}" />
      <p>
        Continuing in this fasion we apply one fewer rotation for each qubit, so
        following the same steps for the second qubit brings us to:
      </p>
      <MathBlock latex="\frac{(\ket{0} + e^{2\pi i0.y_1 \ldots y_n}\ket{1})(\ket{0} + e^{2\pi i0.y_2 \ldots y_n}\ket{1})}{2^{2/2}}\ket{y_3, \ldots, y_n}" />
      <p>
        Following the pattern for the rest of our qubits gives the circuit state
        before reversing the output qubits, which we&apos;ll call{" "}
        <InlineMathBlock latex="\ket{\psi_{\mathrm{rev}}}" />:
      </p>
      <MathBlock latex="\ket{\psi_{\mathrm{rev}}} = \frac{(\ket{0} + e^{2\pi i0.y_1 \ldots y_n}\ket{1})(\ket{0} + e^{2\pi i0.y_2 \ldots y_n}\ket{1}) \ldots (\ket{0} + e^{2\pi i0.y_n}\ket{1})}{2^{n/2}}" />
      <h2>Reversing the output qubits</h2>
      <p>
        This is almost what we want, but notice that the qubits are actually
        backwards compared to our equation from earlier!
      </p>
      <p>
        This is easily solved by using{" "}
        <InlineMathBlock latex="\lfloor n/2 \rfloor" />{" "}
        <InlineMathBlock latex="\text{SWAP}" /> gates to move the positions of
        the qubits.
      </p>
      <p>
        After these SWAP gates, the output is{" "}
        <InlineMathBlock latex="\operatorname{QFT}\ket{y}" />. So we&apos;ve
        found a circuit that implements the quantum Fourier transform!
      </p>
      <h2>How many gates does the QFT need?</h2>
      <p>
        We apply <InlineMathBlock latex="n" /> gates to the first qubit,{" "}
        <InlineMathBlock latex="n-1" /> gates to the 2nd etc. followed by{" "}
        <InlineMathBlock latex="\lfloor n/2 \rfloor" />{" "}
        <InlineMathBlock latex="\text{SWAP}" /> gates so we end up using a total
        of{" "}
        <InlineMathBlock latex="(n + (n - 1) + \ldots + 2 + 1) + \lfloor n/2 \rfloor = \frac{n(n+1)}{2} + \lfloor n/2 \rfloor" />{" "}
        gates. So this is fairly efficient, no exponential scaling.
      </p>
      <p>
        This gives us an <InlineMathBlock latex="O(n^2)" />
        -gate circuit on <InlineMathBlock latex="n" /> qubits, treating each
        controlled phase gate as one gate. Its output is a quantum state:
        measuring it does not reveal every transformed amplitude. This
        distinction matters when comparing the QFT with a classical Fourier
        transform that returns a list of numbers.
      </p>
      <h2>Related lessons</h2>
      <ul>
        <li>
          <ArticleLink chapterId="quantum-algorithms" articleId="order-finding">
            Order Finding
          </ArticleLink>
          : see how the QFT helps extract periodic structure.
        </li>
        <li>
          <ArticleLink chapterId="quantum-algorithms" articleId="shor">
            Shor&apos;s Algorithm
          </ArticleLink>
          : connect order finding to integer factorisation.
        </li>
        <li>
          <ArticleLink chapterId="quantum-algorithms" articleId="grover-search">
            Grover Search
          </ArticleLink>
          : compare a search algorithm based on amplitude amplification.
        </li>
      </ul>
    </Article>
  );
};

export default Page;
