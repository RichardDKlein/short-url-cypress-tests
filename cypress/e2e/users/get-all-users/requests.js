/// <reference types="cypress" />

import { USERS, USERS_BASE_URL } from "../../common/constants";
import {
  createSsmClient,
  getJwtMinutesToLiveTest,
  setJwtMinutesToLiveTest,
} from "../../common/aws";
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
  return getAllUsersWithSpecifiedAdminJwtToken("invalid.jwt.token");
}

export function getAllUsersWithValidButExpiredJwtToken() {
  return createSsmClient(Cypress.env("region")).then((ssmClient) => {
    return getJwtMinutesToLiveTest(ssmClient).then((jwtMinutesToLiveTest) => {
      const saveJwtTimeToLiveTest = jwtMinutesToLiveTest;
      return setJwtMinutesToLiveTest(ssmClient, 0).then(() => {
        return getAdminJwtToken().then((response) => {
          const adminJwtToken = response.body.jwtToken;
          return getAllUsersWithSpecifiedAdminJwtToken(adminJwtToken).then(
            (response) => {
              return setJwtMinutesToLiveTest(
                ssmClient,
                saveJwtTimeToLiveTest
              ).then(() => {
                return response;
              });
            }
          );
        });
      });
    });
  });
}

export function getAllUsersWithValidButNonAdminJwtToken() {
  return login(USERS.JOHN_DOE.username, USERS.JOHN_DOE.password).then(
    (response) => {
      const nonAdminJwtToken = response.body.jwtToken;
      return getAllUsersWithSpecifiedAdminJwtToken(nonAdminJwtToken);
    }
  );
}

export function getAllUsersWithValidAdminJwtToken() {
  return getAdminJwtToken().then((response) => {
    const adminJwtToken = response.body.jwtToken;
    return getAllUsersWithSpecifiedAdminJwtToken(adminJwtToken);
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
