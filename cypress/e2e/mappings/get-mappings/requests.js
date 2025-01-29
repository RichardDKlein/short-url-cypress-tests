/// <reference types="cypress" />

import { MAPPINGS_BASE_URL, USERS } from "../../common/constants";
import {
  createSsmClient,
  getJwtMinutesToLiveTest,
  setJwtMinutesToLiveTest,
} from "../../common/aws";
import { login } from "../../users/login/requests";
import { getAdminJwtToken } from "../../users/get-admin-jwt-token/requests";

export function getMappingsWithNoAuthHeader() {
  return cy.request({
    method: "GET",
    url: `${MAPPINGS_BASE_URL}/get-mappings`,
    body: {
      username: "*",
      shortUrl: "*",
      longUrl: "*",
    },
    failOnStatusCode: false,
  });
}

export function getMappingsWithWrongKindOfAuthHeader() {
  return cy.request({
    method: "GET",
    url: `${MAPPINGS_BASE_URL}/get-mappings`,
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

export function getMappingsWithInvalidJwtToken() {
  return getMappingsWithSpecifiedAdminJwtToken(
    "*",
    "*",
    "*",
    "invalid.jwt.token"
  );
}

export function getMappingsWithValidButExpiredJwtToken() {
  return createSsmClient(Cypress.env("region")).then((ssmClient) => {
    return getJwtMinutesToLiveTest(ssmClient).then((jwtMinutesToLiveTest) => {
      const saveJwtTimeToLiveTest = jwtMinutesToLiveTest;
      return setJwtMinutesToLiveTest(ssmClient, 0).then(() => {
        return getAdminJwtToken().then((response) => {
          const adminJwtToken = response.body.jwtToken;
          return getMappingsWithSpecifiedAdminJwtToken(
            "*",
            "*",
            "*",
            adminJwtToken
          ).then((response) => {
            return setJwtMinutesToLiveTest(
              ssmClient,
              saveJwtTimeToLiveTest
            ).then(() => {
              return response;
            });
          });
        });
      });
    });
  });
}

export function getMappingsWithValidButNonAdminJwtToken() {
  return login(USERS.JOHN_DOE.username, USERS.JOHN_DOE.password).then(
    (response) => {
      const nonAdminJwtToken = response.body.jwtToken;
      return getMappingsWithSpecifiedAdminJwtToken(
        "*",
        "*",
        "*",
        nonAdminJwtToken
      );
    }
  );
}

export function getAllMappings() {
  return getMappings("*", "*", "*");
}

export function getMappingsWithMissingUsername() {
  return getAdminJwtToken().then((response) => {
    const adminJwtToken = response.body.jwtToken;
    cy.request({
      method: "GET",
      url: `${MAPPINGS_BASE_URL}/get-mappings`,
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

export function getMappingsWithEmptyUsername() {
  return getMappings("", "*", "*");
}

export function getMappingsWithBlankUsername() {
  return getMappings("   ", "*", "*");
}

export function getMappingsWithMissingShortUrl() {
  return getAdminJwtToken().then((response) => {
    const adminJwtToken = response.body.jwtToken;
    cy.request({
      method: "GET",
      url: `${MAPPINGS_BASE_URL}/get-mappings`,
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

export function getMappingsWithEmptyShortUrl() {
  return getMappings("*", "", "*");
}

export function getMappingsWithBlankShortUrl() {
  return getMappings("*", "   ", "*");
}

export function getMappingsWithMissingLongUrl() {
  return getAdminJwtToken().then((response) => {
    const adminJwtToken = response.body.jwtToken;
    cy.request({
      method: "GET",
      url: `${MAPPINGS_BASE_URL}/get-mappings`,
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

export function getMappingsWithEmptyLongUrl() {
  return getMappings("*", "*", "");
}

export function getMappingsWithBlankLongUrl() {
  return getMappings("*", "*", "   ");
}

export function getMappingsWithWildcardUsername() {
  return getMappings("*", "google1", "https://www.google.com");
}

export function getMappingsWithWildcardShortUrl() {
  return getMappings("youtube", "*", "https://www.youtube.com");
}

export function getMappingsWithWildcardLongUrl() {
  return getMappings("facebook", "facebook2", "*");
}

export function getMappingsWithAllWildcards() {
  return getMappings("*", "*", "*");
}

export function getMappingsWithoutWildcards() {
  return getMappings("youtube", "youtube2", "https://www.youtube.com");
}

export function getMappings(username, shortUrl, longUrl) {
  return getAdminJwtToken().then((response) => {
    const adminJwtToken = response.body.jwtToken;
    return getMappingsWithSpecifiedAdminJwtToken(
      username,
      shortUrl,
      longUrl,
      adminJwtToken
    );
  });
}

export function getMappingsWithSpecifiedAdminJwtToken(
  username,
  shortUrl,
  longUrl,
  adminJwtToken
) {
  return cy.request({
    method: "GET",
    url: `${MAPPINGS_BASE_URL}/get-mappings`,
    headers: {
      Authorization: `Bearer ${adminJwtToken}`,
    },
    body: { username, shortUrl, longUrl },
    failOnStatusCode: false,
  });
}
