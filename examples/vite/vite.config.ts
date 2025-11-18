import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  preview: {
    port: 3001,
  },
  server: {
    port: 3001,
  },
});
