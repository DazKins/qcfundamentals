import Article from "@/components/article";
import ArticleImage from "@/components/articleImage";
import Exercise from "@/components/exercise";
import InlineMathBlock from "@/components/inlineMathBlock";
import MathBlock from "@/components/mathBlock";
import Table from "@/components/table";
import { getArticlePageMetadata } from "@/course/courseStructure";

const CHAPTER_ID = "quantum-algorithms";
const ARTICLE_ID = "deutsch-jozsa";

export const metadata = getArticlePageMetadata(CHAPTER_ID, ARTICLE_ID);

const Page = () => {
  return (
    <Article>
      <p>
        The Deutsch-Jozsa algorithm is one of the most basic examples of an
        algorithm that solves a problem quicker than any classical algorithm. It
        was first proposed in 1992 and is one of the oldest examples that proves
        how quantum computers can beat classical computers in certain tasks.
      </p>
      <p>
        The problem is this: given a 1-bit mathematical function{" "}
        <InlineMathBlock latex="f" /> that takes a single bit as input and
        produces a single bit as output, determine if the function is
        &quot;constant&quot; or &quot;balanced&quot;.
      </p>
      <p>
        A constant function is a function that always returns the same output
        whereas a balanced one is one that returns a 0 for half of the inputs
        and a 1 for the other half.
      </p>
      <p>
        Now, there are only 4 different functions that take a single bit as
        input and output. Here are the two constant functions:
      </p>
      <div className="flex flex-col gap-8 sm:flex-row justify-around items-stretch">
        <Table
          data={[
            [
              <InlineMathBlock latex="x" key="00" />,
              <InlineMathBlock latex="f(x)" key="01" />,
            ],
            [0, 0],
            [1, 0],
          ]}
          headerRow={true}
        />
        <Table
          data={[
            [
              <InlineMathBlock latex="x" key="00" />,
              <InlineMathBlock latex="f(x)" key="01" />,
            ],
            [0, 1],
            [1, 1],
          ]}
          headerRow={true}
        />
      </div>
      <p>and the two balanced functions:</p>
      <div className="flex flex-col gap-8 sm:flex-row justify-around items-stretch">
        <Table
          data={[
            [
              <InlineMathBlock latex="x" key="00" />,
              <InlineMathBlock latex="f(x)" key="01" />,
            ],
            [0, 0],
            [1, 1],
          ]}
          headerRow={true}
        />
        <Table
          data={[
            [
              <InlineMathBlock latex="x" key="00" />,
              <InlineMathBlock latex="f(x)" key="01" />,
            ],
            [0, 1],
            [1, 0],
          ]}
          headerRow={true}
        />
      </div>
      <p>
        So our two constant functions are the function that always returns 1 and
        the function that always returns 0. Our two balanced functions are the
        identity and the NOT (or inversion) function.
      </p>
      <p>
        First let&apos;s analyse this problem from the classical perspective.
        How could we determine whether <InlineMathBlock latex="f" /> is constant
        or balanced?
      </p>
      <p>
        We could start by simply evaluating <InlineMathBlock latex="f(0)" /> and
        seeing what value we get. If it is 0, then our function is either the
        constant 0 function or the identity function. One of these functions is
        constant and the other balanced, so we need to evaluate{" "}
        <InlineMathBlock latex="f(1)" /> to determine which one it is.
      </p>
      <p>
        From this example it&apos;s fairly clear to see that in any case we will
        need to query the function twice to determine if it is constant or
        balanced. This is the best we can do classically.
      </p>
      <p>
        What we&apos;ll see next is the remarkable result that with a quantum
        computer we can solve our problem by querying the function only once.
      </p>
      <p>
        But first, we need some more mathematical setup. What does it mean to
        evaluate a function on a quantum computer? To answer this, we&apos;ll
        introduce the quantum oracle.
      </p>
      <p>
        The quanutm oracle <InlineMathBlock latex="U_f" /> for a given function{" "}
        <InlineMathBlock latex="f" /> is defined as follows:
      </p>
      <MathBlock latex="U_f(\ket{x} \otimes \ket{y})=\ket{x} \otimes \ket{y \oplus f(x)}" />
      <p>
        where <InlineMathBlock latex="\oplus" /> denotes addition modulo 2.
      </p>
      <p>
        This looks a bit odd. Where does this value{" "}
        <InlineMathBlock latex="y" /> come from? It is a bit of a technicality,
        but it is there to ensure that the oracle is reversible.
      </p>
      <p>
        Note that if we didn&apos;t have this <InlineMathBlock latex="y" />{" "}
        value, the oracle wouldn&apos;t be reversible if{" "}
        <InlineMathBlock latex="f" /> was constant since we wouldn&apos;t be
        able to determine the input from the output. We won&apos;t go into the
        details of this here, but it is a necessary condition for quantum
        operations to be reversible.
      </p>
      <p>We&apos;ll denote this operation in a circuit as:</p>
      <ArticleImage
        src="quantoracle"
        alt="A quantum circuit representation of an oracle"
      />
      <p>
        If we simply set <InlineMathBlock latex="y" /> to 0, we get the
        following:
      </p>
      <MathBlock latex="U_f(\ket{x} \otimes \ket{0}) = \ket{x} \otimes \ket{f(x)}" />
      <p>
        Now we know how to use our function in the quantum world we can start to
        evaluate it.
      </p>
      <p>
        The Deutsch-Jozsa algorithm begins by preparing two qubits in the state:
      </p>
      <MathBlock latex="\ket{\psi_1} = \frac{1}{\sqrt{2}}(\ket{0} + \ket{1}) \otimes \frac{1}{\sqrt{2}}(\ket{0} - \ket{1})" />
      <p>
        We know that these are the results of applying the hadamard gate to{" "}
        <InlineMathBlock latex="\ket{0}" /> and{" "}
        <InlineMathBlock latex="\ket{1}" /> respectively. So we can get here
        with the following circuit:
      </p>
      <ArticleImage
        src="djsetup"
        alt="A quantum circuit with 2 qubits starting in the 0 state, with a hadamard gate being applied to both qubits but an X applied to the second qubit first"
      />
      <p>
        Note that it is by convention in many of these quantum algorithm
        circuits that we start with all the qubits in the state{" "}
        <InlineMathBlock latex="\ket{0}" />. Hence why it is necessary to add
        the <InlineMathBlock latex="X" /> gate on the second qubit.
      </p>
      <p>We then feed these two qubits into our quantum oracle:</p>
      <ArticleImage
        src="dj2"
        alt="The previous quantum circuit being fed into the quantum oracle"
      />
      <p>
        The vertical dashed lines are simply there to help us with our
        mathematical book keeping and tracking the state at different stages of
        the circuit. We already know about{" "}
        <InlineMathBlock latex="\ket{\psi_1}" />, now let&apos;s look at{" "}
        <InlineMathBlock latex="\ket{\psi_2}" />.
      </p>
      <p>
        We can expand the brackets on <InlineMathBlock latex="\ket{\psi_1}" />{" "}
        to get:
      </p>
      <MathBlock
        latex={[
          "\\ket{\\psi_1} = \\frac{1}{\\sqrt{2}}(\\ket{0} + \\ket{1}) \\otimes \\frac{1}{\\sqrt{2}}(\\ket{0} - \\ket{1})",
          "= \\frac{1}{2}(\\ket{00} - \\ket{01} + \\ket{10} - \\ket{11})",
        ]}
      />
      <p>
        It&apos;s now super easy to apply our quantum oracle to this state as
        the linear operation simply distributes across the terms in the bracket:
      </p>
      <MathBlock
        latex={[
          "\\ket{\\psi_2} = U_f\\ket{\\psi_1}",
          "= \\frac{1}{2}(U_f\\ket{00} - U_f\\ket{01} + U_f\\ket{10} - U_f\\ket{11})",
        ]}
      />
      <p>
        Note the following about the <InlineMathBlock latex="\oplus" />{" "}
        operation:
      </p>
      <MathBlock latex={["0 \\oplus x = x", "1 \\oplus x = \\bar{x}"]} />
      <p>
        Using this fact, let&apos;s now evaulate{" "}
        <InlineMathBlock latex="\ket{\psi_2}" /> further:
      </p>
      <MathBlock
        latex={[
          "\\ket{\\psi_2} = \\frac{1}{2}(\\ket{0} \\otimes \\ket{0 \\oplus f(0)} - \\ket{0} \\otimes \\ket{1 \\oplus f(0)} + \\ket{1} \\otimes \\ket{0 \\oplus f(1)} - \\ket{1} \\otimes \\ket{1 \\oplus f(1)})",
          "= \\frac{1}{2}(\\ket{0} \\otimes \\ket{f(0)} - \\ket{0} \\otimes \\ket{\\overline{f(0)}} + \\ket{1} \\otimes \\ket{f(1)} - \\ket{1} \\otimes \\ket{\\overline{f(1)}})",
          "= \\frac{1}{2}(\\ket{0} \\otimes (\\ket{f(0)} - \\ket{\\overline{f(0)}}) + \\ket{1} \\otimes (\\ket{f(1)} - \\ket{\\overline{f(1)}}))",
        ]}
      />
      <p>
        Now notice that since <InlineMathBlock latex="f(x)" /> is either 0 or 1,
        we have the following:
      </p>
      <MathBlock latex="\ket{x} - \ket{\bar{x}} = (-1)^{x}(\ket{0} - \ket{1})" />
      <p>
        A simple test of either case <InlineMathBlock latex="x=0" /> or{" "}
        <InlineMathBlock latex="x=1" /> will confirm this fact.
      </p>
      <p>
        Once again we are using a clever algebraic trick to pull a variable out
        of the ket and into a coefficient. You should now be getting used to the
        fact that these tricks to bring terms in/out of kets/coefficients lie at
        the heart of many quantum algorithms. There will be much more of this to
        come!
      </p>
      <p>Let&apos;s continue:</p>
      <MathBlock latex="\ket{\psi_2} = \frac{1}{2}(\ket{0} \otimes (-1)^{f(0)}(\ket{0} - \ket{1}) + \ket{1} \otimes (-1)^{f(1)}(\ket{0} - \ket{1}))" />
      <p>
        The final step of the Deutsch-Jozsa algorithm is to apply the Hadamard
        gate to just the first qubit. In the current form this is fairly easy to
        do:
      </p>
      <MathBlock
        latex={[
          "\\ket{\\psi_3} = (H \\otimes I)\\ket{\\psi_2}",
          "= \\frac{1}{2\\sqrt{2}}((\\ket{0} + \\ket{1}) \\otimes (-1)^{f(0)}(\\ket{0} - \\ket{1}) + (\\ket{0} - \
           \\ket{1}) \\otimes (-1)^{f(1)}(\\ket{0} - \\ket{1}))",
        ]}
      />
      <p>
        This is now our final state, so all that&apos;s left to do is some
        algebra to get this into a nicer form. We can see that we will end up
        with 4 different kets each with 2 terms, so we can expand the brackets
        to get these terms:
      </p>
      <MathBlock
        latex={[
          "\\ket{\\psi_3} = \\frac{1}{2\\sqrt{2}}((-1)^{f(0)} + (-1)^{f(1)})\\ket{00}",
          "+ \\frac{1}{2\\sqrt{2}}(-(-1)^{f(0)} - (-1)^{f(1)})\\ket{01}",
          "+ \\frac{1}{2\\sqrt{2}}((-1)^{f(0)} - (-1)^{f(1)})\\ket{10}",
          "+ \\frac{1}{2\\sqrt{2}}(-(-1)^{f(0)} + (-1)^{f(1)})\\ket{11}",
        ]}
      />
      <p>
        If <InlineMathBlock latex="f" /> is a constant function then{" "}
        <InlineMathBlock latex="f(0) = f(1)" /> so we end up with the following:
      </p>
      <MathBlock
        latex={[
          "\\ket{\\psi_3} = \\frac{1}{\\sqrt{2}}(-1)^{f(0)}\\ket{00} - \\frac{1}{\\sqrt{2}}(-1)^{f(0)}\\ket{01}",
          "= \\frac{1}{\\sqrt{2}}(-1)^{f(0)}\\ket{0} \\otimes (\\ket{0} - \\ket{1})",
        ]}
      />
      <p>The last two terms end up with a coefficient of 0 so are dropped.</p>
      <p>
        If <InlineMathBlock latex="f" /> is balanced, then we have{" "}
        <InlineMathBlock latex="f(0) = \overline{f(1)}" />. This has the
        opposite effect and makes the first two terms evaluate to 0 giving us:
      </p>
      <MathBlock
        latex={[
          "\\ket{\\psi_3} = \\frac{1}{\\sqrt{2}}(-1)^{f(0)}\\ket{1} \\otimes (\\ket{0} - \\ket{1})",
        ]}
      />
      <p>
        And now, we can clearly see that measurement of the first qubit tells us
        if the function is constant or balanced. If we measure{" "}
        <InlineMathBlock latex="\ket{0}" /> the function is constant, if we
        measure <InlineMathBlock latex="\ket{1}" /> the function is balanced.
      </p>
      <p>Our final circuit looks like this:</p>
      <ArticleImage
        src="djcomp"
        alt="The final Deutsch-Josza circuit with measurement at the end"
      />
      <p>
        So we have proven that the Deutsch-Jozsa is indeed able to determine
        whether a function is constant or balanced with only a single query to
        the function.
      </p>
      <p>
        This is the first time we have been able to explicitly show something
        that a quantum computer can do better than a classical computer. There
        are many more such cases, but the Deustch-Jozsa algorithm is the most
        basic example.
      </p>
      <h2>Exercises</h2>
      <h3>Exercise 1 (difficult)</h3>
      <Exercise
        problem={
          <>
            <p>
              Generalise the Deutsch-Jozsa algorithm to any n-bit binary
              function.{" "}
            </p>
            <p>
              That is, given a function <InlineMathBlock latex="f" /> that takes
              n bits as input and produces 1 bit as output, determine whether it
              is constant or balanced. The definition of constant/balanced being
              slightly different here:
            </p>
            <ul>
              <li>
                <strong>Constant</strong>: The function returns the same output
                for every input
              </li>
              <li>
                <strong>Balanced</strong>: The function returns 0 for exactly
                half the inputs and 1 for the other half.
              </li>
            </ul>
            <p>
              We have the promise that the function will always be
              constant/balanced. Any other function is not a valid input for
              this problem.
            </p>
            <p>
              For the oracle, it takes the same form, but with n qubits as
              input:
            </p>
            <MathBlock latex="U_f(\ket{x_1} \otimes ... \otimes \ket{x_n} \otimes \ket{y}) = \ket{x_1} \otimes ... \otimes \ket{x_n} \otimes \ket{y \oplus f(x)}" />
            <p>
              Where <InlineMathBlock latex="x_i" /> means, the i-th bit of{" "}
              <InlineMathBlock latex="x" />.
            </p>
            <p>In circuit form this looks like:</p>
            <ArticleImage
              src="nquantoracle"
              alt="An arbitrary n-bit quantum oracle"
            />
          </>
        }
        solution={
          <>
            <p>
              The aproach we take is very similar to the single bit case, just
              that we spread the Hadmard gate across all the bits and measure
              all n bits at the end:
            </p>
            <ArticleImage
              src="djncomp"
              alt="A Deutsch-Josza circuit over an arbitrary n qubits"
            />
            <p>
              Our pre-oracle state after applying the Hadamard gates looks like:
            </p>
            <MathBlock latex="\ket{\psi_1} = \frac{1}{\sqrt{2^n}}\Bigl(\sum_{x=0}^{2^n-1}\ket{x}\Bigr) \otimes \frac{1}{\sqrt{2}}(\ket{0} - \ket{1})" />
            <p>
              The first n qubits end up in this state since they all end up in
              an even superposition of 0 and 1. Since they are all{" "}
              <InlineMathBlock latex="\otimes" />
              ed together, after expanding the brackets we end up in an even
              superposition of each possible combination of n bits:
            </p>
            <MathBlock
              latex={[
                "H^{\\otimes n}(\\underbrace{\\ket{0} \\otimes ... \\otimes \\ket{0}}_{n \\text{ times}}) = \\underbrace{\\frac{1}{\\sqrt{2}}(\\ket{0} + \\ket{1}) \\otimes ... \\otimes \\frac{1}{\\sqrt{2}}(\\ket{0} + \\ket{1}}_{n\\text{ times}})",
                "= \\frac{1}{\\sqrt{2^n}}(\\ket{\\underbrace{0...0}_n} \\otimes \\ket{\\underbrace{0...1}_n} \\otimes ... \\otimes \\ket{\\underbrace{1...1}_n})",
                "= \\frac{1}{\\sqrt{2^n}}\\sum_{x=0}^{2^n-1}\\ket{x}",
              ]}
            />
            <p>
              where in the final step we convert a string of binary 1s and 0s
              into a complete number.
            </p>
            <p>
              Let&apos;s return to our equation for{" "}
              <InlineMathBlock latex="\ket{\psi_1}" />. We&apos;ll bring the
              final qubit inside the sum to make it easier to apply the oracle:
            </p>
            <MathBlock
              latex={[
                "\\ket{\\psi_1} = \\frac{1}{\\sqrt{2^{n+1}}}\\sum_{x=0}^{2^n-1}\\ket{x}\\otimes(\\ket{0} - \\ket{1})",
                "= \\frac{1}{\\sqrt{2^{n+1}}}\\sum_{x=0}^{2^n-1}\\ket{x0} - \\ket{x1}",
              ]}
            />
            <p>Applying the oracle:</p>
            <MathBlock
              latex={[
                "\\ket{\\psi_2} = \\frac{1}{\\sqrt{2^{n+1}}}\\sum_{x=0}^{2^n-1}U_f\\ket{x0} - U_f\\ket{x1}",
                "= \\frac{1}{\\sqrt{2^{n+1}}}\\sum_{x=0}^{2^n-1}\\ket{xf(x)} - \\ket{x\\overline{f(x)}}",
                "= \\frac{1}{\\sqrt{2^{n+1}}}\\sum_{x=0}^{2^n-1}\\ket{x} \\otimes (\\ket{f(x)} - \\ket{\\overline{f(x)}})",
                "= \\frac{1}{\\sqrt{2^{n+1}}}\\sum_{x=0}^{2^n-1}\\ket{x} \\otimes (-1)^{f(x)}(\\ket{0} - \\ket{1})",
              ]}
            />
            <p>
              This state look almost identical to{" "}
              <InlineMathBlock latex="\ket{\psi_1}" /> except now we&apos;ve
              picked up a phase factor <InlineMathBlock latex="(-1)^{f(x)}" />{" "}
              in front of each term.
            </p>
            <p>
              In the case that <InlineMathBlock latex="f" /> is constant, this
              phase term will be either <InlineMathBlock latex="1" /> or{" "}
              <InlineMathBlock latex="-1" /> for all terms meaning we end up
              with:
            </p>
            <MathBlock latex="\pm\frac{1}{\sqrt{2^{n+1}}}\sum_{x=0}^{2^n-1}\ket{x} \otimes (\ket{0} - \ket{1})" />
            <p>
              Then there&apos;s no need for any fancy algebra as we know the
              Hadamrd is self inverse so applying it again to the first n bits
              simply inverses what we did at the begining:
            </p>
            <MathBlock
              latex={[
                "(H^{\\otimes n} \\otimes I)\\Bigl(\\pm\\frac{1}{\\sqrt{2^{n+1}}}\\sum_{x=0}^{2^n-1}\\ket{x} \\otimes (\\ket{0} - \\ket{1})\\Bigr) = \\pm \\ket{\\underbrace{0...0}_n} \\otimes \\frac{1}{\\sqrt{2}}(\\ket{0} - \\ket{1})",
              ]}
            />
            <p>
              So if <InlineMathBlock latex="f" /> is constant we will measure{" "}
              <InlineMathBlock latex="\ket{0}" /> on every output qubit.
            </p>
            <p>
              Be careful here! We have not yet proved the converse: that if we
              measure <InlineMathBlock latex="\ket{0}" /> on every output qubit
              that <InlineMathBlock latex="f" /> will be constant.
            </p>
            <p>
              We&apos;re going to have to get our hands dirty and apply that
              Hadamard operation. Leaving what we have for now, let&apos;s see
              what happens when we apply n Hadamard gates to an arbitrary n-bit
              state. Where <InlineMathBlock latex="k" /> is an n-bit number:
            </p>
            <MathBlock
              latex={[
                "H^{\\otimes n}\\ket{k} = H^{\\otimes n}(\\ket{k_1} \\otimes ... \\otimes \\ket{k_n})",
                "= H\\ket{k_1} \\otimes ... \\otimes H\\ket{k_n}",
              ]}
            />
            <p>Now we know that:</p>
            <MathBlock latex="H\ket{k_i} = \begin{cases} \frac{1}{\sqrt{2}}(\ket{0} + \ket{1})\ \ \text{if}\ k_i = 0 \\ \frac{1}{\sqrt{2}}(\ket{0} - \ket{1})\ \ \text{if}\ k_i = 1\end{cases}" />
            <p>So we will end up with:</p>
            <MathBlock latex="\frac{1}{\sqrt{2}}(\ket{0} \pm \ket{1}) \otimes ... \otimes \frac{1}{\sqrt{2}}(\ket{0} \pm \ket{1})" />
            <p>
              Where the sign in front of the <InlineMathBlock latex="\ket{1}" />{" "}
              in the <InlineMathBlock latex="i" />
              -th term is <InlineMathBlock latex="-" /> if{" "}
              <InlineMathBlock latex="k_i" /> is 1 and{" "}
              <InlineMathBlock latex="+" /> if it is 0.
            </p>
            <p>
              When we expand the brackets each term will have 1 bit chosen from
              each bracket. The 0s always have a positive sign so we don&apos;t
              need to worry about them, but the <InlineMathBlock latex="i" />
              -th 1 will have a negative sign if <InlineMathBlock latex="k_i" />{" "}
              is 1.{" "}
            </p>
            <p>
              We also know that two negatives make a positive. More generally,
              if we have an odd number of negatives multiplied together, we end
              up with a negative and if we have an even number of negatives
              multiplied together we get a positive.
            </p>
            <p>
              Therefore, to determine the sign of a term we can simply count the
              number of bits in our term that are 1 where the corresponding bit
              in <InlineMathBlock latex="k" /> is also 1. If there are an even
              number, the term is positive. If there are an odd number, the term
              is negative.
            </p>
            <p>
              If we have two binary numbers <InlineMathBlock latex="k" /> and{" "}
              <InlineMathBlock latex="j" /> we can count how many ones they have
              in common by:
            </p>
            <MathBlock latex="k \cdot j = k_1j_1 + ... + k_nj_n" />
            <p>
              Which means the sign of the term with binary representation{" "}
              <InlineMathBlock latex="j" /> is just:
            </p>
            <MathBlock latex="(-1)^{k \cdot j}" />
            <p>
              Putting this all together, we can now see how n Hadamard
              operations act our state <InlineMathBlock latex="k" />:
            </p>
            <MathBlock latex="H^{\otimes n}\ket{k} = \frac{1}{\sqrt{2^n}}\sum_{j=0}^{2^n-1}(-1)^{j \cdot k}\ket{j}" />
            <p>Ok, deep breaths... that was pretty tricky!</p>
            <p>
              Take some time to go over that and check it all makes sense.
              Working with an arbitrary number of n qubits really makes the
              algebra more tricky!
            </p>
            <p>
              Now let&apos;s go back to our original formula and apply the
              Hadamard gates using our new knowledge. We left off with this
              formula:
            </p>
            <MathBlock latex="\ket{\psi_2} = \frac{1}{\sqrt{2^{n+1}}}\sum_{x=0}^{2^n-1}\ket{x} \otimes (-1)^{f(x)}(\ket{0} - \ket{1})" />
            <p>
              Just like the original algorithm, we&apos;re not going to care
              about the last qubit{" "}
              <InlineMathBlock latex="(\ket{0} + \ket{1})/\sqrt{2}" />, so
              let&apos;s simplify by dropping it:
            </p>
            <MathBlock latex="\ket{\psi_2} = \frac{1}{\sqrt{2^n}}\sum_{x=0}^{2^n-1}(-1)^{f(x)}\ket{x}" />
            <p>Now let&apos;s apply the Hadamard gates:</p>
            <MathBlock
              latex={[
                "\\ket{\\psi_3} = H^{\\otimes n}\\ket{\\psi_2}",
                "= \\frac{1}{\\sqrt{2^n}}\\sum_{x=0}^{2^n-1}(-1)^{f(x)}H^{\\otimes n}\\ket{x}",
                "= \\frac{1}{\\sqrt{2^n}}\\sum_{x=0}^{2^n-1}(-1)^{f(x)}\\frac{1}{\\sqrt{2^n}}\\sum_{y=0}^{2^n-1}(-1)^{y \\cdot x}\\ket{y}",
                "= \\frac{1}{2^n}\\sum_{x=0}^{2^n-1}\\sum_{y=0}^{2^n-1}(-1)^{f(x)}(-1)^{y \\cdot x}\\ket{y}",
                "= \\sum_{y=0}^{2^n-1}\\Biggl[\\frac{1}{2^n}\\sum_{x=0}^{2^n-1}(-1)^{f(x)}(-1)^{y \\cdot x}\\Biggr]\\ket{y}",
              ]}
            />
            <p>
              So we&apos;ve successfully isolated the coefficient of each ket.
              So the coefficient of some ket <InlineMathBlock latex="\ket{y}" />{" "}
              is:
            </p>
            <MathBlock latex="\frac{1}{2^n}\sum_{x=0}^{2^n-1}(-1)^{f(x)}(-1)^{y \cdot x}" />
            <p>So the probability of of measuring all 0s is:</p>
            <MathBlock
              latex={[
                "\\Biggl|\\frac{1}{2^n}\\sum_{x=0}^{2^n-1}(-1)^{f(x)}(-1)^{0 \\cdot x}\\Biggr|^2",
                "= \\Biggl|\\frac{1}{2^n}\\sum_{x=0}^{2^n-1}(-1)^{f(x)}\\Biggr|^2",
              ]}
            />
            <p>
              If <InlineMathBlock latex="f" /> is balanced then half of these
              terms are negative and the other half are positive so they cancel
              out to 0. So now we have proved that we will measure all 0s if and
              only if <InlineMathBlock latex="f" /> is constant.
            </p>
            <p>
              So we are done! We have generalised the Deutsch-Jozsa algorithm to
              any n-bit binary function. The generalised case seems even more
              impressive than the original since it would take{" "}
              <InlineMathBlock latex="2^{n-1} + 1" /> queries classically to
              determine if the function is constant or balanced.
            </p>
          </>
        }
      />
    </Article>
  );
};

export default Page;
