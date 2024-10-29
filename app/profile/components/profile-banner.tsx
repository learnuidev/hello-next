import { useGetAuthUserProfileQuery } from "@/hooks/user/use-get-auth-user-profile";
import { format, parseISO } from "date-fns";

const formatISODate = (isoDate: string) => {
  if (!isoDate) return null;
  return format(parseISO(isoDate), "MMM dd, yyyy");
};

export const ProfileBanner = () => {
  const { data: profile } = useGetAuthUserProfileQuery();

  if (!profile) {
    return null;
  }

  <section className="flex justify-center flex-col items-center mt-32">
    <h1 className="text-2xl font-bold"> Me </h1>

    <p className="text-gray-400 font-light mt-2">Free User</p>
    <p className="text-gray-400 font-light">
      Joined {formatISODate(profile?.createdAt)}
    </p>
  </section>;
};
