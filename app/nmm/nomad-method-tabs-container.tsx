"use client";

import { Tabs } from "@/components/ui/tabs";

import { useRouter, useSearchParams } from "next/navigation";

import { NomadMethodNavbar } from "./nomad-method-navbar";
import { useGetNmmParams } from "./use-get-nmm-params";
import { getNmmSearchParamsUrl } from "./get-nmm-params-url";

export function NomadMethodTabsContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { tab, viewMode, level } = useGetNmmParams();

  return (
    <Tabs
      onValueChange={(currentTab) => {
        router.push(
          `/nmm?${getNmmSearchParamsUrl({ level: level, tab: currentTab, viewMode })}`
        );
        // router.push(`/nmm?tab=${tab}&view-mode=${viewMode}`);
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
