/// <reference types="cypress" />

import { HTTP_STATUS_CODES } from "../../common/constants";

export const GET_USER_DETAILS_RESPONSES = {
  MISSING_USERNAME: {
    httpStatus: HTTP_STATUS_CODES.BAD_REQUEST,
    response: {
      status: {
        status: "MISSING_USERNAME",
        message: "A non-empty username must be specified",
      },
      shortUrlUser: null,
    },
  },
  NO_SUCH_USER: {
    httpStatus: HTTP_STATUS_CODES.NOT_FOUND,
    response: {
      status: {
        status: "NO_SUCH_USER",
        message: "User '${username}' does not exist",
      },
      shortUrlUser: null,
    },
  },
  SUCCESS: {
    httpStatus: HTTP_STATUS_CODES.OK,
    response: {
      status: "SUCCESS",
      message: "User details successfully retrieved",
    },
  },
};

export function expectMissingUsernameResponse(response) {
  expect(response.status).to.eq(
    GET_USER_DETAILS_RESPONSES.MISSING_USERNAME.httpStatus
  );
  expect(JSON.stringify(response.body)).to.eq(
    JSON.stringify(GET_USER_DETAILS_RESPONSES.MISSING_USERNAME.response)
  );
}

export function expectNoSuchUserResponse(response) {
  expect(response.status).to.eq(
    GET_USER_DETAILS_RESPONSES.NO_SUCH_USER.httpStatus
  );
  var expectedResponse = {
    ...GET_USER_DETAILS_RESPONSES.NO_SUCH_USER.response,
  };
  const username = response.body.status.message.match(/'(.*)'/g);
  expectedResponse.status.message = expectedResponse.status.message.replace(
    "'${username}'",
    username
  );
  expect(JSON.stringify(response.body)).to.eq(JSON.stringify(expectedResponse));
}

export function expectUserDetailsSuccessfullyRetrievedResponse(response) {
  expect(response.status).to.eq(GET_USER_DETAILS_RESPONSES.SUCCESS.httpStatus);
  expect(JSON.stringify(response.body)).to.eq(JSON.stringify(expectedResponse));
}
