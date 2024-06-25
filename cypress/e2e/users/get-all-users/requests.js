/// <reference types="cypress" />

import { USERS_BASE_URL } from "../../common/constants";

export function getAllUsersWithNoAuthHeader() {
  return cy.request({
    method: "GET",
    url: `${USERS_BASE_URL}/all`,
    failOnStatusCode: false,
  });
}

export function getAllUsersWithWrongKindOfAuthHeader() {
  return cy.request({
    method: "GET",
    url: `${USERS_BASE_URL}/all`,
    headers: {
      Authorization: "Basic " + btoa("username:password"),
    },
    failOnStatusCode: false,
  });
}

export function getAllUsersWithJwtToken(invalidJwtToken) {
  return cy.request({
    method: "GET",
    url: `${USERS_BASE_URL}/all`,
    headers: {
      Authorization: "Bearer " + invalidJwtToken,
    },
    failOnStatusCode: false,
  });
}
