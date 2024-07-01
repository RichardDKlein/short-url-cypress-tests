/// <reference types="cypress" />

import { HTTP_STATUS_CODES } from "../../common/constants";

export const GET_ADMIN_JWT_TOKEN_RESPONSES = {
  SUCCESS: {
    httpStatus: HTTP_STATUS_CODES.OK,
    response: {
      status: {
        status: "SUCCESS",
        message: "Admin JWT token successfully generated",
      },
      jwtToken: "dummy.jwt.token",
    },
  },
};

export function expectAdminJwtTokenSuccessfullyGeneratedResponse(response) {
  console.log("response.status = " + response.status);
  console.log("response.body = " + JSON.stringify(response.body));
  expect(response.status).to.eq(
    GET_ADMIN_JWT_TOKEN_RESPONSES.SUCCESS.httpStatus
  );
  expect(JSON.stringify(response.body.status)).to.eq(
    JSON.stringify(GET_ADMIN_JWT_TOKEN_RESPONSES.SUCCESS.response.status)
  );
  cy.wrap(GET_ADMIN_JWT_TOKEN_RESPONSES.SUCCESS.response)
    .its("jwtToken")
    .should("exist");
  const jwtToken = GET_ADMIN_JWT_TOKEN_RESPONSES.SUCCESS.response.jwtToken;
  cy.wrap(jwtToken.split(".")).should("have.lengthOf", 3);
}
