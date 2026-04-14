"use client";

import { MandarinoLoadingBanner } from "./mandarino-loading-banner";
import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { useInitialLoadingBannerStore } from "@/stores/use-initial-loading-banner-store";

export function InitialLoadingBanner({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoading, setIsLoading] = useState(true);
  const pathname = usePathname();
  const { lastShownDate, setLastShownDate } = useInitialLoadingBannerStore();
  const hasInitialized = useRef(false);

  useEffect(() => {
    if (hasInitialized.current) return;

    const today = new Date().toDateString();
    const shouldShowBanner = pathname === "/" && lastShownDate !== today;

    if (shouldShowBanner) {
      setLastShownDate(today);
      new Promise<void>((resolve) => {
        setTimeout(() => {
          setIsLoading(false);
          resolve();
        }, 2500);
      });
    } else {
      setIsLoading(false);
    }
    hasInitialized.current = true;
  }, [pathname, lastShownDate, setLastShownDate]);

  if (isLoading && pathname === "/") {
    return <MandarinoLoadingBanner />;
  }

  return <>{children}</>;
}
