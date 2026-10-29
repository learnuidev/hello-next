"use client";

import { useSearchState } from "@/components/use-search-state";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

import { useCurrentAuthUser } from "@/domain/auth/auth.queries";
import { Authenticate } from "./Authenticate";

import { WithUserPlanOnboarding } from "@/app/(auth)/plans/components/with-user-plan-onboarding";
import { whiteListUrls } from "@/data/white-list-urls";
import { cn } from "@/lib/utils";
import { WithOnboarding } from "./onboarding/with-onboarding";

/** The app's home for a signed-in visitor. */
const homeUrl = "/convos";

/**
 * Sends a signed-in visitor from the landing page into the app.
 *
 * This lives here, next to the auth gate, rather than as a redirect on `/`: a
 * server redirect runs before we know who is asking, so it would also fire for
 * visitors who are logged out — which is exactly how a logged-out visitor used
 * to end up being bounced to `/convos` and back to the login screen.
 */
const SignedInHomeRedirect = () => {
  const router = useRouter();

  useEffect(() => {
    router.replace(homeUrl);
  }, [router]);

  return null;
};

export const Authenticated = (props: any) => {
  const { data: authUser, isLoading } = useCurrentAuthUser({});
  const routeName = usePathname();

  const isSearchBarOpen = useSearchState((state) => state.isSearchBarOpen);

  // TEMP: also let the reader's detail routes through, remove me
  const isWhiteListed =
    whiteListUrls.includes(routeName) ||
    (whiteListUrls.includes("/reader") && routeName.startsWith("/reader/"));

  if (isWhiteListed) {
    return <>{props.children}</>;
  }

  // `/` is public. Render it straight away — waiting for the auth check would
  // show a blank screen to every logged-out visitor — and only then decide
  // whether this visitor belongs in the app.
  if (routeName === "/") {
    return authUser ? <SignedInHomeRedirect /> : <>{props.children}</>;
  }

  if (isLoading) {
    return null;
  }

  if (authUser) {
    return (
      <div>
        <div
          className={cn(
            isSearchBarOpen ? "blur-[50px] pointer-events-none" : "",
            "transition-all",
          )}
        >
          <WithUserPlanOnboarding>
            <WithOnboarding>{props.children}</WithOnboarding>
          </WithUserPlanOnboarding>
        </div>
      </div>
    );
  }

  return <Authenticate />;
};
