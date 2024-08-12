/// <reference types="cypress" />

import { USERS } from "../../common/constants";
import { RESERVATIONS_BASE_URL } from "../../common/constants";
import { cancelAllReservations } from "../cancel-all-reservations/requests";
import { getAdminJwtToken } from "../../users/get-admin-jwt-token/requests";
import { login } from "../../users/login/requests";
import { deleteAllUsers } from "../../users/delete-all-users/requests";
import { reserveAllShortUrls } from "../reserve-all-short-urls/requests";
import { signupAllUsers } from "../../users/signup/requests";

export function reserveAnyShortUrlWithNoAuthHeader() {
  return cy.request({
    method: "PATCH",
    url: `${RESERVATIONS_BASE_URL}/reserve/any`,
    failOnStatusCode: false,
  });
}

export function reserveAnyShortUrlWithWrongKindOfAuthHeader() {
  return cy.request({
    method: "PATCH",
    url: `${RESERVATIONS_BASE_URL}/reserve/any`,
    headers: {
      Authorization: "Basic " + btoa("username:password"),
    },
    failOnStatusCode: false,
  });
}

export function reserveAnyShortUrlWithInvalidJwtToken() {
  return cy.request({
    method: "PATCH",
    url: `${RESERVATIONS_BASE_URL}/reserve/any`,
    headers: {
      Authorization: "Bearer " + "invalid.jwt.token",
    },
    failOnStatusCode: false,
  });
}

export function reserveAnyShortUrlWithValidButNonAdminJwtToken() {
  return deleteAllUsers().then(() => {
    signupAllUsers().then(() => {
      login(USERS.JOHN_DOE.username, USERS.JOHN_DOE.password).then(
        (response) => {
          const nonAdminJwtToken = response.body.jwtToken;
          cy.request({
            method: "PATCH",
            url: `${RESERVATIONS_BASE_URL}/reserve/any`,
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

export function reserveAnyShortUrlWhenNoneAreAvailable() {
  return reserveAllShortUrls().then(() => {
    reserveAnyShortUrl();
  });
}

export function reserveAnyShortUrlWhenOneIsAvailable() {
  return cancelAllReservations().then(() => {
    reserveAnyShortUrl();
  });
}

export function reserveAnyShortUrl() {
  return getAdminJwtToken().then((response) => {
    const adminJwtToken = response.body.jwtToken;
    cy.request({
      method: "PATCH",
      url: `${RESERVATIONS_BASE_URL}/reserve/any`,
      headers: {
        Authorization: `Bearer ${adminJwtToken}`,
      },
      failOnStatusCode: false,
    });
  });
}
