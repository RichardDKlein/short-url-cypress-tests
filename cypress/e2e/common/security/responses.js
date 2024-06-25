/// <reference types="cypress" />

import { HTTP_STATUS_CODES } from "../constants";

export const SECURITY_RESPONSES = {
  INVALID_JWT_EXCEPTION: {
    httpStatus: HTTP_STATUS_CODES.UNAUTHORIZED,
    response: {
      status: "INVALID_JWT_EXCEPTION",
      message: "Malformed protected header JSON",
    },
  },
  MISSING_BEARER_TOKEN_AUTH_HEADER: {
    httpStatus: HTTP_STATUS_CODES.UNAUTHORIZED,
    response: {
      status: "MISSING_AUTHORIZATION_HEADER",
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

export function expectMissingBearerTokenAuthHeaderResponse(response) {
  expect(response.status).to.eq(
    SECURITY_RESPONSES.MISSING_BEARER_TOKEN_AUTH_HEADER.httpStatus
  );
  expect(JSON.stringify(response.body)).to.eq(
    JSON.stringify(SECURITY_RESPONSES.MISSING_BEARER_TOKEN_AUTH_HEADER.response)
  );
}
