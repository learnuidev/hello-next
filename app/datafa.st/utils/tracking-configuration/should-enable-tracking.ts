import { TrackingConfig, TrackingStatus } from "../../datafast.types";
import { isBot } from "../environment-detection/is-bot";
import { isLocalhost } from "../environment-detection/is-local-host";

export const shouldEnableTracking = (
  config: TrackingConfig
): TrackingStatus => {
  // Check for bots
  if (isBot()) {
    return { enabled: false, reason: "Tracking disabled - bot detected" };
  }

  // Check environment restrictions
  if (
    (isLocalhost(window.location.hostname) && !config.allowLocalhost) ||
    (window.location.protocol === "file:" && !config.allowFileProtocol)
  ) {
    return {
      enabled: false,
      reason:
        window.location.protocol === "file:"
          ? "Tracking disabled on file protocol (use data-allow-file-protocol='true' to enable)"
          : "Tracking disabled on localhost (use data-allow-localhost='true' to enable)",
    };
  }

  // Disable in iframes (unless debug mode)
  if (window !== window.parent && !config.debugMode) {
    return { enabled: false, reason: "Tracking disabled inside an iframe" };
  }

  // Validate required configuration
  if (!config.websiteId || !config.trackingDomain) {
    return { enabled: false, reason: "Missing website ID or domain" };
  }

  return { enabled: true, reason: "" };
};
