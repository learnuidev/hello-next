"use client";

import { useEffect, useState } from "react";

/**
 * False during SSR and on the very first client render, true afterwards.
 *
 * The reader library lives in localStorage, which the server knows nothing
 * about. Waiting for the first effect keeps the server markup and the first
 * client render identical, so hydrating a saved library does not blow up into
 * a mismatch.
 */
export const useHasMounted = () => {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  return hasMounted;
};
