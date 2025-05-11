"use client";

import { Authenticated } from "@/components/Authenticated";
import { OverviewPage } from "./overview/overview-page";

export default function Home() {
  return (
    <Authenticated>
      <OverviewPage />
    </Authenticated>
  );
}
