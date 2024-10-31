import Article from "@/components/article";
import ArticleLink from "@/components/articleLink";
import InlineMathBlock from "@/components/inlineMathBlock";
import MathBlock from "@/components/mathBlock";
import { getArticlePageMetadata } from "@/course/courseStructure";

const CHAPTER_ID = "quantum-algorithms";
const ARTICLE_ID = "order-finding";

export const metadata = getArticlePageMetadata(CHAPTER_ID, ARTICLE_ID);

const Page = () => {
  return (
    <Article>
      <p>
        In order to understand the application of the fourier transform to more
        applications, we&apos;ll first look at an algorithm called order finding.
      </p>
      <p>
        This algorithm takes a periodic function as input and produces, as
        output, the period of that function. We&apos;ll talk a bit more about exactly
        what that means in a bit. But first let&apos;s go back to an old friend:
        modular arithmetic.
      </p>
      <p>
        We first met modular (or clock) arithmetic in our article on{" "}
        <ArticleLink chapterId="mathematical-foundations" articleId="fields">
          fields
        </ArticleLink>
        . Doing arithmetic modulo <InlineMathBlock latex="N" /> essentially
        means only being concerned with the number&apos;s remainder when divided by{" "}
        <InlineMathBlock latex="N" />. So we get statements like the following:
      </p>
      <MathBlock latex="13 \equiv 3\ (\text{mod }10)" />
      <p>
        This is saying that <InlineMathBlock latex="13" /> and{" "}
        <InlineMathBlock latex="3" /> are equal (or, more formally, congruent)
        mod <InlineMathBlock latex="10" /> as they both have the same remainder
        (<InlineMathBlock latex="3" />) when divided by{" "}
        <InlineMathBlock latex="10" />.
      </p>
      <p>Order finding, is concerned with this equation:</p>
      <MathBlock latex="x^r \equiv 1\ (\text{mod }N)" />
      <p>
        Specifically, we will choose some value of <InlineMathBlock latex="x" />{" "}
        and <InlineMathBlock latex="N" /> and ask: what is{" "}
        <InlineMathBlock latex="r" />? Put more plainly, this is: how many times
        do I have to multiply <InlineMathBlock latex="x" /> by itself before it
        gets back to <InlineMathBlock latex="1" /> modulo{" "}
        <InlineMathBlock latex="N" />?
      </p>
      <p>
        This is a very important question in number theory. We won&apos;t dwell too
        much on all the interesting details, but it is important to note that
        for some <InlineMathBlock latex="x" /> and <InlineMathBlock latex="N" />{" "}
        there is no such <InlineMathBlock latex="r" />. For example, if{" "}
        <InlineMathBlock latex="x=2" /> and <InlineMathBlock latex="N = 8" />,
        no matter how many times we multiply <InlineMathBlock latex="2" /> by
        itself, it will never get to <InlineMathBlock latex="1" />. This is
        fairly easy to see since multiplying by <InlineMathBlock latex="2" />{" "}
        and taking a remainder when divided by <InlineMathBlock latex="8" />{" "}
        will always give us an even number, whereas{" "}
        <InlineMathBlock latex="1" /> is odd.
      </p>
      <p>
        It turns out, that <InlineMathBlock latex="r" /> only exists if{" "}
        <InlineMathBlock latex="x" /> and <InlineMathBlock latex="N" /> are
        co-prime. That is, they share no common factors.
      </p>
      <p>
        One example would be when <InlineMathBlock latex="x=5" /> and{" "}
        <InlineMathBlock latex="N = 21" />, <InlineMathBlock latex="r = 6" />.
        This is because:
      </p>
      <MathBlock
        latex={[
          "5 \\times 5 = 25 \\equiv 4\\ (\\text{mod } 21)",
          "5 \\times 4 = 20 \\equiv 20\\ (\\text{mod } 21)",
          "5 \\times 20 = 100 \\equiv 16\\ (\\text{mod } 21)",
          "5 \\times 16 = 80 \\equiv 17\\ (\\text{mod } 21)",
          "5 \\times 17 = 85 \\equiv 1\\ (\\text{mod } 21)",
        ]}
      />
      <p>Try a few values out for yourself and see what you get!</p>
      <p>
        We call this value <InlineMathBlock latex="r" /> the order. Generally,
        computing the order is really difficult. At least for classical
        computers. We&apos;ll now apply the quantum fourier transform in order to
        solve it more easily using a quantum computer.
      </p>
      <p>
        Like a lot of quantum algorithms, lets start by introducing an oracle.
        Our oracle will be the following:
      </p>
      <MathBlock latex="U\ket{x}\ket{0} = \ket{x}\ket{a^x\ \text{mod}\ N}" />
      <p>
        It&apos;s important to note here that the 2 kets represent multiple quantum
        bits as just having single bit numbers wouldn&apos;t be very useful. We&apos;ll
        deliberately leave these two keys separate during our calculations and
        refer to them as the first/second register.
      </p>
      <p>
        If we start in a state where all our qubits are{" "}
        <InlineMathBlock latex="\ket{0}" /> and then we apply a Hadamard gate to
        all the qubits in the first register we get:
      </p>
      <MathBlock latex="\frac{1}{2^{n/2}}\sum_{j=0}^{2^n-1}\ket{j}\ket{0}" />
      <p>
        Where <InlineMathBlock latex="n" /> is the number of qubits in the first
        register.
      </p>
      <p>Applying our oracle now gives us:</p>
      <MathBlock latex="\frac{1}{2^{n/2}}\sum_{j=0}^{2^n-1}\ket{j}\ket{a^j\ \text{mod}\ N}" />
      <p>
        We can then measure the second register. This will produce some value{" "}
        <InlineMathBlock latex="f_0" /> such that{" "}
        <InlineMathBlock latex="f_0 \equiv a^{x_0}\ (\text{mod}\ N)" /> for some{" "}
        <InlineMathBlock latex="x_0" />.
      </p>
      <p>
        This now means the first register has dropped any states{" "}
        <InlineMathBlock latex="\ket{j}" /> such that{" "}
        <InlineMathBlock latex="a^j \not\equiv f_0\ (\text{mod}\ N)" />
      </p>
      <p>
        So, where&apos;s <InlineMathBlock latex="r" /> going to come from in all
        this? For that, we&apos;ll jump back into a little bit of number theory.
      </p>
      <p>
        Since we know <InlineMathBlock latex="a^r \equiv 1\ (\text{mod}\ N)" />{" "}
        we have that for any numbers <InlineMathBlock latex="x" /> and{" "}
        <InlineMathBlock latex="k" />:
      </p>
      <MathBlock latex="a^{x+kr} \equiv a^xa^{kr} \equiv a^x(a^r)^k \equiv a^x(1)^k \equiv a^x\ (\text{mod}\ N)" />
      <p>So, we know:</p>
      <MathBlock latex="f_0 \equiv a^{x_0} \equiv a^{x_0 + r} \equiv a^{x_0 + 2r} \equiv \ldots\ (\text{mod}\ N)" />
      <p>
        This means any value in the first register must now be of the form:
        <InlineMathBlock latex="\ket{j+kr}" /> for some{" "}
        <InlineMathBlock latex="k" />.
      </p>
      <p>So our state now becomes:</p>
      <MathBlock latex="\frac{1}{\sqrt{m}}\sum_{j=0}^{m-1}\ket{x_0 + jr}" />
      <p>
        Where <InlineMathBlock latex="m" /> is the number of remaining kets.
      </p>
      <p>And now we apply the Quantum Fourier Transform:</p>
      <MathBlock
        latex={[
          "QFT\\Bigl(\\frac{1}{\\sqrt{m}}\\sum_{j=0}^{m-1}\\ket{x_0 + jr}\\Bigr) = \\frac{1}{\\sqrt{m}}\\sum_{j=0}^{m-1}QFT(\\ket{x_0 + jr})",
          "= \\frac{1}{\\sqrt{m}}\\sum_{j=0}^{m-1}\\frac{1}{2^{n/2}}\\sum_{k=0}^{2^n-1}\\omega_{2^n}^{(x_0 + jr)k}\\ket{k}",
          "= \\frac{1}{\\sqrt{m2^n}}\\sum_{j=0}^{m-1}\\sum_{k=0}^{2^n-1}\\omega_{2^n}^{kjr}\\omega_{2^n}^{kx_0}\\ket{k}",
          "= \\frac{1}{\\sqrt{m2^n}}\\sum_{k=0}^{2^n-1}\\Bigl(\\sum_{j=0}^{m-1}\\omega_{2^n}^{kjr}\\Bigl)\\omega_{2^n}^{kx_0}\\ket{k}",
        ]}
      />
      <p>That part in the brackets will prove crucial to us now.</p>
      <p>
        If we expand the <InlineMathBlock latex="\omega" /> we get:
      </p>
      <MathBlock latex="\sum_{j=0}^{m-1}e^{2\pi ij\frac{kr}{2^n}}" />
      <p>
        In case the text is getting too small, that fraction in the exponent is:
      </p>
      <MathBlock latex="\frac{kr}{2^n}" />
      <p>
        This is a geometric series and we can use the formula for the sum of a
        geometric series to get:
      </p>
      <MathBlock latex="\sum_{j=0}^{m-1}e^{2\pi ij\frac{kr}{2^n}} = \frac{1-e^{2\pi im\frac{kr}{2^n}}}{1-e^{2\pi i\frac{kr}{2^n}}}" />
      <p>
        Now, if <InlineMathBlock latex="k" /> is a value very close to an
        integer multiple of <InlineMathBlock latex="2^n/r" />, i.e.{" "}
        <InlineMathBlock latex="k \approx c2^n/r" /> for some{" "}
        <InlineMathBlock latex="c" />, we can see the fraction in the exponent
        at the bottom is near to <InlineMathBlock latex="1" /> so the whole
        fraction gets very large. Otherwise the term is very small.
      </p>
      <p>
        What this whole exercise essentially tells us is that the co-efficient
        for terms where <InlineMathBlock latex="k" /> is close to{" "}
        <InlineMathBlock latex="c2^n/r" /> will be very large, and the rest will
        be very small.
      </p>
      <p>
        This means, upon measuring now the first register, we have a very high
        probability to measure a state of the form:
      </p>
      <MathBlock latex="\ket{c2^n/r}" />
      <p>
        Great! That&apos;s all the messy quantum stuff out the way, now how do we get{" "}
        <InlineMathBlock latex="r" /> from this?
      </p>
      <p>
        If we let our measurement be <InlineMathBlock latex="y" /> then we can
        simply divide by the known value <InlineMathBlock latex="2^n" /> to get:
      </p>
      <MathBlock latex="\frac{y}{2^n} \approx \frac{c}{r}" />
      <p>
        Notice we say approximately here. This is because we can&apos;t gaurantee we
        measure an exact multiple, only that our measurement is very close.
      </p>
      <p>
        Now, if <InlineMathBlock latex="c" /> and <InlineMathBlock latex="r" />{" "}
        are not co-prime (i.e. they share a common factor), we can&apos;t extract{" "}
        <InlineMathBlock latex="r" />. e.g. if <InlineMathBlock latex="c = 8" />{" "}
        and <InlineMathBlock latex="r = 4" /> then{" "}
        <InlineMathBlock latex="y/2^n" /> is <InlineMathBlock latex="1/2" />, so
        our <InlineMathBlock latex="r" /> value gets &quot;destroyed&quot; by
        the common factor cancelling. If we have this problem there&apos;s
        unfortunately no real way of knowing. We&apos;ll see later that if we fail in
        this way we will simply retry the quantum part of the algorithm.
      </p>
      <p>
        Trying to extract <InlineMathBlock latex="r" /> from our
        <InlineMathBlock latex="y/2^n" /> value comes with another difficulty:
        We only used a finite number of bits. If <InlineMathBlock latex="r" />{" "}
        is odd, then <InlineMathBlock latex="1/r" /> has an infinite decimal
        representation. So it&apos;s likely we may end up with an approximate value
        that is cutoff at some point.
      </p>
      <p>
        Luckily, we know that <InlineMathBlock latex="c" /> and{" "}
        <InlineMathBlock latex="r" /> are integers, so our number must be
        rational. This means we can approximate <InlineMathBlock latex="r" />{" "}
        with the process of continued fractions.
      </p>
      <p>
        Continued fractions provides a way to develop a sequence of fractions
        providing better and better approximations to a given number. This also
        helps because we know we didn&apos;t necessarily measure an exact multiple of{" "}
        <InlineMathBlock latex="2^n/r" />.
      </p>
      <p>
        The continued fraction for a number <InlineMathBlock latex="q" /> is:
      </p>
      <MathBlock latex="q = a_0 + \frac{1}{a_1 + \frac{1}{a_2 + \frac{1}{\ldots}}}" />
      <p>
        Where the sequence of <InlineMathBlock latex="a_n" /> provides better
        and better approximations for <InlineMathBlock latex="q" />.
      </p>
      <p>
        For example, if <InlineMathBlock latex="q = 1.6" /> we can find it&apos;s
        continued fraction with the following method:
      </p>
      <MathBlock
        latex={[
          "q = 1 + 0.6 = 1 + \\frac{3}{5} = 1 + \\frac{1}{\\frac{5}{3}}",
          "\\frac{5}{3} = 1 + \\frac{2}{3} = 1 + \\frac{1}{\\frac{3}{2}}",
          "\\frac{3}{2} = 1 + \\frac{1}{2}",
        ]}
      />
      <p>Subbing each of those statements into the one above we have:</p>
      <MathBlock latex="q = 1 + \frac{1}{1 + \frac{1}{1 + \frac{1}{2}}}" />
      <p>
        So our sequence is{" "}
        <InlineMathBlock latex="a_0 = 1,\ a_1 = 1,\ a_2 = 1,\ a_3 = 2" />.
      </p>
      <p>
        Our approximations <InlineMathBlock latex="p_n" /> are then:
      </p>
      <MathBlock
        latex={[
          "p_0 = 1",
          "p_1 = 1 + \\frac{1}{1} = 2",
          "p_2 = 1 + \\frac{1}{1 + \\frac{1}{1}} = \\frac{3}{2}",
          "p_3 = 1 + \\frac{1}{1 + \\frac{1}{ 1 + \\frac{1}{2} }} = \\frac{8}{5}",
        ]}
      />
      <p>
        So, continued fractions gives us a list of continuing better
        approximations for our rational fraction. We can simply read off the
        denominator of any of them to get a candidate value for{" "}
        <InlineMathBlock latex="r" />. So our three candidate{" "}
        <InlineMathBlock latex="r" /> values in this example are:{" "}
        <InlineMathBlock latex="1" />, <InlineMathBlock latex="2" /> and{" "}
        <InlineMathBlock latex="5" />.
      </p>
      <p>
        How do we check a candidate value? Just sub it into our original
        equation! <InlineMathBlock latex="x^r\ \text{mod}\ N" /> can be easily
        computed and checked by a classical computer. If it equals{" "}
        <InlineMathBlock latex="1" /> we are done. If it doesn&apos;t, we simply move
        on to our next candidate value.
      </p>
      <p>
        If all of our candidate values fail, it means either{" "}
        <InlineMathBlock latex="c" /> and <InlineMathBlock latex="r" /> were not
        co-prime or our continued fractions approximation was unnsuccesful. In
        this scenario we just try again.
      </p>
      <p>
        Now at this point, you&apos;re probably confused about this &quot;trying
        again&quot;. Trying again, is not something we do in classical
        algorithms, but it can still be shown that doing this produces the
        correct answer quicker than any classical algorithm on average.
      </p>
      <p>
        In fact, this algorithm actually performs better with bigger numbers!
        More qubits, produces more &quot;sharp&quot; spikes in the co-efficient
        of the <InlineMathBlock latex="\ket{c2^n/r}" /> states and also gives us
        a closer approximation for the continued fraction process. So whereas a
        classical algorithm would have to work harder for larger values of{" "}
        <InlineMathBlock latex="x" /> and <InlineMathBlock latex="N" /> a
        quantum computer actually gets more accurate making the speedup even
        more noticeable!
      </p>
      <p>Let&apos;s quickly review the steps we went through:</p>
      <ol className="list-decimal list-inside">
        <li>
          Prepare two registers: <InlineMathBlock latex="\ket{0}\ket{0}" />
        </li>
        <li>Hadamard gate all the qubits in the first register</li>
        <li>
          Apply the oracle{" "}
          <InlineMathBlock latex="U\ket{x}\ket{0} = \ket{x}\ket{a^x\ \text{mod}\ N}" />
        </li>
        <li>Measure the second register</li>
        <li>Apply the Quantum Fourier Transform to the first register</li>
        <li>Measure the first register</li>
        <li>
          Use continued fractions on the measured value to approximate some
          candidate values for <InlineMathBlock latex="r" />
        </li>
        <li>If no candidate values work, start again from step 1</li>
      </ol>
      <p>
        We&apos;ve skipped over a few details, such as how many qubits we should use
        and what the probability of success actually is but it&apos;s enough for now.
      </p>
      <p>
        In the next article we&apos;ll use what we&apos;ve learned to factor prime
        numbers!
      </p>
    </Article>
  );
};

export default Page;
