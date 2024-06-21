import "./commands";
import { SSMClient, GetParameterCommand } from "@aws-sdk/client-ssm";

// Do the following logic before running any tests.

before(() => {
  // Fetch the AWS region from the AWS config file.
  const awsConfigFilePath = `${Cypress.env("HOME")}/.aws/config`;
  cy.task("loadAwsConfig", awsConfigFilePath).then((awsConfig) => {
    const region = awsConfig.default.region;
    Cypress.env("region", region);
    console.log("region = " + region);

    // Fetch the AWS credentials from the AWS credentials file.
    const awsCredentialsFilePath = `${Cypress.env("HOME")}/.aws/credentials`;
    cy.task("loadAwsCredentials", awsCredentialsFilePath).then(
      (awsCredentials) => {
        console.log("awsCredentials = " + JSON.stringify(awsCredentials));

        // Create an AWS SSM client.
        const ssmClient = new SSMClient({
          region,
          credentials: {
            accessKeyId: awsCredentials.default.aws_access_key_id,
            secretAccessKey: awsCredentials.default.aws_secret_access_key,
          },
        });

        // Fetch the admin username from the Parameter Store.
        const command = new GetParameterCommand({
          Name: "/shortUrl/users/adminUsername",
          WithDecryption: true,
        });
        ssmClient.send(command).then((response) => {
          const adminUsername = response.Parameter.Value;
          Cypress.env("adminUsername", adminUsername);
          console.log("adminUsername = " + adminUsername);

          // Fetch the admin password from the Parameter Store.
          const command = new GetParameterCommand({
            Name: "/shortUrl/users/adminPassword",
            WithDecryption: true,
          });
          ssmClient.send(command).then((response) => {
            const adminPassword = response.Parameter.Value;
            Cypress.env("adminPassword", adminPassword);
            console.log("adminPassword = " + adminPassword);
          });
        });
      }
    );
  });
  // Give the `Cypress.env()` writes some time to settle.
  cy.wait(1000);
});
