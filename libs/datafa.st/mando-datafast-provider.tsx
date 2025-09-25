import { useCurrentAuthUser } from "@/domain/auth/auth.queries";
import { dataFastAppConfig } from "./datafast-app-config";
import { DatafastProvider } from "./datafast-provider";

export const MandoDatafastProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { data: authUser } = useCurrentAuthUser();
  return (
    <DatafastProvider
      domain={new URL(window.location.href)?.host || "*"}
      apiKey={dataFastAppConfig.apiKey}
      apiUrl={dataFastAppConfig.apiUrl}
      identity={{
        email: authUser?.email || "",
      }}
    >
      {children}
    </DatafastProvider>
  );
};
