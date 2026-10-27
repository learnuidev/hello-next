"use client";

import { useMemo, useState } from "react";

import { useListCompatiblesQuery } from "@/domain/compatibles/compatibles.queries";
import {
  CompatibleCharacter,
  CompatibleRadical,
  ListCompatiblesResponse,
} from "@/domain/compatibles/compatibles.types";
import { useGetCurrentLang } from "@/hooks/use-get-current-lang";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Button } from "@/components/ui/button";

// Without a filter a radical like 口 builds hundreds of characters, so the tab
// opens with the head of each list; searching or filtering shows every match.
const PAGE_SIZE = 96;

const ALL_POSITIONS = "all";

const POSITION_ORDER = ["left", "right", "top", "bottom", "inside", "around"];

const POSITION_LABEL: Record<string, string> = {
  left: "left side",
  right: "right side",
  top: "top",
  bottom: "bottom",
  inside: "inside",
  around: "around",
};

const positionLabel = (position: string | null, fallback = "position unknown") =>
  (position && POSITION_LABEL[position]) || position || fallback;

// Pinyin is stored with tone marks (xiǎng), and people type it without them,
// so both sides are folded to plain lowercase letters before comparing.
const normalize = (value: string | null) =>
  (value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();

const matchesSearch = (item: CompatibleCharacter, search: string) =>
  !search ||
  [item.character, item.pinyin, item.meaning].some((value) =>
    normalize(value).includes(search),
  );

type SortKey = "default" | "pinyin" | "character" | "position" | "meaning";
type SortDirection = "asc" | "desc";

const SORT_OPTIONS: { value: SortKey; label: string }[] = [
  { value: "default", label: "Default order" },
  { value: "position", label: "Position" },
  { value: "pinyin", label: "Pinyin A–Z" },
  { value: "character", label: "Character" },
  { value: "meaning", label: "Meaning A–Z" },
];

const POSITION_RANK: Record<string, number> = {
  left: 0,
  right: 1,
  top: 2,
  bottom: 3,
  inside: 4,
  around: 5,
};

// zh collation sorts hanzi by pinyin, so "character" is a pinyin-ish reading order.
const collator = new Intl.Collator("zh-Hans", {
  sensitivity: "base",
  numeric: true,
});

const sortValue = (item: CompatibleCharacter, key: SortKey): string | null => {
  if (key === "pinyin") {
    return item.pinyin ? normalize(item.pinyin) : null;
  }

  if (key === "meaning") {
    return item.meaning ? normalize(item.meaning) : null;
  }

  if (key === "character") {
    return item.character;
  }

  return null;
};

const missingValue = (item: CompatibleCharacter, key: SortKey) =>
  key === "position" ? !item.position : sortValue(item, key) === null;

const compareValues = (a: CompatibleCharacter, b: CompatibleCharacter, key: SortKey) => {
  if (key === "position") {
    const rankA = POSITION_RANK[a.position as string] ?? POSITION_ORDER.length;
    const rankB = POSITION_RANK[b.position as string] ?? POSITION_ORDER.length;

    if (rankA !== rankB) {
      return rankA - rankB;
    }

    // inside one position, read the characters in pinyin order
    return collator.compare(
      normalize(a.pinyin) || a.character,
      normalize(b.pinyin) || b.character,
    );
  }

  return collator.compare(
    sortValue(a, key) || "",
    sortValue(b, key) || "",
  );
};

// Purely client-side: each radical's characters are re-ordered from the list the
// API already returned. Entries with nothing to sort on (no pinyin, no meaning)
// stay at the end in both directions.
const sortCompatibles = (
  items: CompatibleCharacter[],
  key: SortKey,
  direction: SortDirection,
) => {
  if (key === "default") {
    return items;
  }

  return [...items].sort((a, b) => {
    const aMissing = missingValue(a, key);
    const bMissing = missingValue(b, key);

    if (aMissing || bMissing) {
      return aMissing === bMissing ? 0 : aMissing ? 1 : -1;
    }

    const comparison = compareValues(a, b, key);

    return direction === "asc" ? comparison : -comparison;
  });
};

export const CompatiblesView = ({ characterId }: { characterId: string }) => {
  const router = useRouter();
  const lang = useGetCurrentLang();

  const [query, setQuery] = useState("");
  const [positionFilter, setPositionFilter] = useState<string>(ALL_POSITIONS);
  const [sortKey, setSortKey] = useState<SortKey>("default");
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const { data, isLoading, error } = useListCompatiblesQuery({
    characterId,
  });

  const response = data as ListCompatiblesResponse | undefined;
  const character = response?.character;
  const parts = useMemo(() => response?.parts || [], [response]);

  // Everything below — search, position filtering, sorting and the visible
  // slice — is derived from the list this component already holds. No hook or
  // effect here touches the network, so typing and re-sorting are instant and
  // offline-safe once the character's list has loaded.
  const search = normalize(query.trim());
  const isFiltering = Boolean(search) || positionFilter !== ALL_POSITIONS;

  // Only positions that actually occur, so the filter never offers a dead end.
  const positions = useMemo(() => {
    const found = new Set<string>();

    parts.forEach((part) =>
      part.compatibles.forEach((item) => {
        if (item.position) {
          found.add(item.position);
        }
      }),
    );

    return POSITION_ORDER.filter((position) => found.has(position));
  }, [parts]);

  const filtered = useMemo(
    () =>
      parts.map((part) => ({
        ...part,
        visible: part.compatibles.filter(
          (item) =>
            (positionFilter === ALL_POSITIONS ||
              item.position === positionFilter) &&
            matchesSearch(item, search),
        ),
      })),
    [parts, positionFilter, search],
  );

  const sections = useMemo(
    () =>
      filtered.map((part) => ({
        ...part,
        visible: sortCompatibles(part.visible, sortKey, sortDirection),
      })),
    [filtered, sortKey, sortDirection],
  );

  const matchCount = filtered.reduce(
    (total, part) => total + part.visible.length,
    0,
  );

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 dark:border-white"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 py-4">
        Error loading compatibles:{" "}
        {error instanceof Error ? error.message : "Unknown error"}
      </div>
    );
  }

  if (!parts.length) {
    return (
      <div className="text-gray-500 py-4">
        No compatible radicals found for this character.
      </div>
    );
  }

  return (
    <div className="space-y-8 py-4">
      <header className="flex items-start gap-4 border-b border-gray-200 dark:border-gray-700 pb-4">
        <div className="text-6xl leading-none dark:text-white text-black">
          {character?.hanzi || characterId}
        </div>

        <div className="min-w-0">
          <div className="text-sm uppercase tracking-wide text-gray-500">
            {character?.pinyin || "—"}
          </div>
          <div className="text-base dark:text-gray-300 text-gray-700 truncate">
            {character?.meaning || "no meaning"}
          </div>

          <div className="mt-1 text-xs text-gray-500">
            {parts
              .map(
                (part) =>
                  `${part.radical} (${positionLabel(
                    part.position,
                    part.radical === characterId
                      ? "the character itself"
                      : "position unknown",
                  )})`,
              )
              .join("  +  ")}
          </div>
        </div>
      </header>

      <div className="space-y-3">
        <Input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search character, pinyin or meaning…"
          className="max-w-md"
        />

        <div className="flex flex-wrap items-center gap-2">
          {[ALL_POSITIONS, ...positions].map((position) => {
            const isActive = positionFilter === position;

            return (
              <button
                key={position}
                onClick={() => setPositionFilter(position)}
                className={cn(
                  "rounded-full border px-3 py-1 text-xs transition-colors",
                  isActive
                    ? "border-black dark:border-white bg-black text-white dark:bg-white dark:text-black"
                    : "border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800",
                )}
              >
                {position === ALL_POSITIONS
                  ? "All positions"
                  : positionLabel(position)}
              </button>
            );
          })}

          {isFiltering && (
            <button
              onClick={() => {
                setQuery("");
                setPositionFilter(ALL_POSITIONS);
              }}
              className="text-xs text-gray-500 underline"
            >
              Clear
            </button>
          )}

          <div className="ml-auto text-xs text-gray-500">
            {isFiltering
              ? `${matchCount} matching ${
                  matchCount === 1 ? "character" : "characters"
                }`
              : `${parts.length} radical${parts.length === 1 ? "" : "s"}`}
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs uppercase tracking-wide text-gray-500">
            Sort
          </span>

          <Select
            value={sortKey}
            onValueChange={(value) => setSortKey(value as SortKey)}
          >
            <SelectTrigger className="h-8 w-[170px] text-xs">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              {SORT_OPTIONS.map((option) => (
                <SelectItem
                  key={option.value}
                  value={option.value}
                  className="text-xs"
                >
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button
            variant="outline"
            size="sm"
            disabled={sortKey === "default"}
            onClick={() =>
              setSortDirection((current) => (current === "asc" ? "desc" : "asc"))
            }
            className="h-8 px-2 text-xs"
            title={
              sortDirection === "asc"
                ? "Ascending — click for descending"
                : "Descending — click for ascending"
            }
          >
            {sortDirection === "asc" ? "↑ Asc" : "↓ Desc"}
          </Button>

          {sortKey !== "default" && (
            <button
              onClick={() => {
                setSortKey("default");
                setSortDirection("asc");
              }}
              className="text-xs text-gray-500 underline"
            >
              Reset order
            </button>
          )}
        </div>
      </div>

      {isFiltering && matchCount === 0 && (
        <div className="text-gray-500 py-4">
          No characters match this search.
        </div>
      )}

      {sections
        .filter((part) => part.visible.length > 0)
        .map((part: CompatibleRadical & { visible: CompatibleCharacter[] }) => {
          const isTheCharacterItself = part.radical === characterId;
          const isExpanded = expanded[part.radical] || isFiltering;
          const shown = isExpanded
            ? part.visible
            : part.visible.slice(0, PAGE_SIZE);

          return (
            <section key={part.radical}>
              <div className="flex items-center gap-4">
                <div className="text-5xl dark:text-white text-black">
                  {part.radical}
                </div>

                <div className="min-w-0">
                  <div className="text-base dark:text-gray-300 text-gray-700 truncate">
                    {part.meaning || "no meaning"}
                  </div>
                  <div className="text-xs uppercase tracking-wide text-gray-500">
                    {positionLabel(
                      part.position,
                      isTheCharacterItself
                        ? "the character itself"
                        : "position unknown",
                    )}
                  </div>
                </div>

                <div className="ml-auto shrink-0 text-sm text-gray-500">
                  {isFiltering
                    ? `${part.visible.length} of ${part.count}`
                    : part.count}{" "}
                  {part.count === 1 ? "character" : "characters"}
                </div>
              </div>

              <div className="mt-3 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
                {shown.map((item: CompatibleCharacter) => {
                  const isCurrent = item.character === characterId;

                  return (
                    <button
                      key={`${part.radical}-${item.character}`}
                      onClick={() =>
                        router.push(
                          `/nmm/${item.character}?lang=${lang || "zh"}`,
                        )
                      }
                      className={cn(
                        "rounded-xl border p-3 text-left transition-colors min-w-0",
                        "hover:bg-gray-100 dark:hover:bg-gray-800",
                        isCurrent
                          ? "border-black dark:border-white bg-gray-100 dark:bg-gray-800"
                          : "border-gray-200 dark:border-gray-700",
                      )}
                    >
                      <div className="flex items-baseline gap-2">
                        <div className="text-2xl dark:text-white text-black leading-none">
                          {item.character}
                        </div>

                        <div
                          className="ml-auto shrink-0 text-[10px] uppercase tracking-wide text-gray-400"
                          title={`${part.radical} is on the ${
                            item.position || "unknown"
                          } of ${item.character}`}
                        >
                          {item.position || "—"}
                        </div>
                      </div>

                      <div className="mt-1 text-xs text-gray-500 truncate">
                        {item.pinyin || "—"}
                      </div>

                      <div
                        className="mt-1 text-[11px] dark:text-gray-400 text-gray-600 truncate"
                        title={item.meaning || undefined}
                      >
                        {item.meaning || "—"}
                      </div>
                    </button>
                  );
                })}
              </div>

              {!isFiltering && part.visible.length > PAGE_SIZE && (
                <button
                  onClick={() =>
                    setExpanded((current) => ({
                      ...current,
                      [part.radical]: !isExpanded,
                    }))
                  }
                  className="mt-2 text-xs text-gray-500 underline"
                >
                  {isExpanded
                    ? "Show fewer"
                    : `Show all ${part.visible.length}`}
                </button>
              )}
            </section>
          );
        })}
    </div>
  );
};
