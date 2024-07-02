/// <reference types="cypress" />

import { USERS } from "../users";
import { USERS_BASE_URL } from "../../common/constants";
import { generateJwtToken } from "../../common/security/jwt-utils";

export function signupWithNoUsername() {
  return cy.request({
    method: "POST",
    url: `${USERS_BASE_URL}/signup`,
    body: { password: "mypassword" },
    failOnStatusCode: false,
  });
}

export function signupWithNoPassword() {
  return cy.request({
    method: "POST",
    url: `${USERS_BASE_URL}/signup`,
    body: { username: "newuser" },
    failOnStatusCode: false,
  });
}

export function signupAllUsers() {
  const userEntries = Object.entries(USERS);
  signupUserRecursively(userEntries, 0);
}

function signupUserRecursively(userEntries, index) {
  if (index >= userEntries.length) {
    return null;
  }
  const [key, user] = userEntries[index];
  return signupUserWithValidAdminJwtToken(user).then((response) => {
    console.log("signed-up user = " + JSON.stringify(response.body));
    signupUserRecursively(userEntries, index + 1);
  });
}

export function signupUserWithValidAdminJwtToken(user) {
  getAdminJwtTokenWithBasicAuthHeader(
    Cypress.env("adminUsername"),
    Cypress.env("adminPassword")
  ).then((response) => {
    const adminJwtToken = response.body.jwtToken;
    return cy.request({
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
