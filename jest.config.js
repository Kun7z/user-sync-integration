module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",

  testMatch: ["**/__tests__/**/*.spec.ts", "**/*.spec.ts", "**/*.test.ts"],

  moduleFileExtensions: ["ts", "js", "json"],

  clearMocks: true,
  restoreMocks: true,

  coverageDirectory: "coverage",
};
