"use client";

import { AnimatePresence, motion } from "framer-motion";
import { AnimatedLoadingText } from "@/components/animated-loading-text";

export function MandarinoLoadingBanner({
  message = "Mandarino",
}: {
  message?: string;
}) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1 },
          exit: { opacity: 0 },
        }}
        initial="hidden"
        animate="visible"
        exit="exit"
        transition={{ duration: 0.3 }}
        className="flex flex-col items-center justify-center py-12"
      >
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 5 },
            visible: { opacity: 1, y: 0, scale: 1.5, fontWeight: 800 },
            exit: { opacity: 0, y: 5 },
          }}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <motion.p>{message}</motion.p>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
