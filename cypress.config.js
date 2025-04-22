// npx cypress run --record --key 51e42f93-e470-4b70-a2be-25c86e017030
const { defineConfig } = require("cypress");
const {
  beforeRunHook,
  afterRunHook,
} = require("cypress-mochawesome-reporter/lib");

module.exports = defineConfig({
  projectId: "a9wq9v",
  experimentalStudio: true,
  reporter: "cypress-mochawesome-reporter",
  retries: 6,

  reporterOptions: {
    charts: true,
    reportPageTitle: "custom-title",
    embeddedScreenshots: true,
    inlineAssets: true,
    saveAllAttempts: false,
  },

  env: {
    projectName: process.env.PROJECT_NAME || "Cypress Test Automation",
    environment: process.env.ENVIRONMENT || "QA",
    API_KEY: process.env.API_KEY,
    API_BASE_URL: process.env.API_BASE_URL || 'https://petstore.swagger.io/v2',
  },

  e2e: {
    //baseUrl: 'https://parabank.parasoft.com/parabank', // Replace with your base URL
    setupNodeEvents(on, config) {

      on("before:run", async (details) => {
        console.log("override before:run");
        console.log("Running tests");
        await beforeRunHook(details);
      });
      on("after:run", async () => {
        console.log("override after:run");
        await afterRunHook();
      });
    },
  },

});
