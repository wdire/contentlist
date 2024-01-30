import type {Preview} from "@storybook/react";
import {themes} from "@storybook/theming";
import "../src/styles/globals.scss";

const preview: Preview = {
  parameters: {
    actions: {argTypesRegex: "^on[A-Z].*"},
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    docs: {
      theme: window.matchMedia("(prefers-color-scheme: dark)").matches ? themes.dark : themes.light,
    },
  },
};

export default preview;
