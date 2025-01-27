/// <reference types="cypress" />

import { MAPPINGS_BASE_URL, USERS } from "../../common/constants";
import {
  createSsmClient,
  getJwtMinutesToLiveTest,
  setJwtMinutesToLiveTest,
} from "../../common/aws";
import { getAdminJwtToken } from "../../users/get-admin-jwt-token/requests";
import { login } from "../../users/login/requests";

export function changeLongUrlWithNoAuthHeader() {
  return cy.request({
    method: "PATCH",
    url: `${MAPPINGS_BASE_URL}/change-long-url`,
    body: {
      shortUrl: "youtube2",
      longUrl: "https://www.reddit.com",
    },
    failOnStatusCode: false,
  });
}

export function changeLongUrlWithWrongKindOfAuthHeader() {
  return cy.request({
    method: "PATCH",
    url: `${MAPPINGS_BASE_URL}/change-long-url`,
    headers: {
      Authorization: "Basic " + btoa("username:password"),
    },
    body: {
      shortUrl: "youtube2",
      longUrl: "https://www.reddit.com",
    },
    failOnStatusCode: false,
  });
}

export function changeLongUrlWithInvalidJwtToken() {
  return changeLongUrlWithSpecifiedAdminJwtToken(
    "youtube2",
    "https://www.reddit.com",
    "invalid.jwt.token"
  );
}

export function changeLongUrlWithValidButExpiredJwtToken() {
  return createSsmClient(Cypress.env("region")).then((ssmClient) => {
    return getJwtMinutesToLiveTest(ssmClient).then((jwtMinutesToLiveTest) => {
      const saveJwtTimeToLiveTest = jwtMinutesToLiveTest;
      return setJwtMinutesToLiveTest(ssmClient, 0).then(() => {
        return getAdminJwtToken().then((response) => {
          const adminJwtToken = response.body.jwtToken;
          return changeLongUrlWithSpecifiedAdminJwtToken(
            "youtube2",
            "https://www.reddit.com",
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

export function changeLongUrlWithValidButNonAdminJwtToken() {
  return login(USERS.JOHN_DOE.username, USERS.JOHN_DOE.password).then(
    (response) => {
      const nonAdminJwtToken = response.body.jwtToken;
      return changeLongUrlWithSpecifiedAdminJwtToken(
        "youtube2",
        "https://www.reddit.com",
        nonAdminJwtToken
      );
    }
  );
}

export function changeLongUrlWithMissingShortUrl() {
  return getAdminJwtToken().then((response) => {
    const adminJwtToken = response.body.jwtToken;
    cy.request({
      method: "PATCH",
      url: `${MAPPINGS_BASE_URL}/change-long-url`,
      headers: {
        Authorization: `Bearer ${adminJwtToken}`,
      },
      body: {
        longUrl: "https://www.reddit.com",
      },
      failOnStatusCode: false,
    });
  });
}

export function changeLongUrlWithEmptyShortUrl() {
  return changeLongUrl("", "https://www.reddit.com");
}

export function changeLongUrlWithBlankShortUrl() {
  return changeLongUrl("   ", "https://www.reddit.com");
}

export function changeLongUrlWithMissingLongUrl() {
  return getAdminJwtToken().then((response) => {
    const adminJwtToken = response.body.jwtToken;
    cy.request({
      method: "PATCH",
      url: `${MAPPINGS_BASE_URL}/change-long-url`,
      headers: {
        Authorization: `Bearer ${adminJwtToken}`,
      },
      body: {
        shortUrl: "youtube2",
      },
      failOnStatusCode: false,
    });
  });
}

export function changeLongUrlWithEmptyLongUrl() {
  return changeLongUrl("youtube2", "");
}

export function changeLongUrlWithBlankLongUrl() {
  return changeLongUrl("youtube2", "   ");
}

export function changeLongUrlOfUnmappedShortUrl() {
  return changeLongUrl("unmapped", "https://www.reddit.com");
}

export function changeLongUrlOfMappedShortUrl() {
  return changeLongUrl("youtube2", "https://www.reddit.com");
}

export function changeLongUrl(shortUrl, longUrl) {
  return getAdminJwtToken().then((response) => {
    const adminJwtToken = response.body.jwtToken;
    return changeLongUrlWithSpecifiedAdminJwtToken(
      shortUrl,
      longUrl,
      adminJwtToken
    );
  });
}

export function changeLongUrlWithSpecifiedAdminJwtToken(
  shortUrl,
  longUrl,
  adminJwtToken
) {
  return cy.request({
    method: "PATCH",
    url: `${MAPPINGS_BASE_URL}/change-long-url`,
    headers: {
      Authorization: "Bearer " + adminJwtToken,
    },
    body: { shortUrl, longUrl },
    failOnStatusCode: false,
  });
}
