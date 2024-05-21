"use client";

import ChevronDownSvg from "@/svg/chevronDown";
import ChevronUpSvg from "@/svg/chevronUp";
import { ReactNode, useState } from "react";

type Props = {
  problem: ReactNode;
  solution: ReactNode;
};

const Exercise = ({ problem, solution }: Props) => {
  const [showSolution, setShowSolution] = useState(false);

  return (
    <div className="flex flex-col gap-2">
      <div>{problem}</div>
      <div
        className="cursor-pointer flex items-center gap-2"
        onClick={() => {
          setShowSolution((oldShowSolution) => !oldShowSolution);
        }}
      >
        {showSolution ? (
          <>
            <ChevronUpSvg width={20} height={20} /> Hide solution
          </>
        ) : (
          <>
            <ChevronDownSvg width={20} height={20} /> Show solution
          </>
        )}{" "}
      </div>
      {showSolution && <div className="flex flex-col border border-darkgrey p-4 rounded-default">{solution}</div>}
    </div>
  );
};

export default Exercise;
