/// <reference types="cypress" />

import { MAPPINGS_BASE_URL, USERS } from "../../common/constants";
import { login } from "../../users/login/requests";
import { getAdminJwtToken } from "../../users/get-admin-jwt-token/requests";

export function deleteMappingsWithNoAuthHeader() {
  return cy.request({
    method: "DELETE",
    url: `${MAPPINGS_BASE_URL}/delete-mappings`,
    body: {
      username: "*",
      shortUrl: "*",
      longUrl: "*",
    },
    failOnStatusCode: false,
  });
}

export function deleteMappingsWithWrongKindOfAuthHeader() {
  return cy.request({
    method: "DELETE",
    url: `${MAPPINGS_BASE_URL}/delete-mappings`,
    headers: {
      Authorization: "Basic " + btoa("username:password"),
    },
    body: {
      username: "*",
      shortUrl: "*",
      longUrl: "*",
    },
    failOnStatusCode: false,
  });
}

export function deleteMappingsWithInvalidJwtToken() {
  return deleteMappingsWithSpecifiedAdminJwtToken(
    "*",
    "*",
    "*",
    "invalid.jwt.token"
  );
}

export function deleteMappingsWithValidButNonAdminJwtToken() {
  return login(USERS.JOHN_DOE.username, USERS.JOHN_DOE.password).then(
    (response) => {
      const nonAdminJwtToken = response.body.jwtToken;
      deleteMappingsWithSpecifiedAdminJwtToken("*", "*", "*", nonAdminJwtToken);
    }
  );
}

export function deleteAllMappings() {
  return deleteMappings("*", "*", "*");
}

export function deleteMappingsWithMissingUsername() {
  return getAdminJwtToken().then((response) => {
    const adminJwtToken = response.body.jwtToken;
    cy.request({
      method: "DELETE",
      url: `${MAPPINGS_BASE_URL}/delete-mappings`,
      headers: {
        Authorization: `Bearer ${adminJwtToken}`,
      },
      body: {
        shortUrl: "*",
        longUrl: "*",
      },
      failOnStatusCode: false,
    });
  });
}

export function deleteMappingsWithEmptyUsername() {
  return deleteMappings("", "*", "*");
}

export function deleteMappingsWithBlankUsername() {
  return deleteMappings("   ", "*", "*");
}

export function deleteMappingsWithMissingShortUrl() {
  return getAdminJwtToken().then((response) => {
    const adminJwtToken = response.body.jwtToken;
    cy.request({
      method: "DELETE",
      url: `${MAPPINGS_BASE_URL}/delete-mappings`,
      headers: {
        Authorization: `Bearer ${adminJwtToken}`,
      },
      body: {
        username: "*",
        longUrl: "*",
      },
      failOnStatusCode: false,
    });
  });
}

export function deleteMappingsWithEmptyShortUrl() {
  return deleteMappings("*", "", "*");
}

export function deleteMappingsWithBlankShortUrl() {
  return deleteMappings("*", "   ", "*");
}

export function deleteMappingsWithMissingLongUrl() {
  return getAdminJwtToken().then((response) => {
    const adminJwtToken = response.body.jwtToken;
    cy.request({
      method: "DELETE",
      url: `${MAPPINGS_BASE_URL}/delete-mappings`,
      headers: {
        Authorization: `Bearer ${adminJwtToken}`,
      },
      body: {
        username: "*",
        shortUrl: "*",
      },
      failOnStatusCode: false,
    });
  });
}

export function deleteMappingsWithEmptyLongUrl() {
  return deleteMappings("*", "*", "");
}

export function deleteMappingsWithBlankLongUrl() {
  return deleteMappings("*", "*", "   ");
}

export function deleteMappingsWithWildcardUsername() {
  return deleteMappings("*", "google1", "https://www.google.com");
}

export function deleteMappingsWithWildcardShortUrl() {
  return deleteMappings("youtube", "*", "https://www.youtube.com");
}

export function deleteMappingsWithWildcardLongUrl() {
  return deleteMappings("facebook", "facebook2", "*");
}

export function deleteMappingsWithAllWildcards() {
  return deleteMappings("*", "*", "*");
}

export function deleteMappingsWithoutWildcards() {
  return deleteMappings("youtube", "youtube1", "https://www.youtube.com");
}

export function deleteMappings(username, shortUrl, longUrl) {
  return getAdminJwtToken().then((response) => {
    const adminJwtToken = response.body.jwtToken;
    return deleteMappingsWithSpecifiedAdminJwtToken(
      username,
      shortUrl,
      longUrl,
      adminJwtToken
    );
  });
}

export function deleteMappingsWithSpecifiedAdminJwtToken(
  username,
  shortUrl,
  longUrl,
  adminJwtToken
) {
  return cy.request({
    method: "DELETE",
    url: `${MAPPINGS_BASE_URL}/delete-mappings`,
    headers: {
      Authorization: `Bearer ${adminJwtToken}`,
    },
    body: { username: username, shortUrl: shortUrl, longUrl: longUrl },
    failOnStatusCode: false,
  });
}
