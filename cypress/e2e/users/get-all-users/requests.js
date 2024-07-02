/// <reference types="cypress" />

import { USERS, USERS_BASE_URL } from "../../common/constants";
import { signupAllUsers } from "../signup/requests";
import { login } from "../login/requests";
import { getAdminJwtToken } from "../get-admin-jwt-token/requests";

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
        const nonAdminJwtToken = response.body.jwtToken;
        return cy.request({
          method: "GET",
          url: `${USERS_BASE_URL}/all`,
          headers: {
            Authorization: `Bearer ${nonAdminJwtToken}`,
          },
          failOnStatusCode: false,
        });
      }
    );
  });
}

export function getAllUsersWithValidAdminJwtToken() {
  return signupAllUsers().then(() => {
    return getAdminJwtToken().then((response) => {
      const adminJwtToken = response.body.jwtToken;
      return cy.request({
        method: "GET",
        url: `${USERS_BASE_URL}/all`,
        headers: {
          Authorization: `Bearer ${adminJwtToken}`,
        },
        failOnStatusCode: false,
      });
    });
  });
}
