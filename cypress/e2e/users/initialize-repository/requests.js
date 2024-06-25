/// <reference types="cypress" />

import { USERS_BASE_URL } from "../../common/constants";

export function initializeRepositoryWithNoAuthHeader() {
  return cy.request({
    method: "POST",
    url: `${USERS_BASE_URL}/dbinit`,
    failOnStatusCode: false,
  });
}

export function initializeRepositoryWithWrongKindOfAuthHeader() {
  return cy.request({
    method: "POST",
    url: `${USERS_BASE_URL}/dbinit`,
    headers: {
      Authorization: "Bearer " + "dummy.jwt.token",
    },
    failOnStatusCode: false,
  });
}

export function initializeRepositoryWithBasicAuthHeader(username, password) {
  return cy.request({
    method: "POST",
    url: `${USERS_BASE_URL}/dbinit`,
    headers: {
      Authorization: "Basic " + btoa(`${username}:${password}`),
    },
    failOnStatusCode: false,
  });
}
