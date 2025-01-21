import {
  createSsmClient,
  getAdminUsername,
  getAdminPassword,
  getAwsRegion,
  getShortUrlRange,
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
          getShortUrlRange(ssmClient).then(
            ([minShortUrlBase10, maxShortUrlBase10]) => {
              Cypress.env("minShortUrlBase10", minShortUrlBase10);
              Cypress.env("maxShortUrlBase10", maxShortUrlBase10);
            }
          );
        });
      });
    });
  });
});
