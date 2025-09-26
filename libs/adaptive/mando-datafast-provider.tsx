import { useCurrentAuthUser } from "@/domain/auth/auth.queries";

import { adaptiveAppConfig } from "./adaptive-app-config";
import { AdaptiveProvider } from "./adaptive-provider";

export const MandoAdaptiveProvider = ({
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
