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

export function loginWithEmptyUsername() {
  return getAdminJwtToken().then((response) => {
    const adminJwtToken = response.body.jwtToken;
    cy.request({
      method: "POST",
      url: `${USERS_BASE_URL}/login`,
      body: {
        username: "",
        password: "isaac.newton.password",
      },
      headers: {
        Authorization: `Bearer ${adminJwtToken}`,
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
      body: {
        username: "   ",
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

export function loginWithEmptyPassword() {
  return getAdminJwtToken().then((response) => {
    const adminJwtToken = response.body.jwtToken;
    cy.request({
      method: "POST",
      url: `${USERS_BASE_URL}/login`,
      body: {
        username: "isaac.newton",
        password: "",
      },
      headers: {
        Authorization: `Bearer ${adminJwtToken}`,
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
      body: {
        username: "isaac.newton",
        password: "   ",
      },
      headers: {
        Authorization: `Bearer ${adminJwtToken}`,
      },
      failOnStatusCode: false,
    });
  });
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
      body: { username, password },
      headers: {
        Authorization: "Bearer " + adminJwtToken,
      },
      failOnStatusCode: false,
    });
  });
}
