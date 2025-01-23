/// <reference types="cypress" />

import { USERS, USERS_BASE_URL } from "../../common/constants";
import {
  createSsmClient,
  getJwtMinutesToLiveTest,
  setJwtMinutesToLiveTest,
} from "../../common/aws";
import { getAdminJwtToken } from "../get-admin-jwt-token/requests";
import { login } from "../login/requests";

export function getSpecificUserWithNoAuthHeader() {
  return cy.request({
    method: "GET",
    url: `${USERS_BASE_URL}/specific/${USERS.JOE_BLOW.username}`,
    failOnStatusCode: false,
  });
}

export function getSpecificUserWithWrongKindOfAuthHeader() {
  return cy.request({
    method: "GET",
    url: `${USERS_BASE_URL}/specific/${USERS.JOE_BLOW.username}`,
    headers: {
      Authorization: "Basic " + btoa("username:password"),
    },
    failOnStatusCode: false,
  });
}

export function getSpecificUserWithInvalidJwtToken() {
  return getSpecificUserWithSpecifiedAdminJwtToken(
    USERS.JOE_BLOW.username,
    "invalid.jwt.token"
  );
}

export function getSpecificUserWithValidButExpiredJwtToken() {
  return createSsmClient(Cypress.env("region")).then((ssmClient) => {
    return getJwtMinutesToLiveTest(ssmClient).then((jwtMinutesToLiveTest) => {
      const saveJwtTimeToLiveTest = jwtMinutesToLiveTest;
      return setJwtMinutesToLiveTest(ssmClient, 0).then(() => {
        return getAdminJwtToken().then((response) => {
          const adminJwtToken = response.body.jwtToken;
          return getSpecificUserWithSpecifiedAdminJwtToken(
            USERS.JOE_BLOW.username,
            adminJwtToken
          ).then((response) => {
            return setJwtMinutesToLiveTest(
              ssmClient,
              saveJwtTimeToLiveTest
            ).then(() => {
              return response;
            });
          });
        });
      });
    });
  });
}

export function getSpecificUserWithValidButNonAdminJwtToken() {
  return login(USERS.JOHN_DOE.username, USERS.JOHN_DOE.password).then(
    (response) => {
      const nonAdminJwtToken = response.body.jwtToken;
      return getSpecificUserWithSpecifiedAdminJwtToken(
        USERS.JOHN_DOE.username,
        nonAdminJwtToken
      );
    }
  );
}

export function getSpecificUserForNonExistentUser() {
  return getSpecificUser("isaac.newton");
}

export function getSpecificUserForAnExistingUser() {
  return getSpecificUser(USERS.JOE_BLOW.username);
}

export function getSpecificUser(username) {
  return getAdminJwtToken().then((response) => {
    const adminJwtToken = response.body.jwtToken;
    return getSpecificUserWithSpecifiedAdminJwtToken(username, adminJwtToken);
  });
}

export function getSpecificUserWithSpecifiedAdminJwtToken(
  username,
  adminJwtToken
) {
  return cy.request({
    method: "GET",
    url: `${USERS_BASE_URL}/specific/${username}`,
    headers: {
      Authorization: `Bearer ${adminJwtToken}`,
    },
    failOnStatusCode: false,
  });
}
