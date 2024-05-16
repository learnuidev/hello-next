"use client";

import { LandingNavbar } from "@/components/landing-page/landing-page";
import { Icons } from "@/components/ui/icons.v2";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

import { FeaturesList } from "./features-list";
import { WhyMandarinoBanner } from "./why-mandarino-banner";

export default function Home() {
  const searchParams = useSearchParams();
  const lang = searchParams.get("lang") || "zh";

  const router = useRouter();

  return (
    <main className="w-full">
      {/* <TracingBeam> */}
      <LandingNavbar />

      <WhyMandarinoBanner />

      <FeaturesList />
      {/* </TracingBeam> */}
    </main>
  );
}
