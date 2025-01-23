/// <reference types="cypress" />

import { USERS, USERS_BASE_URL } from "../../common/constants";
import {
  createSsmClient,
  getJwtMinutesToLiveTest,
  setJwtMinutesToLiveTest,
} from "../../common/aws";
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
    headers: {
      Authorization: "Basic " + btoa("username:password"),
    },
    body: {
      username: "isaac.newton",
      password: "isaac.newton.password",
    },
    failOnStatusCode: false,
  });
}

export function signupWithInvalidJwtToken() {
  return signupUserWithSpecifiedAdminJwtToken(
    { username: "isaac.newton", password: "isaac.newton.password" },
    "invalid.jwt.token"
  );
}

export function signupWithValidButExpiredJwtToken() {
  return createSsmClient(Cypress.env("region")).then((ssmClient) => {
    return getJwtMinutesToLiveTest(ssmClient).then((jwtMinutesToLiveTest) => {
      const saveJwtTimeToLiveTest = jwtMinutesToLiveTest;
      return setJwtMinutesToLiveTest(ssmClient, 0).then(() => {
        return getAdminJwtToken().then((response) => {
          const adminJwtToken = response.body.jwtToken;
          return signupUserWithSpecifiedAdminJwtToken(
            {
              username: USERS.JOE_BLOW.username,
              password: USERS.JOE_BLOW.password,
            },
            adminJwtToken
          ).then((response) => {
            return setJwtMinutesToLiveTest(
              ssmClient,
              saveJwtTimeToLiveTest
            ).then(() => {
              return response;
            });
          });
        });
      });
    });
  });
}

export function signupWithValidButNonAdminJwtToken() {
  return login(USERS.JOHN_DOE.username, USERS.JOHN_DOE.password).then(
    (response) => {
      const nonAdminJwtToken = response.body.jwtToken;
      return signupUserWithSpecifiedAdminJwtToken(
        {
          username: USERS.JOHN_DOE.username,
          password: USERS.JOHN_DOE.password,
        },
        nonAdminJwtToken
      );
    }
  );
}

export function signupWithMissingUsername() {
  return getAdminJwtToken().then((response) => {
    const adminJwtToken = response.body.jwtToken;
    cy.request({
      method: "POST",
      url: `${USERS_BASE_URL}/signup`,
      headers: {
        Authorization: `Bearer ${adminJwtToken}`,
      },
      body: {
        password: "isaac.newton.password",
      },
      failOnStatusCode: false,
    });
  });
}

export function signupWithEmptyUsername() {
  return getAdminJwtToken().then((response) => {
    const adminJwtToken = response.body.jwtToken;
    cy.request({
      method: "POST",
      url: `${USERS_BASE_URL}/signup`,
      headers: {
        Authorization: `Bearer ${adminJwtToken}`,
      },
      body: {
        username: "",
        password: "isaac.newton.password",
      },
      failOnStatusCode: false,
    });
  });
}

export function signupWithBlankUsername() {
  return getAdminJwtToken().then((response) => {
    const adminJwtToken = response.body.jwtToken;
    cy.request({
      method: "POST",
      url: `${USERS_BASE_URL}/signup`,
      headers: {
        Authorization: `Bearer ${adminJwtToken}`,
      },
      body: {
        username: "   ",
        password: "isaac.newton.password",
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
      headers: {
        Authorization: `Bearer ${adminJwtToken}`,
      },
      body: {
        username: "isaac.newton",
      },
      failOnStatusCode: false,
    });
  });
}

export function signupWithEmptyPassword() {
  return getAdminJwtToken().then((response) => {
    const adminJwtToken = response.body.jwtToken;
    cy.request({
      method: "POST",
      url: `${USERS_BASE_URL}/signup`,
      headers: {
        Authorization: `Bearer ${adminJwtToken}`,
      },
      body: {
        username: "isaac.newton",
        password: "",
      },
      failOnStatusCode: false,
    });
  });
}

export function signupWithBlankPassword() {
  return getAdminJwtToken().then((response) => {
    const adminJwtToken = response.body.jwtToken;
    cy.request({
      method: "POST",
      url: `${USERS_BASE_URL}/signup`,
      headers: {
        Authorization: `Bearer ${adminJwtToken}`,
      },
      body: {
        username: "isaac.newton",
        password: "   ",
      },
      failOnStatusCode: false,
    });
  });
}

export function signupAnExistingUser() {
  return getAdminJwtToken().then((response) => {
    getAllUsers().then((response) => {
      const actualUsers = response.body.shortUrlUsers;
      const cannedUsers = Object.entries(USERS);
      let existingUser;
      for (const actualUser of actualUsers) {
        if (actualUser.role == "ADMIN") {
          continue;
        }
        for (var [key, cannedUser] of cannedUsers) {
          if (actualUser.username == cannedUser.username) {
            existingUser = cannedUser;
            break;
          }
        }
      }
      signupUser(existingUser);
    });
  });
}

export function signupNewUser() {
  return signupUser({
    username: "isaac.newton",
    password: "isaac.newton.password",
  });
}

export function signupUser(user) {
  return getAdminJwtToken().then((response) => {
    const adminJwtToken = response.body.jwtToken;
    return signupUserWithSpecifiedAdminJwtToken(user, adminJwtToken);
  });
}

export function signupUserWithSpecifiedAdminJwtToken(user, adminJwtToken) {
  return cy.request({
    method: "POST",
    url: `${USERS_BASE_URL}/signup`,
    headers: {
      Authorization: "Bearer " + adminJwtToken,
    },
    body: user,
    failOnStatusCode: false,
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
  return signupUser(user).then(() => {
    signupUsersRecursively(userEntries, index + 1);
  });
}
