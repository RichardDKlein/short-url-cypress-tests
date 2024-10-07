/// <reference types="cypress" />

import { MAPPINGS_BASE_URL } from "../../common/constants";
import { getAdminJwtToken } from "../../users/get-admin-jwt-token/requests";

export function getAllMappingsWithValidAdminJwtToken() {
  return getAdminJwtToken().then((response) => {
    const adminJwtToken = response.body.jwtToken;
    getAllMappingsWithSpecifiedAdminJwtToken(adminJwtToken);
  });
}

export function getAllMappingsWithSpecifiedAdminJwtToken(adminJwtToken) {
  return cy.request({
    method: "GET",
    url: `${MAPPINGS_BASE_URL}/get-mappings`,
    body: {
      username: "*",
      shortUrl: "*",
      longUrl: "*",
    },
    headers: {
      Authorization: `Bearer ${adminJwtToken}`,
    },
    failOnStatusCode: false,
  });
}

export function getAllMappings() {
  return getAllMappingsWithValidAdminJwtToken();
}
