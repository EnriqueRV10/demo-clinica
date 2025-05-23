import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
// import pluginReact from "eslint-plugin-react";
import pluginAstro from "eslint-plugin-astro";
import prettier from "eslint-config-prettier";
import { defineConfig } from "eslint/config";

export default defineConfig([
  ...pluginAstro.configs.recommended,
  // Configuración general para JS, TS, JSX, TSX
  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    plugins: { js },
    extends: ["js/recommended"],
  },
  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    languageOptions: {
      globals: globals.browser,
    },
  },

  // Configuración de TypeScript
  tseslint.configs.recommended,

  // // Configuración de React
  // pluginReact.configs.flat.recommended,

  // Configuración específica para Astro
  {
    files: ["**/*.astro"],
    languageOptions: {
      parser: "astro-eslint-parser",
      parserOptions: {
        parser: "@typescript-eslint/parser", // Usar el parser de TypeScript
        extraFileExtensions: [".astro"],
      },
    },
    plugins: {
      astro: pluginAstro,
    },

    rules: {},
  },

  // Configuración para Prettier
  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx,astro}"],
    extends: [prettier],
  },
]);
