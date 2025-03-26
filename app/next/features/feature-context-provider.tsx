import React, { createContext, useContext } from "react";

interface FeatureContextValue {
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

function _useFeatureContext() {
  const phraseContext = useContext(FeatureContext);
  return phraseContext;
}

export function useFeatureContext() {
  const ctx = _useFeatureContext();
  return {
    rootUrl: ctx?.rootUrl || "",
  };
}
