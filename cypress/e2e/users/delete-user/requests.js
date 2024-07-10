/// <reference types="cypress" />

import { USERS } from "../../common/constants";
import { USERS_BASE_URL } from "../../common/constants";
import { getAdminJwtToken } from "../get-admin-jwt-token/requests";
import { getAllUsers } from "../get-all-users/requests";
import { login } from "../login/requests";

export function deleteUserWithNoAuthHeader() {
  return cy.request({
    method: "DELETE",
    url: `${USERS_BASE_URL}/specific`,
    body: {
      username: "isaac.newton",
    },
    failOnStatusCode: false,
  });
}

export function deleteUserWithWrongKindOfAuthHeader() {
  return cy.request({
    method: "DELETE",
    url: `${USERS_BASE_URL}/specific`,
    body: {
      username: "isaac.newton",
    },
    headers: {
      Authorization: "Basic " + btoa("username:password"),
    },
    failOnStatusCode: false,
  });
}

export function deleteUserWithInvalidJwtToken() {
  return cy.request({
    method: "DELETE",
    url: `${USERS_BASE_URL}/specific`,
    body: {
      username: "isaac.newton",
    },
    headers: {
      Authorization: "Bearer " + "invalid.jwt.token",
    },
    failOnStatusCode: false,
  });
}

export function deleteUserWithValidButNonAdminJwtToken() {
  return login(USERS.JOHN_DOE.username, USERS.JOHN_DOE.password).then(
    (response) => {
      const nonAdminJwtToken = response.body.jwtToken;
      cy.request({
        method: "DELETE",
        url: `${USERS_BASE_URL}/specific`,
        body: {
          username: "isaac.newton",
        },
        headers: {
          Authorization: `Bearer ${nonAdminJwtToken}`,
        },
        failOnStatusCode: false,
      });
    }
  );
}

export function deleteUserWithMissingUsername() {
  return getAdminJwtToken().then((response) => {
    const adminJwtToken = response.body.jwtToken;
    cy.request({
      method: "DELETE",
      url: `${USERS_BASE_URL}/specific`,
      body: {},
      headers: {
        Authorization: `Bearer ${adminJwtToken}`,
      },
      failOnStatusCode: false,
    });
  });
}

export function deleteUserWithEmptyUsername() {
  return getAdminJwtToken().then((response) => {
    const adminJwtToken = response.body.jwtToken;
    cy.request({
      method: "DELETE",
      url: `${USERS_BASE_URL}/specific`,
      body: {
        username: "",
      },
      headers: {
        Authorization: `Bearer ${adminJwtToken}`,
      },
      failOnStatusCode: false,
    });
  });
}

export function deleteUserWithBlankUsername() {
  return getAdminJwtToken().then((response) => {
    const adminJwtToken = response.body.jwtToken;
    cy.request({
      method: "DELETE",
      url: `${USERS_BASE_URL}/specific`,
      body: {
        username: "   ",
      },
      headers: {
        Authorization: `Bearer ${adminJwtToken}`,
      },
      failOnStatusCode: false,
    });
  });
}

export function deleteExistingUser() {
  return getAdminJwtToken().then((response) => {
    getAllUsers().then((response) => {
      const actualUsers = response.body.shortUrlUsers;
      const cannedUsers = Object.entries(USERS);
      let existingUsername;
      for (const actualUser of actualUsers) {
        if (actualUser.role == "ADMIN") {
          continue;
        }
        for (var [key, cannedUser] of cannedUsers) {
          if (actualUser.username == cannedUser.username) {
            existingUsername = cannedUser.username;
            break;
          }
        }
      }
      deleteUser(existingUsername);
    });
  });
}

export function deleteUser(username) {
  return getAdminJwtToken().then((response) => {
    const adminJwtToken = response.body.jwtToken;
    cy.request({
      method: "DELETE",
      url: `${USERS_BASE_URL}/specific`,
      body: { username },
      headers: {
        Authorization: `Bearer ${adminJwtToken}`,
      },
      failOnStatusCode: false,
    });
  });
}
