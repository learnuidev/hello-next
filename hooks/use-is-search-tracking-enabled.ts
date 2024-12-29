import { useGetUserPreferenceQuery } from "@/domain/user/use-get-user-preference-query";

export const useIsSearchTrackingEnabled = () => {
  const { data: userPreference } = useGetUserPreferenceQuery();

  return userPreference?.isSearchEnabled;
};
