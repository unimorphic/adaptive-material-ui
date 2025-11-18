import { pluginReact } from "@rsbuild/plugin-react";
import { defineConfig, LibConfig } from "@rslib/core";

// https://github.com/mui/material-ui/blob/master/.browserslistrc
const browserslist = [
  "> 0.5%",
  "last 2 versions",
  "Firefox ESR",
  "not dead",
  "safari >= 15.4",
  "iOS >= 15.4",
];

export default defineConfig((params) => {
  const lib: LibConfig[] = [
    {
      bundle: false,
      dts: true,
      format: "esm",
      output: { distPath: "./dist/esm" },
      syntax: browserslist,
    },
  ];

  if (params.envMode === "production") {
    lib.push({ bundle: false, dts: true, format: "cjs", syntax: browserslist });
  }

  return {
    source: {
      entry: {
        index: ["./src/**", "!src/**/*.test.*", "!src/**/*testUtils*"],
      },
      tsconfigPath: "./tsconfig.build.json",
    },
    lib: lib,
    output: {
      target: "web",
    },
    plugins: [pluginReact()],
  };
});
