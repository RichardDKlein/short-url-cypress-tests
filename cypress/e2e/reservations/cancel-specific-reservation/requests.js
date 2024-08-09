/// <reference types="cypress" />

import { USERS } from "../../common/constants";
import { RESERVATIONS_BASE_URL } from "../../common/constants";
import { reserveAllShortUrls } from "../reserve-all-short-urls/requests";
import { getAdminJwtToken } from "../../users/get-admin-jwt-token/requests";
import { login } from "../../users/login/requests";

export function cancelSpecificReservationWithNoAuthHeader() {
  return cy.request({
    method: "PATCH",
    url: `${RESERVATIONS_BASE_URL}/cancel/specific/bx3raV`,
    failOnStatusCode: false,
  });
}

export function cancelSpecificReservationWithWrongKindOfAuthHeader() {
  return cy.request({
    method: "PATCH",
    url: `${RESERVATIONS_BASE_URL}/cancel/specific/bx3raV`,
    headers: {
      Authorization: "Basic " + btoa("username:password"),
    },
    failOnStatusCode: false,
  });
}

export function cancelSpecificReservationWithInvalidJwtToken() {
  return cy.request({
    method: "PATCH",
    url: `${RESERVATIONS_BASE_URL}/cancel/specific/bx3raV`,
    headers: {
      Authorization: "Bearer " + "invalid.jwt.token",
    },
    failOnStatusCode: false,
  });
}

export function cancelSpecificReservationWithValidButNonAdminJwtToken() {
  return login(USERS.JOHN_DOE.username, USERS.JOHN_DOE.password).then(
    (response) => {
      const nonAdminJwtToken = response.body.jwtToken;
      cy.request({
        method: "PATCH",
        url: `${RESERVATIONS_BASE_URL}/cancel/specific/bx3raV`,
        headers: {
          Authorization: `Bearer ${nonAdminJwtToken}`,
        },
        failOnStatusCode: false,
      });
    }
  );
}

export function cancelSpecificReservationForNonExistentShortUrl() {
  return cancelSpecificReservationForShortUrl("hello");
}

export function cancelSpecificReservationForUnReservedShortUrl() {
  return reserveAllShortUrls().then(() => {
    cancelSpecificReservationForShortUrl("bx3raV").then((response) => {
      cancelSpecificReservationForShortUrl("bx3raV");
    });
  });
}

export function cancelSpecificReservationForReservedShortUrl() {
  return reserveAllShortUrls().then(() => {
    cancelSpecificReservationForShortUrl("bx3raV");
  });
}

export function cancelSpecificReservationForShortUrl(shortUrl) {
  return getAdminJwtToken().then((response) => {
    const adminJwtToken = response.body.jwtToken;
    cy.request({
      method: "PATCH",
      url: `${RESERVATIONS_BASE_URL}/cancel/specific/${shortUrl}`,
      headers: {
        Authorization: `Bearer ${adminJwtToken}`,
      },
      failOnStatusCode: false,
    });
  });
}
