import { headers } from "next/headers";

export const getJwtToken = () => {
  const headersApi = headers();

  const jwtToken = headersApi.get("authorization") || "";

  return jwtToken;
};
