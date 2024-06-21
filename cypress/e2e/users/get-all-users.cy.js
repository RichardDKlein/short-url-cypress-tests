/// <reference types="cypress" />

import { login } from "./utilities/login";
import { USER_HTTP_REQUESTS } from "./utilities/requests";
import {
  verifyMissingBearerTokenAuthHeader,
  verifyInvalidJwtException,
} from "../utilities/verify";

describe("Test the `GET /shorturl/users/all` REST endpoint", () => {
  beforeEach(() => {});

  it("doesn't have an authorization header", () => {
    cy.request(USER_HTTP_REQUESTS.GET_ALL_USERS_NO_AUTH_HEADER).then(
      (response) => verifyMissingBearerTokenAuthHeader(response)
    );
  });

  it("has the wrong kind of authorization header", () => {
    cy.request(USER_HTTP_REQUESTS.GET_ALL_USERS_WRONG_KIND_OF_AUTH_HEADER).then(
      (response) => verifyMissingBearerTokenAuthHeader(response)
    );
  });

  it("has an invalid JWT token", () => {
    const adminUsername = Cypress.env("adminUsername");
    const adminPassword = Cypress.env("adminPassword");
    login(adminUsername, adminPassword).then((response) => {
      const jwtToken = response.body.jwtToken;
      const invalidJwtToken = jwtToken.substring(1);
      var request = { ...USER_HTTP_REQUESTS.GET_ALL_USERS_INVALID_JWT_TOKEN };
      request.headers.Authorization = "Bearer " + invalidJwtToken;
      cy.request(request).then((response) => {
        verifyInvalidJwtException(response);
      });
    });
  });
});
