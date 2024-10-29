"use client";

import { NavBar } from "@/components/navbar";
import { useSearchParams } from "next/navigation";

import { NomadMethodBody } from "./nmm/nomad-method-body";
import { Authenticated } from "@/components/Authenticated";
import { ProfilePage } from "./profile/profile-page";
import { FloatingNavbar } from "@/components/floating-navbar";

export default function Home() {
  const searchParams = useSearchParams();
  const lang = searchParams.get("lang") || "zh";

  return (
    <Authenticated>
      <ProfilePage />
      {/* <main className="bg-white dark:bg-[rgb(9,10,11)]">
        <NavBar />
        <NomadMethodBody lang={lang} />
      </main> */}
    </Authenticated>
  );
}
