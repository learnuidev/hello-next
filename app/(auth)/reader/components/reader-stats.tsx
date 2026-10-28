"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useMemo } from "react";

import {
  ReaderStatsFrequencySort,
  ReaderStatsLearnStatus,
  ReaderStatsViewType,
  matchesReaderLearnStatus,
  useReaderStatsSettings,
} from "../hooks/use-reader-stats-settings";
import { readerCard, readerCardFull } from "../reader.styles";
import { getReaderPinyin } from "../utils/get-reader-pinyin";
import { getReaderWordHref } from "../utils/get-reader-word-href";
import { ReaderFrequencyItem, getReaderStats } from "../utils/get-reader-stats";
import { useReaderCharacterMaps } from "./reader-character";

/** Thousands separated, the way a total is read. */
const formatCount = (value: number) => value.toLocaleString("en-US");

type LearnState = "known" | "new" | "forgotten";

/** What the app already knows about a word or a character of the text. */
const getLearnState = (
  input: string,
  learnedCharacters?: Record<string, any>,
): LearnState => {
  const learned = learnedCharacters?.[input];

  if (!learned) {
    return "new";
  }

  return learned.status === "forgotten" ? "forgotten" : "known";
};

/** The badge a word wears when the app has no record of it yet. */
const ReaderNewBadge = () => (
  <span className="shrink-0 rounded-full border border-amber-500/40 px-2 py-[3px] text-[10px] uppercase tracking-wider text-amber-500">
    New
  </span>
);

/** One total of the text. */
const ReaderStat = ({ value, label }: { value: number; label: string }) => (
  <div className="px-5 py-6 sm:px-6">
    <p className="text-2xl font-semibold leading-none tabular-nums text-gray-800 dark:text-gray-100 md:text-3xl">
      {formatCount(value)}
    </p>
    <p className="mt-2 text-xs text-gray-500">{label}</p>
  </div>
);

/** A rate, written the way the app writes percentages elsewhere. */
const formatPercent = (value: number) =>
  new Intl.NumberFormat("en-GB", {
    style: "percent",
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  }).format(Number.isFinite(value) ? value : 0);

/** One of the two rates the progress card reports. */
const ReaderProgressRate = ({
  label,
  value,
}: {
  label: string;
  value: number;
}) => (
  <span className="flex items-baseline gap-2">
    <span className="text-[11px] uppercase tracking-wider text-gray-500">
      {label}
    </span>
    <span className="text-lg font-semibold tabular-nums text-gray-800 dark:text-gray-100">
      {formatPercent(value)}
    </span>
  </span>
);

/**
 * How much of the text's characters are known: one bar split into what is
 * mastered, what is still being learned, and what is new — with the two rates
 * that matter, how far through the text you are and how much of it you have
 * mastered.
 *
 * Characters are the reader's unit of learning, so this is always about them,
 * whichever of the two views is showing.
 *
 * The app marks a character "forgotten" once it has been mastered (that is what
 * the review screen sets when you say you know it), so a record that is not
 * `forgotten` is one still being learned.
 *
 * The two slices the reader knows are drawn as two steps of one gray,
 * darkest-first: mastered is the darkest and learning the palest. In dark mode
 * the scale turns over — there is no dark gray to step further into on a black
 * card, so the ladder climbs towards white instead, mastered becoming the
 * lightest and learning the dimmest.
 *
 * The characters the text has not met yet are not a shade of known at all:
 * that slice is drawn in the card's own colour, white here and black in dark
 * mode, so it reads as the gap the reading still has to fill rather than as a
 * third thing learned.
 */
