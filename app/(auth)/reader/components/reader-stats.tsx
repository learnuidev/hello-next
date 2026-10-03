"use client";

import { NmmListContainerAll } from "@/components/nmm-list-container-all";
import { Icons } from "@/components/ui/icons.v2";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { getNmmLink } from "@/libs/utils/get-nmm-link";
import Link from "next/link";
import { useMemo } from "react";

import {
  ReaderStatsDisplayMode,
  ReaderStatsFrequencySort,
  ReaderStatsViewType,
  useReaderStatsSettings,
} from "../hooks/use-reader-stats-settings";
import { getReaderPinyin } from "../utils/get-reader-pinyin";
import { ReaderFrequencyItem, getReaderStats } from "../utils/get-reader-stats";

/** Nothing worth scrolling past a few screens of tiles or rows. */
const MAX_TILES = 120;
const MAX_ROWS = 100;

/**
 * One character (or word) of the text, laid out like the tiles of a lesson's
 * analytics in nmm: its reading above, the character itself, how often the text
 * uses it — and a link into nmm to look it up.
 */
const ReaderStatsTile = ({
  item,
  pinyin,
  lang,
  className,
}: {
  item: ReaderFrequencyItem;
  pinyin?: string;
  lang: string;
  className?: string;
}) => (
  <div className="p-2 md:p-3 flex flex-col items-center justify-center">
    <p className="text-xs text-gray-400 dark:text-gray-600 w-28 text-center truncate h-4">
      {pinyin || ""}
    </p>

    <Link
      href={getNmmLink({ id: item.input, lang })}
      className={cn(
        "text-center transition w-28 truncate text-gray-700 dark:text-gray-300 hover:text-rose-400 dark:hover:text-white",
        className,
      )}
    >
      {item.input}
      <sub className="text-xs pl-[2px] text-gray-400 dark:text-gray-600">
        {item.frequency}
      </sub>
    </Link>
  </div>
);

/** The same thing as a row, the way nmm lists its words. */
const ReaderStatsRow = ({
  item,
  pinyin,
  lang,
}: {
  item: ReaderFrequencyItem;
  pinyin?: string;
  lang: string;
}) => {
  const itemIsLong = item.input.length > 8;
  const pinyinGoesAbove = (pinyin || "").length >= 8;

  return (
    <Link href={getNmmLink({ id: item.input, lang })} className="block">
      <div className="flex items-start w-full justify-between flex-wrap truncate">
        <div className="truncate">
          {pinyinGoesAbove && (
            <p className="text-lg text-gray-400 truncate font-extralight">
              {pinyin}
            </p>
          )}

          <h1 className="truncate font-light">
            <span
              className={cn(
                "truncate",
                itemIsLong ? "text-lg" : "text-2xl sm:text-4xl",
              )}
            >
              {item.input}
            </span>

            {!pinyinGoesAbove && !!pinyin && (
              <span className="text-xl text-gray-400 truncate font-extralight">
                {" "}
                {pinyin}
              </span>
            )}
          </h1>
        </div>

        <p className="text-sm text-gray-500 font-extralight pt-2">
          {item.frequency}×
        </p>
      </div>
    </Link>
  );
};

/**
 * What the text is made of, in the shape of a lesson's analytics in nmm: the
 * totals across the top, a bar to switch between characters and words, how they
 * sort and whether they are a grid of tiles or a list — then the thing itself.
 *
 * Everything is counted from the text, in the browser: no API, no lesson.
 */
