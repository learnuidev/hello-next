"use client";
import React, { useMemo } from "react";
import {
  CloudyIcon,
  MoonIcon,
  SearchIcon,
  SunRiseIcon,
} from "@/components/ui/icons";
import { Header } from "@/components/Header";
import { useState, useEffect } from "react";

import { useQuery } from "@tanstack/react-query";
import { pronounciationLessons } from "./pronuncation_data";

import { filterHmm, parse } from "@/data/hsk";
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

// palette used for chart: https://flatuicolors.com/palette/cn
const useGetHistory = () => {
  const hist = [] as any;
  return useQuery(
    ["get-history"],
    async () => {
      try {
        const hist2 = hist
          .filter((history: any) =>
            pronounciationLessons?.find((p: any) => p?.id === history?.lessonId)
          )
          .map((item: any) => {
            const lessonIndex = item.lessonId.split("")[0];

            // console.log('LESSON INDEX', lessonIndex)

            return {
              ...item,
              lessonIndex,
            };
          })
          .map((res: any) => {
            const lesson = pronounciationLessons?.find(
              (pronounciationLesson: any) =>
                pronounciationLesson?.id === res?.lessonId
            );

            // console.log('LESSON', lesson)
            // // const lesson = {}
            const resp = {
              // ...res,
              name: `Lesson ${res?.lessonIndex}`,
              lessonIndex: res?.lessonIndex,
              lessonId: res?.lessonId,
              time: res?.time,
              transcript: res?.answer?.[0]?.transcript,
              confidence: res?.answer?.[0]?.confidence,
              outcome: calcOutcome({
                lesson,
                confidence: res?.answer?.[0]?.confidence * 100,
                answer: res?.answer?.[0]?.transcript,
                expectedAnswer: lesson?.hanziV2,
              }),
            };
            return resp;
          })
          .reduce((acc: any, curr: any) => {
            // console.log('CURR', curr)
            if (acc?.[curr?.lessonIndex]) {
              if (curr?.outcome === "success") {
                return {
                  ...acc,
                  [curr?.lessonIndex]: {
                    ...acc?.[curr?.lessonIndex],
                    confidenceRates: acc?.[
                      curr?.lessonIndex
                    ]?.confidenceRates.concat(curr?.confidence),
                    correct: (acc?.[curr?.lessonIndex]?.correct ?? 0) + 1,
                  },
                };
              } else {
                return {
                  ...acc,
                  [curr?.lessonIndex]: {
                    ...acc?.[curr?.lessonIndex],
                    incorrect: (acc?.[curr?.lessonIndex]?.incorrect ?? 0) + 1,
                  },
                };
              }
            } else {
              if (curr?.outcome === "success") {
                return {
                  ...acc,
                  [curr?.lessonIndex]: {
                    ...curr,
                    correct: 1,
                    confidenceRates: [],
                  },
                };
              } else {
                return {
                  ...acc,
                  [curr?.lessonIndex]: {
                    ...curr,
                    incorrect: 1,
                    confidenceRates: [],
                  },
                };
              }
            }
          }, {});

        // console.log('HIST 2', hist2)
        return Object.values(hist2)
          .sort((a: any, b: any) => a?.lessonIndex - b?.lessonIndex)
          .map((item: any) => {
            return {
              ...item,
              accuracy:
                (item?.correct / (item?.correct + item?.incorrect)) * 100,
              inaccuracy:
                (item?.incorrect / (item?.correct + item?.incorrect)) * 100,
              confidence:
                item?.confidenceRates.reduce(
                  (acc: any, curr: any) => acc + curr * 100,
                  0
                ) / item?.confidenceRates?.length,
            };
          });
      } catch (err) {
        console.log("ERROR", err);
      }
    },
    {}
  );
};

const options = [
  { id: "chinese", value: "ordering food" },
  { id: "ai", value: "list flashcards" },
  { id: "home-school", value: "practice now" },
  { id: "frameworks", value: "view analytics" },
  // { id: 'frameworks', value: 'I want to learn dynamodb' },
  {
    id: "professional",
    value: "I want to learn reactjs",
    tags: ["applied", "professional", "programming", "real-world"],
  },
  // { id: 'frameworks', value: 'I want to learn cloudwatch' },
  {
    id: "html",
    value: "I want to learn html",
    tags: ["html", "foundation", "template"],
  },
  {
    id: "tools",
    value: "I want to learn chrome dev tools",
    tags: ["tools", "productivity"],
  },
  {
    id: "js",
    value: "I want to learn js",
    tags: ["js", "foundation", "automation"],
  },

  {
    id: "css",
    value: "I want to learn css",
    tags: ["css", "foundation", "style sheet"],
  },
  { id: "architecture", value: "I want to learn frontend architecture" },
  // 'butter chicken recipe'
];

