before(() => {
  const awsConfigFilePath = "/Users/richardklein/.aws/config";
  const awsCredentialsFilePath = "/Users/richardklein/.aws/credentials";

  cy.task("loadAwsConfig", awsConfigFilePath).then((awsConfig) => {
    console.log("Loaded AWS Config:", awsConfig);
    Cypress.env("awsConfig", awsConfig);
  });

  cy.task("loadAwsCredentials", awsCredentialsFilePath).then(
    (awsCredentials) => {
      console.log("Loaded AWS Credentials:", awsCredentials);
      Cypress.env("awsCredentials", awsCredentials);
    }
  );
});
