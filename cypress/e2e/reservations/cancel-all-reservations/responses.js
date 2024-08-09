/// <reference types="cypress" />

import { HTTP_STATUS_CODES } from "../../common/constants";
import { getAllReservations } from "../get-all-reservations/requests";

export const CANCEL_ALL_RESERVATION_RESPONSES = {
  SUCCESS: {
    httpStatus: HTTP_STATUS_CODES.OK,
    response: {
      status: "SUCCESS",
      message: "All short URL reservations successfully canceled",
    },
  },
};

export function expectSuccessResponse(response) {
  expect(response.status).to.eq(
    CANCEL_ALL_RESERVATION_RESPONSES.SUCCESS.httpStatus
  );
  expect(JSON.stringify(response.body)).to.eq(
    JSON.stringify(CANCEL_ALL_RESERVATION_RESPONSES.SUCCESS.response)
  );
  expectAllShortUrlsSuccessfullyCanceled(response);
}

function expectAllShortUrlsSuccessfullyCanceled(response) {
  return getAllReservations().then((response) => {
    response.body.shortUrlReservations.forEach((shortUrlReservation) => {
      expect(shortUrlReservation.isAvailable).to.equal(
        shortUrlReservation.shortUrl
      );
    });
  });
}
