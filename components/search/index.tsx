"use client";

import { Header } from "@/components/Header";
import Link from "next/link";
import { useEffect, useState } from "react";

import { useListParseQuery } from "@/domain/nmm/nmm.queries";
import { useSearchParams } from "next/navigation";
import posthog from "posthog-js";
import { useSearchQueryStore } from "./state";

const indexOfAll = (str: any, w: any, res = [] as any): any => {
  const idx = str.indexOf(w);

  const wordLen = w.length;

  if (idx === -1) {
    return res;
  }
  const prevIndex = res[res.length - 1] ? wordLen : 0;
  const updatedRes = res.concat({
    index: idx + 1 + (prevIndex || 0) - wordLen,
  }) as any;
  return indexOfAll(str.slice(idx + 1), w, updatedRes);
};

const calcOutcome = (props: any) => {
  const { lesson, confidence, answer, expectedAnswer } = props;

  const expAns = expectedAnswer
    ?.replace(", ", "")
    ?.replace("?", "")
    ?.split("")
    ?.filter(Boolean)
    ?.join("")
    ?.split(" ")
    ?.filter((item: any) => ![", ", "？", "，"].includes(item))
    ?.join("");

  if (
    answer !== expAns?.trim() &&
    !lesson?.alternateAnswers?.includes(answer) &&
    !expAns?.includes(answer)
  ) {
    return "fail";
  }

  return "success";
};

// #region search-page
export function SearchPage() {
  const [queryStatus, setQueryStatus] = useState("idle");
  const query = useSearchQueryStore((state) => state.query);
  const setQuery = useSearchQueryStore((state) => state.setQuery);
  // const [query, setQuery] = useState('')
  const [index, setIndex] = useState(0);

  // const queryResult = useSearchQueryStore((state) => state.queryResult) as any;
  // const setQueryResult = useSearchQueryStore((state) => state.setQueryResult);
  const nepaliQueryResult = useSearchQueryStore(
    (state) => state.nepaliQueryResult
  ) as any;
  const setNepaliQueryResult = useSearchQueryStore(
    (state) => state.setNepaliQueryResult
  );

  const getTimeOfDay = (() => {
    const now = new Date().getHours();

    if (now < 12) {
      return "morning";
    } else if (now >= 12 && now < 16) {
      return "afternoon";
    } else {
      return "evening";
    }
  })();

  interface NepaliWord {
    nepali: string;
  }

  const search2 = async (context: string, query: string) => {
    // check for special characters
    if (
      ["word", "character", "pronoun", "conjunction", "verb"].includes(query)
    ) {
      // alert(query)

      // alert(JSON.stringify(resp))
      // setQueryResult(resp);
      setQueryStatus("success");
    } else {
      setQueryStatus("success");
    }
  };

  var expression =
    /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
  var regex = new RegExp(expression);

  const handleSearch2 = (context: any, query: any) => {
    if (query.match(regex)) {
      alert("Its a url");
    } else {
      search2(context, query);
    }
  };

  const searchParams = useSearchParams();

  const searchQuery = searchParams.get("query");

  useEffect(() => {
    console.log("TODO: Search Query");
    if (searchQuery) {
      posthog.capture("search/query", {
        query: searchQuery,
      });
    }
  }, [searchQuery]);

  const { data: queryResult } = useListParseQuery(
    {
      content: searchQuery || "",
    },
    {
      enabled: Boolean(searchQuery),
    }
  ) as any;

  return (
    <div className="grow mx-4 md:mx-24 flex flex-col">
      {queryResult?.length || nepaliQueryResult?.length ? null : (
        <div>
          <Header className="text-black text-center dark:text-white text-6xl mt-32 font-extrabold">
            mandarin<span className="">o</span>
          </Header>
          <p className="text-gray-500 dark:text-gray-400 mb-12 leading-snug text-center text-md sm:text-2xl font-extralight tracking-wide">
            personalized language learning platform at{" "}
            <strong className="">scale </strong>{" "}
          </p>
        </div>
      )}

      {queryResult ? (
        <div className="w-[740px] m-auto justify-center flex-col space-y-4 my-4 md:my-16">
          {queryResult
            ?.filter((item: any) => {
              return true;
            })
            ?.map((result: any, idx: number) => {
              return (
                <div key={`${result?.hanzi}-${idx}`}>
                  <div className="flex flex-col items-start justify-start">
                    <div className="flex justify-between w-full items-end">
                      <div
                        className="flex justify-between items-center space-x-[8px]"
                        w-full
                      >
                        <div className="text-2xl font-extralight space-x-2 dark:text-gray-500">
                          <Link
                            // role="button"
                            href={`/character/${result?.hanzi}`}
                            target="_blank"

                            // onClick={() => {
                            //   setQuery(() => result?.hanzi);
                            //   handleSearch2(result?.hanzi, result?.hanzi);

                            //   router.push(`/character/${result?.hanzi}`)
                            // }}
                          >
                            {result?.hanzi}
                          </Link>{" "}
                          <span className="text-gray-400">
                            {result?.dictionary?.pinyin}
                          </span>
                        </div>
                      </div>

                      <div className="flex flex-col items-end">
                        <div className="dark:text-gray-400 text-[12px] font-extralight space-x-4">
                          {result?.types?.map((type: any, idx: number) => {
                            return (
                              <span
                                key={`${type?.hanzi}-${idx}`}
                                role="a"
                                onClick={() => {
                                  // alert(type.type)
                                  setQuery(() => type.type);
                                  handleSearch2(result?.hanzi, type.type);
                                }}
                              >
                                {" "}
                                {type.type}
                              </span>
                            );
                          })}
                        </div>

                        <div className="space-x-4 text-xs">
                          {result?.hmmCharacterLevel ? (
                            <>
                              <span className="text-gray-400">
                                hmm: {result?.hmmCharacterLevel}
                              </span>
                            </>
                          ) : null}
                          {result?.hskLevel ? (
                            <>
                              <span className="text-gray-400">
                                hsk: {result?.hskLevel}
                              </span>
                            </>
                          ) : null}
                        </div>
                      </div>
                    </div>

                    <div className="text-md dark:text-gray-400 font-extralight">
                      {result?.dictionary?.en}
                    </div>

                    <div className="m-4 dark:text-gray-400 font-extralight grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2">
                      {result?.dictionary?.examples?.map(
                        (example: any, idx: number) => {
                          return (
                            <div key={`${example?.hanzi}-${idx}`}>
                              <span
                                role="button"
                                onClick={() => {
                                  setQuery(() => example?.hanzi);
                                  handleSearch2(example?.hanzi, example?.hanzi);
                                }}
                              >
                                {example?.hanzi}
                              </span>
                              <p>{example?.pinyin}</p>
                              <p>{example?.lit}</p>
                              <p>{example?.en}</p>
                            </div>
                          );
                        }
                      )}
                    </div>
                  </div>

                  <hr className="h-px bg-gray-200 border-0 dark:bg-gray-700" />
                </div>
              );
            })}
        </div>
      ) : null}
    </div>
  );
}
