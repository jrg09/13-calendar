module.exports = {
  testEnvironment: "jest-environment-jsdom",
  setupFiles: ["./jest.setup.js"],
  transformIgnorePatterns: [],
  moduleNameMapper: {
    ".(css|sass|jpeg)$": "identity-obj-proxy",
    ".(svg)$": "/mocks/fileMock.js",
  },
};
