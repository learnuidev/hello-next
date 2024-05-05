// import 'regenerator-runtime/runtime'

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useSearchState } from "@/components/use-search-state";

import { useCurrentAuthUser } from "@/domain/auth/auth.queries";
import { Authenticate } from "./Authenticate";
// import { SearchInputFC } from "./search-input-fc";
import { cn } from "@/lib/utils";
import { LandingPage } from "./landing-page/landing-page";

export const Authenticated = (props: any) => {
  const { data: authUser, isLoading } = useCurrentAuthUser({});
  const routeName = usePathname();

  const searchParams = useSearchParams();
  const lang = searchParams.get("lang") || "zh";

  const isSearchBarOpen = useSearchState((state) => state.isSearchBarOpen);
  const setSearchBarOpen = useSearchState((state) => state.setSearchBarOpen);

  const router = useRouter();

  if (["/login", "/register"]?.includes(routeName)) {
    return <>{props.children}</>;
  }
  // const route

  if (authUser) {
    return (
      <div>
        <div
          className={cn(
            isSearchBarOpen ? "blur-[50px] pointer-events-none" : "",
            "transition-all"
          )}
          // onKeyDown={(event) => {
          //   console.log("EVENT", event);
          //   if (event.key === "Escape") {
          //     if (isSearchBarOpen) {
          //       setSearchBarOpen(false);
          //     }

          //     if (routeName?.includes("/nmm/")) {
          //       router.push(`/nmm`);
          //     }
          //   }

          //   // if (event.key === "s") {
          //   //   if (isSearchBarOpen) {
          //   //     return;
          //   //     // setSearchBarOpen(false);
          //   //   } else {
          //   //     setSearchBarOpen(true);
          //   //   }
          //   // }
          // }}
        >
          {props.children}
        </div>

        {/* {isSearchBarOpen && <SearchInputFC />} */}
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
