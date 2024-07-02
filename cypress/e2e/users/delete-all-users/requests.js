/// <reference types="cypress" />

import { USERS_BASE_URL } from "../../common/constants";
import { getAdminJwtTokenWithBasicAuthHeader } from "../get-admin-jwt-token/requests";

export function deleteAllUsers() {
  deleteAllUsersWithValidAdminJwtToken();
}

export function deleteAllUsersWithValidAdminJwtToken() {
  getAdminJwtTokenWithBasicAuthHeader(
    Cypress.env("adminUsername"),
    Cypress.env("adminPassword")
  ).then((response) => {
    const adminJwtToken = response.body.jwtToken;
    return cy.request({
      method: "DELETE",
      url: `${USERS_BASE_URL}/all`,
      headers: {
        Authorization: "Bearer " + adminJwtToken,
      },
      failOnStatusCode: false,
    });
  });
}
