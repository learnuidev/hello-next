"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/** How long the controls stay up after the last mouse movement. */
const HIDE_DELAY_MS = 2800;
/** How often we check whether the pointer has gone idle. */
const IDLE_CHECK_INTERVAL_MS = 250;

const useIsDesktop = () => {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(min-width: 640px)");
    const update = () => setIsDesktop(query.matches);

    update();
    query.addEventListener("change", update);

    return () => query.removeEventListener("change", update);
  }, []);

  return isDesktop;
};

/**
 * Video player style auto hiding: moving the mouse anywhere brings the
 * controls back, and they fade away once the pointer has been idle for a
 * couple of seconds. Resting the pointer on the controls, or focusing them
 * with the keyboard, keeps them up.
 *
 * Below the `sm` breakpoint the controls always stay visible, so touch users
 * never have to hunt for them.
 */
export const useAutoHideOnIdle = () => {
  const isDesktop = useIsDesktop();

  const [visible, setVisible] = useState(true);

  const lastActivityRef = useRef(Date.now());
  const isHoveringRef = useRef(false);

  const reveal = useCallback(() => {
    lastActivityRef.current = Date.now();
    setVisible(true);
  }, []);

  useEffect(() => {
    if (!isDesktop) {
      return;
    }

    const handleMouseMove = () => reveal();

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    const idleCheck = setInterval(() => {
      if (isHoveringRef.current) {
        lastActivityRef.current = Date.now();
        return;
      }

      if (Date.now() - lastActivityRef.current > HIDE_DELAY_MS) {
        setVisible(false);
      }
    }, IDLE_CHECK_INTERVAL_MS);

    // Controls start out visible, then fade away on their own.
    lastActivityRef.current = Date.now();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      clearInterval(idleCheck);
    };
  }, [isDesktop, reveal]);

  const hoverProps = {
    onMouseEnter: () => {
      isHoveringRef.current = true;
    },
    onMouseLeave: () => {
      isHoveringRef.current = false;
      lastActivityRef.current = Date.now();
    },
    onFocusCapture: reveal,
  };

  return { visible, reveal, hoverProps };
};
