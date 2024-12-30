"use client";

import { FeatureContextProvider } from "@/app/next/features/feature-context-provider";
import { HtmlParser } from "@/app/next/features/html-parser/html-parser";

export default function Web40() {
  return (
    <div>
      <FeatureContextProvider value={{ rootUrl: "/web" }}>
        <HtmlParser />
      </FeatureContextProvider>
    </div>
  );
}
