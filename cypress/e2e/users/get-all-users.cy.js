/// <reference types="cypress" />

import { USER_HTTP_REQUESTS } from "./utilities/requests";
import { USERS } from "./utilities/users";
import {
  verifyMissingBearerTokenAuthHeader,
  verifyInvalidJwtException,
  verifyMustBeAdmin,
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
    const username = Cypress.env("adminUsername");
    const password = Cypress.env("adminPassword");
    cy.login(username, password).then((response) => {
      console.log(`username = ${username}, password = ${password}`);
      console.log("response.body = " + JSON.stringify(response.body));
      const jwtToken = response.body.jwtToken;
      const invalidJwtToken = jwtToken.substring(1);
      var request = { ...USER_HTTP_REQUESTS.GET_ALL_USERS_JWT_TOKEN };
      request.headers.Authorization = "Bearer " + invalidJwtToken;
      cy.request(request).then((response) => {
        verifyInvalidJwtException(response);
      });
    });
  });

  // it("is logged in as a user who is not an admin", () => {
  //   const username = USERS.JOHN_DOE.username;
  //   const password = USERS.JOHN_DOE.password;
  //   cy.login(username, password).then((response) => {
  //     const jwtToken = response.body.jwtToken;
  //     var request = { ...USER_HTTP_REQUESTS.GET_ALL_USERS_JWT_TOKEN };
  //     request.headers.Authorization = "Bearer " + jwtToken;
  //     cy.request(request).then((response) => {
  //       verifyMustBeAdmin(response);
  //     });
  //   });
  // });
});
