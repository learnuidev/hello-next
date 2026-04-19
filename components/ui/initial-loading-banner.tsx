"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { MandarinoLoadingBanner } from "./mandarino-loading-banner";

export function InitialLoadingBanner({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoading, setIsLoading] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    const shouldShowBanner = pathname === "/";

    if (shouldShowBanner) {
      new Promise<void>((resolve) => {
        setTimeout(() => {
          setIsLoading(false);
          resolve();
        }, 2500);
      });
    } else {
      setIsLoading(false);
    }
  }, [pathname]);

  if (isLoading && pathname === "/") {
    return <MandarinoLoadingBanner />;
  }

  return <>{children}</>;
}
