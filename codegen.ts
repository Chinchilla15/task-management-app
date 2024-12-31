import { CodegenConfig } from "@graphql-codegen/cli";

const API_URL = import.meta.env.VITE_GRAPHQL_API_URL;
const API_TOKEN = import.meta.env.VITE_GRAPHQL_API_TOKEN;

const config: CodegenConfig = {
  overwrite: true,
  schema: [
    {
      [API_URL]: {
        headers: {
          Authorization: `Bearer ${API_TOKEN}`,
        },
      },
    },
  ],
  documents: ["src/graphql/**/*.ts"],
  generates: {
    "./src/graphql/graphql.ts": {
      plugins: [
        "typescript",
        "typescript-operations",
        "typescript-react-apollo",
      ],
      config: {
        withHooks: true,
        withComponent: false,
        withHOC: false,
      },
    },
  },
};

export default config;
