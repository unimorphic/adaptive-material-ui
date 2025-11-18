import eslint from "@eslint/js";
import importPlugin from "eslint-plugin-import";
import * as mdx from "eslint-plugin-mdx";
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
    ...mdx.flat,
    processor: mdx.createRemarkProcessor({
      lintCodeBlocks: true,
    }),
  },
  {
    ...mdx.flatCodeBlocks,
    rules: mdx.flatCodeBlocks.rules,
  },
  {
    files: ["**/*.mdx/**"],
    extends: [
      eslint.configs.recommended,
      tseslint.configs.strict,
      tseslint.configs.stylistic,
      reactHooks.configs.flat["recommended-latest"],
      importPlugin.flatConfigs.recommended,
      importPlugin.flatConfigs.typescript,
    ],
    plugins: {
      react: react,
    },
    rules: {
      "import/no-unresolved": [
        "warn",
        { ignore: ["adaptive-material-ui/.*", "@/shared/.*"] },
      ],
    },
  },
  {
    ignores: ["**/*.mdx/**", "**/*.md", "**/*.mdx"],
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
        projectService: true,
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
      "@typescript-eslint/no-empty-object-type": "off",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { ignoreRestSiblings: true },
      ],
      "no-restricted-imports": [
        "warn",
        { patterns: [{ regex: "^@mui/[^/]+$" }] },
      ],
    },
  },
);
