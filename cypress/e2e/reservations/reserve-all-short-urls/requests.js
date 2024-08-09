/// <reference types="cypress" />

import { USERS, RESERVATIONS_BASE_URL } from "../../common/constants";
import { deleteAllUsers } from "../../users/delete-all-users/requests";
import { signupAllUsers } from "../../users/signup/requests";
import { login } from "../../users/login/requests";
import { getAdminJwtToken } from "../../users/get-admin-jwt-token/requests";

export function reserveAllShortUrlsWithNoAuthHeader() {
  return cy.request({
    method: "PATCH",
    url: `${RESERVATIONS_BASE_URL}/reserve/all`,
    failOnStatusCode: false,
  });
}

export function reserveAllShortUrlsWithWrongKindOfAuthHeader() {
  return cy.request({
    method: "PATCH",
    url: `${RESERVATIONS_BASE_URL}/reserve/all`,
    headers: {
      Authorization: "Basic " + btoa("username:password"),
    },
    failOnStatusCode: false,
  });
}

export function reserveAllShortUrlsWithInvalidJwtToken() {
  return cy.request({
    method: "PATCH",
    url: `${RESERVATIONS_BASE_URL}/reserve/all`,
    headers: {
      Authorization: "Bearer " + "invalid.jwt.token",
    },
    failOnStatusCode: false,
  });
}

export function reserveAllShortUrlsWithValidButNonAdminJwtToken() {
  return deleteAllUsers().then(() => {
    signupAllUsers().then(() => {
      login(USERS.JOHN_DOE.username, USERS.JOHN_DOE.password).then(
        (response) => {
          const nonAdminJwtToken = response.body.jwtToken;
          cy.request({
            method: "PATCH",
            url: `${RESERVATIONS_BASE_URL}/reserve/all`,
            headers: {
              Authorization: `Bearer ${nonAdminJwtToken}`,
            },
            failOnStatusCode: false,
          });
        }
      );
    });
  });
}

export function reserveAllShortUrlsWithValidAdminJwtToken() {
  return getAdminJwtToken().then((response) => {
    const adminJwtToken = response.body.jwtToken;
    reserveAllShortUrlsWithSpecifiedAdminJwtToken(adminJwtToken);
  });
}

export function reserveAllShortUrlsWithSpecifiedAdminJwtToken(adminJwtToken) {
  return cy.request({
    method: "PATCH",
    url: `${RESERVATIONS_BASE_URL}/reserve/all`,
    headers: {
      Authorization: `Bearer ${adminJwtToken}`,
    },
    failOnStatusCode: false,
  });
}

export function reserveAllShortUrls() {
  return reserveAllShortUrlsWithValidAdminJwtToken();
}
