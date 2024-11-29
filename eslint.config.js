module.exports = [
  {
    files: ["**/*.js"], // Ensure this matches the files you want to lint
    languageOptions: {
      ecmaVersion: 2022, // Adjust based on your project's JavaScript version
      sourceType: "module", // Use "script" if not using ES modules
    },
    rules: {
      semi: ["error", "always"],
      quotes: ["error", "double"],
      "no-unused-vars": "warn",
    },
  },
];
