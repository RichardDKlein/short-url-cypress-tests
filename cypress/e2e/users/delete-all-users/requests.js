/// <reference types="cypress" />

import { USERS_BASE_URL, USERS } from "../../common/constants";
import {
  createSsmClient,
  getJwtMinutesToLiveTest,
  setJwtMinutesToLiveTest,
} from "../../common/aws";
import { getAdminJwtToken } from "../get-admin-jwt-token/requests";
import { login } from "../login/requests";

export function deleteAllUsersWithNoAuthHeader() {
  return cy.request({
    method: "DELETE",
    url: `${USERS_BASE_URL}/all`,
    failOnStatusCode: false,
  });
}

export function deleteAllUsersWithWrongKindOfAuthHeader() {
  return cy.request({
    method: "DELETE",
    url: `${USERS_BASE_URL}/all`,
    headers: {
      Authorization: "Basic " + btoa("username:password"),
    },
    failOnStatusCode: false,
  });
}

export function deleteAllUsersWithInvalidJwtToken() {
  return deleteAllUsersWithSpecifiedAdminJwtToken("invalid.jwt.token");
}

export function deleteAllUsersWithValidButExpiredJwtToken() {
  return createSsmClient(Cypress.env("region")).then((ssmClient) => {
    return getJwtMinutesToLiveTest(ssmClient).then((jwtMinutesToLiveTest) => {
      const saveJwtTimeToLiveTest = jwtMinutesToLiveTest;
      return setJwtMinutesToLiveTest(ssmClient, 0).then(() => {
        return getAdminJwtToken().then((response) => {
          const adminJwtToken = response.body.jwtToken;
          return deleteAllUsersWithSpecifiedAdminJwtToken(adminJwtToken).then(
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

export function deleteAllUsersWithValidButNonAdminJwtToken() {
  return login(USERS.JOHN_DOE.username, USERS.JOHN_DOE.password).then(
    (response) => {
      const nonAdminJwtToken = response.body.jwtToken;
      return deleteAllUsersWithSpecifiedAdminJwtToken(nonAdminJwtToken);
    }
  );
}

export function deleteAllUsersWithValidAdminJwtToken() {
  return getAdminJwtToken().then((response) => {
    const adminJwtToken = response.body.jwtToken;
    return deleteAllUsersWithSpecifiedAdminJwtToken(adminJwtToken);
  });
}

export function deleteAllUsersWithSpecifiedAdminJwtToken(adminJwtToken) {
  return cy.request({
    method: "DELETE",
    url: `${USERS_BASE_URL}/all`,
    headers: {
      Authorization: "Bearer " + adminJwtToken,
    },
    failOnStatusCode: false,
  });
}

export function deleteAllUsers() {
  return deleteAllUsersWithValidAdminJwtToken();
}
