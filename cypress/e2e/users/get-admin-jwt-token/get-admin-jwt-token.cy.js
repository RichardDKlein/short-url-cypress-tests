/// <reference types="cypress" />

import {
  getAdminJwtTokenWithBasicAuthHeader,
  getAdminJwtTokenWithNoAuthHeader,
  getAdminJwtTokenWithWrongKindOfAuthHeader,
} from "./requests";
import { expectAdminJwtTokenSuccessfullyGeneratedResponse } from "./responses";
import {
  expectMissingBasicAuthHeaderResponse,
  expectInvalidAdminCredentialsResponse,
} from "../../common/security/responses";

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
    getAdminJwtTokenWithBasicAuthHeader(
      "invalidAdminUsername",
      "invalidAdminPassword"
    ).then((response) => {
      expectInvalidAdminCredentialsResponse(response);
    });
  });

  it("has valid admin credentials", () => {
    getAdminJwtTokenWithBasicAuthHeader(
      Cypress.env("adminUsername"),
      Cypress.env("adminPassword")
    ).then((response) => {
      expectAdminJwtTokenSuccessfullyGeneratedResponse(response);
    });
  });
});
