/// <reference types="cypress" />

import {
  cancelAllReservationsWithNoAuthHeader,
  cancelAllReservationsWithWrongKindOfAuthHeader,
  cancelAllReservationsWithInvalidJwtToken,
  cancelAllReservationsWithValidButNonAdminJwtToken,
  cancelAllReservationsWithValidAdminJwtToken,
} from "./requests";
import {
  expectInvalidJwtExceptionResponse,
  expectMissingBearerTokenAuthHeaderResponse,
  expectMustBeAdminResponse,
} from "../../common/security";
import { expectSuccessResponse } from "./responses";

describe("Test the `PATCH /short-url/reservations/cancel/all` REST endpoint", () => {
  beforeEach(() => {});

  it("doesn't have an authorization header", () => {
    cancelAllReservationsWithNoAuthHeader().then((response) => {
      expectMissingBearerTokenAuthHeaderResponse(response);
    });
  });

  it("has the wrong kind of authorization header", () => {
    cancelAllReservationsWithWrongKindOfAuthHeader().then((response) => {
      expectMissingBearerTokenAuthHeaderResponse(response);
    });
  });

  it("has an invalid JWT token", () => {
    cancelAllReservationsWithInvalidJwtToken().then((response) => {
      expectInvalidJwtExceptionResponse(response);
    });
  });

  it("has a valid but non-admin JWT token", () => {
    cancelAllReservationsWithValidButNonAdminJwtToken().then((response) => {
      expectMustBeAdminResponse(response);
    });
  });

  it("has a valid admin JWT token", () => {
    cancelAllReservationsWithValidAdminJwtToken().then((response) => {
      expectSuccessResponse(response);
    });
  });
});
