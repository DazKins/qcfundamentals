import Link from "next/link";

const Page = () => {
  return (
    <div className="flex flex-col gap-5">
      <h1>Afterword & Next Steps</h1>
      <p>
        If you&apos;ve come here after finishing the course then congratulations! I
        hope you enjoyed working through it as much as I did writing it!
      </p>
      <p>
        There are no more articles (for now...) but I wanted to provide some
        pointers in the right direction to where you should be going next to
        continue your quantum computing journey. The{" "}
        <Link href="/additional-materials">Additional Materials</Link> page has
        the links for all the below suggestions:
      </p>
      <ul>
        <li>
          The classic &quot;Mike & Ike&quot; textbook has served as a great
          reference for me in writing this course and covers just about
          everything we&apos;ve covered here with even more excruciating detail on
          the specifics. It&apos;s a great way to tie up some of the loose ends
          around the topics we&apos;ve covered. We only cover about the first half of
          the book, the second half will take you deeper into more advanced
          topics such as quantum information, error-correction and quantum
          complexity. It is the most highly recommended next step I can give.
        </li>
        <li>
          Much of quantum computing research currently takes place in Physics
          departments. If you&apos;re interested in taking a look at the physics
          angle of things then MIT has uploaded 3 whole courses on quantum
          mechanics available for free on Open Courseware. Seeing what we&apos;ve
          discussed from a physics standpoint will give you a new perspective
          and solidify many of the concepts we&apos;ve discussed here.
        </li>
        <li>
          Another interesting next step could be to look at some more practical
          hands on study of quantum computing. The book &quot;Programming Quantum
          Computers&quot; by Eric R. Johnston, Nic Harrigan & Mercedes Gimeno-Segovia
          is a great resource for learning how to program a QPU (Quantum
          Processing Unit) using QASM. It&apos;s a great way to get hands on with
          quantum computing and see how the theory we&apos;ve discussed here can be
          put into practice. Another popular tool is Qiskit from IBM. This is a
          fully featured package of software to help you write/run your own
          quantum algorithms.
        </li>
      </ul>
      <p>
        Thanks for taking the time to study the course! I&apos;d love to hear any and
        all feedback. You can find my contact details in the{" "}
        <Link href={"/about"}>About</Link> section.
      </p>
    </div>
  );
};

export default Page;
