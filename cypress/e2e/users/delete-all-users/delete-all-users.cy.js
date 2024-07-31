/// <reference types="cypress" />

import {
  deleteAllUsers,
  deleteAllUsersWithNoAuthHeader,
  deleteAllUsersWithWrongKindOfAuthHeader,
  deleteAllUsersWithInvalidJwtToken,
  deleteAllUsersWithValidButNonAdminJwtToken,
  deleteAllUsersWithValidAdminJwtToken,
} from "./requests";
import { signupAllUsers } from "../signup/requests";
import {
  expectMissingBearerTokenAuthHeaderResponse,
  expectInvalidJwtHeaderResponse,
  expectMustBeAdminResponse,
} from "../../common/security";
import { expectSuccessResponse } from "./responses";

describe("Test the `DELETE /short-url/users/all` REST endpoint", () => {
  beforeEach(() => {
    deleteAllUsers().then(() => {
      signupAllUsers();
    });
  });

  it("doesn't have an authorization header", () => {
    deleteAllUsersWithNoAuthHeader().then((response) => {
      expectMissingBearerTokenAuthHeaderResponse(response);
    });
  });

  it("has the wrong kind of authorization header", () => {
    deleteAllUsersWithWrongKindOfAuthHeader().then((response) => {
      expectMissingBearerTokenAuthHeaderResponse(response);
    });
  });

  it("has an invalid JWT token", () => {
    deleteAllUsersWithInvalidJwtToken().then((response) => {
      expectInvalidJwtHeaderResponse(response);
    });
  });

  it("has a valid but non-admin JWT token", () => {
    deleteAllUsersWithValidButNonAdminJwtToken().then((response) => {
      expectMustBeAdminResponse(response);
    });
  });

  it("has a valid admin JWT token", () => {
    deleteAllUsersWithValidAdminJwtToken().then((response) => {
      expectSuccessResponse(response);
    });
  });
});
