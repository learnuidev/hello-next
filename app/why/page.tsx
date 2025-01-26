"use client";

import { LandingNavbar } from "@/components/landing-page/landing-navbar";
import { FeaturesList } from "./features-list";
import { WhyMandarinoBanner } from "./why-mandarino-banner";

export default function Home() {
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
