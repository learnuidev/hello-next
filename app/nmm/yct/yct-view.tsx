"use client";
import { TabsContent } from "@/components/ui/tabs";
import React from "react";

import { useSearchQueryStore } from "@/components/search/state";

import { useLearningModeStore } from "@/components/settings-dialog/learning-mode.store";

import { NomadMethodTabsContainer } from "../nomad-method-tabs-container";
import { YctViewType } from "./yct-view-type";

function Yct() {
  return (
    <NomadMethodTabsContainer>
      <TabsContent value="core" className="my-4 md:my-8">
        <YctViewType variant="core" />
      </TabsContent>

      {/* ?.slice(selectedBelt?.minCharacterLevel, selectedBelt?.maxCharacterLevel) */}

      <TabsContent value="needs_review" className="my-4 md:my-8">
        <YctViewType variant="needs_review" />
      </TabsContent>

      <TabsContent value="all" className="my-4 md:my-8">
        <YctViewType variant="all" />
      </TabsContent>
    </NomadMethodTabsContainer>
  );
}

export const YctView = ({
  children,
  variant,
}: {
  children: React.ReactNode;
  variant?: "all";
}) => {
  const queryStr = useSearchQueryStore((state) => state.query);

  const mode = useLearningModeStore((state: any) => state.mode);

  if (mode === "yct") {
    return <Yct />;
  }

  if (!queryStr?.toLowerCase()?.includes("xiaoma")) {
    return children;
  }

  return <Yct />;
};
