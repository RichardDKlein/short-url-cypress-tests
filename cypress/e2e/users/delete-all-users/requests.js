/// <reference types="cypress" />

import { USERS_BASE_URL } from "../../common/constants";
import { getAdminJwtTokenWithBasicAuthHeader } from "../get-admin-jwt-token/requests";
import { expectAllUsersSuccessfullyDeletedResponse } from "./responses";

export function deleteAllUsersWithValidAdminJwtToken() {
  return getAdminJwtTokenWithBasicAuthHeader(
    Cypress.env("adminUsername"),
    Cypress.env("adminPassword")
  ).then((response) => {
    const adminJwtToken = response.body.jwtToken;
    cy.request({
      method: "DELETE",
      url: `${USERS_BASE_URL}/all`,
      headers: {
        Authorization: "Bearer " + adminJwtToken,
      },
      failOnStatusCode: false,
    });
  });
}

export function deleteAllUsers() {
  return deleteAllUsersWithValidAdminJwtToken().then((response) => {
    expectAllUsersSuccessfullyDeletedResponse(response);
  });
}
