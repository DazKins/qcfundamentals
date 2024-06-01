import Article from "@/components/article";
import Exercise from "@/components/exercise";
import InlineMathBlock from "@/components/inlineMathBlock";
import MathBlock from "@/components/mathBlock";
import { getArticlePageMetadata } from "@/course/courseStructure";

const CHAPTER_NUMBER = "mathematical-foundations";
const ARTICLE_ID = "vector-spaces";

export const metadata = getArticlePageMetadata(CHAPTER_NUMBER, ARTICLE_ID);

const Page = () => {
  return (
    <Article>
      <p>The next stop on our tour of abstract mathematics is vector spaces.</p>
      <p>
        You may have heard of or used &quot;vectors&quot; before and, if so,
        your intuition will definitely be helpful here. However, just as before,
        we&apos;re going to be looking at things in a more abstract way.
      </p>
      <p>
        A vector space is defined together with a field. We say formally that a
        vector space over a field <InlineMathBlock latex="F" /> is a set{" "}
        <InlineMathBlock latex="V" />. The elements of{" "}
        <InlineMathBlock latex="F" />
        we will call scalars and the elements of <InlineMathBlock latex="V" />{" "}
        we will call vectors. In the mathematical notation, vectors will be
        represented as bold lowercase letters (e.g.{" "}
        <InlineMathBlock latex="\mathbf{u}, \mathbf{v}, \mathbf{w} \in V" />)
        and scalars will be represented as italic lowercase letters e.g.{" "}
        <InlineMathBlock latex="a, b, c \in F" />.
      </p>
      <p>
        We have two operations that we can perform on the elements of our vector
        space. The first is vector addition (<InlineMathBlock latex="+" />
        ), which takes two vectors and returns another vector. The second is
        scalar multiplication, which takes a scalar and a vector and returns
        another vector. We won&apos;t use a specific symbol for scalar
        multiplication, but will write it as the scalar on the left-hand-side of
        the vector: <InlineMathBlock latex="a\mathbf{v}" />.
      </p>
      <p>
        Once more, we&apos;re going to have a bunch of rules for how these
        operations work. They&apos;re not particularly difficult and have many
        similarities to the previous rules we&apos;ve seen for groups and
        fields.
      </p>
      <h3>Associativity</h3>
      <MathBlock latex="\mathbf{u} + (\mathbf{v} + \mathbf{w}) = (\mathbf{u} + \mathbf{v}) + \mathbf{w}" />
      <h3>Commutativity</h3>
      <MathBlock latex="\mathbf{u} + \mathbf{v} = \mathbf{v} + \mathbf{u}" />
      <h3>Identity</h3>
      <MathBlock latex="\exists 0, \mathbf{v} + \mathbf{0} = \mathbf{0} + \mathbf{v} = \mathbf{v}" />
      <h3>Inverse</h3>
      <MathBlock latex="\exists {-\mathbf{v}}, \mathbf{v} + (-\mathbf{v}) = (-\mathbf{v}) + \mathbf{v} = \mathbf{0}" />
      <h3>Scalar Multiplication</h3>
      <MathBlock latex="a(b\mathbf{v}) = (a \cdot b)\mathbf{v}" />
      <p>
        This is the first rule that requires us to use something from the field{" "}
        <InlineMathBlock latex="F" />. It tells us that scalar multiplication
        use the multiplication operation from the field.
      </p>
      <h3>Scalar Multiplication Identity</h3>
      <MathBlock latex="1\mathbf{v} = \mathbf{v}" />
      <p>
        This rule tells us that multiplying a vector by the multiplicative
        identity of the field leaves the vector unchanged. Note that we
        didn&apos;t have to write <InlineMathBlock latex="\exists 1" /> because
        the existince of this multiplicative identity already comes from the
        field.
      </p>
      <h3>Distributivity Over Vector Addition</h3>
      <MathBlock latex="a(\mathbf{u} + \mathbf{v}) = a\mathbf{u} + a\mathbf{v}" />
      <h3>Distributivity Over Scalar Addition</h3>
      <MathBlock latex="(a + b)\mathbf{v} = a\mathbf{v} + b\mathbf{v}" />
      <p>
        This rule shows us how the addition operation from the field{" "}
        <InlineMathBlock latex="F" /> behaves with the vector addition
        operation.
      </p>
      <br />
      <p>
        Great, so we&apos;ve got some slightly different objects and operations
        that behave a bit differently from what we&apos;ve seen before, but
        fundamentally, this is very similar with groups/fields.
      </p>
      <p>
        Again we can use our rules to prove some basic properties. For example,
        just like we did with fields:
      </p>
      <MathBlock
        latex={[
          "a(\\mathbf{v} + \\mathbf{0}) = a\\mathbf{v} + a\\mathbf{0}",
          "a\\mathbf{v} = a\\mathbf{v} + a\\mathbf{0}",
          "-(a\\mathbf{v}) + a\\mathbf{v} = -(a\\mathbf{v}) + a\\mathbf{v} + a\\mathbf{0}",
          "\\mathbf{0} = \\mathbf{0} + a\\mathbf{0}",
          "\\mathbf{0} =  a\\mathbf{0}",
        ]}
      />
      <h2>Euclidian Vectors</h2>
      <p>
        The most common example of a vector space is the set of Euclidean
        vectors that you&apos;re probably familiar with. In this case, the field
        is the real numbers <InlineMathBlock latex="\mathbb{R}" /> and the
        vectors are the points in space represented by a column of real numbers.
        For example:
      </p>
      <MathBlock latex="\begin{bmatrix} x \\ y \end{bmatrix}" />
      <p>
        We will define our vector addition and scalar multiplication as follows:
      </p>
      <MathBlock
        latex={[
          "\\begin{bmatrix} x \\\\ y \\end{bmatrix} + \\begin{bmatrix} u \\\\ v \\end{bmatrix} = \\begin{bmatrix} x + u \\\\ y + v \\end{bmatrix}",
          "a\\begin{bmatrix} x \\\\ y \\end{bmatrix} = \\begin{bmatrix} a \\cdot x \\\\ a \\cdot y \\end{bmatrix}",
        ]}
      />
      <p>We can then identify the zero vector and the additive inverse:</p>
      <MathBlock
        latex={[
          "\\mathbf{0} = \\begin{bmatrix} 0 \\\\ 0 \\end{bmatrix}",
          "\\begin{bmatrix} x \\\\ y \\end{bmatrix} + \\begin{bmatrix} -x \\\\ -y \\end{bmatrix} = \\mathbf{0}",
        ]}
      />
      <p>
        We can see that this will fit the rules we defined above since vector
        addition boils down to real number addition which is by definition
        associative and commutative. The same is true for scalar multiplication
        since that involves real number multiplication.
      </p>
      <h2>Basis</h2>
      <p>
        Given our vector space <InlineMathBlock latex="V" />, we can select out
        any number of vectors and form a <strong>linear combination</strong> of
        them. A linear combination is a sum of scalar multiples of vectors. For
        example, given vectors{" "}
        <InlineMathBlock latex="\mathbf{v}_1, \mathbf{v}_2, \ldots, \mathbf{v}_n" />
        , a linear combination of these vectors is:
      </p>
      <MathBlock latex="a_1\mathbf{v}_1 + a_2\mathbf{v}_2 + \ldots + a_n\mathbf{v}_n" />
      <p>
        Another concept we&apos;ll introduce here is linear independence. Two
        vectors
        <InlineMathBlock latex="\mathbf{v}_1" />,{" "}
        <InlineMathBlock latex="\mathbf{v}_2" /> are linearly independent if one
        cannot be written as a scalar multiple of the other. In other words, if
        <InlineMathBlock latex="\mathbf{v}_1 = a\mathbf{v}_2" /> for some value
        of <InlineMathBlock latex="a" />, then the vectors are{" "}
        <strong>not</strong> linearly independent. Or in other words, they{" "}
        <strong>are</strong> linearly dependent.
      </p>
      <p>
        We will be especially interested in sets of linearly independent
        vectors. They are sets where any vector from the set cannot be written
        as a linear combination of the others. More formally:
      </p>
      <MathBlock latex="\forall i, \mathbf{v}_i \neq \sum_{j \neq i} a_j\mathbf{v}_j" />
      <p>
        for any given set of scalars <InlineMathBlock latex="a_j" />.
      </p>
      <p>
        Once we have a set of linearly independent vectors. If they span the
        entire vector space, then we say that they form a basis.
        &quot;Span&quot; here means that any vector from the vector space{" "}
        <InlineMathBlock latex="\mathbf{v} \in V" /> can be written as a linear
        combination of the vectors from our set. For example if our set of basis
        vectors is
        <InlineMathBlock latex="\mathbf{v}_1, \mathbf{v}_2, \ldots, \mathbf{v}_n" />{" "}
        then:
      </p>
      <MathBlock latex="\mathbf{v} = a_1\mathbf{v}_1 + a_2\mathbf{v}_2 + \ldots + a_n\mathbf{v}_n" />
      <p>
        for some scalars <InlineMathBlock latex="a_i" />.
      </p>
      <p>
        Quite surprisingly, with these two conditions on our basis (linear
        independence and spanning) we will always get the same number of basis
        vectors for any given vector space. This number is called the dimension
        of the vector space.
      </p>
      <p>
        In our example of Euclidean vectors from earlier, one set of basis
        vectors could be:
      </p>
      <MathBlock latex="\mathbf{v_1} = \begin{bmatrix} 1 \\ 0 \end{bmatrix}, \mathbf{v_2} = \begin{bmatrix} 0 \\ 1 \end{bmatrix}" />
      <p>
        It is quite clear that these two vectors are linearly independent since
        any scalar multiple of
        <InlineMathBlock latex="\mathbf{v_1}" /> will always leave the bottom
        number in the column as 0 and any scalar multiple of{" "}
        <InlineMathBlock latex="\mathbf{v_2}" /> will always leave the top
        number in the column as 0:
      </p>
      <MathBlock
        latex={[
          "a\\begin{bmatrix} 1 \\\\ 0 \\end{bmatrix} = \\begin{bmatrix} a \\\\ 0 \\end{bmatrix}",
          "b\\begin{bmatrix} 0 \\\\ 1 \\end{bmatrix} = \\begin{bmatrix} 0 \\\\ b \\end{bmatrix}",
        ]}
      />
      <p>
        so we could never represent <InlineMathBlock latex="\mathbf{v_1}" /> in
        terms of <InlineMathBlock latex="\mathbf{v_2}" />
      </p>
      <p>
        It is also clear that these two vectors span the vector space since any
        vector can be written as a linear combination like this:
      </p>
      <MathBlock latex="\begin{bmatrix} a \\ b \end{bmatrix} = a\mathbf{v_1} + b\mathbf{v_2}" />
      <p>
        Since we have two basis vectors, this tells us that the dimension of our
        vector space is 2. We also mentioned earlier that any valid basis will
        always have the same number of vectors. Take a second to convince
        yourself of this fact. Try adding an extra vector to our basis and see
        if it still satisfies the conditions of linear independence.
      </p>
      <p>
        Note that, although the number of vectors in our basis is always
        constant, the vectors themselves can be different. For example, here is
        alternate basis we could have chosen:
      </p>
      <MathBlock latex="\mathbf{v_1} = \begin{bmatrix} 1 \\ 1 \end{bmatrix}, \mathbf{v_2} = \begin{bmatrix} 1 \\ -1 \end{bmatrix}" />
      <p>
        We can see these vectors are linearly independant as the values in the
        column have a different sign in <InlineMathBlock latex="\mathbf{v_2}" />{" "}
        and the same sign in <InlineMathBlock latex="\mathbf{v_1}" />.
      </p>
      <p>We can also see that they are spanning:</p>
      <MathBlock latex="\begin{bmatrix} a \\ b \end{bmatrix} = \frac{1}{2}(a+b)\mathbf{v_1} + \frac{1}{2}(a-b)\mathbf{v_2}" />
      <p>This is because:</p>
      <MathBlock
        latex={[
          "\\frac{1}{2}(a+b)\\mathbf{v_1} + \\frac{1}{2}(a-b)\\mathbf{v_2} = \\frac{1}{2}(a+b)\\begin{bmatrix} 1 \\\\ 1 \\end{bmatrix} + \\frac{1}{2}(a-b)\\begin{bmatrix} 1 \\\\ -1 \\end{bmatrix}",
          "= \\frac{1}{2}\\Bigl( \\begin{bmatrix} a+b \\\\ a+b \\end{bmatrix} + \\begin{bmatrix} a-b \\\\ b-a \\end{bmatrix} \\Bigr)",
          "= \\frac{1}{2}\\begin{bmatrix} a+b+a-b \\\\ a+b+b-a \\end{bmatrix}",
          "= \\frac{1}{2}\\begin{bmatrix} 2a \\\\ 2b \\end{bmatrix}",
          "= \\begin{bmatrix} a \\\\ b \\end{bmatrix}",
        ]}
      />
      <br />
      <p>
        This concludes our study of vector spaces for now. This is the first
        point in this chapter that we&apos;ve touched on a concept that we will
        directly use in quantum computing. We&apos;ll be using vectors to
        represent the states of our quantum bits. But in order to perform
        interesting operations on these quantum bits, we&apos;ll need the
        language of linear algebra. More on that in the next article!
      </p>
      <h2>Exercises</h2>
      <h3>Exercise 1</h3>
      <Exercise
        problem={
          <>
            <p>
              A matrix is similar to a column vector except instead of having a
              single column of numbers, it has multiple columns forming a
              square. For example in the case when we have 2 rows and 2 columns:
            </p>
            <MathBlock latex="\begin{bmatrix} a & b \\ c & d \end{bmatrix}" />
            <p>
              Prove that this set of 2x2 matrices, where the values are real,
              when coupled with real coefficients, forms a vector space.
            </p>
            <p>
              In order to do this you will first have to define what vector
              addition and scalar multiplication means. i.e. what it means to
              add 2 matrices together and multiply a matrix by a scalar.
            </p>
            <p>
              Once these definitions have been made, you will have to prove that
              your operations fulfill the rules stated above.
            </p>
          </>
        }
        solution={
          <>
            <p>We will define matrix addition as:</p>
            <MathBlock latex="\begin{bmatrix} a & b \\ c & d \end{bmatrix} + \begin{bmatrix} e & f \\ g & h \end{bmatrix} = \begin{bmatrix} a + e & b + f \\ c + g & d + h \end{bmatrix}" />
            <p>and scalar multiplication as:</p>
            <MathBlock latex="x\begin{bmatrix} a & b \\ c & d \end{bmatrix} = \begin{bmatrix} x \cdot a & x \cdot b \\ x \cdot c & x \cdot d \end{bmatrix}" />
            <p>And now we need to prove each rule:</p>
            <h3>Associativity</h3>
            <MathBlock
              latex={[
                "\\begin{bmatrix} a & b \\\\ c & d \\end{bmatrix} + \\Bigl(\\begin{bmatrix} e & f \\\\ g & h \\end{bmatrix} + \\begin{bmatrix} i & j \\\\ k & l \\end{bmatrix}\\Bigr)",
                "= \\begin{bmatrix} a & b \\\\ c & d \\end{bmatrix} +\\begin{bmatrix} e + i & f + j \\\\ g + k & h + l \\end{bmatrix}",
                "= \\begin{bmatrix} a + (e + i) & b + (f + j) \\\\ c + (g + k) & d + (h + l) \\end{bmatrix}",
                "= \\begin{bmatrix} (a + e) + i & (b + f) + j \\\\ (c + g) + k & (d + h) + l \\end{bmatrix}",
                "= \\begin{bmatrix} a + e & b + f \\\\ c + g & d + h \\end{bmatrix} + \\begin{bmatrix} i & j \\\\ k & l \\end{bmatrix}",
                "= \\Bigl(\\begin{bmatrix} a & b \\\\ c & d \\end{bmatrix} + \\begin{bmatrix} e & f \\\\ g & h \\end{bmatrix} \\Bigr) + \\begin{bmatrix} i & j \\\\ k & l \\end{bmatrix}",
              ]}
            />
            <h3>Commutativity</h3>
            <MathBlock
              latex={[
                "\\begin{bmatrix} a & b \\\\ c & d \\end{bmatrix} + \\begin{bmatrix} e & f \\\\ g & h \\end{bmatrix}",
                "= \\begin{bmatrix} a + e & b + f \\\\ c + g & d + h \\end{bmatrix}",
                "= \\begin{bmatrix} e + a & f + b \\\\ g + c & h + d \\end{bmatrix}",
                "= \\begin{bmatrix} e & f \\\\ g & h \\end{bmatrix} + \\begin{bmatrix} a & b \\\\ c & d \\end{bmatrix}",
              ]}
            />
            <h3>Identity</h3>
            <p>We will define our identity as:</p>
            <MathBlock latex="\mathbf{0} = \begin{bmatrix} 0 & 0 \\ 0 & 0 \end{bmatrix}" />
            <p>so we have:</p>
            <MathBlock
              latex={[
                "\\begin{bmatrix} a & b \\\\ c & d \\end{bmatrix} + \\begin{bmatrix} 0 & 0 \\\\ 0 & 0 \\end{bmatrix}",
                "= \\begin{bmatrix} a + 0 & b + 0 \\\\ c + 0 & d + 0 \\end{bmatrix}",
                "= \\begin{bmatrix} a & b \\\\ c & d \\end{bmatrix}",
              ]}
            />
            <h3>Inverse</h3>
            <p>We will define our inverse as:</p>
            <MathBlock latex="\textmd{if } \mathbf{v} = \begin{bmatrix} a & b \\ c & d \end{bmatrix} \textmd{ then } {-\mathbf{v}} = \begin{bmatrix} -a & -b \\ -c & -d \end{bmatrix}" />
            <p>so we have:</p>
            <MathBlock
              latex={[
                " \\mathbf{v} +  {-\\mathbf{v}} = \\begin{bmatrix} a & b \\\\ c & d \\end{bmatrix} + \\begin{bmatrix} -a & -b \\\\ -c & -d \\end{bmatrix}",
                "= \\begin{bmatrix} a + -a & b + -b \\\\ c + -c & d + -d \\end{bmatrix}",
                "= \\begin{bmatrix} 0 & 0 \\\\ 0 & 0 \\end{bmatrix}",
              ]}
            />
            <h3>Scalar Multiplication</h3>
            <MathBlock
              latex={[
                "x\\Bigl(y\\begin{bmatrix} a & b \\\\ c & d \\end{bmatrix}\\Bigr)",
                "= x\\begin{bmatrix} y \\cdot a & y \\cdot b \\\\ y \\cdot c & y \\cdot d \\end{bmatrix}",
                "= \\begin{bmatrix} x \\cdot y \\cdot a & x \\cdot y \\cdot b \\\\ x \\cdot y \\cdot c & x \\cdot y \\cdot d \\end{bmatrix}",
                "=  (x \\cdot y)\\begin{bmatrix} a & b \\\\ c & d \\end{bmatrix}",
              ]}
            />
            <h3>Scalar Multiplication Identity</h3>
            <MathBlock
              latex={[
                "1\\begin{bmatrix} a & b \\\\ c & d \\end{bmatrix}",
                "= \\begin{bmatrix} 1 \\cdot a & 1 \\cdot b \\\\ 1 \\cdot c & 1 \\cdot d \\end{bmatrix}",
                "= \\begin{bmatrix} a & b \\\\ c & d \\end{bmatrix}",
              ]}
            />
            <h3>Distributivity Over Vector Addition</h3>
            <MathBlock
              latex={[
                "x\\Bigl(\\begin{bmatrix} a & b \\\\ c & d \\end{bmatrix} + \\begin{bmatrix} e & f \\\\ g & h \\end{bmatrix}\\Bigr)",
                "= x\\begin{bmatrix} a + e & b + f \\\\ c + g & d + h \\end{bmatrix}",
                "= \\begin{bmatrix} x \\cdot (a + e) & x \\cdot (b + f) \\\\ x \\cdot (c + g) & x \\cdot (d + h) \\end{bmatrix}",
                "= \\begin{bmatrix} x \\cdot a + x \\cdot e & x \\cdot b + x \\cdot f \\\\ x \\cdot c + x \\cdot g & x \\cdot d + x \\cdot h \\end{bmatrix}",
                "= \\begin{bmatrix} x \\cdot a & x \\cdot b \\\\ x \\cdot c & x \\cdot d \\end{bmatrix} + \\begin{bmatrix} x \\cdot e & x \\cdot f \\\\ x \\cdot g & x \\cdot h \\end{bmatrix}",
                "= x\\begin{bmatrix} a & b \\\\ c & d \\end{bmatrix} + x\\begin{bmatrix} e & f \\\\ g & h \\end{bmatrix}",
              ]}
            />
            <h3>Distributivity Over Scalar Addition</h3>
            <MathBlock
              latex={[
                "(x + y)\\begin{bmatrix} a & b \\\\ c & d \\end{bmatrix}",
                "= \\begin{bmatrix} (x + y) \\cdot a & (x + y) \\cdot b \\\\ (x + y) \\cdot c & (x + y) \\cdot d \\end{bmatrix}",
                "= \\begin{bmatrix} x \\cdot a + y \\cdot a & x \\cdot b + y \\cdot b \\\\ x \\cdot c + y \\cdot c & x \\cdot d + y \\cdot d \\end{bmatrix}",
                "= \\begin{bmatrix} x \\cdot a & x \\cdot b \\\\ x \\cdot c & x \\cdot d \\end{bmatrix} + \\begin{bmatrix} y \\cdot a & y \\cdot b \\\\ y \\cdot c & y \\cdot d \\end{bmatrix}",
                "= x\\begin{bmatrix} a & b \\\\ c & d \\end{bmatrix} + y\\begin{bmatrix} a & b \\\\ c & d \\end{bmatrix}",
              ]}
            />
            <p>That&apos;s all the rules proved.</p>
            <p>
              None of the proofs here were particularly difficult. Mostly took a
              bit of algebra but then boiled down to just using the underlying
              properties of the real numbers.
            </p>
          </>
        }
      />
      <h3>Exercise 2</h3>
      <Exercise
        problem={
          <>
            <p>
              For the 2x2 matrix vector space defined in the previous exercise,
              find its dimension.
            </p>
            <p>
              Remember the dimension of a vector space is the size of any set of
              linearly independant and spanning vectors.
            </p>
            <p>
              In order to answer this question you much first propose this set
              of vectors, prove they are linearly independant, prove they are
              spanning and then present the size of the set.
            </p>
          </>
        }
        solution={
          <>
            <p>We will propose the following set of vectors as a basis:</p>
            <MathBlock latex="\mathbf{v}_{11} = \begin{bmatrix} 1 & 0 \\ 0 & 0 \end{bmatrix}, \mathbf{v}_{12} = \begin{bmatrix} 0 & 1 \\ 0 & 0 \end{bmatrix}, \mathbf{v}_{21} = \begin{bmatrix} 0 & 0 \\ 1 & 0 \end{bmatrix}, \mathbf{v}_{22} = \begin{bmatrix} 0 & 0 \\ 0 & 1 \end{bmatrix}" />
            <p>
              It is clear that these are linearly independant as a linear of
              multiple of any 3 would leave a zero in the place where the 4th
              has a 1.
            </p>
            <p>
              It is also clear that they are spanning since any 2x2 matrix can
              be written as a linear combination of these 4:
            </p>
            <MathBlock latex="\begin{bmatrix} a & b \\ c & d \end{bmatrix} = a\mathbf{v}_{11} + b\mathbf{v}_{12} + c\mathbf{v}_{21} + d\mathbf{v}_{22}" />
            <p>
              The size of the set is 4, and so this vector space is of dimension
              4.
            </p>
          </>
        }
      />
      <h3>Exercise 3</h3>
      <Exercise
        problem={
          <>
            <p>
              How does the dimensionality of our matrix vector space change if
              we only allow symmetric matrices?
            </p>
            <p>
              Symmetric matrices are matrices that reflect across the diagonal.
              i.e. the top right number is the same as the bottom left number:
            </p>
            <MathBlock latex="\begin{bmatrix} a & b \\ b & c \end{bmatrix}" />
          </>
        }
        solution={
          <>
            <p>We propose the following basis:</p>
            <MathBlock latex="\mathbf{v}_{1} = \begin{bmatrix} 1 & 0 \\ 0 & 0 \end{bmatrix}, \mathbf{v}_{2} = \begin{bmatrix} 0 & 1 \\ 1 & 0 \end{bmatrix}, \mathbf{v}_{3} = \begin{bmatrix} 0 & 0 \\ 0 & 1 \end{bmatrix}" />
            <p>
              These matrices are linearly independant since a linear of multiple
              of any 2 would leave a zero in the place(s) where the 3rd has a
              1(s).
            </p>
            <p>
              They are also spanning since any symmetric 2x2 matrix can be
              written as a linear combination of these 3:
            </p>
            <MathBlock latex="\begin{bmatrix} a & b \\ b & c \end{bmatrix} = a\mathbf{v}_{1} + b\mathbf{v}_{2} + c\mathbf{v}_{3}" />
            <p>Therefore the dimensionality of this vector space is 3.</p>
          </>
        }
      />
    </Article>
  );
};

export default Page;
