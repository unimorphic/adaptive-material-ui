import { pluginPreview } from "@rspress/plugin-preview";
import * as path from "node:path";
import { defineConfig } from "rspress/config";

export default defineConfig({
  builderConfig: {
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
  globalUIComponents: [path.join(__dirname, "theme", "robotoFont.tsx")],
  outDir: "dist",
  plugins: [pluginPreview()],
  root: path.join(__dirname, "pages"),
  themeConfig: {
    footer: {
      message: "Copyright © 2025 Unimorphic",
    },
    socialLinks: [
      {
        icon: "github",
        mode: "link",
        content: "https://github.com/unimorphic/adaptive-material-ui",
      },
    ],
  },
  title: "Adaptive Material UI",
});
