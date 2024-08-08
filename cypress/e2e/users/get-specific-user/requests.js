/// <reference types="cypress" />

import { USERS } from "../../common/constants";
import { USERS_BASE_URL } from "../../common/constants";
import { getAdminJwtToken } from "../get-admin-jwt-token/requests";
import { login } from "../login/requests";

export function getSpecificUserWithNoAuthHeader() {
  return cy.request({
    method: "GET",
    url: `${USERS_BASE_URL}/specific/${USERS.JOE_BLOW.username}`,
    failOnStatusCode: false,
  });
}

export function getSpecificUserWithWrongKindOfAuthHeader() {
  return cy.request({
    method: "GET",
    url: `${USERS_BASE_URL}/specific/${USERS.JOE_BLOW.username}`,
    headers: {
      Authorization: "Basic " + btoa("username:password"),
    },
    failOnStatusCode: false,
  });
}

export function getSpecificUserWithInvalidJwtToken() {
  return cy.request({
    method: "GET",
    url: `${USERS_BASE_URL}/specific/${USERS.JOE_BLOW.username}`,
    headers: {
      Authorization: "Bearer " + "invalid.jwt.token",
    },
    failOnStatusCode: false,
  });
}

export function getSpecificUserWithValidButNonAdminJwtToken() {
  return login(USERS.JOHN_DOE.username, USERS.JOHN_DOE.password).then(
    (response) => {
      const nonAdminJwtToken = response.body.jwtToken;
      cy.request({
        method: "GET",
        url: `${USERS_BASE_URL}/specific/${USERS.JOE_BLOW.username}`,
        headers: {
          Authorization: `Bearer ${nonAdminJwtToken}`,
        },
        failOnStatusCode: false,
      });
    }
  );
}

export function getSpecificUserForNonExistentUser() {
  return getSpecificUser("isaac.newton");
}

export function getSpecificUserForAnExistingUser() {
  return getSpecificUser(USERS.JOE_BLOW.username);
}

export function getSpecificUser(username) {
  return getAdminJwtToken().then((response) => {
    const adminJwtToken = response.body.jwtToken;
    cy.request({
      method: "GET",
      url: `${USERS_BASE_URL}/specific/${username}`,
      headers: {
        Authorization: `Bearer ${adminJwtToken}`,
      },
      failOnStatusCode: false,
    });
  });
}
