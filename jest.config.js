module.exports = {
  roots: [
    "./src",
    "./test",
  ],
  moduleFileExtensions: [
    "js",
    "html",
    "htm",
    "css",
  ],
  reporters: ["default"],
  transform: {
    "^.+\\.js$": "babel-jest",
  },
  clearMocks: true,
  coverageProvider: "v8",
  coverageReporters: [
    "json-summary",
  ],
  testEnvironment: "jest-environment-jsdom",
};
