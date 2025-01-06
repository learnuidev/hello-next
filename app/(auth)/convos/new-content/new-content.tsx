"use client";

import { NewContentHeader } from "./new-content-header";
import { ContentStepView } from "./content-step-view";

export const contentTypes = ["audio", "text", "video", "youtube", "website"];

export function NewContent() {
  return (
    <div className="w-full">
      <NewContentHeader />
      <ContentStepView />
    </div>
  );
}
