"use client";

import { Login } from "@/components/Login";
import { LandingNavbar } from "@/components/landing-page/landing-navbar";

export default function Home() {
  return (
    <main className="">
      <LandingNavbar />
      <Login />
    </main>
  );
}
