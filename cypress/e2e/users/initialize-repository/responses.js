/// <reference types="cypress" />

import { HTTP_STATUS_CODES } from "../../common/constants";

export const INITIALIZE_REPOSITORY_RESPONSES = {
  NOT_ON_LOCAL_MACHINE: {
    httpStatus: HTTP_STATUS_CODES.FORBIDDEN,
    response: {
      status: "NOT_ON_LOCAL_MACHINE",
      message:
        "Initialization of the Short URL User table can be done only when the " +
        "service is running on your local machine",
    },
  },
};

export function expectNotOnLocalMachineResponse(response) {
  expect(response.status).to.eq(
    INITIALIZE_REPOSITORY_RESPONSES.NOT_ON_LOCAL_MACHINE.httpStatus
  );
  expect(JSON.stringify(response.body)).to.eq(
    JSON.stringify(
      INITIALIZE_REPOSITORY_RESPONSES.NOT_ON_LOCAL_MACHINE.response
    )
  );
}