const ReaderCharacterProgress = ({
  counts,
}: {
  counts: {
    mastered: number;
    learning: number;
    new: number;
    total: number;
    progressRate: number;
    masteryRate: number;
  };
}) => (
  <div className={cn(readerCardFull, "p-5 sm:p-6")}>
    <div className="flex flex-wrap items-baseline justify-between gap-2">
      <h2 className="font-semibold text-gray-800 dark:text-gray-100">
        Character progress
      </h2>

      <p className="text-xs text-gray-500">
        {formatCount(counts.total)} unique characters
      </p>
    </div>

    <div className="mt-4 flex h-2 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-800">
      <div
        className="bg-gray-800 dark:bg-gray-100"
        style={{ width: `${(counts.mastered / (counts.total || 1)) * 100}%` }}
      />
      <div
        className="bg-gray-300 dark:bg-gray-600"
        style={{ width: `${(counts.learning / (counts.total || 1)) * 100}%` }}
      />
      <div
        // "New" is the characters the text has not met yet, so it is the one
        // slice drawn in the page's own colour: white on the light card, black
        // on the dark one. It reads as a gap in the bar rather than as another
        // shade of known.
        className="bg-white dark:bg-black"
        style={{ width: `${(counts.new / (counts.total || 1)) * 100}%` }}
      />
    </div>

    <div className="mt-4 flex flex-wrap items-center justify-between gap-x-6 gap-y-3">
      <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-gray-500">
        <span className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-gray-800 dark:bg-gray-100" />
          <span className="tabular-nums text-gray-700 dark:text-gray-300">
            {formatCount(counts.mastered)}
          </span>
          <span>mastered</span>
        </span>

        <span className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-gray-300 dark:bg-gray-600" />
          <span className="tabular-nums text-gray-700 dark:text-gray-300">
            {formatCount(counts.learning)}
          </span>
          <span>learning</span>
        </span>

        <span className="flex items-center gap-2">
          {/* The dot sits on the card rather than on the bar's gray track, so
              it keeps a hairline edge: white on white would otherwise vanish. */}
          <span className="h-2 w-2 rounded-full bg-white ring-1 ring-gray-300 dark:bg-black dark:ring-gray-700" />
          <span className="tabular-nums text-gray-700 dark:text-gray-300">
            {formatCount(counts.new)}
          </span>
          <span>new</span>
        </span>
      </div>

      <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
        <ReaderProgressRate label="Progress rate" value={counts.progressRate} />
        <ReaderProgressRate label="Mastery rate" value={counts.masteryRate} />
      </div>
    </div>
  </div>
);

