import type {CodegenConfig} from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "https://graphql.anilist.co",
  documents: "./src/services/anilistApi/**/*.graphql",
  generates: {
    "./src/services/anilistApi/anilist.generated.ts": {
      config: {
        importBaseApiFrom: "@/services/anilistApi/anilistCreateApi",
        importBaseApiAlternateName: "anilistCreateApi",
        documentMode: "string",
      },
      plugins: [
        "typescript",
        "typescript-operations",
        "typescript-rtk-query",
        {
          add: {
            content:
              "// eslint-disable-next-line eslint-comments/disable-enable-pair\n/* eslint-disable @typescript-eslint/no-explicit-any */\n",
          },
        },
      ],
    },
  },
};
export default config;
