"use client";

import { Icons } from "@/components/ui/icons.v2";
import Link from "next/link";
import { groupBy } from "ramda";

const StatusIcons = {
  needs_review: {
    title: "Needs Review",
    Icon: Icons.glassesRound,
  },
  learned: {
    title: "Learned",
    Icon: Icons.lightBulb,
  },
  forgotten: {
    title: "Mastered",
    Icon: Icons.fireDuoTone,
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
                <h1 className="truncate">
                  <span className="text-2xl sm:text-4xl truncate">
                    {comp?.hanzi}{" "}
                  </span>
                  <span className="text-xl text-gray-400 truncate">
                    {" "}
                    {comp?.pinyin}
                  </span>
                </h1>
              </div>
              <p className="text-lg sm:text-2xl font-extralight truncate text-gray-300">
                {comp?.en?.split("/")?.slice(0, 2)?.join("; ")}
              </p>
            </div>

            <div className="flex justify-between items-end mt-2">
              <div className="flex justify-start text-gray-500 font-light space-x-2">
                <span>
                  <StatusIcon.Icon />
                </span>
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
