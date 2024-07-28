import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";


export default [
  {files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"]},
  {languageOptions: { globals: globals.browser }},
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  {
    settings: {
      react: {
        version: "detect", // Automatically detect the React version
      },
    },
    rules: {
      "react/react-in-jsx-scope": "off",
      "@typescript-eslint/ban-ts-comment": 'off',
      "no-var": "off",
      "@typescript-eslint/no-var-requires": "off",
      "no-undef": "off",
      '@typescript-eslint/ban-types': 'off',
      'react/no-unstable-nested-components': 'off',
      'react-native/no-inline-styles': 'off',
      '@typescript-eslint/no-namespace': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-non-null-asserted-optional-chain': 'off',
      "semi": [1, "always"],
      "indent": [1, 2],
    }
  }
];
