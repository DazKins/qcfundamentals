import {
  getArticlePageMetadata,
} from "@/course/courseStructure";
import Article from "@/components/article";
import InlineMathBlock from "@/components/inlineMathBlock";
import MathBlock from "@/components/mathBlock";
import Table from "@/components/table";
import Image from "next/image";

const CHAPTER_ID = "mathematical-foundations";
const ARTICLE_ID = "groups";

export const metadata = getArticlePageMetadata(CHAPTER_ID, ARTICLE_ID);

const Page = () => {
  return (
    <Article>
      <p>
        We're all familiar with the idea of adding/multiplying numbers together.
        <InlineMathBlock latex="3 + 2 = 5" />,{" "}
        <InlineMathBlock latex="3 \times 2 = 6" /> etc.
      </p>
      <p>
        Group theory concerns the study these operations in a more abstract
        setting. Instead of just numbers, we can have any kind of object and any
        kind of operation. The only requirement is that the operation satisfies
        a few properties. We'll cover these properties later, but first let's
        look at an example.
      </p>
      <h2>The Triangle Group</h2>
      <p>
        The most classic group example is the rotations and reflections of a
        triangle.
      </p>
      <p>
        If we label the vertices of our triangle <InlineMathBlock latex="a" />,{" "}
        <InlineMathBlock latex="b" /> and <InlineMathBlock latex="c" />, then
        any specific rotation or reflection of the triangle can be represented
        by a permutation of these vertices. Here's how that works:
      </p>
      <div className="w-full flex justify-center">
        <Image
          src={"/article/groups/triangle-group-rotation.png"}
          width={1000}
          height={400}
          alt=""
          className=" rounded-default overflow-hidden"
        />
      </div>
      <p>
        As you can see as we rotate the triangle we can represent its state by
        the permutation of the vertices. Rotating the triangle changes the
        permutation.
      </p>
      <p>
        We can also perform another operation on the triangle: flipping it along
        the vertical axis. We can see this operator as well with the
        permutations:
      </p>
      <div className="w-full flex justify-center">
        <Image
          src={"/article/groups/triangle-group-flip.png"}
          width={800}
          height={400}
          alt=""
          className=" rounded-default overflow-hidden"
        />
      </div>
      <p>
        Now that we've got a visual intuition let's formalise this in
        mathematical terms.
      </p>
      <p>
        We'll create a group out of this by considering how these operations
        combine. We'll call our group <InlineMathBlock latex="G" /> and the
        elements of the group will be all the operations we can perform on the
        triangle. There are 3 different operations we can perform: a 120 degree
        rotation, a 240 degree rotation and a flip. We'll represent these as{" "}
        <InlineMathBlock latex="r_1" />, <InlineMathBlock latex="r_2" />,{" "}
        <InlineMathBlock latex="f" /> respectively. In fact, we'll add a 4th
        operation here as well: doing nothing. We'll call this the identity
        operation and represent it as <InlineMathBlock latex="e" />.
      </p>
      <p>
        The last thing to cover is how these operations combine. We'll use the
        symbol <InlineMathBlock latex="\circ" /> to combine our operations. And
        now we're ready to do some math!
      </p>
      <p>
        It's quite clear that <InlineMathBlock latex="r_1 \circ e = e" />,{" "}
        <InlineMathBlock latex="f \circ e = e" /> since doing nothing (the
        identity operation <InlineMathBlock latex="e" />) after any operation
        will be the same as just doing the operation. We can see some more
        interesting properties as well. For example{" "}
        <InlineMathBlock latex="r_1 \circ r_2 = e" />. If we do a 120 degree
        rotation followed by a 240 degree rotation we end up back where we
        started. This is the same as doing nothing.
      </p>
      <p>
        We can create something very similar to a multiplication table showing
        how the <InlineMathBlock latex="\circ" /> operation works between each
        element:
      </p>
      <div className="flex gap-8 sm:flex-row justify-around">
        <Table
          data={[
            [
              "",
              <InlineMathBlock latex="e" />,
              <InlineMathBlock latex="r_1" />,
              <InlineMathBlock latex="r_2" />,
              <InlineMathBlock latex="f" />,
            ],
            [
              <InlineMathBlock latex="e" />,
              <InlineMathBlock latex="e" />,
              <InlineMathBlock latex="r_1" />,
              <InlineMathBlock latex="r_2" />,
              <InlineMathBlock latex="f" />,
            ],
            [
              <InlineMathBlock latex="r_1" />,
              <InlineMathBlock latex="r_1" />,
              <InlineMathBlock latex="r_2" />,
              <InlineMathBlock latex="e" />,
              "?",
            ],
            [
              <InlineMathBlock latex="r_2" />,
              <InlineMathBlock latex="r_2" />,
              <InlineMathBlock latex="e" />,
              <InlineMathBlock latex="r_1" />,
              "?",
            ],
            [
              <InlineMathBlock latex="f" />,
              <InlineMathBlock latex="f" />,
              "?",
              "?",
              <InlineMathBlock latex="e" />,
            ],
          ]}
          headerRow={true}
          headerColumn={true}
        />
      </div>
      <p>
        Ok, we've got a few interesting values in the table, but what about
        those question mark values? What do we get when we flip the triangle and
        then rotate it? If we start with a triangle permutation{" "}
        <InlineMathBlock latex="ABC" />, flipping then rotating gives us:
        <InlineMathBlock latex="BAC" />. We can't get to this state with a
        single flip or rotation so we've found a new operation that we need to
        add! We'll call this operation <InlineMathBlock latex="fr_1" />. We'll
        also need to add
        <InlineMathBlock latex="fr_2" /> to represent the state{" "}
        <InlineMathBlock latex="CBA" />. Now our table can be completed:
      </p>
      <div className="flex gap-8 sm:flex-row justify-around">
        <Table
          data={[
            [
              "",
              <InlineMathBlock latex="e" />,
              <InlineMathBlock latex="r_1" />,
              <InlineMathBlock latex="r_2" />,
              <InlineMathBlock latex="f" />,
              <InlineMathBlock latex="fr_1" />,
              <InlineMathBlock latex="fr_2" />,
            ],
            [
              <InlineMathBlock latex="e" />,
              <InlineMathBlock latex="e" />,
              <InlineMathBlock latex="r_1" />,
              <InlineMathBlock latex="r_2" />,
              <InlineMathBlock latex="f" />,
              <InlineMathBlock latex="fr_1" />,
              <InlineMathBlock latex="fr_2" />,
            ],
            [
              <InlineMathBlock latex="r_1" />,
              <InlineMathBlock latex="r_1" />,
              <InlineMathBlock latex="r_2" />,
              <InlineMathBlock latex="e" />,
              <InlineMathBlock latex="fr_2" />,
              <InlineMathBlock latex="f" />,
              <InlineMathBlock latex="fr_1" />,
            ],
            [
              <InlineMathBlock latex="r_2" />,
              <InlineMathBlock latex="r_2" />,
              <InlineMathBlock latex="e" />,
              <InlineMathBlock latex="r_1" />,
              <InlineMathBlock latex="fr_1" />,
              <InlineMathBlock latex="fr_2" />,
              <InlineMathBlock latex="f" />,
            ],
            [
              <InlineMathBlock latex="f" />,
              <InlineMathBlock latex="f" />,
              <InlineMathBlock latex="fr_1" />,
              <InlineMathBlock latex="fr_2" />,
              <InlineMathBlock latex="e" />,
              <InlineMathBlock latex="r_1" />,
              <InlineMathBlock latex="r_2" />,
            ],
            [
              <InlineMathBlock latex="fr_1" />,
              <InlineMathBlock latex="fr_1" />,
              <InlineMathBlock latex="fr_2" />,
              <InlineMathBlock latex="f" />,
              <InlineMathBlock latex="r_2" />,
              <InlineMathBlock latex="e" />,
              <InlineMathBlock latex="r_1" />,
            ],
            [
              <InlineMathBlock latex="fr_2" />,
              <InlineMathBlock latex="fr_2" />,
              <InlineMathBlock latex="f" />,
              <InlineMathBlock latex="fr_1" />,
              <InlineMathBlock latex="r_1" />,
              <InlineMathBlock latex="r_2" />,
              <InlineMathBlock latex="e" />,
            ],
          ]}
          headerRow={true}
          headerColumn={true}
        />
      </div>
      <p>
        I encourage you to get a pen and paper and check that some of these
        values are correct.
      </p>
      <p>
        This is a group! We have a set of elements and a binary operation that
        combines them. Formally we define a group as{" "}
        <InlineMathBlock latex="(G,\circ)" /> where{" "}
        <InlineMathBlock latex="G" /> is our set of elements and{" "}
        <InlineMathBlock latex="\circ" /> is the binary operator the combines
        the elements. So in our case:{" "}
        <InlineMathBlock latex="G = \{e, r_1, r_2, f, fr_1, fr_2\}" /> and{" "}
        <InlineMathBlock latex="\circ" /> is the operation defined in the table
        above.
      </p>
      <p>
        The essence of a group really lies in the multiplication table we
        created. Given any number of elements simply draw a table and fill in
        rows and columns and you've got a group!
      </p>
      <p>Or have you...?</p>
      <p>
        There are actually a few rules that must be followed in order for it to
        be a group. We can't just enter any old values into the table. For
        example a group of 3 elements table where the operation{" "}
        <InlineMathBlock latex="\circ" /> sends every value to{" "}
        <InlineMathBlock latex="e" /> (the identity) is not a valid group.
      </p>
      <p>
        Let's go through each of the rules now and relate them to our triangle
        group example.
      </p>
      <h3>Closure</h3>
      <MathBlock latex="(a \circ b) \in G  " />
      <p>
        The closure property states that when combining any 2 elements of the
        group under the operation, the result is also a member of the group.
      </p>
      <p>
        This is a not a tricky one to prove. Simply check the multiplication
        table above and you'll see that the result of any{" "}
        <InlineMathBlock latex="\circ" /> operation gives another group element.
      </p>
      <h3>Associativity</h3>
      <MathBlock latex="(a \circ b) \circ c = a \circ (b \circ c)  " />
      <p>
        Just like normal numerical multiplication, when combining elements of
        the group, we must be able to pick any ordering of brackets we want.
      </p>
      <p>
        Proving this for our triangle group will be a little more involved but I
        encourage you to try a few examples and check that it holds e.g.{" "}
        <InlineMathBlock latex="(r_1 \circ fr_1) \circ f = r_1 \circ (fr_1 \circ f)" />
      </p>
      <h3>Identity</h3>
      <MathBlock latex="\exists e, e \circ a = a \circ e = a" />
      <p>
        The math notation is getting a bit more complicated now, but this one's
        simple. It merely states than a group must have an identity element.
        i.e. the "do nothing" element.
      </p>
      <p>
        This one's easy to prove as well since we can quite clearly see from the
        left and top row of the table that <InlineMathBlock latex="e" /> is
        indeed an identity.
      </p>
      <h3>Inverse</h3>
      <MathBlock latex="\forall a, \exists b, a \circ b = b \circ a = e" />
      <p>
        For every element of the group there must exist some other element that
        when combined with that element produces the identity. Think about
        numerical multiplication where every number has an multiplicative
        inverse that when multiplied together gives{" "}
        <InlineMathBlock latex="1" />, e.g.{" "}
        <InlineMathBlock latex="5 \times \frac{1}{5} = 1" />
      </p>
      <p>
        We can see this is true from the fact that each row/column of the table
        has exactly one <InlineMathBlock latex="e" /> in it.
      </p>
      <h3>Well-Defined</h3>
      <MathBlock latex="a_1 = a_2 \textmd{ and } b_1 = b_2 \implies a_1 \circ b_1 = a_2 \circ b_2" />
      <p>
        This one seems obvious, but it states that if two equal elements are
        combined in the same order under the operation they give the same
        result.
      </p>
      <p>
        This is trivially true for the triangle group since we can see each
        entry in the table has only one entry.
      </p>
      <br />
      <p>
        And these are the 5 rules! I encourage you to have a go at constructing
        some other multiplication tables of groups and see if they fit the
        rules.
      </p>
      <p>
        One interesting rule you might notice is missing is commutativity.
        Commutativity states that{" "}
        <InlineMathBlock latex="a \circ b = b \circ a" />. This is not actually
        a requirement of a group. The triangle group we've been discussing is
        not commutative! The table above shows that{" "}
        <InlineMathBlock latex="fr_1 \circ r_1 \neq r_1 \circ fr_1" />. If a
        group <i>does</i> have this property we call it an Abelian group.
      </p>
      <h2>Conclusion</h2>
      <p>
        One final question you might ask here is: why these rules? Why do we
        need these specific properties to define a group? What would happen if
        we removed some? The way to answer this question is to simply state that
        these rules are chosen because they are interesting. There is nothing
        that makes these rules "right" or "correct", but they are the rules that
        give us the most interesting and useful properties for the math we need.
        Changing the rules would give us a different structure that might be
        interesting in its own right, but it wouldn't be a group.
      </p>
      <p>
        This is the essence of group theory. We're not interested in the
        specific operations we're performing, but the properties that these
        operations satisfy. This allows us to study the abstract properties of
        these operations and apply them to many different areas of mathematics.
      </p>
    </Article>
  );
};

export default Page;
