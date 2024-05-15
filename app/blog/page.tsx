"use client";

import { LandingNavbar } from "@/components/landing-page/landing-page";
import { NavBar } from "@/components/navbar";
import { useSearchParams } from "next/navigation";

export default function Home() {
  const searchParams = useSearchParams();
  const lang = searchParams.get("lang") || "zh";

  return (
    <main>
      <LandingNavbar />
    </main>
  );
}
