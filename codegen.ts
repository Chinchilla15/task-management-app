import { CodegenConfig } from "@graphql-codegen/cli";
import { VITE_GRAPHQL_API_TOKEN, VITE_GRAPHQL_API_URL } from "./src/config/env";

const API_URL = VITE_GRAPHQL_API_URL;
const API_TOKEN = VITE_GRAPHQL_API_TOKEN;

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
