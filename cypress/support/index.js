import {
  createSsmClient,
  getAdminUsername,
  getAdminPassword,
  getAwsRegion,
  getJwtSecretKey,
  getJwtMinutesToLive,
} from "../e2e/common/aws";
import { GetParameterCommand } from "@aws-sdk/client-ssm";

// Do the following logic before running any tests.

before(() => {
  getAwsRegion().then((region) => {
    Cypress.env("region", region);
    createSsmClient(region).then((ssmClient) => {
      getAdminUsername(ssmClient).then((adminUsername) => {
        Cypress.env("adminUsername", adminUsername);
        getAdminPassword(ssmClient).then((adminPassword) => {
          Cypress.env("adminPassword", adminPassword);
          getJwtSecretKey(ssmClient).then((jwtSecretKey) => {
            Cypress.env("jwtSecretKey", jwtSecretKey);
            getJwtMinutesToLive(ssmClient).then((jwtMinuesToLive) => {
              Cypress.env("jwtMinutesToLive", jwtMinuesToLive);
            });
          });
        });
      });
    });
  });
});
