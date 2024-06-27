/// <reference types="cypress" />

import { USERS } from "../users";
import { USERS_BASE_URL } from "../../common/constants";

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
    return;
  }
  const [key, user] = userEntries[index];
  return signupUser(user).then((response) => {
    console.log("signed-up user = " + JSON.stringify(response.body));
    signupUserRecursively(userEntries, index + 1);
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
