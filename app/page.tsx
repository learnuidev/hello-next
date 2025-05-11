"use client";

import { Authenticated } from "@/components/Authenticated";
import { OverviewPage } from "./overview/overview-page";
import { FloatingNavbar } from "@/components/floating-navbar";

export default function Home() {
  return (
    <Authenticated>
      <OverviewPage />
      <FloatingNavbar />
    </Authenticated>
  );
}
