import { SvgProps } from "./props";

const ChevronUpSvg = ({ width, height }: SvgProps) => {
  return (
    <svg
      width={width}
      height={height}
      data-slot="icon"
      fill="none"
      stroke-width="1.5"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="m4.5 15.75 7.5-7.5 7.5 7.5"
      ></path>
    </svg>
  );
};

export default ChevronUpSvg;