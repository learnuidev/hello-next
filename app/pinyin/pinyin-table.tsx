"use client";
import React, { useMemo } from "react";
import { groupBy } from "ramda";

import { usePinyinChartStore } from "./state";

import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { characterDictionary, defaultData } from "./data";

import { PinyinDetail } from "./pinyin-detail";
import { pinyinColumns } from "./pinyin-columns";
import { useListComponents } from "@/domain/lesson/component.queries";
import { useSearchQueryStore } from "@/components/search/state";

import { useListCharactersQuery } from "@/domain/lesson/character.queries";
import { useQuery } from "@tanstack/react-query";
import { getGroup } from "../(auth)/hmm/get-group";
// import { legacyData } from "./data";
import { cn } from "@/lib/utils";
import { filterComponents } from "../nmm/nmm-utils/filter-components";
import { getHumanPinyin } from "../nmm/nmm-utils/get-human-pinyin";
import { useRouter, useSearchParams } from "next/navigation";
import { chineseCharacters } from "@/langs/chinese /characters";

const totalCharacters = defaultData
  ?.map((val: any) => Object.values(val))
  .flat()
  .filter((val: any) => val?.value);

const totalProblemInitials = defaultData
  ?.map((val: any) => Object.values(val))
  .flat()
  .filter((val: any) => val?.value && val?.problemInitial);

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

function useFilterComponents(query: string) {
  const { data: learnedCharacters2 } = useListCharactersQuery();
  const { data: components, isLoading: isComponentsLoading } =
    useListComponents({ includeAll: true });

  return useQuery({
    queryKey: ["filter-components", query],
    queryFn: async () => {
      if (!query) {
        return [];
      }
      const filteredComponents = filterComponents({
        components,
        query,
        characters: learnedCharacters2,
      });

      return filteredComponents;
    },
  });
}

