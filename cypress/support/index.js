import { SSMClient, GetParameterCommand } from "@aws-sdk/client-ssm";

// Do the following logic before running any tests.

before(() => {
  // Fetch the AWS region from the AWS config file.
  const awsConfigFilePath = `${Cypress.env("HOME")}/.aws/config`;
  cy.task("loadAwsConfig", awsConfigFilePath).then((awsConfig) => {
    Cypress.env("region", awsConfig.default.region);
    console.log("region = " + Cypress.env("region"));

    // Fetch the AWS credentials from the AWS credentials file.
    const awsCredentialsFilePath = `${Cypress.env("HOME")}/.aws/credentials`;
    cy.task("loadAwsCredentials", awsCredentialsFilePath).then(
      (awsCredentials) => {
        Cypress.env("awsCredentials", awsCredentials);

        // Create an AWS SSM client.
        const region = Cypress.env("region");
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
          Cypress.env("adminUsername", response.Parameter.Value);
          console.log("adminUserName = " + Cypress.env("adminUsername"));

          // Fetch the admin password from the Parameter Store.
          const command = new GetParameterCommand({
            Name: "/shortUrl/users/adminPassword",
            WithDecryption: true,
          });
          ssmClient.send(command).then((response) => {
            Cypress.env("adminPassword", response.Parameter.Value);
            console.log("adminPassword = " + Cypress.env("adminPassword"));
          });
        });
      }
    );
  });
});
