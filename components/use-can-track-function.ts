import { useAddHistoryMutation } from "@/domain/history/history.mutations";
import { useIsContentTrackingEnabled } from "@/domain/user/use-is-content-tracking-enabled";
import { useListTrackableCharactersQuery } from "@/hooks/use-list-trackable-characters";

export const useCanTrackFunction = (
  currentPhrase: {
    hanzi?: string;
    input?: string;
    lang?: string;
  },
  metadata = {} as any
) => {
  const addHistoryMutation = useAddHistoryMutation();
  const trackableCharacters = useListTrackableCharactersQuery();
  const isContentTrackingEnabled = useIsContentTrackingEnabled();
  const unEncoded = currentPhrase?.hanzi || currentPhrase?.input;

  const containsTrackableCharacters =
    trackableCharacters?.filter((item) => unEncoded?.includes(item?.hanzi)) ||
    [];

  const canTrack =
    isContentTrackingEnabled && containsTrackableCharacters?.length > 0;

  const trackFunction = () => {
    if (canTrack) {
      addHistoryMutation.mutate({
        lang: currentPhrase?.lang,
        // characterId,
        hanzi: unEncoded,
        trackingCharacters: containsTrackableCharacters?.map(
          (item) => item?.hanzi
        ),
        eventType: "CONTENT_VIEWED",
        ...metadata,
      } as any);
    }
  };

  return { canTrack, trackFunction };
};
