"use client";

import { LandingNavbar } from "@/components/landing-page/landing-navbar";
import { FreeTrialButton } from "../why/features-list";

export default function Home() {
  return (
    <main>
      <LandingNavbar />

      <div>
        <FreeTrialButton showBanner={true} />
      </div>
    </main>
  );
}
