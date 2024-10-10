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
  return cy.request({
    method: "DELETE",
    url: `${MAPPINGS_BASE_URL}/delete-mappings`,
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

export function deleteMappingsWithValidButNonAdminJwtToken() {
  return login(USERS.JOHN_DOE.username, USERS.JOHN_DOE.password).then(
    (response) => {
      const nonAdminJwtToken = response.body.jwtToken;
      deleteAllMappingsWithSpecifiedAdminJwtToken(nonAdminJwtToken);
    }
  );
}

export function deleteAllMappingsWithValidAdminJwtToken() {
  return getAdminJwtToken().then((response) => {
    const adminJwtToken = response.body.jwtToken;
    deleteAllMappingsWithSpecifiedAdminJwtToken(adminJwtToken);
  });
}

export function deleteAllMappingsWithSpecifiedAdminJwtToken(adminJwtToken) {
  return cy.request({
    method: "DELETE",
    url: `${MAPPINGS_BASE_URL}/delete-mappings`,
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

export function deleteAllMappings() {
  return deleteAllMappingsWithValidAdminJwtToken();
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
  return getAdminJwtToken().then((response) => {
    const adminJwtToken = response.body.jwtToken;
    cy.request({
      method: "DELETE",
      url: `${MAPPINGS_BASE_URL}/delete-mappings`,
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

export function deleteMappingsWithBlankUsername() {
  return getAdminJwtToken().then((response) => {
    const adminJwtToken = response.body.jwtToken;
    cy.request({
      method: "DELETE",
      url: `${MAPPINGS_BASE_URL}/delete-mappings`,
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
        shortUrl: "",
        longUrl: "*",
      },
      failOnStatusCode: false,
    });
  });
}

export function deleteMappingsWithBlankShortUrl() {
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
        shortUrl: "   ",
        longUrl: "*",
      },
      failOnStatusCode: false,
    });
  });
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
        longUrl: "",
      },
      failOnStatusCode: false,
    });
  });
}

export function deleteMappingsWithBlankLongUrl() {
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
        longUrl: "   ",
      },
      failOnStatusCode: false,
    });
  });
}

export function deleteMappingsWithWildcardUsername() {
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
        shortUrl: "google1",
        longUrl: "https://www.google.com",
      },
      failOnStatusCode: false,
    });
  });
}

export function deleteMappingsWithWildcardShortUrl() {
  return getAdminJwtToken().then((response) => {
    const adminJwtToken = response.body.jwtToken;
    cy.request({
      method: "DELETE",
      url: `${MAPPINGS_BASE_URL}/delete-mappings`,
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

export function deleteMappingsWithWildcardLongUrl() {
  return getAdminJwtToken().then((response) => {
    const adminJwtToken = response.body.jwtToken;
    cy.request({
      method: "DELETE",
      url: `${MAPPINGS_BASE_URL}/delete-mappings`,
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

export function deleteMappingsWithAllWildcards() {
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
        longUrl: "*",
      },
      failOnStatusCode: false,
    });
  });
}

export function deleteMappingsWithoutWildcards() {
  return getAdminJwtToken().then((response) => {
    const adminJwtToken = response.body.jwtToken;
    cy.request({
      method: "DELETE",
      url: `${MAPPINGS_BASE_URL}/delete-mappings`,
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
