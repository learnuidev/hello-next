"use client";

import { useAutoHideOnIdle } from "@/hooks/use-auto-hide-on-idle";
import { cn } from "@/lib/utils";
import { motion, useReducedMotion, type Variants } from "framer-motion";

/**
 * Wraps player chrome (control bar, header, ...) so it behaves like a video
 * player's controls: it slides/fades in whenever the mouse moves and fades
 * back out once the pointer goes idle. It stays put while the pointer is on
 * it or while it holds keyboard focus, and it never intercepts clicks while
 * hidden.
 */
export const AutoHideOnIdle = ({
  children,
  className,
  hiddenOffset = 24,
}: {
  children?: React.ReactNode;
  className?: string;
  /** Distance the content travels while hidden, e.g. `24` for a bar rising from the bottom or `"-100%"` for one sliding out of the top edge. */
  hiddenOffset?: number | string;
}) => {
  const { visible, hoverProps } = useAutoHideOnIdle();
  const shouldReduceMotion = useReducedMotion();

  const variants: Variants = {
    hidden: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : hiddenOffset,
      scale: shouldReduceMotion ? 1 : 0.98,
      transition: { duration: 0.22, ease: [0.4, 0, 1, 1] },
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.32, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <motion.div
      initial={false}
      animate={visible ? "visible" : "hidden"}
      variants={variants}
      {...hoverProps}
      className={cn(
        visible ? "pointer-events-auto" : "pointer-events-none",
        className,
      )}
    >
      {children}
    </motion.div>
  );
};
