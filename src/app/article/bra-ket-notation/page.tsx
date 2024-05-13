import {
  getArticleDefinition,
  getArticlePageMetadata,
} from "@/article/articleDefinitions";
import Article from "@/components/article";
import InlineMathBlock from "@/components/inlineMathBlock";
import MathBlock from "@/components/mathBlock";

const DOCUMENT_NAME = "bra-ket-notation";
const ARTICLE_DEFINITION = getArticleDefinition(DOCUMENT_NAME);

export const metadata = getArticlePageMetadata(ARTICLE_DEFINITION);

const Page = () => {
  return (
    <Article articleDefinition={ARTICLE_DEFINITION}>
      <h2>Introduction</h2>
      <p>
        I&apos;ve recently been studying and learning a lot of quantum
        mechanics/computing. In this field, we use a special notation called
        bra-ket to simplify the mathematics of linear algebra. It was invented
        by Paul Dirac in his 1939 publication &quot;A New Notation for Quantum
        Mechanics&quot; but is actually very interesting in other areas.
      </p>
      <p>
        Anybody who&apos;s studied linear algebra will know how annoying writing
        out all the vectors and matrices can be. Bra-ket notation simplifies
        this and I hope to introduce you to it in this article.
      </p>
      <h2>Definitions</h2>
      <p>There are 4 fundamental objects we will use:</p>
      <p>
        A Ket looks like this <InlineMathBlock latex="\ket{v}" /> and you can
        think of it as representing a vector.
      </p>
      <p>
        A Bra looks like this <InlineMathBlock latex="\bra{v}" />. It&apos;s a
        bit more tricky to define straight away so I&apos;ll defer a proper
        explanation until later on.
      </p>
      <p>
        Next are operators. An operator will typically be represented by a
        capital roman letter e.g. <InlineMathBlock latex="A" />. These will be
        equivalent to matrices.
      </p>
      <p>
        The final objects are scalars. These are{" "}
        <a href="https://en.wikipedia.org/wiki/Complex_number">
          complex numbers
        </a>{" "}
        that we multily our bras, kets and operators by. They will be
        represented with lowercase roman letters so will look like{" "}
        <InlineMathBlock latex="a\ket{v}" />,{" "}
        <InlineMathBlock latex="b\bra{v}" /> or <InlineMathBlock latex="cA" />.
        Why complex numbers? We could use real numbers just as well but complex
        numbers give some more interesting properties we can study later.
      </p>
      <h2>The Inner Product</h2>
      <p>
        One of the most common operations from linear algebra is the{" "}
        <a href="https://en.wikipedia.org/wiki/Dot_product">dot product</a>. In
        bra-ket notation we give this the more fancy name &quot;inner
        product&quot; but they are the same thing.
      </p>
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
      <p>Ok, but how do we actually calculate this?</p>
      <p>
        The answer to this is slightly different than in standard linear
        algebra. Normally we learn the dot product as the sum of the product of
        corresponding vector elements. This allows us to compute a dot product
        given any 2 vectors. Bra-ket notation deals with a more abstract notion
        of mathematics in which instead of defining <i>how</i> to do something
        we&apos;ll define <i>what</i> it means. More specifically, we&apos;ll
        specify properties or conditions that the inner product must satisfy and
        study it from there.
      </p>
      <p>
        There are 3 definitions that the inner product must satisfy. These are:
      </p>
      <h3>Rule 1: Linearity in the second argument</h3>
      <MathBlock latex="\bra{v}\bigl(\sum_i{a_i \ket{w_i}}\bigr) = \sum_i{a_i\braket{v|w_i}}" />
      <p>
        Woah, looks scary right? It&apos;s actually fairly simple. All it&apos;s
        saying is that the left bra distributes over addition, just like we have
        with multiplication. This probably is a lot simpler if we look at an
        example:
      </p>
      <MathBlock latex="\bra{v}\bigl(a\ket{w} + b\ket{x}\bigr) = a\braket{v|w} + b\braket{v|x}" />
      <h3>Rule 2: Conjugation under commutation</h3>
      <MathBlock latex="\braket{v|w}=\braket{w|v}^*" />
      <p>
        This one&apos;s not too tricky, it means if we flip the order of the
        vectors in the inner product the result is the conjugate of the
        original:
      </p>
      <MathBlock latex="\braket{v|w}=a+bi \longleftrightarrow \braket{w|v}=a-bi" />
      <p>
        This is the first time we get to see the implications of using complex
        numbers. In the real numbers we see{" "}
        <InlineMathBlock latex="\braket{v|w}=\braket{w|v}" />
      </p>
      <h3>Rule 3: Vector Magnitude</h3>
      <MathBlock latex="\braket{v|v}\geq0\qquad \text{and} \qquad \braket{v|v}=0 \longleftrightarrow \ket{v}=0" />
      <p>
        Just like in the example of the dot product, the inner product of a
        vector with itself can be thought of as the squared mangitude of the
        vector. Hence why it must always be greater than or equal to 0. We
        won&apos;t define magnitude as a separate concept here since we can
        simply use <InlineMathBlock latex="\braket{v|v}" /> to represent it.
      </p>
      <p>
        So there&apos;s the 3 rules. Let&apos;s re-iterate: we won&apos;t
        actually define how to compute the dot product we&apos;ll just use these
        rules to study it.
      </p>
      <p>
        For example, one thing we can already prove is conjugate-linearity in
        the first argument. By using rules 1 and 2 we can show the following:
      </p>
      <MathBlock
        latex={[
          "\\bigl(\\sum_ia_i\\bra{v_i}\\bigr)\\ket{w}",
          "=\\bigl(\\bra{w}\\sum_ia_i\\ket{v_i}\\bigr)^*",
          "=\\bigl(\\sum_ia_i\\braket{w|v_i}\\bigr)^*",
          "=\\sum_i\\bigl(a_i\\braket{w|v_i}\\bigr)^*",
          "=\\sum_ia_i^*\\braket{w|v_i}^*",
          "=\\sum_ia_i^*\\braket{v_i|w}",
        ]}
      />
      <p>
        So this is very similar to rule 1, but when the ket distributes over
        addition of the bra, we get a conjugate of the coefficients. I&apos;ve
        glossed over some details in this proof but it will do for now.
      </p>
      <h2>Outer Product</h2>
      <p>
        Now we&apos;ve looked at the inner product, let&apos;s take a look at
        the outer product. It looks like this:{" "}
        <InlineMathBlock latex="\ket{v}\bra{w}" />. This actually gives us an
        operator. We will define what this operator actually does in the
        following way:
      </p>
      <MathBlock latex="\ket{v}\bra{w}\ket{x}\equiv\braket{w|x}\ket{v}" />
      <p>
        So, like earlier, we&apos;re not interested in defining what the outer
        product actually is, but rather how it acts on things. So when an outer
        product acts on a ket, we get the inner product of the right bra with
        that ket, multiplied as a coefficient of the left ket.
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
        This should feel very familiar with basis vectors. Just like normal
        column vectors would be defined in terms of{" "}
        <InlineMathBlock latex="x" />, <InlineMathBlock latex="y" /> and{" "}
        <InlineMathBlock latex="z" />, we can define vectors in terms of{" "}
        <InlineMathBlock latex="\ket{0}" />, <InlineMathBlock latex="\ket{1}" />
        , <InlineMathBlock latex="\ket{2}" /> etc.
      </p>
      <p>
        An arbitrary vector <InlineMathBlock latex="\ket{v}" /> in our space{" "}
        <InlineMathBlock latex="V" /> can then be defined as:
      </p>
      <MathBlock latex="\ket{v}=\sum_i{v_i\ket{i}}" />
      <p>
        So just like a vector in 3D space would have some{" "}
        <InlineMathBlock latex="x" />, <InlineMathBlock latex="y" /> and{" "}
        <InlineMathBlock latex="z" /> component, our vectors are also
        constructed from components of the basis vectors.
      </p>
      <h2>Death to matrices</h2>
      <p>
        We&apos;re finally ready to see how we can define operators on our
        vector space <InlineMathBlock latex="V" /> and do away with Matrices!
      </p>
      <p>
        There&apos;s a few ways to go about this, I think the easiest might just
        be to show an example operator and see how it works. The simplest
        operator is the identity operator, the operator that sends any vector to
        itself. Here&apos;s how it&apos;s defined:
      </p>
      <MathBlock latex="I = \sum_i\ket{i}\bra{i}" />
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
        Here are some interesting matrices in 2 dimensions and their
        corresponding operator definitions. Note that in these definitions we
        assume that <InlineMathBlock latex="\ket{0}" /> is the first basis
        vector and <InlineMathBlock latex="\ket{1}" /> is the second.
      </p>
      <MathBlock
        latex={[
          "X = \\begin{bmatrix}0 & 1 \\\\ 1 & 0 \\end{bmatrix} = \\ket{0}\\bra{1} + \\ket{1}\\bra{0}",
          "Y = \\begin{bmatrix}0 & -i \\\\ i & 0 \\end{bmatrix} = -i\\ket{0}\\bra{1} + i\\ket{1}\\bra{0}",
          "Z = \\begin{bmatrix}1 & 0 \\\\ 0 & -1 \\end{bmatrix} = \\ket{0}\\bra{0} - \\ket{1}\\bra{1}",
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
        <InlineMathBlock latex="\ket{1}" />. If you read{" "}
        <a href="/article/what-is-a-qubit">the introductory article on qubits</a>{" "}
        you will recognise this operator and how it can be used in quantum
        computation! I encourage you to have a play with the other operators and
        see what they do.
      </p>
      <p>
        As a fun extension exercise, perhaps you can think about how you would
        multiply two operators together. As a hint, just like we&apos;ve done
        previously, don&apos;t try to explicitly compute the result. Rather see
        if you can define how the result <i>should</i> operate on an arbitrary
        vector. To find <InlineMathBlock latex="AB\ket{v}" /> see what happens
        when you act with <InlineMathBlock latex="B" /> first and then with{" "}
        <InlineMathBlock latex="A" />. If you&apos;re feeling really brave see
        if you can prove the following using the definitions above. Can you find
        any more?
      </p>
      <MathBlock latex="XY=iZ" />
      <h2>Conclusion</h2>
      <p>
        Despite being mainly used in quantum mechanics, bra-ket notation
        provides a very clean abstract way for thinking about vector spaces. No
        more writing out matrices or vectors. No more getting confused by the
        multiplication ordering!
      </p>
      <p>
        We delibarately didn&apos;t mention anything quantum in this post, but
        everything here will form a solid foundation for understanding quantum
        computing/mechanics going forward.
      </p>
      <p>
        I hope you&apos;ve enjoyed this post and that it&apos;s given you a new
        perspective on linear algebra.
      </p>
      <p>I hope to write more soon!</p>
    </Article>
  );
};

export default Page;
