/// <reference types="cypress" />

export const SECURITY_RESPONSES = {
  INVALID_JWT_EXCEPTION: {
    status: "INVALID_JWT_EXCEPTION",
    message: "Malformed protected header JSON",
  },
  MISSING_BEARER_TOKEN_AUTH_HEADER: {
    status: "MISSING_AUTHORIZATION_HEADER",
    message: "The request does not contain a Bearer Token authorization header",
  },
};

export function verifyInvalidJwtException(response) {
  expect(JSON.stringify(response.body)).to.eq(
    JSON.stringify(SECURITY_RESPONSES.INVALID_JWT_EXCEPTION)
  );
}

export function expectMissingBearerTokenAuthHeaderResponse(response) {
  expect(JSON.stringify(response.body)).to.eq(
    JSON.stringify(SECURITY_RESPONSES.MISSING_BEARER_TOKEN_AUTH_HEADER)
  );
}
