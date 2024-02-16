import type {Config} from "tailwindcss";
import {nextui} from "@nextui-org/react";
import {dark} from "@clerk/themes";

const config = {
  darkMode: ["class"],
  content: [
    "src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  removeDeprecatedGapUtilities: true,
  purgeLayersByDefault: true,
  theme: {
    extend: {
      spacing: {
        "header-height": "var(--header-height)",
      },
    },
  },
  prefix: "",
  plugins: [
    nextui({
      themes: {},
    }),
  ],
} satisfies Config;

export default config;
