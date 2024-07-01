/// <reference types="cypress" />

import {
  deleteAllUsersWithInvalidJwtToken,
  deleteAllUsersWithValidButNonAdminJwtToken,
  deleteAllUsersWithNoAuthHeader,
  deleteAllUsersWithWrongKindOfAuthHeader,
} from "./requests";
import {
  expectInvalidJwtHeaderResponse,
  expectMissingBearerTokenAuthHeaderResponse,
} from "../../common/security/responses";
import { expectAllUsersSuccessfullyDeletedResponse } from "./responses";

describe("Test the `DELETE /shorturl/users/all` REST endpoint", () => {
  beforeEach(() => {
    deleteAllUsers();
  });

  it("doesn't have an authorization header", () => {
    cy.task(
      "log",
      `====> jwtMinutesToLive = ${Cypress.env("jwtMinutesToLive")}`
    );
    deleteAllUsersWithNoAuthHeader().then((response) => {
      expectMissingBearerTokenAuthHeaderResponse(response);
    });
  });

  it("has the wrong kind of authorization header", () => {
    deleteAllUsersWithWrongKindOfAuthHeader().then((response) => {
      expectMissingBearerTokenAuthHeaderResponse(response);
    });
  });

  it("has an invalid JWT token", () => {
    deleteAllUsersWithInvalidJwtToken().then((response) => {
      expectInvalidJwtHeaderResponse(response);
    });
  });

  it("has a valid but non-admin JWT token", () => {
    deleteAllUsersWithValidButNonAdminJwtToken().then((response) => {
      expectInvalidAdminCredentialsResponse(response);
    });
  });

  it("has a valid admin JWT token", () => {
    deleteAllUsersWithValidButNonAdminJwtToken().then((response) => {
      expectAllUsersSuccessfullyDeletedResponse(response);
    });
  });
});
