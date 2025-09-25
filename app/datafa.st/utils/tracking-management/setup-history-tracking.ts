export const setupHistoryTracking = (schedulePageview: () => void): void => {
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
