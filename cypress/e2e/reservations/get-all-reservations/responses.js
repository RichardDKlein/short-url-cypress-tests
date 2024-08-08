/// <reference types="cypress" />

import { HTTP_STATUS_CODES } from "../../common/constants";

export const GET_ALL_RESERVATIONS_RESPONSES = {
  SUCCESS: {
    httpStatus: HTTP_STATUS_CODES.OK,
    response: {
      status: {
        status: "SUCCESS",
        message: "All short URL reservations successfully retrieved",
      },
      shortUrlReservations: [],
    },
  },
};

export function expectSuccessResponse(response) {
  expect(response.status).to.eq(
    GET_ALL_RESERVATIONS_RESPONSES.SUCCESS.httpStatus
  );
  expect(JSON.stringify(response.body.status)).to.eq(
    JSON.stringify(GET_ALL_RESERVATIONS_RESPONSES.SUCCESS.response.status)
  );
  expectAllReservationsSuccessfullyRetrieved(response);
}

function expectAllReservationsSuccessfullyRetrieved(response) {
  const reservations = response.body.shortUrlReservations;
  const shortUrls = reservations.map((reservation) => reservation.shortUrl);
  const uniqueShortUrls = new Set(shortUrls);
  expect(shortUrls.length).to.equal(uniqueShortUrls.size);
  shortUrls.forEach((shortUrl) => {
    expect(shortUrl.length).to.equal(6);
  });
  reservations.forEach((reservation) => {
    expect(reservation).to.have.property("isAvailable");
    expect(reservation).to.have.property("version");
    expect(reservation.version).to.be.a("number");
  });
}
