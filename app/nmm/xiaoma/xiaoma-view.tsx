"use client";
import { useSearchQueryStore } from "@/components/search/state";
import { useLearningModeStore } from "@/components/settings-dialog/learning-mode.store";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import React from "react";
import { NomadMethodNavbar } from "../nomad-method-navbar";
import { XiaomaViewType } from "./xiaoma-view-type";

function Xiaoma() {
  return (
    <Tabs defaultValue="core" className="p-0">
      <NomadMethodNavbar />

      <TabsContent value="core" className="my-4 md:my-8">
        <XiaomaViewType variant="core" />
      </TabsContent>

      <TabsContent value="needs_review" className="my-4 md:my-8">
        <XiaomaViewType variant="needs_review" />
      </TabsContent>

      <TabsContent value="all" className="my-4 md:my-8">
        <XiaomaViewType variant="all" />
      </TabsContent>
    </Tabs>
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

  const mode = useLearningModeStore((state: any) => state.mode);

  if (mode === "xiaoma") {
    return <Xiaoma />;
  }

  if (!queryStr?.toLowerCase()?.includes("xiaoma")) {
    return children;
  }

  return <Xiaoma />;
};
