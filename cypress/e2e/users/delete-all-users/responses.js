/// <reference types="cypress" />

import { HTTP_STATUS_CODES } from "../../common/constants";
import { getAllUsersWithValidAdminJwtToken } from "../get-all-users/requests";

export const DELETE_ALL_USERS_RESPONSES = {
  SUCCESS: {
    httpStatus: HTTP_STATUS_CODES.OK,
    response: {
      status: "SUCCESS",
      message: "All users successfully deleted",
    },
  },
};

export function expectSuccessResponse(response) {
  expect(response.status).to.eq(DELETE_ALL_USERS_RESPONSES.SUCCESS.httpStatus);
  expect(JSON.stringify(response.body)).to.eq(
    JSON.stringify(DELETE_ALL_USERS_RESPONSES.SUCCESS.response)
  );
  expectAllUsersSuccessfullyDeleted();
}

function expectAllUsersSuccessfullyDeleted() {
  getAllUsersWithValidAdminJwtToken().then((response) => {
    const users = response.body.shortUrlUsers;
    expect(users.length).to.eq(1);
  });
}
