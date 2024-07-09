import Article from "@/components/article";
import ArticleLink from "@/components/articleLink";
import Exercise from "@/components/exercise";
import InlineMathBlock from "@/components/inlineMathBlock";
import MathBlock from "@/components/mathBlock";
import { getArticlePageMetadata } from "@/course/courseStructure";

const CHAPTER_ID = "mathematical-foundations";
const ARTICLE_ID = "linear-algebra";

export const metadata = getArticlePageMetadata(CHAPTER_ID, ARTICLE_ID);

const Page = () => {
  return (
    <Article>
      <p>
        We&apos;ve reviewed vector spaces, but the operations available to us
        are a little too basic to be useful yet. In this article, we&apos;ll
        introduce the concept of linear algebra.
      </p>
      <p>
        In linear algebra, we&apos;ll be using the vectors introduced in the
        last article and adding some extra pieces called linear operators.
        Linear operators will be represented by capital letters like{" "}
        <InlineMathBlock latex="A" />, <InlineMathBlock latex="B" />,{" "}
        <InlineMathBlock latex="C" /> etc. Linear operators will act on vectors
        to produce new vectors. We&apos;ll notate it like this:
      </p>
      <MathBlock latex="A \mathbf{v} = \mathbf{w}" />
      <p>
        In English this says: When the linear operator{" "}
        <InlineMathBlock latex="A" /> acts on the vector{" "}
        <InlineMathBlock latex="\mathbf{v}" />, it produces the vector{" "}
        <InlineMathBlock latex="\mathbf{w}" />. Linear operators can also act
        across different vector spaces. i.e. in the example above, it might be
        the case that <InlineMathBlock latex="\mathbf{v}" /> and{" "}
        <InlineMathBlock latex="\mathbf{w}" /> are from different vector spaces.
      </p>
      <p>We define the vector spaces a linear operator acts on as:</p>
      <MathBlock latex="A: V \rightarrow W" />
      <p>
        This says: the linear operator <InlineMathBlock latex="A" /> takes in
        vectors from the vector space <InlineMathBlock latex="V" /> and produces
        vectors in the vector space <InlineMathBlock latex="W" />.
      </p>
      <p>
        It&apos;s worth at this point mentioning a word that might be on the
        mind of some readers: Matrices. If you&apos;ve studied matrices before,
        you will notice that linear operators appear to be very similar. They
        both involve operations on vectors. Matrices are one possible
        representation of linear operators. But, as we&apos;ve said before,
        we&apos;re more interested in studying abstract objects and their
        properties rather than specific representations. So, we&apos;ll be
        focusing on the abstract properties of linear operators rather than
        concrete representations.
      </p>
      <p>Linear operators only follow 2 very simple rules:</p>
      <h3>Additivity</h3>
      <MathBlock latex="A(\mathbf{v} + \mathbf{w}) = A\mathbf{v} + A\mathbf{w}" />
      <h3>Homogeneity</h3>
      <MathBlock latex="A(c\mathbf{v}) = cA\mathbf{v}" />
      <br />
      <p>
        From these simple rules, we can derive a very important property of
        linear operators. Remember from the previous article we inroduced the
        idea of a basis. One of the properties we had for a basis is that it
        must be spanning. i.e. any vector in the vector space can be written as
        a linear combination of the basis vectors.
      </p>
      <p>
        So, say we have a vector <InlineMathBlock latex="\mathbf{v}" /> in a
        vector space <InlineMathBlock latex="V" />. If we have a basis
        <InlineMathBlock latex="\mathbf{e}_1, \mathbf{e}_2, \ldots, \mathbf{e}_n" />{" "}
        in this vector space, then we can write{" "}
        <InlineMathBlock latex="\mathbf{v}" /> as
        <InlineMathBlock latex="\mathbf{v} = c_1\mathbf{e}_1 + c_2\mathbf{e}_2 + \ldots + c_n\mathbf{e}_n" />{" "}
        for some set of scalars{" "}
        <InlineMathBlock latex="c_1, c_2, \ldots, c_n" />.
      </p>
      <p>
        Now look what happens if we apply a linear operator{" "}
        <InlineMathBlock latex="A: V \rightarrow W" /> to{" "}
        <InlineMathBlock latex="\mathbf{v}" />:
      </p>
      <MathBlock
        latex={[
          "A\\mathbf{v} = A(c_1\\mathbf{e}_1 + c_2\\mathbf{e}_2 + \\ldots + c_n\\mathbf{e}_n)",
          "= A(c_1\\mathbf{e}_1) + A(c_2\\mathbf{e}_2) + \\ldots + A(c_n\\mathbf{e}_n)",
          "= c_1A\\mathbf{e}_1 + c_2A\\mathbf{e}_2 + \\ldots + c_nA\\mathbf{e}_n",
        ]}
      />
      <p>
        This shows us something very interesting: To calculate how{" "}
        <InlineMathBlock latex="A" /> acts on any vector{" "}
        <InlineMathBlock latex="\mathbf{v}" /> we only need to know how it acts
        on the basis vectors of the vector space. This is a very powerful
        property as it means, for example in a 2D vector space, we only need to
        know how <InlineMathBlock latex="A" /> acts on two basis vectors instead
        of every possible vector in the space.
      </p>
      <p>
        Let&apos;s look for example at the identity operator{" "}
        <InlineMathBlock latex="I" /> acting on a 2D vector space. The identity
        operator is essentially the &quot;do nothing&quot; operator as it takes
        every vector to itself. We define <InlineMathBlock latex="I" /> on our 2
        basis vectors as:
      </p>
      <MathBlock
        latex={[
          "I\\mathbf{e}_1 = \\mathbf{e}_1",
          "I\\mathbf{e}_2 = \\mathbf{e}_2",
        ]}
      />
      <p>
        And can therefore verify that <InlineMathBlock latex="I" /> behaves as
        we expect:
      </p>
      <MathBlock
        latex={[
          "\\mathbf{v} = c_1\\mathbf{e}_1 + c_2\\mathbf{e}_2",
          "I \\mathbf{v} = I(c_1\\mathbf{e}_1 + c_2\\mathbf{e}_2)",
          "= c_1I\\mathbf{e}_1 + c_2I\\mathbf{e}_2",
          "= c_1\\mathbf{e}_1 + c_2\\mathbf{e}_2",
          "= \\mathbf{v}",
        ]}
      />
      <p>So it works!</p>
      <h2>Inner-products</h2>
      <p>
        The next concept we&apos;ll need to introduce is an inner-product. An
        inner product is an operation that takes two vectors and produces a
        scalar. We&apos;ll denote it with a dot (
        <InlineMathBlock latex="\cdot" />) like this:
      </p>
      <MathBlock latex="\mathbf{v} \cdot \mathbf{w} = a" />
      <p>
        Note that we&apos;ve reused the <InlineMathBlock latex="\cdot" /> symbol
        that we use to multiply scalars together:{" "}
        <InlineMathBlock latex="a \cdot b" />. This is just convention and
        usually won&apos;t be confusing in context as we denote scalars and
        vectors differently.
      </p>
      <p>Here are the rules that an inner-product must follow:</p>
      <h3>Linearity in the second argument</h3>
      <MathBlock latex="\mathbf{u} \cdot (a\mathbf{v} + b\mathbf{w}) = a(\mathbf{u} \cdot \mathbf{v}) + b(\mathbf{u} \cdot \mathbf{w})" />
      <p>
        This shows us that the inner product distributes over addition and
        scalar multiplication
      </p>
      <h3>Conjugate symmetry</h3>
      <MathBlock latex="\mathbf{v} \cdot \mathbf{w} = (\mathbf{w} \cdot \mathbf{v})^*" />
      <p>
        Where <InlineMathBlock latex="^*" /> denotes the complex conjugate
        operator. Of course this is only relevant for vector spaces over the{" "}
        <ArticleLink chapterId="mathematical-foundations" articleId="fields">
          field
        </ArticleLink>{" "}
        of complex numbers. If we were working with real numbers we&apos;d have:{" "}
        <InlineMathBlock latex="\mathbf{v} \cdot \mathbf{w} = \mathbf{w} \cdot \mathbf{v}" />
      </p>
      <p>
        We specify this complex conjugate explicitly here since it will be
        useful later in the course.
      </p>
      <h3>Positive definiteness</h3>
      <MathBlock latex="\mathbf{v} \cdot \mathbf{v} \geq 0 \ \ \textmd{ and } \ \ \mathbf{v} \cdot \mathbf{v} = 0 \leftrightarrow \mathbf{v} = \mathbf{0}" />
      <p>
        This means that the inner-product of a vector with itself is always
        greater than or equal to <InlineMathBlock latex="0" /> and is only equal
        to <InlineMathBlock latex="0" /> if the vector is{" "}
        <InlineMathBlock latex="\mathbf{0}" />.
      </p>
      <p>
        Remember that <InlineMathBlock latex="0" /> is the additive identity of
        the{" "}
        <ArticleLink chapterId="mathematical-foundations" articleId="fields">
          field
        </ArticleLink>{" "}
        and <InlineMathBlock latex="\mathbf{0}" /> is the additive identity of
        the vector space.
      </p>
      <br />
      <p>
        Some of you might be aware of something called the dot product, which is
        a specific inner-product in euclidean vector spaces but, as we&apos;ve
        said before, we&apos;re more interested in the abstract properties of
        inner-products rather than any specific representations here.
      </p>
      <p>
        With this inner-product, we will now define two new concepts:
        orthogonality and normality.
      </p>
      <p>
        We say two vectors <InlineMathBlock latex="\mathbf{v}" /> and{" "}
        <InlineMathBlock latex="\mathbf{w}" /> are orthogonal if
        <InlineMathBlock latex="\mathbf{v} \cdot \mathbf{w} = 0" />.
      </p>
      <p>
        We say a single vector <InlineMathBlock latex="\mathbf{v}" /> is normal
        if <InlineMathBlock latex="\mathbf{v} \cdot \mathbf{v} = 1" />. This is
        sometimes called a unit vector.
      </p>
      <p>
        If some vectors are orthogonal and normal we will describe them as
        orthonormal.
      </p>
      <p>
        Something we will be interested in are orthonormal bases. That is, a set
        of basis vectors that are not only linearly independent and spanning,
        but also orthonormal:
      </p>
      <MathBlock
        latex={[
          "\\{\\mathbf{e}_1,\\mathbf{e}_2,\\ldots,\\mathbf{e}_n\\} \\sub V",
          "\\mathbf{e}_i \\cdot \\mathbf{e}_j = \\begin{cases} 1 \\ \\ \\textmd{ if } \\ i = j \\\\ 0  \\ \\ \\textmd{ if } \\ i \\neq j \\end{cases}",
        ]}
      />
      <p>
        Why is this useful? Well, consider taking the inner product of two
        vectors <InlineMathBlock latex="\mathbf{v}" /> and{" "}
        <InlineMathBlock latex="\mathbf{w}" />. We can represent these vectors
        in terms of the orthonormal basis vectors:{" "}
        <InlineMathBlock latex="\mathbf{v} = v_1\mathbf{e}_1 + v_2\mathbf{e}_2 + \ldots + v_n\mathbf{e}_n" />
        and{" "}
        <InlineMathBlock latex="\mathbf{w} = w_1\mathbf{e}_1 + w_2\mathbf{e}_2 + \ldots + w_n\mathbf{e}_n" />
        . Then the inner product of these 2 vectors is:
      </p>
      <MathBlock
        latex={[
          "\\mathbf{v} \\cdot \\mathbf{w} = (v_1\\mathbf{e}_1 + v_2\\mathbf{e}_2 + \\ldots + v_n\\mathbf{e}_n) \\cdot (w_1\\mathbf{e}_1 + w_2\\mathbf{e}_2 + \\ldots + w_n\\mathbf{e}_n)",
          "= v_1w_1\\mathbf{e}_1 \\cdot \\mathbf{e}_1 + v_2w_1 \\mathbf{e}_2 \\cdot \\mathbf{e}_1 + \\ldots + v_nw_1\\mathbf{e}_n \\cdot \\mathbf{e}_1 +",
          "\\ldots + v_1w_n\\mathbf{e}_1 \\cdot \\mathbf{e}_n + v_2w_n \\mathbf{e}_2 \\cdot \\mathbf{e}_n + \\ldots + v_nw_n\\mathbf{e}_n \\cdot \\mathbf{e}_n",
        ]}
      />
      <p>
        But from our definition earlier, we know that the inner product of any 2
        basis vectors is 0 unless <InlineMathBlock latex="i = j" />. So we can
        simplify it:
      </p>
      <MathBlock latex=" = v_1w_1\mathbf{e}_1 \cdot \mathbf{e}_1 + v_2w_2\mathbf{e}_2 \cdot \mathbf{e}_2 + \ldots + v_nw_n\mathbf{e}_n \cdot \mathbf{e}_n" />
      <p>
        And since our basis vectors are normal, when we take the inner product
        of them with themselves we get 1:
      </p>
      <MathBlock latex=" = v_1w_1 + v_2w_2 + \ldots + v_nw_n" />
      <p>
        So by representating our vectors in an orthonormal basis we managed to
        find a nice way to calculate it. This also shows us that no matter what
        orthonormal basis we chose, we would always get the same result which
        tells us that the inner product is independent of the basis we chose.
      </p>
      <h2>Exercises</h2>
      <h3>Exercise 1</h3>
      <Exercise
        problem={
          <>
            <p>
              Show that the inner product is conjugate linear in the first
              argument. That is:
            </p>
            <MathBlock latex="(a\mathbf{u} + b\mathbf{w}) \cdot \mathbf{v} = a^*(\mathbf{u} \cdot \mathbf{v}) + b^*(\mathbf{w} \cdot \mathbf{v})" />
          </>
        }
        solution={
          <>
            <p>We know from the rule of conjugate symmetry:</p>
            <MathBlock latex="(a\mathbf{u} + b\mathbf{w}) \cdot \mathbf{v} = (\mathbf{v} \cdot (a\mathbf{u} + b\mathbf{w}))^*" />
            <p>
              Then we can apply our normal linearity in the second argument
              rule:
            </p>
            <MathBlock
              latex={[
                "(\\mathbf{v} \\cdot (a\\mathbf{u} + b\\mathbf{w}))^* = (a(\\mathbf{v} \\cdot \\mathbf{u}) + b(\\mathbf{v} \\cdot \\mathbf{w}))^*",
                "= a^*(\\mathbf{u} \\cdot \\mathbf{v}) + b^*(\\mathbf{w} \\cdot \\mathbf{v})",
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
              In the space of 2D Euclidian vectors, prove or disprove that the
              following vectors are:
            </p>
            <ul>
              <li>Normal</li>
              <li>Orthogonal</li>
              <li>Linearly Independant</li>
              <li>Spanning</li>
            </ul>
            <MathBlock latex="\mathbf{v}_1 = \begin{bmatrix} 1 \\ 1 \end{bmatrix}, \mathbf{v}_2 = \begin{bmatrix} 2 \\ 1 \end{bmatrix}" />
            <p>
              By saying &quot;In the space of 2D Euclidian vectors&quot; here,
              you may assume the following holds:
            </p>
            <MathBlock
              latex={[
                "\\begin{bmatrix} 1 \\\\ 0 \\end{bmatrix} \\cdot \\begin{bmatrix} 1 \\\\ 0 \\end{bmatrix} = 1",
                "\\begin{bmatrix} 1 \\\\ 0 \\end{bmatrix} \\cdot \\begin{bmatrix} 0 \\\\ 1 \\end{bmatrix} = 0",
                "\\begin{bmatrix} 0 \\\\ 1 \\end{bmatrix} \\cdot \\begin{bmatrix} 0 \\\\ 1 \\end{bmatrix} = 1",
              ]}
            />
          </>
        }
        solution={
          <>
            <p>
              First we should consider what the inner product means here.
              Remember in the Euclidian vector space we can have bases:
            </p>
            <MathBlock latex="\mathbf{e}_1 = \begin{bmatrix} 1 \\ 0 \end{bmatrix}, \mathbf{e}_2 = \begin{bmatrix} 0 \\ 1 \end{bmatrix}" />
            <p>And therefore:</p>
            <MathBlock latex="\mathbf{v}_1 = \mathbf{e}_1 + \mathbf{e}_2, \mathbf{v}_2 = 2\mathbf{e}_1 + \mathbf{e}_2" />
            <p>
              Since the vectors
              <InlineMathBlock latex="\mathbf{e}_1" /> and{" "}
              <InlineMathBlock latex="\mathbf{e}_2" /> are orthonormal we can
              use the formula we found early to calculate the inner products:
            </p>
            <MathBlock
              latex={[
                "\\mathbf{v}_1 \\cdot \\mathbf{v}_2 = (1 \\cdot 2) + (1 \\cdot 1) = 3",
                "\\mathbf{v}_1 \\cdot \\mathbf{v}_1 = (1 \\cdot 1) + (1 \\cdot 1) = 2",
                "\\mathbf{v}_2 \\cdot \\mathbf{v}_2 = (2 \\cdot 2) + (1 \\cdot 1) = 5",
              ]}
            />
            <p>
              This shows us that these vectors are neither orthogonal nor
              normal.
            </p>
            <p>
              Are they linearly independent? Clear this is the case since any
              linear multiple of <InlineMathBlock latex="\mathbf{v}_1" /> will
              have both components the same but{" "}
              <InlineMathBlock latex="\mathbf{v}_2" /> will always have a second
              component double the first.
            </p>
            <p>
              Are they spanning? We can work this out by solving a linear
              equation:
            </p>
            <MathBlock
              latex={[
                "a\\mathbf{v}_1 + b\\mathbf{v}_2 = \\begin{bmatrix} x \\\\ y \\end{bmatrix}",
                "a\\begin{bmatrix} 1 \\\\ 1 \\end{bmatrix} + b\\begin{bmatrix} 2 \\\\ 1 \\end{bmatrix}= \\begin{bmatrix} x \\\\ y \\end{bmatrix}",
                "a + 2b = x, \\ \\ a + b = y",
              ]}
            />
            <p>
              The solutions to these equations are{" "}
              <InlineMathBlock latex="a=2y-x" /> and{" "}
              <InlineMathBlock latex="b=x-y" />
            </p>
            <p>
              So when we have any vector <InlineMathBlock latex="v" /> we have:
            </p>
            <MathBlock latex="\mathbf{v} = \begin{bmatrix} x \\ y \end{bmatrix} = (2y-x)\mathbf{v}_1 + (x-y)\mathbf{v}_2" />
            <p>
              I hope this exercise gives you a good idea of the differences
              between these 4 properties. Often people think linear indepence is
              the same as orthogonality but this is not the case.
            </p>
          </>
        }
      />
    </Article>
  );
};

export default Page;
