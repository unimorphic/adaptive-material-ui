import eslint from "@eslint/js";
import importPlugin from "eslint-plugin-import";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import tseslint from "typescript-eslint";

export default tseslint.config({
  extends: [
    eslint.configs.recommended,
    tseslint.configs.strictTypeChecked,
    tseslint.configs.stylisticTypeChecked,
    reactHooks.configs["recommended-latest"],
    importPlugin.flatConfigs.recommended,
    importPlugin.flatConfigs.typescript,
  ],
  ignores: ["*.*"],
  plugins: {
    react: react,
  },
  languageOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
    parserOptions: {
      ecmaFeatures: { jsx: true },
      project: ["./tsconfig.json"],
      warnOnUnsupportedTypeScriptVersion: true,
    },
  },
  settings: {
    "import/resolver": {
      typescript: {}, // this loads <rootdir>/tsconfig.json to eslint
    },
  },
});
