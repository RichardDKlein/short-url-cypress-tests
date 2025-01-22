/// <reference types="cypress" />

import { HTTP_STATUS_CODES } from "./constants";

export const SECURITY_RESPONSES = {
  EXPIRED_JWT_EXCEPTION: {
    httpStatus: HTTP_STATUS_CODES.UNAUTHORIZED,
    response: {
      status: "EXPIRED_JWT_EXCEPTION",
      message: "JWT expired ${millisecs} milliseconds ago at ${timestamp}",
    },
  },
  INVALID_ADMIN_CREDENTIALS: {
    httpStatus: HTTP_STATUS_CODES.UNAUTHORIZED,
    response: {
      status: "INVALID_ADMIN_CREDENTIALS",
      message:
        "The Authorization header does not contain valid Admin credentials",
    },
  },
  INVALID_JWT_EXCEPTION: {
    httpStatus: HTTP_STATUS_CODES.UNAUTHORIZED,
    response: {
      status: "INVALID_JWT_EXCEPTION",
      message: "Malformed protected header JSON",
    },
  },
  MISSING_BASIC_AUTHORIZATION_HEADER: {
    httpStatus: HTTP_STATUS_CODES.UNAUTHORIZED,
    response: {
      status: "MISSING_BASIC_AUTHORIZATION_HEADER",
      message: "The request does not contain a Basic authorization header",
    },
  },
  MISSING_BEARER_TOKEN_AUTHORIZATION_HEADER: {
    httpStatus: HTTP_STATUS_CODES.UNAUTHORIZED,
    response: {
      status: "MISSING_BEARER_TOKEN_AUTHORIZATION_HEADER",
      message:
        "The request does not contain a Bearer Token authorization header",
    },
  },
  MUST_BE_ADMIN: {
    httpStatus: HTTP_STATUS_CODES.UNAUTHORIZED,
    response: {
      status: "MUST_BE_ADMIN",
      message: "Must be an admin to perform this operation",
    },
  },
};

export function expectInvalidAdminCredentialsResponse(response) {
  expect(response.status).to.eq(
    SECURITY_RESPONSES.INVALID_ADMIN_CREDENTIALS.httpStatus
  );
  expect(JSON.stringify(response.body)).to.eq(
    JSON.stringify(SECURITY_RESPONSES.INVALID_ADMIN_CREDENTIALS.response)
  );
}

export function expectInvalidJwtExceptionResponse(response) {
  expect(response.status).to.eq(
    SECURITY_RESPONSES.INVALID_JWT_EXCEPTION.httpStatus
  );
  expect(JSON.stringify(response.body)).to.eq(
    JSON.stringify(SECURITY_RESPONSES.INVALID_JWT_EXCEPTION.response)
  );
}

export function expectExpiredJwtExceptionResponse(response) {
  expect(response.status).to.eq(
    SECURITY_RESPONSES.EXPIRED_JWT_EXCEPTION.httpStatus
  );
  var expectedResponse = {
    ...SECURITY_RESPONSES.EXPIRED_JWT_EXCEPTION.response,
  };
  const regex = /JWT expired (\d+) milliseconds ago at (\d{4}-.*)/;
  const matches = response.body.message.match(regex);
  const millisecs = matches[1];
  const timestamp = matches[2];
  expectedResponse.message = expectedResponse.message.replace(
    "${millisecs}",
    millisecs
  );
  expectedResponse.message = expectedResponse.message.replace(
    "${timestamp}",
    timestamp
  );
  expect(JSON.stringify(response.body)).to.eq(JSON.stringify(expectedResponse));
}

export function expectMissingBasicAuthHeaderResponse(response) {
  expect(response.status).to.eq(
    SECURITY_RESPONSES.MISSING_BASIC_AUTHORIZATION_HEADER.httpStatus
  );
  expect(JSON.stringify(response.body)).to.eq(
    JSON.stringify(
      SECURITY_RESPONSES.MISSING_BASIC_AUTHORIZATION_HEADER.response
    )
  );
}

export function expectMissingBearerTokenAuthHeaderResponse(response) {
  expect(response.status).to.eq(
    SECURITY_RESPONSES.MISSING_BEARER_TOKEN_AUTHORIZATION_HEADER.httpStatus
  );
  expect(JSON.stringify(response.body)).to.eq(
    JSON.stringify(
      SECURITY_RESPONSES.MISSING_BEARER_TOKEN_AUTHORIZATION_HEADER.response
    )
  );
}

export function expectMustBeAdminResponse(response) {
  expect(response.status).to.eq(SECURITY_RESPONSES.MUST_BE_ADMIN.httpStatus);
  expect(JSON.stringify(response.body)).to.eq(
    JSON.stringify(SECURITY_RESPONSES.MUST_BE_ADMIN.response)
  );
}
