/// <reference types="cypress" />

import { USERS } from "../users";
import { USERS_BASE_URL } from "../../common/constants";

export function signupAllUsers() {
  const userEntries = Object.entries(USERS);
  return signupUserRecursively(userEntries, 0);
}

function signupUserRecursively(userEntries, index) {
  if (index >= userEntries.length) {
    return cy.wrap(null);
  }
  const [key, user] = userEntries[index];
  return signupUser(user).then((response) => {
    console.log("signed-up user = " + JSON.stringify(response.body));
    return signupUserRecursively(userEntries, index + 1);
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