export function PinyinTable({
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
  const querySync = useSearchQueryStore((state) => state.query);
  const router = useRouter();

  const [isOpen, setIsOpen] = React.useState<boolean>(false);

  const searchParams = useSearchParams();
  const selectedPinyin = searchParams.get("selected-pinyin");

  // const [selectedPinyin, setSelectedPinyin] = usePinyinChartState();

  const table = useReactTable({
    data,
    columns: pinyinColumns,
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
  }, [filters]);

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
  }, [filters]);

  const { data: filteredComponents } = useFilterComponents(querySync);

  const { data: chineseComponents2 } = useListComponents({ includeAll: true });
  const { data: chineseChars } = useListCharactersQuery();

  const chineseComponents = chineseComponents2 || chineseCharacters;

  const activePinyinSounds = useMemo(
    () =>
      groupBy((item: any) => item?.humanPinyin)(
        chineseChars?.map((comp: any) => {
          return {
            ...comp,
            humanPinyin: getHumanPinyin(comp) || comp?.group,
          };
        }) || []
      ),
    [chineseChars]
  );
  const activePinyinComponentSounds = useMemo(
    () =>
      groupBy((item: any) => item?.humanPinyin)(
        chineseComponents
          // ?.filter(
          //   (comp: any) => comp?.hanzi?.length === 1 && comp?.level <= 3500
          // )
          ?.filter((comp: any) => comp?.hanzi?.length === 1)
          ?.map((comp: any) => {
            return {
              ...comp,
              humanPinyin: getHumanPinyin(comp) || comp?.group,
            };
          }) || []
      ),
    [chineseComponents]
  );

  const calcRowColor = (val: any, lesson?: any, querySync?: string) => {
    // console.log("VAL", val);

    if (typeof val === "string") {
      return "text-gray-600";
    }

    if (!querySync && !activePinyinSounds?.[val?.value]) {
      return "text-gray-600";
    }
    const chineseChars =
      querySync
        ?.split("")
        ?.map((item) => {
          return chineseComponents?.filter(
            (comp: any) => comp?.hanzi === item
          )?.[0];
        })
        ?.filter(Boolean) || [];

    const isHanzi = chineseChars?.length > 0;

    if (isHanzi) {
      const groups = chineseChars?.map((char) => getGroup(char));

      if (groups?.includes(val?.value)) {
        return "text-white";
      }
      // console.log("=======================================");
      // console.log("FILTERED COMPONENTS", filteredComponents);
      // console.log("CHINESE CHARS", chineseChars);
      // console.log("VAL", val);
      // console.log("IS HANZI", isHanzi);
      // console.log("=======================================");
    }

    if (querySync && val?.value?.includes(querySync?.toLowerCase())) {
      return "text-white";
    }

    const containsGroup = filteredComponents?.filter(
      (comp: any) =>
        (comp?.en === querySync ||
          comp?.en?.split(" ")?.includes(querySync) ||
          comp?.en?.split("/")?.includes(querySync) ||
          comp?.en?.split(",")?.includes(querySync)) &&
        val?.value === comp?.group

      // comp?.en?.includes(querySync)
    )?.[0];

    if (containsGroup) {
      return "text-white";
    }

    if (querySync && !val?.value?.includes(querySync?.toLowerCase())) {
      return "text-gray-800";
    }

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
    if (val?.problemInitial && filters.includes("problem-initial")) {
      if (
        val?.tonguePos === "roof" &&
        !filters.includes("problem-initial:roof")
      ) {
        return "text-red-400  dark:border-red-300";
      }
      if (
        val?.tonguePos === "middle" &&
        !filters.includes("problem-initial:middle")
      ) {
        if (val.hiss) {
          return "text-orange-500 dark:border-orange-300 italic";
        }
        return "text-orange-400  dark:border-orange-300";
      }
      if (
        val?.tonguePos === "bottom" &&
        !filters.includes("problem-initial:bottom")
      ) {
        return "text-yellow-400  dark:border-yellow-300";
      }
    }
    // ======= SIMPLE FINAL STYLING =======
    // A
    if (
      val?.levels?.includes("a:simple-final") &&
      filters.includes("a:simple-final")
    ) {
      // return 'text-cyan-200 border-[1px] dark:border-cyan-200 border-dotted'
      return "text-cyan-400";
    }
    if (
      val?.levels?.includes("a:compound-final") &&
      val?.levels?.includes("a:nasal-final") &&
      filters.includes("a:simple-final")
    ) {
      return "text-cyan-400 dark:border-cyan-200 underline decoration-dotted";
    }
    if (
      val?.levels?.includes("a:compound-final") &&
      filters.includes("a:simple-final")
    ) {
      return "text-cyan-400  dark:border-cyan-200";
    }

    // A ==== END

    // E
    if (
      val?.levels?.includes("e:simple-final") &&
      filters.includes("e:simple-final")
    ) {
      // return 'text-emerald-300  border-[1px] dark:border-emerald-300 border-dotted'
      return "text-emerald-400";
    }

    if (
      val?.levels?.includes("e:compound-final") &&
      val?.levels?.includes("e:nasal-final") &&
      filters.includes("e:simple-final")
    ) {
      return "text-emerald-400 dark:border-emerald-300 underline decoration-dotted";
    }
    if (
      val?.levels?.includes("e:compound-final") &&
      filters.includes("e:simple-final")
    ) {
      return "text-emerald-400 dark:border-emerald-300";
    }

    // E ==== END

    // O
    if (
      val?.levels?.includes("o:simple-final") &&
      filters.includes("o:simple-final")
    ) {
      return "text-violet-400";
    }

    if (
      val?.levels?.includes("o:compound-final") &&
      val?.levels?.includes("o:nasal-final") &&
      filters.includes("o:simple-final")
    ) {
      return "text-violet-400 dark:border-violet-400 underline decoration-dotted";
    }

    if (
      val?.levels?.includes("o:compound-final") &&
      filters.includes("o:simple-final")
    ) {
      return "text-violet-400 dark:border-violet-400";
    }
    // O ==== END

    // I
    if (
      val?.levels?.includes("i:simple-final") &&
      filters.includes("i:simple-final")
    ) {
      // return 'text-indigo-300 border-[1px] dark:border-indigo-300 border-dotted'
      return "text-lime-400";
    }

    if (
      val?.levels?.includes("i:compound-final") &&
      val?.levels?.includes("i:nasal-final") &&
      filters.includes("i:simple-final")
    ) {
      return "text-lime-400  dark:border-lime-400 underline decoration-dotted";
    }

    if (
      val?.levels?.includes("i:compound-final") &&
      filters.includes("i:simple-final")
    ) {
      return "text-lime-400 dark:border-lime-400";
    }
    // I === END

    // U
    if (
      val?.levels?.includes("u:simple-final") &&
      filters.includes("u:simple-final")
    ) {
      return "text-rose-400";
    }

    if (
      val?.levels?.includes("u:compound-final") &&
      val?.levels?.includes("u:nasal-final") &&
      filters.includes("u:simple-final")
    ) {
      return "text-rose-400 dark:border-neutral-300 underline decoration-dotted";
    }

    if (
      val?.levels?.includes("u:compound-final") &&
      filters.includes("u:simple-final")
    ) {
      return "text-rose-400 dark:border-neutral-300";
    }
    // U ==== END
    // Ü
    if (
      val?.levels?.includes("ü:simple-final") &&
      filters.includes("ü:simple-final")
    ) {
      return "text-pink-300";
    }

    if (
      val?.levels?.includes("ü:compound-final") &&
      val?.levels?.includes("ü:nasal-final") &&
      filters.includes("ü:simple-final")
    ) {
      return "text-pink-300 dark:border-fuchsia-300 underline decoration-dotted";
    }

    if (
      val?.levels?.includes("ü:compound-final") &&
      filters.includes("ü:simple-final")
    ) {
      return "text-pink-300 dark:border-fuchsia-300";
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
      <div className="w-full">
        {selectedPinyin ? (
          <PinyinDetail />
        ) : (
          <>
            <div className="fixed sm:right-48 xs:left-12 xs:top-[4px] ml-12 sm:ml-0 sm:top-2">
              <div className="flex w-full flex-col items-start">
                {!lesson ? (
                  <div className="mr-[-180px] text-lg flex space-x-4 font-extralight">
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
              </div>
            </div>

            <div className="fixed right-4 sm:right-60 top-2 font-extralight text-slate-500 flex space-x-8 text-md">
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

            <div className="md:px-12 text-xs mt-12 sm:mt-0">
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

                          // const comps = filterComponentsExact(
                          //   components,
                          //   val?.value
                          // );

                          return (
                            <td
                              onClick={() => {
                                // alert(JSON.stringify(cell.getValue()));
                                router.push(
                                  `/pinyin?selected-pinyin=${(cell.getValue() as any)?.value}`
                                );
                                // setSelectedPinyin(cell.getValue());
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
                                lesson,
                                querySync
                              )} transition`}
                            >
                              <span>
                                {flexRender(
                                  cell.column.columnDef.cell,
                                  cell.getContext()
                                )}
                              </span>

                              {val?.value && (
                                <sup
                                  className={cn(
                                    activePinyinSounds?.[val?.value]?.length
                                      ? "text-gray-600"
                                      : activePinyinComponentSounds?.[
                                            val?.value
                                          ]?.length
                                        ? "text-gray-600"
                                        : "text-black",
                                    "text-[8px] ml-[1px]",
                                    calcRowColor(val, lesson, querySync)
                                  )}
                                >
                                  {activePinyinComponentSounds?.[val?.value]
                                    ?.length || 0}
                                </sup>
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
