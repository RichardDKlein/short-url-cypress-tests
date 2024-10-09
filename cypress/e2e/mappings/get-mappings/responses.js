/// <reference types="cypress" />

import { areObjectArraysEqual } from "../../common/arrays";
import { HTTP_STATUS_CODES, MAPPINGS } from "../../common/constants";

export const GET_MAPPINGS_RESPONSES = {
  MISSING_USERNAME: {
    httpStatus: HTTP_STATUS_CODES.BAD_REQUEST,
    response: {
      status: {
        status: "MISSING_USERNAME",
        message: "A non-empty username must be specified",
      },
      shortUrlMappings: null,
    },
  },
  MISSING_SHORT_URL: {
    httpStatus: HTTP_STATUS_CODES.BAD_REQUEST,
    response: {
      status: {
        status: "MISSING_SHORT_URL",
        message: "A non-empty short URL must be specified",
      },
      shortUrlMappings: null,
    },
  },
  MISSING_LONG_URL: {
    httpStatus: HTTP_STATUS_CODES.BAD_REQUEST,
    response: {
      status: {
        status: "MISSING_LONG_URL",
        message: "A non-empty long URL must be specified",
      },
      shortUrlMappings: null,
    },
  },
  SUCCESS_WITH_WILDCARD_USERNAME: {
    httpStatus: HTTP_STATUS_CODES.OK,
    response: {
      status: {
        status: "SUCCESS",
        message: "Mappings successfully retrieved",
      },
      shortUrlMappings: [MAPPINGS.GOOGLE_1],
    },
  },
  SUCCESS_WITH_WILDCARD_SHORT_URL: {
    httpStatus: HTTP_STATUS_CODES.OK,
    response: {
      status: {
        status: "SUCCESS",
        message: "Mappings successfully retrieved",
      },
      shortUrlMappings: [MAPPINGS.YOUTUBE_1, MAPPINGS.YOUTUBE_2],
    },
  },
  SUCCESS_WITH_WILDCARD_LONG_URL: {
    httpStatus: HTTP_STATUS_CODES.OK,
    response: {
      status: {
        status: "SUCCESS",
        message: "Mappings successfully retrieved",
      },
      shortUrlMappings: [MAPPINGS.FACEBOOK_2],
    },
  },
  SUCCESS_WITH_ALL_WILDCARDS: {
    httpStatus: HTTP_STATUS_CODES.OK,
    response: {
      status: {
        status: "SUCCESS",
        message: "Mappings successfully retrieved",
      },
      shortUrlMappings: Object.values(MAPPINGS),
    },
  },
  SUCCESS_WITHOUT_WILDCARDS: {
    httpStatus: HTTP_STATUS_CODES.OK,
    response: {
      status: {
        status: "SUCCESS",
        message: "Mappings successfully retrieved",
      },
      shortUrlMappings: [MAPPINGS.YOUTUBE_2],
    },
  },
};

export function expectMissingUsernameResponse(response) {
  expect(response.status).to.eq(
    GET_MAPPINGS_RESPONSES.MISSING_USERNAME.httpStatus
  );
  expect(JSON.stringify(response.body)).to.eq(
    JSON.stringify(GET_MAPPINGS_RESPONSES.MISSING_USERNAME.response)
  );
}

export function expectMissingShortUrlResponse(response) {
  expect(response.status).to.eq(
    GET_MAPPINGS_RESPONSES.MISSING_SHORT_URL.httpStatus
  );
  expect(JSON.stringify(response.body)).to.eq(
    JSON.stringify(GET_MAPPINGS_RESPONSES.MISSING_SHORT_URL.response)
  );
}

export function expectMissingLongUrlResponse(response) {
  expect(response.status).to.eq(
    GET_MAPPINGS_RESPONSES.MISSING_LONG_URL.httpStatus
  );
  expect(JSON.stringify(response.body)).to.eq(
    JSON.stringify(GET_MAPPINGS_RESPONSES.MISSING_LONG_URL.response)
  );
}

export function expectSuccessWithWildcardUsernameResponse(response) {
  expect(response.status).to.eq(
    GET_MAPPINGS_RESPONSES.SUCCESS_WITH_WILDCARD_USERNAME.httpStatus
  );
  expect(JSON.stringify(response.body)).to.eq(
    JSON.stringify(
      GET_MAPPINGS_RESPONSES.SUCCESS_WITH_WILDCARD_USERNAME.response
    )
  );
}

export function expectSuccessWithWildcardShortUrlResponse(response) {
  expect(response.status).to.eq(
    GET_MAPPINGS_RESPONSES.SUCCESS_WITH_WILDCARD_SHORT_URL.httpStatus
  );
  expect(JSON.stringify(response.body.status)).to.eq(
    JSON.stringify(
      GET_MAPPINGS_RESPONSES.SUCCESS_WITH_WILDCARD_SHORT_URL.response.status
    )
  );
  expect(
    areObjectArraysEqual(
      response.body.shortUrlMappings,
      GET_MAPPINGS_RESPONSES.SUCCESS_WITH_WILDCARD_SHORT_URL.response
        .shortUrlMappings
    )
  );
}

export function expectSuccessWithWildcardLongUrlResponse(response) {
  expect(response.status).to.eq(
    GET_MAPPINGS_RESPONSES.SUCCESS_WITH_WILDCARD_LONG_URL.httpStatus
  );
  expect(JSON.stringify(response.body)).to.eq(
    JSON.stringify(
      GET_MAPPINGS_RESPONSES.SUCCESS_WITH_WILDCARD_LONG_URL.response
    )
  );
}

export function expectSuccessWithAllWildcardsResponse(response) {
  expect(response.status).to.eq(
    GET_MAPPINGS_RESPONSES.SUCCESS_WITH_ALL_WILDCARDS.httpStatus
  );
  expect(JSON.stringify(response.body.status)).to.eq(
    JSON.stringify(
      GET_MAPPINGS_RESPONSES.SUCCESS_WITH_ALL_WILDCARDS.response.status
    )
  );
  expect(
    areObjectArraysEqual(
      response.body.shortUrlMappings,
      GET_MAPPINGS_RESPONSES.SUCCESS_WITH_ALL_WILDCARDS.response
        .shortUrlMappings
    )
  );
}

export function expectSuccessWithoutWildcardsResponse(response) {
  expect(response.status).to.eq(
    GET_MAPPINGS_RESPONSES.SUCCESS_WITHOUT_WILDCARDS.httpStatus
  );
  expect(JSON.stringify(response.body)).to.eq(
    JSON.stringify(GET_MAPPINGS_RESPONSES.SUCCESS_WITHOUT_WILDCARDS.response)
  );
}
