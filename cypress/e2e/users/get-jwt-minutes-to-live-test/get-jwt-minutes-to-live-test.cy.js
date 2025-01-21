/// <reference types="cypress" />

import {
  getJwtMinutesToLiveTestWithNoAuthHeader,
  getJwtMinutesToLiveTestWithWrongKindOfAuthHeader,
  getJwtMinutesToLiveTestWithInvalidAdminCredentials,
  getJwtMinutesToLiveTestWithValidAdminCredentials,
} from "./requests";
import { expectSuccessResponse } from "./responses";
import {
  expectMissingBasicAuthHeaderResponse,
  expectInvalidAdminCredentialsResponse,
} from "../../common/security";

describe("Test the `GET /short-url/users/jwt-minutes-to-live-test` REST endpoint", () => {
  beforeEach(() => {});

  it("doesn't have an authorization header", () => {
    getJwtMinutesToLiveTestWithNoAuthHeader().then((response) => {
      expectMissingBasicAuthHeaderResponse(response);
    });
  });

  it("has the wrong kind of authorization header", () => {
    getJwtMinutesToLiveTestWithWrongKindOfAuthHeader().then((response) => {
      expectMissingBasicAuthHeaderResponse(response);
    });
  });

  it("has invalid admin credentials", () => {
    getJwtMinutesToLiveTestWithInvalidAdminCredentials().then((response) => {
      expectInvalidAdminCredentialsResponse(response);
    });
  });

  it("successfully gets the JWT minutes to live (test)", () => {
    getJwtMinutesToLiveTestWithValidAdminCredentials().then((response) => {
      expectSuccessResponse(response);
    });
  });
});
