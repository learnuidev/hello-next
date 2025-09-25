function dataFast() {
  "use strict";

  // ========== CONFIGURATION & INITIALIZATION ==========
  const getConfig = () => {
    const currentScript = document.currentScript;
    const dataPrefix = "data-";
    const getScriptAttribute = currentScript.getAttribute.bind(currentScript);

    return {
      currentScript,
      dataPrefix,
      getScriptAttribute,
    };
  };

  const { currentScript, dataPrefix, getScriptAttribute } = getConfig();

  // ========== ENVIRONMENT DETECTION ==========
  const isLocalhost = (hostname) => {
    if (!hostname) return false;

    const lowerHostname = hostname.toLowerCase();
    const localhostPatterns = [
      () => ["localhost", "127.0.0.1", "::1"].includes(lowerHostname),
      () => /^127(\.[0-9]+){0,3}$/.test(lowerHostname),
      () => /^(\[)?::1?\]?$/.test(lowerHostname),
      () =>
        !!(
          lowerHostname.endsWith(".local") ||
          lowerHostname.endsWith(".localhost")
        ),
    ];

    return localhostPatterns.some((pattern) => pattern());
  };

  const detectBotMarkers = () => [
    "__webdriver_evaluate",
    "__selenium_evaluate",
    "__webdriver_script_function",
    "__webdriver_unwrapped",
    "__fxdriver_evaluate",
    "__driver_evaluate",
    "_Selenium_IDE_Recorder",
    "_selenium",
    "calledSelenium",
    "$cdc_asdjflasutopfhvcZLmcfl_",
  ];

  const isBotUserAgent = (userAgent) => {
    const botPatterns = [
      "headlesschrome",
      "phantomjs",
      "selenium",
      "webdriver",
      "puppeteer",
      "playwright",
      "python",
      "curl",
      "wget",
      "java/",
      "go-http",
      "node.js",
      "axios",
      "postman",
    ];

    return botPatterns.some((pattern) => userAgent.includes(pattern));
  };

  const isBot = () => {
    try {
      const { navigator, location, document } = window;

      // Check for automation tools
      if (
        navigator.webdriver === true ||
        window.callPhantom ||
        window._phantom ||
        window.__nightmare
      ) {
        return true;
      }

      // Check for invalid environment objects
      if (
        !navigator ||
        !location ||
        !document ||
        typeof navigator !== "object" ||
        typeof location !== "object" ||
        typeof document !== "object"
      ) {
        return true;
      }

      // Check user agent validity
      if (
        !navigator.userAgent ||
        navigator.userAgent === "" ||
        navigator.userAgent === "undefined" ||
        navigator.userAgent.length < 5
      ) {
        return true;
      }

      const userAgent = navigator.userAgent.toLowerCase();

      if (isBotUserAgent(userAgent)) {
        return true;
      }

      // Check for bot markers in window object
      if (detectBotMarkers().some((marker) => window[marker] !== undefined)) {
        return true;
      }

      // Check for automation attributes in document
      if (
        document.documentElement &&
        (document.documentElement.getAttribute("webdriver") ||
          document.documentElement.getAttribute("selenium") ||
          document.documentElement.getAttribute("driver"))
      ) {
        return true;
      }
    } catch (error) {
      return false;
    }
    return false;
  };

  // ========== COOKIE MANAGEMENT ==========
  const parseCookies = () =>
    document.cookie.split(";").map((cookie) => cookie.trim());

  const findCookie = (cookies, name) => {
    const nameEQ = name + "=";
    const cookie = cookies.find((c) => c.indexOf(nameEQ) === 0);
    return cookie ? cookie.substring(nameEQ.length) : null;
  };

  const getCookie = (name) => findCookie(parseCookies(), name);

  const buildCookieString = (name, value, expires, trackingDomain) => {
    let cookieString = `${name}=${value || ""}${expires}; path=/`;

    if (
      trackingDomain &&
      !isLocalhost(window.location.hostname) &&
      window.location.protocol !== "file:"
    ) {
      cookieString += `; domain=.${trackingDomain.replace(/^\./, "")}`;
    }

    return cookieString;
  };

  const setCookie = (name, value, daysToExpire, trackingDomain) => {
    const expires = daysToExpire
      ? `; expires=${new Date(Date.now() + daysToExpire * 24 * 60 * 60 * 1000).toUTCString()}`
      : "";

    document.cookie = buildCookieString(name, value, expires, trackingDomain);
  };

  // ========== ID GENERATION ==========
  const generateUUID = (template) =>
    template.replace(/[xy]/g, (char) => {
      const randomValue = (16 * Math.random()) | 0;
      return (char === "x" ? randomValue : (randomValue & 3) | 8).toString(16);
    });

  const createIdGenerator = (cookieName, template, expirationDays) => () => {
    let id = getCookie(cookieName);
    if (!id) {
      id = generateUUID(template);
      setCookie(cookieName, id, expirationDays);
    }
    return id;
  };

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

  // ========== TRACKING CONFIGURATION ==========
  const getTrackingConfig = () => {
    const allowFileProtocol =
      getScriptAttribute(`${dataPrefix}allow-file-protocol`) === "true";
    const allowLocalhost =
      getScriptAttribute(`${dataPrefix}allow-localhost`) === "true";
    const debugMode = getScriptAttribute(`${dataPrefix}debug`) === "true";
    const websiteId = getScriptAttribute(`${dataPrefix}website-id`);
    const trackingDomain = getScriptAttribute(`${dataPrefix}domain`);

    const isSelfHosted = !currentScript.src.includes("datafa.st");
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

  const shouldEnableTracking = (config) => {
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

  // ========== DATA COLLECTION ==========
  const collectAdClickIds = (url) => {
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

  const collectBaseData = (websiteId, trackingDomain) => {
    const currentUrl = window.location.href;
    if (!currentUrl) {
      console.warn(
        "DataFast: Unable to collect href. This may indicate incorrect script implementation or browser issues."
      );
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
  const sanitizeValue = (value) => {
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

  const validatePropertyName = (key) =>
    typeof key === "string" &&
    key.length > 0 &&
    key.length <= 32 &&
    /^[a-z0-9_-]+$/.test(key.toLowerCase());

  const validateCustomEventData = (customData) => {
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

    const validatedData = entries.reduce((acc, [key, value], index) => {
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
    }, {});

    return validatedData === null ? null : validatedData;
  };

  // ========== EVENT SENDING ==========
  const sendEvent = (eventData, callback, apiEndpoint, trackingDomain) => {
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
    trackingEnabled,
    collectBaseData,
    sendEvent,
    apiEndpoint,
    trackingDomain
  ) => ({
    trackPageview: (callback, pageviewState = { lastTime: 0, lastUrl: "" }) => {
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
      } catch (error) {}

      return { lastTime: currentTime, lastUrl: currentUrl };
    },

    trackPayment: (paymentProvider, sessionId, callback) => {
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

      const providerData = {
        stripe: { stripe_session_id: sessionId },
        lemonsqueezy: { lemonsqueezy_order_id: sessionId },
        polar: { polar_checkout_id: sessionId },
      };

      baseData.extraData = providerData[paymentProvider] || {};
      sendEvent(baseData, callback, apiEndpoint, trackingDomain);
    },

    trackEvent: (eventType, extraData, callback) => {
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
  const createElementTracker = (trackEvent, validateCustomEventData) => ({
    trackExternalLink: (linkElement) => {
      if (!linkElement?.href) return;

      const isExternalUrl = (url) => {
        try {
          const parsedUrl = new URL(url, window.location.origin);
          if (!["http:", "https:"].includes(parsedUrl.protocol)) return false;
          return window.location.hostname !== parsedUrl.hostname;
        } catch {
          return false;
        }
      };

      if (isExternalUrl(linkElement.href)) {
        trackEvent("external_link", {
          url: linkElement.href,
          text: linkElement.textContent.trim(),
        });
      }
    },

    trackGoalClick: (element) => {
      const goalName = element.getAttribute("data-fast-goal")?.trim();
      if (!goalName) return;

      const goalData = { eventName: goalName };

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

    trackScrollElement: (element, observer) => {
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

      const triggerTracking = () => {
        const rect = element.getBoundingClientRect();
        if (!(rect.bottom > 0 && rect.top < window.innerHeight)) {
          observer.unobserve(element);
          return;
        }

        const scrollPercentage = (() => {
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

        const scrollData = {
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
  const initializeScrollTracking = (trackScrollElement) => {
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
      groups.get(threshold).push(element);
      return groups;
    }, new Map());

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
  const createPaymentDetector = (trackPayment) => ({
    detectStripePayment: () => {
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

    detectPolarPayment: () => {
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

    detectLemonSqueezyPayment: () => {
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
  const setupHistoryTracking = (schedulePageview) => {
    let currentPathname = window.location.pathname;
    const originalPushState = window.history.pushState;

    window.history.pushState = function () {
      originalPushState.apply(this, arguments);
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
  const initializeDataFast = () => {
    const config = getTrackingConfig();
    const trackingStatus = shouldEnableTracking(config);
    const { enabled: trackingEnabled, reason: disabledReason } = trackingStatus;

    // Process queued calls
    const queuedCalls =
      window.datafast?.q && Array.isArray(window.datafast.q)
        ? window.datafast.q.map((call) => Array.from(call))
        : [];

    // Restore pageview state
    const restorePageviewState = () => {
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
    const baseDataCollector = () =>
      collectBaseData(config.websiteId, config.trackingDomain);
    const eventSender = (eventData, callback) =>
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
    const datafast = (eventName, eventData) => {
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

      const eventHandlers = {
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
    window.datafast = datafast;
    delete window.datafast?.q;

    // Process queued calls
    queuedCalls.forEach((call) => {
      if (Array.isArray(call) && call.length > 0) {
        try {
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
    const setupEventListeners = () => {
      document.addEventListener("click", (event) => {
        const goalElement = event.target.closest("[data-fast-goal]");
        if (goalElement) elementTracker.trackGoalClick(goalElement);
        elementTracker.trackExternalLink(event.target.closest("a"));
      });

      document.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
          const goalElement = event.target.closest("[data-fast-goal]");
          if (goalElement) elementTracker.trackGoalClick(goalElement);
          elementTracker.trackExternalLink(event.target.closest("a"));
        }
      });
    };

    // Initialize scroll tracking
    const initScrollTracking = () => {
      if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", () =>
          initializeScrollTracking(elementTracker.trackScrollElement)
        );
      } else {
        initializeScrollTracking(elementTracker.trackScrollElement);
      }
    };

    // Pageview scheduling
    let pageviewTimeout = null;
    const schedulePageview = () => {
      if (pageviewTimeout) clearTimeout(pageviewTimeout);
      pageviewTimeout = setTimeout(triggerPageview, 100);
    };

    const triggerPageview = () => {
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
