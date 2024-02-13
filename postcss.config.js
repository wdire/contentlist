module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},

    "postcss-flexbugs-fixes": {
      "postcss-preset-env": {
        autoprefixer: {
          flexbox: "no-2009",
        },
        stage: 3,
        features: {
          "custom-properties": false,
        },
      },

      "@fullhuman/postcss-purgecss": {
        content: [
          "./src/**/*.{js,jsx,ts,tsx}",
          "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
        ],
        defaultExtractor: (content) => content.match(/[\w-/:]+(?<!:)/g) || [],
        safelist: {
          standard: ["html", "body"],
        },
      },
    },
  },
};
