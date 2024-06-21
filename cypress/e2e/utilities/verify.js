/// <reference types="cypress" />

import { SECURITY_HTTP_RESPONSES } from "./responses";

export function verifyInvalidJwtException(response) {
  expect(JSON.stringify(response.body)).to.eq(
    JSON.stringify(SECURITY_HTTP_RESPONSES.INVALID_JWT_EXCEPTION)
  );
}

export function verifyMissingBearerTokenAuthHeader(response) {
  expect(JSON.stringify(response.body)).to.eq(
    JSON.stringify(SECURITY_HTTP_RESPONSES.MISSING_BEARER_TOKEN_AUTH_HEADER)
  );
}

export function verifyMustBeAdmin(response) {
  expect(JSON.stringify(response.body)).to.eq(
    JSON.stringify(SECURITY_HTTP_RESPONSES.MUST_BE_ADMIN)
  );
}
