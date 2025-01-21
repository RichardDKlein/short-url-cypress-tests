/// <reference types="cypress" />

import {
  getMappingsWithNoAuthHeader,
  getMappingsWithWrongKindOfAuthHeader,
  getMappingsWithInvalidJwtToken,
  getMappingsWithValidButNonAdminJwtToken,
  getMappingsWithMissingUsername,
  getMappingsWithEmptyUsername,
  getMappingsWithBlankUsername,
  getMappingsWithMissingShortUrl,
  getMappingsWithEmptyShortUrl,
  getMappingsWithBlankShortUrl,
  getMappingsWithMissingLongUrl,
  getMappingsWithEmptyLongUrl,
  getMappingsWithBlankLongUrl,
  getMappingsWithWildcardUsername,
  getMappingsWithWildcardShortUrl,
  getMappingsWithWildcardLongUrl,
  getMappingsWithAllWildcards,
  getMappingsWithoutWildcards,
} from "./requests";
import { deleteAllMappings } from "../delete-mappings/requests";
import { createAllMappings } from "../create-mapping/requests";
import {
  expectInvalidJwtExceptionResponse,
  expectMissingBearerTokenAuthHeaderResponse,
  expectMustBeAdminResponse,
} from "../../common/security";
import {
  expectMissingUsernameResponse,
  expectMissingShortUrlResponse,
  expectMissingLongUrlResponse,
  expectSuccessWithWildcardUsernameResponse,
  expectSuccessWithWildcardShortUrlResponse,
  expectSuccessWithWildcardLongUrlResponse,
  expectSuccessWithAllWildcardsResponse,
  expectSuccessWithoutWildcardsResponse,
} from "./responses";

describe("Test the `GET /short-url/mappings/get-mappings` REST endpoint", () => {
  beforeEach(() => {
    deleteAllMappings().then(() => {
      createAllMappings();
    });
  });

  it("doesn't have an authorization header", () => {
    getMappingsWithNoAuthHeader().then((response) => {
      expectMissingBearerTokenAuthHeaderResponse(response);
    });
  });

  it("has the wrong kind of authorization header", () => {
    getMappingsWithWrongKindOfAuthHeader().then((response) => {
      expectMissingBearerTokenAuthHeaderResponse(response);
    });
  });

  it("has an invalid JWT token", () => {
    getMappingsWithInvalidJwtToken().then((response) => {
      expectInvalidJwtExceptionResponse(response);
    });
  });

  it("has a valid but non-admin JWT token", () => {
    getMappingsWithValidButNonAdminJwtToken().then((response) => {
      expectMustBeAdminResponse(response);
    });
  });

  it("has a missing username", () => {
    getMappingsWithMissingUsername().then((response) => {
      expectMissingUsernameResponse(response);
    });
  });

  it("has an empty username", () => {
    getMappingsWithEmptyUsername().then((response) => {
      expectMissingUsernameResponse(response);
    });
  });

  it("has a blank username", () => {
    getMappingsWithBlankUsername().then((response) => {
      expectMissingUsernameResponse(response);
    });
  });

  it("has a missing short URL", () => {
    getMappingsWithMissingShortUrl().then((response) => {
      expectMissingShortUrlResponse(response);
    });
  });

  it("has an empty short URL", () => {
    getMappingsWithEmptyShortUrl().then((response) => {
      expectMissingShortUrlResponse(response);
    });
  });

  it("has a blank short URL", () => {
    getMappingsWithBlankShortUrl().then((response) => {
      expectMissingShortUrlResponse(response);
    });
  });

  it("has a missing long URL", () => {
    getMappingsWithMissingLongUrl().then((response) => {
      expectMissingLongUrlResponse(response);
    });
  });

  it("has an empty long URL", () => {
    getMappingsWithEmptyLongUrl().then((response) => {
      expectMissingLongUrlResponse(response);
    });
  });

  it("has a blank long URL", () => {
    getMappingsWithBlankLongUrl().then((response) => {
      expectMissingLongUrlResponse(response);
    });
  });

  it("has a wildcard username", () => {
    getMappingsWithWildcardUsername().then((response) => {
      expectSuccessWithWildcardUsernameResponse(response);
    });
  });

  it("has a wildcard short URL", () => {
    getMappingsWithWildcardShortUrl().then((response) => {
      expectSuccessWithWildcardShortUrlResponse(response);
    });
  });

  it("has a wildcard long URL", () => {
    getMappingsWithWildcardLongUrl().then((response) => {
      expectSuccessWithWildcardLongUrlResponse(response);
    });
  });

  it("has all wildcards", () => {
    getMappingsWithAllWildcards().then((response) => {
      expectSuccessWithAllWildcardsResponse(response);
    });
  });

  it("has no wildcards", () => {
    getMappingsWithoutWildcards().then((response) => {
      expectSuccessWithoutWildcardsResponse(response);
    });
  });
});
