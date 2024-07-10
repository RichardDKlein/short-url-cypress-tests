/// <reference types="cypress" />

import { HTTP_STATUS_CODES, USERS } from "../../common/constants";

export const DELETE_USER_RESPONSES = {
  MISSING_USERNAME: {
    httpStatus: HTTP_STATUS_CODES.BAD_REQUEST,
    response: {
      status: "MISSING_USERNAME",
      message: "A non-empty username must be specified",
    },
  },
  NO_SUCH_USER: {
    httpStatus: HTTP_STATUS_CODES.NOT_FOUND,
    response: {
      status: "NO_SUCH_USER",
      message: "User '${username}' does not exist",
    },
  },
  SUCCESS: {
    httpStatus: HTTP_STATUS_CODES.OK,
    response: {
      status: "SUCCESS",
      message: "User '${username}' successfully deleted",
    },
  },
};

export function expectMissingUsernameResponse(response) {
  expect(response.status).to.eq(
    DELETE_USER_RESPONSES.MISSING_USERNAME.httpStatus
  );
  expect(JSON.stringify(response.body)).to.eq(
    JSON.stringify(DELETE_USER_RESPONSES.MISSING_USERNAME.response)
  );
}

export function expectNoSuchUserResponse(response) {
  expect(response.status).to.eq(DELETE_USER_RESPONSES.NO_SUCH_USER.httpStatus);
  var expectedResponse = { ...DELETE_USER_RESPONSES.NO_SUCH_USER.response };
  const username = response.body.message.match(/'(.*)'/g);
  expectedResponse.message = expectedResponse.message.replace(
    "'${username}'",
    username
  );
  expect(JSON.stringify(response.body)).to.eq(JSON.stringify(expectedResponse));
}

export function expectUserSuccessfullyDeletedResponse(response) {
  expect(response.status).to.eq(DELETE_USER_RESPONSES.SUCCESS.httpStatus);
  var expectedResponse = { ...DELETE_USER_RESPONSES.SUCCESS.response };
  const username = response.body.message.match(/'(.*)'/g);
  expectedResponse.message = expectedResponse.message.replace(
    "'${username}'",
    username
  );
  expect(JSON.stringify(response.body)).to.eq(JSON.stringify(expectedResponse));
}
