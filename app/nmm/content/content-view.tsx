"use client";
import { TabsContent } from "@/components/ui/tabs";
import React from "react";

import { useLearningModeStore } from "@/components/settings-dialog/learning-mode.store";

import { useListContentsQuery } from "@/domain/content/content.queries";
import { NomadMethodTabsContainer } from "../nomad-method-tabs-container";
import { ContentViewType } from "./content-view-type";

function Content({ contentId }: { contentId: string }) {
  return (
    <NomadMethodTabsContainer>
      <TabsContent value="core" className="my-4 md:my-8">
        <ContentViewType variant="core" contentId={contentId} />
      </TabsContent>

      <TabsContent value="needs_review" className="my-4 md:my-8">
        <ContentViewType variant="needs_review" contentId={contentId} />
      </TabsContent>

      <TabsContent value="all" className="my-4 md:my-8">
        <ContentViewType variant="all" contentId={contentId} />
      </TabsContent>
    </NomadMethodTabsContainer>
  );
}

export const ContentView = ({
  children,
  variant,
}: {
  children: React.ReactNode;
  variant?: "all";
}) => {
  const mode = useLearningModeStore((state: any) => state.mode);

  const { data: contents, isLoading } = useListContentsQuery();
  const content = contents?.find((c: any) => c?.id === mode);

  if (isLoading) return children;

  if (content) {
    return <Content contentId={mode} />;
  }

  return children;
};
