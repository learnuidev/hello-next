"use client";

import { NavBar } from "@/components/navbar";
import { useSearchParams } from "next/navigation";

import { NomadMethodBody } from "./nmm/nomad-method-body";
import { Authenticated } from "@/components/Authenticated";

export default function Home() {
  const searchParams = useSearchParams();
  const lang = searchParams.get("lang") || "zh";

  return (
    <Authenticated>
      <main className="bg-white dark:bg-black">
        <NavBar />
        <NomadMethodBody lang={lang} />
      </main>
    </Authenticated>
  );
}
