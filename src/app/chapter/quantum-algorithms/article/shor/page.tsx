import Article from "@/components/article";
import InlineMathBlock from "@/components/inlineMathBlock";
import MathBlock from "@/components/mathBlock";
import { getArticlePageMetadata } from "@/course/courseStructure";
import Link from "next/link";

const CHAPTER_ID = "quantum-algorithms";
const ARTICLE_ID = "shor";

export const metadata = getArticlePageMetadata(CHAPTER_ID, ARTICLE_ID);

const Page = () => {
  return (
    <Article>
      <p>
        We&apos;re here! We&apos;ve made it. Finally after all the build-up,
        we&apos;re finally ready to see how quantum computers can factor large
        numbers into prime factors!
      </p>
      <p>
        And quite surprisingly, this may be one of the shortest articles. We
        won&apos;t even use any quantum computing here!
      </p>
      <p>
        Being able to factor large numbers is hugely important since it forms
        the backbone of all modern encryption. Specifically, RSA encryption uses
        a system where we define some number <InlineMathBlock latex="N" /> such
        that <InlineMathBlock latex="N = p \times q" /> where{" "}
        <InlineMathBlock latex="p" /> and <InlineMathBlock latex="q" /> are
        large prime numbers. <InlineMathBlock latex="N" /> forms the
        &quot;public&quot; key that is exposed to everyone and{" "}
        <InlineMathBlock latex="p" /> and <InlineMathBlock latex="q" /> form the
        &quot;private&quot; that should be kept secret.
      </p>
      <p>
        So we can see that having some machine that could factor composite
        numbers quickly would allow us to easily obtain the private key from the
        public key.
      </p>
      <p>
        We won&apos;t go into the specifics of RSA encryption here, but just
        know that factoring <InlineMathBlock latex="N" /> would give an attacker
        the ability to read any encrypted message sent to the owner of the
        private keys.
      </p>
      <p>
        Shor&apos;s algorithm was first proposed by{" "}
        <Link href="https://en.wikipedia.org/wiki/Peter_Shor">Peter Shor</Link>{" "}
        in 1994. In fact, we&apos;ve already seen half of it. In his original
        paper: &quot;Algorithms for Quantum Computation: Discrete Logarithms and
        Factoring&quot; he first presented the fast quantum algorithm for
        solving the order-finding problem and then showed that that algorithm
        gives us a way to do factorisation.
      </p>
      <p>
        Let&apos;s see how we can use order-finding to factor{" "}
        <InlineMathBlock latex="N" />!
      </p>
      <p>
        We start by choosing some random value <InlineMathBlock latex="a" />{" "}
        such that <InlineMathBlock latex="1 < a < N" />. We then calculate the
        greatest common divisor of <InlineMathBlock latex="a" /> and{" "}
        <InlineMathBlock latex="N" />. If the greatest common divisor is not 1,
        then we have found a factor of <InlineMathBlock latex="N" /> (either{" "}
        <InlineMathBlock latex="p" /> or <InlineMathBlock latex="q" />) already,
        so we can stop here. If the greatest common divisor is 1, then we move
        on to the next step.
      </p>
      <p>
        Since <InlineMathBlock latex="a" /> and <InlineMathBlock latex="N" />{" "}
        are co-prime we know that there must exist some{" "}
        <InlineMathBlock latex="r" /> such that:
      </p>
      <MathBlock latex="a^r \equiv 1\ (\text{mod}\ N)" />
      <p>
        This is our order-finding problem. We simply use our fast quantum
        algorithm from the previous article to find{" "}
        <InlineMathBlock latex="r" />.
      </p>
      <p>
        If <InlineMathBlock latex="r" /> turns out to be odd, we&apos;re out of
        luck and we must try another value of <InlineMathBlock latex="a" />.
        Once we&apos;ve got an even value of <InlineMathBlock latex="r" /> we
        know that <InlineMathBlock latex="r=2m" /> for some{" "}
        <InlineMathBlock latex="m" /> so we have:
      </p>
      <MathBlock
        latex={[
          "a^{2m} \\equiv 1\\ (\\text{mod}\\ N)",
          "(a^m)^2 \\equiv 1\\ (\\text{mod}\\ N)",
          "(a^m)^2 - 1 \\equiv 0\\ (\\text{mod}\\ N)",
          "(a^m + 1)(a^m - 1) \\equiv 0\\ (\\text{mod}\\ N)",
        ]}
      />
      <p>
        This looks really promising as we have two integers on the left hand
        side which multiply to a value that is congruent to{" "}
        <InlineMathBlock latex="0" /> mod <InlineMathBlock latex="N" />. This is
        another way of saying that <InlineMathBlock latex="N" /> divides{" "}
        <InlineMathBlock latex="(a^m + 1)(a^m - 1)" />. More specifically:
      </p>
      <MathBlock latex="\frac{(a^m + 1)(a^m - 1)}{N} = k" />
      <p>
        where <InlineMathBlock latex="k" /> is an integer.
      </p>
      <p>
        This must mean that <InlineMathBlock latex="p" /> and{" "}
        <InlineMathBlock latex="q" /> appear somewhere in the prime
        factorisation of the numerator since{" "}
        <InlineMathBlock latex="N = p \times q" />.
      </p>
      <p>
        We will use an already existing fast classical algorithm to compute the
        greatest common divisor (we will use the term{" "}
        <InlineMathBlock latex="\gcd" /> from now on) of{" "}
        <InlineMathBlock latex="N" /> and <InlineMathBlock latex="a^m + 1" />.
        If <InlineMathBlock latex="\gcd(N, a^m + 1) = N" /> (in other words,{" "}
        <InlineMathBlock latex="a^m + 1" /> is a multiple of{" "}
        <InlineMathBlock latex="N" />) then it unfortunately means we have both{" "}
        <InlineMathBlock latex="p" /> and <InlineMathBlock latex="q" /> in the
        factorisation of <InlineMathBlock latex="a^m + 1" /> so we can&apos;t
        extract any factors and we have to start our algorithm again from the
        begining.
      </p>
      <p>
        Taking a look at the other term, it is actually always the case that{" "}
        <InlineMathBlock latex="\gcd(N, a^m - 1) \neq N" />. This is because if{" "}
        <InlineMathBlock latex="a^m - 1" /> was a multiple of{" "}
        <InlineMathBlock latex="N" /> then we would have{" "}
        <InlineMathBlock latex="a^m \equiv 1\ (\text{mod}\ N)" /> which would
        mean that, since
        <InlineMathBlock latex="m = r/2" /> and thus{" "}
        <InlineMathBlock latex="m < r" />, we would have found a smaller order
        of <InlineMathBlock latex="a" /> and <InlineMathBlock latex="N" />. Our
        order-finding algorthim is always guaranteed to give us the smallest
        possible order so this would be a contradiction.
      </p>
      <p>
        Ok, so we&apos;re now at a point where neither{" "}
        <InlineMathBlock latex="a^m + 1" /> or{" "}
        <InlineMathBlock latex="a^m - 1" /> are a multiple of{" "}
        <InlineMathBlock latex="N" />. But since their product is divisible by{" "}
        <InlineMathBlock latex="N" /> it must be the case that one of them is a
        multiple of <InlineMathBlock latex="p" /> and the other a multiple of{" "}
        <InlineMathBlock latex="q" />.
      </p>
      <p>
        This means calculating <InlineMathBlock latex="\gcd(N, a^m + 1)" /> and{" "}
        <InlineMathBlock latex="\gcd(N, a^m - 1)" /> will now give us our
        factors <InlineMathBlock latex="p" /> and <InlineMathBlock latex="q" />.
      </p>
      <p>
        This is amazing! Our fast order-finding quantum algorithm has given us a
        tool to factor large numbers into their prime factors without needing
        any extra quantum algorithm!
      </p>
      <p>
        Now if <InlineMathBlock latex="N" /> had more than two prime factors we
        might require some more work to find the other factors, but the process
        remains more-or-less the same. The final two{" "}
        <InlineMathBlock latex="\gcd" /> operations will always yield two
        non-trivial (not <InlineMathBlock latex="1" /> or{" "}
        <InlineMathBlock latex="N" />) factors.
      </p>
    </Article>
  );
};

export default Page;
