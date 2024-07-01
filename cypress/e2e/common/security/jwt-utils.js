/// <reference types="cypress" />

import { sign, verify } from "jsonwebtoken";

export function generateToken(username, role) {
  const now = new Date();
  const millisecsToLive = Cypress.env("jwtMinutesToLive") * 60 * 1000;
  const expirationDate = new Date(now.getTime() + millisecsToLive);

  return sign(
    {
      sub: username,
      role: role,
      iat: Math.floor(now.getTime() / 1000), // issued at time (secs)
      exp: Math.floor(expirationDate.getTime() / 1000), // expiration date (secs)
    },
    getKey()
  );
}

export function extractUsernameAndRoleFromToken(token) {
  const payload = verify(token, getKey());
  const username = payload.sub;
  const role = payload.role;
  return { username, role };
}

export function getKey() {
  return Buffer.from(Cypress.env("jwtSecretKey"), "base64");
}

export function mangleJwtToken(jwtToken) {
  return jwtToken.substring(1);
}
