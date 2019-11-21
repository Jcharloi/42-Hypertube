// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {
  name: "client",
  displayName: "Frontend",
  rootDir: `${__dirname}/..`,
  moduleNameMapper: {
    "\\.(css|less)$": "identity-obj-proxy"
  },
  testMatch: [
    "<rootDir>/client/__tests__/*.tsx",
    "<rootDir>/client/__tests__/*.ts"
  ],
  transform: {
    "^.+\\.ts?$": "ts-jest",
    "^.+\\.tsx?$": "ts-jest"
  }
};
