const { defineConfig } = require("cypress");
const fs = require("fs");
const ini = require("ini");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      on("task", {
        loadAwsConfig(configFilePath) {
          console.log(`Loading AWS config file from: ${configFilePath}`);
          try {
            const configFileContent = fs.readFileSync(configFilePath, "utf-8");
            const config = ini.parse(configFileContent);
            return config;
          } catch (error) {
            console.error(
              `Error loading AWS config file from ${configFilePath}:`,
              error
            );
            throw error;
          }
        },
        loadAwsCredentials(credentialsFilePath) {
          console.log(
            `Loading AWS credentials file from: ${credentialsFilePath}`
          );
          try {
            const credentialsFileContent = fs.readFileSync(
              credentialsFilePath,
              "utf-8"
            );
            const credentials = ini.parse(credentialsFileContent);
            return credentials;
          } catch (error) {
            console.error(
              `Error loading AWS credentials file from ${credentialsFilePath}:`,
              error
            );
            throw error;
          }
        },
      });
      return config;
    },
    supportFile: "cypress/support/index.js",
  },
});
