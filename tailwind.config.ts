import type {Config} from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: ["src/**/*.{js,jsx,ts,tsx}", "./stories/**/*.{js,jsx,ts,tsx}"],
  prefix: "",
  theme: {},
  plugins: [require("tailwindcss-react-aria-components"), require("tailwindcss-animate")],
} satisfies Config;

export default config;
