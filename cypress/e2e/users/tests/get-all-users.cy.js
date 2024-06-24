/// <reference types="cypress" />

import {
  deleteAllUsers,
  getAllUsersWithJwtToken,
  getAllUsersWithNoAuthHeader,
  getAllUsersWithWrongKindOfAuthHeader,
  loginAsAdmin,
  loginWithValidUserCredentials,
  signupUser,
} from "../utilities/requests";
import { expectMustBeAdminResponse } from "../utilities/responses";
import {
  expectInvalidJwtHeaderResponse,
  expectMissingBearerTokenAuthHeaderResponse,
  mangleJwtToken,
} from "../../common/security";
import { USERS } from "../utilities/users";

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
      getAllUsersWithJwtToken(invalidJwtToken).then((response) => {
        expectInvalidJwtHeaderResponse(response);
      });
    });
  });

  it("has a JWT token for a non-admin user", () => {
    signupUser(USERS.JOE_BLOW).then((response) => {
      loginWithValidUserCredentials(
        USERS.JOE_BLOW.username,
        USERS.JOE_BLOW.password
      ).then((response) => {
        const nonAdminJwtToken = response.body.jwtToken;
        getAllUsersWithJwtToken(nonAdminJwtToken).then((response) => {
          expectMustBeAdminResponse(response);
        });
      });
    });
  });
});
