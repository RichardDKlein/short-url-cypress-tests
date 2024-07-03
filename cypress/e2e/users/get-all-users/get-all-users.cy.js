/// <reference types="cypress" />

import {
  getAllUsersWithNoAuthHeader,
  getAllUsersWithWrongKindOfAuthHeader,
  getAllUsersWithInvalidJwtToken,
  getAllUsersWithValidButNonAdminJwtToken,
  getAllUsersWithValidAdminJwtToken,
} from "./requests";
import { deleteAllUsers } from "../delete-all-users/requests";
import {
  expectInvalidJwtHeaderResponse,
  expectMissingBearerTokenAuthHeaderResponse,
  expectMustBeAdminResponse,
} from "../../common/security/responses";
import { expectAllUsersSuccessfullyDeletedResponse } from "../delete-all-users/responses";
import {
  expectAllUsersSuccessfullyCreated,
  expectAllUsersSuccessfullyRetrievedResponse,
} from "./responses";
import { signupAllUsers } from "../signup/requests";

describe("Test the `GET /shorturl/users/all` REST endpoint", () => {
  beforeEach(() => {
    deleteAllUsers();
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
    signupAllUsers().then(() => {
      getAllUsersWithValidButNonAdminJwtToken().then((response) => {
        expectMustBeAdminResponse(response);
      });
    });
  });

  it("has a valid admin JWT token", () => {
    signupAllUsers().then(() => {
      getAllUsersWithValidAdminJwtToken().then((response) => {
        expectAllUsersSuccessfullyRetrievedResponse(response);
      });
    });
  });
});
