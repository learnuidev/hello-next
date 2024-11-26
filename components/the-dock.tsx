import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";

export const TheDock = ({
  children,
  innerClassName,
  className,
  show: showNavbar,
}: {
  children?: React.ReactNode;
  innerClassName?: string;
  className?: string;
  show?: boolean;
}) => {
  const [show, setShow] = useState(false);

  if (showNavbar) {
    return (
      <div className={cn("flex w-full fixed z-50 bottom-0", className)}>
        <div className={cn("block w-full", innerClassName)}>{children}</div>
      </div>
    );
  }

  return (
    <div>
      <div className={cn("flex w-full fixed z-50 bottom-0", className)}>
        <div className={cn("block sm:hidden w-full", innerClassName)}>
          {children}
        </div>
      </div>

      <div
        onMouseEnter={() => {
          setShow(true);
        }}
        onMouseLeave={() => {
          setShow(false);
        }}
        className={cn("flex w-full fixed z-50 bottom-0")}
      >
        <div className="text-black">TODO</div>
        <AnimatePresence>
          {show && (
            <motion.div
              exit={{
                y: -20,
                opacity: 0,
                scale: 0.8,
                filter: "blur(800px)",
                transition: { ease: "easeIn", duration: 0.12 },
              }}
              initial={{
                opacity: 0,
                scale: 0.9,
                y: 80,
                filter: "blur(800px)",
              }}
              animate={{
                opacity: 1,
                scale: 1.15,
                y: -5,
                filter: "blur(0px)",
                transition: {
                  duration: 0.1,
                  ease: "easeOut",
                  type: "just",
                },
              }}
              className={cn(
                "transition",

                "hidden sm:block w-full"
              )}
            >
              {children}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
