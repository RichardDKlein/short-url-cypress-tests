/// <reference types="cypress" />

import {
  initializeRepositoryWithWrongKindOfAuthHeader,
  initializeRepositoryWithNoAuthHeader,
  initializeRepositoryWithInvalidAdminCredentials,
  initializeRepositoryWithValidAdminCredentials,
} from "./requests";
import {
  expectMissingBasicAuthHeaderResponse,
  expectInvalidAdminCredentialsResponse,
} from "../../common/security";
import { expectNotOnLocalMachineResponse } from "./responses";

describe("Test the `POST /short-url/reservations/initialize-repository` REST endpoint", () => {
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
    initializeRepositoryWithInvalidAdminCredentials().then((response) => {
      expectInvalidAdminCredentialsResponse(response);
    });
  });

  it("has valid admin credentials", () => {
    initializeRepositoryWithValidAdminCredentials().then((response) => {
      expectNotOnLocalMachineResponse(response);
    });
  });
});
