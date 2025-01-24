import { usePathname } from "next/navigation";
import { useSearchState } from "@/components/use-search-state";

import { useCurrentAuthUser } from "@/domain/auth/auth.queries";
import { Authenticate } from "./Authenticate";

import { cn } from "@/lib/utils";
import { LandingPage } from "./landing-page/landing-page";
import { SettingsDialog } from "./settings-dialog/settings-dialog";
import { whiteListUrls } from "@/data/white-list-urls";

export const Authenticated = (props: any) => {
  const { data: authUser, isLoading } = useCurrentAuthUser({});
  const routeName = usePathname();

  const isSearchBarOpen = useSearchState((state) => state.isSearchBarOpen);

  // if (whiteListUrls.includes(routeName) || routeName?.includes("nmm")) {
  //   return <>{props.children}</>;
  // }

  if (authUser) {
    return (
      <div>
        <div
          className={cn(
            isSearchBarOpen ? "blur-[50px] pointer-events-none" : "",
            "transition-all"
          )}
        >
          {props.children}
        </div>
      </div>
    );
  }

  if (isLoading) {
    return <div></div>;
  }

  if (routeName === "/") {
    return <LandingPage />;
  }

  return <Authenticate />;
};
