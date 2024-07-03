/// <reference types="cypress" />

export const USERS_BASE_URL = "https://test.richarddklein.com/shorturl/users";

export const HTTP_STATUS_CODES = {
  OK: 200,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500,
};

export const USERS = {
  JOHN_DOE: {
    username: "johndoe",
    password: "johndoepassword",
    role: "USER",
    name: "John Doe",
    email: "johndoe@gmail.com",
  },
  JOE_BLOW: {
    username: "joeblow",
    password: "joeblowpassword",
    role: "USER",
    name: "Joe Blow",
    email: "joeblow@gmail.com",
  },
  JANE_SMITH: {
    username: "janesmith",
    password: "janesmithpassword",
    role: "USER",
    name: "Jane Smith",
    email: "janesmith@gmail.com",
  },
};
