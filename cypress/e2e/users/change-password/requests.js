/// <reference types="cypress" />

import { USERS_BASE_URL, USERS } from "../../common/constants";
import {
  createSsmClient,
  getJwtMinutesToLiveTest,
  setJwtMinutesToLiveTest,
} from "../../common/aws";
import { getAdminJwtToken } from "../get-admin-jwt-token/requests";
import { login } from "../login/requests";

export function changePasswordWithNoAuthHeader() {
  return cy.request({
    method: "PATCH",
    url: `${USERS_BASE_URL}/change-password`,
    body: {
      username: "isaac.newton",
      oldPassword: "isaac.newton.old.password",
      newPassword: "isaac.newton.new.password",
    },
    failOnStatusCode: false,
  });
}

export function changePasswordWithWrongKindOfAuthHeader() {
  return cy.request({
    method: "PATCH",
    url: `${USERS_BASE_URL}/change-password`,
    headers: {
      Authorization: "Basic " + btoa("username:password"),
    },
    body: {
      username: "isaac.newton",
      oldPassword: "isaac.newton.old.password",
      newPassword: "isaac.newton.new.password",
    },
    failOnStatusCode: false,
  });
}

export function changePasswordWithInvalidJwtToken() {
  return changePasswordWithSpecifiedAdminJwtToken(
    "isaac.newton",
    "isaac.newton.old.password",
    "isaac.newton.new.password",
    "invalid.jwt.token"
  );
}

