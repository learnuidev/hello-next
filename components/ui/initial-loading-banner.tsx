"use client";

import { MandarinoLoadingBanner } from "./mandarino-loading-banner";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

export function InitialLoadingBanner({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoading, setIsLoading] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading && pathname === "/") {
    return <MandarinoLoadingBanner />;
  }

  return <>{children}</>;
}
