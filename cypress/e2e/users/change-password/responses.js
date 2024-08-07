/// <reference types="cypress" />

import { HTTP_STATUS_CODES, USERS } from "../../common/constants";
import { getAdminPassword, createSsmClient } from "../../common/aws";
import { changePassword } from "./requests";
import { login } from "../login/requests";
import { expectSuccessResponse as expectLoginSuccess } from "../login/responses";

export const CHANGE_PASSWORD_RESPONSES = {
  MISSING_USERNAME: {
    httpStatus: HTTP_STATUS_CODES.BAD_REQUEST,
    response: {
      status: "MISSING_USERNAME",
      message: "A non-empty username must be specified",
    },
  },
  MISSING_OLD_PASSWORD: {
    httpStatus: HTTP_STATUS_CODES.BAD_REQUEST,
    response: {
      status: "MISSING_OLD_PASSWORD",
      message: "The old password must be specified",
    },
  },
  MISSING_NEW_PASSWORD: {
    httpStatus: HTTP_STATUS_CODES.BAD_REQUEST,
    response: {
      status: "MISSING_NEW_PASSWORD",
      message: "A non-empty new password must be specified",
    },
  },
  NO_SUCH_USER: {
    httpStatus: HTTP_STATUS_CODES.UNAUTHORIZED,
    response: {
      status: "NO_SUCH_USER",
      message: "User '${username}' does not exist",
    },
  },
  WRONG_PASSWORD: {
    httpStatus: HTTP_STATUS_CODES.UNAUTHORIZED,
    response: {
      status: "WRONG_PASSWORD",
      message: "The specified password is not correct",
    },
  },
  SUCCESS: {
    httpStatus: HTTP_STATUS_CODES.OK,
    response: {
      status: "SUCCESS",
      message: "Password successfully changed for user '${username}'",
    },
  },
};

export function expectMissingUsernameResponse(response) {
  expect(response.status).to.eq(
    CHANGE_PASSWORD_RESPONSES.MISSING_USERNAME.httpStatus
  );
  expect(JSON.stringify(response.body)).to.eq(
    JSON.stringify(CHANGE_PASSWORD_RESPONSES.MISSING_USERNAME.response)
  );
}

export function expectMissingOldPasswordResponse(response) {
  expect(response.status).to.eq(
    CHANGE_PASSWORD_RESPONSES.MISSING_OLD_PASSWORD.httpStatus
  );
  expect(JSON.stringify(response.body)).to.eq(
    JSON.stringify(CHANGE_PASSWORD_RESPONSES.MISSING_OLD_PASSWORD.response)
  );
}

export function expectMissingNewPasswordResponse(response) {
  expect(response.status).to.eq(
    CHANGE_PASSWORD_RESPONSES.MISSING_NEW_PASSWORD.httpStatus
  );
  expect(JSON.stringify(response.body)).to.eq(
    JSON.stringify(CHANGE_PASSWORD_RESPONSES.MISSING_NEW_PASSWORD.response)
  );
}

export function expectNoSuchUserResponse(response) {
  expect(response.status).to.eq(
    CHANGE_PASSWORD_RESPONSES.NO_SUCH_USER.httpStatus
  );
  var expectedResponse = { ...CHANGE_PASSWORD_RESPONSES.NO_SUCH_USER.response };
  const username = response.body.message.match(/'(.*)'/g);
  expectedResponse.message = expectedResponse.message.replace(
    "'${username}'",
    username
  );
  expect(JSON.stringify(response.body)).to.eq(JSON.stringify(expectedResponse));
}

export function expectWrongPasswordResponse(response) {
  expect(response.status).to.eq(
    CHANGE_PASSWORD_RESPONSES.WRONG_PASSWORD.httpStatus
  );
  expect(JSON.stringify(response.body)).to.eq(
    JSON.stringify(CHANGE_PASSWORD_RESPONSES.WRONG_PASSWORD.response)
  );
}

export function expectSuccessResponseForNonAdminUser(response) {
  expectSuccessResponse(response);

  // Try logging in with the new password
  login(USERS.JOE_BLOW.username, USERS.JOE_BLOW.password + "-NEW").then(
    (response) => {
      expectLoginSuccess(response);
    }
  );
}

export function expectSuccessResponseForAdminUser(response) {
  expectSuccessResponse(response);

  createSsmClient(Cypress.env("region")).then((ssmClient) => {
    getAdminPassword(ssmClient).then((newAdminPassword) => {
      // Verify that the new password has been saved in the AWS Parameter Store
      const oldAdminPassword = Cypress.env("adminPassword");
      expect(newAdminPassword).to.eq(oldAdminPassword + "-NEW");
      Cypress.env("adminPassword", newAdminPassword);

      // Try logging in with the new password
      const adminUsername = Cypress.env("adminUsername");
      login(adminUsername, newAdminPassword).then((response) => {
        expectLoginSuccess(response);
      });

      // Change back to the old password
      changePassword(adminUsername, newAdminPassword, oldAdminPassword);
      Cypress.env("adminPassword", oldAdminPassword);
    });
  });
}

export function expectSuccessResponse(response) {
  expect(response.status).to.eq(CHANGE_PASSWORD_RESPONSES.SUCCESS.httpStatus);
  var expectedResponse = { ...CHANGE_PASSWORD_RESPONSES.SUCCESS.response };
  const username = response.body.message.match(/'(.*)'/g);
  expectedResponse.message = expectedResponse.message.replace(
    "'${username}'",
    username
  );
  expect(JSON.stringify(response.body)).to.eq(JSON.stringify(expectedResponse));
}
