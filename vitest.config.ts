import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "jsdom",
    server: { deps: { inline: ["@material/material-color-utilities"] } },
    setupFiles: "./vitest.setup.ts",
  },
});
