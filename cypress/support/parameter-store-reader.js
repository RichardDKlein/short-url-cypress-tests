/// <reference types="cypress" />

// import { SSMClient, GetParameterCommand } from "@aws-sdk/client-ssm";
// const fs = require("fs");
// const path = require("path");

export class ParameterStoreReader {
  // static adminUsername;
  // static adminPassword;
  // static jwtMinutesToLive;
  // static jwtSecretKey;

  static async getAdminUsername() {
    // if (this.adminUsername === undefined) {
    //   console.log("Calling getParameter()...");
    //   this.adminUsername = await this.getParameter(
    //     "/shortUrl/users/adminUsername"
    //   );
    //   console.log("this.adminUsername = " + this.adminUsername);
    // }
    // return this.adminUsername;

    const fs = require("fs");

    const filePath = "/Users/richardklein/.aws/config"; // Replace with your actual file path

    try {
      const data = fs.readFileSync(filePath, "utf8");
      console.log("File content:");
      console.log(data);
    } catch (err) {
      console.error("Error reading file:", err);
    }
  }

  // static async getAdminPassword() {
  //   if (this.adminPassword === undefined) {
  //     this.adminPassword = await this.getParameter(
  //       "/shortUrl/users/adminPassword"
  //     );
  //   }
  //   return this.adminPassword;
  // }

  // static async getJwtMinutesToLive() {
  //   if (jwtMinutesToLive === undefined) {
  //     const parameterValue = await this.getParameter(
  //       "/shortUrl/users/jwtMinutesToLive"
  //     );
  //     this.jwtMinutesToLive = parseInt(parameterValue, 10);
  //   }
  //   return this.jwtMinutesToLive;
  // }

  // static async getJwtSecretKey() {
  //   if (this.jwtSecretKey === undefined) {
  //     this.jwtSecretKey = await this.getParameter(
  //       "/shortUrl/users/jwtSecretKey"
  //     );
  //   }
  //   return this.jwtSecretKey;
  // }

  // // Function to load and parse AWS configuration file
  // static loadAwsConfig = (configFilePath) => {
  //   console.log(`configFilePath = ${configFilePath}`);
  //   try {
  //     const configFileContent = fs.readFileSync(configFilePath, "utf-8");
  //     // Parse the contents of the config file (example assumes INI format)
  //     // Adjust parsing logic based on your specific needs (INI, JSON, etc.)
  //     const config = parseIni(configFileContent);
  //     return config;
  //   } catch (error) {
  //     console.error(
  //       `Error loading AWS config file from ${configFilePath}:`,
  //       error
  //     );
  //     throw error;
  //   }
  // };

  // // Function to load and parse AWS credentials file
  // static loadAwsCredentials = (credentialsFilePath) => {
  //   console.log(`credentalsFilePath = ${credentialsFilePath}`);
  //   try {
  //     const credentialsFileContent = fs.readFileSync(
  //       credentialsFilePath,
  //       "utf-8"
  //     );
  //     // Parse the contents of the credentials file (example assumes INI format)
  //     // Adjust parsing logic based on your specific needs (INI, JSON, etc.)
  //     const credentials = parseIni(credentialsFileContent);
  //     return credentials;
  //   } catch (error) {
  //     console.error(
  //       `Error loading AWS credentials file from ${credentialsFilePath}:`,
  //       error
  //     );
  //     throw error;
  //   }
  // };

  // static async getParameter(parameterName) {
  //   try {
  //     console.log(`process.env.HOME = ${process.env.HOME}`);
  //     // Example paths for AWS config and credentials files
  //     const awsConfigFilePath = path.join("~", ".aws", "config");
  //     const awsCredentialsFilePath = path.join("~", ".aws", "credentials");

  //     // Load AWS config and credentials
  //     const awsConfig = this.loadAwsConfig(awsConfigFilePath);
  //     const awsCredentials = this.loadAwsCredentials(awsCredentialsFilePath);

  //     // Example: Log loaded config and credentials
  //     console.log("Loaded AWS Config:", awsConfig);
  //     console.log("Loaded AWS Credentials:", awsCredentials);

  //     // Create SSMClient with loaded credentials and region
  //     const client = new SSMClient({
  //       awsConfig,
  //       awsCredentials,
  //     });

  //     const command = new GetParameterCommand({
  //       Name: parameterName,
  //       WithDecryption: true,
  //     });

  //     const response = await client.send(command);
  //     return response.Parameter.Value;
  //   } catch (error) {
  //     console.error(`Error fetching parameter ${parameterName}:`, error);
  //     throw error;
  //   }
  // }
}
