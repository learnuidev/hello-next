"use client";

import { Tabs } from "@/components/ui/tabs";

import { useRouter, useSearchParams } from "next/navigation";

import { NomadMethodNavbar } from "./nomad-method-navbar";
import { useGetNmmParams } from "./use-get-nmm-params";

export function NomadMethodTabsContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  const { tab, viewMode } = useGetNmmParams();

  return (
    <Tabs
      onValueChange={(tab) => {
        router.push(`/nmm?tab=${tab}&view-mode=${viewMode}`);
      }}
      value={tab}
      defaultValue={tab}
      className="p-0"
    >
      <NomadMethodNavbar />

      {children}
    </Tabs>
  );
}
