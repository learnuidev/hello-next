import React, { createContext, useContext } from "react";

export interface FeatureContextValue {
  rootUrl: string;
}

const FeatureContext = createContext<FeatureContextValue | null>(null);

export function FeatureContextProvider({
  children,
  value,
}: {
  children: React.ReactNode;
  value: FeatureContextValue;
}) {
  return (
    <FeatureContext.Provider value={value}>{children}</FeatureContext.Provider>
  );
}

function useFeatureContextInner() {
  const phraseContext = useContext(FeatureContext);
  return phraseContext;
}

export function useFeatureContext() {
  const ctx = useFeatureContextInner();
  return {
    rootUrl: ctx?.rootUrl || "",
  };
}
