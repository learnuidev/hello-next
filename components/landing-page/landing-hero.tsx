"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";

/** The kinds of content the app takes — the half of the headline that changes. */
const things = ["songs", "stories", "essays", "books"];

/**
 * The hero copy: the headline with the thing you learn from swapping, and the
 * line under it.
 */
export const LandingHero = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(
      () => setIndex((current) => (current + 1) % things.length),
      2200,
    );

    return () => clearInterval(id);
  }, []);

  return (
    <div className="z-50 flex flex-1 flex-col">
      <h1 className="mt-6 max-w-[580px] text-[28px] font-medium leading-tight text-[#878787] md:mt-10 md:text-[44px]">
        learn chinese from{" "}
        <span className="relative inline-block">
          <AnimatePresence mode="wait">
            <motion.span
              key={things[index]}
              initial={{ opacity: 0, y: "0.35em" }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: "-0.35em" }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="inline-block text-rose-400"
            >
              {things[index]}
            </motion.span>
          </AnimatePresence>
        </span>
      </h1>

      <p className="mt-4 max-w-[520px] text-[18px] font-extralight leading-relaxed text-gray-500 md:text-[22px]">
        so you learn from things that matter to you!
      </p>

      <div className="mt-8 md:mt-10">
        <div className="flex items-center space-x-4">
          <Link
            href="/register"
            className="inline-flex h-11 items-center justify-center border border-transparent bg-primary px-5 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none"
          >
            Try it for free
          </Link>

          <Link
            href="/login"
            className="inline-flex h-11 items-center justify-center border border-transparent bg-[#F2F1EF] px-6 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none dark:bg-[#1D1D1D]"
          >
            Log in
          </Link>
        </div>
      </div>
    </div>
  );
};
