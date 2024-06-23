/// <reference types="cypress" />

import {
  USER_HTTP_REQUESTS,
  getAllUsersWithNoAuthHeader,
  getAllUsersWithWrongKindOfAuthHeader,
  loginAsAdmin,
} from "../utilities/requests";
import { USERS } from "../utilities/users";
import { USERS_BASE_URL } from "../../common/constants";
import {
  expectMissingBearerTokenAuthHeaderResponse,
  verifyInvalidJwtException,
} from "../../common/security";

describe("Test the `GET /shorturl/users/all` REST endpoint", () => {
  beforeEach(() => {});

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
      const jwtToken = response.body.jwtToken;
      const invalidJwtToken = jwtToken.substring(1);
      var request = { ...USER_HTTP_REQUESTS.GET_ALL_USERS_JWT_TOKEN };
      request.headers.Authorization = "Bearer " + invalidJwtToken;
      cy.request(request).then((response) => {
        verifyInvalidJwtException(response);
      });
    });
  });

  it("is logged in as a user who is not an admin", () => {
    Object.entries(USERS).forEach(([key, value]) => {
      console.log(key, value);
      cy.request({
        method: "POST",
        url: `${USERS_BASE_URL}/signup`,
        body: value,
        failOnStatusCode: false,
      }).then((response) => {
        console.log(response.body);
      });
    });
    console.log("Console log: Finished with `.forEach() loop`");
    Object.entries(USERS).forEach(([key, value]) => {
      console.log(key, value);
      console.log("key = " + key);
      console.log("value = " + value);
      cy.request({
        method: "POST",
        url: `${USERS_BASE_URL}/signup`,
        body: value,
        failOnStatusCode: false,
      }).then((response) => {
        console.log(response.body);
      });
    });
    //   const username = USERS.JOHN_DOE.username;
    //   const password = USERS.JOHN_DOE.password;
    //   cy.login(username, password).then((response) => {
    //     const jwtToken = response.body.jwtToken;
    //     var request = { ...USER_HTTP_REQUESTS.GET_ALL_USERS_JWT_TOKEN };
    //     request.headers.Authorization = "Bearer " + jwtToken;
    //     cy.request(request).then((response) => {
    //       verifyMustBeAdmin(response);
    //     });
    //   });
  });
});
