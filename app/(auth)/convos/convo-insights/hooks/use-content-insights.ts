"use client";

import { secondsToTimestampV2 } from "@/app/profile/utils/seconds-to-timestamp";
import { usePlayHistoryState } from "@/components/youtube-page/hooks/use-play-history-state";
import { useGetContentQuery } from "@/domain/content/content.queries";
import { groupBy } from "ramda";
import { useMemo } from "react";

export const useGetContentInsights = ({ contentId }: { contentId: string }) => {
  const { data: content } = useGetContentQuery({ contentId });

  const { history: playedHistory } = usePlayHistoryState({ contentId });

  const groupbyContextId = groupBy((item: any) => item?.contextId);
  const groupByIdentity = groupBy((item: any) => item);

  const groupedByContextId = groupbyContextId(playedHistory);

  const playedFrequency = useMemo(() => {
    return groupByIdentity(
      Object.values(groupedByContextId)
        ?.map((timeline: any) => {
          return [
            ...new Set(
              timeline
                ?.filter((timelineItem: any, val: any, ctx: any) => {
                  const interestedTranscripts = ctx?.filter(
                    (t: any) =>
                      t?.transcriptionId === timelineItem?.transcriptionId
                  );

                  const interestedProgressTime = interestedTranscripts?.map(
                    (item: any) => item?.progressTime
                  );

                  const maxProgressTime = Math.max(...interestedProgressTime);

                  const currentTranscription = content?.transcriptions?.find(
                    (t: any) => t?.id === timelineItem?.transcriptionId
                  );

                  return (
                    Math.abs(currentTranscription?.end - maxProgressTime) < 1
                  );
                })
                ?.map((item: any) => item?.transcriptionId)
                ?.filter(Boolean)
            ),
          ];
        })
        ?.flat()
    );
  }, [content?.transcriptions, groupByIdentity, groupedByContextId]);

  const data = useMemo(
    () =>
      Object.entries(playedFrequency)?.map((item) => {
        const transcriptionId = item?.[0];
        const value = item?.[1]?.length || 0;

        const currentTranscription = content?.transcriptions?.find(
          (t: any) => t?.id === transcriptionId
        );

        return {
          value,
          date: currentTranscription?.input || transcriptionId,
        };
      }),
    [content?.transcriptions, playedFrequency]
  );

  const totalRepeats = useMemo(
    () =>
      data?.reduce((acc, curr) => {
        return acc + curr?.value;
      }, 0),
    [data]
  );

  const _totalTimePlayed = Object.values(groupedByContextId)
    .map((histories) => {
      const progressTimes =
        histories?.map((history) => history?.progressTime) || [];

      const minProgressTime = Math.min(...progressTimes);
      const maxProgessTime = Math.max(...progressTimes);

      return (maxProgessTime - minProgressTime) * 1000;
    })
    .reduce((acc, curr) => acc + curr, 0);

  const totalTimePlayed = secondsToTimestampV2(_totalTimePlayed);

  return {
    totalRepeats,
    totalPlays: Object.keys(groupedByContextId)?.length,
    data,
    totalTimePlayed,
  };
};
