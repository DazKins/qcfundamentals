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
        The Youtube user &quot;Elucyda&quot; has made a great playlist of his own personal
        lectures that covers advanced algorithms and some quantum physics at the
        same time.{" "}
        <a href="https://www.youtube.com/playlist?list=PLl0eQOWl7mnWPTQF7lgLWZmb5obvOowVw">
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
      <h3>Apps</h3>
      <p>
        Brilliant have made a great Quantum Computing course in collaboration
        with Microsoft{" "}
        <i>(Monthly subscription is required for full access).</i>{" "}
        <a href="https://brilliant.org/courses/quantum-computing/">Website</a>
      </p>
      <p>
        Q-CTRL have launched a online learning portal called black opal with
        some nice interactive simulators{" "}
        <i>(Monthly subscription is required for full access).</i>{" "}
        <a href="https://q-ctrl.com/black-opal">Website</a>
      </p>
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
