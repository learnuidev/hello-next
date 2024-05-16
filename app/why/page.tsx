"use client";

import { useRouter, useSearchParams } from "next/navigation";

import { FeaturesList } from "./features-list";
import { WhyMandarinoBanner } from "./why-mandarino-banner";
import { LandingNavbar } from "@/components/landing-page/landing-navbar";

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
