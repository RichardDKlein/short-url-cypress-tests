/// <reference types="cypress" />

import { MAPPINGS_BASE_URL, USERS } from "../../common/constants";
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
  return cy.request({
    method: "PATCH",
    url: `${MAPPINGS_BASE_URL}/change-long-url`,
    headers: {
      Authorization: "Bearer " + "invalid.jwt.token",
    },
    body: {
      shortUrl: "youtube2",
      longUrl: "https://www.reddit.com",
    },
    failOnStatusCode: false,
  });
}

export function changeLongUrlWithValidButNonAdminJwtToken() {
  return login(USERS.JOHN_DOE.username, USERS.JOHN_DOE.password).then(
    (response) => {
      const nonAdminJwtToken = response.body.jwtToken;
      cy.request({
        method: "PATCH",
        url: `${MAPPINGS_BASE_URL}/change-long-url`,
        headers: {
          Authorization: `Bearer ${nonAdminJwtToken}`,
        },
        body: {
          shortUrl: "youtube2",
          longUrl: "https://www.reddit.com",
        },
        failOnStatusCode: false,
      });
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
  return getAdminJwtToken().then((response) => {
    const adminJwtToken = response.body.jwtToken;
    cy.request({
      method: "PATCH",
      url: `${MAPPINGS_BASE_URL}/change-long-url`,
      headers: {
        Authorization: `Bearer ${adminJwtToken}`,
      },
      body: {
        shortUrl: "",
        longUrl: "https://www.reddit.com",
      },
      failOnStatusCode: false,
    });
  });
}

export function changeLongUrlWithBlankShortUrl() {
  return getAdminJwtToken().then((response) => {
    const adminJwtToken = response.body.jwtToken;
    cy.request({
      method: "PATCH",
      url: `${MAPPINGS_BASE_URL}/change-long-url`,
      headers: {
        Authorization: `Bearer ${adminJwtToken}`,
      },
      body: {
        shortUrl: "   ",
        longUrl: "https://www.reddit.com",
      },
      failOnStatusCode: false,
    });
  });
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
        longUrl: "",
      },
      failOnStatusCode: false,
    });
  });
}

export function changeLongUrlWithBlankLongUrl() {
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
        longUrl: "   ",
      },
      failOnStatusCode: false,
    });
  });
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
    return cy.request({
      method: "PATCH",
      url: `${MAPPINGS_BASE_URL}/change-long-url`,
      headers: {
        Authorization: "Bearer " + adminJwtToken,
      },
      body: { shortUrl, longUrl },
      failOnStatusCode: false,
    });
  });
}
