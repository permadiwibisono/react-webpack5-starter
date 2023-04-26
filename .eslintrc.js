module.exports = {
  env: {
    node: true,
    browser: true,
    es2021: true
  },
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module"
  },
  settings: {
    react: {
      version: "detect"
    }
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:prettier/recommended"
  ],
  plugins: ["react"]
};
