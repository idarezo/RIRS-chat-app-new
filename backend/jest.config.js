module.exports = {
  testEnvironment: "node",
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageReporters: ["text", "lcov", "html"],

  testMatch: ["**/tests/**/*.tests.js"],

  //setupFilesAfterEnv: ['<rootDir>/setupTests.js'], // <--- dodano

  collectCoverageFrom: [
    "**/*.js",
    "!**/node_modules/**",
    "!**/coverage/**",
    "!**/tests/**",
    "!**/jest.config.js",
    "!**/server.js",
    "!**/app.js",
    "!**/index.js",
  ],

  testPathIgnorePatterns: ["/node_modules/"],

  verbose: true,
  testEnvironmentOptions: {
    NODE_ENV: "test",
  },
  moduleFileExtensions: ["js", "json"],
  moduleDirectories: ["node_modules", "src"],
};
