import { useAddHistoryMutation } from "@/domain/history/history.mutations";
import { useGetUserPreferenceQuery } from "@/domain/user/use-get-user-preference-query";

export const useCanTrackNavigationFunction = (metadata = {} as any) => {
  const addHistoryMutation = useAddHistoryMutation();

  const { data: userPreference } = useGetUserPreferenceQuery();

  const isNavigationEnabled = !!userPreference?.isNavigationEnabled;

  const trackNavigationFunction = (currentPhrase: any) => {
    if (isNavigationEnabled) {
      addHistoryMutation.mutate({
        lang: currentPhrase?.lang,
        // characterId,
        hanzi: currentPhrase?.hanzi || currentPhrase?.input,
        eventType: "CONTENT_VIEWED",
        ...metadata,
      } as any);
    } else {
      console.log("Navigation tracking not enabled");
    }
  };

  return { isNavigationEnabled, trackNavigationFunction };
};
