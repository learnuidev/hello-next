import { IDatafastInput } from "./datafast.types";
import { dataFast, IDatafast } from "./datafast.v2";
import { createContext, useContext } from "react";

export const DatafastContext = createContext<IDatafast | undefined>(undefined);

export const useDatafast = () => {
  const context = useContext(DatafastContext);
  if (!context) {
    throw new Error("useDatafast must be used within a DatafastProvider");
  }
  return context;
};

export const DatafastProvider = ({
  children,
  domain,
  apiKey,
  apiUrl,
  identity,
}: { children: React.ReactNode } & IDatafastInput) => {
  const selfHostedDataFast = dataFast({
    apiKey,
    apiUrl,
    domain,
    identity,
  });

  if (!selfHostedDataFast) {
    throw new Error("DatafastProvider: Failed to initialize dataFast");
  }

  return (
    <DatafastContext.Provider value={selfHostedDataFast}>
      {children}
    </DatafastContext.Provider>
  );
};
