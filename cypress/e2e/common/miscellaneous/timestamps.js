/// <reference types="cypress" />

export function mangleJwtToken(jwtToken) {
  return jwtToken.substring(1);
}

/**
 * Determines whether a given timestamp refers to a time in the recent past.
 *
 * @param {string} timestamp - A timestamp of the form "dd MMM yyyy HH:mm:ss".
 * @param {*} secondsAgo - The number of seconds that defines the "recent past".
 * @returns {boolean} - 'true' if `timestamp` occurred within `secondsAgo`
 * seconds of the current time, 'false' otherwise.
 */
export function isTimestampRecent(timestamp, secondsAgo) {
  const timestampDate = new Date(timestamp);
  const currentDate = new Date();
  const timeDifferenceInSeconds = (currentDate - timestampDate) / 1000;
  return timeDifferenceInSeconds <= secondsAgo;
}
