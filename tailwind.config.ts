import type {Config} from "tailwindcss";
import {nextui} from "@nextui-org/react";

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
        "page-top-space": "var(--page-top-space)",
        "header-height_gap": "calc(var(--header-height) + 20px)",
      },
      maxHeight: {
        "sticky-right": "calc(100vh - var(--header-height) - 20px)",
      },
      colors: {
        "rowColor-red": "var(--rowColor-red)",
        "rowColor-orange": "var(--rowColor-orange)",
        "rowColor-light-orange": "var(--rowColor-light-orange)",
        "rowColor-yellow": "var(--rowColor-yellow)",
        "rowColor-lime": "var(--rowColor-lime)",
        "rowColor-green": "var(--rowColor-green)",
        "rowColor-turquoise": "var(--rowColor-turquoise)",
        "rowColor-light-blue": "var(--rowColor-light-blue)",
        "rowColor-blue": "var(--rowColor-blue)",
        "rowColor-magenta": "var(--rowColor-magenta)",
        "rowColor-purple": "var(--rowColor-purple)",
        "rowColor-black": "var(--rowColor-black)",
        "rowColor-gray": "var(--rowColor-gray)",
        "rowColor-silver": "var(--rowColor-silver)",
        "rowColor-white": "var(--rowColor-white)",
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
