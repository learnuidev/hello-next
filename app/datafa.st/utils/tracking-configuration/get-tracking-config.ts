import { Config, TrackingConfig } from "../../datafast.types";
import { getConfig } from "../get-config";

export const getTrackingConfig = (): TrackingConfig => {
  const config = getConfig();

  const { currentScript, dataPrefix, getScriptAttribute } = config;

  const allowFileProtocol =
    getScriptAttribute(`${dataPrefix}allow-file-protocol`) === "true";
  const allowLocalhost =
    getScriptAttribute(`${dataPrefix}allow-localhost`) === "true";
  const debugMode = getScriptAttribute(`${dataPrefix}debug`) === "true";
  const websiteId = getScriptAttribute(`${dataPrefix}website-id`);
  const trackingDomain = getScriptAttribute(`${dataPrefix}domain`);

  const isSelfHosted = !currentScript?.src.includes("datafa.st");
  const apiBaseUrl =
    getScriptAttribute(`${dataPrefix}api-url`) || window.location.origin;
  const apiEndpoint = isSelfHosted
    ? new URL("/api/events", apiBaseUrl).href
    : "https://datafa.st/api/events";

  return {
    allowFileProtocol,
    allowLocalhost,
    debugMode,
    websiteId,
    trackingDomain,
    apiEndpoint,
  };
};
