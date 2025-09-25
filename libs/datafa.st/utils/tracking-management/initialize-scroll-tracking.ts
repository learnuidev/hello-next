export const initializeScrollTracking = (
  trackScrollElement: (element: Element, observer: IntersectionObserver) => void
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
        parseFloat(element.getAttribute("data-fast-scroll-threshold") || "0.5")
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
          if (entry.isIntersecting) trackScrollElement(entry.target, observer);
        }),
      { root: null, rootMargin: "0px", threshold }
    );

    elements.forEach((element) => observer.observe(element));
  });
};
