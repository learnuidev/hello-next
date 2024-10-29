import { FloatingNavbar } from "@/components/floating-navbar";
import { LifeTimeSentencesStats } from "./components/life-time-sentences-stats";
import { LongestStreakStats } from "./components/longest-streak-stats";
import { ProfileBanner } from "./components/profile-banner";
import { TimeStudiedStats } from "./components/time-studied-stats";

export const ProfilePage = () => {
  return (
    <main className="bg-white dark:bg-[rgb(9,10,11)]">
      <ProfileBanner />

      <section className="flex flex-row justify-center items-center gap-16 mt-16">
        <LifeTimeSentencesStats />
        <TimeStudiedStats />
        <LongestStreakStats />
      </section>

      <FloatingNavbar />
    </main>
  );
};
