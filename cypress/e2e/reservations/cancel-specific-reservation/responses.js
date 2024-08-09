/// <reference types="cypress" />

import { HTTP_STATUS_CODES } from "../../common/constants";

export const CANCEL_SPECIFIC_RESERVATION_RESPONSES = {
  NO_SUCH_SHORT_URL: {
    httpStatus: HTTP_STATUS_CODES.NOT_FOUND,
    response: {
      status: "NO_SUCH_SHORT_URL",
      message: "Short URL '${shortUrl}' does not exist",
    },
  },
  SHORT_URL_NOT_RESERVED: {
    httpStatus: HTTP_STATUS_CODES.CONFLICT,
    response: {
      status: "SHORT_URL_NOT_RESERVED",
      message:
        "Short URL '${shortUrl}' cannot be canceled, because it has not been reserved",
    },
  },
  SUCCESS: {
    httpStatus: HTTP_STATUS_CODES.OK,
    response: {
      status: "SUCCESS",
      message: "Short URL '${shortUrl}' successfully canceled",
    },
  },
};

export function expectNoSuchShortUrlResponse(response) {
  expect(response.status).to.eq(
    CANCEL_SPECIFIC_RESERVATION_RESPONSES.NO_SUCH_SHORT_URL.httpStatus
  );
  var expectedResponse = {
    ...CANCEL_SPECIFIC_RESERVATION_RESPONSES.NO_SUCH_SHORT_URL.response,
  };
  const shortUrl = response.body.message.match(/'(.*)'/g);
  expectedResponse.message = expectedResponse.message.replace(
    "'${shortUrl}'",
    shortUrl
  );
  expect(JSON.stringify(response.body)).to.eq(JSON.stringify(expectedResponse));
}

export function expectShortUrlNotReservedResponse(response) {
  expect(response.status).to.eq(
    CANCEL_SPECIFIC_RESERVATION_RESPONSES.SHORT_URL_NOT_RESERVED.httpStatus
  );
  var expectedResponse = {
    ...CANCEL_SPECIFIC_RESERVATION_RESPONSES.SHORT_URL_NOT_RESERVED.response,
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
    CANCEL_SPECIFIC_RESERVATION_RESPONSES.SUCCESS.httpStatus
  );
  var expectedResponse = {
    ...CANCEL_SPECIFIC_RESERVATION_RESPONSES.SUCCESS.response,
  };
  const shortUrl = response.body.message.match(/'(.*)'/g);
  expectedResponse.message = expectedResponse.message.replace(
    "'${shortUrl}'",
    shortUrl
  );
  expect(JSON.stringify(response.body)).to.eq(JSON.stringify(expectedResponse));
}
