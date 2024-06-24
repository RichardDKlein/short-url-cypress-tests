/// <reference types="cypress" />

// --------------------------------------------------------------------
// GET ALL USERS
// --------------------------------------------------------------------

export const GET_ALL_USERS_RESPONSES = {
  MUST_BE_ADMIN: {
    status: "MUST_BE_ADMIN",
    message: "Must be an admin to perform this operation",
  },
};

export function expectMustBeAdminResponse(response) {
  expect(JSON.stringify(response.body.status)).to.eq(
    JSON.stringify(GET_ALL_USERS_RESPONSES.MUST_BE_ADMIN)
  );
}
