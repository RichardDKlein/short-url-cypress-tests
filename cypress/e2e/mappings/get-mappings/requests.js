/// <reference types="cypress" />

import { MAPPINGS_BASE_URL, USERS } from "../../common/constants";
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
  return cy.request({
    method: "GET",
    url: `${MAPPINGS_BASE_URL}/get-mappings`,
    headers: {
      Authorization: "Bearer " + "invalid.jwt.token",
    },
    body: {
      username: "*",
      shortUrl: "*",
      longUrl: "*",
    },
    failOnStatusCode: false,
  });
}

export function getMappingsWithValidButNonAdminJwtToken() {
  return login(USERS.JOHN_DOE.username, USERS.JOHN_DOE.password).then(
    (response) => {
      const nonAdminJwtToken = response.body.jwtToken;
      getAllMappingsWithSpecifiedAdminJwtToken(nonAdminJwtToken);
    }
  );
}

export function getAllMappingsWithValidAdminJwtToken() {
  return getAdminJwtToken().then((response) => {
    const adminJwtToken = response.body.jwtToken;
    getAllMappingsWithSpecifiedAdminJwtToken(adminJwtToken);
  });
}

export function getAllMappingsWithSpecifiedAdminJwtToken(adminJwtToken) {
  return cy.request({
    method: "GET",
    url: `${MAPPINGS_BASE_URL}/get-mappings`,
    headers: {
      Authorization: `Bearer ${adminJwtToken}`,
    },
    body: {
      username: "*",
      shortUrl: "*",
      longUrl: "*",
    },
    failOnStatusCode: false,
  });
}

export function getAllMappings() {
  return getAllMappingsWithValidAdminJwtToken();
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
  return getAdminJwtToken().then((response) => {
    const adminJwtToken = response.body.jwtToken;
    cy.request({
      method: "GET",
      url: `${MAPPINGS_BASE_URL}/get-mappings`,
      headers: {
        Authorization: `Bearer ${adminJwtToken}`,
      },
      body: {
        username: "",
        shortUrl: "*",
        longUrl: "*",
      },
      failOnStatusCode: false,
    });
  });
}

export function getMappingsWithBlankUsername() {
  return getAdminJwtToken().then((response) => {
    const adminJwtToken = response.body.jwtToken;
    cy.request({
      method: "GET",
      url: `${MAPPINGS_BASE_URL}/get-mappings`,
      headers: {
        Authorization: `Bearer ${adminJwtToken}`,
      },
      body: {
        username: "   ",
        shortUrl: "*",
        longUrl: "*",
      },
      failOnStatusCode: false,
    });
  });
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
        shortUrl: "",
        longUrl: "*",
      },
      failOnStatusCode: false,
    });
  });
}

export function getMappingsWithBlankShortUrl() {
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
        shortUrl: "   ",
        longUrl: "*",
      },
      failOnStatusCode: false,
    });
  });
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
        longUrl: "",
      },
      failOnStatusCode: false,
    });
  });
}

export function getMappingsWithBlankLongUrl() {
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
        longUrl: "   ",
      },
      failOnStatusCode: false,
    });
  });
}

export function getMappingsWithWildcardUsername() {
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
        shortUrl: "google1",
        longUrl: "https://www.google.com",
      },
      failOnStatusCode: false,
    });
  });
}

export function getMappingsWithWildcardShortUrl() {
  return getAdminJwtToken().then((response) => {
    const adminJwtToken = response.body.jwtToken;
    cy.request({
      method: "GET",
      url: `${MAPPINGS_BASE_URL}/get-mappings`,
      headers: {
        Authorization: `Bearer ${adminJwtToken}`,
      },
      body: {
        username: "youtube",
        shortUrl: "*",
        longUrl: "https://www.youtube.com",
      },
      failOnStatusCode: false,
    });
  });
}

export function getMappingsWithWildcardLongUrl() {
  return getAdminJwtToken().then((response) => {
    const adminJwtToken = response.body.jwtToken;
    cy.request({
      method: "GET",
      url: `${MAPPINGS_BASE_URL}/get-mappings`,
      headers: {
        Authorization: `Bearer ${adminJwtToken}`,
      },
      body: {
        username: "facebook",
        shortUrl: "facebook2",
        longUrl: "*",
      },
      failOnStatusCode: false,
    });
  });
}

export function getMappingsWithAllWildcards() {
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
        longUrl: "*",
      },
      failOnStatusCode: false,
    });
  });
}

export function getMappingsWithoutWildcards() {
  return getAdminJwtToken().then((response) => {
    const adminJwtToken = response.body.jwtToken;
    cy.request({
      method: "GET",
      url: `${MAPPINGS_BASE_URL}/get-mappings`,
      headers: {
        Authorization: `Bearer ${adminJwtToken}`,
      },
      body: {
        username: "youtube",
        shortUrl: "youtube2",
        longUrl: "https://www.youtube.com",
      },
      failOnStatusCode: false,
    });
  });
}
