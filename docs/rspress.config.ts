import { defineConfig } from "@rspress/core";
import { pluginPreview } from "@rspress/plugin-preview";
import * as path from "node:path";
import placeholderPlugin from "./config/placeholderPlugin";
import previewWrapSuspensePlugin from "./config/previewWrapSuspensePlugin";

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
    tools: {
      rspack: {
        experiments: { lazyBarrel: false }, // https://github.com/web-infra-dev/rspack/issues/11531
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
  plugins: [pluginPreview(), previewWrapSuspensePlugin()],
  root: path.join(__dirname, "pages"),
  themeConfig: {
    footer: {
      message: "Copyright © 2025 Unimorphic",
    },
  },
  title: "Adaptive Material UI",
});
