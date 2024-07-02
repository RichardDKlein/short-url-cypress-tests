/// <reference types="cypress" />

import { USERS_BASE_URL } from "../../common/constants";
import { getAdminJwtToken } from "../get-admin-jwt-token/requests";

export function loginAsAdmin() {
  return login(Cypress.env("adminUsername"), Cypress.env("adminPassword"));
}

export function login(username, password) {
  return getAdminJwtToken().then((response) => {
    const adminJwtToken = response.body.jwtToken;
    return cy.request({
      method: "POST",
      url: `${USERS_BASE_URL}/login`,
      body: { username, password },
      headers: {
        Authorization: "Bearer " + adminJwtToken,
      },
      failOnStatusCode: false,
    });
  });
}
