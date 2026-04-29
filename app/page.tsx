"use client";

import { Authenticated } from "@/components/Authenticated";
import { FloatingNavbar } from "@/components/floating-navbar";
import { OverviewPage } from "./overview/overview-page";
import { NewHomePage } from "@/components/new-home-page/new-home-page";
import { useIsHomePageEnabled } from "@/libs/posthog/hooks/is-new-home-page-enabled";

export default function Home() {
  const isEnabled = useIsHomePageEnabled();

  if (isEnabled === undefined) {
    return;
  }

  return (
    <Authenticated>
      {isEnabled ? <NewHomePage /> : <OverviewPage />}
      <FloatingNavbar />
    </Authenticated>
  );
}
