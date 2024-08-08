/// <reference types="cypress" />

import { RESERVATIONS_BASE_URL, USERS } from "../../common/constants";
import { deleteAllUsers } from "../../users/delete-all-users/requests";
import { getAdminJwtToken } from "../../users/get-admin-jwt-token/requests";
import { login } from "../../users/login/requests";
import { signupAllUsers } from "../../users/signup/requests";

export function getSpecificReservationWithNoAuthHeader() {
  return cy.request({
    method: "GET",
    url: `${RESERVATIONS_BASE_URL}/specific/bx3raV`,
    failOnStatusCode: false,
  });
}

export function getSpecificReservationWithWrongKindOfAuthHeader() {
  return cy.request({
    method: "GET",
    url: `${RESERVATIONS_BASE_URL}/specific/bx3raV`,
    headers: {
      Authorization: "Basic " + btoa("username:password"),
    },
    failOnStatusCode: false,
  });
}

export function getSpecificReservationWithInvalidJwtToken() {
  return cy.request({
    method: "GET",
    url: `${RESERVATIONS_BASE_URL}/specific/bx3raV`,
    headers: {
      Authorization: "Bearer " + "invalid.jwt.token",
    },
    failOnStatusCode: false,
  });
}

export function getSpecificReservationWithValidButNonAdminJwtToken() {
  return deleteAllUsers().then(() => {
    signupAllUsers().then(() => {
      login(USERS.JOHN_DOE.username, USERS.JOHN_DOE.password).then(
        (response) => {
          const nonAdminJwtToken = response.body.jwtToken;
          cy.request({
            method: "GET",
            url: `${RESERVATIONS_BASE_URL}/specific/bx3raV`,
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

export function getSpecificReservationForNonExistentReservation() {
  return getSpecificReservation("hello");
}

export function getSpecificReservationForAnExistingReservation() {
  return getSpecificReservation("bx3raV");
}

export function getSpecificReservation(shortUrl) {
  return getAdminJwtToken().then((response) => {
    const adminJwtToken = response.body.jwtToken;
    cy.request({
      method: "GET",
      url: `${RESERVATIONS_BASE_URL}/specific/${shortUrl}`,
      headers: {
        Authorization: `Bearer ${adminJwtToken}`,
      },
      failOnStatusCode: false,
    });
  });
}
