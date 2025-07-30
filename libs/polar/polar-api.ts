import { Polar } from "@polar-sh/sdk";
import { polarApiConfig } from "./polar-api-config";

export const polarApi = new Polar({
  accessToken: polarApiConfig.accessToken,
  server: polarApiConfig.server,
});
