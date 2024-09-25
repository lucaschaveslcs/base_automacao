/** @type {import('@jest/types').Config.InitialOptions} */
module.exports = {
  verbose: true,
  // preset: "jest-playwright-preset",
  // testEnvironmentOptions: {
  //   "jest-playwright": {
  //     browsers: ["chromium"],
  //     launchOptions: {
  //       headless: false,
  //     },
  //   },
  // },
  transform: {
    "^.+\\.ts$": "ts-jest",
  },
  clearMocks: true,
  // coverageProvider: "v8",
  // collectCoverage: true,
  transformIgnorePatterns: ["\\\\node_modules\\\\"],
  testMatch: ["**/*.test.ts"],
  testTimeout: 1200000,
  bail: 0,

  reporters: [
    "default",
    [
      "jest-html-reporters",
      {
        publicPath: "./html-report",
        filename: "report.html",
        expand: false,
      },
    ],
  ],
};