/** One switch of the toolbar, in the round style the reader uses. */
const ReaderStatsPill = ({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) => (
  <button
    onClick={onClick}
    className={cn(
      "rounded-full px-4 py-2 text-xs transition",
      active
        ? "bg-white text-gray-800 shadow-sm dark:bg-gray-900 dark:text-white"
        : "text-gray-500 hover:text-rose-400",
    )}
  >
    {children}
  </button>
);

const ReaderStatsTextToggle = ({
  active,
  title,
  onClick,
}: {
  active: boolean;
  title: string;
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    className={cn(
      "px-2 py-1 text-xs transition",
      active
        ? "font-medium text-gray-800 dark:text-white"
        : "text-gray-400 hover:text-rose-400",
    )}
  >
    {title}
  </button>
);

/** One card of the grid: the word, its reading, how often it is used, meaning. */
const ReaderStatsTile = ({
  item,
  lang,
  reading,
  meaning,
  state,
  href,
}: {
  item: ReaderFrequencyItem;
  lang: string;
  reading?: string;
  meaning?: string;
  state: LearnState;
  href: string;
}) => (
  <Link
    href={href}
    className={cn(
      readerCard,
      "block rounded-xl p-4 transition hover:shadow-lg hover:shadow-zinc-900/10 dark:hover:shadow-black/40",
    )}
  >
    <div className="flex items-start justify-between gap-2">
      <div className="min-w-0">
        <p className="truncate text-2xl font-semibold text-gray-800 dark:text-gray-100">
          {item.input}
        </p>
        {!!reading && (
          <p className="truncate text-xs text-gray-500">{reading}</p>
        )}
      </div>

      <div className="flex shrink-0 flex-col items-end gap-1">
        <span className="text-xs tabular-nums text-gray-400">
          {formatCount(item.frequency)}
        </span>
        {state === "new" && <ReaderNewBadge />}
      </div>
    </div>

    {!!meaning && (
      <p className="mt-3 truncate text-sm text-gray-500">{meaning}</p>
    )}
  </Link>
);

/** One row of the list: use count, word, reading, meaning, badge. */
const ReaderStatsRow = ({
  item,
  lang,
  reading,
  meaning,
  state,
  href,
}: {
  item: ReaderFrequencyItem;
  lang: string;
  reading?: string;
  meaning?: string;
  state: LearnState;
  href: string;
}) => (
  <Link
    href={href}
    className="flex items-center gap-4 rounded-xl px-4 py-4 transition hover:bg-gray-100/70 dark:hover:bg-white/5"
  >
    <span className="w-14 shrink-0 text-right text-xs tabular-nums text-gray-400">
      {formatCount(item.frequency)}
    </span>

    <span className="shrink-0 text-2xl font-semibold text-gray-800 dark:text-gray-100">
      {item.input}
    </span>

    {!!reading && (
      <span className="hidden shrink-0 text-sm text-gray-500 sm:inline">
        {reading}
      </span>
    )}

    <span className="ml-auto truncate text-sm text-gray-500">{meaning}</span>

    {state === "new" && <ReaderNewBadge />}
  </Link>
);

/**
 * What the text is made of: the totals, how much of it you already know, and
 * then every word or character in it — as cards, or as a list.
 *
 * Every entry is a way into that word's own page in this text
 * (`getReaderWordHref`), which is where the sentences that say it live.
 *
 * Everything is counted from the text, in the browser: no API, no lesson.
 */
export const ReaderStats = ({
  readerItemId,
  text,
  lang,
  kind,
}: {
  readerItemId: string;
  text: string;
  lang: string;
  /** Which surface the text belongs to; a reader text by default. */
  kind?: "reader" | "convo";
}) => {
  const stats = useMemo(() => getReaderStats({ text, lang }), [text, lang]);

  const viewType = useReaderStatsSettings((state) => state.viewType) as
    | ReaderStatsViewType
    | undefined;
  const setViewType = useReaderStatsSettings((state) => state.setViewType);
  const displayMode = useReaderStatsSettings((state) => state.displayMode) as
    | "grid"
    | "list"
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

  // What the app already knows about the words and characters of this text.
  const { learnedCharacters, components } = useReaderCharacterMaps();

  // "forgotten" is not one of the three pills any more, so it reads as "All".
  const activeLearnStatus: ReaderStatsLearnStatus =
    !learnStatus || learnStatus === "forgotten" ? "all" : learnStatus;

  const allItems = useMemo(
    () =>
      viewType === "word"
        ? stats.wordsByFrequency
        : stats.charactersByFrequency,
    [stats, viewType],
  );

  const sortedItems = useMemo(() => {
    const items = allItems.filter((item) =>
      matchesReaderLearnStatus(
        learnedCharacters?.[item.input],
        activeLearnStatus,
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
  }, [allItems, frequencySort, activeLearnStatus, learnedCharacters]);

  // Progress is counted over the text's characters, whatever the view shows.
  const progress = useMemo(() => {
    let mastered = 0;
    let learning = 0;
    let fresh = 0;

    stats.charactersByFrequency.forEach((item) => {
      const record = learnedCharacters?.[item.input];

      if (!record) {
        fresh += 1;
      } else if (record.status === "forgotten") {
        // The app marks a character "forgotten" once it has been mastered.
        mastered += 1;
      } else {
        learning += 1;
      }
    });

    const total = stats.charactersByFrequency.length;

    return {
      mastered,
      learning,
      new: fresh,
      total,
      // Learned is everything with a record; mastery is the graduated slice.
      progressRate: total ? (mastered + learning) / total : 0,
      masteryRate: total ? mastered / total : 0,
    };
  }, [stats.charactersByFrequency, learnedCharacters]);

  /** The reading of an item, preferring the app's own record of it. */
  const readingOf = (item: ReaderFrequencyItem) =>
    components?.[item.input]?.pinyin || getReaderPinyin(item.input);

  const meaningOf = (item: ReaderFrequencyItem) =>
    components?.[item.input]?.en || "";

  const isGrid = displayMode !== "list";

  return (
    <div className="mt-8 space-y-5">
      {/* The totals, ruled apart inside one card. */}
      <div
        className={cn(
          readerCardFull,
          "grid grid-cols-2 sm:grid-cols-4 sm:divide-x divide-gray-100 dark:divide-gray-800/70",
        )}
      >
        <ReaderStat value={stats.totalWords} label="Total words" />
        <ReaderStat value={stats.totalCharacters} label="Characters" />
        <ReaderStat value={stats.uniqueWords} label="Unique words" />
        <ReaderStat value={stats.sentences} label="Sentences" />
      </div>

      <ReaderCharacterProgress counts={progress} />

      {/* The toolbar: what to show, how it sorts, how it is drawn. */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
        <div
          className={cn(
            readerCard,
            "inline-flex items-center gap-1 rounded-full p-1",
          )}
        >
          <ReaderStatsPill
            active={activeLearnStatus === "all"}
            onClick={() => {
              setLearnStatus("all");
            }}
          >
            All
          </ReaderStatsPill>

          <ReaderStatsPill
            active={activeLearnStatus === "unlearned"}
            onClick={() => {
              setLearnStatus("unlearned");
            }}
          >
            New
          </ReaderStatsPill>

          <ReaderStatsPill
            active={activeLearnStatus === "learned"}
            onClick={() => {
              setLearnStatus("learned");
            }}
          >
            Known
          </ReaderStatsPill>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          {/* What is being counted: the characters of the text, or its words. */}
          <div
            className={cn(
              readerCard,
              "inline-flex items-center gap-1 rounded-full p-1",
            )}
          >
            <ReaderStatsPill
              active={viewType === "character"}
              onClick={() => {
                setViewType("character");
              }}
            >
              Characters
            </ReaderStatsPill>

            <ReaderStatsPill
              active={viewType === "word"}
              onClick={() => {
                setViewType("word");
              }}
            >
              Words
            </ReaderStatsPill>
          </div>

          <Select
            value={frequencySort || "most"}
            onValueChange={(value) => {
              setFrequencySort(value as ReaderStatsFrequencySort);
            }}
          >
            <SelectTrigger className="w-[160px] rounded-full">
              <SelectValue placeholder="Sort" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="most">Most frequent</SelectItem>
              <SelectItem value="least">Least frequent</SelectItem>
              <SelectItem value="none">As they appear</SelectItem>
            </SelectContent>
          </Select>

          <div className="flex items-center gap-1">
            <ReaderStatsTextToggle
              active={isGrid}
              title="Grid"
              onClick={() => {
                setDisplayMode("grid");
              }}
            />
            <ReaderStatsTextToggle
              active={!isGrid}
              title="List"
              onClick={() => {
                setDisplayMode("list");
              }}
            />
          </div>
        </div>
      </div>

      {sortedItems.length === 0 ? (
        <p className="my-20 text-center text-gray-500 font-extralight">
          {activeLearnStatus !== "all"
            ? "Nothing matches this filter."
            : "There is nothing to count in this text."}
        </p>
      ) : isGrid ? (
        <div className="grid grid-cols-2 gap-3 pb-32 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5">
          {sortedItems.map((item) => (
            <ReaderStatsTile
              key={item.input}
              item={item}
              lang={lang}
              reading={readingOf(item)}
              meaning={meaningOf(item)}
              state={getLearnState(item.input, learnedCharacters)}
              href={getReaderWordHref({
                readerItemId,
                word: item.input,
                kind,
                lang,
              })}
            />
          ))}
        </div>
      ) : (
        <div className={cn(readerCardFull, "mb-32 p-2 sm:p-3")}>
          {sortedItems.map((item) => (
            <ReaderStatsRow
              key={item.input}
              item={item}
              lang={lang}
              reading={readingOf(item)}
              meaning={meaningOf(item)}
              state={getLearnState(item.input, learnedCharacters)}
              href={getReaderWordHref({
                readerItemId,
                word: item.input,
                kind,
                lang,
              })}
            />
          ))}
        </div>
      )}
    </div>
  );
};
