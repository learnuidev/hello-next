"use client";

import {
  GreenLightbulbDuoTone,
  Icons,
  RedFireDuoTone,
} from "@/components/ui/icons.v2";
import Link from "next/link";
import { groupBy } from "ramda";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

const StatusIcons = {
  needs_review: {
    title: "Needs Review",
    Icon: Icons.glassesRound,
  },
  learned: {
    title: "Learned",
    Icon: GreenLightbulbDuoTone,
  },
  forgotten: {
    title: "Mastered",
    Icon: RedFireDuoTone,
  },
  not_started: {
    title: "Not Started",
    Icon: Icons.questionMark,
  },
} as any;

export const PrecisionSearchResults = ({ searchResults }: any) => {
  const groupByHanzi = groupBy((val: any) => val.hanzi);
  const groupedByHanzi = groupByHanzi(searchResults) as any;

  if (!groupedByHanzi) {
    return null;
  }
  return (
    <section className="space-y-12 mt-12 pb-32">
      {Object.entries(groupedByHanzi)?.map(([k, val]: any, idx) => {
        const comp = val?.[0];

        const StatusIcon =
          StatusIcons?.[comp?.status] || StatusIcons["learned"];

        return (
          <Link
            key={`${val}-${idx}`}
            href={`/nmm/${comp?.hanzi}?lang=${comp?.lang || "zh"}`}
            target="_blank"
            className="block"
          >
            <div className="flex items-end justify-between">
              <div>
                {comp?.pinyin?.length > 8 && (
                  <span className="text-lg text-gray-400 truncate font-extralight">
                    {" "}
                    {comp?.pinyin}
                  </span>
                )}

                <h1 className="truncate font-light">
                  <span
                    className={cn(
                      "truncate",
                      comp?.pinyin?.length > 8
                        ? "text-lg"
                        : "text-2xl sm:text-4xl"
                    )}
                  >
                    {comp?.hanzi}{" "}
                  </span>
                  {comp?.pinyin?.length < 8 && (
                    <span className="text-xl text-gray-400 truncate font-extralight">
                      {" "}
                      {comp?.pinyin}
                    </span>
                  )}
                </h1>
              </div>

              <TooltipProvider delayDuration={100}>
                <Tooltip>
                  <TooltipTrigger className="p-3 px-0 hover:scale-110 transition">
                    <StatusIcon.Icon className="text-lg sm:text-2xl" />
                  </TooltipTrigger>
                  <TooltipContent className="bg-black border-gray-800 rounded-full">
                    <p>
                      <span className="text-xs"> {StatusIcon.title}</span>
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>

            <div className="flex justify-between items-end">
              <p className="text-lg sm:text-xl font-light truncate text-gray-500">
                {comp?.en?.split("/")?.slice(0, 2)?.join("; ")}
              </p>
              {comp?.status === "not_started" ? null : (
                <div className="flex justify-start text-gray-500 font-light space-x-2">
                  <div>
                    <span>{comp?.totalAttempts}</span>{" "}
                    {comp?.totalAttempts > 1 ? "attempts" : "attempt"}
                  </div>
                  {comp?.totalIncorrect > 0 ? (
                    <div>
                      <span>{comp?.totalIncorrect}</span> incorrect
                    </div>
                  ) : (
                    comp?.totalCorrect > 0 && (
                      <div>
                        <span>{comp?.totalCorrect}</span> correct
                      </div>
                    )
                  )}
                </div>
              )}

              {/* <div className="space-x-[2px] text-gray-400 font-light">
                <span>
                  <StatusIcon.Icon />
                </span>

                <span> {StatusIcon.title}</span>
              </div> */}
            </div>

            {/* <div>
              <code>
                <pre>{JSON.stringify(comp, null, 4)}</pre>
              </code>
            </div> */}
          </Link>
        );
      })}
      {/* <code>
        <pre>{JSON.stringify(groupByHanzi(searchResults), null, 2)}</pre>
      </code> */}
    </section>
  );
};
