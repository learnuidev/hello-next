"use client";

import { NavBar } from "@/components/navbar";
import { TimelineTabs } from "./_components/timeline-tabs";

export default function Timeline() {
  return (
    <main className="mb-32">
      <NavBar />

      <TimelineTabs />
    </main>
  );
}
