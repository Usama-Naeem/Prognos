// eslint-disable-next-line no-undef
module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  settings: {
    react: {
      version: "detect", // React version. "detect" automatically picks the version you have installed.
    },
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "airbnb-base",
    "prettier",
  ],
  overrides: [],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["react"],
  rules: {
    quotes: [2, "double", { avoidEscape: true }],
    "no-nested-ternary": "off",
    "no-unneeded-ternary": "off",
    "no-unused-vars": "warn",
    "no-unused-expressions": "off",
    "object-shorthand": "off",
    camelcase: "error",
    "import/no-unresolved": [0, { caseSensitive: false }],
    "import/extensions": 0,
    "import/prefer-default-export": 0,
    "react/prop-types": 0,
    "no-use-before-define": "off",
    "consistent-return": "off",
    "no-inner-declarations": "off",
    "prefer-destructuring": "off",
    "import/no-named-as-default": 0,
    "no-underscore-dangle": 0,
    "dot-notation": "off",
    "no-undef": 0,
    allowNamedFunctions: 0,
  },
};
