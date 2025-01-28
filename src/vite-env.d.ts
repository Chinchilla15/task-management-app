/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />
interface ImportMetaEnv {
  readonly VITE_GRAPHQL_API_URL: string;
  readonly VITE_GRAPHQL_API_TOKEN: string;
  readonly VITE_UNPLASH_ACCESS_KEY: string;
  readonly VITE_UNPLASH_SECRET_KEY: string;
  readonly MODE: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
