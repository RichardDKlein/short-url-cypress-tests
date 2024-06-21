/// <reference types="cypress" />

import { HTTP_RESPONSES } from "./responses";

export function verifyMissingBearerTokenAuthHeader(response) {
  expect(JSON.stringify(response.body)).to.eq(
    JSON.stringify(HTTP_RESPONSES.MISSING_BEARER_TOKEN_AUTH_HEADER)
  );
}

export function verifyInvalidJwtToken(response) {
  expect(JSON.stringify(response.body)).to.eq(
    JSON.stringify(HTTP_RESPONSES.INVALID_JWT_TOKEN)
  );
}
