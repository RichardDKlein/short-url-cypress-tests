/// <reference types="cypress" />

import {
  getAllUsersWithNoAuthHeader,
  getAllUsersWithWrongKindOfAuthHeader,
  getAllUsersWithInvalidJwtToken,
  getAllUsersWithValidButExpiredJwtToken,
  getAllUsersWithValidButNonAdminJwtToken,
  getAllUsersWithValidAdminJwtToken,
} from "./requests";
import { deleteAllUsers } from "../delete-all-users/requests";
import { signupAllUsers } from "../signup/requests";
import {
  expectExpiredJwtExceptionResponse,
  expectInvalidJwtExceptionResponse,
  expectMissingBearerTokenAuthHeaderResponse,
  expectMustBeAdminResponse,
} from "../../common/security";
import { expectSuccessResponse } from "./responses";

describe("Test the `GET /short-url/users/all` REST endpoint", () => {
  beforeEach(() => {
    deleteAllUsers().then(() => {
      signupAllUsers();
    });
  });

  it("doesn't have an authorization header", () => {
    getAllUsersWithNoAuthHeader().then((response) => {
      expectMissingBearerTokenAuthHeaderResponse(response);
    });
  });

  it("has the wrong kind of authorization header", () => {
    getAllUsersWithWrongKindOfAuthHeader().then((response) => {
      expectMissingBearerTokenAuthHeaderResponse(response);
    });
  });

  it("has an invalid JWT token", () => {
    getAllUsersWithInvalidJwtToken().then((response) => {
      expectInvalidJwtExceptionResponse(response);
    });
  });

  it("has a valid but expired JWT token", () => {
    getAllUsersWithValidButExpiredJwtToken().then((response) => {
      expectExpiredJwtExceptionResponse(response);
    });
  });

  it("has a valid but non-admin JWT token", () => {
    getAllUsersWithValidButNonAdminJwtToken().then((response) => {
      expectMustBeAdminResponse(response);
    });
  });

  it("has a valid admin JWT token", () => {
    getAllUsersWithValidAdminJwtToken().then((response) => {
      expectSuccessResponse(response);
    });
  });
});
