import { getCookie } from "../cookie-management/get-cookie";
import { setCookie } from "../cookie-management/set-cookie";
import { generateUUID } from "./generate-uuid";

export const createIdGenerator = (
  cookieName: string,
  template: string,
  expirationDays: number
): (() => string) => {
  return (): string => {
    let id = getCookie(cookieName);
    if (!id) {
      id = generateUUID(template);
      setCookie(cookieName, id, expirationDays, null);
    }
    return id;
  };
};
