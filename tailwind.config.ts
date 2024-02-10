import type {Config} from "tailwindcss";
import {nextui} from "@nextui-org/react";

const config = {
  darkMode: ["class"],
  content: [
    "src/**/*.{js,jsx,ts,tsx}",
    "./stories/**/*.{js,jsx,ts,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  prefix: "",
  plugins: [
    nextui({
      themes: {},
    }),
  ],
} satisfies Config;

export default config;
