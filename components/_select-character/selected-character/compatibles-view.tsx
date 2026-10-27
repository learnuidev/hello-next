"use client";

import { useListCompatiblesQuery } from "@/domain/compatibles/compatibles.queries";
import { CompatibleRadical } from "@/domain/compatibles/compatibles.types";
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

export const CompatiblesView = ({ characterId }: { characterId: string }) => {
  const router = useRouter();
  const lang = useGetCurrentLang();

  const { data, isLoading, error } = useListCompatiblesQuery({
    characterId,
  });

  const parts = (data as CompatibleRadical[]) || [];

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
                  {POSITION_LABEL[part.position as string] ||
                    (isTheCharacterItself ? "the character itself" : "position unknown")}
                </div>
              </div>

              <div className="ml-auto shrink-0 text-sm text-gray-500">
                {part.count} {part.count === 1 ? "character" : "characters"}
              </div>
            </div>

            <div className="mt-3 flex flex-wrap gap-2">
              {visible.map((item: CompatibleRadical["compatibles"][number]) => {
                const isCurrent = item.character === characterId;

                return (
                  <button
                    key={`${part.radical}-${item.character}`}
                    onClick={() =>
                      router.push(`/nmm/${item.character}?lang=${lang || "zh"}`)
                    }
                    className={cn(
                      "rounded-xl border px-3 py-2 text-left transition-colors",
                      "hover:bg-gray-100 dark:hover:bg-gray-800",
                      isCurrent
                        ? "border-black dark:border-white bg-gray-100 dark:bg-gray-800"
                        : "border-gray-200 dark:border-gray-700",
                    )}
                    title={item.meaning || undefined}
                  >
                    <div className="text-2xl dark:text-white text-black leading-none">
                      {item.character}
                    </div>
                    <div className="mt-1 text-xs text-gray-500">
                      {item.pinyin || "—"}
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
