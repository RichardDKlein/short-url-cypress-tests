/// <reference types="cypress" />

import { BASE_URL } from "./constants";

export const HTTP_REQUESTS = {
  GET_ALL_USERS_NO_AUTH_HEADER: {
    method: "GET",
    url: `${BASE_URL}/all`,
    failOnStatusCode: false,
  },
  GET_ALL_USERS_WRONG_KIND_OF_AUTH_HEADER: {
    method: "GET",
    url: `${BASE_URL}/all`,
    headers: {
      Authorization: "Basic " + btoa("username:password"),
    },
    failOnStatusCode: false,
  },
  GET_ALL_USERS_INVALID_JWT_TOKEN: {
    method: "GET",
    url: `${BASE_URL}/all`,
    headers: {
      Authorization: "Bearer <jwtToken>",
    },
    failOnStatusCode: false,
  },
  LOGIN_HAPPY_PATH: {
    method: "POST",
    url: `${BASE_URL}/login`,
    body: { username: "<username>", password: "<password>" },
    failOnStatusCode: false,
  },
};
