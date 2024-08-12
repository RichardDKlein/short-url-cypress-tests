/// <reference types="cypress" />

import {
  reserveAnyShortUrlWithNoAuthHeader,
  reserveAnyShortUrlWithWrongKindOfAuthHeader,
  reserveAnyShortUrlWithInvalidJwtToken,
  reserveAnyShortUrlWithValidButNonAdminJwtToken,
  reserveAnyShortUrlWhenNoneAreAvailable,
  reserveAnyShortUrlWhenOneIsAvailable,
} from "./requests";
import {
  expectMissingBearerTokenAuthHeaderResponse,
  expectInvalidJwtHeaderResponse,
  expectMustBeAdminResponse,
} from "../../common/security";
import {
  expectNoShortUrlsAreAvailableResponse,
  expectSuccessResponse,
} from "./responses";

describe("Test the `PATCH /short-url/reservations/reserve/any` REST endpoint", () => {
  beforeEach(() => {});

  it("doesn't have an authorization header", () => {
    reserveAnyShortUrlWithNoAuthHeader().then((response) => {
      expectMissingBearerTokenAuthHeaderResponse(response);
    });
  });

  it("has the wrong kind of authorization header", () => {
    reserveAnyShortUrlWithWrongKindOfAuthHeader().then((response) => {
      expectMissingBearerTokenAuthHeaderResponse(response);
    });
  });

  it("has an invalid JWT token", () => {
    reserveAnyShortUrlWithInvalidJwtToken().then((response) => {
      expectInvalidJwtHeaderResponse(response);
    });
  });

  it("has a valid but non-admin JWT token", () => {
    reserveAnyShortUrlWithValidButNonAdminJwtToken().then((response) => {
      expectMustBeAdminResponse(response);
    });
  });

  it("attempts to reserve any short URL when none are available", () => {
    reserveAnyShortUrlWhenNoneAreAvailable().then((response) => {
      expectNoShortUrlsAreAvailableResponse(response);
    });
  });

  it("successfully reserves any available short URL", () => {
    reserveAnyShortUrlWhenOneIsAvailable().then((response) => {
      expectSuccessResponse(response);
    });
  });
});
