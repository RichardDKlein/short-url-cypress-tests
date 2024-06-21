/// <reference types="cypress" />

export const BASE_URL = "https://test.richarddklein.com/shorturl/users";

export const HTTP_STATUS = {
  INTERNAL_SERVER_ERROR: 500,
  OK: 200,
  UNAUTHORIZED: 401,
};

export const STATUS_MESSAGES = {
  MISSING_BEARER_TOKEN_AUTH_HEADER:
    "The request does not contain a Bearer Token authorization header",
};
