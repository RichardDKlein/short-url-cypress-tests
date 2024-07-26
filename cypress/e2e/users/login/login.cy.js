/// <reference types="cypress" />

import {
  loginWithNoAuthHeader,
  loginWithWrongKindOfAuthHeader,
  loginWithInvalidJwtToken,
  loginWithValidButNonAdminJwtToken,
  loginWithMissingUsername,
  loginWithEmptyUsername,
  loginWithBlankUsername,
  loginWithMissingPassword,
  loginWithEmptyPassword,
  loginWithBlankPassword,
  loginWithWrongPassword,
  loginNonExistentUser,
  loginAnExistingNonAdminUser,
  loginAnExistingAdminUser,
} from "./requests";
import { signupAllUsers } from "../signup/requests";
import { deleteAllUsers } from "../delete-all-users/requests";
import {
  expectMissingBearerTokenAuthHeaderResponse,
  expectInvalidJwtHeaderResponse,
  expectMustBeAdminResponse,
} from "../../common/security";
import {
  expectMissingUsernameResponse,
  expectMissingPasswordResponse,
  expectNoSuchUserResponse,
  expectSuccessResponseToNonAdminLogin,
  expectSuccessResponseToAdminLogin,
  expectWrongPasswordResponse,
} from "./responses";

describe("Test the `POST /shorturl/users/login` REST endpoint", () => {
  beforeEach(() => {
    deleteAllUsers().then(() => {
      signupAllUsers();
    });
  });

  it("doesn't have an authorization header", () => {
    loginWithNoAuthHeader().then((response) => {
      expectMissingBearerTokenAuthHeaderResponse(response);
    });
  });

  it("has the wrong kind of authorization header", () => {
    loginWithWrongKindOfAuthHeader().then((response) => {
      expectMissingBearerTokenAuthHeaderResponse(response);
    });
  });

  it("has an invalid JWT token", () => {
    loginWithInvalidJwtToken().then((response) => {
      expectInvalidJwtHeaderResponse(response);
    });
  });

  it("has a valid but non-admin JWT token", () => {
    loginWithValidButNonAdminJwtToken().then((response) => {
      expectMustBeAdminResponse(response);
    });
  });

  it("doesn't specify a username", () => {
    loginWithMissingUsername().then((response) => {
      expectMissingUsernameResponse(response);
    });
  });

  it("specifies an empty username", () => {
    loginWithEmptyUsername().then((response) => {
      expectMissingUsernameResponse(response);
    });
  });

  it("specifies a blank username", () => {
    loginWithBlankUsername().then((response) => {
      expectMissingUsernameResponse(response);
    });
  });

  it("doesn't specify a password", () => {
    loginWithMissingPassword().then((response) => {
      expectMissingPasswordResponse(response);
    });
  });

  it("specifies an empty password", () => {
    loginWithEmptyPassword().then((response) => {
      expectMissingPasswordResponse(response);
    });
  });

  it("specifies a blank password", () => {
    loginWithBlankPassword().then((response) => {
      expectMissingPasswordResponse(response);
    });
  });

  it("attempts to log in a non-existent user", () => {
    loginNonExistentUser().then((response) => {
      expectNoSuchUserResponse(response);
    });
  });

  it("specifies the wrong password", () => {
    loginWithWrongPassword().then((response) => {
      expectWrongPasswordResponse(response);
    });
  });

  it("successfully logs in an existing non-admin user", () => {
    loginAnExistingNonAdminUser().then((response) => {
      expectSuccessResponseToNonAdminLogin(response);
    });
  });

  it("successfully logs in an existing admin user", () => {
    loginAnExistingAdminUser().then((response) => {
      expectSuccessResponseToAdminLogin(response);
    });
  });
});
