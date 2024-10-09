/// <reference types="cypress" />

import { USERS_BASE_URL, USERS } from "../../common/constants";
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
  return cy.request({
    method: "POST",
    url: `${USERS_BASE_URL}/login`,
    headers: {
      Authorization: "Bearer " + "invalid.jwt.token",
    },
    body: {
      username: "isaac.newton",
      password: "isaac.newton.password",
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
        headers: {
          Authorization: `Bearer ${nonAdminJwtToken}`,
        },
        body: {
          username: "isaac.newton",
          password: "isaac.newton.password",
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
  return getAdminJwtToken().then((response) => {
    const adminJwtToken = response.body.jwtToken;
    cy.request({
      method: "POST",
      url: `${USERS_BASE_URL}/login`,
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

export function loginWithBlankUsername() {
  return getAdminJwtToken().then((response) => {
    const adminJwtToken = response.body.jwtToken;
    cy.request({
      method: "POST",
      url: `${USERS_BASE_URL}/login`,
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
        password: "",
      },
      failOnStatusCode: false,
    });
  });
}

export function loginWithBlankPassword() {
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
        password: "   ",
      },
      failOnStatusCode: false,
    });
  });
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
    return cy.request({
      method: "POST",
      url: `${USERS_BASE_URL}/login`,
      headers: {
        Authorization: "Bearer " + adminJwtToken,
      },
      body: { username, password },
      failOnStatusCode: false,
    });
  });
}