export function SearchPage() {
  const [queryStatus, setQueryStatus] = useState("idle");
  const query = useSearchQueryStore((state) => state.query);
  const setQuery = useSearchQueryStore((state) => state.setQuery);
  // const [query, setQuery] = useState('')
  const [index, setIndex] = useState(0);

  const queryResult = useSearchQueryStore((state) => state.queryResult) as any;
  const setQueryResult = useSearchQueryStore((state) => state.setQueryResult);
  const nepaliQueryResult = useSearchQueryStore(
    (state) => state.nepaliQueryResult
  ) as any;
  const setNepaliQueryResult = useSearchQueryStore(
    (state) => state.setNepaliQueryResult
  );

  const option = options?.[index % options.length];

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
  const DayIcon = () => {
    const now = new Date().getHours();

    if (now < 12) {
      return <SunRiseIcon className="text-3xl" />;
    } else if (now >= 12 || now < 16) {
      return <CloudyIcon className="text-3xl" />;
    } else {
      return <MoonIcon className="text-3xl" />;
    }
  };

  interface NepaliWord {
    nepali: string;
  }

  type Word = NepaliWord;

  const search = async (query: string) => {
    // check for special characters
    if (["word", "character", "pronoun", "conjunction"].includes(query)) {
      alert(query);
      const resp = filterHmm(query);

      // const resp2 = resp?.length ? resp : _filteredNepaliWords(nepaliWords203)

      setQueryResult(resp);

      //   const resp2 = _filteredNepaliWords(nepaliWords203);
      setQueryStatus("success");
    } else {
      //  我爸爸在看电视
      // const res = await fetch(`${giphySearchUrl}${query}`)
      // const resp = await res.json()
      const resp = parse(query);
      setQueryResult(resp);
      //   const resp2 = _filteredNepaliWords(nepaliWords203);
      //   setNepaliQueryResult(resp2);
      setQueryStatus("success");
    }
  };

  const search2 = async (context: string, query: string) => {
    // check for special characters
    if (
      ["word", "character", "pronoun", "conjunction", "verb"].includes(query)
    ) {
      // alert(query)
      const resp = filterHmm(query)?.filter((item: any) =>
        item?.hanzi?.includes(context)
      );
      // const resp = filterHmm(query)
      // alert(JSON.stringify(resp))
      // setQueryResult(resp);
      setQueryStatus("success");
    } else {
      //  我爸爸在看电视
      // const res = await fetch(`${giphySearchUrl}${query}`)
      // const resp = await res.json()
      // const resp = parse(query);
      // setQueryResult(resp);
      setQueryStatus("success");
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((seconds) => seconds + 1);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  var expression =
    /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
  var regex = new RegExp(expression);

  const determineSearch = (query: any) => {
    if (query.match(regex)) {
      alert("Its a url");
      return {
        type: "url",
        query,
      };
    } else if (parse(query)?.length) {
      return {
        type: "hanzi",
        query: query,
        data: parse(query),
      };
    } else {
      return {
        type: "en",
        query,
      };
    }
  };

  const handleSearch = () => {
    if (query.match(regex)) {
      alert("Its a url");
    } else {
      search(query);
    }
  };
  const handleSearch2 = (context: any, query: any) => {
    if (query.match(regex)) {
      alert("Its a url");
    } else {
      search2(context, query);
    }
  };

  const provideAddingLinks = (query: string) => {
    return [
      {
        title: "add lesson",
      },
      {
        title: "add speak",
      },
      {
        title: "add convo",
      },
    ].filter((item) => {
      return item.title.includes(query);
    });
  };

  const provideInstallationLinks = (query: string) => {
    return [
      {
        title: "install speak",
      },
      {
        title: "install convo",
      },
      {
        title: "install listen",
      },
      {
        title: "install hmm",
      },
      {
        title: "install hsk",
      },
      {
        title: "install pinyin",
      },
    ].filter((item) => {
      return item.title.includes(query);
    });
  };

  const providePinyinLinks = (query: string) => {
    return [
      {
        title: "view analytics",
      },
      {
        title: "view hmm chart",
      },
    ];
  };

  const addSuggestions = useMemo(() => {
    if (query) {
      if (query.includes("ad")) {
        return provideAddingLinks(query);
      }

      if ("pinyin".includes(query)) {
        return providePinyinLinks(query);
      }

      if (query.includes("install")) {
        return provideInstallationLinks(query);
      }
    }

    return [];
  }, [query]);

  const { data } = useGetHistory();

  return (
    <div className="grow mx-4 md:mx-24 flex flex-col">
      {/* <Header className="my-2 md:hidden text-center md:text-left text-black dark:text-gray-400 text-xl font-extralight">
        good {getTimeOfDay}, vishal
      </Header>

      <div className="hidden md:block">
        <div className="flex pt-4 w-full justify-between items-center">
          <Header className="my-2 text-left text-black dark:text-gray-400 text-xl font-extralight">
            good {getTimeOfDay}, vishal
          </Header>

          <div className="space-x-8 items-center">
            <span className="text-3xl font-extralight">23.4C</span>
            <DayIcon />
          </div>
        </div>
      </div> */}

      {queryResult?.length || nepaliQueryResult?.length ? null : (
        <div>
          <Header className="text-black text-center dark:text-white text-6xl mt-32 font-extrabold">
            mandarin<span className="">o</span>
          </Header>
          <p className="text-gray-500 dark:text-gray-400 mb-12 leading-snug text-center text-md sm:text-2xl font-extralight tracking-wide">
            mandarino helps you learn <strong className="">mandarin</strong>{" "}
            fast and <strong className="text-bold">fun</strong>
          </p>
        </div>
      )}

      <div className="my-8 flex flex-row justify-center space-x-4 items-center">
        <div className="flex items-center justify-center">
          <input
            className="dark:placeholder:text-gray-500 border-gray-900 dark:bg-black dark:text-gray-300 placeholder:text-gray-300 opacity-100 transition-opacity ease-in duration-700 border-2 w-[340px] md:w-[600px] px-4 py-2 rounded-full focus:outline-none active:outline-none"
            placeholder={option.value}
            onChange={(event) => {
              setQuery(() => event?.target?.value);
            }}
            value={query}
            onKeyDown={(event) => {
              if (event?.keyCode === 13) {
                if (option.value) {
                  handleSearch();
                }
              }
            }}
          />
        </div>

        <button
          onClick={handleSearch}
          className="flex space-x-2 items-center text-[14px] tracking-widest font-light uppercase bg-black text-white dark:text-gray-500 dark:hover:text-white hover:shadow-gray-300 hover:shadow-green-500 hover:border-green-500 shadow-2 shadow-md border-[1px] border-gray-400 dark:border-gray-800 px-4 py-2 rounded-full transition"
        >
          <SearchIcon />
          <span className="hidden sm:block"> Search </span>
        </button>
      </div>

      {addSuggestions?.length ? (
        <div>
          <code>
            <pre>{JSON.stringify(addSuggestions, null, 2)}</pre>
          </code>
        </div>
      ) : null}

      {nepaliQueryResult?.length ? (
        <div className="w-[740px] m-auto justify-center flex-col space-y-4">
          {nepaliQueryResult
            ?.filter((item: any) => {
              return true;
            })
            ?.map((result: any, idx: number) => {
              return (
                <div key={`${result?.nepali}-${idx}`}>
                  <div className="flex flex-col items-start justify-start">
                    <div className="flex justify-between w-full items-end">
                      <div
                        className="flex justify-between items-center space-x-[8px]"
                        w-full
                        // mb-4
                      >
                        <div className="text-2xl font-extralight space-x-2 dark:text-gray-500">
                          <span
                            role="button"
                            onClick={() => {
                              setQuery(() => result?.nepali);
                              handleSearch2(result?.nepali, result?.nepali);
                            }}
                          >
                            {result?.nepali
                              .split("")
                              ?.map((item: string, idx: number) => {
                                return (
                                  <span
                                    key={`${item}-${idx}`}
                                    className={`${
                                      query?.includes(item)
                                        ? // item?.includes(query)
                                          "dark:text-white"
                                        : ""
                                    }`}
                                  >
                                    {item}
                                  </span>
                                );
                              })}
                          </span>{" "}
                          <span className="text-gray-400">
                            {result?.nepaliRoman || result?.en}
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
                                  setQuery(() => type?.type);
                                  handleSearch2(result?.hanzi, type?.type);
                                }}
                              >
                                {" "}
                                {type?.type}
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
                      {result?.en}
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

      {queryResult ? (
        <div className="w-[740px] m-auto justify-center flex-col space-y-4">
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
                          <span
                            role="button"
                            onClick={() => {
                              setQuery(() => result?.hanzi);
                              handleSearch2(result?.hanzi, result?.hanzi);
                            }}
                          >
                            {result?.hanzi}
                          </span>{" "}
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
