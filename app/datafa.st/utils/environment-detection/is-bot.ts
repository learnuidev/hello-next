export const detectBotMarkers = (): string[] => [
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

export const isBotUserAgent = (userAgent: string): boolean => {
  const botPatterns: string[] = [
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

export const isBot = (): boolean => {
  try {
    const { navigator, location, document } = window;

    // Check for automation tools
    if (
      navigator.webdriver === true ||
      (window as any).callPhantom ||
      (window as any)._phantom ||
      (window as any).__nightmare
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
    if (
      detectBotMarkers().some((marker) => (window as any)[marker] !== undefined)
    ) {
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
    return true;
  }
  return false;
};
