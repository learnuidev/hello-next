"use client";

import { useSearchState } from "@/components/use-search-state";
import { usePathname } from "next/navigation";

import { useCurrentAuthUser } from "@/domain/auth/auth.queries";
import { Authenticate } from "./Authenticate";

import { WithUserPlanOnboarding } from "@/app/(auth)/plans/components/with-user-plan-onboarding";
import { whiteListUrls } from "@/data/white-list-urls";
import { cn } from "@/lib/utils";
import { LandingPage } from "./landing-page/landing-page";
import { WithOnboarding } from "./onboarding/with-onboarding";

export const Authenticated = (props: any) => {
  const { data: authUser, isLoading } = useCurrentAuthUser({});
  const routeName = usePathname();

  const isSearchBarOpen = useSearchState((state) => state.isSearchBarOpen);

  if (whiteListUrls.includes(routeName)) {
    return <>{props.children}</>;
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

  if (routeName === "/") {
    return <LandingPage />;
  }

  return <Authenticate />;
};
