/// <reference types="cypress" />

import { USERS } from "../../common/constants";
import { USERS_BASE_URL } from "../../common/constants";
import { getAdminJwtToken } from "../get-admin-jwt-token/requests";
import { login } from "../login/requests";

export function deleteSpecificUserWithNoAuthHeader() {
  return cy.request({
    method: "DELETE",
    url: `${USERS_BASE_URL}/specific/${USERS.JOE_BLOW.username}`,
    failOnStatusCode: false,
  });
}

export function deleteSpecificUserWithWrongKindOfAuthHeader() {
  return cy.request({
    method: "DELETE",
    url: `${USERS_BASE_URL}/specific/${USERS.JOE_BLOW.username}`,
    headers: {
      Authorization: "Basic " + btoa("username:password"),
    },
    failOnStatusCode: false,
  });
}

export function deleteSpecificUserWithInvalidJwtToken() {
  return cy.request({
    method: "DELETE",
    url: `${USERS_BASE_URL}/specific/${USERS.JOE_BLOW.username}`,
    headers: {
      Authorization: "Bearer " + "invalid.jwt.token",
    },
    failOnStatusCode: false,
  });
}

export function deleteSpecificUserWithValidButNonAdminJwtToken() {
  return login(USERS.JOHN_DOE.username, USERS.JOHN_DOE.password).then(
    (response) => {
      const nonAdminJwtToken = response.body.jwtToken;
      cy.request({
        method: "DELETE",
        url: `${USERS_BASE_URL}/specific/${USERS.JOE_BLOW.username}`,
        headers: {
          Authorization: `Bearer ${nonAdminJwtToken}`,
        },
        failOnStatusCode: false,
      });
    }
  );
}

export function deleteSpecificExistingUser() {
  return deleteSpecificUser(USERS.JOE_BLOW.username);
}

export function deleteSpecificNonExistentUser() {
  return deleteSpecificUser("isaac.newton");
}

export function deleteSpecificUser(username) {
  return getAdminJwtToken().then((response) => {
    const adminJwtToken = response.body.jwtToken;
    cy.request({
      method: "DELETE",
      url: `${USERS_BASE_URL}/specific/${username}`,
      headers: {
        Authorization: `Bearer ${adminJwtToken}`,
      },
      failOnStatusCode: false,
    });
  });
}
