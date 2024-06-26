/// <reference types="cypress" />

import { USERS_BASE_URL } from "../../common/constants";

export function getAdminJwtTokenWithNoAuthHeader() {
  return cy.request({
    method: "GET",
    url: `${USERS_BASE_URL}/adminjwt`,
    failOnStatusCode: false,
  });
}

export function getAdminJwtTokenWithWrongKindOfAuthHeader() {
  return cy.request({
    method: "GET",
    url: `${USERS_BASE_URL}/adminjwt`,
    headers: {
      Authorization: "Bearer " + "dummy.jwt.token",
    },
    failOnStatusCode: false,
  });
}

export function getAdminJwtTokenWithBasicAuthHeader(username, password) {
  return cy.request({
    method: "GET",
    url: `${USERS_BASE_URL}/adminjwt`,
    headers: {
      Authorization: "Basic " + btoa(`${username}:${password}`),
    },
    failOnStatusCode: false,
  });
}
