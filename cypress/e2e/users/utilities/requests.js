/// <reference types="cypress" />

import { USERS_BASE_URL } from "../../common/constants";

// --------------------------------------------------------------------
// GET ALL USERS
// --------------------------------------------------------------------

export function getAllUsersWithNoAuthHeader() {
  return cy.request({
    method: "GET",
    url: `${USERS_BASE_URL}/all`,
    failOnStatusCode: false,
  });
}

export function getAllUsersWithWrongKindOfAuthHeader() {
  return cy.request({
    method: "GET",
    url: `${USERS_BASE_URL}/all`,
    headers: {
      Authorization: "Basic " + btoa("username:password"),
    },
    failOnStatusCode: false,
  });
}

export function getAllUsersWithJwtToken(invalidJwtToken) {
  return cy.request({
    method: "GET",
    url: `${USERS_BASE_URL}/all`,
    headers: {
      Authorization: "Bearer " + invalidJwtToken,
    },
    failOnStatusCode: false,
  });
}

// --------------------------------------------------------------------
// SIGNUP
// --------------------------------------------------------------------

export function signupAllUsers() {
  Object.entries(USERS).forEach(([key, value]) => {
    signupUser(value);
  });
}

export function signupUser(user) {
  return cy.request({
    method: "POST",
    url: `${USERS_BASE_URL}/signup`,
    body: user,
    failOnStatusCode: false,
  });
}

// --------------------------------------------------------------------
// LOGIN
// --------------------------------------------------------------------

export function loginAsAdmin() {
  return loginWithValidUserCredentials(
    Cypress.env("adminUsername"),
    Cypress.env("adminPassword")
  );
}

export function loginWithValidUserCredentials(username, password) {
  return cy.request({
    method: "POST",
    url: `${USERS_BASE_URL}/login`,
    body: { username, password },
    failOnStatusCode: false,
  });
}

// --------------------------------------------------------------------
// DELETE USER
// --------------------------------------------------------------------

export function deleteAllUsers() {
  loginAsAdmin().then((response) => {
    const adminJwtToken = response.body.jwtToken;
    getAllUsersWithJwtToken(adminJwtToken).then((response) => {
      response.body.shortUrlUsers.forEach((user) => {
        if (user.role == "USER") {
          deleteUserWithValidJwtToken(user.username, adminJwtToken);
        }
      });
    });
  });
}

export function deleteUserWithValidJwtToken(username, validJwtToken) {
  return cy.request({
    method: "DELETE",
    url: `${USERS_BASE_URL}/specific`,
    body: { username },
    headers: {
      Authorization: "Bearer " + validJwtToken,
    },
    failOnStatusCode: false,
  });
}