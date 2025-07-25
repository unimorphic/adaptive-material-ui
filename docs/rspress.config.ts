import * as path from "node:path";
import { defineConfig } from "rspress/config";

export default defineConfig({
  icon: "/logo.svg",
  logo: {
    light: "/logo-light.svg",
    dark: "/logo-dark.svg",
  },
  globalStyles: path.join(__dirname, "styles/theme.css"),
  root: path.join(__dirname, "pages"),
  themeConfig: {
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
