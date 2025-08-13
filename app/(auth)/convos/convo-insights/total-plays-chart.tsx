"use client";

import { useGetContentQuery } from "@/domain/content/content.queries";
import { FancyAreaChart } from "../../insights/insights-v3/components/fancy-area-chart";
import { useGetContentInsights } from "./hooks/use-content-insights";
import Link from "next/link";
import { calculateTotalWordsFrequency } from "@/components/youtube-page/hooks/use-words-clicked-history-state";

export const TotalPlaysChart = ({ contentId }: { contentId: string }) => {
  const props = useGetContentInsights({
    contentId,
  });

  const { data: content } = useGetContentQuery({ contentId });

  const { data, totalRepeats, totalTimePlayed, words } = props;

  const wordsUnique = calculateTotalWordsFrequency(words);

  return (
    <>
      <section className="my-[72px] h-auto rounded-2xl dark:bg-[rgb(21,22,23)] bg-gray-100 gap-4 p-4 justify-start">
        <h3 className="text-center mb-12 text-2xl mt-8">Repeat History</h3>

        <FancyAreaChart hideXAxis={false} tooltipTitle={"repeats"} data={data}>
          <div></div>
        </FancyAreaChart>
      </section>

      {wordsUnique?.length > 0 && (
        <section className="my-[72px] h-auto rounded-2xl dark:bg-[rgb(21,22,23)] bg-gray-100 gap-4 p-4 justify-start">
          <h3 className="text-center mb-12 text-2xl mt-8">Words Cloud</h3>

          <div className="flex flex-row flex-wrap items-center gap-4">
            {wordsUnique?.map((word) => {
              const totalWords: any = words?.filter(
                (item: any) => item?.word === word
              );
              return (
                <Link
                  href={`/nmm/${word?.word}?lang=${content?.lang}`}
                  target="_blank"
                  key={JSON.stringify(totalWords)}
                  style={{
                    fontSize: `${Math.max(Math.min(80, word?.frequency * 8), 16)}px`,
                    // fontSize: `80px`,
                  }}
                >
                  {word?.word}
                </Link>
              );
            })}
            {/* <code>
              <pre>{JSON.stringify(words, null, 4)}</pre>
            </code> */}
          </div>
        </section>
      )}
    </>
  );
};
