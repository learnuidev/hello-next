import { useCurrentAuthUser } from "@/domain/auth/auth.queries";

import { AdaptiveProvider } from "adaptive-engine/dist/index";
import { adaptiveAppConfig } from "./adaptive-app-config";

export const MandoDatafastProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { data: authUser } = useCurrentAuthUser();
  return (
    <AdaptiveProvider
      domain={new URL(window.location.href)?.host || "*"}
      apiKey={adaptiveAppConfig.apiKey}
      apiUrl={adaptiveAppConfig.apiUrl}
      identity={{
        email: authUser?.email || "",
      }}
    >
      {children}
    </AdaptiveProvider>
  );
};
