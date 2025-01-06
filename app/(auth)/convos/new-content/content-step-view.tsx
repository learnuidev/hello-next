"use client";

import { useNewConvoStore } from "@/components/step";

import { ContentDetails } from "./content-details";
import { ContentPreview } from "./content-preview";
import { ContentType } from "./content-type";

export const contentTypes = ["audio", "text", "video", "youtube", "website"];

export const ContentStepView = () => {
  const step = useNewConvoStore((state) => state.step);

  switch (step) {
    case "content":
      return <ContentType />;
    case "details":
      return <ContentDetails />;
    case "preview":
      return <ContentPreview />;
    default:
      return <ContentDetails />;
  }
};
