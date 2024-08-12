/// <reference types="cypress" />

import { HTTP_STATUS_CODES } from "../../common/constants";
import { computeShortUrls } from "../../common/short-urls";

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
  const actualShortUrls = new Set(
    reservations.map((reservation) => reservation.shortUrl)
  );
  const expectedShortUrls = computeShortUrls();
  expect(setsAreEqual(actualShortUrls, expectedShortUrls)).to.be.true;

  reservations.forEach((reservation) => {
    expect(reservation).to.have.property("isAvailable");
    expect(reservation).to.have.property("version");
    expect(reservation.version).to.be.a("number");
  });
}

function setsAreEqual(setA, setB) {
  if (setA.size !== setB.size) {
    return false;
  }
  for (const item of setA) {
    if (!setB.has(item)) {
      return false;
    }
  }
  return true;
}
