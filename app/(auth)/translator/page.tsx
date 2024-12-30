"use client";

import { FeatureContextProvider } from "@/app/next/features/feature-context-provider";
import { Phrase } from "@/app/next/features/phrase/phrase";

export default function TranslatorPage() {
  return (
    <FeatureContextProvider value={{ rootUrl: "/translator" }}>
      <Phrase />
    </FeatureContextProvider>
  );
}
