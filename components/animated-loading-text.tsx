"use client";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const textVariants = {
  hidden: { opacity: 0.3 },
  visible: { opacity: 1 },
};

export const AnimatedLoadingText = ({
  message,
  className,
}: {
  message: string;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "flex items-center justify-start text-sm font-light",
        className
      )}
    >
      {message.split("").map((letter, index) => {
        return (
          <motion.span
            key={index}
            variants={textVariants}
            initial="hidden"
            animate="visible"
            transition={{
              repeat: Infinity,
              repeatType: "reverse",
              duration: 0.8,
              delay: index * 0.1,
            }}
            className={index < 7 ? "text-primary" : "text-primary/50"}
          >
            {letter === " " ? <span className="px-[2px]"> </span> : letter}
          </motion.span>
        );
      })}
    </div>
  );
};
