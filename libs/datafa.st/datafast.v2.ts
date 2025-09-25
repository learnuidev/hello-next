// ========== TYPE DEFINITIONS ==========

import { BaseData, EventCallback, PageviewState } from "./datafast.types";
import { collectBaseData } from "./utils/data-collection/collect-base-data";
import { sendEvent } from "./utils/event-management/send-event";
import { validateCustomEventData } from "./utils/event-validation/validate-custom-event-data";
import { createIdGenerator } from "./utils/id-generation/create-id-generator";
import { getTrackingConfig } from "./utils/tracking-configuration/get-tracking-config";
import { shouldEnableTracking } from "./utils/tracking-configuration/should-enable-tracking";
import { createElementTracker } from "./utils/tracking-management/create-element-tracker";
import { createEventTracker } from "./utils/tracking-management/create-event-tracker";
import { createPaymentDetector } from "./utils/tracking-management/create-payment-detector";
import { initializeScrollTracking } from "./utils/tracking-management/initialize-scroll-tracking";
import { setupHistoryTracking } from "./utils/tracking-management/setup-history-tracking";

export function dataFast({
  apiKey,
  domain,
}: {
  domain?: string;
  apiKey?: string;
}):
  | undefined
  | {
      datafast: (eventName: string, eventData?: any) => void;
    } {
  // ========== MAIN INITIALIZATION ==========

  const config = getTrackingConfig({ apiKey, domain });
  const trackingStatus = shouldEnableTracking(config);
  const { enabled: trackingEnabled, reason: disabledReason } = trackingStatus;

  const getOrCreateSessionId = createIdGenerator(
    "datafast_session_id",
    "sxxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx",
    1 / 48
  );

  // Process queued calls
  const queuedCalls: any[][] = (
    (window as any).datafast?.q && Array.isArray((window as any).datafast.q)
      ? (window as any).datafast.q.map((call: any) => Array.from(call))
      : []
  ) as any[][];

  // Restore pageview state
  const restorePageviewState = (): PageviewState => {
    try {
      const savedState = sessionStorage.getItem("datafast_pageview_state");
      if (savedState) {
        const { time, url } = JSON.parse(savedState);
        return { lastTime: time || 0, lastUrl: url || "" };
      }
    } catch (error) {
      // Ignore errors
    }
    return { lastTime: 0, lastUrl: "" };
  };

  let pageviewState = restorePageviewState();

  // Create trackers
  const baseDataCollector = (): BaseData | null =>
    collectBaseData(
      config.websiteId,
      config.trackingDomain,
      getOrCreateSessionId
    );

  const eventSender = (eventData: BaseData, callback?: EventCallback): void =>
    sendEvent(
      eventData,
      callback,
      config.apiEndpoint,
      config.trackingDomain,
      getOrCreateSessionId
    );

  const eventTracker = createEventTracker(
    trackingEnabled,
    baseDataCollector,
    eventSender,
    config.apiEndpoint,
    config.trackingDomain
  );

  const elementTracker = createElementTracker(
    eventTracker.trackEvent,
    validateCustomEventData
  );

  // Main datafast function
  const datafast = (eventName: string, eventData?: any): void => {
    if (!trackingEnabled) {
      console.log(`DataFast: Event '${eventName}' ignored - ${disabledReason}`);
      return;
    }

    if (!eventName) {
      console.warn("DataFast: Missing event_name for custom event");
      return;
    }

    const eventHandlers: Record<string, () => void> = {
      payment: () => {
        if (!eventData?.email) {
          console.warn("DataFast: Missing email for payment event");
          return;
        }
        eventTracker.trackEvent("payment", { email: eventData.email });
      },

      identify: () => {
        if (!eventData?.user_id) {
          console.warn("DataFast: Missing user_id for identify event");
          return;
        }
        eventTracker.trackEvent("identify", {
          user_id: eventData.user_id,
          name: eventData.name || "",
          ...eventData,
        });
      },

      default: () => {
        const validatedData = validateCustomEventData(eventData || {});
        if (validatedData === null) {
          console.error(
            "DataFast: Custom event rejected due to validation errors"
          );
          return;
        }
        eventTracker.trackEvent("custom", { eventName, ...validatedData });
      },
    };

    const handler = eventHandlers[eventName] || eventHandlers.default;
    handler();
  };

  // Initialize global function
  (window as any).datafast = datafast;
  delete (window as any).datafast?.q;

  // Process queued calls
  queuedCalls.forEach((call) => {
    if (Array.isArray(call) && call.length > 0) {
      try {
        // @ts-ignore
        datafast.apply(null, call);
      } catch (error) {
        console.error("DataFast: Error processing queued call:", error, call);
      }
    }
  });

  // Exit if tracking is disabled
  if (!trackingEnabled) {
    console.warn(`DataFast: ${disabledReason}`);
    return;
  }

  // Set up event listeners
  const setupEventListeners = (): void => {
    document.addEventListener("click", (event) => {
      const goalElement = (event.target as Element).closest("[data-fast-goal]");
      if (goalElement) elementTracker.trackGoalClick(goalElement);
      elementTracker.trackExternalLink((event.target as Element).closest("a"));
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        const goalElement = (event.target as Element).closest(
          "[data-fast-goal]"
        );
        if (goalElement) elementTracker.trackGoalClick(goalElement);
        elementTracker.trackExternalLink(
          (event.target as Element).closest("a")
        );
      }
    });
  };

  // Initialize scroll tracking
  const initScrollTracking = (): void => {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", () =>
        initializeScrollTracking(elementTracker.trackScrollElement)
      );
    } else {
      initializeScrollTracking(elementTracker.trackScrollElement);
    }
  };

  // Pageview scheduling
  let pageviewTimeout: number | null = null;
  const schedulePageview = (): void => {
    if (pageviewTimeout) clearTimeout(pageviewTimeout);
    pageviewTimeout = window.setTimeout(triggerPageview, 100);
  };

  const triggerPageview = (): void => {
    pageviewState = eventTracker.trackPageview(() => {}, pageviewState);

    // Auto-detect payments
    const paymentDetector = createPaymentDetector(eventTracker.trackPayment);
    paymentDetector.detectStripePayment();
    paymentDetector.detectPolarPayment();
    paymentDetector.detectLemonSqueezyPayment();
  };

  // Initial setup
  setupEventListeners();
  initScrollTracking();
  setupHistoryTracking(schedulePageview);

  // Initial pageview
  triggerPageview();

  return { datafast };
}
