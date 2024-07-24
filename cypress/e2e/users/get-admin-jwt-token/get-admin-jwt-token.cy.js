/// <reference types="cypress" />

import {
  getAdminJwtTokenWithNoAuthHeader,
  getAdminJwtTokenWithWrongKindOfAuthHeader,
  getAdminJwtTokenWithInvalidAdminCredentials,
  getAdminJwtTokenWithValidAdminCredentials,
} from "./requests";
import { expectSuccessResponse } from "./responses";
import {
  expectMissingBasicAuthHeaderResponse,
  expectInvalidAdminCredentialsResponse,
} from "../../common/security";

describe("Test the `GET /shorturl/users/adminjwt` REST endpoint", () => {
  beforeEach(() => {});

  it("doesn't have an authorization header", () => {
    getAdminJwtTokenWithNoAuthHeader().then((response) => {
      expectMissingBasicAuthHeaderResponse(response);
    });
  });

  it("has the wrong kind of authorization header", () => {
    getAdminJwtTokenWithWrongKindOfAuthHeader().then((response) => {
      expectMissingBasicAuthHeaderResponse(response);
    });
  });

  it("has invalid admin credentials", () => {
    getAdminJwtTokenWithInvalidAdminCredentials().then((response) => {
      expectInvalidAdminCredentialsResponse(response);
    });
  });

  it("successfully gets an admin JWT token", () => {
    getAdminJwtTokenWithValidAdminCredentials().then((response) => {
      expectSuccessResponse(response);
    });
  });
});
