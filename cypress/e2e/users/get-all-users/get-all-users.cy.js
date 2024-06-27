/// <reference types="cypress" />

import { deleteAllUsers } from "../delete-user/requests";
import {
  getAllUsersWithJwtToken,
  getAllUsersWithNoAuthHeader,
  getAllUsersWithWrongKindOfAuthHeader,
} from "./requests";
import { loginAsAdmin, loginWithValidUserCredentials } from "../login/requests";
import { signupAllUsers, signupUser } from "../signup/requests";
import { expectMustBeAdminResponse } from "./responses";
import {
  expectInvalidJwtHeaderResponse,
  expectMissingBearerTokenAuthHeaderResponse,
} from "../../common/security/responses";
import { mangleJwtToken } from "../../common/security/utilities";
import {
  expectAllUsersSuccessfullyRetrievedResponse,
  expectAllUsersSuccessfullyCreated,
} from "./responses";
import { USERS } from "../users";

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

  it("has a JWT token for an admin user", () => {
    signupAllUsers();
    loginWithValidUserCredentials(
      Cypress.env("adminUsername"),
      Cypress.env("adminPassword")
    ).then((response) => {
      const adminJwtToken = response.body.jwtToken;
      getAllUsersWithJwtToken(adminJwtToken).then((response) => {
        expectAllUsersSuccessfullyRetrievedResponse(response);
        const actualUsers = response.body.shortUrlUsers;
        expectAllUsersSuccessfullyCreated(actualUsers);
      });
    });
  });
});
