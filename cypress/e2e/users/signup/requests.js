/// <reference types="cypress" />

import { USERS } from "../../common/constants";
import { USERS_BASE_URL } from "../../common/constants";
import { getAdminJwtToken } from "../get-admin-jwt-token/requests";

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
  return signupUserRecursively(userEntries, 0);
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
  return getAdminJwtToken().then((response) => {
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
