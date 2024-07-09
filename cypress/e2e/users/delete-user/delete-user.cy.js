/// <reference types="cypress" />

import {
  deleteUserWithNoAuthHeader,
  deleteUserWithWrongKindOfAuthHeader,
  deleteUserWithInvalidJwtToken,
  deleteUserWithValidButNonAdminJwtToken,
  deleteUserWithMissingUsername,
  deleteUserWithEmptyUsername,
  deleteUserWithBlankUsername,
  deleteUser,
  deleteExistingUser,
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
  expectNoSuchUserResponse,
  expectUserSuccessfullyDeletedResponse,
} from "./responses";

describe("Test the `DELETE /shorturl/users/specific` REST endpoint", () => {
  beforeEach(() => {
    deleteAllUsers().then(() => {
      signupAllUsers();
    });
  });

  it("doesn't have an authorization header", () => {
    deleteUserWithNoAuthHeader().then((response) => {
      expectMissingBearerTokenAuthHeaderResponse(response);
    });
  });

  it("has the wrong kind of authorization header", () => {
    deleteUserWithWrongKindOfAuthHeader().then((response) => {
      expectMissingBearerTokenAuthHeaderResponse(response);
    });
  });

  it("has an invalid JWT token", () => {
    deleteUserWithInvalidJwtToken().then((response) => {
      expectInvalidJwtHeaderResponse(response);
    });
  });

  it("has a valid but non-admin JWT token", () => {
    deleteUserWithValidButNonAdminJwtToken().then((response) => {
      expectMustBeAdminResponse(response);
    });
  });

  it("doesn't specify a username", () => {
    deleteUserWithMissingUsername().then((response) => {
      expectMissingUsernameResponse(response);
    });
  });

  it("specifies an empty username", () => {
    deleteUserWithEmptyUsername().then((response) => {
      expectMissingUsernameResponse(response);
    });
  });

  it("specifies a blank username", () => {
    deleteUserWithBlankUsername().then((response) => {
      expectMissingUsernameResponse(response);
    });
  });

  it("attempts to delete a nonexistent user", () => {
    deleteUser("isaac.newton").then((response) => {
      expectNoSuchUserResponse(response);
    });
  });

  it("deletes an existing user", () => {
    deleteExistingUser().then((response) => {
      expectUserSuccessfullyDeletedResponse(response);
    });
  });
});
