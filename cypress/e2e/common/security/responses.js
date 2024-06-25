/// <reference types="cypress" />

import { HTTP_STATUS_CODES } from "../constants";

export const SECURITY_RESPONSES = {
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
};

export function expectInvalidJwtHeaderResponse(response) {
  expect(response.status).to.eq(
    SECURITY_RESPONSES.INVALID_JWT_EXCEPTION.httpStatus
  );
  expect(JSON.stringify(response.body)).to.eq(
    JSON.stringify(SECURITY_RESPONSES.INVALID_JWT_EXCEPTION.response)
  );
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
