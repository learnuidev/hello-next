// ========== ENVIRONMENT DETECTION ==========
export const isLocalhost = (hostname: string | null): boolean => {
  if (!hostname) return false;

  const lowerHostname = hostname.toLowerCase();
  const localhostPatterns: Array<() => boolean> = [
    () => ["localhost", "127.0.0.1", "::1"].includes(lowerHostname),
    () => /^127(\.[0-9]+){0,3}$/.test(lowerHostname),
    () => /^(\[)?::1?\]?$/.test(lowerHostname),
    () =>
      !!(
        lowerHostname.endsWith(".local") || lowerHostname.endsWith(".localhost")
      ),
  ];

  return localhostPatterns.some((pattern) => pattern());
};
