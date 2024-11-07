"use client";

import Link from "next/link";
import { groupBy } from "ramda";

export const PrecisionSearchResults = ({ searchResults }: any) => {
  const groupByHanzi = groupBy((val: any) => val.hanzi);
  const groupedByHanzi = groupByHanzi(searchResults) as any;

  if (!groupedByHanzi) {
    return null;
  }
  return (
    <section className="space-y-12">
      {Object.entries(groupedByHanzi)?.map(([k, val]: any, idx) => {
        const comp = val?.[0];

        return (
          <Link
            key={`${val}-${idx}`}
            href={`/nmm/${comp?.hanzi}?lang=zh`}
            target="_blank"
            className="block"
          >
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-4xl">
                  {comp?.hanzi}{" "}
                  <span className="text-xl text-gray-400"> {comp?.pinyin}</span>
                </h1>
              </div>
              <p className="text-2xl font-extralight">{comp?.en}</p>
            </div>
            <div className="flex justify-start text-gray-500 font-light space-x-2">
              <div>
                <span>{comp?.totalAttempts}</span> attempts
              </div>
              <div>
                <span>{comp?.totalIncorrect}</span> incorrect
              </div>
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
