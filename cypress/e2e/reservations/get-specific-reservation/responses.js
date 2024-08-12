/// <reference types="cypress" />

import { HTTP_STATUS_CODES } from "../../common/constants";

export const GET_SPECIFIC_RESERVATION_RESPONSES = {
  NO_SUCH_SHORT_URL: {
    httpStatus: HTTP_STATUS_CODES.NOT_FOUND,
    response: {
      status: {
        status: "NO_SUCH_SHORT_URL",
        message: "Short URL '${shortUrl}' does not exist",
      },
      shortUrlReservation: null,
    },
  },
  SUCCESS: {
    httpStatus: HTTP_STATUS_CODES.OK,
    response: {
      status: {
        status: "SUCCESS",
        message: "Short URL '${shortUrl}' successfully retrieved",
      },
      shortUrlUser: {},
    },
  },
};

export function expectNoSuchReservationResponse(response) {
  expect(response.status).to.eq(
    GET_SPECIFIC_RESERVATION_RESPONSES.NO_SUCH_SHORT_URL.httpStatus
  );
  var expectedResponse = {
    ...GET_SPECIFIC_RESERVATION_RESPONSES.NO_SUCH_SHORT_URL.response,
  };
  const shortUrl = response.body.status.message.match(/'(.*)'/g);
  expectedResponse.status.message = expectedResponse.status.message.replace(
    "'${shortUrl}'",
    shortUrl
  );
  expect(JSON.stringify(response.body)).to.eq(JSON.stringify(expectedResponse));
}

export function expectSuccessResponse(response) {
  expect(response.status).to.eq(
    GET_SPECIFIC_RESERVATION_RESPONSES.SUCCESS.httpStatus
  );
  var expectedResponse = {
    ...GET_SPECIFIC_RESERVATION_RESPONSES.SUCCESS.response,
  };
  let shortUrl = response.body.status.message.match(/'(.*)'/g);
  expectedResponse.status.message = expectedResponse.status.message.replace(
    "'${shortUrl}'",
    shortUrl
  );
  expect(JSON.stringify(response.body.status)).to.eq(
    JSON.stringify(expectedResponse.status)
  );
  // strip off quotes
  shortUrl = String(shortUrl);
  shortUrl = shortUrl.substring(1, shortUrl.length - 1);
  expect(response.body.shortUrlReservation.shortUrl).to.eq(shortUrl);
  expect(response.body.shortUrlReservation).to.have.property("isAvailable");
  expect(response.body.shortUrlReservation).to.have.property("version");
}
