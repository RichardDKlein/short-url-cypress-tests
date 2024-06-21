/// <reference types="cypress" />

import { USERS_BASE_URL } from "../../utilities/constants";

export const USER_HTTP_REQUESTS = {
  GET_ALL_USERS_NO_AUTH_HEADER: {
    method: "GET",
    url: `${USERS_BASE_URL}/all`,
    failOnStatusCode: false,
  },
  GET_ALL_USERS_WRONG_KIND_OF_AUTH_HEADER: {
    method: "GET",
    url: `${USERS_BASE_URL}/all`,
    headers: {
      Authorization: "Basic " + btoa("username:password"),
    },
    failOnStatusCode: false,
  },
  GET_ALL_USERS_INVALID_JWT_TOKEN: {
    method: "GET",
    url: `${USERS_BASE_URL}/all`,
    headers: {
      Authorization: "Bearer <jwtToken>",
    },
    failOnStatusCode: false,
  },
  LOGIN: {
    method: "POST",
    url: `${USERS_BASE_URL}/login`,
    body: { username: "<username>", password: "<password>" },
    failOnStatusCode: false,
  },
};
