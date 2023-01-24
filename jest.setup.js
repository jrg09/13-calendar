// import "setimmediate";

require("dotenv").config({ path: ".env.test" });

jest.mock("./src/helpers/getEnvironments", () => ({
  getEnvironments: () => ({ ...process.env }),
}));
