"use client";

import { useSearchParams } from "next/navigation";

import { Authenticated } from "@/components/Authenticated";
import { ProfilePage } from "./profile/profile-page";

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
