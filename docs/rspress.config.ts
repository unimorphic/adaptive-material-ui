import { defineConfig } from "@rspress/core";
import { pluginPreview } from "@rspress/plugin-preview";
import * as path from "node:path";
import eslintDisablePlugin from "./config/eslintDisablePlugin";
import placeholderPlugin from "./config/placeholderPlugin";
import previewWrapSuspensePlugin from "./config/previewWrapSuspensePlugin";

export default defineConfig({
  base:
    process.env.NODE_ENV === "development"
      ? undefined
      : "/adaptive-material-ui/",
  builderConfig: {
    resolve: {
      alias: { "@": "./" },
    },
  },
  icon: "/logo-light.svg",
  logo: {
    light: "/logo-light.svg",
    dark: "/logo-dark.svg",
  },
  globalStyles: path.join(__dirname, "theme/styles.css"),
  markdown: {
    remarkPlugins: [placeholderPlugin, eslintDisablePlugin],
  },
  outDir: "dist",
  plugins: [pluginPreview(), previewWrapSuspensePlugin()],
  root: path.join(__dirname, "pages"),
  themeConfig: {
    footer: { message: "Copyright © 2026 Unimorphic" },
  },
  title: "Adaptive Material UI",
});
