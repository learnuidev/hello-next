import { FloatingNavbar } from "@/components/floating-navbar";
import { LifeTimeSentencesStats } from "./components/life-time-sentences-stats";

import { ProfileBanner } from "./components/profile-banner";
import { TimeStudiedStats } from "./components/time-studied-stats";
import { TotalActiveDaysStats } from "./components/total-active-days-stats";
import { LifeTimeCharactersStats } from "./components/life-time-characters-stats";
import { NavBar } from "@/components/navbar";
import { useGetInsightSearchResults } from "../(auth)/insights/insights-v2/precision-insight-view/use-get-insight-search-results";
import { SearchResults } from "../(auth)/insights/insights-v2/precision-insight-view/search-results";
import { useSearchQueryStore } from "@/components/search/state";
import { cn } from "@/lib/utils";

export const ProfilePage = ({
  hideSearch,
  className,
  profileClassName,
}: {
  hideSearch?: boolean;
  className?: string;
  profileClassName?: string;
}) => {
  const searchResults = useGetInsightSearchResults("all");

  const queryStrSync = useSearchQueryStore((state) => state.querySync);

  if (queryStrSync) {
    return (
      <main className="bg-white dark:bg-[rgb(9,10,11)]">
        {hideSearch ? null : <NavBar />}
        <div className="mx-4 md:mx-48">
          <SearchResults searchResults={searchResults} />
        </div>
      </main>
    );
  }
  return (
    <main className="bg-white dark:bg-[rgb(9,10,11)]">
      {hideSearch ? null : <NavBar />}
      <ProfileBanner className={profileClassName} />

      <section
        className={cn(
          "flex flex-row justify-center items-center gap-x-16 gap-y-8 mt-16 flex-wrap",
          className
        )}
      >
        <LifeTimeCharactersStats />
        <LifeTimeSentencesStats />
        <TimeStudiedStats />
        <TotalActiveDaysStats />
      </section>

      {/* <section>
        <code>
          <pre>{JSON.stringify(timeStudied, null, 2)}</pre>
        </code>
      </section> */}

      <FloatingNavbar />
    </main>
  );
};
