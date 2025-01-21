/// <reference types="cypress" />

import {
  getSpecificReservationWithNoAuthHeader,
  getSpecificReservationWithWrongKindOfAuthHeader,
  getSpecificReservationWithInvalidJwtToken,
  getSpecificReservationWithValidButNonAdminJwtToken,
  getSpecificReservationForNonExistentReservation,
  getSpecificReservationForAnExistingReservation,
} from "./requests";
import {
  expectMissingBearerTokenAuthHeaderResponse,
  expectInvalidJwtExceptionResponse,
  expectMustBeAdminResponse,
} from "../../common/security";
import {
  expectNoSuchReservationResponse,
  expectSuccessResponse,
} from "./responses";

describe("Test the `GET /short-url/reservations/specific/{short-url}` REST endpoint", () => {
  beforeEach(() => {});

  it("doesn't have an authorization header", () => {
    getSpecificReservationWithNoAuthHeader().then((response) => {
      expectMissingBearerTokenAuthHeaderResponse(response);
    });
  });

  it("has the wrong kind of authorization header", () => {
    getSpecificReservationWithWrongKindOfAuthHeader().then((response) => {
      expectMissingBearerTokenAuthHeaderResponse(response);
    });
  });

  it("has an invalid JWT token", () => {
    getSpecificReservationWithInvalidJwtToken().then((response) => {
      expectInvalidJwtExceptionResponse(response);
    });
  });

  it("has a valid but non-admin JWT token", () => {
    getSpecificReservationWithValidButNonAdminJwtToken().then((response) => {
      expectMustBeAdminResponse(response);
    });
  });

  it("attempts to get a nonexistent reservation", () => {
    getSpecificReservationForNonExistentReservation().then((response) => {
      expectNoSuchReservationResponse(response);
    });
  });

  it("successfully gets an existing reservation", () => {
    getSpecificReservationForAnExistingReservation().then((response) => {
      expectSuccessResponse(response);
    });
  });
});
