/// <reference types="cypress" />

import { sign, verify } from "jsonwebtoken";
import { KeyObject } from "crypto";

export function generateJwtToken(username, role) {
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

export function extractUsernameAndRoleFromJwtToken(token) {
  const payload = verify(token, getKey());
  const username = payload.sub;
  const role = payload.role;
  return { username, role };
}

export function getKey() {
  // const base64Key = "your_base64_encoded_key_string_here";
  // const keyBuffer = Buffer.from(base64Key, "base64");
  // const keyObject = crypto.createSecretKey(keyBuffer);
  // return keyObject;
  return KeyObject.from(Cypress.env("jwtSecretKey"));
}

export function mangleJwtToken(jwtToken) {
  return jwtToken.substring(1);
}
