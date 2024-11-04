const Page = () => {
  return (
    <div className="flex flex-col gap-5">
      <h1>Additional Materials</h1>
      <p>
        Here you&apos;ll find some other useful materials for learning quantum
        computing.
      </p>
      <h2>Quantum Computing</h2>
      <h3>Videos</h3>
      <p>
        The Youtube user &quot;Elucyda&quot; has made a great playlist of his
        own personal lectures that covers advanced algorithms and some quantum
        physics at the same time.{" "}
        <a href="https://www.youtube.com/playlist?list=PLl0eQOWl7mnWPTQF7lgLWZmb5obvOowVw">
          YouTube
        </a>
      </p>
      <p>
        The Youtube channel &quot;Quantum Sense&quot; has an awesome series on
        the mathematics of bra-ket notation. He tackles it more from a physics
        perspective, but it&apos;s still very applicable here.{" "}
        <a href="https://www.youtube.com/playlist?list=PL8ER5-vAoiHAWm1UcZsiauUGPlJChgNXC">
          YouTube
        </a>
      </p>
      <h3>Books</h3>
      <p>
        The &quot;Mike and Ike&quot; textbook (Quantum Computation and Quantum
        Information by Isaac Chuang and Michael Nielsen) is one of the most
        classic introductions to the field. Despite being old, it still provides
        an excellent introduction to the theory of quantum algorithms, error
        correction and information theory.{" "}
        <a href="https://www.amazon.com/Quantum-Computation-Information-10th-Anniversary/dp/1107002176">
          Amazon
        </a>
      </p>
      <p>
        &quot;Programming Quantum Computers&quot; by Eric R. Johnston, Nic
        Harrigan & Mercedes Gimeno-Segovia, presents a slightly more practical
        hands on approach where you will learn the fundamentals of programming a
        QPU (Quantum Processing Unit) using QASM.{" "}
        <a href="https://www.amazon.com/Programming-Quantum-Computers-Essential-Algorithms/dp/1492039683">
          Amazon
        </a>
      </p>
      <h3>Websites</h3>
      <p>
        IBM is developing Qiskit which is a great toolkit/library for
        coding/testing your own quantum algorithms.{" "}
        <a href="https://docs.quantum.ibm.com/guides">Getting started guide</a>
      </p>
      <h3>Apps</h3>
      <p>
        Brilliant have made a great Quantum Computing course in collaboration
        with Microsoft{" "}
        <i>(Monthly subscription is required for full access).</i>{" "}
        <a href="https://brilliant.org/courses/quantum-computing/">Website</a>
      </p>
      <p>
        Q-CTRL have launched a online learning portal called Black Opal with
        some nice interactive simulators{" "}
        <i>(Monthly subscription is required for full access).</i>{" "}
        <a href="https://q-ctrl.com/black-opal">Website</a>
      </p>
      <br />
      <h2>Quantum Physics</h2>
      <p>
        Although not required, here are some useful learning materials for
        quantum physics.
      </p>
      <h3>Videos</h3>
      <p>
        MIT has uploaded 3 whole courses of lectures on quantum physics which
        are great:
      </p>
      <ul>
        <li>
          <a href="https://www.youtube.com/playlist?list=PLUl4u3cNGP61-9PEhRognw5vryrSEVLPr">
            MIT 8.04 Quantum Physics I (Youtube)
          </a>
        </li>
        <li>
          <a href="https://www.youtube.com/playlist?list=PLUl4u3cNGP60QlYNsy52fctVBOlk-4lYx">
            MIT 8.05 Quantum Physics II (Youtube)
          </a>
        </li>
        <li>
          <a href="https://www.youtube.com/playlist?list=PLUl4u3cNGP60Zcz8LnCDFI8RPqRhJbb4L">
            MIT 8.06 Quantum Physics III (Youtube)
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Page;
