// app/providers.tsx
"use client";

import posthog from "posthog-js";
import { PostHogProvider as PHProvider } from "posthog-js/react";
import { posthogConfig } from "./posthog.config";

if (typeof window !== "undefined") {
  // const resp = posthog.init("phc_Szwgh2TQR1jAy17IJDt6WwkVe3x8Ay5LJqkMuYGulZv", {
  //   api_host: "https://app.posthog.com",
  // });
  // posthog.init(posthogConfig.apiKey, {
  //   api_host: posthogConfig.apiHost,
  //   capture_pageview: false, // Disable automatic pageview capture, as we capture manually
  //   autocapture: {
  //     dom_event_allowlist: ["click"], // DOM events from this list ['click', 'change', 'submit']
  //     url_allowlist: ["posthog.com./docs/.*"], // strings or RegExps
  //     element_allowlist: ["button"], // DOM elements from this list ['a', 'button', 'form', 'input', 'select', 'textarea', 'label']
  //     css_selector_allowlist: ["[ph-autocapture]"], // List of CSS selectors
  //   },
  // });
}

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  return <PHProvider client={posthog}>{children}</PHProvider>;
}
