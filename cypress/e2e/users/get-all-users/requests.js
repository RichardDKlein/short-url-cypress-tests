/// <reference types="cypress" />

import { USERS, USERS_BASE_URL } from "../../common/constants";
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

export function getAllUsersWithValidButExpiredJwtToken() {
  const saveJwtTimeToLiveTest = getJwtTimeToLiveTest();
  setJwtTimeToLiveTest(0);
  getAdminJwtToken().then((response) => {
    const adminJwtToken = response.body.jwtToken;
    getAllUsersWithSpecifiedAdminJwtToken(adminJwtToken);
  });
  setJwtTimeToLiveTest(saveJwtTimeToLiveTest);
}

export function getAllUsersWithValidButNonAdminJwtToken() {
  return login(USERS.JOHN_DOE.username, USERS.JOHN_DOE.password).then(
    (response) => {
      const nonAdminJwtToken = response.body.jwtToken;
      getAllUsersWithSpecifiedAdminJwtToken(nonAdminJwtToken);
    }
  );
}

export function getAllUsersWithValidAdminJwtToken() {
  return getAdminJwtToken().then((response) => {
    const adminJwtToken = response.body.jwtToken;
    getAllUsersWithSpecifiedAdminJwtToken(adminJwtToken);
  });
}

export function getAllUsersWithSpecifiedAdminJwtToken(adminJwtToken) {
  return cy.request({
    method: "GET",
    url: `${USERS_BASE_URL}/all`,
    headers: {
      Authorization: `Bearer ${adminJwtToken}`,
    },
    failOnStatusCode: false,
  });
}

export function getAllUsers() {
  return getAllUsersWithValidAdminJwtToken();
}
