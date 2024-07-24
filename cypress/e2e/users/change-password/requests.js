/// <reference types="cypress" />

import { USERS_BASE_URL, USERS } from "../../common/constants";
import { getAdminJwtToken } from "../get-admin-jwt-token/requests";
import { login } from "../login/requests";

export function changePasswordWithNoAuthHeader() {
  return cy.request({
    method: "PATCH",
    url: `${USERS_BASE_URL}/changepassword`,
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
    url: `${USERS_BASE_URL}/changepassword`,
    body: {
      username: "isaac.newton",
      oldPassword: "isaac.newton.old.password",
      newPassword: "isaac.newton.new.password",
    },
    headers: {
      Authorization: "Basic " + btoa("username:password"),
    },
    failOnStatusCode: false,
  });
}

export function changePasswordWithInvalidJwtToken() {
  return cy.request({
    method: "PATCH",
    url: `${USERS_BASE_URL}/changepassword`,
    body: {
      username: "isaac.newton",
      oldPassword: "isaac.newton.old.password",
      newPassword: "isaac.newton.new.password",
    },
    headers: {
      Authorization: "Bearer " + "invalid.jwt.token",
    },
    failOnStatusCode: false,
  });
}

export function changePasswordWithValidButNonAdminJwtToken() {
  return login(USERS.JOHN_DOE.username, USERS.JOHN_DOE.password).then(
    (response) => {
      const nonAdminJwtToken = response.body.jwtToken;
      cy.request({
        method: "PATCH",
        url: `${USERS_BASE_URL}/changepassword`,
        body: {
          username: "isaac.newton",
          oldPassword: "isaac.newton.old.password",
          newPassword: "isaac.newton.new.password",
        },
        headers: {
          Authorization: `Bearer ${nonAdminJwtToken}`,
        },
        failOnStatusCode: false,
      });
    }
  );
}

export function changePasswordWithMissingUsername() {
  return getAdminJwtToken().then((response) => {
    const adminJwtToken = response.body.jwtToken;
    cy.request({
      method: "PATCH",
      url: `${USERS_BASE_URL}/changepassword`,
      body: {
        oldPassword: "isaac.newton.old.password",
        newPassword: "isaac.newton.new.password",
      },
      headers: {
        Authorization: `Bearer ${adminJwtToken}`,
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
      url: `${USERS_BASE_URL}/changepassword`,
      body: {
        username: "",
        oldPassword: "isaac.newton.old.password",
        newPassword: "isaac.newton.new.password",
      },
      headers: {
        Authorization: `Bearer ${adminJwtToken}`,
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
      url: `${USERS_BASE_URL}/changepassword`,
      body: {
        username: "   ",
        oldPassword: "isaac.newton.old.password",
        newPassword: "isaac.newton.new.password",
      },
      headers: {
        Authorization: `Bearer ${adminJwtToken}`,
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
      url: `${USERS_BASE_URL}/changepassword`,
      body: {
        username: "isaac.newton",
        newPassword: "isaac.newton.new.password",
      },
      headers: {
        Authorization: `Bearer ${adminJwtToken}`,
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
      url: `${USERS_BASE_URL}/changepassword`,
      body: {
        username: "isaac.newton",
        oldPassword: "",
        newPassword: "isaac.newton.new.password",
      },
      headers: {
        Authorization: `Bearer ${adminJwtToken}`,
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
      url: `${USERS_BASE_URL}/changepassword`,
      body: {
        username: "isaac.newton",
        oldPassword: "   ",
        newPassword: "isaac.newton.new.password",
      },
      headers: {
        Authorization: `Bearer ${adminJwtToken}`,
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
      url: `${USERS_BASE_URL}/changepassword`,
      body: {
        username: "isaac.newton",
        oldPassword: "isaac.newton.old.password",
      },
      headers: {
        Authorization: `Bearer ${adminJwtToken}`,
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
      url: `${USERS_BASE_URL}/changepassword`,
      body: {
        username: "isaac.newton",
        oldPassword: "isaac.newton.old.password",
        newPassword: "",
      },
      headers: {
        Authorization: `Bearer ${adminJwtToken}`,
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
      url: `${USERS_BASE_URL}/changepassword`,
      body: {
        username: "isaac.newton",
        oldPassword: "isaac.newton.old.password",
        newPassword: "   ",
      },
      headers: {
        Authorization: `Bearer ${adminJwtToken}`,
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
    return cy.request({
      method: "PATCH",
      url: `${USERS_BASE_URL}/changepassword`,
      body: { username, oldPassword, newPassword },
      headers: {
        Authorization: "Bearer " + adminJwtToken,
      },
      failOnStatusCode: false,
    });
  });
}
