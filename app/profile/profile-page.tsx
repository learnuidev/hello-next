import { FloatingNavbar } from "@/components/floating-navbar";
import { LifeTimeSentencesStats } from "./components/life-time-sentences-stats";

import { ProfileBanner } from "./components/profile-banner";
import { TimeStudiedStats } from "./components/time-studied-stats";
import { TotalActiveDaysStats } from "./components/total-active-days-stats";
import { LifeTimeCharactersStats } from "./components/life-time-characters-stats";

export const ProfilePage = () => {
  return (
    <main className="bg-white dark:bg-[rgb(9,10,11)]">
      <ProfileBanner />

      <section className="flex flex-row justify-center items-center gap-x-16 gap-y-8 mt-16 flex-wrap">
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
