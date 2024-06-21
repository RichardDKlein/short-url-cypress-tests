/// <reference types="cypress" />

import { HTTP_REQUESTS } from "../../support/requests";
import { verifyMissingBearerTokenAuthHeader } from "../../support/verify";

describe("Test the `GET /shorturl/users/all` REST endpoint", () => {
  beforeEach(() => {});

  it("doesn't have an authorization header", () => {
    cy.request(HTTP_REQUESTS.GET_ALL_USERS_NO_AUTH_HEADER).then((response) =>
      verifyMissingBearerTokenAuthHeader(response)
    );
  });

  it("has the wrong kind of authorization header", () => {
    cy.request(HTTP_REQUESTS.GET_ALL_USERS_WRONG_KIND_OF_AUTH_HEADER).then(
      (response) => verifyMissingBearerTokenAuthHeader(response)
    );
  });

  it("has an invalid JWT token", () => {
    cy.log("global.adminUsername = " + global.adminUsername);
    // Promise.all([USERS.ADMIN.username, USERS.ADMIN.password]).then(
    //   ([username, password]) => {
    //     login(username, password).then((jwtToken) => {
    //       cy.log("jwtToken = " + jwtToken);
    //       const invalidJwtToken = jwtToken.substring(1);
    //       HTTP_REQUESTS.GET_ALL_USERS_INVALID_JWT_TOKEN.headers.Authorization =
    //         "Bearer " + invalidJwtToken;
    //       cy.request(HTTP_REQUESTS.GET_ALL_USERS_INVALID_JWT_TOKEN).then(
    //         (response) => verifyInvalidJwtToken(response)
    //       );
    //     });
    //   }
    // );
  });
});
