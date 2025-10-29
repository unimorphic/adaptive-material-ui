import { defineConfig } from "@rspress/core";
import { pluginPreview } from "@rspress/plugin-preview";
import * as path from "node:path";
import placeholderPlugin from "./config/placeholderPlugin";

export default defineConfig({
  builderConfig: {
    html: {
      template: "./index.html",
    },
    resolve: {
      alias: {
        "@": "./",
      },
    },
  },
  icon: "/logo-light.svg",
  logo: {
    light: "/logo-light.svg",
    dark: "/logo-dark.svg",
  },
  globalStyles: path.join(__dirname, "theme/styles.css"),
  markdown: {
    remarkPlugins: [placeholderPlugin],
  },
  outDir: "dist",
  plugins: [pluginPreview()],
  root: path.join(__dirname, "pages"),
  themeConfig: {
    footer: {
      message: "Copyright © 2025 Unimorphic",
    },
  },
  title: "Adaptive Material UI",
});
