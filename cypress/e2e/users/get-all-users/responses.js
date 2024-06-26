/// <reference types="cypress" />

import { HTTP_STATUS_CODES } from "../../common/constants";
import { isTimestampRecent } from "../../common/miscellaneous/timestamps";
import { USERS } from "../users";

export const GET_ALL_USERS_RESPONSES = {
  MUST_BE_ADMIN: {
    httpStatus: HTTP_STATUS_CODES.UNAUTHORIZED,
    response: {
      status: "MUST_BE_ADMIN",
      message: "Must be an admin to perform this operation",
    },
  },
  SUCCESS: {
    httpStatus: HTTP_STATUS_CODES.OK,
    response: {
      status: "SUCCESS",
      message: "All users successfully retrieved",
    },
  },
};

export function expectMustBeAdminResponse(response) {
  expect(response.status).to.eq(
    GET_ALL_USERS_RESPONSES.MUST_BE_ADMIN.httpStatus
  );
  expect(JSON.stringify(response.body.status)).to.eq(
    JSON.stringify(GET_ALL_USERS_RESPONSES.MUST_BE_ADMIN.response)
  );
}

export function expectAllUsersSuccessfullyRetrievedResponse(response) {
  expect(response.status).to.eq(GET_ALL_USERS_RESPONSES.SUCCESS.httpStatus);
  expect(JSON.stringify(response.body.status)).to.eq(
    JSON.stringify(GET_ALL_USERS_RESPONSES.SUCCESS.response)
  );
  const actualUsers = response.body.shortUrlUsers;
  const actualNonAdminUsers = actualUsers.filter(
    (user) => user.role !== "ADMIN"
  );
  const expectedUserCount = Object.keys(USERS).length;
  const actualNonAdminUserCount = actualNonAdminUsers.length;
  expect(actualNonAdminUserCount).to.eq(expectedUserCount);

  for (const [key, value] of Object.entries(USERS)) {
    var expectedUser = value;
    var actualUser = actualUsers.find((user) => {
      return user.username === expectedUser.username;
    });
    expect(actualUser).to.not.be.undefined;
    expect(actualUser.username).to.eq(expectedUser.username);
    expect(actualUser.role).to.eq(expectedUser.role);
    expect(actualUser.name).to.eq(expectedUser.name);
    expect(actualUser.email).to.eq(expectedUser.email);
    expect(actualUser.lastLogin).to.eq("hasn't logged in yet");
    expect(isTimestampRecent(actualUser.accountCreationDate, 5));
  }
}
