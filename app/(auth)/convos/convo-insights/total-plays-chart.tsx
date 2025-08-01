"use client";

import { usePlayHistoryState } from "@/components/youtube-page/hooks/use-play-history-state";
import { useGetContentQuery } from "@/domain/content/content.queries";
import { groupBy } from "ramda";
import { useMemo } from "react";
import { FancyAreaChart } from "../../insights/insights-v3/components/fancy-area-chart";

export const TotalPlaysChart = ({ contentId }: { contentId: string }) => {
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

  console.log("grouped by context", playedFrequency);

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

  return (
    <section className="my-[72px] h-auto rounded-2xl dark:bg-[rgb(21,22,23)] bg-gray-100 gap-4 p-4 justify-start">
      <h3 className="text-center mb-12 text-2xl mt-8">Total Played History</h3>

      <FancyAreaChart
        title={"Total Plays"}
        tooltipTitle="plays"
        total={Object.keys(groupedByContextId)?.length}
        data={data}
      />
    </section>
  );
};
