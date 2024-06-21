/// <reference types="cypress" />

import { USER_HTTP_REQUESTS } from "./requests";

export function login(username, password) {
  cy.log("username = " + username + ", password = " + password);
  var loginAdmin = USER_HTTP_REQUESTS.LOGIN_HAPPY_PATH;
  loginAdmin.body = {
    username: username,
    password: password,
  };
  cy.log(JSON.stringify(loginAdmin));
  return cy.request(loginAdmin).then((response) => {
    cy.log(JSON.stringify(response.body));
    return response.body.jwtToken;
  });
}
