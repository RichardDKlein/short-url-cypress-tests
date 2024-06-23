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

export function loginAsAdmin() {
  return login(Cypress.env("adminUsername"), Cypress.env("adminPassword"));
}

export function login(username, password) {
  return cy.request({
    method: "POST",
    url: `${USERS_BASE_URL}/login`,
    body: { username, password },
    failOnStatusCode: false,
  });
}

export const USER_HTTP_REQUESTS = {
  GET_ALL_USERS_JWT_TOKEN: {
    method: "GET",
    url: `${USERS_BASE_URL}/all`,
    headers: {
      Authorization: "Bearer <jwtToken>",
    },
    failOnStatusCode: false,
  },
  LOGIN: {},
};
