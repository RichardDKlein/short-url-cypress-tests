/// <reference types="cypress" />

const isLocal = false;

export const USERS_BASE_URL = isLocal
  ? "http://localhost:2000/short-url/users"
  : "https://test.richarddklein.com/short-url/users";

export const MAPPINGS_BASE_URL = isLocal
  ? "http://localhost:4000/short-url/mappings"
  : "https://test.richarddklein.com/short-url/mappings";

export const RESERVATIONS_BASE_URL = isLocal
  ? "http://localhost:6000/short-url/reservations"
  : "https://test.richarddklein.com/short-url/reservations";

export const HTTP_STATUS_CODES = {
  OK: 200,
  FOUND: 302,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500,
};

export const MAPPINGS = {
  GOOGLE_1: {
    username: "google",
    shortUrl: "google1",
    longUrl: "https://www.google.com",
  },
  GOOGLE_2: {
    username: "google",
    shortUrl: "google2",
    longUrl: "https://www.google.com",
  },
  YOUTUBE_1: {
    username: "youtube",
    shortUrl: "youtube1",
    longUrl: "https://www.youtube.com",
  },
  YOUTUBE_2: {
    username: "youtube",
    shortUrl: "youtube2",
    longUrl: "https://www.youtube.com",
  },
  FACEBOOK_1: {
    username: "facebook",
    shortUrl: "facebook1",
    longUrl: "https://www.facebook.com",
  },
  FACEBOOK_2: {
    username: "facebook",
    shortUrl: "facebook2",
    longUrl: "https://www.facebook.com",
  },
  BAD_LONG_URL_SYNTAX: {
    username: "yahoo",
    shortUrl: "yahoo1",
    longUrl: "https://bad long url syntax",
  },
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
