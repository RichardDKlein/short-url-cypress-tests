/// <reference types="cypress" />

import { USERS_BASE_URL, USERS } from "../../common/constants";
import { getAdminJwtToken } from "../get-admin-jwt-token/requests";
import { getAllUsers } from "../get-all-users/requests";

export function loginWithNoAuthHeader() {
  return cy.request({
    method: "POST",
    url: `${USERS_BASE_URL}/login`,
    body: {
      username: "isaac.newton",
      password: "isaac.newton.password",
    },
    failOnStatusCode: false,
  });
}

export function loginWithWrongKindOfAuthHeader() {
  return cy.request({
    method: "POST",
    url: `${USERS_BASE_URL}/login`,
    body: {
      username: "isaac.newton",
      password: "isaac.newton.password",
    },
    headers: {
      Authorization: "Basic " + btoa("username:password"),
    },
    failOnStatusCode: false,
  });
}

export function loginWithInvalidJwtToken() {
  return cy.request({
    method: "POST",
    url: `${USERS_BASE_URL}/login`,
    body: {
      username: "isaac.newton",
      password: "isaac.newton.password",
    },
    headers: {
      Authorization: "Bearer " + "invalid.jwt.token",
    },
    failOnStatusCode: false,
  });
}

export function loginWithValidButNonAdminJwtToken() {
  return login(USERS.JOHN_DOE.username, USERS.JOHN_DOE.password).then(
    (response) => {
      const nonAdminJwtToken = response.body.jwtToken;
      cy.request({
        method: "POST",
        url: `${USERS_BASE_URL}/login`,
        body: {
          username: "isaac.newton",
          password: "isaac.newton.password",
        },
        headers: {
          Authorization: `Bearer ${nonAdminJwtToken}`,
        },
        failOnStatusCode: false,
      });
    }
  );
}

export function loginWithMissingUsername() {
  return getAdminJwtToken().then((response) => {
    const adminJwtToken = response.body.jwtToken;
    cy.request({
      method: "POST",
      url: `${USERS_BASE_URL}/login`,
      body: {
        password: "isaac.newton.password",
      },
      headers: {
        Authorization: `Bearer ${adminJwtToken}`,
      },
      failOnStatusCode: false,
    });
  });
}

export function loginWithMissingPassword() {
  return getAdminJwtToken().then((response) => {
    const adminJwtToken = response.body.jwtToken;
    cy.request({
      method: "POST",
      url: `${USERS_BASE_URL}/login`,
      body: {
        username: "isaac.newton",
      },
      headers: {
        Authorization: `Bearer ${adminJwtToken}`,
      },
      failOnStatusCode: false,
    });
  });
}

export function loginNonExistentUser(username, password) {
  return login(username, password);
}

export function loginExistingUser() {
  return getAdminJwtToken().then((response) => {
    const adminJwtToken = response.body.jwtToken;
    getAllUsers().then((response) => {
      const actualUsers = response.body.shortUrlUsers;
      const cannedUsers = Object.entries(USERS);
      let existingUsername;
      let existingPassword;
      actualUsers.forEach((actualUser) => {
        if (actualUser.role == "ADMIN") {
          return;
        }
        for (var [key, cannedUser] of cannedUsers) {
          if (actualUser.username == cannedUser.username) {
            existingUsername = cannedUser.username;
            existingPassword = cannedUser.password;
            return;
          }
        }
      });
      cy.request({
        method: "POST",
        url: `${USERS_BASE_URL}/login`,
        body: { username: existingUsername, password: existingPassword },
        headers: {
          Authorization: `Bearer ${adminJwtToken}`,
        },
        failOnStatusCode: false,
      });
    });
  });
}

export function login(username, password) {
  return getAdminJwtToken().then((response) => {
    const adminJwtToken = response.body.jwtToken;
    return cy.request({
      method: "POST",
      url: `${USERS_BASE_URL}/login`,
      body: { username, password },
      headers: {
        Authorization: "Bearer " + adminJwtToken,
      },
      failOnStatusCode: false,
    });
  });
}
