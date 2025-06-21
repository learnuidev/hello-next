"use client";

import { Authenticated } from "@/components/Authenticated";
import { FloatingNavbar } from "@/components/floating-navbar";
import { OverviewPage } from "./overview/overview-page";

export default function Home() {
  return (
    <Authenticated>
      <OverviewPage />
      <FloatingNavbar />
    </Authenticated>
  );
}
