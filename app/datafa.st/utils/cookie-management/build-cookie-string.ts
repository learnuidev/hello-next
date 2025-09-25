import { isLocalhost } from "../environment-detection/is-local-host";

export const buildCookieString = (
  name: string,
  value: string,
  expires: string,
  trackingDomain: string | null
): string => {
  let cookieString = `${name}=${value || ""}${expires}; path=/`;

  if (
    trackingDomain &&
    !isLocalhost(window.location.hostname) &&
    window.location.protocol !== "file:"
  ) {
    cookieString += `; domain=.${trackingDomain.replace(/^\./, "")}`;
  }

  return cookieString;
};
