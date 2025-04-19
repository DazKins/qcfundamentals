import { getArticlePageMetadata } from "@/course/courseStructure";
import Article from "@/components/article";
import InlineMathBlock from "@/components/inlineMathBlock";
import MathBlock from "@/components/mathBlock";
import Table from "@/components/table";
import ArticleImage from "@/components/articleImage";
import Exercise from "@/components/exercise";

import andorImage from "./images/and+or.png";
import cnotImage from "./images/cnot.png";
import cnotswapImage from "./images/cnotswap.png";
import fanoutImage from "./images/fanout.png";
import swapImage from "./images/swap.png";
import xorImage from "./images/xor.png";

const CHAPTER_ID = "qubits-and-gates";
const ARTICLE_ID = "multi-qubit-gates";

export const metadata = getArticlePageMetadata(CHAPTER_ID, ARTICLE_ID);

const Page = () => {
  return (
    <Article>
      <p>
        Meaningful classical computation can be done only when we have the
        ability to act on multiple bits at the same time. We&apos;ve seen
        previously that we have gates that can take 1 bit as input and produce 1
        bit as output, but we also have gates that can take multiple bits as
        input and produce multiple bits as output.
      </p>
      <p>
        The two most common of these gates are the{" "}
        <InlineMathBlock latex="\text{AND}" /> and{" "}
        <InlineMathBlock latex="\text{OR}" /> gates. Just like before, we can
        represent the way they behave through their truth tables:
      </p>
      <div className="flex flex-col gap-8 sm:flex-row justify-around items-stretch">
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
      <p>And here&apos;s what the circuit symbols look like:</p>
      <ArticleImage
        src={andorImage}
        alt="Classical circuit symbols for the AND and OR gates"
      />
      <p>
        As before, we can chain these gates together visually in a circuit
        diagram. Now we have 2 qubit gates, we&apos;re able to achieve more
        complex behaviour. Take a look at the circuit below:
      </p>
      <ArticleImage
        src={xorImage}
        alt="A classical circuit implementation of the XOR operation using NOT, AND and OR gates"
      />
      <p>Woah, looks crazy right?</p>
      <p>
        This circuit is implementing a famous gate called
        <InlineMathBlock latex="\text{XOR}" /> which is short for eXclusive-OR.
        This gate outputs a <InlineMathBlock latex="1" /> if only one of the
        inputs is <InlineMathBlock latex="1" /> but not both. The truth table is
        therefore:
      </p>
      <div className="flex flex-col gap-8 sm:flex-row justify-around items-stretch">
        <Table
          data={[
            ["A", "B", " A XOR B"],
            [0, 0, 0],
            [0, 1, 1],
            [1, 0, 1],
            [1, 1, 0],
          ]}
          headerRow={true}
        />
      </div>
      <p>
        I encourage you to work through the diagram above to confirm that this
        circuit does implement this truth table.
      </p>
      <p>
        But enough of classical computation already. We&apos;re here for
        quantum!
      </p>
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
      <p>Just like with classical gates, we have a circuit symbol for this:</p>
      <ArticleImage
        src={cnotImage}
        alt="The quantum circuit symbol for a CNOT gate"
      />
      <p>
        In this representation the solid circle at the top represents the
        &quot;control&quot; qubit, and the crossed circle at the bottom
        represents the &quot;target&quot; qubit that flips if the control qubit
        is 1. This representation is useful because when we have more
        complicated circuits with more qubits we are able to more easily choose
        arbitrary controls and targets.
      </p>
      <p>
        Previously, we represented our single qubit gates using the outer
        product. In order to understand how we can use the outer product when
        dealing with multiple qubits let&apos;s look at how the tensor product
        works here. We&apos;ll take an arbitrary 2 outer products tensored
        together:{" "}
        <InlineMathBlock latex="\ket{a}\bra{b} \otimes \ket{c}\bra{d}" /> and
        see how it behaves on two qubits:{" "}
        <InlineMathBlock latex="\ket{\psi \phi}" />:
      </p>
      <MathBlock
        latex={[
          "(\\ket{a}\\bra{b} \\otimes \\ket{c}\\bra{d})(\\ket{\\psi} \\otimes \\ket{\\phi})",
          "= (\\ket{a}\\bra{b}\\ket{\\psi})\\otimes(\\ket{c}\\bra{d}\\ket{\\phi})",
          "= \\braket{b | \\psi}\\ket{a} \\otimes \\braket{d | \\phi}\\ket{c}",
          "= (\\ket{a} \\otimes \\ket{c})\\braket{b|\\psi}\\braket{d|\\phi}",
          "= \\ket{ac}(\\bra{b} \\otimes \\bra{d})(\\ket{\\psi} \\otimes \\ket{\\phi})",
          "= \\ket{ac}\\bra{bd}\\ket{\\psi\\phi}",
        ]}
      />
      <p>
        Comparing the first and last line shows us that{" "}
        <InlineMathBlock latex="\ket{a}\bra{b} \otimes \ket{c}\bra{d} = \ket{ac}\bra{bd}" />
      </p>
      <p>
        Equipped with this knowledge, we can now represent the{" "}
        <InlineMathBlock latex="\text{CNOT}" /> gate using outer products:
      </p>
      <MathBlock
        latex={[
          "\\textmd{CNOT} = \\ket{00}\\bra{00} + \\ket{01}\\bra{01} + \\ket{11}\\bra{10} + \\ket{10}\\bra{11}",
        ]}
      />
      <p>Using the same result we can factor this into a more useful form:</p>
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
      <p>The circuit symbol for this gate is:</p>
      <ArticleImage
        src={swapImage}
        alt="The quantum circuit symbol for the SWAP gate"
      />
      <p>And can be defined similarly:</p>
      <MathBlock
        latex={[
          "\\textmd{SWAP} = \\ket{00}\\bra{00} + \\ket{01}\\bra{10} + \\ket{10}\\bra{01} + \\ket{11}\\bra{11}",
        ]}
      />
      <p>
        A quite remarkable result is that the{" "}
        <InlineMathBlock latex="\text{SWAP}" /> operation can be represented as:
      </p>
      <MathBlock latex="\text{SWAP}=\frac{1}{2}(I\otimes I + X\otimes X + Y\otimes Y + Z\otimes Z)" />
      <p>
        It&apos;s quite interesting how by adding and tensoring a few single
        qubit gates together we can get a multi-qubit gate! The proof of this
        fact is fairly mechanical, and will be left for the exercises.
      </p>
      <h2>No cloning</h2>
      <p>
        Take a look at the <InlineMathBlock latex="\text{XOR}" /> circuit above.
        Did you notice a hidden gate? We use it twice in these locations:
      </p>
      <ArticleImage
        src={fanoutImage}
        alt="The classical XOR circuit again with the implicit FANOUTs highlighted"
      />
      <p>
        This part of the circuit essentially &quot;copies&quot; the bit so we
        can use it&apos;s value in more than one place. In classical circuits
        this is often called &quot;fan-out&quot;. It begs the question: can we
        do the same thing with qubits?
      </p>
      <p>
        We can actually answer this question with a bit of algebra. We&apos;ll
        start by thinking about what this operation might look like if it did
        exist. We&apos;ll define a new operation{" "}
        <InlineMathBlock latex="\text{CLONE}" /> that behaves like this:{" "}
        <InlineMathBlock latex="\text{CLONE}\ket{\psi 0} = \ket{\psi \psi}" />.
        So it is a gate that can take a qubit and a blank qubit and copy the
        first qubit into the second qubit.
      </p>
      <p>
        Note that this is not a full definition of the gate because we
        haven&apos;t defined it in terms of 4 basis vectors. Our following proof
        will show that a gate of this description cannot be fully described as
        such.
      </p>
      <p>
        We will prove that this circuit can&apos;t exist by proving that this
        gate doesn&apos;t obey linearity. Consider when{" "}
        <InlineMathBlock latex="\ket{\psi} = a\ket{0} + b\ket{1}" />:
      </p>
      <MathBlock
        latex={[
          "\\text{COPY}\\ket{\\psi 0} = \\text{COPY}\\Bigl((a\\ket{0} + b\\ket{1})\\otimes \\ket{0}\\Bigr)",
          "=\\text{COPY}(a\\ket{00}+b\\ket{10})",
          "=a\\text{COPY}\\ket{00} + b\\text{COPY}\\ket{10}",
          "=a\\ket{00} + b\\ket{11}",
        ]}
      />
      <p>However:</p>
      <MathBlock
        latex={[
          "\\ket{\\psi \\psi} = \\ket{\\psi} \\otimes \\ket{\\psi}",
          "= (a\\ket{0} + b\\ket{1}) \\otimes (a\\ket{0} + b\\ket{1})",
          "=a^2\\ket{00} + ab\\ket{01} + ba\\ket{10} + b^2\\ket{11}",
        ]}
      />
      <p>
        This clearly doesn&apos;t equal the result from the previous box and so
        we have shown that an operator implementing this behaviour doesn&apos;t
        exist. This is an interesting find. Not being able to clone our qubits
        like classical bits will naturally change the way we build quantum
        circuits.
      </p>
      <p>
        It reveals something interesting about how we measure quantum states as
        well. If we had a qubit in the state{" "}
        <InlineMathBlock latex="a\ket{0} + b\ket{1}" />, we could clone the
        qubit 1,000,000 times, measure them all and then use the results to
        estimate the values of <InlineMathBlock latex="a" /> and{" "}
        <InlineMathBlock latex="b" />. However we now know we can&apos;t do
        this. This gives some intuition as to how quantum states are often very
        &quot;hidden&quot;. In quantum systems, the information is contained
        within the coefficients of the basis states, but these coefficients are
        impossible to obtain directly. The most interesting quantum algorithms
        are those that derive clever ways to extract the information from these
        coefficients.
      </p>
      <h2>Exercises</h2>
      <h3>Exercise 1</h3>
      <Exercise
        problem={
          <>
            <p>
              Verify that the <InlineMathBlock latex="\text{SWAP}" /> gate
              defined above does in fact &quot;swap&quot; the qubits even when
              the qubits are not in a basis state{" "}
              <InlineMathBlock latex="\ket{0}" /> or{" "}
              <InlineMathBlock latex="\ket{1}" />.
            </p>
          </>
        }
        solution={
          <>
            <p>
              We&apos;ll investigate how <InlineMathBlock latex="\text{SWAP}" />{" "}
              behaves on two arbitrary qubits:
            </p>
            <MathBlock
              latex={[
                "\\text{SWAP}(a\\ket{0} + b\\ket{1}) \\otimes (c\\ket{0} + d\\ket{1})",
                "= \\text{SWAP}(ac\\ket{00} + ad\\ket{01} + bc\\ket{10} + bd\\ket{11})",
                "= ac\\text{SWAP}\\ket{00} + ad\\text{SWAP}\\ket{01} + bc\\text{SWAP}\\ket{10} + bd\\text{SWAP}\\ket{11}",
                "= ac\\ket{00} + ad\\ket{10} + bc\\ket{01} + bd\\ket{11}",
                "= (c\\ket{0} + d\\ket{1}) \\otimes a\\ket{0} + (c\\ket{0} + d\\ket{1}) \\otimes b\\ket{1}",
                "= (c\\ket{0} + d\\ket{1}) \\otimes (a\\ket{0} + b\\ket{1})",
              ]}
            />
            <p>
              We can see that the position of the two superposition qubits have
              indeed swapped and so the gate works as described.
            </p>
          </>
        }
      />
      <h3>Exercise 2</h3>
      <Exercise
        problem={
          <>
            <p>Prove the earlier stated fact:</p>
            <MathBlock latex="\text{SWAP} = \frac{1}{2}(I \otimes I + X \otimes X + Y \otimes Y + Z \otimes Z)" />
          </>
        }
        solution={
          <>
            <p>
              Let&apos;s check each of those operator tensor products
              one-by-one:
            </p>
            <MathBlock
              latex={[
                "I \\otimes I = (\\ket{0}\\bra{0} + \\ket{1}\\bra{1}) \\otimes (\\ket{0}\\bra{0} + \\ket{1}\\bra{1})",
                "= \\ket{00}\\bra{00} + \\ket{01}\\bra{01} + \\ket{10}\\bra{10} + \\ket{11}\\bra{11}",
              ]}
            />
            <MathBlock
              latex={[
                "X \\otimes X = (\\ket{0}\\bra{1} + \\ket{1}\\bra{0}) \\otimes (\\ket{0}\\bra{1} + \\ket{1}\\bra{0})",
                "= \\ket{00}\\bra{11} + \\ket{01}\\bra{10} + \\ket{10}\\bra{01} + \\ket{11}\\bra{00}",
              ]}
            />
            <MathBlock
              latex={[
                "Y \\otimes Y = (-i\\ket{0}\\bra{1} + i\\ket{1}\\bra{0}) \\otimes (-i\\ket{0}\\bra{1} + i\\ket{1}\\bra{0})",
                "= -\\ket{00}\\bra{11} - \\ket{01}\\bra{10} + \\ket{10}\\bra{01} - \\ket{11}\\bra{00}",
              ]}
            />
            <MathBlock
              latex={[
                "Z \\otimes Z = (\\ket{0}\\bra{0} - \\ket{1}\\bra{1}) \\otimes (\\ket{0}\\bra{0} - \\ket{1}\\bra{1})",
                "= \\ket{00}\\bra{00} - \\ket{01}\\bra{01} - \\ket{10}\\bra{10} + \\ket{11}\\bra{11}",
              ]}
            />
            <p>
              We can then sum up all these different 2-qubit outer products and
              we will get:
            </p>
            <MathBlock latex="I \otimes I + X \otimes X + Y \otimes Y + Z \otimes Z = 2\ket{00}\bra{00} + 2\ket{01}\bra{10} + 2\ket{10}\bra{01} + 2\ket{11}\bra{11}" />
            <p>And thus:</p>
            <MathBlock latex="\text{SWAP} = \frac{1}{2}(I \otimes I + X \otimes X + Y \otimes Y + Z \otimes Z)" />
            <p>
              This is an interesting result as it&apos;s fairly unintuitive. We
              know that when we multiply operators together it represents
              performing the operators one after another on the same qubit. We
              know that when we tensor product operators together it represents
              performing the operators on successive qubits in the system. But
              what does it physically mean to add operators together?
            </p>
            <p>
              We know that adding two vectors together gives us a superposition
              of the two vectors, so we will extend this to operators as well
              and say that operators added together represent a superposition of
              the corresponding operations.
            </p>
            <p>
              So we can think of the <InlineMathBlock latex="\text{SWAP}" />{" "}
              operation as a superposition of the <InlineMathBlock latex="I" />,{" "}
              <InlineMathBlock latex="X" />, <InlineMathBlock latex="Y" /> and{" "}
              <InlineMathBlock latex="Z" /> operations being performed on two
              qubits simultaneously. What&apos;s remarkable about this is that
              all the operations involved are single qubit operations. They
              don&apos;t imply any &quot;interaction&quot; between the two
              qubits. But the magic of superposition causes them to interfere
              and produce a 2-qubit operator.
            </p>
          </>
        }
      />
      <h3>Exercise 3</h3>
      <Exercise
        problem={
          <>
            <p>
              Verify that the following circuit is equivalent to{" "}
              <InlineMathBlock latex="\text{SWAP}" />:
            </p>
            <ArticleImage
              src={cnotswapImage}
              alt="A quantum circuit consisting of 3 CNOT gates, the middle one is inverted"
            />
          </>
        }
        solution={
          <>
            <p>
              We need to be careful with our gate definitions here since the{" "}
              <InlineMathBlock latex="\text{CNOT}" /> gate in the middle is the
              other way up.
            </p>
            <p>
              To help the mathematics a bit we&apos;ll refer to this upside down{" "}
              <InlineMathBlock latex="\text{CNOT}" /> as{" "}
              <InlineMathBlock latex="\text{CNOT}^\prime" /> and define it as:
            </p>
            <MathBlock latex="\text{CNOT}^\prime = \ket{00}\bra{00} + \ket{11}\bra{01} + \ket{10}\bra{10} + \ket{01}\bra{11}" />
            <p>
              This is the exact same as the normal definition except we have
              switch the qubits.
            </p>
            <p>Let&apos;s now take a look at the first two gates:</p>
            <MathBlock
              latex={[
                "\\text{CNOT}\\ \\text{CNOT}^\\prime = (\\ket{00}\\bra{00} + \\ket{01}\\bra{01} + \\ket{11}\\bra{10} + \\ket{10}\\bra{11})(\\ket{00}\\bra{00} + \\ket{11}\\bra{01} + \\ket{10}\\bra{10} + \\ket{01}\\bra{11})",
              ]}
            />
            <p>
              It&apos;s pretty scary to expand the brackets here since there are
              4 terms in each so it seems like we will end up with 16 terms.
              However, remember a very important rule we know about multiplying
              outer-products of basis vectors:
            </p>
            <MathBlock latex="\ket{i}\bra{j}\ket{k}\bra{l} = \begin{cases}0\ \ \textmd{if}\ \ j \neq k \\ \ket{i}\bra{l}\ \ \textmd{if}\ \ j = k\end{cases}" />
            <p>
              So we can straight away reject the terms where the bra from the
              left bracket is not equal to the ket from the right bracket. In
              the cases where they are equal, we can simply cut out the middle
              bra and ket as in the second case above. So, taking that into
              account we have:
            </p>
            <MathBlock latex="\text{CNOT}\ \text{CNOT}^\prime = \ket{00}\bra{00} + \ket{01}\bra{11} + \ket{11}\bra{10} + \ket{10}\bra{01}" />
            <p>
              Ok, and let&apos;s now take this result and add the third{" "}
              <InlineMathBlock latex="\text{CNOT}" /> gate:
            </p>
            <MathBlock
              latex={[
                "\\text{CNOT}\\ \\text{CNOT}^\\prime\\ \\text{CNOT} = (\\ket{00}\\bra{00} + \\ket{01}\\bra{11} + \\ket{11}\\bra{10} + \\ket{10}\\bra{01})(\\ket{00}\\bra{00} + \\ket{01}\\bra{01} + \\ket{11}\\bra{10} + \\ket{10}\\bra{11})",
                "= \\ket{00}\\bra{00} + \\ket{01}\\bra{10} + \\ket{11}\\bra{11} + \\ket{10}\\bra{01} = \\text{SWAP}",
              ]}
            />
          </>
        }
      />
    </Article>
  );
};

export default Page;
