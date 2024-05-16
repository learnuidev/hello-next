"use client";

import { LandingNavbar } from "@/components/landing-page/landing-page";
import { Icons } from "@/components/ui/icons.v2";
import { useSearchParams } from "next/navigation";
import { mandarinoFeatures } from "./mandarino-features";
import { useScroll, motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

function SectionItem({
  step,
  feature,
}: {
  step: number;
  feature: { id: string; title: string; description: string };
}) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,

    offset: ["start center", "end center"],
  });

  console.log(scrollYProgress);
  return (
    <motion.div
      ref={ref}
      style={{
        opacity: scrollYProgress,
        scale: 1,
      }}
      className="w-full"
    >
      <section className="flex flex-col items-center justify-center w-full px-4 mx-auto antialiased text-white bg-black h-screen mt-[-120px]">
        <h3 className="text-gray-500 font-extralight text-3xl md:text-6xl my-8 lg:my-12">
          {step}
        </h3>
        <h1 className="max-w-xl mb-8 text-3xl font-extrabold text-center uppercase lg:text-5xl font-display tracking-crazy lg:leading-tight">
          {feature?.title}
        </h1>

        <h2
          dangerouslySetInnerHTML={{ __html: feature?.description }}
          className="text-xl lg:text-2xl px-8 md:px-16 selection:bg-purple-600 text-center"
        ></h2>
      </section>
    </motion.div>
  );
}

const MandarinoBanner = () => {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setShowButton(true);
    }, 3000);
    return () => clearInterval(timer);
  });

  return (
    <section className="flex flex-col items-center w-full mx-auto antialiased text-white bg-black h-screen mt-32">
      <h1 className="max-w-2xl mb-8 text-4xl font-extrabold text-center uppercase lg:text-5xl font-display tracking-crazy lg:leading-tight">
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

export default function Home() {
  const searchParams = useSearchParams();
  const lang = searchParams.get("lang") || "zh";

  return (
    <main className="w-full">
      <LandingNavbar />

      <MandarinoBanner />

      {mandarinoFeatures?.map((feature, idx) => {
        return (
          <SectionItem key={feature.id} feature={feature} step={idx + 1} />
        );
      })}
    </main>
  );
}
