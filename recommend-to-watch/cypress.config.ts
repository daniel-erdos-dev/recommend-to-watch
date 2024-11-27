import { defineConfig } from "cypress";
import { URL } from "./cypress/e2e/e2eHelpers";

export default defineConfig({
  e2e: {
    baseUrl: URL,
    supportFile: false,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
