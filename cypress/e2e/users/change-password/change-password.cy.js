/// <reference types="cypress" />

import {
  changePasswordWithNoAuthHeader,
  changePasswordWithWrongKindOfAuthHeader,
  changePasswordWithInvalidJwtToken,
  changePasswordWithValidButExpiredJwtToken,
  changePasswordWithValidButNonAdminJwtToken,
  changePasswordWithMissingUsername,
  changePasswordWithEmptyUsername,
  changePasswordWithBlankUsername,
  changePasswordWithMissingOldPassword,
  changePasswordWithEmptyOldPassword,
  changePasswordWithBlankOldPassword,
  changePasswordWithMissingNewPassword,
  changePasswordWithEmptyNewPassword,
  changePasswordWithBlankNewPassword,
  changePasswordOfNonExistentUser,
  changePasswordWithWrongOldPassword,
  changePasswordOfAnExistingNonAdminUser,
  changePasswordOfAnExistingAdminUser,
} from "./requests";
import { signupAllUsers } from "../signup/requests";
import { deleteAllUsers } from "../delete-all-users/requests";
import {
  expectExpiredJwtExceptionResponse,
  expectInvalidJwtExceptionResponse,
  expectMissingBearerTokenAuthHeaderResponse,
  expectMustBeAdminResponse,
} from "../../common/security";
import {
  expectMissingUsernameResponse,
  expectMissingOldPasswordResponse,
  expectMissingNewPasswordResponse,
  expectNoSuchUserResponse,
  expectWrongPasswordResponse,
  expectSuccessResponseForNonAdminUser,
  expectSuccessResponseForAdminUser,
} from "./responses";

describe("Test the `PATCH /short-url/users/change-password` REST endpoint", () => {
  beforeEach(() => {
    deleteAllUsers().then(() => {
      signupAllUsers();
    });
  });

  it("doesn't have an authorization header", () => {
    changePasswordWithNoAuthHeader().then((response) => {
      expectMissingBearerTokenAuthHeaderResponse(response);
    });
  });

  it("has the wrong kind of authorization header", () => {
    changePasswordWithWrongKindOfAuthHeader().then((response) => {
      expectMissingBearerTokenAuthHeaderResponse(response);
    });
  });

  it("has an invalid JWT token", () => {
    changePasswordWithInvalidJwtToken().then((response) => {
      expectInvalidJwtExceptionResponse(response);
    });
  });

  it("has a valid but expired JWT token", () => {
    changePasswordWithValidButExpiredJwtToken().then((response) => {
      expectExpiredJwtExceptionResponse(response);
    });
  });

  it("has a valid but non-admin JWT token", () => {
    changePasswordWithValidButNonAdminJwtToken().then((response) => {
      expectMustBeAdminResponse(response);
    });
  });

  it("doesn't specify a username", () => {
    changePasswordWithMissingUsername().then((response) => {
      expectMissingUsernameResponse(response);
    });
  });

  it("specifies an empty username", () => {
    changePasswordWithEmptyUsername().then((response) => {
      expectMissingUsernameResponse(response);
    });
  });

  it("specifies a blank username", () => {
    changePasswordWithBlankUsername().then((response) => {
      expectMissingUsernameResponse(response);
    });
  });

  it("doesn't specify an old password", () => {
    changePasswordWithMissingOldPassword().then((response) => {
      expectMissingOldPasswordResponse(response);
    });
  });

  it("specifies an empty old password", () => {
    changePasswordWithEmptyOldPassword().then((response) => {
      expectMissingOldPasswordResponse(response);
    });
  });

  it("specifies a blank old password", () => {
    changePasswordWithBlankOldPassword().then((response) => {
      expectMissingOldPasswordResponse(response);
    });
  });

  it("doesn't specify a new password", () => {
    changePasswordWithMissingNewPassword().then((response) => {
      expectMissingNewPasswordResponse(response);
    });
  });

  it("specifies an empty new password", () => {
    changePasswordWithEmptyNewPassword().then((response) => {
      expectMissingNewPasswordResponse(response);
    });
  });

  it("specifies a blank new password", () => {
    changePasswordWithBlankNewPassword().then((response) => {
      expectMissingNewPasswordResponse(response);
    });
  });

  it("attempts to change the password of a non-existent user", () => {
    changePasswordOfNonExistentUser().then((response) => {
      expectNoSuchUserResponse(response);
    });
  });

  it("specifies the wrong old password", () => {
    changePasswordWithWrongOldPassword().then((response) => {
      expectWrongPasswordResponse(response);
    });
  });

  it("successfully changes the password of an existing non-admin user", () => {
    changePasswordOfAnExistingNonAdminUser().then((response) => {
      expectSuccessResponseForNonAdminUser(response);
    });
  });

  it("successfully changes the password of an existing admin user", () => {
    changePasswordOfAnExistingAdminUser().then((response) => {
      expectSuccessResponseForAdminUser(response);
    });
  });
});