export const ReaderStats = ({ text, lang }: { text: string; lang: string }) => {
  const stats = useMemo(() => getReaderStats({ text, lang }), [text, lang]);

  const viewType = useReaderStatsSettings((state) => state.viewType) as
    | ReaderStatsViewType
    | undefined;
  const setViewType = useReaderStatsSettings((state) => state.setViewType);
  const displayMode = useReaderStatsSettings((state) => state.displayMode) as
    | ReaderStatsDisplayMode
    | undefined;
  const setDisplayMode = useReaderStatsSettings(
    (state) => state.setDisplayMode,
  );
  const frequencySort = useReaderStatsSettings(
    (state) => state.frequencySort,
  ) as ReaderStatsFrequencySort | undefined;
  const setFrequencySort = useReaderStatsSettings(
    (state) => state.setFrequencySort,
  );

  const sortedItems = useMemo(() => {
    const items =
      viewType === "word"
        ? stats.wordsByFrequency
        : stats.charactersByFrequency;

    if (frequencySort === "most") {
      return [...items].sort(
        (first, second) => second.frequency - first.frequency,
      );
    }

    if (frequencySort === "least") {
      return [...items].sort(
        (first, second) => first.frequency - second.frequency,
      );
    }

    // "As they appear": the order the counting kept, i.e. the text's own.
    return items;
  }, [stats, viewType, frequencySort]);

  const visibleItems = sortedItems.slice(
    0,
    displayMode === "list" ? MAX_ROWS : MAX_TILES,
  );

  // Readings are local (pinyin-pro) and only make sense for a Chinese text.
  const pinyinByInput = useMemo(() => {
    const readings = new Map<string, string>();

    if (lang !== "zh") {
      return readings;
    }

    visibleItems.forEach((item) => {
      readings.set(item.input, getReaderPinyin(item.input));
    });

    return readings;
  }, [visibleItems, lang]);

  const isGrid = displayMode !== "list";

  return (
    <div className="w-full my-4 md:my-8">
      <div className="flex flex-row justify-between w-full flex-wrap">
        <div className="flex justify-start space-x-4 sm:space-x-16 flex-wrap">
          <h2 className="text-xl sm:text-3xl my-4 font-extralight text-gray-500 dark:text-gray-300">
            {stats.totalWords}{" "}
            <span className="text-sm md:text-xl">total </span>
          </h2>

          <h2 className="text-xl sm:text-3xl my-4 font-extralight text-gray-500 dark:text-gray-300 space-x-2">
            <span className="text-yellow-500">{stats.uniqueWords}</span>
            <span className="text-sm md:text-xl">unique </span>
          </h2>

          <h2 className="text-xl sm:text-3xl my-4 font-extralight text-gray-500 dark:text-gray-300 space-x-2">
            {stats.sentences}
            <span className="text-sm md:text-xl ml-1">sentences </span>
          </h2>
        </div>

        <div className="flex space-x-2 sm:space-x-8">
          <h2 className="text-lg sm:text-3xl my-4 font-extralight text-gray-500 dark:text-gray-300 space-x-2">
            <span>
              <Icons.seedling />
            </span>
            <span className="text-gray-300">{stats.uniqueCharacters}</span>
          </h2>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center my-8 gap-4">
        <div className="flex space-x-8">
          <button
            title="Characters"
            onClick={() => {
              setViewType("character");
            }}
            className={cn(
              viewType === "character"
                ? "text-gray-800 dark:text-white"
                : "text-gray-500",
              "px-0 transition",
            )}
          >
            <Icons.seedling className="text-xl md:text-2xl" />
          </button>

          <button
            title="Words"
            onClick={() => {
              setViewType("word");
            }}
            className={cn(
              viewType === "word" ? "text-gray-800 dark:text-white" : "text-gray-500",
              "px-0 transition",
            )}
          >
            <Icons.tree className="text-xl md:text-2xl" />
          </button>
        </div>

        <div className="flex gap-8 flex-wrap">
          <Select
            value={frequencySort || "most"}
            onValueChange={(value) => {
              setFrequencySort(value as ReaderStatsFrequencySort);
            }}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="most">Most frequent</SelectItem>
              <SelectItem value="least">Least frequent</SelectItem>
              <SelectItem value="none">As they appear</SelectItem>
            </SelectContent>
          </Select>

          <div className="flex flex-row gap-4">
            <button
              title="Grid"
              onClick={() => {
                setDisplayMode("grid");
              }}
              className={cn(
                displayMode !== "list"
                  ? "text-gray-800 dark:text-white"
                  : "text-gray-500",
                "px-0 transition",
              )}
            >
              <Icons.apps className="text-xl md:text-2xl" />
            </button>

            <button
              title="List"
              onClick={() => {
                setDisplayMode("list");
              }}
              className={cn(
                displayMode === "list"
                  ? "text-gray-800 dark:text-white"
                  : "text-gray-500",
                "px-0 transition",
              )}
            >
              <Icons.list className="text-xl md:text-2xl" />
            </button>
          </div>
        </div>
      </div>

      {visibleItems.length === 0 ? (
        <p className="my-16 text-center text-gray-500 font-extralight">
          There is nothing to count in this text.
        </p>
      ) : isGrid ? (
        <NmmListContainerAll className="md:mx-0 mb-32">
          {visibleItems.map((item) => (
            <ReaderStatsTile
              key={item.input}
              item={item}
              pinyin={pinyinByInput.get(item.input)}
              lang={lang}
              className={viewType === "word" ? "!text-xl" : "text-2xl"}
            />
          ))}
        </NmmListContainerAll>
      ) : (
        <section className="space-y-12 mt-12 pb-32">
          {visibleItems.map((item) => (
            <ReaderStatsRow
              key={item.input}
              item={item}
              pinyin={pinyinByInput.get(item.input)}
              lang={lang}
            />
          ))}
        </section>
      )}

      {sortedItems.length > visibleItems.length && (
        <p className="text-center text-xs text-gray-500 pb-16">
          <span>Showing the first </span>
          <span>{visibleItems.length}</span>
          <span> of </span>
          <span>{sortedItems.length}</span>
        </p>
      )}
    </div>
  );
};
