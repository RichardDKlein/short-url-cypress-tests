/// <reference types="cypress" />

import { HTTP_STATUS_CODES } from "../../common/constants";

export const DELETE_SPECIFIC_USER_RESPONSES = {
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

export function expectNoSuchUserResponse(response) {
  expect(response.status).to.eq(
    DELETE_SPECIFIC_USER_RESPONSES.NO_SUCH_USER.httpStatus
  );
  var expectedResponse = {
    ...DELETE_SPECIFIC_USER_RESPONSES.NO_SUCH_USER.response,
  };
  const username = response.body.message.match(/'(.*)'/g);
  expectedResponse.message = expectedResponse.message.replace(
    "'${username}'",
    username
  );
  expect(JSON.stringify(response.body)).to.eq(JSON.stringify(expectedResponse));
}

export function expectSuccessResponse(response) {
  expect(response.status).to.eq(
    DELETE_SPECIFIC_USER_RESPONSES.SUCCESS.httpStatus
  );
  var expectedResponse = { ...DELETE_SPECIFIC_USER_RESPONSES.SUCCESS.response };
  const username = response.body.message.match(/'(.*)'/g);
  expectedResponse.message = expectedResponse.message.replace(
    "'${username}'",
    username
  );
  expect(JSON.stringify(response.body)).to.eq(JSON.stringify(expectedResponse));
}
