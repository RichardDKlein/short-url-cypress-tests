/// <reference types="cypress" />

import { MAPPINGS_BASE_URL } from "../../common/constants";
import { getAdminJwtTokenWithBasicAuthHeader } from "../../users/get-admin-jwt-token/requests";

export function deleteAllMappingsWithValidAdminJwtToken() {
  return getAdminJwtTokenWithBasicAuthHeader(
    Cypress.env("adminUsername"),
    Cypress.env("adminPassword")
  ).then((response) => {
    const adminJwtToken = response.body.jwtToken;
    cy.request({
      method: "DELETE",
      url: `${MAPPINGS_BASE_URL}/delete-mappings`,
      headers: {
        Authorization: "Bearer " + adminJwtToken,
      },
      body: {
        username: "*",
        shortUrl: "*",
        longUrl: "*",
      },
      failOnStatusCode: false,
    });
  });
}

export function deleteAllMappings() {
  return deleteAllMappingsWithValidAdminJwtToken();
}
