/// <reference types="cypress" />

import {
  createMappingWithNoAuthHeader,
  createMappingWithWrongKindOfAuthHeader,
  createMappingWithInvalidJwtToken,
  createMappingWithValidButExpiredJwtToken,
  createMappingWithValidButNonAdminJwtToken,
  createAllMappings,
  createMappingWithMissingUsername,
  createMappingWithEmptyUsername,
  createMappingWithBlankUsername,
  createMappingWithMissingShortUrl,
  createMappingWithEmptyShortUrl,
  createMappingWithBlankShortUrl,
  createMappingWithMissingLongUrl,
  createMappingWithEmptyLongUrl,
  createMappingWithBlankLongUrl,
  createMappingForExistingShortUrl,
  createMappingForNewShortUrl,
} from "./requests";
import { deleteAllMappings } from "../delete-mappings/requests";
import {
  expectExpiredJwtExceptionResponse,
  expectInvalidJwtExceptionResponse,
  expectMissingBearerTokenAuthHeaderResponse,
  expectMustBeAdminResponse,
} from "../../common/security";
import {
  expectMissingUsernameResponse,
  expectMissingShortUrlResponse,
  expectMissingLongUrlResponse,
  expectShortUrlAlreadyTakenResponse,
  expectSuccessResponse,
} from "./responses";

describe("Test the `POST /short-url/mappings/create-mapping` REST endpoint", () => {
  beforeEach(() => {
    deleteAllMappings().then(() => {
      createAllMappings();
    });
  });

  it("doesn't have an authorization header", () => {
    createMappingWithNoAuthHeader().then((response) => {
      expectMissingBearerTokenAuthHeaderResponse(response);
    });
  });

  it("has the wrong kind of authorization header", () => {
    createMappingWithWrongKindOfAuthHeader().then((response) => {
      expectMissingBearerTokenAuthHeaderResponse(response);
    });
  });

  it("has an invalid JWT token", () => {
    createMappingWithInvalidJwtToken().then((response) => {
      expectInvalidJwtExceptionResponse(response);
    });
  });

  it("has a valid but expired JWT token", () => {
    createMappingWithValidButExpiredJwtToken().then((response) => {
      expectExpiredJwtExceptionResponse(response);
    });
  });

  it("has a valid but non-admin JWT token", () => {
    createMappingWithValidButNonAdminJwtToken().then((response) => {
      expectMustBeAdminResponse(response);
    });
  });

  it("doesn't specify a username", () => {
    createMappingWithMissingUsername().then((response) => {
      expectMissingUsernameResponse(response);
    });
  });

  it("specifies an empty username", () => {
    createMappingWithEmptyUsername().then((response) => {
      expectMissingUsernameResponse(response);
    });
  });

  it("specifies a blank username", () => {
    createMappingWithBlankUsername().then((response) => {
      expectMissingUsernameResponse(response);
    });
  });

  it("doesn't specify a short URL", () => {
    createMappingWithMissingShortUrl().then((response) => {
      expectMissingShortUrlResponse(response);
    });
  });

  it("specifies an empty short URL", () => {
    createMappingWithEmptyShortUrl().then((response) => {
      expectMissingShortUrlResponse(response);
    });
  });

  it("specifies a blank short URL", () => {
    createMappingWithBlankShortUrl().then((response) => {
      expectMissingShortUrlResponse(response);
    });
  });

  it("doesn't specify a long URL", () => {
    createMappingWithMissingLongUrl().then((response) => {
      expectMissingLongUrlResponse(response);
    });
  });

  it("specifies an empty long URL", () => {
    createMappingWithEmptyLongUrl().then((response) => {
      expectMissingLongUrlResponse(response);
    });
  });

  it("specifies a blank long URL", () => {
    createMappingWithBlankLongUrl().then((response) => {
      expectMissingLongUrlResponse(response);
    });
  });

  it("attempts to create a mapping for an existing short URL", () => {
    createMappingForExistingShortUrl().then((response) => {
      expectShortUrlAlreadyTakenResponse(response);
    });
  });

  it("successfully creates a mapping for a new short URL", () => {
    createMappingForNewShortUrl().then((response) => {
      expectSuccessResponse(response);
    });
  });
});
