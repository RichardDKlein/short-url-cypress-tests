/// <reference types="cypress" />

import { STATUS_MESSAGES } from "./constants";

export const HTTP_RESPONSES = {
  MISSING_BEARER_TOKEN_AUTH_HEADER: {
    status: "MISSING_AUTHORIZATION_HEADER",
    message: STATUS_MESSAGES.MISSING_BEARER_TOKEN_AUTH_HEADER,
  },
  INVALID_JWT_TOKEN: {},
};
