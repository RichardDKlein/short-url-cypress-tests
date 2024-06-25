/// <reference types="cypress" />

import {
  initializeRepositoryWithBasicAuthHeader,
  initializeRepositoryWithWrongKindOfAuthHeader,
  initializeRepositoryWithNoAuthHeader,
} from "./requests";
import { expectMissingBasicAuthHeaderResponse } from "../../common/security/responses";
import { expectNotOnLocalMachineResponse } from "./responses";

describe("Test the `POST /shorturl/users/dbinit` REST endpoint", () => {
  beforeEach(() => {});

  it("doesn't have an authorization header", () => {
    initializeRepositoryWithNoAuthHeader().then((response) => {
      expectMissingBasicAuthHeaderResponse(response);
    });
  });

  it("has the wrong kind of authorization header", () => {
    initializeRepositoryWithWrongKindOfAuthHeader().then((response) => {
      expectMissingBasicAuthHeaderResponse(response);
    });
  });

  it("has invalid admin credentials", () => {
    initializeRepositoryWithBasicAuthHeader(
      "invalidAdminUsername",
      "invalidAdminPassword"
    ).then((response) => {
      expectInvalidAdminCredentialsResponse(response);
    });
  });

  it("has valid admin credentials", () => {
    initializeRepositoryWithBasicAuthHeader(
      Cypress.env("adminUsername"),
      Cypress.env("adminPassword")
    ).then((response) => {
      expectNotOnLocalMachineResponse(response);
    });
  });
});
