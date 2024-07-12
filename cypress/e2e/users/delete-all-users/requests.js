/// <reference types="cypress" />

import { USERS_BASE_URL, USERS } from "../../common/constants";
import { getAdminJwtTokenWithBasicAuthHeader } from "../get-admin-jwt-token/requests";
import { login } from "../login/requests";
import { expectSuccessResponse } from "./responses";

export function deleteAllUsersWithNoAuthHeader() {
  return cy.request({
    method: "DELETE",
    url: `${USERS_BASE_URL}/all`,
    failOnStatusCode: false,
  });
}

export function deleteAllUsersWithWrongKindOfAuthHeader() {
  return cy.request({
    method: "DELETE",
    url: `${USERS_BASE_URL}/all`,
    headers: {
      Authorization: "Basic " + btoa("username:password"),
    },
    failOnStatusCode: false,
  });
}

export function deleteAllUsersWithInvalidJwtToken() {
  return cy.request({
    method: "DELETE",
    url: `${USERS_BASE_URL}/all`,
    headers: {
      Authorization: "Bearer " + "invalid.jwt.token",
    },
    failOnStatusCode: false,
  });
}

export function deleteAllUsersWithValidButNonAdminJwtToken() {
  return login(USERS.JOHN_DOE.username, USERS.JOHN_DOE.password).then(
    (response) => {
      const nonAdminJwtToken = response.body.jwtToken;
      cy.request({
        method: "DELETE",
        url: `${USERS_BASE_URL}/all`,
        headers: {
          Authorization: `Bearer ${nonAdminJwtToken}`,
        },
        failOnStatusCode: false,
      });
    }
  );
}

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
  return deleteAllUsersWithValidAdminJwtToken();
}
