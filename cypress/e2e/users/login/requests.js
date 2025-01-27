/// <reference types="cypress" />

import { USERS, USERS_BASE_URL } from "../../common/constants";
import {
  createSsmClient,
  getJwtMinutesToLiveTest,
  setJwtMinutesToLiveTest,
} from "../../common/aws";
import { getAdminJwtToken } from "../get-admin-jwt-token/requests";

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

export function loginWithInvalidJwtToken() {
  return loginWithSpecifiedAdminJwtToken(
    "isaac.newton",
    "isaac.newton.password",
    "invalid.jwt.token"
  );
}

export function loginWithValidButExpiredJwtToken() {
  return createSsmClient(Cypress.env("region")).then((ssmClient) => {
    return getJwtMinutesToLiveTest(ssmClient).then((jwtMinutesToLiveTest) => {
      const saveJwtTimeToLiveTest = jwtMinutesToLiveTest;
      return setJwtMinutesToLiveTest(ssmClient, 0).then(() => {
        return getAdminJwtToken().then((response) => {
          const adminJwtToken = response.body.jwtToken;
          return loginWithSpecifiedAdminJwtToken(
            USERS.JOE_BLOW.username,
            USERS.JOE_BLOW.password,
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

export function loginWithValidButNonAdminJwtToken() {
  return login(USERS.JOHN_DOE.username, USERS.JOHN_DOE.password).then(
    (response) => {
      const nonAdminJwtToken = response.body.jwtToken;
      return loginWithSpecifiedAdminJwtToken(
        "isaac.newton",
        "isaac.newton.password",
        nonAdminJwtToken
      );
    }
  );
}

export function loginWithMissingUsername() {
  return getAdminJwtToken().then((response) => {
    const adminJwtToken = response.body.jwtToken;
    cy.request({
      method: "POST",
      url: `${USERS_BASE_URL}/login`,
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

export function loginWithEmptyUsername() {
  return login("", "isaac.newton.password");
}

export function loginWithBlankUsername() {
  return login("   ", "isaac.newton.password");
}

export function loginWithMissingPassword() {
  return getAdminJwtToken().then((response) => {
    const adminJwtToken = response.body.jwtToken;
    cy.request({
      method: "POST",
      url: `${USERS_BASE_URL}/login`,
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

export function loginWithEmptyPassword() {
  return login("isaac.newton", "");
}

export function loginWithBlankPassword() {
  return login("isaac.newton", "   ");
}

export function loginWithWrongPassword() {
  return login(USERS.JOE_BLOW.username, USERS.JOE_BLOW.password + "-WRONG");
}

export function loginNonExistentUser() {
  return login("isaac.newton", "isaac.newton.password");
}

export function loginAnExistingNonAdminUser() {
  return login(USERS.JOE_BLOW.username, USERS.JOE_BLOW.password);
}

export function loginAnExistingAdminUser() {
  return login(Cypress.env("adminUsername"), Cypress.env("adminPassword"));
}

export function login(username, password) {
  return getAdminJwtToken().then((response) => {
    const adminJwtToken = response.body.jwtToken;
    return loginWithSpecifiedAdminJwtToken(username, password, adminJwtToken);
  });
}

export function loginWithSpecifiedAdminJwtToken(
  username,
  password,
  adminJwtToken
) {
  return cy.request({
    method: "POST",
    url: `${USERS_BASE_URL}/login`,
    headers: {
      Authorization: "Bearer " + adminJwtToken,
    },
    body: { username, password },
    failOnStatusCode: false,
  });
}
