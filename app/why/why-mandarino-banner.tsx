"use client";

import { Icons } from "@/components/ui/icons.v2";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export const WhyMandarinoBanner = () => {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setShowButton(true);
    }, 3000);
    return () => clearInterval(timer);
  });

  return (
    <section className="flex flex-col items-center w-full mx-auto antialiased text-white bg-black h-screen mt-48">
      <h1 className="max-w-4xl mb-8 text-4xl font-extrabold text-center uppercase lg:text-7xl font-display tracking-crazy lg:leading-tight">
        <span> WHY GET A </span>
        <span className=" bg-gradient-to-r from-rose-400 via-purple-500 to-indigo-400 text-transparent bg-clip-text">
          {" "}
          MANDARINO{" "}
        </span>
        <span> ACCOUNT?</span>
      </h1>

      <h2 className="text-center text-lg lg:text-3xl px-8 md:px-16 lg:px-48 selection:bg-purple-600 font-light">
        Say goodbye to <span className="text-rose-400">switching</span> between
        apps. Experience a language learning app that{" "}
        <span className="font-semibold">evolves</span> with you.
      </h2>

      <AnimatePresence mode={"wait"}>
        <motion.span
          key={"123"}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            // repeat: Infinity,
            // it works!
            repeatDelay: 1,
          }}
        >
          <Icons.circleArrowDown
            className={cn(
              "my-16 text-3xl animate-bounce",
              showButton ? "text-white" : "text-black"
            )}
          />
        </motion.span>
      </AnimatePresence>
    </section>
  );
};
