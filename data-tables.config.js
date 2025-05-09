const { defineConfig } = require("cypress");
const baseConfig = require("./cypress.config");

module.exports = defineConfig({
  ...baseConfig,
  viewportWidth: 850,
  viewportWidth: 650,

  e2e: {
    ...baseConfig.e2e,
    baseUrl: "https://datatables.net/",
  },
  env: {
    

  }
});