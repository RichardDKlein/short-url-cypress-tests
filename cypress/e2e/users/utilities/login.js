/// <reference types="cypress" />

import { USER_HTTP_REQUESTS } from "./requests";

export function login(username, password) {
  var request = { ...USER_HTTP_REQUESTS.LOGIN };
  request.body = { username, password };
  return cy.request(request);
}
