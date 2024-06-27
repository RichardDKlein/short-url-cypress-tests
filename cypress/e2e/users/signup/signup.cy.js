/// <reference types="cypress" />

import { deleteAllUsers } from "../delete-user/requests";
import { signupWithNoUsername, signupWithNoPassword } from "./requests";
import {
  expectMissingUsernameResponse,
  expectMissingPasswordResponse,
} from "./responses";

describe("Test the `POST /shorturl/users/signup` REST endpoint", () => {
  beforeEach(() => {
    deleteAllUsers();
  });

  it("is missing a username", () => {
    signupWithNoUsername().then((response) => {
      expectMissingUsernameResponse(response);
    });
  });

  it("is missing a password", () => {
    signupWithNoPassword().then((response) => {
      expectMissingPasswordResponse(response);
    });
  });

  // it("specifies a user who already exists", () => {
  //   signupExistingUser().then((response) => {
  //     expectUserAlreadyExistsResponse(response);
  //   });
  // });

  // it("specifies a new user", () => {
  //   signupNewUser().then((response) => {
  //     expectUserSuccessfullyCreatedResponse(response);
  //   });
  // });
});
