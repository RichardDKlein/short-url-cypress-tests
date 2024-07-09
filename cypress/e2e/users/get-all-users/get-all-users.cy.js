/// <reference types="cypress" />

import {
  getAllUsersWithNoAuthHeader,
  getAllUsersWithWrongKindOfAuthHeader,
  getAllUsersWithInvalidJwtToken,
  getAllUsersWithValidButNonAdminJwtToken,
  getAllUsersWithValidAdminJwtToken,
} from "./requests";
import { deleteAllUsers } from "../delete-all-users/requests";
import { signupAllUsers } from "../signup/requests";
import {
  expectInvalidJwtHeaderResponse,
  expectMissingBearerTokenAuthHeaderResponse,
  expectMustBeAdminResponse,
} from "../../common/security/responses";
import { expectAllUsersSuccessfullyRetrievedResponse } from "./responses";

describe("Test the `GET /shorturl/users/all` REST endpoint", () => {
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
      expectInvalidJwtHeaderResponse(response);
    });
  });

  it("has a valid but non-admin JWT token", () => {
    getAllUsersWithValidButNonAdminJwtToken().then((response) => {
      expectMustBeAdminResponse(response);
    });
  });

  it("has a valid admin JWT token", () => {
    getAllUsersWithValidAdminJwtToken().then((response) => {
      expectAllUsersSuccessfullyRetrievedResponse(response);
    });
  });
});
