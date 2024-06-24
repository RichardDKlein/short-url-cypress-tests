/// <reference types="cypress" />

import {
  deleteAllUsers,
  getAllUsersWithInvalidJwtToken,
  getAllUsersWithNoAuthHeader,
  getAllUsersWithWrongKindOfAuthHeader,
  loginAsAdmin,
} from "../utilities/requests";
import {
  expectInvalidJwtHeaderResponse,
  expectMissingBearerTokenAuthHeaderResponse,
  mangleJwtToken,
} from "../../common/security";

describe("Test the `GET /shorturl/users/all` REST endpoint", () => {
  beforeEach(() => {
    deleteAllUsers();
  });

  it("doesn't have an authorization header", () => {
    getAllUsersWithNoAuthHeader().then((response) => {
      expectMissingBearerTokenAuthHeaderResponse(response);
    });
  });

  it("has the wrong kind of authorization header", () => {
    getAllUsersWithWrongKindOfAuthHeader().then((response) => {
      expectMissingBearerTokenAuthHeaderResponse(response);
    });
  });

  it("has an invalid JWT token", () => {
    loginAsAdmin().then((response) => {
      const invalidJwtToken = mangleJwtToken(response.body.jwtToken);
      getAllUsersWithInvalidJwtToken(invalidJwtToken).then((response) => {
        expectInvalidJwtHeaderResponse(response);
      });
    });
  });

  // it("is logged in as a user who is not an admin", () => {
  //   Object.entries(USERS).forEach(([key, value]) => {
  //     console.log(key, value);
  //     cy.request({
  //       method: "POST",
  //       url: `${USERS_BASE_URL}/signup`,
  //       body: value,
  //       failOnStatusCode: false,
  //     }).then((response) => {
  //       console.log(response.body);
  //     });
  //   });
  //   console.log("Console log: Finished with `.forEach() loop`");
  //   Object.entries(USERS).forEach(([key, value]) => {
  //     console.log(key, value);
  //     console.log("key = " + key);
  //     console.log("value = " + value);
  //     cy.request({
  //       method: "POST",
  //       url: `${USERS_BASE_URL}/signup`,
  //       body: value,
  //       failOnStatusCode: false,
  //     }).then((response) => {
  //       console.log(response.body);
  //     });
  //   });
  // });
});
