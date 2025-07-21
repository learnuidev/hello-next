import { useListDictionaryMeaningsQuery } from "@/app/next/features/html-parser/hooks/use-dictionary-list-meanings";
import { useGetMediaQuery } from "../../../hooks/use-get-media-query";
import { useMediaParams } from "../../hooks/use-media-params";
import { NmmListContainerAll } from "@/components/nmm-list-container-all";
import { HanziLink } from "@/components/hanzi-link";
import { useMediaStatsState } from "../../hooks/use-media-stats-state";
import { groupBy } from "ramda";
import { FancyAreaChart } from "@/app/(auth)/insights/insights-v3/components/fancy-area-chart";

export function ListenAnalytics({ mediaId }: { mediaId: string }) {
  const { data } = useGetMediaQuery(mediaId);

  const wordsRaw = [
    ...new Set(
      data?.mediaFile?.speechMarks?.chunks?.map((item) => {
        return item?.value;
      })
    ),
  ];

  const { history, setHistory } = useMediaStatsState(mediaId);

  const groupByInputAndStartTime = groupBy(
    (item: any) => `${item?.input}_${item?.startTime}`
  );

  // const words = data?.lang === "zh" ? wordsRaw?.map(word => {

  // }) : wordsRaw;

  const transcriptionStr = wordsRaw?.join(" ");

  const { data: _context, isLoading: isContextLoading } =
    useListDictionaryMeaningsQuery(transcriptionStr, data?.lang);

  const context = [
    ...new Set(_context?.map((item) => JSON.stringify(item))),
  ].map((item) => {
    const parsed = JSON.parse(item);

    return {
      ...parsed,
      frequency: _context?.filter((item: any) => item?.input === parsed?.input)
        ?.length,
    };
  });
  return (
    <main className="max-w-6xl m-auto p-4">
      <section className="mt-[72px] h-auto rounded-2xl dark:bg-[rgb(21,22,23)] bg-gray-100 gap-4 p-4 justify-start">
        <h3 className="text-center mb-12 text-2xl mt-8">Repeat History</h3>

        {/* <code>
            <pre>
              {JSON.stringify(groupByInputAndStartTime(history), null, 4)}
            </pre>
          </code> */}

        <FancyAreaChart
          title={"Total Repeats"}
          tooltipTitle="repeats"
          total={history?.length}
          data={Object.entries(groupByInputAndStartTime(history)).map(
            (item) => {
              const hanzi = item?.[0]?.split("_")?.[0];

              const dict = context?.find(
                (val) => val?.input === hanzi || val?.hanzi === hanzi
              );

              return {
                value: item?.[1]?.length || 0,
                date: hanzi,
              };
            }
          )}
        />
      </section>
      <section className="mt-[72px] h-auto sm:min-h-[800px] rounded-2xl dark:bg-[rgb(21,22,23)] bg-gray-100 gap-4 p-4 justify-start">
        <h3 className="text-center mb-12 text-2xl mt-8">Dictionary</h3>
        <NmmListContainerAll>
          {wordsRaw
            ?.map((word) => {
              const wordItem = context?.find(
                (item) => item?.hanzi === word || item?.input === word
              );

              if (wordItem) {
                return wordItem;
              } else {
                return null;
              }
            })
            .filter(Boolean)
            ?.map((char) => {
              if (char?.input?.length > 10 || char?.hanzi?.length > 10) {
                return null;
              }
              return (
                <HanziLink
                  lang={data?.lang}
                  character={char}
                  key={`${char?.id}`}
                />
              );
            })}
        </NmmListContainerAll>
      </section>
    </main>
  );
}
