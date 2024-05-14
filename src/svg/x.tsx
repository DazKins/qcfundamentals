import { SvgProps } from "./props";

const XSvg = ({ width, height, className }: SvgProps) => {
  return (
    <svg
      width={width}
      height={height}
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 18L18 6M6 6l12 12"
      ></path>
    </svg>
  );
};

export default XSvg;
