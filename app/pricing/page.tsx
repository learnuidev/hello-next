"use client";

import { LandingNavbar } from "@/components/landing-page/landing-navbar";
import { useSearchParams } from "next/navigation";
import { FreeTrialButton } from "../why/features-list";

export default function Home() {
  const searchParams = useSearchParams();
  const lang = searchParams.get("lang") || "zh";

  return (
    <main>
      <LandingNavbar />

      <div>
        <FreeTrialButton showBanner={true} />
      </div>
    </main>
  );
}
