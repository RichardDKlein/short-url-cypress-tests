/// <reference types="cypress" />

import { HTTP_STATUS_CODES } from "../../common/constants";

export const RESERVE_SPECIFIC_SHORT_URL_RESPONSES = {
  NO_SUCH_SHORT_URL: {
    httpStatus: HTTP_STATUS_CODES.NOT_FOUND,
    response: {
      status: "NO_SUCH_SHORT_URL",
      message: "Short URL '${shortUrl}' does not exist",
    },
  },
  SHORT_URL_ALREADY_RESERVED: {
    httpStatus: HTTP_STATUS_CODES.CONFLICT,
    response: {
      status: "SHORT_URL_ALREADY_RESERVED",
      message: "Short URL '${shortUrl}' has already been reserved",
    },
  },
  SUCCESS: {
    httpStatus: HTTP_STATUS_CODES.OK,
    response: {
      status: "SUCCESS",
      message: "Short URL '${shortUrl}' successfully reserved",
    },
  },
};

export function expectNoSuchShortUrlResponse(response) {
  expect(response.status).to.eq(
    RESERVE_SPECIFIC_SHORT_URL_RESPONSES.NO_SUCH_SHORT_URL.httpStatus
  );
  var expectedResponse = {
    ...RESERVE_SPECIFIC_SHORT_URL_RESPONSES.NO_SUCH_SHORT_URL.response,
  };
  const shortUrl = response.body.message.match(/'(.*)'/g);
  expectedResponse.message = expectedResponse.message.replace(
    "'${shortUrl}'",
    shortUrl
  );
  expect(JSON.stringify(response.body)).to.eq(JSON.stringify(expectedResponse));
}

export function expectShortUrlAlreadyReservedResponse(response) {
  expect(response.status).to.eq(
    RESERVE_SPECIFIC_SHORT_URL_RESPONSES.SHORT_URL_ALREADY_RESERVED.httpStatus
  );
  var expectedResponse = {
    ...RESERVE_SPECIFIC_SHORT_URL_RESPONSES.SHORT_URL_ALREADY_RESERVED.response,
  };
  const shortUrl = response.body.message.match(/'(.*)'/g);
  expectedResponse.message = expectedResponse.message.replace(
    "'${shortUrl}'",
    shortUrl
  );
  expect(JSON.stringify(response.body)).to.eq(JSON.stringify(expectedResponse));
}

export function expectSuccessResponse(response) {
  expect(response.status).to.eq(
    RESERVE_SPECIFIC_SHORT_URL_RESPONSES.SUCCESS.httpStatus
  );
  var expectedResponse = {
    ...RESERVE_SPECIFIC_SHORT_URL_RESPONSES.SUCCESS.response,
  };
  const shortUrl = response.body.message.match(/'(.*)'/g);
  expectedResponse.message = expectedResponse.message.replace(
    "'${shortUrl}'",
    shortUrl
  );
  expect(JSON.stringify(response.body)).to.eq(JSON.stringify(expectedResponse));
}
