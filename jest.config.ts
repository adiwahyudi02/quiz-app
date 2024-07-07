const nextJest = require("next/jest");

// Providing the path to app which will enable loading next.config.js and .env files
const createJestConfig = nextJest({ dir: "./" });

const customJestConfig = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  testEnvironment: "<rootDir>/jsdom-extended.ts",
  // Next Line(s) is important! https://github.com/mswjs/msw/issues/1786#issuecomment-1782559851
  testEnvironmentOptions: {
    customExportConditions: [""],
  },
};

module.exports = createJestConfig(customJestConfig);
