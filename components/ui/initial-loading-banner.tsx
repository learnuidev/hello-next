"use client";

/**
 * Kept as the root layout's wrapper, but no longer holds anything back.
 *
 * It used to stall `/` behind a 2.5s logo banner, from when `/` redirected into
 * the app. `/` is now the public landing page — the one screen that has to
 * paint immediately — so the banner would only be a blank first impression.
 */
export function InitialLoadingBanner({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
