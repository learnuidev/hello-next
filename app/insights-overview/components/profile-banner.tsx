import { useGetAuthUserProfileQuery } from "@/hooks/user/use-get-auth-user-profile";
import { cn } from "@/lib/utils";
import { format, parseISO } from "date-fns";

const formatISODate = (isoDate: string) => {
  if (!isoDate) return null;
  return format(parseISO(isoDate), "MMM dd, yyyy");
};

export const ProfileBanner = ({ className }: { className?: string }) => {
  const { data: profile } = useGetAuthUserProfileQuery();

  return (
    <section
      className={cn(
        "flex justify-center flex-col items-center mt-12 md:mt-32",
        className
      )}
    >
      <h1 className="text-2xl font-bold "> Me </h1>

      <p className="dark:text-gray-400 text-sm md:text-md font-light mt-2">
        Free User
      </p>
      <p className=" text-gray-500 text-xs md:text-md font-light">
        Joined {formatISODate(profile?.createdAt || new Date().toISOString())}
      </p>
    </section>
  );
};
