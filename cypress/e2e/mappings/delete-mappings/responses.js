/// <reference types="cypress" />

import {
  areObjectArraysEqual,
  subtractObjectArrays,
} from "../../common/arrays";
import { HTTP_STATUS_CODES, MAPPINGS } from "../../common/constants";
import { GET_MAPPINGS_RESPONSES } from "../get-mappings/responses";
import { getAllMappings } from "../get-mappings/requests";

export const DELETE_MAPPINGS_RESPONSES = {
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
  SUCCESS_WITH_WILDCARD_USERNAME: {
    httpStatus: HTTP_STATUS_CODES.OK,
    response: {
      status: "SUCCESS",
      message: "Mappings successfully deleted",
    },
  },
  SUCCESS_WITH_WILDCARD_SHORT_URL: {
    httpStatus: HTTP_STATUS_CODES.OK,
    response: {
      status: "SUCCESS",
      message: "Mappings successfully deleted",
    },
  },
  SUCCESS_WITH_WILDCARD_LONG_URL: {
    httpStatus: HTTP_STATUS_CODES.OK,
    response: {
      status: "SUCCESS",
      message: "Mappings successfully deleted",
    },
  },
  SUCCESS_WITH_ALL_WILDCARDS: {
    httpStatus: HTTP_STATUS_CODES.OK,
    response: {
      status: "SUCCESS",
      message: "Mappings successfully deleted",
    },
  },
  SUCCESS_WITHOUT_WILDCARDS: {
    httpStatus: HTTP_STATUS_CODES.OK,
    response: {
      status: "SUCCESS",
      message: "Mappings successfully deleted",
    },
  },
};

export function expectMissingUsernameResponse(response) {
  expect(response.status).to.eq(
    DELETE_MAPPINGS_RESPONSES.MISSING_USERNAME.httpStatus
  );
  expect(JSON.stringify(response.body)).to.eq(
    JSON.stringify(DELETE_MAPPINGS_RESPONSES.MISSING_USERNAME.response)
  );
}

export function expectMissingShortUrlResponse(response) {
  expect(response.status).to.eq(
    DELETE_MAPPINGS_RESPONSES.MISSING_SHORT_URL.httpStatus
  );
  expect(JSON.stringify(response.body)).to.eq(
    JSON.stringify(DELETE_MAPPINGS_RESPONSES.MISSING_SHORT_URL.response)
  );
}

export function expectMissingLongUrlResponse(response) {
  expect(response.status).to.eq(
    DELETE_MAPPINGS_RESPONSES.MISSING_LONG_URL.httpStatus
  );
  expect(JSON.stringify(response.body)).to.eq(
    JSON.stringify(DELETE_MAPPINGS_RESPONSES.MISSING_LONG_URL.response)
  );
}

export function expectSuccessWithWildcardUsernameResponse(response) {
  expect(response.status).to.eq(
    DELETE_MAPPINGS_RESPONSES.SUCCESS_WITH_WILDCARD_USERNAME.httpStatus
  );
  getAllMappings().then((response) => {
    expect(
      areObjectArraysEqual(
        response.body.shortUrlMappings,
        subtractObjectArrays(
          Object.values(MAPPINGS),
          GET_MAPPINGS_RESPONSES.SUCCESS_WITH_WILDCARD_USERNAME.response
            .shortUrlMappings
        )
      )
    );
  });
}

export function expectSuccessWithWildcardShortUrlResponse(response) {
  expect(response.status).to.eq(
    DELETE_MAPPINGS_RESPONSES.SUCCESS_WITH_WILDCARD_SHORT_URL.httpStatus
  );
  getAllMappings().then((response) => {
    expect(
      areObjectArraysEqual(
        response.body.shortUrlMappings,
        subtractObjectArrays(
          Object.values(MAPPINGS),
          GET_MAPPINGS_RESPONSES.SUCCESS_WITH_WILDCARD_SHORT_URL.response
            .shortUrlMappings
        )
      )
    );
  });
}

export function expectSuccessWithWildcardLongUrlResponse(response) {
  expect(response.status).to.eq(
    DELETE_MAPPINGS_RESPONSES.SUCCESS_WITH_WILDCARD_LONG_URL.httpStatus
  );
  getAllMappings().then((response) => {
    expect(
      areObjectArraysEqual(
        response.body.shortUrlMappings,
        subtractObjectArrays(
          Object.values(MAPPINGS),
          GET_MAPPINGS_RESPONSES.SUCCESS_WITH_WILDCARD_LONG_URL.response
            .shortUrlMappings
        )
      )
    );
  });
}

export function expectSuccessWithAllWildcardsResponse(response) {
  expect(response.status).to.eq(
    DELETE_MAPPINGS_RESPONSES.SUCCESS_WITH_ALL_WILDCARDS.httpStatus
  );
  getAllMappings().then((response) => {
    expect(
      areObjectArraysEqual(
        response.body.shortUrlMappings,
        subtractObjectArrays(
          Object.values(MAPPINGS),
          GET_MAPPINGS_RESPONSES.SUCCESS_WITH_ALL_WILDCARDS.response
            .shortUrlMappings
        )
      )
    );
  });
}

export function expectSuccessWithoutWildcardsResponse(response) {
  expect(response.status).to.eq(
    DELETE_MAPPINGS_RESPONSES.SUCCESS_WITHOUT_WILDCARDS.httpStatus
  );
  getAllMappings().then((response) => {
    expect(
      areObjectArraysEqual(
        response.body.shortUrlMappings,
        subtractObjectArrays(
          Object.values(MAPPINGS),
          GET_MAPPINGS_RESPONSES.SUCCESS_WITHOUT_WILDCARDS.response
            .shortUrlMappings
        )
      )
    );
  });
}
