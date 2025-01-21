/// <reference types="cypress" />

import {
  reserveSpecificShortUrlWithNoAuthHeader,
  reserveSpecificShortUrlWithWrongKindOfAuthHeader,
  reserveSpecificShortUrlWithInvalidJwtToken,
  reserveSpecificShortUrlWithValidButNonAdminJwtToken,
  reserveSpecificNonExistentShortUrl,
  reserveSpecificAlreadyReservedShortUrl,
  reserveSpecificAvailableShortUrl,
} from "./requests";
import {
  expectMissingBearerTokenAuthHeaderResponse,
  expectInvalidJwtExceptionResponse,
  expectMustBeAdminResponse,
} from "../../common/security";
import {
  expectNoSuchShortUrlResponse,
  expectShortUrlAlreadyReservedResponse,
  expectSuccessResponse,
} from "./responses";

describe("Test the `PATCH /short-url/reservations/reserve/specific/{short-url}` REST endpoint", () => {
  beforeEach(() => {});

  it("doesn't have an authorization header", () => {
    reserveSpecificShortUrlWithNoAuthHeader().then((response) => {
      expectMissingBearerTokenAuthHeaderResponse(response);
    });
  });

  it("has the wrong kind of authorization header", () => {
    reserveSpecificShortUrlWithWrongKindOfAuthHeader().then((response) => {
      expectMissingBearerTokenAuthHeaderResponse(response);
    });
  });

  it("has an invalid JWT token", () => {
    reserveSpecificShortUrlWithInvalidJwtToken().then((response) => {
      expectInvalidJwtExceptionResponse(response);
    });
  });

  it("has a valid but non-admin JWT token", () => {
    reserveSpecificShortUrlWithValidButNonAdminJwtToken().then((response) => {
      expectMustBeAdminResponse(response);
    });
  });

  it("attempts to reserve a nonexistent short URL", () => {
    reserveSpecificNonExistentShortUrl().then((response) => {
      expectNoSuchShortUrlResponse(response);
    });
  });

  it("attempts to reserve an already reserved short URL", () => {
    reserveSpecificAlreadyReservedShortUrl().then((response) => {
      expectShortUrlAlreadyReservedResponse(response);
    });
  });

  it("successfully reserves an available short URL", () => {
    reserveSpecificAvailableShortUrl().then((response) => {
      expectSuccessResponse(response);
    });
  });
});
