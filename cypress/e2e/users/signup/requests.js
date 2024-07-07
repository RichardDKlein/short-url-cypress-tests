/// <reference types="cypress" />

import { USERS } from "../../common/constants";
import { USERS_BASE_URL } from "../../common/constants";
import { getAdminJwtToken } from "../get-admin-jwt-token/requests";
import { getAllUsers } from "../get-all-users/requests";
import { login } from "../login/requests";

export function signupWithNoAuthHeader() {
  return cy.request({
    method: "POST",
    url: `${USERS_BASE_URL}/signup`,
    body: {
      username: "isaac.newton",
      password: "isaac.newton.password",
    },
    failOnStatusCode: false,
  });
}

export function signupWithWrongKindOfAuthHeader() {
  return cy.request({
    method: "POST",
    url: `${USERS_BASE_URL}/signup`,
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

export function signupWithInvalidJwtToken() {
  return cy.request({
    method: "POST",
    url: `${USERS_BASE_URL}/signup`,
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

export function signupWithValidButNonAdminJwtToken() {
  return login(USERS.JOHN_DOE.username, USERS.JOHN_DOE.password).then(
    (response) => {
      const nonAdminJwtToken = response.body.jwtToken;
      cy.request({
        method: "POST",
        url: `${USERS_BASE_URL}/signup`,
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

export function signupWithMissingUsername() {
  return getAdminJwtToken().then((response) => {
    const adminJwtToken = response.body.jwtToken;
    cy.request({
      method: "POST",
      url: `${USERS_BASE_URL}/signup`,
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

export function signupWithMissingPassword() {
  return getAdminJwtToken().then((response) => {
    const adminJwtToken = response.body.jwtToken;
    cy.request({
      method: "POST",
      url: `${USERS_BASE_URL}/signup`,
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

export function signupExistingUser() {
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
        url: `${USERS_BASE_URL}/signup`,
        body: { username: existingUsername, password: existingPassword },
        headers: {
          Authorization: `Bearer ${adminJwtToken}`,
        },
        failOnStatusCode: false,
      });
    });
  });
}

export function signupNewUser(username, password) {
  return getAdminJwtToken().then((response) => {
    const adminJwtToken = response.body.jwtToken;
    cy.request({
      method: "POST",
      url: `${USERS_BASE_URL}/signup`,
      body: { username, password },
      headers: {
        Authorization: `Bearer ${adminJwtToken}`,
      },
      failOnStatusCode: false,
    });
  });
}

export function signupAllUsers() {
  const userEntries = Object.entries(USERS);
  return signupUsersRecursively(userEntries, 0);
}

function signupUsersRecursively(userEntries, index) {
  if (index >= userEntries.length) {
    return null;
  }
  const [key, user] = userEntries[index];
  return signupUserWithValidAdminJwtToken(user).then(() => {
    signupUsersRecursively(userEntries, index + 1);
  });
}

function signupUserWithValidAdminJwtToken(user) {
  return getAdminJwtToken().then((response) => {
    const adminJwtToken = response.body.jwtToken;
    cy.request({
      method: "POST",
      url: `${USERS_BASE_URL}/signup`,
      body: user,
      headers: {
        Authorization: "Bearer " + adminJwtToken,
      },
      failOnStatusCode: false,
    });
  });
}
