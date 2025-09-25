import { findCookie } from "./find-cookie";
import { parseCookies } from "./parse-cookies";

export const getCookie = (name: string): string | null =>
  findCookie(parseCookies(), name);
