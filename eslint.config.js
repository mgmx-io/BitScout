const { defineConfig } = require("eslint/config");
const expo = require("eslint-config-expo/flat");
const prettier = require("eslint-plugin-prettier/recommended");
const tanstack = require("@tanstack/eslint-plugin-query");
const jest = require("eslint-plugin-jest");

module.exports = defineConfig([
  expo,
  prettier,
  jest,
  ...tanstack.configs["flat/recommended"],
  {
    ignores: ["dist/*"],
    rules: {
      "@typescript-eslint/no-empty-object-type": "off",
    },
  },
]);
