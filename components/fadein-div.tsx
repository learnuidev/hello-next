"use client";

import { useScroll, motion } from "framer-motion";
import { useRef } from "react";

export function FadeInDiv({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    // offset: ["start center", "end center"],
    offset: ["start center", "end end"],
  });

  return (
    <motion.div
      ref={ref}
      style={{
        opacity: scrollYProgress,
        scale: 1,
      }}
      className="w-full"
    >
      {children}
    </motion.div>
  );
}
