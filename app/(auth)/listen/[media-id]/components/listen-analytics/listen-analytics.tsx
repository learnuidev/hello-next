import { FancyAreaChart } from "@/app/(auth)/insights/insights-v3/components/fancy-area-chart";
import { CharacterAnalytics } from "@/components/_select-character/character-analytics";
import { groupBy } from "ramda";
import { useGetMediaQuery } from "../../../hooks/use-get-media-query";
import { useMediaStatsState } from "../../hooks/use-media-stats-state";

export function ListenChart({ mediaId }: { mediaId: string }) {
  const { history, setHistory } = useMediaStatsState(mediaId);

  const groupByInputAndStartTime = groupBy(
    (item: any) => `${item?.input}_${item?.startTime}`
  );

  return (
    <FancyAreaChart
      title={"Total Repeats"}
      tooltipTitle="repeats"
      total={history?.length}
      data={Object.entries(groupByInputAndStartTime(history)).map((item) => {
        const hanzi = item?.[0]?.split("_")?.[0];

        return {
          value: item?.[1]?.length || 0,
          date: hanzi,
        };
      })}
    />
  );
}
export function ListenAnalytics({ mediaId }: { mediaId: string }) {
  const { data } = useGetMediaQuery(mediaId);

  const wordsRaw = [
    ...new Set(
      data?.mediaFile?.speechMarks?.chunks?.map((item) => {
        return item?.value;
      })
    ),
  ];

  if (!data) {
    return null;
  }

  return (
    <main className="max-w-6xl m-auto p-4">
      <section className="mt-[72px] h-auto rounded-2xl dark:bg-[rgb(21,22,23)] bg-gray-100 gap-4 p-4 justify-start">
        <h3 className="text-center mb-12 text-2xl mt-8">Repeat History</h3>

        <ListenChart mediaId={mediaId} />
      </section>
      <section className="mt-[72px] h-auto sm:min-h-[800px] rounded-2xl dark:bg-[rgb(21,22,23)] bg-gray-100 gap-4 p-4 justify-start">
        <h3 className="text-center mb-12 text-2xl mt-8">Dictionary</h3>

        <CharacterAnalytics
          characterId={wordsRaw?.join(" ")}
          lang={data?.lang}
        />
      </section>
    </main>
  );
}
