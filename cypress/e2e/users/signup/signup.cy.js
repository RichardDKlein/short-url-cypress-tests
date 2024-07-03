/// <reference types="cypress" />

import {
  signupWithNoAuthHeader,
  signupWithWrongKindOfAuthHeader,
  signupWithInvalidJwtToken,
  signupWithValidButNonAdminJwtToken,
  signupWithValidAdminJwtToken,
} from "./requests";
import { deleteAllUsers } from "../delete-all-users/requests";
import {
  expectMissingBearerTokenAuthHeaderResponse,
  expectInvalidJwtHeaderResponse,
  expectMustBeAdminResponse,
} from "../../common/security/responses";
import { expectUserSuccessfullyCreatedResponse } from "./responses";

describe("Test the `POST /shorturl/users/signup` REST endpoint", () => {
  beforeEach(() => {
    deleteAllUsers();
  });

  it("doesn't have an authorization header", () => {
    signupWithNoAuthHeader().then((response) => {
      expectMissingBearerTokenAuthHeaderResponse(response);
    });
  });

  it("has the wrong kind of authorization header", () => {
    signupWithWrongKindOfAuthHeader().then((response) => {
      expectMissingBearerTokenAuthHeaderResponse(response);
    });
  });

  it("has an invalid JWT token", () => {
    signupWithInvalidJwtToken().then((response) => {
      expectInvalidJwtHeaderResponse(response);
    });
  });

  it("has a valid but non-admin JWT token", () => {
    signupWithValidButNonAdminJwtToken().then((response) => {
      expectMustBeAdminResponse(response);
    });
  });

  it("has a valid admin JWT token", () => {
    signupWithValidAdminJwtToken().then((response) => {
      expectUserSuccessfullyCreatedResponse(response);
    });
  });
});
