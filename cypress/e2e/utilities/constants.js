/// <reference types="cypress" />

export const USERS_BASE_URL = "https://test.richarddklein.com/shorturl/users";

export const HTTP_STATUS_CODES = {
  INTERNAL_SERVER_ERROR: 500,
  OK: 200,
  UNAUTHORIZED: 401,
};

export const SECURITY_ERROR_MESSAGES = {
  MALFORMED_HEADER: "Malformed protected header JSON",
  MISSING_BEARER_TOKEN_AUTH_HEADER:
    "The request does not contain a Bearer Token authorization header",
};
