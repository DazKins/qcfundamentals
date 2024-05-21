import { SvgProps } from "./props";

const ChevronDownSvg = ({ width, height }: SvgProps) => (
  <svg
    width={width}
    height={height}
    fill="none"
    strokeWidth="1.5"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M19.5 8.25l-7.5 7.5-7.5-7.5"
    ></path>
  </svg>
);

export default ChevronDownSvg;
