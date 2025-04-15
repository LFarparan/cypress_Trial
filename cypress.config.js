// npx cypress run --record --key 51e42f93-e470-4b70-a2be-25c86e017030
const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: "a9wq9v",
  experimentalStudio: true,
  reporter: "cypress-mochawesome-reporter",

  reporterOptions: {
    charts: true,
    reportPageTitle: "custom-title",
    embeddedScreenshots: true,
    inlineAssets: true,
    saveAllAttempts: false,
    e2e: {
      //baseUrl: 'https://parabank.parasoft.com/parabank', // Replace with your base URL
      setupNodeEvents(on, config) {
        const {
          beforeRunHook,
          afterRunHook,
        } = require("cypress-mochawesome-reporter/lib");
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
  },

  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
