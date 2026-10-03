"use client";

import { CharacterItem } from "@/components/_select-character/character-item";
import { HanziLink } from "@/components/hanzi-link";
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
  ReaderStatsLearnStatus,
  ReaderStatsViewType,
  matchesReaderLearnStatus,
  useReaderStatsSettings,
} from "../hooks/use-reader-stats-settings";
import { useReaderCharacterMaps } from "./reader-character";
import { getReaderPinyin } from "../utils/get-reader-pinyin";
import { ReaderFrequencyItem, getReaderStats } from "../utils/get-reader-stats";

/**
 * One character (or word) of the text, in the shape nmm gives one: the app's
 * own `HanziLink`, so a character wears the colour of what it is to you —
 * learned, forgotten or still unknown — with its reading above it (when the
 * reader asks for readings), how often this text uses it, and a way into nmm.
 */
const ReaderStatsTile = ({
  item,
  lang,
}: {
  item: ReaderFrequencyItem;
  lang: string;
}) => (
  <HanziLink
    character={{
      hanzi: item.input,
      input: item.input,
      pinyin: getReaderPinyin(item.input),
      lang,
    }}
    frequency={item.frequency}
    lang={lang}
  />
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
              <CharacterItem
                className={cn(
                  "truncate",
                  itemIsLong ? "text-lg" : "!text-2xl sm:!text-4xl",
                )}
                character={item.input}
              />
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
  const learnStatus = useReaderStatsSettings((state) => state.learnStatus) as
    | ReaderStatsLearnStatus
    | undefined;
  const setLearnStatus = useReaderStatsSettings(
    (state) => state.setLearnStatus,
  );

  // What the app already knows about these characters: it drives both the
  // "new" count of the banner and the learned / not learned filter.
  const { learnedCharacters } = useReaderCharacterMaps();

  /** Characters of this text the app has no record of yet — what is new to you. */
  const newCharacters = useMemo(
    () =>
      stats.charactersByFrequency.filter(
        (item) => !learnedCharacters?.[item.input],
      ).length,
    [stats.charactersByFrequency, learnedCharacters],
  );

  const sortedItems = useMemo(() => {
    const items =
      viewType === "word"
        ? stats.wordsByFrequency
        : stats.charactersByFrequency.filter((item) =>
            matchesReaderLearnStatus(
              learnedCharacters?.[item.input],
              learnStatus || "all",
            ),
          );

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
  }, [stats, viewType, frequencySort, learnStatus, learnedCharacters]);

  const visibleItems = sortedItems;

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
            {" "}
            <span className="text-sm md:text-xl">unique </span>
          </h2>

          <h2 className="text-xl sm:text-3xl my-4 font-extralight text-gray-500 dark:text-gray-300 space-x-2">
            {stats.sentences}
            {" "}
            <span className="text-sm md:text-xl">sentences </span>
          </h2>
        </div>

        <div className="flex space-x-4 sm:space-x-8">
          <h2 className="text-lg sm:text-3xl my-4 font-extralight text-gray-500 dark:text-gray-300 space-x-2">
            <span>
              <Icons.seedling />
            </span>
            {" "}
            <span className="text-gray-300">{stats.uniqueCharacters}</span>
          </h2>

          <h2 className="text-lg sm:text-3xl my-4 font-extralight text-gray-500 dark:text-gray-300 space-x-2">
            <span className="text-yellow-500">{newCharacters}</span>
            {" "}
            <span className="text-sm md:text-xl">new</span>
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
          {viewType !== "word" && (
            <Select
              value={learnStatus || "all"}
              onValueChange={(value) => {
                setLearnStatus(value as ReaderStatsLearnStatus);
              }}
            >
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Learned" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="all">All characters</SelectItem>
                <SelectItem value="learned">Learned</SelectItem>
                <SelectItem value="unlearned">Not learned</SelectItem>
                <SelectItem value="forgotten">Forgotten</SelectItem>
              </SelectContent>
            </Select>
          )}

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
          {viewType !== "word" && (learnStatus || "all") !== "all"
            ? "No characters match this filter."
            : "There is nothing to count in this text."}
        </p>
      ) : isGrid ? (
        <NmmListContainerAll className="md:mx-0 mb-32">
          {visibleItems.map((item) => (
            <ReaderStatsTile key={item.input} item={item} lang={lang} />
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
    </div>
  );
};
