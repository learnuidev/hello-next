import { useGetUserPreferenceQuery } from "./use-get-user-preference-query";

export const useIsContentTrackingEnabled = () => {
  const { data: userPreference } = useGetUserPreferenceQuery();

  return !!userPreference?.isContentTrackingEnabled;
};
