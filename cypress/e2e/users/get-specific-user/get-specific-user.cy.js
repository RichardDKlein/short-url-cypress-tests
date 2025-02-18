/// <reference types="cypress" />

import {
  getSpecificUserWithNoAuthHeader,
  getSpecificUserWithWrongKindOfAuthHeader,
  getSpecificUserWithInvalidJwtToken,
  getSpecificUserWithValidButExpiredJwtToken,
  getSpecificUserWithValidButNonAdminJwtToken,
  getSpecificUserForNonExistentUser,
  getSpecificUserForAnExistingUser,
} from "./requests";
import { signupAllUsers } from "../signup/requests";
import { deleteAllUsers } from "../delete-all-users/requests";
import {
  expectExpiredJwtExceptionResponse,
  expectInvalidJwtExceptionResponse,
  expectMissingBearerTokenAuthHeaderResponse,
  expectMustBeAdminResponse,
} from "../../common/security";
import { expectNoSuchUserResponse, expectSuccessResponse } from "./responses";

describe("Test the `GET /short-url/users/specific/{username}` REST endpoint", () => {
  beforeEach(() => {
    deleteAllUsers().then(() => {
      signupAllUsers();
    });
  });

  it("doesn't have an authorization header", () => {
    getSpecificUserWithNoAuthHeader().then((response) => {
      expectMissingBearerTokenAuthHeaderResponse(response);
    });
  });

  it("has the wrong kind of authorization header", () => {
    getSpecificUserWithWrongKindOfAuthHeader().then((response) => {
      expectMissingBearerTokenAuthHeaderResponse(response);
    });
  });

  it("has an invalid JWT token", () => {
    getSpecificUserWithInvalidJwtToken().then((response) => {
      expectInvalidJwtExceptionResponse(response);
    });
  });

  it("has a valid but expired JWT token", () => {
    getSpecificUserWithValidButExpiredJwtToken().then((response) => {
      expectExpiredJwtExceptionResponse(response);
    });
  });

  it("has a valid but non-admin JWT token", () => {
    getSpecificUserWithValidButNonAdminJwtToken().then((response) => {
      expectMustBeAdminResponse(response);
    });
  });

  it("attempts to get a nonexistent user", () => {
    getSpecificUserForNonExistentUser().then((response) => {
      expectNoSuchUserResponse(response);
    });
  });

  it("successfully gets an existing user", () => {
    getSpecificUserForAnExistingUser().then((response) => {
      expectSuccessResponse(response);
    });
  });
});
