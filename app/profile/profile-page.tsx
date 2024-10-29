import { FloatingNavbar } from "@/components/floating-navbar";
import { NavBar } from "@/components/navbar";
import { Icons } from "@/components/ui/icons.v2";
import { useCurrentAuthUser } from "@/domain/auth/auth.queries";
import { useGetAuthUserProfileQuery } from "@/hooks/user/use-get-auth-user-profile";
import { format, parseISO } from "date-fns";

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
        <div className="flex flex-col justify-center items-center">
          <Icons.messageQuote
            className="text-4xl"
            style={{
              "--fa-primary-color": "#A594F9",
              "--fa-secondary-color": "#CDC1FF",
            }}
          />

          <p className="text-lg font-semibold mt-2">134</p>
          <p className="uppercase text-gray-500 font-light text-[10px]">
            Sentences
          </p>
          <p className="uppercase text-gray-500 font-light text-[10px]">
            Lifetime
          </p>
        </div>
        <div className="flex flex-col justify-center items-center">
          <Icons.eightOClock
            className="text-4xl"
            style={{
              "--fa-primary-color": "#8ABFA3",
              "--fa-secondary-color": "#00FF9C",
            }}
          />

          <p className="text-lg font-semibold mt-2">88 min</p>
          <p className="uppercase text-gray-500 font-light text-[10px]">Time</p>
          <p className="uppercase text-gray-500 font-light text-[10px]">
            Studied
          </p>
        </div>
        <div className="flex flex-col justify-center items-center">
          <Icons.fireDuoTone
            className="text-4xl"
            style={{
              "--fa-primary-color": "#CC2B52",
              "--fa-secondary-color": "#AF1740",
            }}
          />

          <p className="text-lg font-semibold mt-2">1 day</p>
          <p className="uppercase text-gray-500 font-light text-[10px]">
            Longest
          </p>
          <p className="uppercase text-gray-500 font-light text-[10px]">
            Streak
          </p>
        </div>
      </section>

      <FloatingNavbar />
    </main>
  );
};
