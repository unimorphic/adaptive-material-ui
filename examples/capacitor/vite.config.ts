import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  root: "./src",
  build: {
    outDir: "../dist",
    minify: false,
    emptyOutDir: true,
  },
  plugins: [react()],
  preview: {
    port: 3001,
  },
  server: {
    port: 3001,
  },
});
