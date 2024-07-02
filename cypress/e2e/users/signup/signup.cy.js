/// <reference types="cypress" />

import { deleteAllUsersWithValidAdminJwtToken } from "./requests";
import { expectAllUsersSuccessfullyDeletedResponse } from "./responses";

describe("Test the `POST /shorturl/users/signup` REST endpoint", () => {
  beforeEach(() => {
    deleteAllUsers();
  });

  // it("doesn't have an authorization header", () => {
  //   cy.task(
  //     "log",
  //     `====> jwtMinutesToLive = ${Cypress.env("jwtMinutesToLive")}`
  //   );
  //   deleteAllUsersWithNoAuthHeader().then((response) => {
  //     expectMissingBearerTokenAuthHeaderResponse(response);
  //   });
  // });

  // it("has the wrong kind of authorization header", () => {
  //   deleteAllUsersWithWrongKindOfAuthHeader().then((response) => {
  //     expectMissingBearerTokenAuthHeaderResponse(response);
  //   });
  // });

  // it("has an invalid JWT token", () => {
  //   deleteAllUsersWithInvalidJwtToken().then((response) => {
  //     expectInvalidJwtHeaderResponse(response);
  //   });
  // });

  // it("has a valid but non-admin JWT token", () => {
  //   deleteAllUsersWithValidButNonAdminJwtToken().then((response) => {
  //     expectInvalidAdminCredentialsResponse(response);
  //   });
  // });

  it("has a valid admin JWT token", () => {
    signupWithValidAdminJwtToken().then((response) => {
      expectAllUsersSuccessfullyDeletedResponse(response);
    });
  });
});
