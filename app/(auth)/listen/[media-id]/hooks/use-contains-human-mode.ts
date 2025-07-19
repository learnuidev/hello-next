import { useGetMediaQuery } from "../../hooks/use-get-media-query";

export const useContainsHumanMode = (mediaId: string) => {
  const { data } = useGetMediaQuery(mediaId);

  return (
    data?.customAudioId &&
    data?.mediaFile?.humanAudioTimestamps?.words?.length > 0
  );
};
