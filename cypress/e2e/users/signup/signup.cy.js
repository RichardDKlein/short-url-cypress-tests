/// <reference types="cypress" />

import {
  signupWithNoAuthHeader,
  signupWithWrongKindOfAuthHeader,
  signupWithInvalidJwtToken,
  signupWithValidButNonAdminJwtToken,
  signupAllUsers,
  signupWithMissingUsername,
  signupWithMissingPassword,
  signupExistingUser,
  signupNewUser,
} from "./requests";
import { deleteAllUsers } from "../delete-all-users/requests";
import {
  expectMissingBearerTokenAuthHeaderResponse,
  expectInvalidJwtHeaderResponse,
  expectMustBeAdminResponse,
} from "../../common/security/responses";
import {
  expectMissingUsernameResponse,
  expectMissingPasswordResponse,
  expectUserAlreadyExistsResponse,
  expectUserSuccessfullyCreatedResponse,
} from "./responses";

describe("Test the `POST /shorturl/users/signup` REST endpoint", () => {
  beforeEach(() => {
    deleteAllUsers();
  });

  it("doesn't have an authorization header", () => {
    signupWithNoAuthHeader().then((response) => {
      expectMissingBearerTokenAuthHeaderResponse(response);
    });
  });

  it("has the wrong kind of authorization header", () => {
    signupWithWrongKindOfAuthHeader().then((response) => {
      expectMissingBearerTokenAuthHeaderResponse(response);
    });
  });

  it("has an invalid JWT token", () => {
    signupWithInvalidJwtToken().then((response) => {
      expectInvalidJwtHeaderResponse(response);
    });
  });

  it("has a valid but non-admin JWT token", () => {
    signupAllUsers().then(() => {
      signupWithValidButNonAdminJwtToken().then((response) => {
        expectMustBeAdminResponse(response);
      });
    });
  });

  it("doesn't specify a username", () => {
    signupWithMissingUsername().then((response) => {
      expectMissingUsernameResponse(response);
    });
  });

  it("doesn't specify a password", () => {
    signupWithMissingPassword().then((response) => {
      expectMissingPasswordResponse(response);
    });
  });

  it("attempts to sign up an existing user", () => {
    signupExistingUser().then((response) => {
      expectUserAlreadyExistsResponse(response);
    });
  });

  it("signs up a new user", () => {
    signupNewUser().then((response) => {
      expectUserSuccessfullyCreatedResponse(response);
    });
  });
});
