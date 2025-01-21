/// <reference types="cypress" />

import { USERS_BASE_URL } from "../../common/constants";

export function getJwtMinutesToLiveTestWithNoAuthHeader() {
  return cy.request({
    method: "GET",
    url: `${USERS_BASE_URL}/jwt-minutes-to-live-test`,
    failOnStatusCode: false,
  });
}

export function getJwtMinutesToLiveTestWithWrongKindOfAuthHeader() {
  return cy.request({
    method: "GET",
    url: `${USERS_BASE_URL}/jwt-minutes-to-live-test`,
    headers: {
      Authorization: "Bearer " + "dummy.jwt.token",
    },
    failOnStatusCode: false,
  });
}

export function getJwtMinutesToLiveTestWithInvalidAdminCredentials() {
  return getJwtMinutesToLiveTestWithBasicAuthHeader(
    "invalidUsername",
    "invalidPassword"
  );
}

export function getJwtMinutesToLiveTestWithValidAdminCredentials() {
  return getJwtMinutesToLiveTestWithBasicAuthHeader(
    Cypress.env("adminUsername"),
    Cypress.env("adminPassword")
  );
}

export function getJwtMinutesToLiveTestWithBasicAuthHeader(username, password) {
  return cy.request({
    method: "GET",
    url: `${USERS_BASE_URL}/jwt-minutes-to-live-test`,
    headers: {
      Authorization: "Basic " + btoa(`${username}:${password}`),
    },
    failOnStatusCode: false,
  });
}

export function getJwtMinutesToLiveTest() {
  return getJwtMinutesToLiveTestWithValidAdminCredentials();
}
