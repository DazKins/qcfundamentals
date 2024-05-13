import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      primary: "#4ECDC4",
      secondary: "#1B4079",
      black: "#121212",
      white: "#f2f2f2",
      lightgrey: "#c0c0c0",
      darkgrey: "#303030",
    },
    borderRadius: {
      default: "0.375rem",
    },
  },
  plugins: [],
};
export default config;
