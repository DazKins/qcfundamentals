import { getArticlePageMetadata } from "@/course/courseStructure";
import Article from "@/components/article";
import InlineMathBlock from "@/components/inlineMathBlock";
import MathBlock from "@/components/mathBlock";
import Exercise from "@/components/exercise";

const CHAPTER_ID = "mathematical-foundations";
const ARTICLE_ID = "bra-ket-notation";

export const metadata = getArticlePageMetadata(CHAPTER_ID, ARTICLE_ID);

// TODO rename to just "Bra Ket notation"?

const Page = () => {
  return (
    <Article>
      <h2>Introduction</h2>
      <p>
        We&apos;re now going to cover a slightly different notation for doing
        linear algebra called Bra-ket notation. It was invented by Paul Dirac
        ins his 1939 publication &quot;A New Notation for Quantum
        Mechanics&quot;. Although it won&apos;t be immmediately obvious, this
        notation will be very convenient as we jump into quantum computing
      </p>
      <p>
        This notation will give us many new and interesting tools to use, but we
        will just cover the basics in this article as we&apos;ve already spent
        long enough build the mathematical foundations.
      </p>
      <h2>Definitions</h2>
      <p>There are 4 fundamental objects we will use:</p>
      <p>
        A Ket looks like this <InlineMathBlock latex="\ket{v}" /> and it will
        represent a vector.
      </p>
      <p>
        A Bra looks like this <InlineMathBlock latex="\bra{v}" />. It&apos;s a
        bit more tricky to define straight away so I&apos;ll defer a proper
        explanation until later on.
      </p>
      <p>
        Next are operators. An operator will typically be represented by a
        capital roman letter e.g. <InlineMathBlock latex="A" />. These will be
        the exact same as operators from the previous article.
      </p>
      <p>
        And then just as before, we will have scalars represented as lowercase
        roman letters. The one slight difference we&apos;ll introduce here is
        that scalars can multiply bras, kets and operators:
        <InlineMathBlock latex="a\ket{v}" />,{" "}
        <InlineMathBlock latex="b\bra{v}" /> or <InlineMathBlock latex="cA" />.
        We&apos;ll see more about what this means later. As alluded to in the
        previous article, we are primarily interested in the case when these
        scalars are complex numbers.
      </p>
      <h2>The Inner Product</h2>
      <p>
        With bra-ket notation we would represent the inner product of two
        vectors <InlineMathBlock latex="\ket{v}" /> and{" "}
        <InlineMathBlock latex="\ket{w}" /> as{" "}
        <InlineMathBlock latex="\braket{v|w}" />. Notice that we&apos;ve flipped
        the ket <InlineMathBlock latex="\ket{v}" /> into a bra{" "}
        <InlineMathBlock latex="\bra{v}" /> here. So this is in effect a bra{" "}
        <i>acting</i> on a ket. This is our first clue as to what a bra actually
        is.
      </p>
      <p>
        We can represent the 3 rules discussed in the previous articles as such:
      </p>
      <h3>Linearity in the second argument</h3>
      <MathBlock latex="\bra{u}\bigl(a\ket{v} + b\ket{w}\bigr) = a\braket{u|v} + b\braket{u|w}" />
      <h3>Conjugate symmetry</h3>
      <MathBlock latex="\braket{v|w}=\braket{w|v}^*" />
      <h3>Positive definiteness</h3>
      <MathBlock latex="\braket{v|v}\geq0\ \ \text{and}\ \ \braket{v|v}=0 \longleftrightarrow \ket{v}=0" />
      <h2>Outer Product</h2>
      <p>
        Another operation we can perform here is called the outer product. It
        looks like this: <InlineMathBlock latex="\ket{v}\bra{w}" />. The result
        of this operation is an operator. We will define what this operator does
        in the following way:
      </p>
      <MathBlock latex="\ket{u}\bra{v}\ket{w}\equiv\braket{v|w}\ket{u}" />
      <p>
        So when an outer product acts on a ket, we get the inner product of the
        right bra with that ket, multiplied as a coefficient of the left ket.
      </p>
      <p>
        Remember, a bra acting on a ket (
        <InlineMathBlock latex="\braket{v|w}" />) gives us a scalar and a ket
        acting on a bra (<InlineMathBlock latex="\ket{v}\bra{w}" />) gives us an
        operator.
      </p>
      <h2>Bringing it all together</h2>
      <p>
        Now we&apos;ve got some definitions in our mathematical toolkit,
        let&apos;s see what we can do with them!
      </p>
      <p>
        To kick things off, I&apos;ll define some new notation. Instead of using{" "}
        <InlineMathBlock latex="\ket{v}" /> and{" "}
        <InlineMathBlock latex="\ket{w}" /> as vectors I&apos;m going to define
        the following:
      </p>
      <MathBlock latex="\ket{0},\ket{1},\ket{2},...,\ket{d} \in V \qquad \text{and} \qquad \braket{i|j}=\begin{cases}1\text{  if  }i = j \\ 0\text{  if  }i\neq j\end{cases}" />
      <p>
        So we have <InlineMathBlock latex="d" /> vectors, that are members of
        the vector space <InlineMathBlock latex="V" />. They are all orthogonal
        to eachother. That is, the inner product of any two vectors is 0. They
        are also normal, as the inner product of a vector with itself is 1.
      </p>
      <p>
        So the vectors{" "}
        <InlineMathBlock latex="\ket{0}, \ket{1}, \ldots, \ket{d}" /> form an
        orthonormal basis of dimension <InlineMathBlock latex="d" />.
      </p>
      <p>
        An arbitrary vector <InlineMathBlock latex="\ket{v}" /> in our space{" "}
        <InlineMathBlock latex="V" /> can then be defined as:
      </p>
      <MathBlock latex="\ket{v}= v_0\ket{0} + v_1\ket{1} + \ldots + v_d\ket{d} = \sum_i{v_i\ket{i}}" />
      <h2>Linear operators as outer products</h2>
      <p>
        We&apos;ve already seen how the outer product of two vectors can give us
        a linear operator. What we will show now is how we can represent a
        linear operator as a sum of coefficients of outer products.
      </p>
      <p>
        The most basic operator we will investigate first is the identity
        operator:
      </p>
      <MathBlock latex="I = \ket{0}\bra{0} + \ket{1}\bra{1} + \ldots + \ket{d}\bra{d} = \sum_i\ket{i}\bra{i}" />
      <p>
        It might not be intuitive how that works at first, so let&apos;s try it
        out on our arbitrary vector <InlineMathBlock latex="\ket{v}" /> defined
        above:
      </p>
      <MathBlock latex="I\ket{v} = \bigl(\sum_i\ket{i}\bra{i}\bigr)\bigl(\sum_j{v_j\ket{j}}\bigr)" />
      <p>
        Note here that I&apos;ve changed the iterator{" "}
        <InlineMathBlock latex="i" /> to <InlineMathBlock latex="j" /> in the
        second sum to ease our calculation here.
      </p>
      <p>Our operators are linear so they distribute over addition:</p>
      <MathBlock
        latex={[
          "=\\sum_{i,j}\\ket{i}\\bra{i}v_j\\ket{j}",
          "=\\sum_{i,j}v_j\\ket{i}\\bra{i}\\ket{j}",
          "=\\sum_{i,j}v_j\\braket{i|j}\\ket{i}",
        ]}
      />
      <p>
        But we know from our definition from earlier that{" "}
        <InlineMathBlock latex="\braket{i|j}" /> is 0 when{" "}
        <InlineMathBlock latex="i\neq j" /> and 1 when{" "}
        <InlineMathBlock latex="i=j" /> . This means we can simplify our sum to:
      </p>
      <MathBlock latex="=\sum_i v_i\ket{i} = \ket{v}" />
      <p>
        So we have proved that this does indeed implement the identity operator!
      </p>
      <p>
        Here are some definitions of interesting 2-dimensional linear operators.
        Note that in these definitions we assume that{" "}
        <InlineMathBlock latex="\ket{0}" /> is the first basis vector and{" "}
        <InlineMathBlock latex="\ket{1}" /> is the second.
      </p>
      <MathBlock
        latex={[
          "X = \\ket{0}\\bra{1} + \\ket{1}\\bra{0}",
          "Y = -i\\ket{0}\\bra{1} + i\\ket{1}\\bra{0}",
          "Z = \\ket{0}\\bra{0} - \\ket{1}\\bra{1}",
        ]}
      />
      <p>
        Let&apos;s define a 2D vector{" "}
        <InlineMathBlock latex="\ket{v} = a\ket{0} + b\ket{1}" /> and see how
        the <InlineMathBlock latex="X" /> operator acts on it:
      </p>
      <MathBlock
        latex={[
          "X\\ket{v} = \\bigl(\\ket{0}\\bra{1} + \\ket{1}\\bra{0}\\bigr)\\bigl(a\\ket{0} + b\\ket{1}\\bigr)",
          "= a\\bigl(\\ket{0}\\bra{1} + \\ket{1}\\bra{0}\\bigr)\\ket{0} + b\\bigl(\\ket{0}\\bra{1} + \\ket{1}\\bra{0}\\bigr)\\ket{1}",
          "= a\\bigl(\\ket{0}\\bra{1}\\ket{0} + \\ket{1}\\bra{0}\\ket{0}\\bigr) + b\\bigl(\\ket{0}\\bra{1}\\ket{1} + \\ket{1}\\bra{0}\\ket{1}\\bigr)",
          "= a\\bigl(\\braket{1|0}\\ket{0} + \\braket{0|0}\\ket{1}\\bigr) + b\\bigl(\\braket{1|1}\\ket{0} + \\braket{0|1}\\ket{1}\\bigr)",
        ]}
      />
      <p>Then we apply our inner product rules in our definition:</p>
      <MathBlock
        latex={[
          "= a\\bigl(0\\ket{0} + 1\\ket{1}\\bigr) + b\\bigl(1\\ket{0} + 0\\ket{1}\\bigr)",
          "= a\\ket{1} + b\\ket{0}",
        ]}
      />
      <p>
        So the effect of the <InlineMathBlock latex="X" /> operator was to flip
        the coefficients of <InlineMathBlock latex="\ket{0}" /> and{" "}
        <InlineMathBlock latex="\ket{1}" />. I encourage you to have a play with
        the other operators and see what they do.
      </p>
      <p>
        Let&apos;s take a second to reflect here, this is really interesting.
        Just in the same way that we can represent any vector as a sum of
        multiples of basis vectors, we can also represent any linear operator as
        a sum of multiples of outer-products of basis vectors. You may recall in
        the previous article where we said to define a linear operator, we only
        need to define how it acts on the basis vectors. And this proves just
        that. You can see, for example, in the definition of{" "}
        <InlineMathBlock latex="X" /> that it takes the basis vector{" "}
        <InlineMathBlock latex="\ket{0}" /> to{" "}
        <InlineMathBlock latex="\ket{1}" /> and the basis vector{" "}
        <InlineMathBlock latex="\ket{1}" /> to{" "}
        <InlineMathBlock latex="\ket{0}" />.
      </p>
      <h2>Exercises</h2>
      <h3>Exercise 1</h3>
      <Exercise
        problem={
          <>
            <p>
              Show that <InlineMathBlock latex="XY = iZ" />.
            </p>
          </>
        }
        solution={
          <>
            <MathBlock
              latex={[
                "XY = (\\ket{0}\\bra{1} + \\ket{1}\\bra{0})(-i\\ket{0}\\bra{1} + i\\ket{1}\\bra{0})",
                "= -i\\ket{0}\\bra{1}\\ket{0}\\bra{1} + i \\ket{0}\\bra{1}\\ket{1}\\bra{0} - i\\ket{1}\\bra{0}\\ket{0}\\bra{1} + i\\ket{1}\\bra{0}\\ket{1}\\bra{0}",
              ]}
            />
            <p>
              It&apos;s not immediately obvious how we can simplify this
              expression. Our intuition tells us perhaps there might be a way to
              simplify when we have two outer products together like this:
              <InlineMathBlock latex="\ket{i}\bra{j}\ket{k}\bra{l}" />. Let&apos;s
              investigate how this would behave on some arbitrary basis vector <InlineMathBlock latex="\ket{a}" />:
            </p>
            <MathBlock
              latex={[
                "\\ket{i}\\bra{j}\\ket{k}\\bra{l}\\ket{a}",
                "= \\ket{i}\\bra{j}(\\ket{k}\\bra{l}\\ket{a})",
                "= \\ket{i}\\bra{j}(\\braket{l|a}\\ket{k})",
                "= \\braket{l|a}\\ket{i}\\bra{j}\\ket{k}",
                "= \\braket{l|a}\\braket{j|k}\\ket{i}",
              ]}
            />
            <p>
              Since all of these vectors are orthonormal, we know that this will
              be <InlineMathBlock latex="\mathbf{0}" /> if{" "}
              <InlineMathBlock latex="j \neq k" />. If{" "}
              <InlineMathBlock latex="j = k" /> then we have{" "}
              <InlineMathBlock latex="\braket{j|k} = 1" /> so:
            </p>
            <MathBlock
              latex={["= \\braket{l|a}\\ket{i}", "= \\ket{i}\\bra{j}\\ket{a}"]}
            />
            <p>
              Since we know that studying how an operator acts on basis vectors
              is sufficient for determining how it interacts with all vectors,
              we can now see:
            </p>
            <MathBlock latex="\ket{i}\bra{j}\ket{k}\bra{l} = \begin{cases}0\ \ \textmd{if}\ \ j \neq k \\ \ket{i}\bra{l}\ \ \textmd{if}\ \ j = k\end{cases}" />
            <p>
              Great, so now we can use this fact to simplify our original sum
              from above:
            </p>
            <MathBlock
              latex={[
                "= -i\\ket{0}\\bra{1}\\ket{0}\\bra{1} + i \\ket{0}\\bra{1}\\ket{1}\\bra{0} - i\\ket{1}\\bra{0}\\ket{0}\\bra{1} + i\\ket{1}\\bra{0}\\ket{1}\\bra{0}",
                "= i\\ket{0}\\ket{0} - i\\ket{1}\\ket{1}",
                "= iZ",
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
              Continuing on from the previous exercise, check what the other{" "}
              <InlineMathBlock latex="X" />, <InlineMathBlock latex="Y" /> and{" "}
              <InlineMathBlock latex="Z" /> operators do when multiplied
              together. What patterns do you notice?
            </p>
          </>
        }
        solution={
          <>
            <p>
              Trying <InlineMathBlock latex="YZ" /> we get:
            </p>
            <MathBlock
              latex={[
                "YZ = (-i\\ket{0}\\bra{1} + i\\ket{1}\\bra{0})(\\ket{0}\\bra{0} - \\ket{1}\\bra{1})",
                "= -i\\ket{0}\\bra{1}\\ket{0}\\bra{0} + i\\ket{0}\\bra{1}\\ket{1}\\bra{1} + i\\ket{1}\\bra{0}\\ket{0}\\bra{0} - i\\ket{1}\\bra{0}\\ket{1}\\bra{1}",
                "= i\\ket{0}\\bra{1} + i\\ket{1}\\bra{0}",
                "= iX",
              ]}
            />
            <p>
              But if we try <InlineMathBlock latex="ZY" /> we get:
            </p>
            <MathBlock
              latex={[
                "ZY = (\\ket{0}\\bra{0} - \\ket{1}\\bra{1})(-i\\ket{0}\\bra{1} + i\\ket{1}\\bra{0})",
                "= -i\\ket{0}\\bra{0}\\ket{0}\\bra{1} + i\\ket{0}\\bra{0}\\ket{1}\\bra{0} + i\\ket{1}\\bra{1}\\ket{0}\\bra{1} - i\\ket{1}\\bra{1}\\ket{1}\\bra{0}",
                "= -i\\ket{0}\\bra{1} - i\\ket{1}\\bra{0}",
                "= -iX",
              ]}
            />
            <p>
              Checking the other cases will reveal the pattern that when
              multiplying two of these operators that are different in
              alphabetical order we get <InlineMathBlock latex="i" /> times the
              other operator. If we multiply them not in alphabetical order we
              get <InlineMathBlock latex="-i" /> times the other operator.
            </p>
            <p>
              We should also investigate the case of when we multiply an
              operator by itself:
            </p>
            <MathBlock
              latex={[
                "YY = (-i\\ket{0}\\bra{1} + i\\ket{1}\\bra{0})(-i\\ket{0}\\bra{1} + i\\ket{1}\\bra{0})",
                "= -\\ket{0}\\bra{1}\\ket{0}\\bra{1} + \\ket{0}\\bra{1}\\ket{1}\\bra{0} + \\ket{1}\\bra{0}\\ket{0}\\bra{1} - \\ket{1}\\bra{0}\\ket{1}\\bra{0}",
                "= \\ket{0}\\bra{0} + \\ket{1}\\bra{1}",
                "= I",
              ]}
            />
            <p>
              We can check to other cases to confirm that multiplying any of
              these operators by themselves always give the identity operator.
            </p>
            <p>
              These 4 operators <InlineMathBlock latex="I" />,{" "}
              <InlineMathBlock latex="X" />, <InlineMathBlock latex="Y" /> and{" "}
              <InlineMathBlock latex="Z" /> are called that Pauli operators.
              They are a well known set of operators that will prove useful in
              our study of quantum computing.
            </p>
          </>
        }
      />
    </Article>
  );
};

export default Page;
