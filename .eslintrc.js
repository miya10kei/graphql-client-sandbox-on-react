module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true
  },
  extends: [
    "airbnb-base",
    "plugin:react/recommended",
    "plugin:prettier/recommended"
  ],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly"
  },
  parserOptions: {
    ecmaVersion: 2018
  },
  plugins: ["react", "import", "jsx-a11y"],
  rules: {
    "react/jsx-filename-extension": [1, { extensions: [".js", ".jsx"] }],
    "prettier/prettier": [
      "error",
      {
        printWidth: 120,
        singleQuote: true,
        semi: false
      }
    ]
  }
};
