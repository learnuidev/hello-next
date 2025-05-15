"use client";
import { useSearchQueryStore } from "@/components/search/state";
import { useLearningMode } from "@/components/settings-dialog/learning-mode.store";
import { TabsContent } from "@/components/ui/tabs";
import React from "react";
import { NomadMethodTabsContainer } from "../nomad-method-tabs-container";
import { XiaomaViewType } from "./xiaoma-view-type";

function Xiaoma() {
  return (
    <NomadMethodTabsContainer>
      <TabsContent value="core" className="my-4 md:my-8">
        <XiaomaViewType variant="core" />
      </TabsContent>

      <TabsContent value="needs_review" className="my-4 md:my-8">
        <XiaomaViewType variant="needs_review" />
      </TabsContent>

      <TabsContent value="all" className="my-4 md:my-8">
        <XiaomaViewType variant="all" />
      </TabsContent>
    </NomadMethodTabsContainer>
  );
}

export const XiaomaView = ({
  children,
  variant,
}: {
  children: React.ReactNode;
  variant?: "all";
}) => {
  const queryStr = useSearchQueryStore((state) => state.query);

  const { mode } = useLearningMode();

  if (mode === "xiaoma") {
    return <Xiaoma />;
  }

  if (!queryStr?.toLowerCase()?.includes("xiaoma")) {
    return children;
  }

  return <Xiaoma />;
};
