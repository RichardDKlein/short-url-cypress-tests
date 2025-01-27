/// <reference types="cypress" />

import {
  changeLongUrlWithNoAuthHeader,
  changeLongUrlWithWrongKindOfAuthHeader,
  changeLongUrlWithInvalidJwtToken,
  changeLongUrlWithValidButExpiredJwtToken,
  changeLongUrlWithValidButNonAdminJwtToken,
  changeLongUrlWithMissingShortUrl,
  changeLongUrlWithEmptyShortUrl,
  changeLongUrlWithBlankShortUrl,
  changeLongUrlWithMissingLongUrl,
  changeLongUrlWithEmptyLongUrl,
  changeLongUrlWithBlankLongUrl,
  changeLongUrlOfUnmappedShortUrl,
  changeLongUrlOfMappedShortUrl,
} from "./requests";
import { createAllMappings } from "../create-mapping/requests";
import { deleteAllMappings } from "../delete-mappings/requests";
import {
  expectInvalidJwtExceptionResponse,
  expectExpiredJwtExceptionResponse,
  expectMissingBearerTokenAuthHeaderResponse,
  expectMustBeAdminResponse,
} from "../../common/security";
import {
  expectMissingShortUrlResponse,
  expectMissingLongUrlResponse,
  expectShortUrlNotFoundResponse,
  expectSuccessResponse,
} from "./responses";

describe("Test the `PATCH /short-url/mappings/change-long-url` REST endpoint", () => {
  beforeEach(() => {
    deleteAllMappings().then(() => {
      createAllMappings();
    });
  });

  it("doesn't have an authorization header", () => {
    changeLongUrlWithNoAuthHeader().then((response) => {
      expectMissingBearerTokenAuthHeaderResponse(response);
    });
  });

  it("has the wrong kind of authorization header", () => {
    changeLongUrlWithWrongKindOfAuthHeader().then((response) => {
      expectMissingBearerTokenAuthHeaderResponse(response);
    });
  });

  it("has an invalid JWT token", () => {
    changeLongUrlWithInvalidJwtToken().then((response) => {
      expectInvalidJwtExceptionResponse(response);
    });
  });

  it("has a valid but expired JWT token", () => {
    changeLongUrlWithValidButExpiredJwtToken().then((response) => {
      expectExpiredJwtExceptionResponse(response);
    });
  });

  it("has a valid but non-admin JWT token", () => {
    changeLongUrlWithValidButNonAdminJwtToken().then((response) => {
      expectMustBeAdminResponse(response);
    });
  });

  it("doesn't specify a short URL", () => {
    changeLongUrlWithMissingShortUrl().then((response) => {
      expectMissingShortUrlResponse(response);
    });
  });

  it("specifies an empty short URL", () => {
    changeLongUrlWithEmptyShortUrl().then((response) => {
      expectMissingShortUrlResponse(response);
    });
  });

  it("specifies a blank short URL", () => {
    changeLongUrlWithBlankShortUrl().then((response) => {
      expectMissingShortUrlResponse(response);
    });
  });

  it("doesn't specify a long URL", () => {
    changeLongUrlWithMissingLongUrl().then((response) => {
      expectMissingLongUrlResponse(response);
    });
  });

  it("specifies an empty long URL", () => {
    changeLongUrlWithEmptyLongUrl().then((response) => {
      expectMissingLongUrlResponse(response);
    });
  });

  it("specifies a blank long URL", () => {
    changeLongUrlWithBlankLongUrl().then((response) => {
      expectMissingLongUrlResponse(response);
    });
  });

  it("specifies an unmapped short URL", () => {
    changeLongUrlOfUnmappedShortUrl().then((response) => {
      expectShortUrlNotFoundResponse(response);
    });
  });

  it("successfully changes the long URL for a mapped short URL", () => {
    changeLongUrlOfMappedShortUrl().then((response) => {
      expectSuccessResponse(response);
    });
  });
});
