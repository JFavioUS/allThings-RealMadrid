module.exports = {
  clearMocks: true,
  preset: "ts-jest",
  testEnvironment: "node",
  setupFilesAfterEnv: ["<rootDir>/test/global-setup.ts"],
  moduleNameMapper: {
    "^../utils/prisma$": "<rootDir>/test/__mocks__/prisma.ts",
  },
};
