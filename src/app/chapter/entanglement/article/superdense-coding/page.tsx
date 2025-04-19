import { getArticlePageMetadata } from "@/course/courseStructure";
import Article from "@/components/article";
import InlineMathBlock from "@/components/inlineMathBlock";
import ArticleImage from "@/components/articleImage";
import MathBlock from "@/components/mathBlock";
import Exercise from "@/components/exercise";

import alicebobentangledImage from "./images/alicebobentangled.png";
import superdenseImage from "./images/superdense.png";
import superdensealiceImage from "./images/superdensealice.png";

const CHAPTER_ID = "entanglement";
const ARTICLE_ID = "superdense-coding";

export const metadata = getArticlePageMetadata(CHAPTER_ID, ARTICLE_ID);

const Page = () => {
  return (
    <Article>
      <p>
        We&apos;re now getting pretty familiar with the fact that a qubit can
        hold any state in a superposition of <InlineMathBlock latex="\ket{0}" />{" "}
        and <InlineMathBlock latex="\ket{1}" />. Whereas a classical bit can
        only occupy one of these two states, a qubit can occupy an infinite
        contiuum of states between these two. It therefore feels like the qubit
        contains more information than the classical bit. Is there someway we
        could somehow extract use out of this information?
      </p>
      <p>
        In the previous article we discussed how Alice and Bob could use a
        shared entagled pair of qubits to communicate using quantum
        teleportation. We found that they would need to communicate two
        classical bits in order to decode a sent quantum state.
      </p>
      <p>
        In this article we will look at the opposite scenario. Where Alice and
        Bob use their entangled qubit pair to allow them to send 2 classical
        bits of information while only having to send a single qubit.
      </p>
      <p>
        We&apos;ll begin in the familiar scenario where Alice and Bob have
        entangled two qubits and taken one half of the entangled pair each.
      </p>
      <ArticleImage
        src={alicebobentangledImage}
        alt="A depiction of two actors Alice and Bob entangling two qubits together and then being separated by a large physical distance."
      />
      <p>So our system starts in the usual state:</p>
      <MathBlock latex="\ket{\phi_0} = \ket{\beta_{00}} = \frac{1}{\sqrt{2}}(\ket{00} + \ket{11})" />
      <p>
        Now, let&apos;s say that Alice has 2 classical bits of information that
        she wants to be able to send to Bob by only sending her qubit. In other
        words, Alice must apply some operation to her qubit such that Bob can
        apply some operation to both his qubit and Alice&apos;s qubit in order
        to decode her 2 classical bits.
      </p>
      <p>
        Remember in our quantum teleporation protocol, Bob had to apply an{" "}
        <InlineMathBlock latex="X" /> and/or a <InlineMathBlock latex="Z" />{" "}
        gate to his qubit based on the received classical bits. Let&apos;s
        re-use that intuition here, and we&apos;ll make Alice apply an{" "}
        <InlineMathBlock latex="X" /> and/or <InlineMathBlock latex="Z" /> gate
        depending on the 2 classical bits she wants to send.
      </p>
      <p>
        We&apos;ll denote the two classical bits Alice wants to send as{" "}
        <InlineMathBlock latex="b_0" /> and <InlineMathBlock latex="b_1" />. So
        Alice will apply the operation <InlineMathBlock latex="U_{b_0b_1}" /> to
        her qubit where:
      </p>
      <MathBlock
        latex={["U_{00} = I", "U_{01} = X", "U_{10} = Z", "U_{11} = ZX"]}
      />
      <p>
        In plain terms, this means apply an <InlineMathBlock latex="X" /> gate
        if the second bit is 1 and apply a <InlineMathBlock latex="Z" /> gate if
        the first bit is 1. The <InlineMathBlock latex="X" /> gate is always
        applied first.
      </p>
      <p>
        At this point Alice has operated on her qubit and is ready to send it to
        Bob. We can describe the complete state of the system as:
      </p>
      <MathBlock latex="\ket{\phi_1} = \frac{1}{\sqrt{2}}(U_{b_0b_1}\ket{0} \otimes \ket{0} + U_{b_0b_1}\ket{1} \otimes \ket{1})" />
      <p>The circuit we have so far looks like this:</p>
      <ArticleImage
        src={superdensealiceImage}
        alt="A quantum circuit started in the entangled beta zero zero state where an X gate is applied to the first qubit when b_1 is 1 followed by a Z gate when b_0 is 1"
      />
      <p>
        Notice how this appears very similar to our quantum teleportation
        circuit but backwards! Instead of Bob applying{" "}
        <InlineMathBlock latex="X" /> and <InlineMathBlock latex="Z" /> at the
        end of the circuit, Alice applies them at the beginning.
      </p>
      <p>
        To understand what Bob must now do to retrieve the bits we can get some
        inspiration from the teleportation circuit and &quot;break&quot; the
        entanglement by applying a <InlineMathBlock latex="\text{CNOT}" /> gate
        followed by an <InlineMathBlock latex="H" /> gate:
      </p>
      <MathBlock latex="\ket{\phi_2} = (H \otimes I)\text{CNOT}\ket{\phi_1} = \frac{1}{\sqrt{2}}(H \otimes I)\text{CNOT}(U_{b_0b_1}\ket{0} \otimes \ket{0} + U_{b_0b_1}\ket{1} \otimes \ket{1})" />
      <p>And here&apos;s what the circuit looks like now:</p>
      <ArticleImage
        src={superdenseImage}
        alt="A quantum circuit starting in the entangled state where an X gate is applied to the first qubit if b_1 is 1 followed by a Z gate if b_0 is 1. A CNOT gate is then applied followed by a Hadamard gate on the first qubit"
      />
      <p>
        We could start delving into our outer-product operator notation to
        explicitly calculate what this equals, but it&apos;s more helpful to
        study this in cases. The full outer-product based derivation is left as
        an exercise at the end.
      </p>
      <p>
        First off, the most basic case, when both of Alice&apos;s bits are 0.
        i.e. <InlineMathBlock latex="b_0 = 0" /> and{" "}
        <InlineMathBlock latex="b_1 = 0" />.
      </p>
      <p>
        In this scenario, we see that <InlineMathBlock latex="U_{00} = I" /> So
        we can continue on with our equation from there:
      </p>
      <MathBlock
        latex={[
          "\\ket{\\psi_2} = (H \\otimes I)\\text{CNOT}(\\ket{00} + \\ket{11})",
          "= (H \\otimes I)(\\ket{00} + \\ket{10}) = (H \\otimes I)(\\ket{0} + \\ket{1}) \\otimes \\ket{0}",
          "= H(\\ket{0} + \\ket{1}) \\otimes I\\ket{0}",
          "= \\ket{00}",
        ]}
      />
      <p>
        So by simply measuring his qubits, Bob will recover Alices 2 bits! This
        is great, but we need to check it works in the other cases before we can
        be sure this is a valid method. Let&apos;s now look at the case when{" "}
        <InlineMathBlock latex="b_0 = 1" /> and{" "}
        <InlineMathBlock latex="b_1 = 0" />:
      </p>
      <p>
        In this case, <InlineMathBlock latex="U_{01} = X" />:
      </p>
      <MathBlock
        latex={[
          "\\ket{\\psi_2} = (H \\otimes I)\\text{CNOT}(X\\ket{0} \\otimes \\ket{0} + X\\ket{1} \\otimes \\ket{1})",
          "= (H \\otimes I)\\text{CNOT}(\\ket{10} + \\ket{01})",
          "= (H \\otimes I)(\\ket{11} + \\ket{01}) = (H \\otimes I)(\\ket{1} + \\ket{0}) \\otimes \\ket{1}",
          "= H(\\ket{1} + \\ket{0}) \\otimes I\\ket{1}",
          "= \\ket{01}",
        ]}
      />
      <p>
        So once again Bob will recover the correct qubits! We&apos;ll leave the
        other two cases to the exercises.
      </p>
      <p>
        So we have shown that Alice can send 2 classical bits to Bob by only
        sending a single qubit. Note, that this doesn&apos;t mean we encoded 2
        classical bits of information inside a single qubit. Alice and Bob still
        had to meet physically before hand to create and share a pair of
        entangled qubits.
      </p>
      <p>
        Also note that in communicating the 2 classical bits, Alice had to send
        her qubit and Bob &quot;broke&quot; the superposition. This means that
        this is a one time use protocol. If Alice wants to send another 2 bits
        to Bob, they will have to create a new entangled pair of qubits.
      </p>
      <p>
        So now we have shown two very important facts. That if Alice and Bob
        share a pair of entangled qubits, they can:
      </p>
      <ul>
        <li>
          Communicate a qubit by physically sending 2 classical bits of
          information
        </li>
        <li>
          Communicate 2 classical bits of information by physically sending a
          qubit
        </li>
      </ul>
      <p>Why is this significant?</p>
      <p>
        Well two classical bits of information can have 4 different states, but
        a single qubit has a infinite continuum of different possible states. We
        might have assumed we needed an arbitrarily large amount of information
        to communicate a qubit, but now we know we can use entanglement to
        communicate it with only 2 bits. This is a huge reduction in the amount
        of information needed.
      </p>
      <p>
        But it comes at the cost of the qubit being destroyed in the process. If
        the qubit wasn&apos;t destroyed we would violate the no-cloning theorem.
      </p>
      <h2>Exercises</h2>
      <h3>Exercise 1</h3>
      <Exercise
        problem={
          <>
            <p>
              Validate the other two scenarios of Alice&apos;s classical bits:
            </p>
            <ul>
              <li>
                <InlineMathBlock latex="b_0 = 0" /> and{" "}
                <InlineMathBlock latex="b_1 = 1" />
              </li>
              <li>
                <InlineMathBlock latex="b_0 = 1" /> and{" "}
                <InlineMathBlock latex="b_1 = 1" />
              </li>
            </ul>
          </>
        }
        solution={
          <>
            <p>For the first case:</p>
            <MathBlock
              latex={[
                "\\ket{\\psi_2} = (H \\otimes I)\\text{CNOT}(Z\\ket{0} \\otimes \\ket{0} - Z\\ket{1} \\otimes \\ket{1})",
                "= (H \\otimes I)\\text{CNOT}(\\ket{00} - \\ket{11})",
                "= (H \\otimes I)(\\ket{00} - \\ket{10}) = (H \\otimes I)(\\ket{0} - \\ket{1}) \\otimes \\ket{0}",
                "= H(\\ket{0} - \\ket{1}) \\otimes I\\ket{0}",
                "= \\ket{10}",
              ]}
            />
            <p>For the second case:</p>
            <MathBlock
              latex={[
                "\\ket{\\psi_2} = (H \\otimes I)\\text{CNOT}(ZX\\ket{0} \\otimes \\ket{0} - ZX\\ket{1} \\otimes \\ket{1})",
                "= (H \\otimes I)\\text{CNOT}(-\\ket{10} + \\ket{01})",
                "= (H \\otimes I)(-\\ket{11} + \\ket{01}) = (H \\otimes I)(\\ket{0} - \\ket{1}) \\otimes \\ket{1}",
                "= H(\\ket{0} - \\ket{1}) \\otimes I\\ket{1}",
                "= \\ket{11}",
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
              Without doing a case-by-case analysis, use outer-product operator
              notation to derive that the superdense coding circuit works.
            </p>
          </>
        }
        solution={
          <>
            <p>
              The most complicated part of our derivation will be around{" "}
              <InlineMathBlock latex="U_{b_0b_1}" /> since we only have a
              case-by-case representation of this. We will therefore start by
              finding a more mathematical form for it.
            </p>
            <p>
              Since we apply <InlineMathBlock latex="Z" /> only when when{" "}
              <InlineMathBlock latex="b_0" /> is 1 and we apply{" "}
              <InlineMathBlock latex="X" /> when <InlineMathBlock latex="b_1" />{" "}
              is 1, a good first step might be:
            </p>
            <MathBlock latex="Z^{b_0}X^{b_1}" />
            <p>
              If we then subbed in our outer-product representations of{" "}
              <InlineMathBlock latex="X" /> and <InlineMathBlock latex="Z" /> we
              would get:
            </p>
            <MathBlock latex="Z^{b_0}X^{b_1} = (\ket{0}\bra{0} - \ket{1}\bra{1})^{b_0}(\ket{0}\bra{1} + \ket{1}\bra{0})^{b_1}" />
            <p>
              This works, but unfortunately this won&apos;t serve us very well.
              The problem is that the <InlineMathBlock latex="b_0" /> and{" "}
              <InlineMathBlock latex="b_1" /> are stuck in the exponentials and
              we won&apos;t be able to easily get anything in our out of the
              brackets. We would prefer a solution where{" "}
              <InlineMathBlock latex="b_0" /> and{" "}
              <InlineMathBlock latex="b_1" /> are in the coefficients of our
              terms or inside the bras/kets themselves.
            </p>
            <p>
              So let&apos;s analyse further the representation here. Focussing
              first on the <InlineMathBlock latex="X" /> gate, we have the
              following:
            </p>
            <MathBlock
              latex={[
                "X^0 = \\ket{0}\\bra{0} + \\ket{1}\\bra{1}",
                "X^1 = \\ket{0}\\bra{1} + \\ket{1}\\bra{0}",
              ]}
            />
            <p>
              So in both cases, the first ket is always the same, just that the
              bras swap places. We can therefore write this more easily in terms
              of the exponent. Note here that the{" "}
              <InlineMathBlock latex="\bar{b_1}" /> is the inverse of{" "}
              <InlineMathBlock latex="b_1" /> i.e.{" "}
              <InlineMathBlock latex="\bar{0} = 1" /> and{" "}
              <InlineMathBlock latex="\bar{1} = 0" />
            </p>
            <MathBlock latex="X^{b_1} = \ket{0}\bra{b_1} + \ket{1}\bra{\bar{b_1}}" />
            <p>
              You can sub in the two different values of{" "}
              <InlineMathBlock latex="b_1" /> to check that this works.
            </p>
            <p>
              Great so we&apos;ve found a nice representation for{" "}
              <InlineMathBlock latex="X" /> now let&apos;s check{" "}
              <InlineMathBlock latex="Z" />:
            </p>
            <MathBlock
              latex={[
                "Z^0 = \\ket{0}\\bra{0} + \\ket{1}\\bra{1}",
                "Z^1 = \\ket{0}\\bra{0} - \\ket{1}\\bra{1}",
              ]}
            />
            <p>
              Here we see that the exponent affects just the sign of the last
              term. So we can represent this as:
            </p>
            <MathBlock latex="Z^{b_0} = \ket{0}\bra{0} + (-1)^{b_0}\ket{1}\bra{1}" />
            <p>Great, so now let&apos;s combine the two and see what we get:</p>
            <MathBlock
              latex={[
                "U_{b_0b_1} = Z^{b_0}X^{b_1} = (\\ket{0}\\bra{0} + (-1)^{b_0}\\ket{1}\\bra{1})(\\ket{0}\\bra{b_1} + \\ket{1}\\bra{\\bar{b_1}})",
              ]}
            />
            <p>
              When we multiply out the brackets we can use what we know about
              outer-products on basis vectors to get:
            </p>
            <MathBlock latex="U_{b_0b_1} = \ket{0}\bra{b_1} + (-1)^{b_0}\ket{1}\bra{\bar{b_1}}" />
            <p>
              This is brilliant. We&apos;ve now found a closed way to represent
              our operator mathematically. Now let&apos;s work through the rest
              of the equation.
            </p>
            <p>We know that Alice and Bob start with a superposition state:</p>
            <MathBlock latex="\ket{\phi_0} = \frac{1}{\sqrt{2}}(\ket{00} + \ket{11})" />
            <p>
              and then we apply our <InlineMathBlock latex="U_{b_0b_1}" />{" "}
              operator to the first qubit.
            </p>
            <p>
              To understand how to do this better, we&apos;ll analyse how this
              operator acts on each of the computational basis states. Starting
              out with <InlineMathBlock latex="\ket{0}" />:
            </p>
            <MathBlock latex="U_{b_0b_1}\ket{0} = \braket{b_1|0}\ket{0} + (-1)^{b_0}\braket{\bar{b_1}|0}\ket{1}" />
            <p>
              Note that <InlineMathBlock latex="\braket{b_1|0}" /> is 0 if{" "}
              <InlineMathBlock latex="b_1 = 1" /> and 1 if{" "}
              <InlineMathBlock latex="b_1 = 0" />. Using similar logic for the
              second term we can then simplify down to:
            </p>
            <MathBlock latex="U_{b_0b_1}\ket{0} = \bar{b_1}\ket{0} + (-1)^{b_0}b_1\ket{1}" />
            <p>
              And now for the <InlineMathBlock latex="\ket{1}" /> state:
            </p>
            <MathBlock
              latex={[
                "U_{b_0b_1}\\ket{1} = \\braket{b_1|1}\\ket{0} + (-1)^{b_0}\\braket{\\bar{b_1}|1}\\ket{1}",
                "= b_1\\ket{0} + (-1)^{b_0}\\bar{b_1}\\ket{1}",
              ]}
            />
            <p>
              Great. Now let&apos;s use all these results to determine the state
              after applying <InlineMathBlock latex="U_{b_0b_1}" /> to the first
              qubit of the superposition:
            </p>
            <MathBlock
              latex={[
                "\\ket{\\psi_1} = (U_{b_0b_1} \\otimes I)\\ket{\\psi_0} = \\frac{1}{\\sqrt{2}}(U_{b_0b_1} \\otimes I)(\\ket{00} + \\ket{11})",
                "= \\frac{1}{\\sqrt{2}}(U_{b_0b_1}\\ket{0} \\otimes \\ket{0} + U_{b_0b_1}\\ket{1} \\otimes \\ket{1})",
                "= \\frac{1}{\\sqrt{2}}((\\bar{b_1}\\ket{0} + (-1)^{b_0}b_1\\ket{1}) \\otimes \\ket{0} + (b_1\\ket{0} + (-1)^{b_0}\\bar{b_1}\\ket{1}) \\otimes \\ket{1})",
                "= \\frac{1}{\\sqrt{2}}(\\bar{b_1}\\ket{00} + (-1)^{b_0}b_1\\ket{10} + b_1\\ket{01} + (-1)^{b_0}\\bar{b_1}\\ket{11})",
              ]}
            />
            <p>
              Our next operation is the <InlineMathBlock latex="\text{CNOT}" />:
            </p>
            <MathBlock latex="\text{CNOT}\ket{\psi_1} = \frac{1}{\sqrt{2}}(\bar{b_1}\ket{00} + (-1)^{b_0}b_1\ket{11} + b_1\ket{01} + (-1)^{b_0}\bar{b_1}\ket{10})" />
            <p>And finally, the Hadamard gate:</p>
            <MathBlock
              latex={[
                "\\ket{\\psi_2} = (H \\otimes I)\\text{CNOT}\\ket{\\psi_1}",
                "= \\frac{1}{\\sqrt{2}}(H \\otimes I)(\\bar{b_1}\\ket{00} + (-1)^{b_0}b_1\\ket{11} + b_1\\ket{01} + (-1)^{b_0}\\bar{b_1}\\ket{10})",
                "= \\frac{1}{2}(\\bar{b_1}(\\ket{00} + \\ket{10}) + (-1)^{b_0}b_1(\\ket{01} - \\ket{11}) + b_1(\\ket{01} + \\ket{11}) + (-1)^{b_0}\\bar{b_1}(\\ket{00} - \\ket{10}))",
              ]}
            />
            <p>
              Ok, we&apos;ve got all our terms. Now all that&apos;s left is
              algebraic manipulation.
            </p>
            <p>
              Let&apos;s start by collecting each of the kets into a single term
              each:
            </p>
            <MathBlock
              latex={[
                "\\ket{\\psi_2} = \\frac{1}{2}(\\bar{b_1} + (-1)^{b_0}\\bar{b_1})\\ket{00} + \\frac{1}{2}(b_1 + (-1)^{b_0}b_1)\\ket{01} ",
                "+ \\frac{1}{2}(\\bar{b_1} - (-1)^{b_0}\\bar{b_1})\\ket{10} + \\frac{1}{2}(b_1 - (-1)^{b_0}b_1)\\ket{11}",
                "= \\frac{1}{2}(1 + (-1)^{b_0})\\bar{b_1}\\ket{00} + \\frac{1}{2}(1 + (-1)^{b_0})b_1\\ket{01} ",
                "+ \\frac{1}{2}(1 - (-1)^{b_0})\\bar{b_1}\\ket{10} + \\frac{1}{2}(1 - (-1)^{b_0})b_1\\ket{11}",
              ]}
            />
            <p>
              We&apos;re getting there! The final step we need is to notice this
              about our bracketed terms:
            </p>
            <MathBlock
              latex={[
                "(1 + (-1)^{b_0}) = 2\\bar{b_0}",
                "(1 - (-1)^{b_0}) = 2b_0",
              ]}
            />
            <p>Subbing this in we finally arrive at:</p>
            <MathBlock
              latex={[
                "\\ket{\\psi_2} = \\bar{b_0}\\bar{b_1}\\ket{00} + \\bar{b_0}b_1\\ket{01} + b_0\\bar{b_1}\\ket{10} + b_0b_1\\ket{11}",
                "= \\ket{b_0b_1}",
              ]}
            />
            <p>
              So we have proved the validity of our circuit without analysing it
              case-by-case!
            </p>
            <p>
              Now obviously, the case-by-case analysis was easier here. But in
              outer-product analysis we were more easily able to appreciate the
              algebraic structure and the effect of each gate.
            </p>
            <p>
              There will also be problems in the future where we have a much
              larger (or arbitrary) number of bits/qubits which means algebraic
              analyses like this will be the only option. Learning to encode our
              operations mathematically in bra-ket notation will be key in these
              cases.
            </p>
          </>
        }
      />
    </Article>
  );
};

export default Page;
