const { defineConfig } = require("cypress");
const fs = require("fs");
const ini = require("ini");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      on("task", {
        // Define a task to load the AWS config from the specified path.
        loadAwsConfig(awsConfigFilePath) {
          console.log(`Loading AWS config file from: ${awsConfigFilePath}`);
          try {
            const awsConfigFileContent = fs.readFileSync(
              awsConfigFilePath,
              "utf-8"
            );
            const awsConfig = ini.parse(awsConfigFileContent);
            return awsConfig;
          } catch (error) {
            console.error(
              `Error loading AWS config file from ${awsConfigFilePath}:`,
              error
            );
            throw error;
          }
        },

        // Define a task to load the AWS credentials from the specifie path.
        loadAwsCredentials(awsCredentialsFilePath) {
          console.log(
            `Loading AWS credentials file from: ${awsCredentialsFilePath}`
          );
          try {
            const awsCredentialsFileContent = fs.readFileSync(
              awsCredentialsFilePath,
              "utf-8"
            );
            const awsCredentials = ini.parse(awsCredentialsFileContent);
            return awsCredentials;
          } catch (error) {
            console.error(
              `Error loading AWS credentials file from ${awsCredentialsFilePath}:`,
              error
            );
            throw error;
          }
        },
      });

      // Set the HOME environment variable.
      config.env.HOME = process.env.HOME;

      return config;
    },
    // The Cypress commands contained in the following file
    // will be executed first.
    supportFile: "cypress/support/index.js",
  },
});
