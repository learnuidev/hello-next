"use client";

import { cn } from "@/lib/utils";
import { motion, useReducedMotion, type Variants } from "framer-motion";
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
 * Player bar that behaves like a video player's controls on desktop:
 * moving the mouse anywhere brings the controls up, and they quietly fade
 * away once the pointer has been idle for a couple of seconds. Keeping the
 * pointer on the controls, or focusing them with the keyboard, keeps them
 * around.
 *
 * Below the `sm` breakpoint the controls stay visible, so touch users never
 * have to hunt for them.
 */
export const AudiobookPlayerDock = ({
  children,
  className,
  innerClassName,
}: {
  children?: React.ReactNode;
  className?: string;
  innerClassName?: string;
}) => {
  const isDesktop = useIsDesktop();
  const shouldReduceMotion = useReducedMotion();

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

  const variants: Variants = {
    hidden: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : 28,
      scale: shouldReduceMotion ? 1 : 0.98,
      transition: { duration: 0.2, ease: [0.4, 0, 1, 1] },
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <div
      className={cn(
        "pointer-events-none fixed inset-x-0 z-50 flex justify-center",
        className,
      )}
    >
      <motion.div
        initial={false}
        animate={visible ? "visible" : "hidden"}
        variants={variants}
        onMouseEnter={() => {
          isHoveringRef.current = true;
        }}
        onMouseLeave={() => {
          isHoveringRef.current = false;
          lastActivityRef.current = Date.now();
        }}
        onFocusCapture={reveal}
        className={cn(
          "w-full max-w-4xl",
          visible ? "pointer-events-auto" : "pointer-events-none",
          innerClassName,
        )}
      >
        {children}
      </motion.div>
    </div>
  );
};
