/// <reference types="cypress" />

import { USERS, RESERVATIONS_BASE_URL } from "../../common/constants";
import { deleteAllUsers } from "../../users/delete-all-users/requests";
import { signupAllUsers } from "../../users/signup/requests";
import { login } from "../../users/login/requests";
import { getAdminJwtToken } from "../../users/get-admin-jwt-token/requests";

export function cancelAllReservationsWithNoAuthHeader() {
  return cy.request({
    method: "PATCH",
    url: `${RESERVATIONS_BASE_URL}/cancel/all`,
    failOnStatusCode: false,
  });
}

export function cancelAllReservationsWithWrongKindOfAuthHeader() {
  return cy.request({
    method: "PATCH",
    url: `${RESERVATIONS_BASE_URL}/cancel/all`,
    headers: {
      Authorization: "Basic " + btoa("username:password"),
    },
    failOnStatusCode: false,
  });
}

export function cancelAllReservationsWithInvalidJwtToken() {
  return cy.request({
    method: "PATCH",
    url: `${RESERVATIONS_BASE_URL}/cancel/all`,
    headers: {
      Authorization: "Bearer " + "invalid.jwt.token",
    },
    failOnStatusCode: false,
  });
}

export function cancelAllReservationsWithValidButNonAdminJwtToken() {
  return deleteAllUsers().then(() => {
    signupAllUsers().then(() => {
      login(USERS.JOHN_DOE.username, USERS.JOHN_DOE.password).then(
        (response) => {
          const nonAdminJwtToken = response.body.jwtToken;
          cy.request({
            method: "PATCH",
            url: `${RESERVATIONS_BASE_URL}/cancel/all`,
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

export function cancelAllReservationsWithValidAdminJwtToken() {
  return getAdminJwtToken().then((response) => {
    const adminJwtToken = response.body.jwtToken;
    cancelAllReservationsWithSpecifiedAdminJwtToken(adminJwtToken);
  });
}

export function cancelAllReservationsWithSpecifiedAdminJwtToken(adminJwtToken) {
  return cy.request({
    method: "PATCH",
    url: `${RESERVATIONS_BASE_URL}/cancel/all`,
    headers: {
      Authorization: `Bearer ${adminJwtToken}`,
    },
    failOnStatusCode: false,
  });
}

export function cancelAllReservations() {
  return cancelAllReservationsWithValidAdminJwtToken();
}
