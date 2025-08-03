import { FloatingNavbar } from "@/components/floating-navbar";
import { LifeTimeSentencesStats } from "./components/life-time-sentences-stats";

import { NavBar } from "@/components/navbar";
import { cn } from "@/lib/utils";
import { LifeTimeCharactersStats } from "./components/life-time-characters-stats";
import { ProfileBanner } from "./components/profile-banner";
import { TimeStudiedStats } from "./components/time-studied-stats";
import { TotalActiveDaysStats } from "./components/total-active-days-stats";

export const ProfilePage = ({
  hideSearch,
  className,
  profileClassName,
}: {
  hideSearch?: boolean;
  className?: string;
  profileClassName?: string;
}) => {
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

      <FloatingNavbar />
    </main>
  );
};
