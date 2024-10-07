/// <reference types="cypress" />

import { HTTP_STATUS_CODES } from "../../common/constants";

export const CREATE_MAPPING_RESPONSES = {
  MISSING_USERNAME: {
    httpStatus: HTTP_STATUS_CODES.BAD_REQUEST,
    response: {
      status: "MISSING_USERNAME",
      message: "A non-empty username must be specified",
    },
  },
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
  SHORT_URL_ALREADY_TAKEN: {
    httpStatus: HTTP_STATUS_CODES.CONFLICT,
    response: {
      status: "SHORT_URL_ALREADY_TAKEN",
      message: "Short URL '${shortUrl}' is already taken",
    },
  },
  SUCCESS: {
    httpStatus: HTTP_STATUS_CODES.OK,
    response: {
      status: "SUCCESS",
      message: "Mapping successfully created",
    },
  },
};

export function expectMissingUsernameResponse(response) {
  expect(response.status).to.eq(
    CREATE_MAPPING_RESPONSES.MISSING_USERNAME.httpStatus
  );
  expect(JSON.stringify(response.body)).to.eq(
    JSON.stringify(CREATE_MAPPING_RESPONSES.MISSING_USERNAME.response)
  );
}

export function expectMissingShortUrlResponse(response) {
  expect(response.status).to.eq(
    CREATE_MAPPING_RESPONSES.MISSING_SHORT_URL.httpStatus
  );
  expect(JSON.stringify(response.body)).to.eq(
    JSON.stringify(CREATE_MAPPING_RESPONSES.MISSING_SHORT_URL.response)
  );
}

export function expectMissingLongUrlResponse(response) {
  expect(response.status).to.eq(
    CREATE_MAPPING_RESPONSES.MISSING_LONG_URL.httpStatus
  );
  expect(JSON.stringify(response.body)).to.eq(
    JSON.stringify(CREATE_MAPPING_RESPONSES.MISSING_LONG_URL.response)
  );
}

export function expectShortUrlAlreadyTakenResponse(response) {
  expect(response.status).to.eq(
    CREATE_MAPPING_RESPONSES.SHORT_URL_ALREADY_TAKEN.httpStatus
  );
  var expectedResponse = {
    ...CREATE_MAPPING_RESPONSES.SHORT_URL_ALREADY_TAKEN.response,
  };
  const shortUrl = response.body.message.match(/'(.*)'/g);
  expectedResponse.message = expectedResponse.message.replace(
    "'${shortUrl}'",
    shortUrl
  );
  expect(JSON.stringify(response.body)).to.eq(JSON.stringify(expectedResponse));
}

export function expectSuccessResponse(response) {
  expect(response.status).to.eq(CREATE_MAPPING_RESPONSES.SUCCESS.httpStatus);
  var expectedResponse = { ...CREATE_MAPPING_RESPONSES.SUCCESS.response };
  const shortUrl = response.body.message.match(/'(.*)'/g);
  expectedResponse.message = expectedResponse.message.replace(
    "'${shortUrl}'",
    shortUrl
  );
  expect(JSON.stringify(response.body)).to.eq(JSON.stringify(expectedResponse));
}
