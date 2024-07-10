/// <reference types="cypress" />

import { USERS } from "../../common/constants";
import { USERS_BASE_URL } from "../../common/constants";
import { getAdminJwtToken } from "../get-admin-jwt-token/requests";
import { getAllUsers } from "../get-all-users/requests";
import { login } from "../login/requests";

export function getUserDetailsWithNoAuthHeader() {
  return cy.request({
    method: "GET",
    url: `${USERS_BASE_URL}/details`,
    body: {
      username: "isaac.newton",
    },
    failOnStatusCode: false,
  });
}

export function getUserDetailsWithWrongKindOfAuthHeader() {
  return cy.request({
    method: "GET",
    url: `${USERS_BASE_URL}/details`,
    body: {
      username: "isaac.newton",
    },
    headers: {
      Authorization: "Basic " + btoa("username:password"),
    },
    failOnStatusCode: false,
  });
}

export function getUserDetailsWithInvalidJwtToken() {
  return cy.request({
    method: "GET",
    url: `${USERS_BASE_URL}/details`,
    body: {
      username: "isaac.newton",
    },
    headers: {
      Authorization: "Bearer " + "invalid.jwt.token",
    },
    failOnStatusCode: false,
  });
}

export function getUserDetailsWithValidButNonAdminJwtToken() {
  return login(USERS.JOHN_DOE.username, USERS.JOHN_DOE.password).then(
    (response) => {
      const nonAdminJwtToken = response.body.jwtToken;
      cy.request({
        method: "GET",
        url: `${USERS_BASE_URL}/details`,
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

export function getUserDetailsWithMissingUsername() {
  return getAdminJwtToken().then((response) => {
    const adminJwtToken = response.body.jwtToken;
    cy.request({
      method: "GET",
      url: `${USERS_BASE_URL}/details`,
      body: {},
      headers: {
        Authorization: `Bearer ${adminJwtToken}`,
      },
      failOnStatusCode: false,
    });
  });
}

export function getUserDetailsWithEmptyUsername() {
  return getAdminJwtToken().then((response) => {
    const adminJwtToken = response.body.jwtToken;
    cy.request({
      method: "GET",
      url: `${USERS_BASE_URL}/details`,
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

export function getUserDetailsWithBlankUsername() {
  return getAdminJwtToken().then((response) => {
    const adminJwtToken = response.body.jwtToken;
    cy.request({
      method: "GET",
      url: `${USERS_BASE_URL}/details`,
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

export function getUserDetailsForAnExistingUser() {
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
      getUserDetails(existingUsername);
    });
  });
}

export function getUserDetails(username) {
  return getAdminJwtToken().then((response) => {
    const adminJwtToken = response.body.jwtToken;
    cy.request({
      method: "GET",
      url: `${USERS_BASE_URL}/details`,
      body: { username },
      headers: {
        Authorization: `Bearer ${adminJwtToken}`,
      },
      failOnStatusCode: false,
    });
  });
}
