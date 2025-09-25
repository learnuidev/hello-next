import { buildCookieString } from "./build-cookie-string";

export const setCookie = (
  name: string,
  value: string,
  daysToExpire: number,
  trackingDomain: string | null
): void => {
  const expires = daysToExpire
    ? `; expires=${new Date(Date.now() + daysToExpire * 24 * 60 * 60 * 1000).toUTCString()}`
    : "";

  document.cookie = buildCookieString(name, value, expires, trackingDomain);
};
