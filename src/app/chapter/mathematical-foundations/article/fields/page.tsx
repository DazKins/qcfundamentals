import { getArticlePageMetadata } from "@/course/courseStructure";
import Article from "@/components/article";
import InlineMathBlock from "@/components/inlineMathBlock";
import MathBlock from "@/components/mathBlock";
import Table from "@/components/table";
import Exercise from "@/components/exercise";
import ArticleImage from "@/components/articleImage";
import ArticleLink from "@/components/articleLink";

const CHAPTER_ID = "mathematical-foundations";
const ARTICLE_ID = "fields";

export const metadata = getArticlePageMetadata(CHAPTER_ID, ARTICLE_ID);

const Page = () => {
  return (
    <Article>
      <p>
        Now we&apos;ve had a gentle introduction to abstract mathematics with{" "}
        <ArticleLink chapterId="mathematical-foundations" articleId="groups">
          groups
        </ArticleLink>
        , we&apos;re ready to explore a slightly more complex structure: Fields.
      </p>
      <p>
        Just like{" "}
        <ArticleLink chapterId="mathematical-foundations" articleId="groups">
          groups
        </ArticleLink>
        , fields have a set of elements that can be combined. However, this time
        they can be combined with not one, but two operations. One operation,{" "}
        <InlineMathBlock latex="\cdot" />, behaves like multiplication and the
        other, <InlineMathBlock latex="+" />, behaves like addition.
      </p>
      <p>These two operations must obey the following properties:</p>
      <h3>Closure</h3>
      <MathBlock latex={["(a + b) \\in F", "(a \\cdot b) \\in F"]} />
      <p>
        Very simple one we already saw in{" "}
        <ArticleLink chapterId="mathematical-foundations" articleId="groups">
          groups
        </ArticleLink>
        . Combining any 2 elements from the field under any operation should
        produce another member of the field.
      </p>
      <h3>Associativity</h3>
      <MathBlock
        latex={[
          "a + (b + c) = (a + b) + c",
          "a \\cdot (b \\cdot c) = (a \\cdot b) \\cdot c",
        ]}
      />
      <p>
        Another one we&apos;ve seen already from{" "}
        <ArticleLink chapterId="mathematical-foundations" articleId="groups">
          groups
        </ArticleLink>
        . The brackets must behave the same way with both operations.
      </p>
      <h3>Identity</h3>
      <MathBlock
        latex={[
          "\\exists 0, a + 0 = 0 + a = a",
          "\\exists 1, a \\cdot 1 = 1 \\cdot a = a",
        ]}
      />
      <p>
        There must exist an additive and multiplicative identity in the field.
        The elements <InlineMathBlock latex="0" /> and{" "}
        <InlineMathBlock latex="1" /> are the additive and multiplicative
        identities, respectively. The decision to label them as{" "}
        <InlineMathBlock latex="0" /> and <InlineMathBlock latex="1" /> is
        arbitrary, but it is a common convention.
      </p>
      <h3>Inverse</h3>
      <MathBlock
        latex={[
          "\\exists (-a), a + (-a) = (-a) + a = 0",
          "\\exists a^{-1}, a \\neq 0, a \\cdot a^{-1} = a^{-1} \\cdot a = 1",
        ]}
      />
      <p>
        Every element must have both an additive and multiplicative inverse. The
        elements <InlineMathBlock latex="-a" /> and{" "}
        <InlineMathBlock latex="a^{-1}" /> are the additive and multiplicative
        inverses, respectively. Again the decision to label them as such is
        arbitrary, but a common convention.
      </p>
      <p>
        Note the special case defined here for multiplication. The additive
        inverse doesn&apos;t need to have a multiplicative inverse. This makes
        sense becase there&apos;s nothing we can multiply by 0 to get 1.
      </p>
      <h3>Commutativity</h3>
      <MathBlock latex={["a + b = b + a", "a \\cdot b = b \\cdot a"]} />
      <p>
        We should get the same result from either operation even when we swap
        the order of the elements.
      </p>
      <p>
        Remeber that this wasn&apos;t a strict requirement for{" "}
        <ArticleLink chapterId="mathematical-foundations" articleId="groups">
          groups
        </ArticleLink>
        , but it will be in fields.
      </p>
      <h3>Distributivity</h3>
      <MathBlock latex={["a \\cdot (b + c) = (a \\cdot b) + (a \\cdot c)"]} />
      <p>
        This is a completely new rule that we didn&apos;t have with{" "}
        <ArticleLink chapterId="mathematical-foundations" articleId="groups">
          groups
        </ArticleLink>
        . This tells us how the 2 operations interact when used together.
      </p>
      <br />
      <p>
        Now we&apos;ve defined our rules. Let&apos;s take a look at an example
        of a field!
      </p>
      <h2>
        Integers modulo 3 <InlineMathBlock latex="\mathbb{Z}_3" />
      </h2>
      <p>
        This is like the set of integers, but with a twist. We only care about
        the remainders when divided by 3. So, we have the following elements:
      </p>
      <MathBlock latex="\mathbb{Z}_3 = \{0, 1, 2\}" />
      <p>
        We can think about this as counting on a clock with 3 hours, starting
        from 0:
      </p>
      <ArticleImage src="mod-3" alt="" />
      <p>
        Say we want to check what <InlineMathBlock latex="2 + 2" /> is.
        Normally,
        <InlineMathBlock latex="2 + 2 = 4" />, but we don&apos;t have 4 in our
        set of elements. So we&apos;ll need another way to think about addition.
      </p>
      <p>
        With normal addition, to calculate <InlineMathBlock latex="2 + 2" />,
        we&apos;d point to the number <InlineMathBlock latex="2" /> on the
        number line and then move 2 places further along. Let&apos;s do that but
        using our clock:
      </p>
      <ArticleImage src="mod-3-2+2" alt="" />
      <p>
        So in our field, <InlineMathBlock latex="2 + 2 = 1" />! Earlier we said
        the elements of our field were the integers remainder when divided by 3,
        so this result makes sense since 4 divided by 3 gives a remainder of 1.
        This gives us another way to calculate results here. Instead of using
        the clock, we can just do the calculation on the normal number line and
        then take the remainder of the result when divided by 3.
      </p>
      <p>
        And multiplication just behaves as we would expect. Let&apos;s draw out
        the addition and multiplication tables:
      </p>
      <div className="flex justify-center">
        <div className="flex gap-8 overflow-x-auto">
          <div>
            <Table
              data={[
                [
                  <InlineMathBlock key="00" latex="+" />,
                  <InlineMathBlock key="01" latex="0" />,
                  <InlineMathBlock key="02" latex="1" />,
                  <InlineMathBlock key="03" latex="2" />,
                ],
                [
                  <InlineMathBlock key="10" latex="0" />,
                  <InlineMathBlock key="11" latex="0" />,
                  <InlineMathBlock key="12" latex="1" />,
                  <InlineMathBlock key="13" latex="2" />,
                ],
                [
                  <InlineMathBlock key="20" latex="1" />,
                  <InlineMathBlock key="21" latex="1" />,
                  <InlineMathBlock key="22" latex="2" />,
                  <InlineMathBlock key="23" latex="0" />,
                ],
                [
                  <InlineMathBlock key="30" latex="2" />,
                  <InlineMathBlock key="31" latex="2" />,
                  <InlineMathBlock key="32" latex="0" />,
                  <InlineMathBlock key="33" latex="1" />,
                ],
              ]}
              headerColumn
              headerRow
            />
          </div>
          <div>
            <Table
              data={[
                [
                  <InlineMathBlock key="00" latex="\cdot" />,
                  <InlineMathBlock key="01" latex="0" />,
                  <InlineMathBlock key="02" latex="1" />,
                  <InlineMathBlock key="03" latex="2" />,
                ],
                [
                  <InlineMathBlock key="10" latex="0" />,
                  <InlineMathBlock key="11" latex="0" />,
                  <InlineMathBlock key="12" latex="0" />,
                  <InlineMathBlock key="13" latex="0" />,
                ],
                [
                  <InlineMathBlock key="20" latex="1" />,
                  <InlineMathBlock key="21" latex="0" />,
                  <InlineMathBlock key="22" latex="1" />,
                  <InlineMathBlock key="23" latex="2" />,
                ],
                [
                  <InlineMathBlock key="30" latex="2" />,
                  <InlineMathBlock key="31" latex="0" />,
                  <InlineMathBlock key="32" latex="2" />,
                  <InlineMathBlock key="33" latex="1" />,
                ],
              ]}
              headerColumn
              headerRow
            />
          </div>
        </div>
      </div>
      <p>So does this satisfy our rules? Let&apos;s check!</p>
      <ul className="list-inside">
        <li>
          Closure
          <ul className="list-inside ps-10">
            <li>
              We can see every cell of each table is also an element of the
              field so this is clearly true.
            </li>
          </ul>
        </li>
        <li>
          Associativity
          <ul className="list-inside ps-10">
            <li>
              This one&apos;s not hard to prove, but it takes a lot of work
              since we&apos;d need to check every combination. Here&apos;s one
              example:{" "}
              <InlineMathBlock latex="2 \cdot (1 \cdot 0) = 2 \cdot 0 = (2 \cdot 1) \cdot 0" />
            </li>
          </ul>
        </li>
        <li>
          Identity
          <ul className="list-inside ps-10">
            <li>
              From the addition table we can see that{" "}
              <InlineMathBlock latex="0" /> is the additive identity and from
              the multiplication table we can see that{" "}
              <InlineMathBlock latex="1" /> is the multiplicative identity. This
              is because they both have the property that when combined with any
              other element, they don&apos;t change the element.
            </li>
          </ul>
        </li>
        <li>
          Inverse
          <ul className="list-inside ps-10">
            <li>
              We now know the additive identity is <InlineMathBlock latex="0" />
              , so for each element we need to find another element that when
              added to it gives <InlineMathBlock latex="0" />. We can easily see
              this in our table <InlineMathBlock latex="1 + 2 = 0" /> which
              means 1 and 2 are eachother&apos;s inverse respectively.
            </li>
            <li>
              For multiplication, we know the identity is{" "}
              <InlineMathBlock latex="1" /> and we can see that
              <InlineMathBlock latex="1 \cdot 1 = 1" /> and{" "}
              <InlineMathBlock latex="2 \cdot 2 = 1" /> so 1 and 2 are each
              their own multiplicative inverse.
            </li>
          </ul>
        </li>
        <li>
          Commutativity
          <ul className="list-inside ps-10">
            <li>
              There&apos;s a very nice visual way we can prove this. If we draw
              out a line from the top left of the table to the bottom right, you
              will notice that the table is symmetrical along this line. This
              means that the order of the elements doesn&apos;t matter.
            </li>
          </ul>
        </li>
        <li>
          Distributivity
          <ul className="list-inside ps-10">
            <li>
              Like associativity, this one is a bit of a pain to prove.
              We&apos;d need to check every combination. Here&apos;s one
              example:{" "}
              <InlineMathBlock latex="2 \cdot (1 + 0) = 2 \cdot 1 = (2 \cdot 1) + 0 = (2 \cdot 1) + (2 \cdot 0)" />
            </li>
          </ul>
        </li>
      </ul>
      <p>
        So we&apos;ve proved that <InlineMathBlock latex="\mathbb{Z}_3" /> is a
        valid field!
      </p>
      <p>
        Although we have only a few rules on fields, there are actually many
        interesting properties that we can prove from these rules. We&apos;ll do
        one example here to give a flavour and then leave some more to the
        exercises.
      </p>
      <p>
        One of the things we know from basic maths is that if{" "}
        <InlineMathBlock latex="a \cdot b = 0" /> then either{" "}
        <InlineMathBlock latex="a = 0" /> or <InlineMathBlock latex="b = 0" />.
        Here&apos;s how we can prove this using the rules above:
      </p>
      <p>
        We&apos;ll do a proof by contradiction. We&apos;ll assume the opposite
        is true and then show that it implies a contradiction. So we&apos;ll
        assume <InlineMathBlock latex="a \neq 0" /> and{" "}
        <InlineMathBlock latex="b \neq 0" />. Then we have:
      </p>
      <MathBlock
        latex={[
          "a \\cdot b = 0",
          "(a \\cdot b) + a = 0 + a",
          "(a \\cdot b) + (a \\cdot 1) = a",
          "a \\cdot (b + 1) = a",
        ]}
      />
      <p>
        Since <InlineMathBlock latex="a \neq 0" /> we know it must have a
        multiplicative inverse so we can multiply both sides by it to get:
      </p>
      <MathBlock
        latex={[
          "a^{-1} \\cdot (a \\cdot (b + 1)) = a^{-1} \\cdot a",
          "(a^{-1} \\cdot a) \\cdot (b + 1) = 1",
          "1 \\cdot (b + 1) = 1",
          "b + 1 = 1",
          "(b + 1) + (-1) = 1 + (-1)",
          "b + (1 + (-1)) = 0",
          "b + 0 = 0",
          "b = 0",
        ]}
      />
      <p>
        This violates our assumption! An equivalent argument could be made for{" "}
        <InlineMathBlock latex="a" />. So we have proved our statement!
      </p>
      <p>
        Move on to the exercises to see if you can prove some more interesting
        facts!
      </p>
      <h2>Exercises</h2>
      <h3>Exercise 1</h3>
      <Exercise
        problem={
          <>
            <p>
              Prove that <InlineMathBlock latex="0 \cdot a = 0" />
            </p>
            <p>
              Seems fairly obvious in normal math, but requires careful proof
              when we&apos;re dealing with more abstract objects.
            </p>
          </>
        }
        solution={
          <>
            <p>From the definition of distributivity:</p>
            <MathBlock
              latex={[
                "a \\cdot (a + 0) = a \\cdot a + a \\cdot 0",
                "a \\cdot a = a \\cdot a + a \\cdot 0",
              ]}
            />
            <p>
              We know from the rules that this{" "}
              <InlineMathBlock latex="a \cdot a" /> value, whatever it is, must
              have an additive inverse. Let&apos;s call this term{" "}
              <InlineMathBlock latex="b" />. So{" "}
              <InlineMathBlock latex="b + (a \cdot a) = 0" />. We can then
              continue our proof using this value:
            </p>
            <MathBlock
              latex={[
                "b + a \\cdot a = b + a \\cdot a + a \\cdot 0",
                "0 = 0 + a \\cdot 0",
                "0 = a \\cdot 0",
              ]}
            />
            <p>And our proof is done.</p>
            <p>
              If you think about it, this is quite surprising. We never defined
              any rules for multiplication of <InlineMathBlock latex="0" /> (the
              additive identity) but it just so happens that it sends all values
              to <InlineMathBlock latex="0" /> when multiplied.
            </p>
          </>
        }
      />
      <h3>Exercise 2</h3>
      <Exercise
        problem={
          <>
            <p>
              Prove that <InlineMathBlock latex="(-1) \cdot a = -a" />.
            </p>
            <p>
              Note here the usage of the term <InlineMathBlock latex="-1" />.
              Fields are abstract so don&apos;t have to represent numbers. What
              we&apos;re actually describing here is the additive inverse of the
              multiplicative identity. The notation{" "}
              <InlineMathBlock latex="-1" /> is just for convenience.
            </p>
          </>
        }
        solution={
          <>
            <p>
              We know that <InlineMathBlock latex="-a" /> is the additive
              inverse of <InlineMathBlock latex="a" />. That is{" "}
              <InlineMathBlock latex="a + (-a) = (-a) + a = 0" />.
            </p>
            <p>
              So in order to prove <InlineMathBlock latex="(-1) \cdot a = -a" />{" "}
              we need to show that when adding this term to{" "}
              <InlineMathBlock latex="a" /> you get
              <InlineMathBlock latex="0" />.
            </p>
            <MathBlock
              latex={[
                "a+((-1)\\cdot a)",
                "=(1 \\cdot a)+((-1)\\cdot a)",
                "=(1 + (-1))\\cdot a",
                "=0\\cdot a",
                "=0",
              ]}
            />
          </>
        }
      />
      <h3>Exercise 3</h3>
      <Exercise
        problem={
          <>
            <p>
              Prove that, for our <InlineMathBlock latex="\mathbb{Z}_3" />{" "}
              field, that following holds:{" "}
              <InlineMathBlock latex="(a+b)^3 = a^3 + b^3" /> where we define{" "}
              <InlineMathBlock latex="x^3 = x \cdot x \cdot x" />. Note here
              I&apos;m leaving out the brackets for simplicity.
            </p>
            <p>
              There are 2 ways to prove this. You can check every possible
              combination, or you can use the rules we defined. See if you can
              find both proofs.
            </p>
          </>
        }
        solution={
          <>
            <p>
              I won&apos;t detail the cases proof here since it&apos;s fairly
              trivial to check each combination.
            </p>
            <p>
              To prove symbolically, we&apos;ll start by proving a separate
              property that will be useful later:
            </p>
            <MathBlock
              latex={["0 + 0 + 0 = 0", "1 + 1 + 1 = 0", "2 + 2 + 2 = 0"]}
            />
            <p>
              This shows us that adding 3 of any element together gives us 0.
            </p>
            <p>With this in mind:</p>
            <MathBlock
              latex={[
                "(a+b)^3",
                "=(a+b)\\cdot(a+b)\\cdot(a+b)",
                "=(a+b)\\cdot((a+b)\\cdot a + (a+b)\\cdot b)",
                "=(a+b)\\cdot(a\\cdot a+b\\cdot a + a\\cdot b+b\\cdot b)",
                "=a\\cdot a\\cdot a + a\\cdot b\\cdot a + a\\cdot a\\cdot b + a\\cdot b\\cdot b + ",
                "b\\cdot a\\cdot a+b\\cdot b\\cdot a+b\\cdot a\\cdot b+b\\cdot b\\cdot b",
              ]}
            />
            <p>
              Ok, lots of terms! But we can apply commutativity to the terms in
              the middle to show we have 3{" "}
              <InlineMathBlock latex="a \cdot a \cdot b" /> terms and 3{" "}
              <InlineMathBlock latex="a \cdot b \cdot b" /> terms. But as we
              proved earlier, if we add a single term 3 times we get 0. So we
              are left with:
            </p>
            <MathBlock
              latex={[
                "=a\\cdot a\\cdot a + 0 + 0 + b\\cdot b\\cdot b",
                "=a\\cdot a\\cdot a + b\\cdot b\\cdot b",
                "=a^3 + b^3",
              ]}
            />
            <p>And the proof is done.</p>
            <p>
              Ok, but that seemed a lot harder than just checking cases, so why
              did we do it? Well it turns out that this actually generalises. If
              we have a field <InlineMathBlock latex="\mathbb{Z}_p" /> where{" "}
              <InlineMathBlock latex="p" /> is a prime number, we have{" "}
              <InlineMathBlock latex="(a + b)^p = a^p + b^p" />.
            </p>
            <p>
              Proving this general case requires a bit more work, but hopefully
              proving this specific case gave you a flavour of how it could be
              done.
            </p>
          </>
        }
      />
    </Article>
  );
};

export default Page;
