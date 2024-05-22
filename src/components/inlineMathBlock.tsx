"use client";

import { useMemo } from "react";
import katex from "katex";
import { mono } from "@/font/fonts";

const InlineMathBlock = ({
  latex,
  blockMode,
}: {
  latex: string;
  blockMode?: boolean;
}) => {
  const { html, error } = useMemo(() => {
    try {
      return {
        html: katex.renderToString(latex, {
          displayMode: blockMode,
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
    <span
      className={`whitespace-nowrap py-[2px] px-1 pb-1 mx-1 bg-darkgrey text-lightgrey rounded-default ${mono.className}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};

export default InlineMathBlock;
