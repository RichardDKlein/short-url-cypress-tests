/// <reference types="cypress" />

import { USERS_BASE_URL } from "../../common/constants";

export function loginAsAdmin() {
  return loginWithValidUserCredentials(
    Cypress.env("adminUsername"),
    Cypress.env("adminPassword")
  );
}

export function loginWithValidUserCredentials(username, password) {
  return cy.request({
    method: "POST",
    url: `${USERS_BASE_URL}/login`,
    body: { username, password },
    failOnStatusCode: false,
  });
}
