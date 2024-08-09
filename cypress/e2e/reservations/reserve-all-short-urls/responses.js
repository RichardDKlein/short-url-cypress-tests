/// <reference types="cypress" />

import { HTTP_STATUS_CODES } from "../../common/constants";
import { getAllReservations } from "../get-all-reservations/requests";

export const RESERVE_ALL_SHORT_URL_RESPONSES = {
  SUCCESS: {
    httpStatus: HTTP_STATUS_CODES.OK,
    response: {
      status: "SUCCESS",
      message: "All short URL reservations successfully reserved",
    },
  },
};

export function expectSuccessResponse(response) {
  expect(response.status).to.eq(
    RESERVE_ALL_SHORT_URL_RESPONSES.SUCCESS.httpStatus
  );
  expect(JSON.stringify(response.body)).to.eq(
    JSON.stringify(RESERVE_ALL_SHORT_URL_RESPONSES.SUCCESS.response)
  );
  expectAllShortUrlsSuccessfullyReserved(response);
}

function expectAllShortUrlsSuccessfullyReserved(response) {
  return getAllReservations().then((response) => {
    response.body.shortUrlReservations.forEach((shortUrlReservation) => {
      expect(shortUrlReservation.isAvailable).to.equal(null);
    });
  });
}
