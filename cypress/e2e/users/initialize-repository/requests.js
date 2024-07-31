/// <reference types="cypress" />

import { USERS_BASE_URL } from "../../common/constants";

export function initializeRepositoryWithNoAuthHeader() {
  return cy.request({
    method: "POST",
    url: `${USERS_BASE_URL}/db-init`,
    failOnStatusCode: false,
  });
}

export function initializeRepositoryWithWrongKindOfAuthHeader() {
  return cy.request({
    method: "POST",
    url: `${USERS_BASE_URL}/db-init`,
    headers: {
      Authorization: "Bearer " + "dummy.jwt.token",
    },
    failOnStatusCode: false,
  });
}

export function initializeRepositoryWithInvalidAdminCredentials() {
  return initializeRepositoryWithBasicAuthHeader(
    "invalidAdminUsername",
    "invalidAdminPassword"
  );
}

export function initializeRepositoryWithValidAdminCredentials() {
  return initializeRepositoryWithBasicAuthHeader(
    Cypress.env("adminUsername"),
    Cypress.env("adminPassword")
  );
}

export function initializeRepositoryWithBasicAuthHeader(username, password) {
  return cy.request({
    method: "POST",
    url: `${USERS_BASE_URL}/db-init`,
    headers: {
      Authorization: "Basic " + btoa(`${username}:${password}`),
    },
    failOnStatusCode: false,
  });
}
