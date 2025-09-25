// ========== TYPE DEFINITIONS ==========

import {
  AdClickIds,
  BaseData,
  EventCallback,
  PageviewState,
  PaymentProvider,
  PaymentProviderData,
  TrackingConfig,
  TrackingStatus,
} from "./datafast.types";
import { setCookie } from "./utils/cookie-management/set-cookie";
import { isBot } from "./utils/environment-detection/is-bot";
import { isLocalhost } from "./utils/environment-detection/is-local-host";
import { getConfig } from "./utils/get-config";
import { createIdGenerator } from "./utils/id-generation/create-id-generator";
import { getTrackingConfig } from "./utils/tracking-configuration/get-tracking-config";
import { shouldEnableTracking } from "./utils/tracking-configuration/should-enable-tracking";

function dataFast(): void {
  "use strict";

  // ========== ID GENERATION ==========
  const getOrCreateVisitorId = createIdGenerator(
    "datafast_visitor_id",
    "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx",
    365
  );

  const getOrCreateSessionId = createIdGenerator(
    "datafast_session_id",
    "sxxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx",
    1 / 48
  );

  // ========== DATA COLLECTION ==========
  const collectAdClickIds = (url: URL): AdClickIds => {
    const clickIdParams = {
      fbclid: url.searchParams.get("fbclid"),
      gclid: url.searchParams.get("gclid"),
      gclsrc: url.searchParams.get("gclsrc"),
      wbraid: url.searchParams.get("wbraid"),
      gbraid: url.searchParams.get("gbraid"),
      li_fat_id: url.searchParams.get("li_fat_id"),
      msclkid: url.searchParams.get("msclkid"),
      ttclid: url.searchParams.get("ttclid"),
      twclid: url.searchParams.get("twclid"),
    };

    return Object.entries(clickIdParams)
      .filter(([_, value]) => value)
      .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});
  };

  const collectBaseData = (
    websiteId: string | null,
    trackingDomain: string | null
  ): BaseData | null => {
    const currentUrl = window.location.href;
    if (!currentUrl) {
      console.warn(
        "DataFast: Unable to collect href. This may indicate incorrect script implementation or browser issues."
      );
      return null;
    }

    if (!websiteId || !trackingDomain) {
      return null;
    }

    const url = new URL(currentUrl);
    const adClickIds = collectAdClickIds(url);

    return {
      websiteId,
      domain: trackingDomain,
      href: currentUrl,
      referrer: document.referrer || null,
      viewport: { width: window.innerWidth, height: window.innerHeight },
      visitorId: getOrCreateVisitorId(),
      sessionId: getOrCreateSessionId(),
      adClickIds: Object.keys(adClickIds).length > 0 ? adClickIds : undefined,
    };
  };

  // ========== EVENT VALIDATION ==========
  const sanitizeValue = (value: any): string => {
    if (value == null) return "";

    return String(value)
      .substring(0, 255)
      .replace(/[<>'"&]/g, "")
      .replace(/javascript:/gi, "")
      .replace(/on\w+=/gi, "")
      .replace(/data:/gi, "")
      .replace(/vbscript:/gi, "")
      .trim();
  };

  const validatePropertyName = (key: string): boolean =>
    typeof key === "string" &&
    key.length > 0 &&
    key.length <= 32 &&
    /^[a-z0-9_-]+$/.test(key.toLowerCase());

  const validateCustomEventData = (
    customData: any
  ): Record<string, string> | null => {
    if (
      !customData ||
      typeof customData !== "object" ||
      Array.isArray(customData)
    ) {
      console.warn("DataFast: customData must be a non-null object");
      return {};
    }

    const entries = Object.entries(customData);
    if (entries.length > 10) {
      console.error("DataFast: Maximum 10 custom parameters allowed");
      return null;
    }

    const validatedData = entries.reduce(
      (acc: Record<string, string> | null, [key, value], index) => {
        if (acc === null) return null;

        if (key === "eventName") {
          acc[key] = sanitizeValue(value);
          return acc;
        }

        if (!validatePropertyName(key)) {
          console.error(
            `DataFast: Invalid property name "${key}". Use only lowercase letters, numbers, underscores, and hyphens. Max 32 characters.`
          );
          return null;
        }

        acc[key.toLowerCase()] = sanitizeValue(value);
        return acc;
      },
      {}
    );

    return validatedData;
  };

  // ========== EVENT SENDING ==========
  const sendEvent = (
    eventData: BaseData,
    callback: EventCallback | undefined,
    apiEndpoint: string,
    trackingDomain: string | null
  ): void => {
    if (localStorage.getItem("datafast_ignore") === "true") {
      console.log("DataFast: Tracking disabled via localStorage flag");
      callback?.({ status: 200 });
      return;
    }

    if (isBot()) {
      console.log("DataFast: Bot detected, not sending data");
      callback?.({ status: 200 });
      return;
    }

    const xhr = new XMLHttpRequest();
    xhr.open("POST", apiEndpoint, true);
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onreadystatechange = function () {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status === 200) {
          console.log("Event data sent successfully");
          setCookie(
            "datafast_session_id",
            getOrCreateSessionId(),
            1 / 48,
            trackingDomain
          );
        } else {
          console.error("Error sending event data:", xhr.status);
        }
        callback?.({ status: xhr.status });
      }
    };

    xhr.send(JSON.stringify(eventData));
  };

  // ========== SPECIFIC EVENT TYPES ==========
  const createEventTracker = (
    trackingEnabled: boolean,
    collectBaseData: () => BaseData | null,
    sendEvent: (
      eventData: BaseData,
      callback: EventCallback | undefined,
      apiEndpoint: string,
      trackingDomain: string | null
    ) => void,
    apiEndpoint: string,
    trackingDomain: string | null
  ) => ({
    trackPageview: (
      callback?: EventCallback,
      pageviewState: PageviewState = { lastTime: 0, lastUrl: "" }
    ): PageviewState => {
      if (!trackingEnabled) {
        callback?.({ status: 200 });
        return pageviewState;
      }

      const currentTime = Date.now();
      const currentUrl = window.location.href;

      // Throttle pageviews to once per minute per URL
      if (
        currentUrl === pageviewState.lastUrl &&
        currentTime - pageviewState.lastTime < 60000
      ) {
        console.log("DataFast: Pageview throttled - too recent");
        callback?.({ status: 200 });
        return pageviewState;
      }

      const baseData = collectBaseData();
      if (!baseData) {
        callback?.({ status: 200 });
        return pageviewState;
      }

      baseData.type = "pageview";
      sendEvent(baseData, callback, apiEndpoint, trackingDomain);

      // Store pageview state
      try {
        sessionStorage.setItem(
          "datafast_pageview_state",
          JSON.stringify({ time: currentTime, url: currentUrl })
        );
      } catch (error) {
        // Ignore errors
      }

      return { lastTime: currentTime, lastUrl: currentUrl };
    },

    trackPayment: (
      paymentProvider: PaymentProvider,
      sessionId: string,
      callback?: EventCallback
    ): void => {
      if (!trackingEnabled) {
        callback?.({ status: 200 });
        return;
      }

      const baseData = collectBaseData();
      if (!baseData) {
        callback?.({ status: 200 });
        return;
      }

      baseData.type = "payment";

      const providerData: PaymentProviderData = {
        stripe: { stripe_session_id: sessionId },
        lemonsqueezy: { lemonsqueezy_order_id: sessionId },
        polar: { polar_checkout_id: sessionId },
      };

      baseData.extraData = providerData[paymentProvider] || {};
      sendEvent(baseData, callback, apiEndpoint, trackingDomain);
    },

    trackEvent: (
      eventType: string,
      extraData?: Record<string, any>,
      callback?: EventCallback
    ): void => {
      if (!trackingEnabled) {
        callback?.({ status: 200 });
        return;
      }

      const baseData = collectBaseData();
      if (!baseData) {
        callback?.({ status: 200 });
        return;
      }

      baseData.type = eventType;
      baseData.extraData = extraData;
      sendEvent(baseData, callback, apiEndpoint, trackingDomain);
    },
  });

  // ========== ELEMENT TRACKING ==========
  const createElementTracker = (
    trackEvent: (
      eventType: string,
      extraData?: Record<string, any>,
      callback?: EventCallback
    ) => void,
    validateCustomEventData: (customData: any) => Record<string, string> | null
  ) => ({
    trackExternalLink: (linkElement: HTMLElement | null): void => {
      if (!linkElement || !("href" in linkElement)) return;

      const href = (linkElement as HTMLAnchorElement).href;
      if (!href) return;

      const isExternalUrl = (url: string): boolean => {
        try {
          const parsedUrl = new URL(url, window.location.origin);
          if (!["http:", "https:"].includes(parsedUrl.protocol)) return false;
          return window.location.hostname !== parsedUrl.hostname;
        } catch {
          return false;
        }
      };

      if (isExternalUrl(href)) {
        trackEvent("external_link", {
          url: href,
          text: linkElement.textContent?.trim() || "",
        });
      }
    },

    trackGoalClick: (element: Element): void => {
      const goalName = element.getAttribute("data-fast-goal")?.trim();
      if (!goalName) return;

      const goalData: Record<string, string> = { eventName: goalName };

      // Collect additional goal attributes
      Array.from(element.attributes)
        .filter(
          (attr) =>
            attr.name.startsWith("data-fast-goal-") &&
            attr.name !== "data-fast-goal"
        )
        .forEach((attr) => {
          const paramName = attr.name.substring(15).replace(/-/g, "_");
          if (paramName) goalData[paramName] = attr.value;
        });

      const validatedData = validateCustomEventData(goalData);
      if (validatedData) {
        trackEvent("custom", validatedData);
      }
    },

    trackScrollElement: (
      element: Element,
      observer: IntersectionObserver
    ): void => {
      const scrollEventName = element.getAttribute("data-fast-scroll")?.trim();
      if (!scrollEventName) return;

      const delayMs = Math.max(
        0,
        parseInt(element.getAttribute("data-fast-scroll-delay") || "0", 10)
      );
      const threshold = Math.min(
        1,
        Math.max(
          0,
          parseFloat(
            element.getAttribute("data-fast-scroll-threshold") || "0.5"
          )
        )
      );

      const triggerTracking = (): void => {
        const rect = element.getBoundingClientRect();
        if (!(rect.bottom > 0 && rect.top < window.innerHeight)) {
          observer.unobserve(element);
          return;
        }

        const scrollPercentage = ((): number => {
          const totalHeight = Math.max(
            document.body.scrollHeight,
            document.body.offsetHeight,
            document.documentElement.clientHeight,
            document.documentElement.scrollHeight,
            document.documentElement.offsetHeight
          );
          const viewportHeight = window.innerHeight;
          const currentScroll =
            window.pageYOffset || document.documentElement.scrollTop;
          const scrollableDistance = totalHeight - viewportHeight;

          return scrollableDistance <= 0
            ? 100
            : Math.min(
                100,
                Math.round((currentScroll / scrollableDistance) * 100)
              );
        })();

        const scrollData: Record<string, string> = {
          eventName: scrollEventName,
          scroll_percentage: scrollPercentage.toString(),
          threshold: threshold.toString(),
          delay: delayMs.toString(),
        };

        // Collect additional scroll attributes
        Array.from(element.attributes)
          .filter(
            (attr) =>
              attr.name.startsWith("data-fast-scroll-") &&
              ![
                "data-fast-scroll",
                "data-fast-scroll-threshold",
                "data-fast-scroll-delay",
              ].includes(attr.name)
          )
          .forEach((attr) => {
            const paramName = attr.name.substring(17).replace(/-/g, "_");
            if (paramName) scrollData[paramName] = attr.value;
          });

        const validatedData = validateCustomEventData(scrollData);
        if (validatedData) {
          trackEvent("custom", validatedData);
        }

        observer.unobserve(element);
      };

      delayMs > 0 ? setTimeout(triggerTracking, delayMs) : triggerTracking();
    },
  });

  // ========== SCROLL TRACKING INITIALIZATION ==========
  const initializeScrollTracking = (
    trackScrollElement: (
      element: Element,
      observer: IntersectionObserver
    ) => void
  ): void => {
    if (!window.IntersectionObserver) {
      console.warn(
        "DataFast: Intersection Observer not supported, scroll tracking disabled"
      );
      return;
    }

    const scrollElements = Array.from(
      document.querySelectorAll("[data-fast-scroll]")
    );
    if (scrollElements.length === 0) return;

    const thresholdGroups = scrollElements.reduce((groups, element) => {
      const threshold = Math.min(
        1,
        Math.max(
          0,
          parseFloat(
            element.getAttribute("data-fast-scroll-threshold") || "0.5"
          )
        )
      );
      if (!groups.has(threshold)) groups.set(threshold, []);
      groups.get(threshold)!.push(element);
      return groups;
    }, new Map<number, Element[]>());

    thresholdGroups.forEach((elements, threshold) => {
      const observer = new IntersectionObserver(
        (entries) =>
          entries.forEach((entry) => {
            if (entry.isIntersecting)
              trackScrollElement(entry.target, observer);
          }),
        { root: null, rootMargin: "0px", threshold }
      );

      elements.forEach((element) => observer.observe(element));
    });
  };

  // ========== PAYMENT DETECTION ==========
  const createPaymentDetector = (
    trackPayment: (
      paymentProvider: PaymentProvider,
      sessionId: string,
      callback?: EventCallback
    ) => void
  ) => ({
    detectStripePayment: (): void => {
      const sessionId = new URL(window.location.href).searchParams.get(
        "session_id"
      );
      if (
        sessionId?.startsWith("cs_") &&
        !sessionStorage.getItem(`datafast_stripe_payment_sent_${sessionId}`)
      ) {
        trackPayment("stripe", sessionId);
        sessionStorage.setItem(
          `datafast_stripe_payment_sent_${sessionId}`,
          "1"
        );
      }
    },

    detectPolarPayment: (): void => {
      const checkoutId = new URL(window.location.href).searchParams.get(
        "checkout_id"
      );
      if (
        checkoutId &&
        !sessionStorage.getItem(`datafast_polar_payment_sent_${checkoutId}`)
      ) {
        trackPayment("polar", checkoutId);
        sessionStorage.setItem(
          `datafast_polar_payment_sent_${checkoutId}`,
          "1"
        );
      }
    },

    detectLemonSqueezyPayment: (): void => {
      const orderId = new URL(window.location.href).searchParams.get(
        "order_id"
      );
      if (
        orderId &&
        !sessionStorage.getItem(`datafast_lemonsqueezy_payment_sent_${orderId}`)
      ) {
        trackPayment("lemonsqueezy", orderId);
        sessionStorage.setItem(
          `datafast_lemonsqueezy_payment_sent_${orderId}`,
          "1"
        );
      }
    },
  });

  // ========== HISTORY TRACKING ==========
  const setupHistoryTracking = (schedulePageview: () => void): void => {
    let currentPathname = window.location.pathname;
    const originalPushState = window.history.pushState;

    window.history.pushState = function (...args: any[]) {
      // @ts-ignore
      originalPushState.apply(this, args);
      if (currentPathname !== window.location.pathname) {
        currentPathname = window.location.pathname;
        schedulePageview();
      }
    };

    window.addEventListener("popstate", () => {
      if (currentPathname !== window.location.pathname) {
        currentPathname = window.location.pathname;
        schedulePageview();
      }
    });
  };

  // ========== MAIN INITIALIZATION ==========
  const initializeDataFast = (): void => {
    const config = getTrackingConfig();
    const trackingStatus = shouldEnableTracking(config);
    const { enabled: trackingEnabled, reason: disabledReason } = trackingStatus;

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
      collectBaseData(config.websiteId, config.trackingDomain);

    const eventSender = (eventData: BaseData, callback?: EventCallback): void =>
      sendEvent(eventData, callback, config.apiEndpoint, config.trackingDomain);

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
        console.log(
          `DataFast: Event '${eventName}' ignored - ${disabledReason}`
        );
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
        const goalElement = (event.target as Element).closest(
          "[data-fast-goal]"
        );
        if (goalElement) elementTracker.trackGoalClick(goalElement);
        elementTracker.trackExternalLink(
          (event.target as Element).closest("a")
        );
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
  };

  // Start initialization
  initializeDataFast();
}

// Export for module usage
if (typeof module !== "undefined" && module.exports) {
  module.exports = dataFast;
}
