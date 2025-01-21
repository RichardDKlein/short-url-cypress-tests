/// <reference types="cypress" />

import {
  deleteSpecificUserWithNoAuthHeader,
  deleteSpecificUserWithWrongKindOfAuthHeader,
  deleteSpecificUserWithInvalidJwtToken,
  deleteSpecificUserWithValidButNonAdminJwtToken,
  deleteSpecificNonExistentUser,
  deleteSpecificExistingUser,
} from "./requests";
import { signupAllUsers } from "../signup/requests";
import { deleteAllUsers } from "../delete-all-users/requests";
import {
  expectMissingBearerTokenAuthHeaderResponse,
  expectInvalidJwtExceptionResponse,
  expectMustBeAdminResponse,
} from "../../common/security";
import { expectNoSuchUserResponse, expectSuccessResponse } from "./responses";

describe("Test the `DELETE /short-url/users/specific/{username}` REST endpoint", () => {
  beforeEach(() => {
    deleteAllUsers().then(() => {
      signupAllUsers();
    });
  });

  it("doesn't have an authorization header", () => {
    deleteSpecificUserWithNoAuthHeader().then((response) => {
      expectMissingBearerTokenAuthHeaderResponse(response);
    });
  });

  it("has the wrong kind of authorization header", () => {
    deleteSpecificUserWithWrongKindOfAuthHeader().then((response) => {
      expectMissingBearerTokenAuthHeaderResponse(response);
    });
  });

  it("has an invalid JWT token", () => {
    deleteSpecificUserWithInvalidJwtToken().then((response) => {
      expectInvalidJwtExceptionResponse(response);
    });
  });

  it("has a valid but non-admin JWT token", () => {
    deleteSpecificUserWithValidButNonAdminJwtToken().then((response) => {
      expectMustBeAdminResponse(response);
    });
  });

  it("attempts to delete a nonexistent user", () => {
    deleteSpecificNonExistentUser().then((response) => {
      expectNoSuchUserResponse(response);
    });
  });

  it("successfully deletes an existing user", () => {
    deleteSpecificExistingUser().then((response) => {
      expectSuccessResponse(response);
    });
  });
});
