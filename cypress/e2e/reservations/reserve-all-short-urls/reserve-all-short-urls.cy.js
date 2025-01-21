/// <reference types="cypress" />

import {
  reserveAllShortUrlsWithNoAuthHeader,
  reserveAllShortUrlsWithWrongKindOfAuthHeader,
  reserveAllShortUrlsWithInvalidJwtToken,
  reserveAllShortUrlsWithValidButNonAdminJwtToken,
  reserveAllShortUrlsWithValidAdminJwtToken,
} from "./requests";
import {
  expectInvalidJwtExceptionResponse,
  expectMissingBearerTokenAuthHeaderResponse,
  expectMustBeAdminResponse,
} from "../../common/security";
import { expectSuccessResponse } from "./responses";

describe("Test the `PATCH /short-url/reservations/reserve/all` REST endpoint", () => {
  beforeEach(() => {});

  it("doesn't have an authorization header", () => {
    reserveAllShortUrlsWithNoAuthHeader().then((response) => {
      expectMissingBearerTokenAuthHeaderResponse(response);
    });
  });

  it("has the wrong kind of authorization header", () => {
    reserveAllShortUrlsWithWrongKindOfAuthHeader().then((response) => {
      expectMissingBearerTokenAuthHeaderResponse(response);
    });
  });

  it("has an invalid JWT token", () => {
    reserveAllShortUrlsWithInvalidJwtToken().then((response) => {
      expectInvalidJwtExceptionResponse(response);
    });
  });

  it("has a valid but non-admin JWT token", () => {
    reserveAllShortUrlsWithValidButNonAdminJwtToken().then((response) => {
      expectMustBeAdminResponse(response);
    });
  });

  it("has a valid admin JWT token", () => {
    reserveAllShortUrlsWithValidAdminJwtToken().then((response) => {
      expectSuccessResponse(response);
    });
  });
});
