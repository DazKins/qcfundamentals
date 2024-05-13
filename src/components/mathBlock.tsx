"use client";

import { useMemo } from "react";
import katex from "katex";

const MathBlock = ({
  latex,
}: {
  latex: string | string[];
}) => {
  const { html, error } = useMemo(() => {
    try {
      let latexValue = "";

      if (Array.isArray(latex)) {
        latexValue = latex.join(" \\\\[3ex] ");
      } else {
        latexValue = latex;
      }

      return {
        html: katex.renderToString(latexValue, {
          displayMode: true,
          throwOnError: true,
        }),
      };
    } catch (error) {
      if (error instanceof katex.ParseError || error instanceof TypeError) {
        return { error };
      }

      throw error;
    }
  }, [latex]);

  if (error) {
    return <span>{error.message}</span>;
  }

  return (
    <div
      className={`w-full p-4 rounded-default bg-darkgrey text-lightgrey whitespace-nowrap overflow-auto`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};

export default MathBlock;
