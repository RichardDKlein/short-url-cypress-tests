/// <reference types="cypress" />

import {
  deleteMappingsWithNoAuthHeader,
  deleteMappingsWithWrongKindOfAuthHeader,
  deleteMappingsWithInvalidJwtToken,
  deleteMappingsWithValidButNonAdminJwtToken,
  deleteMappingsWithMissingUsername,
  deleteMappingsWithEmptyUsername,
  deleteMappingsWithBlankUsername,
  deleteMappingsWithMissingShortUrl,
  deleteMappingsWithEmptyShortUrl,
  deleteMappingsWithBlankShortUrl,
  deleteMappingsWithMissingLongUrl,
  deleteMappingsWithEmptyLongUrl,
  deleteMappingsWithBlankLongUrl,
  deleteMappingsWithWildcardUsername,
  deleteMappingsWithWildcardShortUrl,
  deleteMappingsWithWildcardLongUrl,
  deleteMappingsWithAllWildcards,
  deleteMappingsWithoutWildcards,
} from "./requests";
import { createAllMappings } from "../create-mapping/requests";
import { deleteAllMappings } from "./requests";
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

describe("Test the `DELETE /short-url/mappings/delete-mappings` REST endpoint", () => {
  beforeEach(() => {
    deleteAllMappings().then(() => {
      createAllMappings();
    });
  });

  it("doesn't have an authorization header", () => {
    deleteMappingsWithNoAuthHeader().then((response) => {
      expectMissingBearerTokenAuthHeaderResponse(response);
    });
  });

  it("has the wrong kind of authorization header", () => {
    deleteMappingsWithWrongKindOfAuthHeader().then((response) => {
      expectMissingBearerTokenAuthHeaderResponse(response);
    });
  });

  it("has an invalid JWT token", () => {
    deleteMappingsWithInvalidJwtToken().then((response) => {
      expectInvalidJwtExceptionResponse(response);
    });
  });

  it("has a valid but non-admin JWT token", () => {
    deleteMappingsWithValidButNonAdminJwtToken().then((response) => {
      expectMustBeAdminResponse(response);
    });
  });

  it("has a missing username", () => {
    deleteMappingsWithMissingUsername().then((response) => {
      expectMissingUsernameResponse(response);
    });
  });

  it("has an empty username", () => {
    deleteMappingsWithEmptyUsername().then((response) => {
      expectMissingUsernameResponse(response);
    });
  });

  it("has a blank username", () => {
    deleteMappingsWithBlankUsername().then((response) => {
      expectMissingUsernameResponse(response);
    });
  });

  it("has a missing short URL", () => {
    deleteMappingsWithMissingShortUrl().then((response) => {
      expectMissingShortUrlResponse(response);
    });
  });

  it("has an empty short URL", () => {
    deleteMappingsWithEmptyShortUrl().then((response) => {
      expectMissingShortUrlResponse(response);
    });
  });

  it("has a blank short URL", () => {
    deleteMappingsWithBlankShortUrl().then((response) => {
      expectMissingShortUrlResponse(response);
    });
  });

  it("has a missing long URL", () => {
    deleteMappingsWithMissingLongUrl().then((response) => {
      expectMissingLongUrlResponse(response);
    });
  });

  it("has an empty long URL", () => {
    deleteMappingsWithEmptyLongUrl().then((response) => {
      expectMissingLongUrlResponse(response);
    });
  });

  it("has a blank long URL", () => {
    deleteMappingsWithBlankLongUrl().then((response) => {
      expectMissingLongUrlResponse(response);
    });
  });

  it("has a wildcard username", () => {
    deleteMappingsWithWildcardUsername().then((response) => {
      expectSuccessWithWildcardUsernameResponse(response);
    });
  });

  it("has a wildcard short URL", () => {
    deleteMappingsWithWildcardShortUrl().then((response) => {
      expectSuccessWithWildcardShortUrlResponse(response);
    });
  });

  it("has a wildcard long URL", () => {
    deleteMappingsWithWildcardLongUrl().then((response) => {
      expectSuccessWithWildcardLongUrlResponse(response);
    });
  });

  it("has all wildcards", () => {
    deleteMappingsWithAllWildcards().then((response) => {
      expectSuccessWithAllWildcardsResponse(response);
    });
  });

  it("has no wildcards", () => {
    deleteMappingsWithoutWildcards().then((response) => {
      expectSuccessWithoutWildcardsResponse(response);
    });
  });
});
