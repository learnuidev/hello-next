// import Image from 'next/image'
"use client";

import { NavBar } from "@/components/navbar";

import { InsightsFilters } from "./InsightsFilters";

import { InsightsV2 } from "./_v2/insights-v2";

export default function Insights() {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <NavBar />
        <div className="mx-4 md:mx-20">
          <InsightsFilters />
        </div>
      </div>

      <main className="mx-4 md:mx-48">
        <InsightsV2 />
      </main>
    </div>
  );
}
