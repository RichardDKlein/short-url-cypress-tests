/// <reference types="cypress" />

import {
  BASE_URL,
  HTTP_STATUS,
  STATUS_MESSAGES,
} from "../../support/constants";

describe("Test the `GET /shorturl/users/all` REST endpoint", () => {
  beforeEach(() => {});

  it("doesn't include an authorization header", () => {
    cy.request({
      method: "GET",
      url: `${BASE_URL}/all`,
      failOnStatusCode: false,
    }).then((response) => {
      cy.log(JSON.stringify(response.body));
      expect(response.status).to.eq(HTTP_STATUS.UNAUTHORIZED);
      expect(response.body).to.have.property(
        "status",
        "MISSING_AUTHORIZATION_HEADER"
      );
      expect(response.body).to.have.property(
        "message",
        STATUS_MESSAGES.MISSING_BEARER_TOKEN_AUTH_HEADER
      );
    });
  });
});
