/// <reference types="cypress" />

import {
  cancelSpecificReservationWithNoAuthHeader,
  cancelSpecificReservationWithWrongKindOfAuthHeader,
  cancelSpecificReservationWithInvalidJwtToken,
  cancelSpecificReservationWithValidButNonAdminJwtToken,
  cancelSpecificReservationForNonExistentShortUrl,
  cancelSpecificReservationForUnReservedShortUrl,
  cancelSpecificReservationForReservedShortUrl,
} from "./requests";
import {
  expectMissingBearerTokenAuthHeaderResponse,
  expectInvalidJwtHeaderResponse,
  expectMustBeAdminResponse,
} from "../../common/security";
import {
  expectNoSuchShortUrlResponse,
  expectShortUrlNotReservedResponse,
  expectSuccessResponse,
} from "./responses";

describe("Test the `PATCH /short-url/reservations/cancel/specific/{short-url}` REST endpoint", () => {
  beforeEach(() => {});

  it("doesn't have an authorization header", () => {
    cancelSpecificReservationWithNoAuthHeader().then((response) => {
      expectMissingBearerTokenAuthHeaderResponse(response);
    });
  });

  it("has the wrong kind of authorization header", () => {
    cancelSpecificReservationWithWrongKindOfAuthHeader().then((response) => {
      expectMissingBearerTokenAuthHeaderResponse(response);
    });
  });

  it("has an invalid JWT token", () => {
    cancelSpecificReservationWithInvalidJwtToken().then((response) => {
      expectInvalidJwtHeaderResponse(response);
    });
  });

  it("has a valid but non-admin JWT token", () => {
    cancelSpecificReservationWithValidButNonAdminJwtToken().then((response) => {
      expectMustBeAdminResponse(response);
    });
  });

  it("attempts to cancel a reservation for a nonexistent short URL", () => {
    cancelSpecificReservationForNonExistentShortUrl().then((response) => {
      expectNoSuchShortUrlResponse(response);
    });
  });

  it("attempts to cancel a reservation for am unreserved short URL", () => {
    cancelSpecificReservationForUnReservedShortUrl().then((response) => {
      expectShortUrlNotReservedResponse(response);
    });
  });

  it("successfully cancels a reservation for a reserved short URL", () => {
    cancelSpecificReservationForReservedShortUrl().then((response) => {
      expectSuccessResponse(response);
    });
  });
});
