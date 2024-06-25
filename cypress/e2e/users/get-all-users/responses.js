/// <reference types="cypress" />

import { USERS } from "../users";

export const GET_ALL_USERS_RESPONSES = {
  MUST_BE_ADMIN: {
    status: "MUST_BE_ADMIN",
    message: "Must be an admin to perform this operation",
  },
  SUCCESS: {
    status: "SUCCESS",
    message: "All users successfully retrieved",
  },
};

export function expectMustBeAdminResponse(response) {
  expect(JSON.stringify(response.body.status)).to.eq(
    JSON.stringify(GET_ALL_USERS_RESPONSES.MUST_BE_ADMIN)
  );
}

export function expectAllUsersSuccessfullyRetrievedResponse(response) {
  expect(JSON.stringify(response.body.status)).to.eq(
    JSON.stringify(GET_ALL_USERS_RESPONSES.SUCCESS)
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
  }
}
