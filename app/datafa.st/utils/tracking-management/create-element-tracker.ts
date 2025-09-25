import { EventCallback } from "../../datafast.types";

export const createElementTracker = (
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
        parseFloat(element.getAttribute("data-fast-scroll-threshold") || "0.5")
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
