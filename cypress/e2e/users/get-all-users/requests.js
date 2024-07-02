/// <reference types="cypress" />

import { USERS, USERS_BASE_URL } from "../../common/constants";
import { signupAllUsers } from "../signup/requests";
import { login } from "../login/requests";

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

export function getAllUsersWithInvalidJwtToken() {
  return cy.request({
    method: "GET",
    url: `${USERS_BASE_URL}/all`,
    headers: {
      Authorization: "Bearer " + "invalid.jwt.token",
    },
    failOnStatusCode: false,
  });
}

export function getAllUsersWithValidButNonAdminJwtToken() {
  return signupAllUsers().then(() => {
    return login(USERS.JOHN_DOE.username, USERS.JOHN_DOE.password).then(
      (response) => {
        cy.task("log", `response.body = ${JSON.stringify(response.body)}`);
        const nonAdminJwtToken = response.body.jwtToken;
        cy.task("log", `nonAdminJwtToken = ${nonAdminJwtToken}`);
        const authHeader = `Bearer ${nonAdminJwtToken}`;
        cy.task("log", `authHeader = ${authHeader}`);
        return cy.request({
          method: "GET",
          url: `${USERS_BASE_URL}/all`,
          headers: {
            Authorization: `${authHeader}`,
          },
          failOnStatusCode: false,
        });
      }
    );
  });
}
