function dataFast() {
  "use strict";

  const currentScript = document.currentScript,
    dataPrefix = "data-",
    getScriptAttribute = currentScript.getAttribute.bind(currentScript);

  function isLocalhost(hostname) {
    if (!hostname) return false;
    const lowerHostname = hostname.toLowerCase();
    return (
      !!["localhost", "127.0.0.1", "::1"].includes(lowerHostname) ||
      !!/^127(\.[0-9]+){0,3}$/.test(lowerHostname) ||
      !!/^(\[)?::1?\]?$/.test(lowerHostname) ||
      !(
        !lowerHostname.endsWith(".local") &&
        !lowerHostname.endsWith(".localhost")
      )
    );
  }

  function isBot() {
    try {
      if (
        window.navigator.webdriver === true ||
        window.callPhantom ||
        window._phantom ||
        window.__nightmare
      )
        return true;

      if (
        !window.navigator ||
        !window.location ||
        !window.document ||
        typeof window.navigator !== "object" ||
        typeof window.location !== "object" ||
        typeof window.document !== "object"
      )
        return true;

      const navigator = window.navigator;
      if (
        !navigator.userAgent ||
        navigator.userAgent === "" ||
        navigator.userAgent === "undefined" ||
        navigator.userAgent.length < 5
      )
        return true;

      const userAgent = navigator.userAgent.toLowerCase();
      if (
        userAgent.includes("headlesschrome") ||
        userAgent.includes("phantomjs") ||
        userAgent.includes("selenium") ||
        userAgent.includes("webdriver") ||
        userAgent.includes("puppeteer") ||
        userAgent.includes("playwright")
      )
        return true;

      const botMarkers = [
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

      for (const marker of botMarkers) {
        if (window[marker] !== undefined) return true;
      }

      if (
        document.documentElement &&
        (document.documentElement.getAttribute("webdriver") ||
          document.documentElement.getAttribute("selenium") ||
          document.documentElement.getAttribute("driver"))
      )
        return true;

      if (
        userAgent.includes("python") ||
        userAgent.includes("curl") ||
        userAgent.includes("wget") ||
        userAgent.includes("java/") ||
        userAgent.includes("go-http") ||
        userAgent.includes("node.js") ||
        userAgent.includes("axios") ||
        userAgent.includes("postman")
      )
        return true;
    } catch (error) {
      return false;
    }
    return false;
  }

  function setCookie(name, value, daysToExpire) {
    let expires = "";
    if (daysToExpire) {
      const expirationDate = new Date();
      expirationDate.setTime(
        expirationDate.getTime() + 24 * daysToExpire * 60 * 60 * 1000
      );
      expires = "; expires=" + expirationDate.toUTCString();
    }
    let cookieString = name + "=" + (value || "") + expires + "; path=/";

    if (
      trackingDomain &&
      !isLocalhost(window.location.hostname) &&
      window.location.protocol !== "file:"
    ) {
      cookieString += "; domain=." + trackingDomain.replace(/^\./, "");
    }
    document.cookie = cookieString;
  }

  function getCookie(name) {
    const nameEQ = name + "=";
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
      let cookie = cookies[i];
      while (cookie.charAt(0) === " ") {
        cookie = cookie.substring(1, cookie.length);
      }
      if (cookie.indexOf(nameEQ) === 0) {
        return cookie.substring(nameEQ.length, cookie.length);
      }
    }
    return null;
  }

  function getOrCreateVisitorId() {
    let visitorId = getCookie("datafast_visitor_id");
    if (!visitorId) {
      visitorId = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
        /[xy]/g,
        function (char) {
          const randomValue = (16 * Math.random()) | 0;
          return (char === "x" ? randomValue : (randomValue & 3) | 8).toString(
            16
          );
        }
      );
      setCookie("datafast_visitor_id", visitorId, 365);
    }
    return visitorId;
  }

  function getOrCreateSessionId() {
    let sessionId = getCookie("datafast_session_id");
    if (!sessionId) {
      sessionId = "sxxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
        /[xy]/g,
        function (char) {
          const randomValue = (16 * Math.random()) | 0;
          return (char === "x" ? randomValue : (randomValue & 3) | 8).toString(
            16
          );
        }
      );
      setCookie("datafast_session_id", sessionId, 1 / 48); // 30 minutes
    }
    return sessionId;
  }

  // Process queued calls
  let queuedCalls = [];
  if (
    window.datafast &&
    window.datafast.q &&
    Array.isArray(window.datafast.q)
  ) {
    queuedCalls = window.datafast.q.map((call) => Array.from(call));
  }

  let trackingEnabled = true;
  let disabledReason = "";

  // Check for bots
  if (trackingEnabled && isBot()) {
    trackingEnabled = false;
    disabledReason = "Tracking disabled - bot detected";
  }

  const allowFileProtocol =
    getScriptAttribute(dataPrefix + "allow-file-protocol") === "true";
  const allowLocalhost =
    getScriptAttribute(dataPrefix + "allow-localhost") === "true";

  // Check environment restrictions
  if (trackingEnabled) {
    if (
      (isLocalhost(window.location.hostname) && !allowLocalhost) ||
      (window.location.protocol === "file:" && !allowFileProtocol)
    ) {
      trackingEnabled = false;
      disabledReason =
        window.location.protocol === "file:"
          ? "Tracking disabled on file protocol (use data-allow-file-protocol='true' to enable)"
          : "Tracking disabled on localhost (use data-allow-localhost='true' to enable)";
    }
  }

  const debugMode = getScriptAttribute(dataPrefix + "debug") === "true";

  // Disable in iframes (unless debug mode)
  if (trackingEnabled && window !== window.parent && !debugMode) {
    trackingEnabled = false;
    disabledReason = "Tracking disabled inside an iframe";
  }

  const websiteId = getScriptAttribute(dataPrefix + "website-id");
  const trackingDomain = getScriptAttribute(dataPrefix + "domain");

  // Validate required configuration
  if (trackingEnabled && (!websiteId || !trackingDomain)) {
    trackingEnabled = false;
    disabledReason = "Missing website ID or domain";
  }

  const isSelfHosted = !currentScript.src.includes("datafa.st");
  const apiBaseUrl =
    getScriptAttribute(dataPrefix + "api-url") || window.location.origin;
  const apiEndpoint = isSelfHosted
    ? new URL("/api/events", apiBaseUrl).href
    : "https://datafa.st/api/events";

  function collectBaseData() {
    const currentUrl = window.location.href;
    if (!currentUrl) {
      console.warn(
        "DataFast: Unable to collect href. This may indicate incorrect script implementation or browser issues."
      );
      return;
    }

    const url = new URL(currentUrl);
    const adClickIds = {};

    // Collect various advertising click IDs
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

    Object.entries(clickIdParams).forEach(([key, value]) => {
      if (value) adClickIds[key] = value;
    });

    return {
      websiteId: websiteId,
      domain: trackingDomain,
      href: currentUrl,
      referrer: document.referrer || null,
      viewport: { width: window.innerWidth, height: window.innerHeight },
      visitorId: getOrCreateVisitorId(),
      sessionId: getOrCreateSessionId(),
      adClickIds: Object.keys(adClickIds).length > 0 ? adClickIds : undefined,
    };
  }

  function sendEvent(eventData, callback) {
    if (localStorage.getItem("datafast_ignore") === "true") {
      console.log("DataFast: Tracking disabled via localStorage flag");
      if (callback) callback({ status: 200 });
      return;
    }

    if (isBot()) {
      console.log("DataFast: Bot detected, not sending data");
      if (callback) callback({ status: 200 });
      return;
    }

    const xhr = new XMLHttpRequest();
    xhr.open("POST", apiEndpoint, true);
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onreadystatechange = function () {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status === 200) {
          console.log("Event data sent successfully");
          // Refresh session cookie
          setCookie("datafast_session_id", getOrCreateSessionId(), 1 / 48);
        } else {
          console.error("Error sending event data:", xhr.status);
        }
        if (callback) callback({ status: xhr.status });
      }
    };

    xhr.send(JSON.stringify(eventData));
  }

  let lastPageviewTime = 0;
  let lastPageviewUrl = "";

  function trackPageview(callback) {
    if (!trackingEnabled) {
      if (callback) callback({ status: 200 });
      return;
    }

    const currentTime = Date.now();
    const currentUrl = window.location.href;

    // Throttle pageviews to once per minute per URL
    if (
      currentUrl === lastPageviewUrl &&
      currentTime - lastPageviewTime < 60000
    ) {
      console.log("DataFast: Pageview throttled - too recent");
      if (callback) callback({ status: 200 });
      return;
    }

    lastPageviewTime = currentTime;
    lastPageviewUrl = currentUrl;

    // Store pageview state in session storage
    try {
      sessionStorage.setItem(
        "datafast_pageview_state",
        JSON.stringify({ time: currentTime, url: currentUrl })
      );
    } catch (error) {}

    const baseData = collectBaseData();
    baseData.type = "pageview";
    sendEvent(baseData, callback);
  }

  function trackPayment(paymentProvider, sessionId, callback) {
    if (!trackingEnabled) {
      if (callback) callback({ status: 200 });
      return;
    }

    const baseData = collectBaseData();
    baseData.type = "payment";

    switch (paymentProvider) {
      case "stripe":
        baseData.extraData = { stripe_session_id: sessionId };
        break;
      case "lemonsqueezy":
        baseData.extraData = { lemonsqueezy_order_id: sessionId };
        break;
      case "polar":
        baseData.extraData = { polar_checkout_id: sessionId };
        break;
    }

    sendEvent(baseData, callback);
  }

  function trackEvent(eventType, extraData, callback) {
    if (!trackingEnabled) {
      if (callback) callback({ status: 200 });
      return;
    }

    const baseData = collectBaseData();
    baseData.type = eventType;
    baseData.extraData = extraData;
    sendEvent(baseData, callback);
  }

  function datafast(eventName, eventData) {
    if (!trackingEnabled) {
      console.log(`DataFast: Event '${eventName}' ignored - ${disabledReason}`);
      return;
    }

    if (!eventName) {
      console.warn("DataFast: Missing event_name for custom event");
      return;
    }

    if (eventName === "payment" && !eventData?.email) {
      console.warn("DataFast: Missing email for payment event");
      return;
    }

    if (eventName === "identify" && !eventData?.user_id) {
      console.warn("DataFast: Missing user_id for identify event");
      return;
    }

    switch (eventName) {
      case "payment":
        trackEvent("payment", { email: eventData.email });
        break;

      case "identify":
        trackEvent("identify", {
          user_id: eventData.user_id,
          name: eventData.name || "",
          ...eventData,
        });
        break;

      default:
        const validatedData = validateCustomEventData(eventData || {});
        if (validatedData === null) {
          console.error(
            "DataFast: Custom event rejected due to validation errors"
          );
          return;
        }
        trackEvent("custom", { eventName: eventName, ...validatedData });
    }
  }

  function validateCustomEventData(customData) {
    if (
      !customData ||
      typeof customData !== "object" ||
      Array.isArray(customData)
    ) {
      console.warn("DataFast: customData must be a non-null object");
      return {};
    }

    const validatedData = {};
    let paramCount = 0;

    function sanitizeValue(value) {
      if (value == null) return "";
      let stringValue = String(value);

      // Truncate long values
      if (stringValue.length > 255) {
        stringValue = stringValue.substring(0, 255);
      }

      // Sanitize potentially dangerous content
      stringValue = stringValue
        .replace(/[<>'"&]/g, "")
        .replace(/javascript:/gi, "")
        .replace(/on\w+=/gi, "")
        .replace(/data:/gi, "")
        .replace(/vbscript:/gi, "")
        .trim();

      return stringValue;
    }

    for (const [key, value] of Object.entries(customData)) {
      if (key === "eventName") {
        validatedData[key] = sanitizeValue(value);
        continue;
      }

      // Limit number of custom parameters
      if (paramCount >= 10) {
        console.error("DataFast: Maximum 10 custom parameters allowed");
        return null;
      }

      // Validate parameter name
      if (
        typeof key !== "string" ||
        key.length === 0 ||
        key.length > 32 ||
        !/^[a-z0-9_-]+$/.test(key.toLowerCase())
      ) {
        console.error(
          `DataFast: Invalid property name "${key}". Use only lowercase letters, numbers, underscores, and hyphens. Max 32 characters.`
        );
        return null;
      }

      const sanitizedKey = key.toLowerCase();
      const sanitizedValue = sanitizeValue(value);

      validatedData[sanitizedKey] = sanitizedValue;
      paramCount++;
    }

    return validatedData;
  }

  // Initialize the global function and process queued calls
  window.datafast = datafast;
  if (window.datafast.q) delete window.datafast.q;

  (function processQueuedCalls() {
    while (queuedCalls.length > 0) {
      const call = queuedCalls.shift();
      if (Array.isArray(call) && call.length > 0) {
        try {
          datafast.apply(null, call);
        } catch (error) {
          console.error("DataFast: Error processing queued call:", error, call);
        }
      }
    }
  })();

  // Exit if tracking is disabled
  if (!trackingEnabled) {
    console.warn(`DataFast: ${disabledReason}`);
    return;
  }

  function trackExternalLink(linkElement) {
    if (!linkElement || !linkElement.href) return;

    function isExternalUrl(url) {
      try {
        const parsedUrl = new URL(url, window.location.origin);
        if (parsedUrl.protocol !== "http:" && parsedUrl.protocol !== "https:")
          return false;
        return window.location.hostname !== parsedUrl.hostname;
      } catch {
        return false;
      }
    }

    if (isExternalUrl(linkElement.href)) {
      trackEvent("external_link", {
        url: linkElement.href,
        text: linkElement.textContent.trim(),
      });
    }
  }

  function trackGoalClick(element) {
    const goalName = element.getAttribute("data-fast-goal");
    if (goalName && goalName.trim()) {
      const goalData = { eventName: goalName.trim() };

      // Collect additional goal attributes
      for (const attribute of element.attributes) {
        if (
          attribute.name.startsWith("data-fast-goal-") &&
          attribute.name !== "data-fast-goal"
        ) {
          const paramName = attribute.name.substring(15);
          if (paramName) {
            goalData[paramName.replace(/-/g, "_")] = attribute.value;
          }
        }
      }

      const validatedData = validateCustomEventData(goalData);
      if (validatedData !== null) {
        trackEvent("custom", validatedData);
      }
    }
  }

  function trackScrollElement(element, observer) {
    const scrollEventName = element.getAttribute("data-fast-scroll");
    if (!scrollEventName || !scrollEventName.trim()) return;

    const delayAttribute = element.getAttribute("data-fast-scroll-delay");
    let delayMs = 0;

    if (delayAttribute !== null) {
      const parsedDelay = parseInt(delayAttribute, 10);
      if (!isNaN(parsedDelay) && parsedDelay >= 0) {
        delayMs = parsedDelay;
      }
    }

    const triggerTracking = () => {
      const rect = element.getBoundingClientRect();
      if (!(rect.bottom > 0 && rect.top < window.innerHeight)) {
        observer.unobserve(element);
        return;
      }

      const scrollPercentage = (function calculateScrollPercentage() {
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

      const thresholdAttribute = element.getAttribute(
        "data-fast-scroll-threshold"
      );
      let threshold = 0.5;

      if (thresholdAttribute !== null) {
        const parsedThreshold = parseFloat(thresholdAttribute);
        if (
          !isNaN(parsedThreshold) &&
          parsedThreshold >= 0 &&
          parsedThreshold <= 1
        ) {
          threshold = parsedThreshold;
        }
      }

      const scrollData = {
        eventName: scrollEventName.trim(),
        scroll_percentage: scrollPercentage.toString(),
        threshold: threshold.toString(),
        delay: delayMs.toString(),
      };

      // Collect additional scroll attributes
      for (const attribute of element.attributes) {
        if (
          attribute.name.startsWith("data-fast-scroll-") &&
          attribute.name !== "data-fast-scroll" &&
          attribute.name !== "data-fast-scroll-threshold" &&
          attribute.name !== "data-fast-scroll-delay"
        ) {
          const paramName = attribute.name.substring(17);
          if (paramName) {
            scrollData[paramName.replace(/-/g, "_")] = attribute.value;
          }
        }
      }

      const validatedData = validateCustomEventData(scrollData);
      if (validatedData !== null) {
        trackEvent("custom", validatedData);
      }

      observer.unobserve(element);
    };

    delayMs > 0 ? setTimeout(triggerTracking, delayMs) : triggerTracking();
  }

  function initializeScrollTracking() {
    if (!window.IntersectionObserver) {
      console.warn(
        "DataFast: Intersection Observer not supported, scroll tracking disabled"
      );
      return;
    }

    const scrollElements = document.querySelectorAll("[data-fast-scroll]");
    if (scrollElements.length === 0) return;

    const thresholdGroups = new Map();

    scrollElements.forEach(function (element) {
      const thresholdAttribute = element.getAttribute(
        "data-fast-scroll-threshold"
      );
      let threshold = 0.5;

      if (thresholdAttribute !== null) {
        const parsedThreshold = parseFloat(thresholdAttribute);
        if (
          !isNaN(parsedThreshold) &&
          parsedThreshold >= 0 &&
          parsedThreshold <= 1
        ) {
          threshold = parsedThreshold;
        } else {
          console.warn(
            `DataFast: Invalid threshold value "${thresholdAttribute}" for element. Using default 0.5. Threshold must be between 0 and 1.`
          );
        }
      }

      if (!thresholdGroups.has(threshold)) {
        thresholdGroups.set(threshold, []);
      }
      thresholdGroups.get(threshold).push(element);
    });

    thresholdGroups.forEach(function (elements, threshold) {
      const observer = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              trackScrollElement(entry.target, observer);
            }
          });
        },
        { root: null, rootMargin: "0px", threshold: threshold }
      );

      elements.forEach(function (element) {
        observer.observe(element);
      });
    });
  }

  // Restore pageview state from session storage
  (function restorePageviewState() {
    try {
      const savedState = sessionStorage.getItem("datafast_pageview_state");
      if (savedState) {
        const { time, url } = JSON.parse(savedState);
        lastPageviewTime = time || 0;
        lastPageviewUrl = url || "";
      }
    } catch (error) {
      lastPageviewTime = 0;
      lastPageviewUrl = "";
    }
  })();

  // Event listeners for click and keyboard interactions
  document.addEventListener("click", function (event) {
    const goalElement = event.target.closest("[data-fast-goal]");
    if (goalElement) trackGoalClick(goalElement);

    trackExternalLink(event.target.closest("a"));
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Enter" || event.key === " ") {
      const goalElement = event.target.closest("[data-fast-goal]");
      if (goalElement) trackGoalClick(goalElement);

      trackExternalLink(event.target.closest("a"));
    }
  });

  // Initialize scroll tracking
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initializeScrollTracking);
  } else {
    initializeScrollTracking();
  }

  let pageviewTimeout = null;

  function triggerPageview() {
    trackPageview();

    // Auto-detect payment providers from URL parameters
    (function detectStripePayment() {
      try {
        const sessionId = new URL(window.location.href).searchParams.get(
          "session_id"
        );
        if (
          sessionId &&
          sessionId.startsWith("cs_") &&
          !sessionStorage.getItem("datafast_stripe_payment_sent_" + sessionId)
        ) {
          trackPayment("stripe", sessionId);
          sessionStorage.setItem(
            "datafast_stripe_payment_sent_" + sessionId,
            "1"
          );
        }
      } catch (error) {
        console.error("Error auto detecting Stripe session ID:", error);
      }
    })();

    (function detectPolarPayment() {
      try {
        const checkoutId = new URL(window.location.href).searchParams.get(
          "checkout_id"
        );
        if (
          checkoutId &&
          !sessionStorage.getItem("datafast_polar_payment_sent_" + checkoutId)
        ) {
          trackPayment("polar", checkoutId);
          sessionStorage.setItem(
            "datafast_polar_payment_sent_" + checkoutId,
            "1"
          );
        }
      } catch (error) {
        console.error("Error auto detecting Polar checkout ID:", error);
      }
    })();

    (function detectLemonSqueezyPayment() {
      try {
        const orderId = new URL(window.location.href).searchParams.get(
          "order_id"
        );
        if (
          orderId &&
          !sessionStorage.getItem(
            "datafast_lemonsqueezy_payment_sent_" + orderId
          )
        ) {
          trackPayment("lemonsqueezy", orderId);
          sessionStorage.setItem(
            "datafast_lemonsqueezy_payment_sent_" + orderId,
            "1"
          );
        }
      } catch (error) {
        console.error("Error auto detecting Lemonsqueezy order ID:", error);
      }
    })();
  }

  function schedulePageview() {
    if (pageviewTimeout) clearTimeout(pageviewTimeout);
    pageviewTimeout = setTimeout(triggerPageview, 100);
  }

  // Initial pageview
  triggerPageview();

  // Track history changes
  let currentPathname = window.location.pathname;
  const originalPushState = window.history.pushState;

  window.history.pushState = function () {
    originalPushState.apply(this, arguments);
    if (currentPathname !== window.location.pathname) {
      currentPathname = window.location.pathname;
      schedulePageview();
    }
  };

  window.addEventListener("popstate", function () {
    if (currentPathname !== window.location.pathname) {
      currentPathname = window.location.pathname;
      schedulePageview();
    }
  });
}
