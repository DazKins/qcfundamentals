import Article from "@/components/article";
import ArticleImage from "@/components/articleImage";
import InlineMathBlock from "@/components/inlineMathBlock";
import MathBlock from "@/components/mathBlock";
import Table from "@/components/table";
import { getArticlePageMetadata } from "@/course/courseStructure";

const CHAPTER_ID = "quantum-algorithms";
const ARTICLE_ID = "grover-search";

export const metadata = getArticlePageMetadata(CHAPTER_ID, ARTICLE_ID);

const Page = () => {
  return (
    <Article>
      <p>
        With Deutsch-Jozsa, we saw our first fundamentally quantum algorithm
        that showed how quantum computers could do something better than
        classical computers. But it doesn&apos;t seem like a particularly useful
        algorithm. Is there a more useful algorithm that we might be able to run
        on a quantum computer?
      </p>
      <p>
        We&apos;ll answer this question by looking at Grover Search. This
        algorithm shows how we can use a quantum computer to search through some
        list of items exponentially faster than a classical computer would be
        able to.
      </p>
      <p>Let&apos;s start by formally defining the problem.</p>
      <p>
        Suppose we have a list of items we would like to search. Perhaps a list
        of users in our system and we would like to find the user with a
        particular email address:
      </p>
      <div className="flex justify-center">
        <Table
          data={[
            ["User ID", "Email", "Name", "Phone Number"],
            ["34587", "joe@blogs.com", "Joe Blogs", "1234556789"],
            ["98263", "ads643@gmail.com", "Adam Smith", "9373526118"],
            ["76291", "lara@croft.com", "Lara Croft", "6735264123"],
          ]}
          headerRow={true}
        />
      </div>
      <p>
        In a classical system, we might solve this problem of lookup using
        indexes. But this can create overheads in other parts of the system, so
        it is not uncommon that we might consider consider a linear search.
      </p>
      <p>
        In a completely unordered list like this, we know that the best we can
        do is simply scanning over each item until we find our match. This is a
        linear approach since the amount of time it takes to scan through the
        list is proportional linearly to the number of items in the list.
      </p>
      <p>
        This is quite often refered to as the &quot;phone book search&quot;
        problem. A phone book is an ancient pre-historic device that was used to
        look up a phone number for a particular person. It was sorted by name so
        that you could find the person you were looking for quickly. But if you
        wanted to do the opposite, find the name associated to a particular
        phone number, the best you could do was simply scan through every entry
        until you found it.
      </p>
      <p>
        I hope you&apos;re already getting excited thinking about how a quanutm
        computer could solve this quicker. You should be!
      </p>
      <p>
        Before we step back into the quantum world, let&apos;s translate our
        problem into some more formal mathematical language.
      </p>
      <p>
        Let&apos;s say our database contains <InlineMathBlock latex="N" />{" "}
        objects. We will define a function <InlineMathBlock latex="f" /> that
        takes an index from <InlineMathBlock latex="0" /> to{" "}
        <InlineMathBlock latex="N-1" /> and outputs{" "}
        <InlineMathBlock latex="1" /> if the database item at that index
        satisfies our condition and <InlineMathBlock latex="0" /> otherwise.
      </p>
      <p>
        For example, in our above example, if we&apos;re looking for the user
        with email &quot;lara@croft.com&quot;, we have{" "}
        <InlineMathBlock latex="f(x) = 1" /> if the object at index{" "}
        <InlineMathBlock latex="x" /> has that email address. If we treat the
        &quot;User ID&quot; as the index then in this case:{" "}
        <InlineMathBlock latex="x = 76291" />.
      </p>
      <p>
        Again, to re-iterate in the mathemtical language, the best a classical
        computer could do to find <InlineMathBlock latex="x" /> would be to
        check all values from <InlineMathBlock latex="0" /> to{" "}
        <InlineMathBlock latex="N-1" /> until it finds one that satisfies{" "}
        <InlineMathBlock latex="f(x) = 1" />.
      </p>
      <p>Now let&apos;s go back to the quantum world.</p>
      <p>
        To start constructing our quantum algorithm, we&apos;re going to
        introduce something called a phase oracle. It will be define as follows:
      </p>
      <MathBlock latex="O_x\ket{y} = \begin{cases} -\ket{y}\ \ \text{if}\ y = x \\ \ket{y}\ \ \ \ \ \ \text{if}\ y \neq x\end{cases}" />
      <p>
        So it essentially sticks a negative sign in front of a particular state
        and leaves all others alone. We call this a phase oracle since adding a
        negative sign is just multiplying by a global phase{" "}
        <InlineMathBlock latex="e^{i\pi} = -1" />.
      </p>
      <p>We can represent this oracle in outer-product notation:</p>
      <MathBlock latex="O_x = I - 2\ket{x}\bra{x}" />
      <p>
        We can see this works, in the case when{" "}
        <InlineMathBlock latex="y \neq x" />:
      </p>
      <MathBlock
        latex={[
          "O_x\\ket{x} = I\\ket{x} - 2\\ket{x}\\bra{x}\\ket{x} = \\ket{x} - 2\\ket{x} = -\\ket{x}",
          "O_x\\ket{y} = I\\ket{y} - 2\\ket{x}\\bra{x}\\ket{y} = \\ket{y}",
        ]}
      />
      <p>
        We will apply one additional constraint before we construct the
        algorithm: the database will only have a single entry satisfying the
        condition i.e. there will only exist a single value of{" "}
        <InlineMathBlock latex="x" /> such that{" "}
        <InlineMathBlock latex="f(x) = 1" />. It&apos;s possible to generalise
        to multiple solutions, but we&apos;ll keep it simple for now.
      </p>
      <p>
        Let&apos;s define the solution we&apos;re looking for as{" "}
        <InlineMathBlock latex="\omega" /> i.e.{" "}
        <InlineMathBlock latex="f(\omega)=1" />. Grover&apos;s search will then
        run as follows:
      </p>
      <ol className="list-decimal list-inside">
        <li>
          Prepare <InlineMathBlock latex="n=\lceil \log_2{N} \rceil" /> qubits
          in the starting state <InlineMathBlock latex="\ket{0}" />. This
          ensures we have enough bits to represent all the possible indexes in
          our database.
        </li>
        <li>
          Apply the Hadamard gate to all qubits:{" "}
          <InlineMathBlock latex="H^{\otimes n}" />, to end up in the even
          superposition:{" "}
          <InlineMathBlock latex="\frac{1}{\sqrt{N}}\sum_{x=0}^{N-1} \ket{x}" />
        </li>
        <li>
          Apply our quantum phase oracle for the solution state:{" "}
          <InlineMathBlock latex="O_{\omega}" />
        </li>
        <li>
          Hadamard gate every qubit: <InlineMathBlock latex="H^{\otimes n}" />
        </li>
        <li>
          Apply an oracle that adds a negative sign to every state apart from
          the all zero state: <InlineMathBlock latex="-O_0" />
        </li>
        <li>
          Hadamard gate every qubit: <InlineMathBlock latex="H^{\otimes n}" />
        </li>
        <li>Go back to step 3 and repeat a specified number of times</li>
        <li>
          Measure all the qubits with a high probability to get the solution{" "}
          <InlineMathBlock latex="\omega" />
        </li>
        <li>If the solution is incorrect, run again</li>
      </ol>
      <p>
        Ok, that&apos;s quite a lot to take in. Before we start looking into how
        this works, let&apos;s look at the circuit representation:
      </p>
      <ArticleImage
        src="grover"
        alt="The circuit representation of the Grover circuit"
      />
      <p>
        The numbers at the bottom represent the corresponding steps in the
        algorithm listed above. We&apos;ve also added a bracket over steps 3-6
        labelled <InlineMathBlock latex="G" />. We will refer to this part as
        the Grover iterator. This will be the part that gets repeated several
        times.
      </p>
      <p>
        Analysing this algorithm revolves around finding a nice mathematical
        representation of this operator. Formally, we can see it&apos;s defined
        as:
      </p>
      <MathBlock latex="G = H^{\otimes n}(-O_0)H^{\otimes n}O_{\omega}" />
      <p>
        In fact, we&apos;ll split it up more by defining the Grover diffusion
        operator <InlineMathBlock latex="D" />:
      </p>
      <MathBlock latex="D = H^{\otimes n}(-O_0)H^{\otimes n}" />
      <p>
        So <InlineMathBlock latex="G = DO_{\omega}" />
      </p>
      <p>
        We can simplify <InlineMathBlock latex="D" />:
      </p>
      <MathBlock
        latex={[
          "D = H^{\\otimes n}(-O_0)H^{\\otimes n}",
          "= H^{\\otimes n}(2\\ket{0}\\bra{0} - I)H^{\\otimes n}",
          "= 2H^{\\otimes n}\\ket{0}\\bra{0}H^{\\otimes n} - H^{\\otimes n}IH^{\\otimes n}",
          "= 2(H^{\\otimes n}\\ket{0})(\\bra{0}H^{\\otimes n}) - H^{\\otimes n}H^{\\otimes n}",
        ]}
      />
      <p>
        Since the Hadamard gate is its own inverse, the second term here cancels
        to <InlineMathBlock latex="I" />
      </p>
      <p>
        The first bracket in the first term we know is just the even
        superposition of all possible qubit states:{" "}
        <InlineMathBlock latex="\frac{1}{\sqrt{2^n}}\sum_{x=0}^{2^n-1}\ket{x}" />
        . We will need this state a lot, so we&apos;re going to denote it as{" "}
        <InlineMathBlock latex="\ket{s}" />. The second bracket is just the
        corresponding bra of this ket: <InlineMathBlock latex="\bra{s}" />. This
        comes from some maths we haven&apos;t discussed yet, but just know that
        since the two terms in the braket are real (have no imaginary
        coefficients) the bra can be written this way simply by flipping the
        ket.
      </p>
      <p>Putting this together we now have:</p>
      <MathBlock latex="D = 2\ket{s}\bra{s} - I" />
      <p>And thus:</p>
      <MathBlock latex="G = (2\ket{s}\bra{s} - I)(I - 2\ket{\omega}\bra{\omega})" />
      <p>
        The next step of our journey will be building some geometric intuition
        for what these operators are really doing.
      </p>
      <p>
        What we will show now, is that an operator of the form{" "}
        <InlineMathBlock latex="2\ket{x}\bra{x} - I" /> actually represents a
        geometric reflection.
      </p>
      <p>
        To see this, imagine we have 2 orthogonal vectors{" "}
        <InlineMathBlock latex="\ket{x}" /> and{" "}
        <InlineMathBlock latex="\ket{x^{\perp}}" /> where, since they are
        orthogonal, we have <InlineMathBlock latex="\braket{x|x^{\perp}} = 0" />
        . We define a vector in terms of these two:{" "}
        <InlineMathBlock latex="\ket{\psi} = a\ket{x} + b\ket{x^{\perp}}" /> and
        then see how our operator behaves on it:
      </p>
      <MathBlock
        latex={[
          "(2\\ket{x}\\bra{x} - I)\\ket{\\psi} = (2\\ket{x}\\bra{x} - I)(a\\ket{x} + b\\ket{x^{\\perp}})",
          "= 2a\\ket{x}\\bra{x}\\ket{x} + 2b\\ket{x}\\bra{x}\\ket{x^{\\perp}} - aI\\ket{x} - bI\\ket{x^{\\perp}}",
          "= 2a\\ket{x} - a\\ket{x} - b\\ket{x^{\\perp}}",
          "= a\\ket{x} - b\\ket{x^{\\perp}}",
        ]}
      />
      <p>
        As you can see, the operator flipped the component of{" "}
        <InlineMathBlock latex="\ket{x^{\perp}}" /> and left the component of{" "}
        <InlineMathBlock latex="\ket{x}" /> untouched. Thus this represents a
        reflection or mirroring around the vector{" "}
        <InlineMathBlock latex="\ket{x}" />.
      </p>
      <p>
        Now we know this a slight re-arranging of our definition of{" "}
        <InlineMathBlock latex="G" /> tells us so much more:
      </p>
      <MathBlock latex="G=-(2\ket{s}\bra{s} - I)(2\ket{\omega}\bra{\omega} - I)" />
      <p>
        We can see that <InlineMathBlock latex="G" /> is in fact a reflection
        around <InlineMathBlock latex="\ket{\omega}" /> followed by a reflection
        around <InlineMathBlock latex="\ket{s}" /> then negated.
      </p>
      <p>
        If you remember your rules of geometric transforms well, you will know
        that 2 reflections always make a rotation. So we can see that our Grover
        iterator is performing a rotation of our vector every time we apply it.
      </p>
      <p>
        We&apos;d like to be able to visualise this rotation; to see where
        it&apos;s rotating from and where it&apos;s rotating to. The problem is
        that we have <InlineMathBlock latex="n = \lceil \log_2{N} \rceil" />{" "}
        qubits and thus <InlineMathBlock latex="\approx N" /> different basis
        states. This means if we have 1000 items to search through, we have a
        1000-dimensional vector space! That&apos;s not very easy to visualise...
      </p>
      <p>
        Luckily we have a handy tool up our sleeve: projection. Just in the same
        way your eyes right now are projecting the 3D world into a 2D image on
        your retina, we can project our problem into a more manageable number of
        dimensions.
      </p>
      <p>Surprisingly, we can project it down into just 2!</p>
      <p>
        Our first vector will simply be the solution we are looking for:{" "}
        <InlineMathBlock latex="\ket{\omega}" />.
      </p>
      <p>
        The second vector we will choose will be the even superposition of all
        states we are NOT looking for i.e. an even superposition of all{" "}
        <InlineMathBlock latex="\ket{x}" /> where{" "}
        <InlineMathBlock latex="f(x) = 0" />. Since we specified there will be
        only one solution in our case, there are <InlineMathBlock latex="N-1" />{" "}
        such values of <InlineMathBlock latex="\ket{x}" /> so we can write our
        second vector as:
      </p>
      <MathBlock latex="\ket{s^\prime} = \frac{1}{\sqrt{N-1}}\sum_{x \neq \omega}\ket{x}" />
      <p>
        The choice to label this vector{" "}
        <InlineMathBlock latex="\ket{s^\prime}" /> will become apparent shortly.
      </p>
      <p>
        It&apos;s fairly clear these two vectors are orthogonal, since they
        don&apos;t share any of the same kets. And thus we can plot them in 2D:
      </p>
      <ArticleImage
        src="groveraxis"
        alt="The omega and s prime two-dimensional vector space"
      />
      <p>
        Ok, so we&apos;ve got two basis vectors for our space. Now we need to
        know where in the space to plot our state vector. Since we&apos;ve
        applied all Hadamard gates to the all{" "}
        <InlineMathBlock latex="\ket{0}" /> state, we know that we start in the
        state <InlineMathBlock latex="\ket{s}" />.
      </p>
      <p>
        We also know all our state vectors should be of unit length, that&apos;s
        what the normalisation coefficients are for, so we have to determine
        whether it is closer to <InlineMathBlock latex="\ket{\omega}" /> or{" "}
        <InlineMathBlock latex="\ket{s^\prime}" />. We can do this with the
        inner-product since we know two orthogonal vectors inner-product to 0
        and two parallel vectors to 1:
      </p>
      <MathBlock
        latex={[
          "\\braket{\\omega|s} = \\bra{\\omega}\\frac{1}{\\sqrt{N}}\\sum_{x=0}^{N}\\ket{x}",
          "= \\frac{1}{\\sqrt{N}}\\braket{\\omega|\\omega} = \\frac{1}{\\sqrt{N}}",
        ]}
      />
      <MathBlock
        latex={[
          "\\braket{s^\\prime |s} = \\Bigl(\\frac{1}{\\sqrt{N-1}}\\sum_{x\\neq \\omega}\\bra{\\omega}\\Bigr)\\Bigl(\\frac{1}{\\sqrt{N}}\\sum_{x=0}^{N}\\ket{x}\\Bigr)",
          "= \\frac{1}{\\sqrt{N-1}\\sqrt{N}}\\sum_{x\\neq \\omega}\\braket{\\omega|x} = \\frac{1}{\\sqrt{N-1}\\sqrt{N}}(N-1)",
          "= \\sqrt{\\frac{N-1}{N}}",
        ]}
      />
      <p>
        From these results, it is fairly clear that our initial state vector
        lies closer to <InlineMathBlock latex="\ket{s^\prime}" /> than{" "}
        <InlineMathBlock latex="\ket{\omega}" />, so let&apos;s plot our
        starting point. We&apos;ll denote our starting state as{" "}
        <InlineMathBlock latex="\phi_0" /> as we have done before:
      </p>
      <ArticleImage
        src="groveraxisfirststate"
        alt="The phi zero state plotted on the two dimensional vector space, closer to s prime than to omega"
      />
      <p>
        Now to find <InlineMathBlock latex="\ket{\phi_1}" /> we just apply our
        Grover iterator:{" "}
        <InlineMathBlock latex="\ket{\phi_1} = G\ket{\phi_0}" />. We know, from
        earlier, that this operation is a reflection around{" "}
        <InlineMathBlock latex="\ket{\omega}" /> followed by a reflection around{" "}
        <InlineMathBlock latex="\ket{s}" /> then negated.
      </p>
      <p>
        A nice result from 2D geometry is that a negated reflection around a
        vector is equal to a reflection around a perpendicular vector.
      </p>
      <p>
        So we could pull the negative sign of the Grover iterator inside to the
        reflection around <InlineMathBlock latex="\ket{\omega}" /> and make it a
        reflection around <InlineMathBlock latex="\ket{s^\prime}" />
      </p>
      <p>
        So our Grover iterator is now a reflection around{" "}
        <InlineMathBlock latex="\ket{s^\prime}" /> followed by a reflection
        around <InlineMathBlock latex="\ket{s}" />.
      </p>
      <p>So this looks like:</p>
      <ArticleImage
        src="groveraxisrot"
        alt="A representation of the flips a state goes through under the Grover iterator"
      />
      <p>
        Here, the bottom dotted line represents the first reflection around{" "}
        <InlineMathBlock latex="\ket{s^\prime}" />.
      </p>
      <p>
        So we can see that the Grover iterator is rotating our state away from
        the vector of non-solutions, <InlineMathBlock latex="\ket{s^\prime}" />,
        and towards the solution vector <InlineMathBlock latex="\ket{\omega}" />
        !
      </p>
      <p>
        Once we have got near to the solution we can simply measure the state
        and we will have a high probability of finding the correct solution. The
        only question is how many times do we have to rotate? i.e. how many
        times do we have to apply the Grover iterator?
      </p>
      <p>
        To answer this, we&apos;ll have to look at the angles involved in the
        rotations. We can see this more easily on the following diagram:
      </p>
      <ArticleImage
        src="angles"
        alt="The flips of the state under the Grover iterator with angles labelled"
      />
      <p>
        We can see clearly some doubling relations between angles here. The
        green angle, the result after the initial reflection around{" "}
        <InlineMathBlock latex="\ket{s^\prime}" />, is double the red angle and
        the blue angle, the result after the reflection around{" "}
        <InlineMathBlock latex="\ket{s}" />, is double the green angle. And
        finally, the yellow angle is clearly half the blue angle.
      </p>
      <p>
        Putting this all together we see that the angle between{" "}
        <InlineMathBlock latex="\ket{\phi_0}" /> and{" "}
        <InlineMathBlock latex="\ket{\phi_1}" /> is simply double the red angle,
        the angle between <InlineMathBlock latex="\ket{s}" /> and{" "}
        <InlineMathBlock latex="\ket{s^\prime}" />.
      </p>
      <p>So what is the red angle?</p>
      <p>
        We can use the following geometric result on the inner-product:{" "}
        <InlineMathBlock latex="\braket{x|y} = \sqrt{\braket{x|x}}\sqrt{\braket{y|y}}\cos{\theta}" />
        . In our case <InlineMathBlock latex="\ket{s}" /> and{" "}
        <InlineMathBlock latex="\ket{s^\prime}" /> are unit vectors, so the
        length scales can be ignored:{" "}
        <InlineMathBlock latex="\braket{s|s^\prime} = \cos{\theta}" />.
      </p>
      <p>But we already calculated this inner-product earlier it&apos;s:</p>
      <MathBlock latex="\braket{s|s^\prime} = \sqrt{\frac{N-1}{N}}" />
      <p>So we have:</p>
      <MathBlock latex="\cos{\theta} = \sqrt{\frac{N-1}{N}}" />
      <p>Using sin/cos relations:</p>
      <MathBlock latex="\sin{\theta} = \sqrt{\frac{1}{N}}" />
      <p>
        For small <InlineMathBlock latex="\theta" /> we have{" "}
        <InlineMathBlock latex="\sin^{-1}{\theta} \approx \theta" /> so:
      </p>
      <MathBlock latex="\theta \approx \sqrt{\frac{1}{N}}" />
      <p>
        Now remember every application of the Grover iterator rotates by{" "}
        <InlineMathBlock latex="2\theta" /> so after{" "}
        <InlineMathBlock latex="n" /> iterations we are at an angle of{" "}
        <InlineMathBlock latex="(n+1)2\theta" />.
      </p>
      <p>
        We reach the solution when this angle equals{" "}
        <InlineMathBlock latex="\pi/2" /> which, when subbing into the previous
        equation, is when <InlineMathBlock latex="n = \pi/4\theta - 1" />.
      </p>
      <p>
        Subbing now in our approximation of <InlineMathBlock latex="\theta" />:
      </p>
      <MathBlock latex="n = \frac{\pi}{4}\sqrt{N}-1" />
      <p>Wow, that was a lot of work! But we&apos;re finally done!</p>
      <p>
        We&apos;ve shown that we require only{" "}
        <InlineMathBlock latex="\sim \sqrt{N}" /> steps to reach the solution.
      </p>
      <p>
        Remember a classical algorithm would take <InlineMathBlock latex="N" />{" "}
        steps, so we&apos;ve found a significant improvement!
      </p>
    </Article>
  );
};

export default Page;
