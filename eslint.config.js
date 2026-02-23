import js from "@eslint/js";
import tseslint from "typescript-eslint";
import cypress from "eslint-plugin-cypress";
import prettierPlugin from "eslint-plugin-prettier";
import importPlugin from "eslint-plugin-import";
import unusedImports from "eslint-plugin-unused-imports";

export default [
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ["**/*.ts"],
    ignores: [
      "node_modules",
      "dist",
      "coverage",
      "cypress/videos",
      "cypress/screenshots",
    ],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.json", "./tsconfig.cypress.json"],
        tsconfigRootDir: import.meta.dirname,
        sourceType: "module",
      },
    },
    plugins: {
      cypress,
      import: importPlugin,
      "unused-imports": unusedImports,
    },
    rules: {
      /* Cypress */
      "cypress/no-unnecessary-waiting": "warn",
      "cypress/assertion-before-screenshot": "warn",

      /* TS */
      "@typescript-eslint/no-unused-vars": "off",
      "unused-imports/no-unused-imports": "error",
      "@typescript-eslint/no-explicit-any": "warn",

      /* Imports */
      "import/order": [
        "error",
        {
          groups: [
            "builtin",
            "external",
            "internal",
            "parent",
            "sibling",
            "index",
          ],
          "newlines-between": "always",
        },
      ],

      "no-console": "off",
    },
  },

  {
    files: ["cypress/**/*.ts"],
    languageOptions: {
      globals: {
        cy: "readonly",
        Cypress: "readonly",
        expect: "readonly",
        describe: "readonly",
        it: "readonly",
        before: "readonly",
        beforeEach: "readonly",
        after: "readonly",
        afterEach: "readonly",
      },
    },
  },

  prettierConfig,
];
