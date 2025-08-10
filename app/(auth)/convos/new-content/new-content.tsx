"use client";

import { NewContentHeader } from "./new-content-header";
import { ContentStepView } from "./content-step-view";

export function NewContent({ onClose }: { onClose?: () => void }) {
  return (
    <div className="w-full">
      {/* <NewContentHeader onClose={onClose} /> */}
      <ContentStepView />
    </div>
  );
}
