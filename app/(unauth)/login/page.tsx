"use client";

import { Login } from "@/components/Login";
import { LandingNavbar } from "@/components/landing-page/landing-navbar";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#fdfcfd] dark:bg-[#08090c]">
      <LandingNavbar />
      <Login />
    </main>
  );
}
