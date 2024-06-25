/// <reference types="cypress" />

export function mangleJwtToken(jwtToken) {
  return jwtToken.substring(1);
}
