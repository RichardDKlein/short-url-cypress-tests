/// <reference types="cypress" />

import { sign, verify } from "jsonwebtoken";

class JwtUtils {
  static generateToken(username, role) {
    const now = new Date();
    const timeToLive =
      // Convert minutes to milliseconds
      ParameterStoreReader.getJwtMinutesToLive() * 60 * 1000;
    const expirationDate = new Date(now.getTime() + timeToLive);

    return sign(
      {
        sub: username,
        role: role,
        // Issued at time in seconds
        iat: Math.floor(now.getTime() / 1000),
        // Expiration time in seconds
        exp: Math.floor(expirationDate.getTime() / 1000),
      },
      this.getKey()
    );
  }

  static extractUsernameAndRoleFromToken(token) {
    const payload = verify(token, this.getKey());
    const username = payload.sub;
    const role = payload.role;
    return { username, role };
  }

  static getKey() {
    const keyBytes = Buffer.from(
      ParameterStoreReader.getJwtSecretKey(),
      "base64"
    );
    return keyBytes;
  }
}

export default JwtUtils;
