/// <reference types="cypress" />

import {
  signupWithNoAuthHeader,
  signupWithWrongKindOfAuthHeader,
  signupWithInvalidJwtToken,
  signupWithValidButNonAdminJwtToken,
  signupAllUsers,
  signupWithMissingUsername,
  signupWithEmptyUsername,
  signupWithBlankUsername,
  signupWithMissingPassword,
  signupWithEmptyPassword,
  signupWithBlankPassword,
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
    deleteAllUsers().then(() => {
      signupAllUsers();
    });
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
    signupWithValidButNonAdminJwtToken().then((response) => {
      expectMustBeAdminResponse(response);
    });
  });

  it("doesn't specify a username", () => {
    signupWithMissingUsername().then((response) => {
      expectMissingUsernameResponse(response);
    });
  });

  it("specifies an empty username", () => {
    signupWithEmptyUsername().then((response) => {
      expectMissingUsernameResponse(response);
    });
  });

  it("specifies a blank username", () => {
    signupWithBlankUsername().then((response) => {
      expectMissingUsernameResponse(response);
    });
  });

  it("doesn't specify a password", () => {
    signupWithMissingPassword().then((response) => {
      expectMissingPasswordResponse(response);
    });
  });

  it("specifies an empty password", () => {
    signupWithEmptyPassword().then((response) => {
      expectMissingPasswordResponse(response);
    });
  });

  it("specifies a blank password", () => {
    signupWithBlankPassword().then((response) => {
      expectMissingPasswordResponse(response);
    });
  });

  it("attempts to sign up an existing user", () => {
    signupExistingUser().then((response) => {
      expectUserAlreadyExistsResponse(response);
    });
  });

  it("signs up a new user", () => {
    signupNewUser("isaac.newton", "isaac.newton.password").then((response) => {
      expectUserSuccessfullyCreatedResponse(response);
    });
  });
});
