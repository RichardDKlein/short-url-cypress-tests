/// <reference types="cypress" />

import { HTTP_STATUS_CODES } from "../../common/constants";

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
  SUCCESS: {
    httpStatus: HTTP_STATUS_CODES.OK,
    response: {
      status: "SUCCESS",
      message: "User '%s' successfully created",
    },
  },
  USER_ALREADY_EXISTS: {
    httpStatus: HTTP_STATUS_CODES.CONFLICT,
    response: {
      status: "USER_ALREADY_EXISTS",
      message: "User '%s' already exists",
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
