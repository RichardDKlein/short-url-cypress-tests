/// <reference types="cypress" />

import { HTTP_STATUS_CODES, USERS } from "../../common/constants";
import { getAllUsersWithSpecifiedAdminJwtToken } from "../get-all-users/requests";
import { expectSuccessResponse as expectGetAllUsersSuccess } from "../get-all-users/responses";

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
  WRONG_PASSWORD: {
    httpStatus: HTTP_STATUS_CODES.UNAUTHORIZED,
    response: {
      status: {
        status: "WRONG_PASSWORD",
        message: "The specified password is not correct",
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

export function expectWrongPasswordResponse(response) {
  expect(response.status).to.eq(LOGIN_RESPONSES.WRONG_PASSWORD.httpStatus);
  expect(JSON.stringify(response.body)).to.eq(
    JSON.stringify(LOGIN_RESPONSES.WRONG_PASSWORD.response)
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

export function expectSuccessResponseToNonAdminLogin(response) {
  expectSuccessResponse(response);
}

export function expectSuccessResponseToAdminLogin(response) {
  expectSuccessResponse(response);
  // Verify that the returned `jwtToken` is a valid admin JWT token.
  getAllUsersWithSpecifiedAdminJwtToken(response.body.jwtToken).then(
    (response) => {
      expectGetAllUsersSuccess(response);
    }
  );
}

export function expectSuccessResponse(response) {
  expect(response.status).to.eq(LOGIN_RESPONSES.SUCCESS.httpStatus);
  var expectedStatus = { ...LOGIN_RESPONSES.SUCCESS.response.status };
  const username = response.body.status.message.match(/'(.*)'/g);
  expectedStatus.message = expectedStatus.message.replace(
    "'${username}'",
    username
  );
  expect(JSON.stringify(response.body.status)).to.eq(
    JSON.stringify(expectedStatus)
  );
}
