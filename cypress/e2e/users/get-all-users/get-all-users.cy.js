/// <reference types="cypress" />

import {
  getAllUsersWithNoAuthHeader,
  getAllUsersWithWrongKindOfAuthHeader,
  getAllUsersWithInvalidJwtToken,
  getAllUsersWithValidButNonAdminJwtToken,
} from "./requests";
import { deleteAllUsers } from "../delete-all-users/requests";
import {
  expectInvalidJwtHeaderResponse,
  expectMissingBearerTokenAuthHeaderResponse,
} from "../../common/security/responses";

describe("Test the `GET /shorturl/users/all` REST endpoint", () => {
  beforeEach(() => {
    deleteAllUsers();
  });

  it("doesn't have an authorization header", () => {
    getAllUsersWithNoAuthHeader().then((response) => {
      expectMissingBearerTokenAuthHeaderResponse(response);
    });
  });

  it("has the wrong kind of authorization header", () => {
    getAllUsersWithWrongKindOfAuthHeader().then((response) => {
      expectMissingBearerTokenAuthHeaderResponse(response);
    });
  });

  it("has an invalid JWT token", () => {
    getAllUsersWithInvalidJwtToken().then((response) => {
      expectInvalidJwtHeaderResponse(response);
    });
  });

  it("has a valid but non-admin JWT token", () => {
    getAllUsersWithValidButNonAdminJwtToken().then((response) => {
      expectInvalidJwtHeaderResponse(response);
    });
  });

  // it("has a JWT token for a non-admin user", () => {
  //   signupUser(USERS.JOE_BLOW).then((response) => {
  //     login(USERS.JOE_BLOW.username, USERS.JOE_BLOW.password).then(
  //       (response) => {
  //         const nonAdminJwtToken = response.body.jwtToken;
  //         getAllUsersWithJwtToken(nonAdminJwtToken).then((response) => {
  //           expectMustBeAdminResponse(response);
  //         });
  //       }
  //     );
  //   });
  // });

  // it("has a JWT token for an admin user", () => {
  //   signupAllUsers();
  //   login(Cypress.env("adminUsername"), Cypress.env("adminPassword")).then(
  //     (response) => {
  //       const adminJwtToken = response.body.jwtToken;
  //       getAllUsersWithJwtToken(adminJwtToken).then((response) => {
  //         expectAllUsersSuccessfullyRetrievedResponse(response);
  //         const actualUsers = response.body.shortUrlUsers;
  //         expectAllUsersSuccessfullyCreated(actualUsers);
  //       });
  //     }
  //   );
  // });
});
