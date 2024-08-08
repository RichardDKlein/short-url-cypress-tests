/// <reference types="cypress" />

import { USERS, RESERVATIONS_BASE_URL } from "../../common/constants";
import { deleteAllUsers } from "../../users/delete-all-users/requests";
import { signupAllUsers } from "../../users/signup/requests";
import { login } from "../../users/login/requests";
import { getAdminJwtToken } from "../../users/get-admin-jwt-token/requests";

export function getAllReservationsWithNoAuthHeader() {
  return cy.request({
    method: "GET",
    url: `${RESERVATIONS_BASE_URL}/all`,
    failOnStatusCode: false,
  });
}

export function getAllReservationsWithWrongKindOfAuthHeader() {
  return cy.request({
    method: "GET",
    url: `${RESERVATIONS_BASE_URL}/all`,
    headers: {
      Authorization: "Basic " + btoa("username:password"),
    },
    failOnStatusCode: false,
  });
}

export function getAllReservationsWithInvalidJwtToken() {
  return cy.request({
    method: "GET",
    url: `${RESERVATIONS_BASE_URL}/all`,
    headers: {
      Authorization: "Bearer " + "invalid.jwt.token",
    },
    failOnStatusCode: false,
  });
}

export function getAllReservationsWithValidButNonAdminJwtToken() {
  return deleteAllUsers().then(() => {
    signupAllUsers().then(() => {
      login(USERS.JOHN_DOE.username, USERS.JOHN_DOE.password).then(
        (response) => {
          const nonAdminJwtToken = response.body.jwtToken;
          cy.request({
            method: "GET",
            url: `${RESERVATIONS_BASE_URL}/all`,
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

export function getAllReservationsWithValidAdminJwtToken() {
  return getAdminJwtToken().then((response) => {
    const adminJwtToken = response.body.jwtToken;
    getAllReservationsWithSpecifiedAdminJwtToken(adminJwtToken);
  });
}

export function getAllReservationsWithSpecifiedAdminJwtToken(adminJwtToken) {
  return cy.request({
    method: "GET",
    url: `${RESERVATIONS_BASE_URL}/all`,
    headers: {
      Authorization: `Bearer ${adminJwtToken}`,
    },
    failOnStatusCode: false,
  });
}
