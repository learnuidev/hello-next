"use client";

import { listenApiUrl } from "@/app/(auth)/listen/constants";
import { useJwtToken } from "@/app/next/features/html-parser/hooks/use-jwt-token";
import { secondsToTimestampV2 } from "@/app/profile/utils/seconds-to-timestamp";
import {
  usePlayHistoryState,
  usePlayHistoryStore,
} from "@/components/youtube-page/hooks/use-play-history-state";
import { useGetContentQuery } from "@/domain/content/content.queries";
import { siteConfig } from "@/lib/config";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { groupBy } from "ramda";
import { useMemo } from "react";

interface ContentRepeatPerTranscription {
  transcriptionId: string;
  input: string;
  totalRepeats: 0;
}
interface GetContentAnalyticsRespose {
  totalRepeats: number;
  totalTimePlayed: number;
  totalPlays: number;
  repeatsPerTranscription: ContentRepeatPerTranscription[];
}

// function useGetContentAnalyticsQuery({ contentId }: { contentId: string }) {
//   const token = useJwtToken();
//   return useQuery({
//     queryKey: ["list-content-analytics", contentId],
//     queryFn: async (): Promise<GetContentAnalyticsRespose> => {
//       const resp = await fetch(`${listenApiUrl}/v1/get-content-analytics`, {
//         method: "POST",
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({ contentId }),
//       });

//       const respJson = await resp.json();

//       return respJson;
//     },
//   });
// }

export const useGetContentInsightsRaw = ({
  contentId,
}: {
  contentId: string;
}) => {
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
          input: currentTranscription?.input,
          date: currentTranscription?.input || transcriptionId,
          transcriptionId,
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

  const totalTimePlayed = _totalTimePlayed;

  return {
    totalRepeats,
    totalPlays: Object.keys(groupedByContextId)?.length,
    data,
    totalTimePlayed,
  };
};

function useUpsertContentAnalyticsQuery({ contentId }: { contentId: string }) {
  const { totalPlays, totalRepeats, totalTimePlayed, data } =
    useGetContentInsightsRaw({ contentId });

  // const queryClient = useQueryClient();

  const removeContentHistory = usePlayHistoryStore(
    (state) => state.removeHistoryForContentId
  );
  const token = useJwtToken();
  return useQuery({
    queryKey: ["upsert-content-analytics", contentId],
    refetchInterval: 1000 * 60 * 1,
    queryFn: async (): Promise<GetContentAnalyticsRespose> => {
      const resp = await fetch(`${listenApiUrl}/v1/upsert-content-analytics`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          contentId,
          totalPlays,
          totalRepeats,
          totalTimePlayed,
          repeatsPerTranscription: data?.map((item) => {
            return {
              input: item?.input,
              transcriptionId: item?.transcriptionId,
              totalRepeats: item?.value,
            };
          }),
        }),
      });

      if (!resp?.ok) {
        throw new Error("Error");
      }

      const respJson = await resp.json();

      removeContentHistory(contentId);

      // queryClient.refetchQueries({
      //   queryKey: ["list-content-analytics", contentId],
      // });

      return respJson;
    },
  });
}

type RepeatItemA = {
  transcriptionId: string;
  totalRepeats: number;
};

type RepeatItemB = {
  transcriptionId: string;
  value: number;
};

function aggregateRepeats(
  arr1: ContentRepeatPerTranscription[],
  arr2: RepeatItemB[]
): RepeatItemA[] {
  const map = new Map<string, RepeatItemA>();

  // Add items from the first array using totalRepeats
  arr1.forEach((item) => {
    map.set(item.transcriptionId, {
      transcriptionId: item.transcriptionId,
      totalRepeats: item.totalRepeats,
    });
  });

  // Add or update items from the second array using value
  arr2.forEach((item) => {
    const key = item.transcriptionId;
    const value = item.value || 0;
    if (map.has(key)) {
      map.set(key, {
        transcriptionId: key,
        totalRepeats: map.get(key)!.totalRepeats + value,
      });
    } else {
      map.set(key, {
        transcriptionId: key,
        totalRepeats: value,
      });
    }
  });

  return Array.from(map.values());
}

export const useGetContentInsights = ({ contentId }: { contentId: string }) => {
  // const { data: contentAnalytics } = useGetContentAnalyticsQuery({ contentId });

  const { data: content } = useGetContentQuery({ contentId });

  const { data: contentAnalytics } = useUpsertContentAnalyticsQuery({
    contentId,
  });

  const contentAnalyticsRaw = useGetContentInsightsRaw({ contentId });

  let dataFinal = aggregateRepeats(
    contentAnalytics?.repeatsPerTranscription || [],
    contentAnalyticsRaw?.data
  )?.map((item) => {
    const transcriptionItem = content?.transcriptions?.find(
      (t: any) => t?.id === item?.transcriptionId
    );

    return {
      input: transcriptionItem?.input,
      date: transcriptionItem?.input || item.transcriptionId,
      value: item?.totalRepeats,
    };
  });

  return {
    ...contentAnalyticsRaw,
    totalRepeats:
      contentAnalyticsRaw?.totalRepeats + (contentAnalytics?.totalRepeats || 0),
    totalPlays:
      contentAnalyticsRaw?.totalPlays + (contentAnalytics?.totalPlays || 0),
    totalTimePlayed: secondsToTimestampV2(
      contentAnalyticsRaw?.totalTimePlayed +
        (contentAnalytics?.totalTimePlayed || 0)
    ),

    data: dataFinal,
  };
};
