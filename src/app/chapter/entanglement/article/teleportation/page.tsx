import { getArticlePageMetadata } from "@/course/courseStructure";
import Article from "@/components/article";
import InlineMathBlock from "@/components/inlineMathBlock";
import MathBlock from "@/components/mathBlock";
import ArticleImage from "@/components/articleImage";

import quantumteleportImage from "./images/quantumteleport.png";
import quantumteleportcompImage from "./images/quantumteleportcomp.png";

const CHAPTER_ID = "entanglement";
const ARTICLE_ID = "teleportation";

export const metadata = getArticlePageMetadata(CHAPTER_ID, ARTICLE_ID);

const Page = () => {
  return (
    <Article>
      <p>
        We saw at the end of the previous article how the idea of entanglement
        can be used to coordinate two qubits even if they are very far apart.
        However we also mentioned that this does not allow us to send
        information faster than the speed of light.
      </p>
      <p>
        In this article, we&apos;ll delve into why that is by constructing
        communication channels using our entangled qubits and analysing their
        limitations.
      </p>
      <p>
        Let&apos;s start by setting up a hypothetical scenario where Alice and
        Bob get together to create an entangled pair:{" "}
        <InlineMathBlock latex="\ket{\beta_{00}} = \frac{1}{\sqrt{2}}(\ket{0} + \ket{1})" />
        . Alice will keep one qubit and Bob will take the other. Alice will also
        have some arbitrary third qubit{" "}
        <InlineMathBlock latex="\ket{\psi} = a\ket{0} + b\ket{1}" /> that she
        wishes to send to Bob.
      </p>
      <p>
        Her goal is to find some way to transfer the state of her qubit to Bob
        somehow, using their entangled pair as a sort of communication channel.
      </p>
      <p>
        So we have a 3 qubit system. Let&apos;s express it mathematically.
        We&apos;ll put Alice&apos;s 2 qubits on the left and Bob&apos;s qubit on
        the right:
      </p>
      <MathBlock latex="\ket{\psi} \otimes \ket{\beta_{00}} = \frac{1}{\sqrt{2}}\Bigl[a\ket{0}(\ket{00} + \ket{11}) + b\ket{1}(\ket{00} + \ket{11})\Bigr]" />
      <p>
        We&apos;ll apply a few operations on this system, so to keep track of
        each step, we&apos;ll label the whole state after{" "}
        <InlineMathBlock latex="i" /> steps as{" "}
        <InlineMathBlock latex="\ket{\phi_i}" /> beginning with our starting
        state:
      </p>
      <MathBlock latex="\ket{\phi_0} = \frac{1}{\sqrt{2}}\Bigl[a\ket{0}(\ket{00} + \ket{11}) + b\ket{1}(\ket{00} + \ket{11})\Bigr]" />
      <p>
        In our starting configuration, the qubit alice wants to send is
        completely separate to the entangled pair. So any operations we perform
        to it won&apos;t have any effect on Bob&apos;s qubit. We might therefore
        guess that the first thing Alice needs to do is interact{" "}
        <InlineMathBlock latex="\ket{\psi}" /> with her half of the entangled
        pair in some way.
      </p>
      <p>
        The simplest way we already know to do this is using a{" "}
        <InlineMathBlock latex="\text{CNOT}" /> gate. So let&apos;s see what
        happens when we apply a <InlineMathBlock latex="\text{CNOT}" /> to the
        first 2 qubits:
      </p>
      <MathBlock latex="\ket{\phi_1} = (\text{CNOT} \otimes I)\ket{\phi_0} = \frac{1}{\sqrt{2}}\Bigl[a\ket{0}(\ket{00} + \ket{11}) + b\ket{1}(\ket{10} + \ket{01})\Bigr]" />
      <p>
        In order to collapse Bob&apos;s qubit into some definite state, Alice
        will need to perform some measurement, just like we&apos;ve seen before.
        So, what would happen if Alice measured her qubits now?
      </p>
      <p>
        Well, we know she would either get <InlineMathBlock latex="\ket{00}" />,{" "}
        <InlineMathBlock latex="\ket{01}" />,{" "}
        <InlineMathBlock latex="\ket{10}" />, or{" "}
        <InlineMathBlock latex="\ket{11}" />. But in either of these scenarios,
        we can see that Bob&apos;s qubit would collapse into a superposition of
        just a single ket. e.g. if Alice measured{" "}
        <InlineMathBlock latex="\ket{00}" /> Bob&apos;s qubit would simply
        become <InlineMathBlock latex="\ket{0}" />.
      </p>
      <p>
        Our state is currently a superposition of 4 kets, so when alice measures
        her bits, there is only 1 ket left over to determine Bob&apos;s qubit.
        The original qubit we want to send is a superposition of 2 kets, so a
        good guess here would be to apply some operation that would increase the
        number of kets in our superposition to 8.
      </p>
      <p>
        We know one such gate that can achieve this. It&apos;s the Hadamard
        gate. It splits a single ket into a superposition of 2 kets. So
        let&apos;s apply the Hadamard gate to Alice&apos;s qubit:
      </p>
      <MathBlock latex="\ket{\phi_2} = (H\otimes I \otimes I)\ket{\phi_1} = \frac{1}{2}\Bigl[a(\ket{0}+\ket{1})(\ket{00} + \ket{11}) + b(\ket{0} - \ket{1})(\ket{10} + \ket{01})\Bigr]" />
      <p>Now let&apos;s re-arrange the brackets:</p>
      <MathBlock latex="\ket{\phi_2} = \frac{1}{2}\Bigr[\ket{00}(a\ket{0} + b\ket{1}) + \ket{01}(a\ket{1} + b\ket{0}) + \ket{10}(a\ket{0} - b\ket{1}) + \ket{11}(a\ket{1} - b\ket{0})\Bigl]" />
      <p>
        This form is very helpful, because we can quite clearly see the outcome
        for Bob&apos;s qubit based on what Alice measures.
      </p>
      <p>
        Before moving on, let&apos;s just take a look at what we&apos;ve done so
        far and how it looks in a circuit diagram:
      </p>
      <ArticleImage
        src={quantumteleportImage}
        alt="A half complete implementation of the quantum teleportation circuit"
      />
      <p>Those 2 symbols on the right represent measurement of the qubit.</p>
      <p>
        Ok, so now going back to our state of{" "}
        <InlineMathBlock latex="\ket{\phi_2}" />, we can see that if Alice
        measures <InlineMathBlock latex="\ket{00}" />, Bob&apos;s qubit will
        collapse into <InlineMathBlock latex="a\ket{0} + b\ket{1}" /> which is
        exactly <InlineMathBlock latex="\ket{\psi}" />, the state we originally
        tried to send, so we are done!
      </p>
      <p>
        Unfortunately, we can also see that Alice has a{" "}
        <InlineMathBlock latex="(1/2)^2 = 1/4" /> to measure each of the 4
        possible kets. So what do we do in the scenario where Alice doesn&apos;t
        measure <InlineMathBlock latex="\ket{00}" />?
      </p>
      <p>
        Well, we can see that the resulting state of Bob&apos;s qubit will be{" "}
        <i>almost</i> <InlineMathBlock latex="\ket{\psi}" />, but not quite.
        Perhaps Bob can apply some operation on his end to transform his qubit
        into the correct form?
      </p>
      <p>
        If Alice measures <InlineMathBlock latex="\ket{01}" />, then Bob has:{" "}
        <InlineMathBlock latex="a\ket{1} + b\ket{0}" />. So the coefficients are
        the wrong way round. We know we can fix this by simply applying an{" "}
        <InlineMathBlock latex="X" /> gate. So if Bob applies an{" "}
        <InlineMathBlock latex="X" /> gate to his qubit, he will end up with{" "}
        <InlineMathBlock latex="a\ket{0} + b\ket{1}" />, which is the state we
        wanted to send.
      </p>
      <p>
        If Alice measures <InlineMathBlock latex="\ket{10}" />, then Bob has{" "}
        <InlineMathBlock latex="a\ket{0} - b\ket{1}" />. So the coefficients are
        the right way round, but the wrong sign. We can fix this by applying a{" "}
        <InlineMathBlock latex="Z" /> gate. So if Bob applies a{" "}
        <InlineMathBlock latex="Z" /> gate to his qubit, he will end up with{" "}
        <InlineMathBlock latex="a\ket{0} + b\ket{1}" />.
      </p>
      <p>
        If Alice measures <InlineMathBlock latex="\ket{11}" />, then Bob has{" "}
        <InlineMathBlock latex="a\ket{1} - b\ket{0}" />. So the coefficients are
        the wrong way round and the wrong sign. We can fix this by applying an{" "}
        <InlineMathBlock latex="X" /> gate and a <InlineMathBlock latex="Z" />{" "}
        gate. So if Bob applies <InlineMathBlock latex="ZX" />
        his qubit, he will end up with{" "}
        <InlineMathBlock latex="a\ket{0} + b\ket{1}" />.
      </p>
      <p>
        Observing this pattern, we see that the first bit of Alice&apos;s
        measurement tells Bob whether or not he must apply a{" "}
        <InlineMathBlock latex="Z" /> gate and the second bit tells Bob whether
        or not to apply an <InlineMathBlock latex="X" />. (Note that the{" "}
        <InlineMathBlock latex="X" /> gate must always be applied first and the{" "}
        <InlineMathBlock latex="Z" /> gate second)
      </p>
      <p>
        So after measurement, Alice must send her 2 measured bits to Bob, in
        order for him to decode his entangled bit. We can represent all this in
        our circuit diagram:
      </p>
      <ArticleImage
        src={quantumteleportcompImage}
        alt="A fully complete quantum teleporation circuit"
      />
      <p>
        So we can see how the outcomes of Alice&apos;s measurement can be
        applied to Bob&apos;s qubit as a <InlineMathBlock latex="\text{CNOT}" />{" "}
        and <InlineMathBlock latex="\text{cZ}" /> (controlled-Z) gate.
      </p>
      <p>
        And here we see the exact reason why this does NOT allow faster than
        light communication. Alice must communicate her 2 measured bits to Bob
        in order for Bob to know what operations to apply to his qubit. Either
        that, or Alice&apos;s qubits must be brought physically close to
        Bob&apos;s qubit in order to apply the two controlled gates.
      </p>
      <p>
        Both of these tasks (communicating 2 bits of information or bringing
        physical qubits together) we know cannot be done faster than the speed
        of light. And therefore, it is impossible for Bob to know how to recover{" "}
        <InlineMathBlock latex="\ket{\psi}" /> quicker than the time it takes
        light to travel between him and Alice.
      </p>
    </Article>
  );
};

export default Page;
