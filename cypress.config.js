// npx cypress run --record --key 51e42f93-e470-4b70-a2be-25c86e017030
const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    projectId: "a9wq9v",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
