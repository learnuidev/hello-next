export const parseCookies = (): string[] =>
  document.cookie.split(";").map((cookie) => cookie.trim());
