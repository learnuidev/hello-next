"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Icons } from "./icons.v2";

const H1_OUT_DELAY = 2000;

export function MandarinoLoadingBanner({
  message = "Mandarino",
}: {
  message?: string;
}) {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => {
      setFadeOut(true);
    }, H1_OUT_DELAY);

    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6 }}
        className="fixed inset-0 flex flex-col items-center justify-center  z-50"
      >
        <motion.h1
          initial={{
            opacity: 0,
            scale: 0.5,
            y: 20,
            filter: "blur(8px)", // Start with blur
          }}
          animate={
            fadeOut
              ? {
                  opacity: 0,
                  scale: 1,
                  y: 0,
                  filter: "blur(0px)", // Clear blur during fade out
                }
              : {
                  opacity: 1,
                  scale: 1,
                  y: 0,
                  filter: "blur(0px)", // Clear blur after initial animation
                }
          }
          transition={
            fadeOut
              ? { duration: 0.2, ease: "easeOut" }
              : { duration: 0.8, ease: "easeOut" }
          }
          className="text-2xl sm:text-5xl font-bold "
        >
          <Icons.mandarinSolid />
          <span> {message}</span>
        </motion.h1>
      </motion.div>
    </AnimatePresence>
  );
}
