/// <reference types="cypress" />

import {
  getUserDetailsWithNoAuthHeader,
  getUserDetailsWithWrongKindOfAuthHeader,
  getUserDetailsWithInvalidJwtToken,
  getUserDetailsWithValidButNonAdminJwtToken,
  getUserDetailsWithMissingUsername,
  getUserDetailsWithEmptyUsername,
  getUserDetailsWithBlankUsername,
  getUserDetailsForNonExistentUser,
  getUserDetailsForAnExistingUser,
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
  expectUserDetailsSuccessfullyRetrievedResponse,
} from "./responses";

describe("Test the `GET /shorturl/users/details` REST endpoint", () => {
  beforeEach(() => {
    deleteAllUsers().then(() => {
      signupAllUsers();
    });
  });

  it("doesn't have an authorization header", () => {
    getUserDetailsWithNoAuthHeader().then((response) => {
      expectMissingBearerTokenAuthHeaderResponse(response);
    });
  });

  it("has the wrong kind of authorization header", () => {
    getUserDetailsWithWrongKindOfAuthHeader().then((response) => {
      expectMissingBearerTokenAuthHeaderResponse(response);
    });
  });

  it("has an invalid JWT token", () => {
    getUserDetailsWithInvalidJwtToken().then((response) => {
      expectInvalidJwtHeaderResponse(response);
    });
  });

  it("has a valid but non-admin JWT token", () => {
    getUserDetailsWithValidButNonAdminJwtToken().then((response) => {
      expectMustBeAdminResponse(response);
    });
  });

  it("doesn't specify a username", () => {
    getUserDetailsWithMissingUsername().then((response) => {
      expectMissingUsernameResponse(response);
    });
  });

  it("specifies an empty username", () => {
    getUserDetailsWithEmptyUsername().then((response) => {
      expectMissingUsernameResponse(response);
    });
  });

  it("specifies a blank username", () => {
    getUserDetailsWithBlankUsername().then((response) => {
      expectMissingUsernameResponse(response);
    });
  });

  it("attempts to get details for a nonexistent user", () => {
    getUserDetailsForNonExistentUser().then((response) => {
      expectNoSuchUserResponse(response);
    });
  });

  it("gets details for an existing user", () => {
    getUserDetailsForAnExistingUser().then((response) => {
      expectUserDetailsSuccessfullyRetrievedResponse(response);
    });
  });
});
