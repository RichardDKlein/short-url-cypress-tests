/// <reference types="cypress" />

import { HTTP_STATUS_CODES, USERS } from "../../common/constants";

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
/*
            switch (shortUrlUserStatus) {
                case SUCCESS:
                    httpStatus = HttpStatus.OK;
                    message = String.format(
                            "Password successfully changed for user '%s'",
                            username);
                    break;

                case MISSING_NEW_PASSWORD:
                    httpStatus = HttpStatus.BAD_REQUEST;
                    message = "A non-empty new password must be specified";
                    break;

                case MISSING_OLD_PASSWORD:
                    httpStatus = HttpStatus.BAD_REQUEST;
                    message = "The old password must be specified";
                    break;

                case MISSING_USERNAME:
                    httpStatus = HttpStatus.BAD_REQUEST;
                    message = "A non-empty username must be specified";
                    break;

                case NO_SUCH_USER:
                    httpStatus = HttpStatus.UNAUTHORIZED;
                    message = String.format(
                            "User '%s' does not exist", username);
                    break;

                case WRONG_PASSWORD:
                    httpStatus = HttpStatus.UNAUTHORIZED;
                    message = "The specified password is not correct";
                    break;

*/
