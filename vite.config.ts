import { defineConfig, loadEnv, mergeConfig, UserConfig } from "vite";
import { defineConfig as defineVitestConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vite.dev/config/
const vitestConfig = defineVitestConfig({
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/testing/setup.ts",
  },
});

const viteConfig: UserConfig = defineConfig({
  plugins: [react(), svgr(), tsconfigPaths()],
  define: {
    __ENV__: loadEnv(process.env.NODE_ENV || "development", process.cwd(), ""),
  },
});

export default mergeConfig(vitestConfig, viteConfig);
