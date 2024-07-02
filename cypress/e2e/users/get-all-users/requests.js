/// <reference types="cypress" />

import { USERS, USERS_BASE_URL } from "../../common/constants";
import {
  signupAllUsers,
  signupUserWithValidAdminJwtToken,
} from "../signup/requests";

export function getAllUsersWithNoAuthHeader() {
  return cy.request({
    method: "GET",
    url: `${USERS_BASE_URL}/all`,
    failOnStatusCode: false,
  });
}

export function getAllUsersWithWrongKindOfAuthHeader() {
  return cy.request({
    method: "GET",
    url: `${USERS_BASE_URL}/all`,
    headers: {
      Authorization: "Basic " + btoa("username:password"),
    },
    failOnStatusCode: false,
  });
}

export function getAllUsersWithInvalidJwtToken() {
  return cy.request({
    method: "GET",
    url: `${USERS_BASE_URL}/all`,
    headers: {
      Authorization: "Bearer " + "invalid.jwt.token",
    },
    failOnStatusCode: false,
  });
}

export function getAllUsersWithInvalidJwtToken() {
  return cy.request({
    method: "GET",
    url: `${USERS_BASE_URL}/all`,
    headers: {
      Authorization: "Bearer " + "invalid.jwt.token",
    },
    failOnStatusCode: false,
  });
}

export function getAllUsersWithValidButNonAdminJwtToken() {
  signupAllUsers();
  login;
  return cy.request({
    method: "GET",
    url: `${USERS_BASE_URL}/all`,
    headers: {
      Authorization: "Bearer " + "invalid.jwt.token",
    },
    failOnStatusCode: false,
  });
}
