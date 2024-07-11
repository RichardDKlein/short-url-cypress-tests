/// <reference types="cypress" />

import { HTTP_STATUS_CODES, USERS } from "../../common/constants";

export const LOGIN_RESPONSES = {
  MISSING_USERNAME: {
    httpStatus: HTTP_STATUS_CODES.BAD_REQUEST,
    response: {
      status: {
        status: "MISSING_USERNAME",
        message: "A non-empty username must be specified",
      },
      jwtToken: null,
    },
  },
  MISSING_PASSWORD: {
    httpStatus: HTTP_STATUS_CODES.BAD_REQUEST,
    response: {
      status: {
        status: "MISSING_PASSWORD",
        message: "A non-empty password must be specified",
      },
      jwtToken: null,
    },
  },
  NO_SUCH_USER: {
    httpStatus: HTTP_STATUS_CODES.UNAUTHORIZED,
    response: {
      status: {
        status: "NO_SUCH_USER",
        message: "User '${username}' does not exist",
      },
      jwtToken: null,
    },
  },
  SUCCESS: {
    httpStatus: HTTP_STATUS_CODES.OK,
    response: {
      status: {
        status: "SUCCESS",
        message: "User '${username}' successfully logged in",
      },
      jwtToken: "${jwtToken}",
    },
  },
};

export function expectMissingUsernameResponse(response) {
  expect(response.status).to.eq(LOGIN_RESPONSES.MISSING_USERNAME.httpStatus);
  expect(JSON.stringify(response.body)).to.eq(
    JSON.stringify(LOGIN_RESPONSES.MISSING_USERNAME.response)
  );
}

export function expectMissingPasswordResponse(response) {
  expect(response.status).to.eq(LOGIN_RESPONSES.MISSING_PASSWORD.httpStatus);
  expect(JSON.stringify(response.body)).to.eq(
    JSON.stringify(LOGIN_RESPONSES.MISSING_PASSWORD.response)
  );
}

export function expectNoSuchUserResponse(response) {
  expect(response.status).to.eq(LOGIN_RESPONSES.NO_SUCH_USER.httpStatus);
  var expectedResponse = { ...LOGIN_RESPONSES.NO_SUCH_USER.response };
  const username = response.body.status.message.match(/'(.*)'/g);
  expectedResponse.status.message = expectedResponse.status.message.replace(
    "'${username}'",
    username
  );
  expect(JSON.stringify(response.body)).to.eq(JSON.stringify(expectedResponse));
}

export function expectSuccessResponse(response) {
  expect(response.status).to.eq(LOGIN_RESPONSES.SUCCESS.httpStatus);
  var expectedResponse = { ...LOGIN_RESPONSES.SUCCESS.response };
  const username = response.body.status.message.match(/'(.*)'/g);
  expectedResponse.status.message = expectedResponse.status.message.replace(
    "'${username}'",
    username
  );
  expectedResponse.jwtToken = expectedResponse.jwtToken.replace(
    "${jwtToken}",
    response.body.jwtToken
  );
  expect(JSON.stringify(response.body)).to.eq(JSON.stringify(expectedResponse));
}
