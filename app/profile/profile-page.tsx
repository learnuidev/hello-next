import { FloatingNavbar } from "@/components/floating-navbar";
import { Icons } from "@/components/ui/icons.v2";
import { useGetAuthUserProfileQuery } from "@/hooks/user/use-get-auth-user-profile";
import { format, parseISO } from "date-fns";
import { ProfileStatsItem } from "./components/profile-stats-item";
import { LifeTimeSentencesStats } from "./components/life-time-sentences-stats";
import { TimeStudiedStats } from "./components/time-studied-stats";
import { LongestStreakStats } from "./components/longest-streak-stats";

const formatISODate = (isoDate: string) => {
  if (!isoDate) return null;
  return format(parseISO(isoDate), "MMM dd, yyyy");
};

export const ProfilePage = () => {
  const { data: profile } = useGetAuthUserProfileQuery();

  if (!profile) {
    return null;
  }

  return (
    <main className="bg-white dark:bg-[rgb(9,10,11)]">
      {/* <NavBar /> */}
      <section className="flex justify-center flex-col items-center mt-32">
        <h1 className="text-2xl font-bold"> Me </h1>

        <p className="text-gray-400 font-light mt-2">Free User</p>
        <p className="text-gray-400 font-light">
          Joined {formatISODate(profile?.createdAt)}
        </p>
      </section>

      <section className="flex flex-row justify-center items-center gap-16 mt-16">
        <LifeTimeSentencesStats />
        <TimeStudiedStats />
        <LongestStreakStats />
      </section>

      <FloatingNavbar />
    </main>
  );
};
