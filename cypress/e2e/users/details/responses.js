/// <reference types="cypress" />

import { HTTP_STATUS_CODES, USERS } from "../../common/constants";
import { isTimestampRecent } from "../../common/timestamps";

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
      status: {
        status: "SUCCESS",
        message: "User details successfully retrieved",
      },
      shortUrlUser: {},
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

export function expectSuccessResponse(response) {
  expect(response.status).to.eq(GET_USER_DETAILS_RESPONSES.SUCCESS.httpStatus);
  expect(JSON.stringify(response.body.status)).to.eq(
    JSON.stringify(GET_USER_DETAILS_RESPONSES.SUCCESS.response.status)
  );
  const actualUserDetails = response.body.shortUrlUser;
  for (const [key, value] of Object.entries(USERS)) {
    if (value.username == actualUserDetails.username) {
      const expectedUserDetails = value;
      verifyUserDetails(actualUserDetails, expectedUserDetails);
    }
  }
}

function verifyUserDetails(actualUserDetails, expectedUserDetails) {
  expect(actualUserDetails.username).to.eq(expectedUserDetails.username);
  expect(actualUserDetails.role).to.eq(expectedUserDetails.role);
  expect(actualUserDetails.name).to.eq(expectedUserDetails.name);
  expect(actualUserDetails.email).to.eq(expectedUserDetails.email);
  expect(actualUserDetails.lastLogin).to.eq("hasn't logged in yet");
  expect(isTimestampRecent(actualUserDetails.accountCreationDate, 5));
}
