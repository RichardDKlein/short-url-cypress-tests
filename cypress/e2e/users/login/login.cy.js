/// <reference types="cypress" />

import {
  loginWithNoAuthHeader,
  loginWithWrongKindOfAuthHeader,
  loginWithInvalidJwtToken,
  loginWithValidButNonAdminJwtToken,
  loginWithMissingUsername,
  loginWithMissingPassword,
  loginNonExistentUser,
  loginExistingUser,
} from "./requests";
import { signupAllUsers } from "../signup/requests";
import { deleteAllUsers } from "../delete-all-users/requests";
import {
  expectMissingBearerTokenAuthHeaderResponse,
  expectInvalidJwtHeaderResponse,
  expectMustBeAdminResponse,
} from "../../common/security/responses";
import {
  expectMissingUsernameResponse,
  expectMissingPasswordResponse,
  expectUserDoesNotExistResponse,
  expectUserSuccessfullyLoggedInResponse,
} from "./responses";

describe("Test the `POST /shorturl/users/login` REST endpoint", () => {
  beforeEach(() => {
    deleteAllUsers();
  });

  it("doesn't have an authorization header", () => {
    loginWithNoAuthHeader().then((response) => {
      expectMissingBearerTokenAuthHeaderResponse(response);
    });
  });

  it("has the wrong kind of authorization header", () => {
    loginWithWrongKindOfAuthHeader().then((response) => {
      expectMissingBearerTokenAuthHeaderResponse(response);
    });
  });

  it("has an invalid JWT token", () => {
    loginWithInvalidJwtToken().then((response) => {
      expectInvalidJwtHeaderResponse(response);
    });
  });

  it("has a valid but non-admin JWT token", () => {
    signupAllUsers().then(() => {
      loginWithValidButNonAdminJwtToken().then((response) => {
        expectMustBeAdminResponse(response);
      });
    });
  });

  it("doesn't specify a username", () => {
    loginWithMissingUsername().then((response) => {
      expectMissingUsernameResponse(response);
    });
  });

  it("doesn't specify a password", () => {
    loginWithMissingPassword().then((response) => {
      expectMissingPasswordResponse(response);
    });
  });

  it("attempts to log in a non-existent user", () => {
    signupAllUsers().then(() => {
      loginNonExistentUser().then((response) => {
        expectUserDoesNotExistResponse(response);
      });
    });
  });

  it("logs in an existing user", () => {
    signupAllUsers().then(() => {
      loginExistingUser().then((response) => {
        expectUserSuccessfullyLoggedInResponse(response);
      });
    });
  });
});