export function changePasswordWithValidButExpiredJwtToken() {
  return createSsmClient(Cypress.env("region")).then((ssmClient) => {
    return getJwtMinutesToLiveTest(ssmClient).then((jwtMinutesToLiveTest) => {
      const saveJwtTimeToLiveTest = jwtMinutesToLiveTest;
      return setJwtMinutesToLiveTest(ssmClient, 0).then(() => {
        return getAdminJwtToken().then((response) => {
          const adminJwtToken = response.body.jwtToken;
          return changePasswordWithSpecifiedAdminJwtToken(
            USERS.JOE_BLOW.username,
            USERS.JOE_BLOW.password,
            USERS.JOE_BLOW.password + "-NEW",
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

export function changePasswordWithValidButNonAdminJwtToken() {
  return login(USERS.JOHN_DOE.username, USERS.JOHN_DOE.password).then(
    (response) => {
      const nonAdminJwtToken = response.body.jwtToken;
      return changePasswordWithSpecifiedAdminJwtToken(
        "isaac.newton",
        "isaac.newton.old.password",
        "isaac.newton.new.password",
        nonAdminJwtToken
      );
    }
  );
}

export function changePasswordWithMissingUsername() {
  return getAdminJwtToken().then((response) => {
    const adminJwtToken = response.body.jwtToken;
    cy.request({
      method: "PATCH",
      url: `${USERS_BASE_URL}/change-password`,
      headers: {
        Authorization: `Bearer ${adminJwtToken}`,
      },
      body: {
        oldPassword: "isaac.newton.old.password",
        newPassword: "isaac.newton.new.password",
      },
      failOnStatusCode: false,
    });
  });
}

export function changePasswordWithEmptyUsername() {
  return getAdminJwtToken().then((response) => {
    const adminJwtToken = response.body.jwtToken;
    cy.request({
      method: "PATCH",
      url: `${USERS_BASE_URL}/change-password`,
      headers: {
        Authorization: `Bearer ${adminJwtToken}`,
      },
      body: {
        username: "",
        oldPassword: "isaac.newton.old.password",
        newPassword: "isaac.newton.new.password",
      },
      failOnStatusCode: false,
    });
  });
}

export function changePasswordWithBlankUsername() {
  return getAdminJwtToken().then((response) => {
    const adminJwtToken = response.body.jwtToken;
    cy.request({
      method: "PATCH",
      url: `${USERS_BASE_URL}/change-password`,
      headers: {
        Authorization: `Bearer ${adminJwtToken}`,
      },
      body: {
        username: "   ",
        oldPassword: "isaac.newton.old.password",
        newPassword: "isaac.newton.new.password",
      },
      failOnStatusCode: false,
    });
  });
}

export function changePasswordWithMissingOldPassword() {
  return getAdminJwtToken().then((response) => {
    const adminJwtToken = response.body.jwtToken;
    cy.request({
      method: "PATCH",
      url: `${USERS_BASE_URL}/change-password`,
      headers: {
        Authorization: `Bearer ${adminJwtToken}`,
      },
      body: {
        username: "isaac.newton",
        newPassword: "isaac.newton.new.password",
      },
      failOnStatusCode: false,
    });
  });
}

export function changePasswordWithEmptyOldPassword() {
  return getAdminJwtToken().then((response) => {
    const adminJwtToken = response.body.jwtToken;
    cy.request({
      method: "PATCH",
      url: `${USERS_BASE_URL}/change-password`,
      headers: {
        Authorization: `Bearer ${adminJwtToken}`,
      },
      body: {
        username: "isaac.newton",
        oldPassword: "",
        newPassword: "isaac.newton.new.password",
      },
      failOnStatusCode: false,
    });
  });
}

export function changePasswordWithBlankOldPassword() {
  return getAdminJwtToken().then((response) => {
    const adminJwtToken = response.body.jwtToken;
    cy.request({
      method: "PATCH",
      url: `${USERS_BASE_URL}/change-password`,
      headers: {
        Authorization: `Bearer ${adminJwtToken}`,
      },
      body: {
        username: "isaac.newton",
        oldPassword: "   ",
        newPassword: "isaac.newton.new.password",
      },
      failOnStatusCode: false,
    });
  });
}

export function changePasswordWithMissingNewPassword() {
  return getAdminJwtToken().then((response) => {
    const adminJwtToken = response.body.jwtToken;
    cy.request({
      method: "PATCH",
      url: `${USERS_BASE_URL}/change-password`,
      headers: {
        Authorization: `Bearer ${adminJwtToken}`,
      },
      body: {
        username: "isaac.newton",
        oldPassword: "isaac.newton.old.password",
      },
      failOnStatusCode: false,
    });
  });
}

export function changePasswordWithEmptyNewPassword() {
  return getAdminJwtToken().then((response) => {
    const adminJwtToken = response.body.jwtToken;
    cy.request({
      method: "PATCH",
      url: `${USERS_BASE_URL}/change-password`,
      headers: {
        Authorization: `Bearer ${adminJwtToken}`,
      },
      body: {
        username: "isaac.newton",
        oldPassword: "isaac.newton.old.password",
        newPassword: "",
      },
      failOnStatusCode: false,
    });
  });
}

export function changePasswordWithBlankNewPassword() {
  return getAdminJwtToken().then((response) => {
    const adminJwtToken = response.body.jwtToken;
    cy.request({
      method: "PATCH",
      url: `${USERS_BASE_URL}/change-password`,
      headers: {
        Authorization: `Bearer ${adminJwtToken}`,
      },
      body: {
        username: "isaac.newton",
        oldPassword: "isaac.newton.old.password",
        newPassword: "   ",
      },
      failOnStatusCode: false,
    });
  });
}

export function changePasswordOfNonExistentUser() {
  return changePassword(
    "isaac.newton",
    "isaac.newton.old.password",
    "isaac.newton.old.password"
  );
}

export function changePasswordWithWrongOldPassword() {
  return changePassword(
    USERS.JOE_BLOW.username,
    USERS.JOE_BLOW.password + "-WRONG",
    USERS.JOE_BLOW.password + "-NEW"
  );
}

export function changePasswordOfAnExistingNonAdminUser() {
  return changePassword(
    USERS.JOE_BLOW.username,
    USERS.JOE_BLOW.password,
    USERS.JOE_BLOW.password + "-NEW"
  );
}

export function changePasswordOfAnExistingAdminUser() {
  const adminUsername = Cypress.env("adminUsername");
  const oldAdminPassword = Cypress.env("adminPassword");
  return changePassword(
    adminUsername,
    oldAdminPassword,
    oldAdminPassword + "-NEW"
  );
}

export function changePassword(username, oldPassword, newPassword) {
  return getAdminJwtToken().then((response) => {
    const adminJwtToken = response.body.jwtToken;
    return changePasswordWithSpecifiedAdminJwtToken(
      username,
      oldPassword,
      newPassword,
      adminJwtToken
    );
  });
}

export function changePasswordWithSpecifiedAdminJwtToken(
  username,
  oldPassword,
  newPassword,
  adminJwtToken
) {
  return cy.request({
    method: "PATCH",
    url: `${USERS_BASE_URL}/change-password`,
    headers: {
      Authorization: "Bearer " + adminJwtToken,
    },
    body: { username, oldPassword, newPassword },
    failOnStatusCode: false,
  });
}
