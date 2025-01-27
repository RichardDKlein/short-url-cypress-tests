/// <reference types="cypress" />

import { MAPPINGS, USERS, MAPPINGS_BASE_URL } from "../../common/constants";
import {
  createSsmClient,
  getJwtMinutesToLiveTest,
  setJwtMinutesToLiveTest,
} from "../../common/aws";
import { signupAllUsers } from "../../users/signup/requests";
import { deleteAllUsers } from "../../users/delete-all-users/requests";
import { getAdminJwtToken } from "../../users/get-admin-jwt-token/requests";
import { getAllMappings } from "../get-mappings/requests";
import { login } from "../../users/login/requests";

export function createMappingWithNoAuthHeader() {
  return cy.request({
    method: "POST",
    url: `${MAPPINGS_BASE_URL}/create-mapping`,
    body: {
      username: "isaac.newton",
      shortUrl: "shorturl",
      longUrl: "https://www.longurl.com",
    },
    failOnStatusCode: false,
  });
}

export function createMappingWithWrongKindOfAuthHeader() {
  return cy.request({
    method: "POST",
    url: `${MAPPINGS_BASE_URL}/create-mapping`,
    headers: {
      Authorization: "Basic " + btoa("username:password"),
    },
    body: {
      username: "isaac.newton",
      shortUrl: "shorturl",
      longUrl: "https://www.longurl.com",
    },
    failOnStatusCode: false,
  });
}

export function createMappingWithInvalidJwtToken() {
  return createMappingWithSpecifiedAdminJwtToken(
    {
      username: "isaac.newton",
      shortUrl: "shorturl",
      longUrl: "https://www.longurl.com",
    },
    "invalid.jwt.token"
  );
}

export function createMappingWithValidButExpiredJwtToken() {
  return createSsmClient(Cypress.env("region")).then((ssmClient) => {
    return getJwtMinutesToLiveTest(ssmClient).then((jwtMinutesToLiveTest) => {
      const saveJwtTimeToLiveTest = jwtMinutesToLiveTest;
      return setJwtMinutesToLiveTest(ssmClient, 0).then(() => {
        return getAdminJwtToken().then((response) => {
          const adminJwtToken = response.body.jwtToken;
          return createMappingWithSpecifiedAdminJwtToken(
            {
              username: "isaac.newton",
              shortUrl: "shorturl",
              longUrl: "https://www.longurl.com",
            },
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

export function createMappingWithValidButNonAdminJwtToken() {
  return deleteAllUsers().then(() => {
    signupAllUsers().then(() => {
      login(USERS.JOHN_DOE.username, USERS.JOHN_DOE.password).then(
        (response) => {
          const nonAdminJwtToken = response.body.jwtToken;
          cy.request({
            method: "POST",
            url: `${MAPPINGS_BASE_URL}/create-mapping`,
            headers: {
              Authorization: `Bearer ${nonAdminJwtToken}`,
            },
            body: {
              username: "isaac.newton",
              shortUrl: "shorturl",
              longUrl: "https://www.longurl.com",
            },
            failOnStatusCode: false,
          });
        }
      );
    });
  });
}

export function createMappingWithMissingUsername() {
  return getAdminJwtToken().then((response) => {
    const adminJwtToken = response.body.jwtToken;
    cy.request({
      method: "POST",
      url: `${MAPPINGS_BASE_URL}/create-mapping`,
      headers: {
        Authorization: `Bearer ${adminJwtToken}`,
      },
      body: {
        shortUrl: "shorturl",
        longUrl: "https://www.longurl.com",
      },
      failOnStatusCode: false,
    });
  });
}

export function createMappingWithEmptyUsername() {
  return createMapping({
    username: "",
    shortUrl: "shorturl",
    longUrl: "https://www.longurl.com",
  });
}

export function createMappingWithBlankUsername() {
  return createMapping({
    username: "   ",
    shortUrl: "shorturl",
    longUrl: "https://www.longurl.com",
  });
}

export function createMappingWithMissingShortUrl() {
  return getAdminJwtToken().then((response) => {
    const adminJwtToken = response.body.jwtToken;
    cy.request({
      method: "POST",
      url: `${MAPPINGS_BASE_URL}/create-mapping`,
      headers: {
        Authorization: `Bearer ${adminJwtToken}`,
      },
      body: {
        username: "isaac.newton",
        longUrl: "https://www.longurl.com",
      },
      failOnStatusCode: false,
    });
  });
}

export function createMappingWithEmptyShortUrl() {
  return createMapping({
    username: "isaac.newton",
    shortUrl: "",
    longUrl: "https://www.longurl.com",
  });
}

export function createMappingWithBlankShortUrl() {
  return createMapping({
    username: "isaac.newton",
    shortUrl: "   ",
    longUrl: "https://www.longurl.com",
  });
}

export function createMappingWithMissingLongUrl() {
  return getAdminJwtToken().then((response) => {
    const adminJwtToken = response.body.jwtToken;
    cy.request({
      method: "POST",
      url: `${MAPPINGS_BASE_URL}/create-mapping`,
      headers: {
        Authorization: `Bearer ${adminJwtToken}`,
      },
      body: {
        username: "isaac.newton",
        shortUrl: "shorturl",
      },
      failOnStatusCode: false,
    });
  });
}

export function createMappingWithEmptyLongUrl() {
  return createMapping({
    username: "isaac.newton",
    shortUrl: "shorturl",
    longUrl: "",
  });
}

export function createMappingWithBlankLongUrl() {
  return createMapping({
    username: "isaac.newton",
    shortUrl: "shorturl",
    longUrl: "   ",
  });
}

export function createMappingForExistingShortUrl() {
  return getAdminJwtToken().then((response) => {
    getAllMappings().then((response) => {
      const actualMappings = response.body.shortUrlMappings;
      const cannedMappings = Object.entries(MAPPINGS);
      let existingMapping;
      for (const actualMapping of actualMappings) {
        for (var [key, cannedMapping] of cannedMappings) {
          if (actualMapping.shortUrl == cannedMapping.shortUrl) {
            existingMapping = cannedMapping;
            break;
          }
        }
      }
      createMapping(existingMapping);
    });
  });
}

export function createMappingForNewShortUrl() {
  return createMapping({
    username: "isaac.newton",
    shortUrl: "newshorturl",
    longUrl: "https://www.isaacnewton.com",
  });
}

export function createMapping(mapping) {
  return getAdminJwtToken().then((response) => {
    const adminJwtToken = response.body.jwtToken;
    cy.request({
      method: "POST",
      url: `${MAPPINGS_BASE_URL}/create-mapping`,
      headers: {
        Authorization: "Bearer " + adminJwtToken,
      },
      body: mapping,
      failOnStatusCode: false,
    });
  });
}

export function createMappingWithSpecifiedAdminJwtToken(
  mapping,
  adminJwtToken
) {
  return cy.request({
    method: "POST",
    url: `${MAPPINGS_BASE_URL}/create-mapping`,
    headers: {
      Authorization: "Bearer " + adminJwtToken,
    },
    body: mapping,
    failOnStatusCode: false,
  });
}

export function createAllMappings() {
  const mappingEntries = Object.entries(MAPPINGS);
  return createMappingsRecursively(mappingEntries, 0);
}

function createMappingsRecursively(mappingEntries, index) {
  if (index >= mappingEntries.length) {
    return null;
  }
  const [key, mapping] = mappingEntries[index];
  return createMapping(mapping).then(() => {
    createMappingsRecursively(mappingEntries, index + 1);
  });
}
