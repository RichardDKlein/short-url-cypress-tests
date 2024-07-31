/// <reference types="cypress" />

import {
  deleteUserWithNoAuthHeader,
  deleteUserWithWrongKindOfAuthHeader,
  deleteUserWithInvalidJwtToken,
  deleteUserWithValidButNonAdminJwtToken,
  deleteUserWithMissingUsername,
  deleteUserWithEmptyUsername,
  deleteUserWithBlankUsername,
  deleteNonExistentUser,
  deleteAnExistingUser,
} from "./requests";
import { signupAllUsers } from "../signup/requests";
import { deleteAllUsers } from "../delete-all-users/requests";
import {
  expectMissingBearerTokenAuthHeaderResponse,
  expectInvalidJwtHeaderResponse,
  expectMustBeAdminResponse,
} from "../../common/security";
import {
  expectMissingUsernameResponse,
  expectNoSuchUserResponse,
  expectSuccessResponse,
} from "./responses";

describe("Test the `DELETE /short-url/users/specific` REST endpoint", () => {
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
    deleteNonExistentUser().then((response) => {
      expectNoSuchUserResponse(response);
    });
  });

  it("successfully deletes an existing user", () => {
    deleteAnExistingUser().then((response) => {
      expectSuccessResponse(response);
    });
  });
});
