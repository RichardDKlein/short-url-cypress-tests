/// <reference types="cypress" />

import { HTTP_STATUS_CODES } from "../../common/constants";

export const CHANGE_LONG_URL_RESPONSES = {
  MISSING_SHORT_URL: {
    httpStatus: HTTP_STATUS_CODES.BAD_REQUEST,
    response: {
      status: "MISSING_SHORT_URL",
      message: "A non-empty short URL must be specified",
    },
  },
  MISSING_LONG_URL: {
    httpStatus: HTTP_STATUS_CODES.BAD_REQUEST,
    response: {
      status: "MISSING_LONG_URL",
      message: "A non-empty long URL must be specified",
    },
  },
  SHORT_URL_NOT_FOUND: {
    httpStatus: HTTP_STATUS_CODES.NOT_FOUND,
    response: {
      status: "SHORT_URL_NOT_FOUND",
      message: "Short URL '${shortUrl}' was not found",
    },
  },
  SUCCESS: {
    httpStatus: HTTP_STATUS_CODES.OK,
    response: {
      status: "SUCCESS",
      message: "Long URL successfully changed",
    },
  },
};

export function expectMissingShortUrlResponse(response) {
  expect(response.status).to.eq(
    CHANGE_LONG_URL_RESPONSES.MISSING_SHORT_URL.httpStatus
  );
  expect(JSON.stringify(response.body)).to.eq(
    JSON.stringify(CHANGE_LONG_URL_RESPONSES.MISSING_SHORT_URL.response)
  );
}

export function expectMissingLongUrlResponse(response) {
  expect(response.status).to.eq(
    CHANGE_LONG_URL_RESPONSES.MISSING_LONG_URL.httpStatus
  );
  expect(JSON.stringify(response.body)).to.eq(
    JSON.stringify(CHANGE_LONG_URL_RESPONSES.MISSING_LONG_URL.response)
  );
}

export function expectShortUrlNotFoundResponse(response) {
  expect(response.status).to.eq(
    CHANGE_LONG_URL_RESPONSES.SHORT_URL_NOT_FOUND.httpStatus
  );
  var expectedResponse = {
    ...CHANGE_LONG_URL_RESPONSES.SHORT_URL_NOT_FOUND.response,
  };
  const shortUrl = response.body.message.match(/'(.*)'/g);
  expectedResponse.message = expectedResponse.message.replace(
    "'${shortUrl}'",
    shortUrl
  );
  expect(JSON.stringify(response.body)).to.eq(JSON.stringify(expectedResponse));
}

export function expectSuccessResponse(response) {
  expect(response.status).to.eq(CHANGE_LONG_URL_RESPONSES.SUCCESS.httpStatus);
  expect(JSON.stringify(response.body)).to.eq(
    JSON.stringify(CHANGE_LONG_URL_RESPONSES.SUCCESS.response)
  );
}
