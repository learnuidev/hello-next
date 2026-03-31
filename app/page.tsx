"use client";

import { Authenticated } from "@/components/Authenticated";
import { FloatingNavbar } from "@/components/floating-navbar";
// import { OverviewPage }  from "./overview/overview-page";
import { NewHomePage } from "@/components/new-home-page/new-home-page";

export default function Home() {
  return (
    <Authenticated>
      <NewHomePage />
      <FloatingNavbar />
    </Authenticated>
  );
}
