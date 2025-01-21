/// <reference types="cypress" />

import {
  getAllReservationsWithNoAuthHeader,
  getAllReservationsWithWrongKindOfAuthHeader,
  getAllReservationsWithInvalidJwtToken,
  getAllReservationsWithValidButNonAdminJwtToken,
  getAllReservationsWithValidAdminJwtToken,
} from "./requests";
import {
  expectInvalidJwtExceptionResponse,
  expectMissingBearerTokenAuthHeaderResponse,
  expectMustBeAdminResponse,
} from "../../common/security";
import { expectSuccessResponse } from "./responses";

describe("Test the `GET /short-url/reservations/all` REST endpoint", () => {
  beforeEach(() => {});

  it("doesn't have an authorization header", () => {
    getAllReservationsWithNoAuthHeader().then((response) => {
      expectMissingBearerTokenAuthHeaderResponse(response);
    });
  });

  it("has the wrong kind of authorization header", () => {
    getAllReservationsWithWrongKindOfAuthHeader().then((response) => {
      expectMissingBearerTokenAuthHeaderResponse(response);
    });
  });

  it("has an invalid JWT token", () => {
    getAllReservationsWithInvalidJwtToken().then((response) => {
      expectInvalidJwtExceptionResponse(response);
    });
  });

  it("has a valid but non-admin JWT token", () => {
    getAllReservationsWithValidButNonAdminJwtToken().then((response) => {
      expectMustBeAdminResponse(response);
    });
  });

  it("has a valid admin JWT token", () => {
    getAllReservationsWithValidAdminJwtToken().then((response) => {
      expectSuccessResponse(response);
    });
  });
});
