/// <reference types="cypress" />

import { SECURITY_HTTP_RESPONSES } from "./responses";

export function verifyMissingBearerTokenAuthHeader(response) {
  expect(JSON.stringify(response.body)).to.eq(
    JSON.stringify(SECURITY_HTTP_RESPONSES.MISSING_BEARER_TOKEN_AUTH_HEADER)
  );
}

export function verifyInvalidJwtException(response) {
  expect(JSON.stringify(response.body)).to.eq(
    JSON.stringify(SECURITY_HTTP_RESPONSES.INVALID_JWT_EXCEPTION)
  );
}
