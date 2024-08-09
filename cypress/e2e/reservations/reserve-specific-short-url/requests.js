/// <reference types="cypress" />

import { USERS } from "../../common/constants";
import { RESERVATIONS_BASE_URL } from "../../common/constants";
import { cancelAllReservations } from "../cancel-all-reservations/requests";
import { getAdminJwtToken } from "../../users/get-admin-jwt-token/requests";
import { login } from "../../users/login/requests";

export function reserveSpecificShortUrlWithNoAuthHeader() {
  return cy.request({
    method: "PATCH",
    url: `${RESERVATIONS_BASE_URL}/reserve/specific/bx3raV`,
    failOnStatusCode: false,
  });
}

export function reserveSpecificShortUrlWithWrongKindOfAuthHeader() {
  return cy.request({
    method: "PATCH",
    url: `${RESERVATIONS_BASE_URL}/reserve/specific/bx3raV`,
    headers: {
      Authorization: "Basic " + btoa("username:password"),
    },
    failOnStatusCode: false,
  });
}

export function reserveSpecificShortUrlWithInvalidJwtToken() {
  return cy.request({
    method: "PATCH",
    url: `${RESERVATIONS_BASE_URL}/reserve/specific/bx3raV`,
    headers: {
      Authorization: "Bearer " + "invalid.jwt.token",
    },
    failOnStatusCode: false,
  });
}

export function reserveSpecificShortUrlWithValidButNonAdminJwtToken() {
  return login(USERS.JOHN_DOE.username, USERS.JOHN_DOE.password).then(
    (response) => {
      const nonAdminJwtToken = response.body.jwtToken;
      cy.request({
        method: "PATCH",
        url: `${RESERVATIONS_BASE_URL}/reserve/specific/${USERS.JOE_BLOW.username}`,
        headers: {
          Authorization: `Bearer ${nonAdminJwtToken}`,
        },
        failOnStatusCode: false,
      });
    }
  );
}

export function reserveSpecificNonExistentShortUrl() {
  return reserveSpecificShortUrl("hello");
}

export function reserveSpecificAlreadyReservedShortUrl() {
  return cancelAllReservations().then(() => {
    reserveSpecificShortUrl("bx3raV").then((response) => {
      reserveSpecificShortUrl("bx3raV");
    });
  });
}

export function reserveSpecificAvailableShortUrl() {
  return cancelAllReservations().then(() => {
    reserveSpecificShortUrl("bx3raV");
  });
}

export function reserveSpecificShortUrl(shortUrl) {
  return getAdminJwtToken().then((response) => {
    const adminJwtToken = response.body.jwtToken;
    cy.request({
      method: "PATCH",
      url: `${RESERVATIONS_BASE_URL}/reserve/specific/${shortUrl}`,
      headers: {
        Authorization: `Bearer ${adminJwtToken}`,
      },
      failOnStatusCode: false,
    });
  });
}
