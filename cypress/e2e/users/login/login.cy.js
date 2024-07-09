/// <reference types="cypress" />

import {
  loginWithNoAuthHeader,
  loginWithWrongKindOfAuthHeader,
  loginWithInvalidJwtToken,
  loginWithValidButNonAdminJwtToken,
  loginWithMissingUsername,
  loginWithEmptyUsername,
  loginWithBlankUsername,
  loginWithMissingPassword,
  loginWithEmptyPassword,
  loginWithBlankPassword,
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
    deleteAllUsers().then(() => {
      signupAllUsers();
    });
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
    loginWithValidButNonAdminJwtToken().then((response) => {
      expectMustBeAdminResponse(response);
    });
  });

  it("doesn't specify a username", () => {
    loginWithMissingUsername().then((response) => {
      expectMissingUsernameResponse(response);
    });
  });

  it("specifies an empty username", () => {
    loginWithEmptyUsername().then((response) => {
      expectMissingUsernameResponse(response);
    });
  });

  it("specifies a blank username", () => {
    loginWithBlankUsername().then((response) => {
      expectMissingUsernameResponse(response);
    });
  });

  it("doesn't specify a password", () => {
    loginWithMissingPassword().then((response) => {
      expectMissingPasswordResponse(response);
    });
  });

  it("specifies an empty password", () => {
    loginWithEmptyPassword().then((response) => {
      expectMissingPasswordResponse(response);
    });
  });

  it("specifies a blank password", () => {
    loginWithBlankPassword().then((response) => {
      expectMissingPasswordResponse(response);
    });
  });

  it("attempts to log in a non-existent user", () => {
    loginNonExistentUser("isaac.newton", "isaac.newton.password").then(
      (response) => {
        expectUserDoesNotExistResponse(response);
      }
    );
  });

  it("logs in an existing user", () => {
    loginExistingUser().then((response) => {
      expectUserSuccessfullyLoggedInResponse(response);
    });
  });
});
