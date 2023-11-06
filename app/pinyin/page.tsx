"use client";
import React, { useMemo } from "react";
import { CloseIcon, SearchIcon, FocusIcon } from "@/components/ui/icons";
import { useEffect, useRef, useState } from "react";
import { usePinyinChartState, usePinyinChartStore } from "./state";

import {
  places,
  learnedActors,
  propsArr,
  learnedCharacters,
  learnedWords,
  hanziToPinyin,
  learnedProps,
  learnedPlaces,
} from "@/data/hmm/data";

import {
  ColumnDef,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { characterDictionary, defaultData } from "./data";
import { dictionary } from "@/data/hmm/data/dictionary";
import { NavBar } from "@/components/navbar";
import { yellowBelt as allChars } from "@/data/nmm/1200";

const columnHelper = createColumnHelper<any>();

const totalCharacters = defaultData
  ?.map((val: any) => Object.values(val))
  .flat()
  .filter((val: any) => val?.value);

const totalProblemInitials = defaultData
  ?.map((val: any) => Object.values(val))
  .flat()
  .filter((val: any) => val?.value && val?.problemInitial);

// aa: 'a',
// aai: 'ai',
// aao: 'ao',
// aan: 'an',
// aang: 'ang',

const InfoRenderer = (info: any) => {
  const val = info.getValue();
  if (!Array.isArray(val) && typeof val === "string") {
    return val;
  }
  return val.value;
};

const columns2 = [
  columnHelper.group({
    id: "pinyin",
    // header: () => <span className='my-2 mx-2.5 text-xs text-center'>actor</span>,
    // footer: props => props.column.id,
    cell: InfoRenderer,
    header: () => (
      <span className="my-2 mx-2.5 text-xs text-center">pinyin</span>
    ),
  }),
  columnHelper.group({
    id: "pinyin",
    // header: () => <span className='my-2 mx-2.5 text-xs text-center'>actor</span>,
    // footer: props => props.column.id,
    cell: InfoRenderer,
    header: () => (
      <span className="my-2 mx-2.5 text-xs text-center">hanzi</span>
    ),
  }),
];

const columns = [
  columnHelper.group({
    id: "initial",
    // header: () => <span className='my-2 mx-2.5 text-xs text-center'>actor</span>,
    // footer: props => props.column.id,
    columns: [
      columnHelper.accessor("initial", {
        cell: InfoRenderer,
        header: () => <span className="my-2 mx-2.5 text-xs text-center"></span>,
      }),
    ],
  }),
  columnHelper.group({
    id: "A",
    header: () => <span className="my-2 mx-2.5 text-xs text-center">A</span>,
    // footer: props => props.column.id,
    columns: [
      columnHelper.accessor("aa", {
        cell: (info) => {
          const val = info.getValue();
          if (!Array.isArray(val) && typeof val === "string") {
            return val;
          }
          return val.value;
        },
        header: () => (
          <span className="my-2 mx-2.5 text-xs text-center">a</span>
        ),
      }),
      columnHelper.accessor("aai", {
        cell: (info) => {
          const val = info.getValue();
          if (!Array.isArray(val) && typeof val === "string") {
            return val;
          }
          return val.value;
        },
        header: () => (
          <span className="my-2 mx-2.5 text-xs text-center">ai</span>
        ),
      }),
      columnHelper.accessor("aao", {
        cell: InfoRenderer,
        header: () => (
          <span className="my-2 mx-2.5 text-xs text-center">ao</span>
        ),
      }),
      columnHelper.accessor("aan", {
        cell: InfoRenderer,
        header: () => (
          <span className="my-2 mx-2.5 text-xs text-center">an</span>
        ),
      }),
      columnHelper.accessor("aang", {
        cell: InfoRenderer,
        header: () => (
          <span className="my-2 mx-2.5 text-xs text-center">ang</span>
        ),
      }),
    ],
  }),

  columnHelper.group({
    id: "E",
    header: () => <span className="my-2 mx-2.5 text-xs text-center">E</span>,
    // footer: props => props.column.id,
    columns: [
      columnHelper.accessor("ee", {
        cell: InfoRenderer,
        header: () => (
          <span className="my-2 mx-2.5 text-xs text-center">e</span>
        ),
      }),
      columnHelper.accessor("eei", {
        cell: InfoRenderer,
        header: () => (
          <span className="my-2 mx-2.5 text-xs text-center">ei</span>
        ),
      }),
      columnHelper.accessor("een", {
        cell: InfoRenderer,
        header: () => (
          <span className="my-2 mx-2.5 text-xs text-center">en</span>
        ),
      }),

      columnHelper.accessor("eeng", {
        cell: InfoRenderer,
        header: () => (
          <span className="my-2 mx-2.5 text-xs text-center">eng</span>
        ),
      }),
      columnHelper.accessor("enull", {
        cell: InfoRenderer,
        header: () => (
          <span className="my-2 mx-2.5 text-xs text-center">null</span>
        ),
      }),
    ],
  }),

  columnHelper.group({
    id: "O",
    header: () => <span className="my-2 mx-2.5 text-xs text-center">O</span>,
    // footer: props => props.column.id,
    columns: [
      columnHelper.accessor("oo", {
        cell: InfoRenderer,
        header: () => (
          <span className="my-2 mx-2.5 text-xs text-center">o</span>
        ),
      }),
      columnHelper.accessor("oong", {
        cell: InfoRenderer,
        header: () => (
          <span className="my-2 mx-2.5 text-xs text-center">ong</span>
        ),
      }),
      columnHelper.accessor("oou", {
        cell: InfoRenderer,
        header: () => (
          <span className="my-2 mx-2.5 text-xs text-center">ou</span>
        ),
      }),
    ],
  }),

  columnHelper.group({
    id: "I",
    header: () => <span className="my-2 mx-2.5 text-xs text-center">I</span>,
    // footer: props => props.column.id,
    columns: [
      columnHelper.accessor("inull", {
        cell: InfoRenderer,
        header: () => (
          <span className="my-2 mx-2.5 text-xs text-center">null</span>
        ),
      }),
      columnHelper.accessor("ia", {
        cell: InfoRenderer,
        header: () => (
          <span className="my-2 mx-2.5 text-xs text-center">a</span>
        ),
      }),
      columnHelper.accessor("iao", {
        cell: InfoRenderer,
        header: () => (
          <span className="my-2 mx-2.5 text-xs text-center">ao</span>
        ),
      }),
      columnHelper.accessor("ie", {
        cell: InfoRenderer,
        header: () => (
          <span className="my-2 mx-2.5 text-xs text-center">e</span>
        ),
      }),
      columnHelper.accessor("iou", {
        cell: InfoRenderer,
        header: () => (
          <span className="my-2 mx-2.5 text-xs text-center">ou</span>
        ),
      }),
      columnHelper.accessor("ian", {
        cell: InfoRenderer,
        header: () => (
          <span className="my-2 mx-2.5 text-xs text-center">an</span>
        ),
      }),
      columnHelper.accessor("iang", {
        cell: InfoRenderer,
        header: () => (
          <span className="my-2 mx-2.5 text-xs text-center">ang</span>
        ),
      }),
      columnHelper.accessor("ien", {
        cell: InfoRenderer,
        header: () => (
          <span className="my-2 mx-2.5 text-xs text-center">en</span>
        ),
      }),
      columnHelper.accessor("ieng", {
        cell: InfoRenderer,
        header: () => (
          <span className="my-2 mx-2.5 text-xs text-center">eng</span>
        ),
      }),
      columnHelper.accessor("iong", {
        cell: InfoRenderer,
        header: () => (
          <span className="my-2 mx-2.5 text-xs text-center">ong</span>
        ),
      }),
    ],
  }),

  // // U
  // unull: 'wu',
  // ua: 'wa',
  // uo: 'wo',
  // uei: 'wei',
  // uai: 'wai',
  // uan: 'wan',
  // uen: 'wen',
  // uang: 'wang',
  // ueng: 'weng',
  columnHelper.group({
    id: "U",
    header: () => <span className="my-2 mx-2.5 text-xs text-center">U</span>,
    // footer: props => props.column.id,
    columns: [
      columnHelper.accessor("unull", {
        cell: InfoRenderer,
        header: () => (
          <span className="my-2 mx-2.5 text-xs text-center">null</span>
        ),
      }),
      columnHelper.accessor("ua", {
        cell: InfoRenderer,
        header: () => (
          <span className="my-2 mx-2.5 text-xs text-center">a</span>
        ),
      }),
      columnHelper.accessor("uo", {
        cell: InfoRenderer,
        header: () => (
          <span className="my-2 mx-2.5 text-xs text-center">o</span>
        ),
      }),
      columnHelper.accessor("uei", {
        cell: InfoRenderer,
        header: () => (
          <span className="my-2 mx-2.5 text-xs text-center">ei</span>
        ),
      }),
      columnHelper.accessor("uai", {
        cell: InfoRenderer,
        header: () => (
          <span className="my-2 mx-2.5 text-xs text-center">ai</span>
        ),
      }),
      columnHelper.accessor("uan", {
        cell: InfoRenderer,
        header: () => (
          <span className="my-2 mx-2.5 text-xs text-center">an</span>
        ),
      }),
      columnHelper.accessor("uen", {
        cell: InfoRenderer,
        header: () => (
          <span className="my-2 mx-2.5 text-xs text-center">en</span>
        ),
      }),
      columnHelper.accessor("uang", {
        cell: InfoRenderer,
        header: () => (
          <span className="my-2 mx-2.5 text-xs text-center">ang</span>
        ),
      }),
      columnHelper.accessor("ueng", {
        cell: InfoRenderer,
        header: () => (
          <span className="my-2 mx-2.5 text-xs text-center">eng</span>
        ),
      }),
    ],
  }),
  // // ü
  // ünull: 'yu',
  // üe: 'yue',
  // üan: 'yuan',
  // üen: 'yun'
  columnHelper.group({
    id: "Ü",
    header: () => <span className="my-2 mx-2.5 text-xs text-center">Ü</span>,
    // footer: props => props.column.id,
    columns: [
      columnHelper.accessor("ünull", {
        cell: InfoRenderer,
        header: () => (
          <span className="my-2 mx-2.5 text-xs text-center">null</span>
        ),
      }),
      columnHelper.accessor("üe", {
        cell: InfoRenderer,
        header: () => (
          <span className="my-2 mx-2.5 text-xs text-center">üe</span>
        ),
      }),
      columnHelper.accessor("üan", {
        cell: InfoRenderer,
        header: () => (
          <span className="my-2 mx-2.5 text-xs text-center">üan</span>
        ),
      }),
      columnHelper.accessor("üen", {
        cell: InfoRenderer,
        header: () => (
          <span className="my-2 mx-2.5 text-xs text-center">ün</span>
        ),
      }),
    ],
  }),
];

const calculateColor = (dict: any) => {
  switch (dict?.tone) {
    case 1:
      return "text-red-400";
    case 2:
      return "text-green-400";
    case 3:
      return "text-purple-400";
    case 4:
      return "text-pink-400";
    default:
      return "text-black dark:text-white";
  }
};

const calculateColor2 = (dict: any) => {
  switch (dict?.tone) {
    case 1:
      return "text-red-400";
    case 2:
      return "text-green-400";
    case 3:
      return "text-purple-400";
    case 4:
      return "text-pink-400";
    default:
      return "text-black dark:text-white";
  }
};

const CharacterDetail = () => {
  const [data, setData] = React.useState(() => [...defaultData]);
  const rerender = React.useReducer(() => ({}), {})[1];

  const [selectedPinyin, setSelectedPinyin] = usePinyinChartState();

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const char = characterDictionary[selectedPinyin?.value || selectedPinyin];

  return (
    <div>
      <div className="md:mx-16 text-black dark:text-white flex flex-wrap items-center justify-between text-md">
        <div></div>
        <h1 className="flex flex-col items-center">
          <span className={`text-3xl font-bold dark:text-gray-200`}>
            {selectedPinyin?.value || selectedPinyin}
          </span>
        </h1>
        <button
          onClick={() => {
            setSelectedPinyin(null);
          }}
          className={`my-4 flex flex-col items-center dark:text-gray-600 hover:dark:text-white transition`}
        >
          <CloseIcon className="text-4xl" />
        </button>
      </div>

      <div className="mx-4 my-4 md:mx-16 text-black dark:text-white flex flex-wrap items-center justify-center">
        {(char?.graph?.split("") || [])
          ?.filter((prop: string) => {
            return allChars?.find((item) => item?.hanzi === prop);
          })
          .map((prop: string, idx: number) => {
            const isCore = allChars?.find((item) => item?.hanzi === prop);
            return (
              <button
                key={`${prop}-chars-${idx}`}
                onClick={() => {}}
                className={`${
                  learnedCharacters.includes(prop)
                    ? "dark:text-white text-gray-700"
                    : "dark:text-gray-500 text-gray-200"
                } dark:hover:text-white p-6 text-4xl transition lowercase`}
              >
                {prop}
              </button>
            );
          })}
      </div>

      <div className="flex justify-center">
        {char?.variants
          ? char.variants.map((variant: any) => {
              return (
                <div
                  key={variant.pinyin}
                  className="my-4 mx-8 md:mx-16 text-black dark:text-white"
                >
                  <div className="flex justify-center">
                    <p className={`my-4 text-2xl ${calculateColor(variant)}`}>
                      {variant?.pinyin}
                    </p>
                  </div>

                  {variant?.examples ? (
                    <div className="flex flex-col items-center">
                      <div className="space-y-8 my-4">
                        {variant?.examples.map((example: any) => {
                          return (
                            <div key={JSON.stringify(example)}>
                              <div></div>
                              {example?.examples ? (
                                <div className="space-y-4">
                                  {example?.examples?.map((ex: any) => {
                                    return (
                                      <div key={JSON.stringify(ex)}>
                                        {ex?.hanzi
                                          .split("")
                                          .map((item: any) => {
                                            return (
                                              <span
                                                key={JSON.stringify(item)}
                                                className={`${
                                                  variant?.hanzi === item
                                                    ? calculateColor(example)
                                                    : ""
                                                }`}
                                              >
                                                {item}
                                              </span>
                                            );
                                          })}
                                        {/* <p className='dark:text-gray-600 text-gray-300'>
                                {example?.hanzi}
                              </p> */}
                                        <p className="dark:text-gray-500 text-gray-400">
                                          {ex?.pinyin}
                                        </p>
                                        <p className="dark:text-gray-400 text-gray-500">
                                          {ex?.en}
                                        </p>
                                      </div>
                                    );
                                  })}
                                </div>
                              ) : null}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ) : null}
                </div>
              );
            })
          : null}
      </div>
    </div>
  );
};

function ChartPageVP({
  children,
  controls,
  lesson,
}: {
  controls?: any;
  children?: any;
  lesson?: any;
}) {
  const [data, setData] = React.useState(() => [...defaultData]);
  const rerender = React.useReducer(() => ({}), {})[1];

  const [isOpen, setIsOpen] = React.useState<boolean>(false);

  const [selectedPinyin, setSelectedPinyin] = usePinyinChartState();

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const filters = usePinyinChartStore((state: any) => state.filters);
  const setFilter = usePinyinChartStore((state: any) => state.setFilter);

  const selectedCharacters = useMemo(() => {
    if (!filters.length) {
      return [];
    }

    return totalCharacters.filter((item: any) => {
      if (item.problemInitial && !item?.levels) {
        return filters?.includes("problem-initial");
      }

      return item?.levels?.some((level: any) => filters?.includes(level));
    });
  }, [totalCharacters, filters]);

  const problemInitials = useMemo(() => {
    if (!filters.length) {
      return [];
    }

    if (filters?.includes("problem-initial")) {
      return totalCharacters.filter((item: any) => {
        return item?.problemInitial;
      });
    }
    return [];
  }, [totalCharacters, filters]);

  const calcRowColor = (val: any, lesson?: any) => {
    if (lesson) {
      // SIMPLE FINALS ===
      if (
        lesson?.levels?.includes("a:simple-final") ||
        lesson?.levels?.includes("e:simple-final") ||
        lesson?.levels?.includes("i:simple-final")
      ) {
        if (val?.levels?.includes("a:simple-final")) {
          // return 'text-cyan-200 border-[1px] dark:border-cyan-200 border-dotted'
          return "text-cyan-200";
        }

        if (val?.levels?.includes("e:simple-final")) {
          // return 'text-emerald-300  border-[1px] dark:border-emerald-300 border-dotted'
          return "text-emerald-300";
        }

        if (val?.levels?.includes("i:simple-final")) {
          // return 'text-indigo-300 border-[1px] dark:border-indigo-300 border-dotted'
          return "text-lime-400";
        }

        return "text-slate-700";
      }

      if (
        lesson?.levels?.includes("o:simple-final") ||
        lesson?.levels?.includes("u:simple-final") ||
        lesson?.levels?.includes("ü:simple-final")
      ) {
        if (val?.levels?.includes("o:simple-final")) {
          // return 'text-cyan-200 border-[1px] dark:border-cyan-200 border-dotted'
          return "text-violet-400";
        }

        if (val?.levels?.includes("u:simple-final")) {
          // return 'text-emerald-300  border-[1px] dark:border-emerald-300 border-dotted'
          return "text-neutral-300";
        }

        if (val?.levels?.includes("ü:simple-final")) {
          // return 'text-indigo-300 border-[1px] dark:border-indigo-300 border-dotted'
          return "text-fuchsia-300";
        }

        return "text-slate-700";
      }

      // SIMPLE FINALS END ===

      // A: COMPOUND FINALS===
      if (
        lesson?.levels?.includes("a:compound-final") ||
        lesson?.levels?.includes("a:nasal-final")
      ) {
        if (
          val?.levels?.includes("a:compound-final") &&
          val?.levels?.includes("a:nasal-final")
        ) {
          return "text-cyan-200 border-[1px] dark:border-cyan-200 underline decoration-dotted";
        }
        if (val?.levels?.includes("a:compound-final")) {
          return "text-cyan-200 border-[1px] dark:border-cyan-200";
        }

        return "text-slate-700";
      }

      // A: COMPOUND FINALS END ===

      // E, O: COMPOUND FINALS ===
      if (
        lesson?.levels?.includes("e:compound-final") ||
        lesson?.levels?.includes("e:nasal-final") ||
        lesson?.levels?.includes("o:compound-final") ||
        lesson?.levels?.includes("o:nasal-final")
      ) {
        if (
          val?.levels?.includes("e:compound-final") &&
          val?.levels?.includes("e:nasal-final")
        ) {
          return "text-emerald-300 border-[1px] dark:border-emerald-300 underline decoration-dotted";
        }
        if (val?.levels?.includes("e:compound-final")) {
          return "text-emerald-300 border-[1px] dark:border-emerald-300";
        }

        if (
          val?.levels?.includes("o:compound-final") &&
          val?.levels?.includes("o:nasal-final")
        ) {
          return "text-violet-400 border-[1px] dark:border-violet-400 underline decoration-dotted";
        }

        if (val?.levels?.includes("o:compound-final")) {
          return "text-violet-400 border-[1px] dark:border-violet-400";
        }
        return "text-slate-700";
      }
      // E, O: COMPOUND FINALS END ===

      // I: COMPOUND FINALS ===
      if (lesson?.levels?.includes("i:compound-final")) {
        if (
          val?.levels?.includes("i:compound-final") &&
          !val?.value?.includes("n")
        ) {
          return "text-lime-400 border-[1px] dark:border-lime-400";
        }

        // if (
        //   val?.levels?.includes('i:compound-final') &&
        //   val?.value?.includes('n')
        // ) {
        //   return 'text-lime-600 border-[1px] dark:border-lime-600'
        // }

        return "text-slate-700";
      }

      // I: NASAL FINALS
      if (lesson?.levels?.includes("i:nasal-final")) {
        if (
          val?.levels?.includes("i:nasal-final") &&
          val?.value?.includes("n")
        ) {
          return "text-lime-400 border-[1px] dark:border-lime-400 underline decoration-dotted";
        }
        if (
          val?.levels?.includes("i:nasal-final") &&
          !val?.value?.includes("n")
        ) {
          return "text-lime-600 border-[1px] dark:border-lime-600 underline decoration-dotted";
        }

        return "text-slate-700";
      }
      // I: NASAL FINAL END ===

      // U: COMPOUND + NASAL FINALS ===
      if (
        lesson?.levels?.includes("u:compound-final") ||
        lesson?.levels?.includes("u:nasal-final")
      ) {
        if (
          val?.levels?.includes("u:compound-final") &&
          val?.levels?.includes("u:nasal-final")
        ) {
          return "text-neutral-300 border-[1px] dark:border-neutral-300 underline decoration-dotted";
        }

        if (val?.levels?.includes("u:compound-final")) {
          return "text-neutral-300 border-[1px] dark:border-neutral-300";
        }
        return "text-slate-700";
      }
      // U: COMPOUND + NASAL FINALS END ===

      // Ü: COMPOUND + NASAL FINALS ===
      if (
        lesson?.levels?.includes("ü:compound-final") ||
        lesson?.levels?.includes("ü:nasal-final")
      ) {
        if (
          val?.levels?.includes("ü:compound-final") &&
          val?.levels?.includes("ü:nasal-final")
        ) {
          return "text-fuchsia-300 border-[1px] dark:border-fuchsia-300 underline decoration-dotted";
        }

        if (val?.levels?.includes("ü:compound-final")) {
          return "text-fuchsia-300 border-[1px] dark:border-fuchsia-300";
        }
        return "text-slate-700";
      }
      // Ü: COMPOUND + NASAL FINALS END ===

      return "text-slate-700";
    }

    // return ''
    // PROBLEM INITIAL
    if (val.problemInitial && filters.includes("problem-initial")) {
      if (
        val?.tonguePos === "roof" &&
        !filters.includes("problem-initial:roof")
      ) {
        return "text-red-500  dark:border-red-300";
      }
      if (
        val?.tonguePos === "middle" &&
        !filters.includes("problem-initial:middle")
      ) {
        if (val.hiss) {
          return "text-orange-500 dark:border-orange-300 italic";
        }
        return "text-orange-500  dark:border-orange-300";
      }
      if (
        val?.tonguePos === "bottom" &&
        !filters.includes("problem-initial:bottom")
      ) {
        return "text-yellow-500  dark:border-yellow-300";
      }
    }
    // ======= SIMPLE FINAL STYLING =======
    // A
    if (
      val?.levels?.includes("a:simple-final") &&
      filters.includes("a:simple-final")
    ) {
      // return 'text-cyan-200 border-[1px] dark:border-cyan-200 border-dotted'
      return "text-cyan-500";
    }
    if (
      val?.levels?.includes("a:compound-final") &&
      val?.levels?.includes("a:nasal-final") &&
      filters.includes("a:simple-final")
    ) {
      return "text-cyan-500 dark:border-cyan-200 underline decoration-dotted";
    }
    if (
      val?.levels?.includes("a:compound-final") &&
      filters.includes("a:simple-final")
    ) {
      return "text-cyan-500  dark:border-cyan-200";
    }

    // A ==== END

    // E
    if (
      val?.levels?.includes("e:simple-final") &&
      filters.includes("e:simple-final")
    ) {
      // return 'text-emerald-300  border-[1px] dark:border-emerald-300 border-dotted'
      return "text-emerald-500";
    }

    if (
      val?.levels?.includes("e:compound-final") &&
      val?.levels?.includes("e:nasal-final") &&
      filters.includes("e:simple-final")
    ) {
      return "text-emerald-500 dark:border-emerald-300 underline decoration-dotted";
    }
    if (
      val?.levels?.includes("e:compound-final") &&
      filters.includes("e:simple-final")
    ) {
      return "text-emerald-500 dark:border-emerald-300";
    }

    // E ==== END

    // O
    if (
      val?.levels?.includes("o:simple-final") &&
      filters.includes("o:simple-final")
    ) {
      return "text-violet-500";
    }

    if (
      val?.levels?.includes("o:compound-final") &&
      val?.levels?.includes("o:nasal-final") &&
      filters.includes("o:simple-final")
    ) {
      return "text-violet-500 dark:border-violet-400 underline decoration-dotted";
    }

    if (
      val?.levels?.includes("o:compound-final") &&
      filters.includes("o:simple-final")
    ) {
      return "text-violet-500 dark:border-violet-400";
    }
    // O ==== END

    // I
    if (
      val?.levels?.includes("i:simple-final") &&
      filters.includes("i:simple-final")
    ) {
      // return 'text-indigo-300 border-[1px] dark:border-indigo-300 border-dotted'
      return "text-lime-500";
    }

    if (
      val?.levels?.includes("i:compound-final") &&
      val?.levels?.includes("i:nasal-final") &&
      filters.includes("i:simple-final")
    ) {
      return "text-lime-500  dark:border-lime-400 underline decoration-dotted";
    }

    if (
      val?.levels?.includes("i:compound-final") &&
      filters.includes("i:simple-final")
    ) {
      return "text-lime-500 dark:border-lime-400";
    }
    // I === END

    // U
    if (
      val?.levels?.includes("u:simple-final") &&
      filters.includes("u:simple-final")
    ) {
      return "text-neutral-500";
    }

    if (
      val?.levels?.includes("u:compound-final") &&
      val?.levels?.includes("u:nasal-final") &&
      filters.includes("u:simple-final")
    ) {
      return "text-neutral-500 dark:border-neutral-300 underline decoration-dotted";
    }

    if (
      val?.levels?.includes("u:compound-final") &&
      filters.includes("u:simple-final")
    ) {
      return "text-neutral-500 dark:border-neutral-300";
    }
    // U ==== END
    // Ü
    if (
      val?.levels?.includes("ü:simple-final") &&
      filters.includes("ü:simple-final")
    ) {
      return "text-fuchsia-500";
    }

    if (
      val?.levels?.includes("ü:compound-final") &&
      val?.levels?.includes("ü:nasal-final") &&
      filters.includes("ü:simple-final")
    ) {
      return "text-fuchsia-500 dark:border-fuchsia-300 underline decoration-dotted";
    }

    if (
      val?.levels?.includes("ü:compound-final") &&
      filters.includes("ü:simple-final")
    ) {
      return "text-fuchsia-500 dark:border-fuchsia-300";
    }
    // Ü ==== END
    // ======= SIMPLE FINAL STYLING END =======
    // return ''
    // return calcRowColorLegacy(val)
    return !filters.length
      ? "dark:text-slate-400"
      : "dark:text-slate-500 text-slate-700 font-bold";
  };

  return (
    <div className="margin-auto w-full my-2 text-center flex flex-col items-center justify-center">
      <div className="p-2 w-full">
        {selectedPinyin ? (
          <CharacterDetail />
        ) : (
          <>
            <div className="flex justify-between items-center w-full md:px-12">
              {!lesson ? (
                <div className="mr-[-180px] text-2xl flex space-x-8 font-extralight">
                  <button
                    className={`${
                      filters.includes("a:simple-final")
                        ? "dark:text-slate-200 text-slate-700"
                        : "dark:text-slate-500 text-slate-400"
                    } transition`}
                    onClick={() => {
                      setFilter("a:simple-final");
                      setFilter("a:compound-final");
                    }}
                  >
                    a
                  </button>
                  <button
                    className={`${
                      filters.includes("e:simple-final")
                        ? "dark:text-slate-200 text-slate-700"
                        : "dark:text-slate-500 text-slate-400"
                    } transition`}
                    onClick={() => {
                      setFilter("e:simple-final");
                      setFilter("e:compound-final");
                    }}
                  >
                    e
                  </button>
                  <button
                    className={`${
                      filters.includes("o:simple-final")
                        ? "dark:text-slate-200 text-slate-700"
                        : "dark:text-slate-500 text-slate-400"
                    } transition`}
                    onClick={() => {
                      setFilter("o:simple-final");
                      setFilter("o:compound-final");
                    }}
                  >
                    o
                  </button>
                  <button
                    className={`${
                      filters.includes("i:simple-final")
                        ? "dark:text-slate-200 text-slate-700"
                        : "dark:text-slate-500 text-slate-400"
                    } transition`}
                    onClick={() => {
                      setFilter("i:simple-final");
                      setFilter("i:compound-final");
                    }}
                  >
                    i
                  </button>
                  <button
                    className={`${
                      filters.includes("u:simple-final")
                        ? "dark:text-slate-200 text-slate-700"
                        : "dark:text-slate-500 text-slate-400"
                    } transition`}
                    onClick={() => {
                      setFilter("u:simple-final");
                      setFilter("u:compound-final");
                    }}
                  >
                    u
                  </button>
                  <button
                    className={`${
                      filters.includes("ü:simple-final")
                        ? "dark:text-slate-200 text-slate-700"
                        : "dark:text-slate-500 text-slate-400"
                    } transition`}
                    onClick={() => {
                      setFilter("ü:simple-final");
                      setFilter("ü:compound-final");
                    }}
                  >
                    ü
                  </button>
                  <button
                    className={`${
                      filters.includes("problem-initial")
                        ? "dark:text-slate-200 text-slate-700"
                        : "dark:text-slate-500 text-slate-400"
                    } transition`}
                    onClick={() => {
                      setFilter("problem-initial");
                    }}
                  >
                    pi
                  </button>
                </div>
              ) : controls ? (
                controls
              ) : (
                <div></div>
              )}
              <div className="font-extralight text-slate-800 flex space-x-8 text-md">
                <div className="flex flex-col items-center justify-center">
                  <span>
                    {problemInitials?.length} / {totalProblemInitials?.length}
                  </span>
                  <span className="text-xs">problem initials</span>
                </div>

                <div className="flex flex-col items-center justify-center">
                  <span>
                    {selectedCharacters?.length} / {totalCharacters?.length}
                  </span>
                  <span className="text-xs">characters</span>
                </div>
              </div>
            </div>
            <div className="md:px-16 md:my-8 text-xs">
              <table>
                <thead>
                  {table.getHeaderGroups().map((headerGroup) => (
                    <tr
                      key={headerGroup.id}
                      className="text-gray-700 dark:text-gray-400"
                    >
                      {headerGroup.headers.map((header) => (
                        <th key={header.id} colSpan={header.colSpan}>
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody>
                  {table.getRowModel().rows.map((row) => {
                    return (
                      <tr key={row.id}>
                        {row.getVisibleCells().map((cell) => {
                          const val = cell.getValue() as any;
                          const char = characterDictionary[val?.value || val];

                          return (
                            <td
                              onClick={() => {
                                setSelectedPinyin(cell.getValue());
                              }}
                              role="button"
                              key={cell.id}
                              className={`py-1 px-1 ${
                                val?.levels?.includes("a:compound-final") ||
                                val?.levels?.includes("a:nasal-final") ||
                                val?.levels?.includes("e:nasal-final") ||
                                val?.levels?.includes("i:nasal-final")
                                  ? "font-light"
                                  : "font-light"
                              } hover:bg-gray-200 dark:hover:bg-gray-800 dark:hover:text-white hover:text-gray-800 ${calcRowColor(
                                val,
                                lesson
                              )} transition`}
                            >
                              {flexRender(
                                cell.column.columnDef.cell,
                                cell.getContext()
                              )}

                              {char?.examples?.length ? (
                                <div className="flex mt-1 space-x-1 items-center justify-center">
                                  {char?.examples?.map((example: any) => {
                                    return (
                                      <svg
                                        key={JSON.stringify(example)}
                                        className={`h-1 w-1 ${calculateColor2(
                                          example
                                        )}`}
                                        viewBox="0 0 6 6"
                                        aria-hidden="true"
                                      >
                                        <circle cx={3} cy={3} r={3} />
                                      </svg>
                                    );
                                  })}
                                </div>
                              ) : (
                                <div className="my-2"></div>
                              )}
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </tbody>
                <tfoot>
                  {table.getFooterGroups().map((footerGroup) => (
                    <tr key={footerGroup.id}>
                      {footerGroup.headers.map((header) => (
                        <th key={header.id} colSpan={header.colSpan}>
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.footer,
                                header.getContext()
                              )}
                        </th>
                      ))}
                    </tr>
                  ))}
                </tfoot>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function ChartPage(props: any) {
  return (
    <div>
      <NavBar />
      <ChartPageVP />
    </div>
  );
}

export default ChartPage;
