/// <reference types="cypress" />

import { USERS_BASE_URL } from "../../common/constants";
import { loginAsAdmin } from "../login/requests";
import { getAllUsersWithJwtToken } from "../get-all-users/requests";

export function deleteUserWithValidJwtToken(username, validJwtToken) {
  return cy.request({
    method: "DELETE",
    url: `${USERS_BASE_URL}/specific`,
    body: { username },
    headers: {
      Authorization: "Bearer " + validJwtToken,
    },
    failOnStatusCode: false,
  });
}
