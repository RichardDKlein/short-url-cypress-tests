/// <reference types="cypress" />

import { HTTP_STATUS_CODES, USERS } from "../../common/constants";

export const SIGNUP_RESPONSES = {
  MISSING_PASSWORD: {
    httpStatus: HTTP_STATUS_CODES.BAD_REQUEST,
    response: {
      status: "MISSING_PASSWORD",
      message: "A non-empty password must be specified",
    },
  },
  MISSING_USERNAME: {
    httpStatus: HTTP_STATUS_CODES.BAD_REQUEST,
    response: {
      status: "MISSING_USERNAME",
      message: "A non-empty username must be specified",
    },
  },
  USER_ALREADY_EXISTS: {
    httpStatus: HTTP_STATUS_CODES.CONFLICT,
    response: {
      status: "USER_ALREADY_EXISTS",
      message: "User '${username}' already exists",
    },
  },
  SUCCESS: {
    httpStatus: HTTP_STATUS_CODES.OK,
    response: {
      status: "SUCCESS",
      message: "User '${username}' successfully created",
    },
  },
};

export function expectMissingUsernameResponse(response) {
  expect(response.status).to.eq(SIGNUP_RESPONSES.MISSING_USERNAME.httpStatus);
  expect(JSON.stringify(response.body)).to.eq(
    JSON.stringify(SIGNUP_RESPONSES.MISSING_USERNAME.response)
  );
}

export function expectMissingPasswordResponse(response) {
  expect(response.status).to.eq(SIGNUP_RESPONSES.MISSING_PASSWORD.httpStatus);
  expect(JSON.stringify(response.body)).to.eq(
    JSON.stringify(SIGNUP_RESPONSES.MISSING_PASSWORD.response)
  );
}

export function expectUserAlreadyExistsResponse(response) {
  expect(response.status).to.eq(
    SIGNUP_RESPONSES.USER_ALREADY_EXISTS.httpStatus
  );
  var expectedResponse = { ...SIGNUP_RESPONSES.USER_ALREADY_EXISTS.response };
  expectedResponse.message = expectedResponse.message.replace(
    "${username}",
    USERS.JOE_BLOW.username
  );
  expect(JSON.stringify(response.body)).to.eq(JSON.stringify(expectedResponse));
}

export function expectUserSuccessfullyCreatedResponse(response) {
  expect(response.status).to.eq(SIGNUP_RESPONSES.SUCCESS.httpStatus);
  var expectedResponse = { ...SIGNUP_RESPONSES.SUCCESS.response };
  expectedResponse.message = expectedResponse.message.replace(
    "${username}",
    "isaac.newton"
  );
  expect(JSON.stringify(response.body)).to.eq(JSON.stringify(expectedResponse));
}
