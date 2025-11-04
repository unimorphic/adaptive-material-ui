import eslint from "@eslint/js";
import importPlugin from "eslint-plugin-import";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import { defineConfig } from "eslint/config";
import tseslint from "typescript-eslint";

export default defineConfig(
  {
    ignores: [
      "*.*",
      "dist/**",
      "docs/dist/**",
      "examples/capacitor/android/**",
      "examples/capacitor/dist/**",
      "examples/next-js/.next/**",
      "examples/next-js/next-env.d.ts",
      "playwright/**",
      "scripts/**",
    ],
  },
  {
    extends: [
      eslint.configs.recommended,
      tseslint.configs.strictTypeChecked,
      tseslint.configs.stylisticTypeChecked,
      reactHooks.configs.flat["recommended-latest"],
      importPlugin.flatConfigs.recommended,
      importPlugin.flatConfigs.typescript,
    ],
    plugins: {
      react: react,
    },
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: "module",
      parserOptions: {
        ecmaFeatures: { jsx: true },
        project: [
          "./tsconfig.json",
          "./docs/tsconfig.json",
          "./examples/capacitor/tsconfig.json",
          "./examples/next-js/tsconfig.json",
        ],
        warnOnUnsupportedTypeScriptVersion: true,
      },
    },
    settings: {
      "import/resolver": {
        typescript: {}, // this loads <rootdir>/tsconfig.json to eslint
      },
    },
    rules: {
      "@typescript-eslint/no-confusing-void-expression": [
        "warn",
        { ignoreArrowShorthand: true },
      ],
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { ignoreRestSiblings: true },
      ],
    },
  },
);
