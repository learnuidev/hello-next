"use client";
import { NavBar } from "@/components/navbar";

import { useGetCurrentLang } from "@/hooks/use-get-current-lang";
import { NomadMethodBody } from "./nomad-method-body";

export default function NomadMethodPage(props: any) {
  const lang = useGetCurrentLang();

  return (
    <div className="grow">
      <NavBar />

      <NomadMethodBody lang={lang} />
    </div>
  );
}
