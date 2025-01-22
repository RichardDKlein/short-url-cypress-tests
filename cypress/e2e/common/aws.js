/// <reference types="cypress" />

import {
  SSMClient,
  GetParameterCommand,
  PutParameterCommand,
} from "@aws-sdk/client-ssm";

export function getAwsRegion() {
  const awsConfigFilePath = `${Cypress.env("HOME")}/.aws/config`;
  return cy.task("loadAwsConfig", awsConfigFilePath).then((awsConfig) => {
    const region = awsConfig.default.region;
    return region;
  });
}

export function createSsmClient(region) {
  const awsCredentialsFilePath = `${Cypress.env("HOME")}/.aws/credentials`;
  return cy
    .task("loadAwsCredentials", awsCredentialsFilePath)
    .then((awsCredentials) => {
      const ssmClient = new SSMClient({
        region,
        credentials: {
          accessKeyId: awsCredentials.default.aws_access_key_id,
          secretAccessKey: awsCredentials.default.aws_secret_access_key,
        },
      });
      return ssmClient;
    });
}

export function getAdminUsername(ssmClient) {
  const command = new GetParameterCommand({
    Name: "/shortUrl/users/adminUsername",
    WithDecryption: true,
  });
  return cy.wrap(ssmClient.send(command)).then((response) => {
    return response.Parameter.Value;
  });
}

export function getAdminPassword(ssmClient) {
  const command = new GetParameterCommand({
    Name: "/shortUrl/users/adminPassword",
    WithDecryption: true,
  });
  return cy.wrap(ssmClient.send(command)).then((response) => {
    return response.Parameter.Value;
  });
}

export function getJwtMinutesToLiveTest(ssmClient) {
  const command = new GetParameterCommand({
    Name: "/shortUrl/users/jwtMinutesToLiveTest",
    WithDecryption: true,
  });
  return cy.wrap(ssmClient.send(command)).then((response) => {
    return response.Parameter.Value;
  });
}

export function setJwtMinutesToLiveTest(ssmClient, jwtMinutesToLiveTest) {
  cy.log(`Setting the JWT minutes to live to ${jwtMinutesToLiveTest}`);
  const command = new PutParameterCommand({
    Name: "/shortUrl/users/jwtMinutesToLiveTest",
    Value: jwtMinutesToLiveTest.toString(),
    Type: "String",
    Overwrite: true,
  });
  return cy.wrap(ssmClient.send(command)).then(() => {
    return jwtMinutesToLiveTest;
  });
}

export function getShortUrlRange(ssmClient) {
  const command = new GetParameterCommand({
    Name: "/shortUrl/reservations/range",
    WithDecryption: true,
  });
  return cy.wrap(ssmClient.send(command)).then((response) => {
    const range = response.Parameter.Value;
    return range.split(",").map((n) => parseInt(n.trim(), 10));
  });
}
