"use client";

import { useListCompatiblesQuery } from "@/domain/compatibles/compatibles.queries";
import {
  CompatibleCharacter,
  CompatibleRadical,
  ListCompatiblesResponse,
} from "@/domain/compatibles/compatibles.types";
import { useGetCurrentLang } from "@/hooks/use-get-current-lang";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

// A radical like 口 builds hundreds of characters; the tab shows the head of
// the list rather than a wall of chips.
const MAX_VISIBLE = 96;

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

export const CompatiblesView = ({ characterId }: { characterId: string }) => {
  const router = useRouter();
  const lang = useGetCurrentLang();

  const { data, isLoading, error } = useListCompatiblesQuery({
    characterId,
  });

  const response = data as ListCompatiblesResponse | undefined;
  const character = response?.character;
  const parts = response?.parts || [];

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
    <div className="space-y-10 py-4">
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

      {parts.map((part: CompatibleRadical) => {
        const visible = part.compatibles.slice(0, MAX_VISIBLE);
        const isTheCharacterItself = part.radical === characterId;

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
                {part.count} {part.count === 1 ? "character" : "characters"}
              </div>
            </div>

            <div className="mt-3 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
              {visible.map((item: CompatibleCharacter) => {
                const isCurrent = item.character === characterId;

                return (
                  <button
                    key={`${part.radical}-${item.character}`}
                    onClick={() =>
                      router.push(`/nmm/${item.character}?lang=${lang || "zh"}`)
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

            {part.count > visible.length && (
              <div className="mt-2 text-xs text-gray-500">
                Showing {visible.length} of {part.count}
              </div>
            )}
          </section>
        );
      })}
    </div>
  );
};
