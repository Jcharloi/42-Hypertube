// Back end testing

module.exports = {
  name: "server",
  displayName: "Backend",
  rootDir: `${__dirname}/..`,
  testMatch: ["<rootDir>/server/__tests__/**.js"],
  preset: "@shelf/jest-mongodb",
  transform: {
    "^.+\\.js?$": "babel-jest"
  }
};
