/// <reference types="cypress" />

import { HTTP_STATUS_CODES } from "../../common/constants";

export const RESERVE_ANY_SHORT_URL_RESPONSES = {
  NO_SHORT_URLS_ARE_AVAILABLE: {
    httpStatus: HTTP_STATUS_CODES.NOT_FOUND,
    response: {
      status: {
        status: "NO_SHORT_URLS_ARE_AVAILABLE",
        message: "No short URLs are available",
      },
      shortUrlReservation: null,
    },
  },
  SUCCESS: {
    httpStatus: HTTP_STATUS_CODES.OK,
    response: {
      status: {
        status: "SUCCESS",
        message: "Short URL '${shortUrl}' successfully reserved",
      },
      shortUrlReservation: undefined,
    },
  },
};

export function expectNoShortUrlsAreAvailableResponse(response) {
  expect(response.status).to.eq(
    RESERVE_ANY_SHORT_URL_RESPONSES.NO_SHORT_URLS_ARE_AVAILABLE.httpStatus
  );
  expect(JSON.stringify(response.body)).to.eq(
    JSON.stringify(
      RESERVE_ANY_SHORT_URL_RESPONSES.NO_SHORT_URLS_ARE_AVAILABLE.response
    )
  );
}

export function expectSuccessResponse(response) {
  expect(response.status).to.eq(
    RESERVE_ANY_SHORT_URL_RESPONSES.SUCCESS.httpStatus
  );
  var expectedStatus = {
    ...RESERVE_ANY_SHORT_URL_RESPONSES.SUCCESS.response.status,
  };
  let shortUrl = response.body.status.message.match(/'(.*)'/g);
  expectedStatus.message = expectedStatus.message.replace(
    "'${shortUrl}'",
    shortUrl
  );
  expect(JSON.stringify(response.body.status)).to.eq(
    JSON.stringify(expectedStatus)
  );
  const shortUrlReservation = response.body.shortUrlReservation;
  // strip off quotes
  shortUrl = String(shortUrl);
  shortUrl = shortUrl.substring(1, shortUrl.length - 1);
  expect(shortUrlReservation.shortUrl).to.eq(shortUrl);
  expect(shortUrlReservation.isAvailable).to.eq(null);
  expect(shortUrlReservation).to.have.property("version");
  expect(shortUrlReservation.version).to.be.a("number");
}
