/// <reference types="cypress" />

export function computeShortUrls() {
  const minShortUrlBase10 = parseInt(Cypress.env("minShortUrlBase10"), 10);
  const maxShortUrlBase10 = parseInt(Cypress.env("maxShortUrlBase10"), 10);

  const shortUrls = new Set();

  for (let n = minShortUrlBase10; n <= maxShortUrlBase10; n++) {
    const shortUrl = longIntToShortUrl(n);
    shortUrls.add(shortUrl);
  }

  return shortUrls;
}

export function longIntToShortUrl(n) {
  const digits =
    "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_-";
  const base = digits.length;
  let shortUrl = "";

  while (n > 0) {
    shortUrl = digits.charAt(n % base) + shortUrl;
    n = Math.floor(n / base); // Use integer division
  }

  return shortUrl;
}
