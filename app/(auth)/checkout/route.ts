import { polarApiConfig } from "@/libs/polar/polar-api-config";
import { Checkout } from "@polar-sh/nextjs";

console.log("params", polarApiConfig);
export const GET = Checkout({
  accessToken: polarApiConfig.accessToken,
  successUrl: polarApiConfig.successUrl,
  server: polarApiConfig.server,
});
