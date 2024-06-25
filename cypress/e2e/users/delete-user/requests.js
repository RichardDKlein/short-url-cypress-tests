/// <reference types="cypress" />

import { USERS_BASE_URL } from "../../common/constants";
import { loginAsAdmin } from "../login/requests";
import { getAllUsersWithJwtToken } from "../get-all-users/requests";

export function deleteAllUsers() {
  return loginAsAdmin().then((response) => {
    const adminJwtToken = response.body.jwtToken;
    getAllUsersWithJwtToken(adminJwtToken).then((response) => {
      response.body.shortUrlUsers.forEach((user) => {
        if (user.role == "USER") {
          deleteUserWithValidJwtToken(user.username, adminJwtToken).then(
            (response) => {
              console.log("Deleted user = " + JSON.stringify(response.body));
            }
          );
        }
      });
    });
  });
}

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
