/// <reference types="cypress" />

import { HTTP_STATUS_CODES } from "../../common/constants";
import { createSsmClient, getJwtMinutesToLiveTest } from "../../common/aws";

export const GET_ADMIN_JWT_TOKEN_RESPONSES = {
  SUCCESS: {
    httpStatus: HTTP_STATUS_CODES.OK,
    response: {
      status: {
        status: "SUCCESS",
        message: "`JWT Minutes to Live (Test)` successfully retrieved",
      },
      jwtMinutesToLiveTest: 999999,
    },
  },
};

export function expectSuccessResponse(response) {
  expect(response.status).to.eq(
    GET_ADMIN_JWT_TOKEN_RESPONSES.SUCCESS.httpStatus
  );
  expect(JSON.stringify(response.body.status)).to.eq(
    JSON.stringify(GET_ADMIN_JWT_TOKEN_RESPONSES.SUCCESS.response.status)
  );
  expect(response.body.jwtMinutesToLiveTest).to.exist;
  const jwtMinutesToLiveTestActual = response.body.jwtMinutesToLiveTest;
  createSsmClient(Cypress.env("region")).then((ssmClient) => {
    getJwtMinutesToLiveTest(ssmClient).then((jwtMinutesToLiveTestExpected) => {
      expect(jwtMinutesToLiveTestActual.toString()).to.eq(
        jwtMinutesToLiveTestExpected
      );
    });
  });
}
