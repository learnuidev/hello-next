import { Icons } from "@/components/ui/icons.v2";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { isNonRomanLang } from "@/components/_select-character/utils/is-non-roman-lang";
import { AnimatedLoadingText } from "@/components/animated-loading-text";
import { useSelectedItem } from "@/components/youtube-page/use-selected-item";
import { useListSentencesQuery } from "@/domain/sentence/sentence.queries";
import { useListDiscoveryQuery } from "@/domain/sentence/use-list-discovery-query";
import { cn } from "@/lib/utils";
import { useState, useEffect, useRef, useCallback } from "react";
import { useContentSearchHistory } from "../hooks/use-content-search-history";
import { useDeleteHistoryMutation } from "@/domain/history/delete-history.mutation";
import { getNmmLink } from "@/libs/utils/get-nmm-link";
import Link from "next/link";
import { formatTime } from "../../_play/utils";

import { useListContentUnknownsQuery } from "@/domain/content-unknowns/use-list-content-unknowns.query";
import { useAddContentUnknownMutation } from "@/domain/content-unknowns/use-add-content-unknown.mutation";
import { useRemoveContentUnknownMutation } from "@/domain/content-unknowns/use-remove-content-unknown.mutation";
import { useCharacterMenuBarStore } from "../hooks/use-character-menu-bar";
import { useGetContentQuery } from "@/domain/content/content.queries";
import { ContentTranscription } from "@/domain/content/content.api";
import {
  getFrequency,
  useGetContentInsightsNew,
} from "../../use-get-content-insights.new";

export function MiniDictionary({
  lang,
  selected,
  className,
  contentId,
  seekAndPlay,
  isMobile,
}: {
  selected: string;
  className?: string;
  contentId?: string;
  lang: string;
  seekAndPlay?: (time: number) => void;
  isMobile?: boolean;
}) {
  const { searchHistory, addSearchHistory } = useContentSearchHistory({
    contentId: contentId || "",
  });

  const { setSelected } = useSelectedItem();

  const { hideMenuBar } = useCharacterMenuBarStore();

  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState<{ x: number; y: number } | null>(
    null,
  );
  const [dragOffset, setDragOffset] = useState<{ x: number; y: number } | null>(
    null,
  );
  const isDragging = useRef(false);

  const onMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if ((e.target as HTMLElement).closest("button, a")) return;
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      isDragging.current = true;
      setDragOffset({
        x: e.clientX - (position?.x || rect.left),
        y: e.clientY - (position?.y || rect.top),
      });
      if (!position) {
        setPosition({ x: rect.left, y: rect.top });
      }
      e.preventDefault();
    },
    [position],
  );

  const onTouchStart = useCallback(
    (e: React.TouchEvent) => {
      if ((e.target as HTMLElement).closest("button, a")) return;
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      isDragging.current = true;
      const touch = e.touches[0];
      setDragOffset({
        x: touch.clientX - (position?.x || rect.left),
        y: touch.clientY - (position?.y || rect.top),
      });
      if (!position) {
        setPosition({ x: rect.left, y: rect.top });
      }
    },
    [position],
  );

  useEffect(() => {
    if (!dragOffset) return;

    function onMouseMove(e: MouseEvent) {
      if (!isDragging.current || !dragOffset) return;
      setPosition({
        x: e.clientX - dragOffset.x,
        y: e.clientY - dragOffset.y,
      });
    }

    function onTouchMove(e: TouchEvent) {
      if (!isDragging.current || !dragOffset) return;
      const touch = e.touches[0];
      setPosition({
        x: touch.clientX - dragOffset.x,
        y: touch.clientY - dragOffset.y,
      });
    }

    function onMouseUp() {
      isDragging.current = false;
      setDragOffset(null);
    }

    function onTouchEnd() {
      isDragging.current = false;
      setDragOffset(null);
    }

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
    document.addEventListener("touchmove", onTouchMove, { passive: false });
    document.addEventListener("touchend", onTouchEnd);
    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("touchmove", onTouchMove);
      document.removeEventListener("touchend", onTouchEnd);
    };
  }, [dragOffset]);

  const addContentUnknownMutation = useAddContentUnknownMutation();
  const removeContentUnknownMutation = useRemoveContentUnknownMutation();

  const { data: contentUnknowns } = useListContentUnknownsQuery(contentId);
  const { data: contentInsights } = useGetContentInsightsNew({
    contentId: contentId || "",
  });
  const { data: content } = useGetContentQuery({
    contentId: contentId || "",
  });

  const frequency = getFrequency({ content: content, input: selected });

  const timesMentioned = contentInsights?.filteredHskWords?.find(
    (word: any) => word?.hanzi === selected,
  );

  const mentionedTranscriptions = content?.transcriptions?.filter(
    (transcription: ContentTranscription) => {
      const searchableFields = [
        transcription.input,
        transcription.hanzi,
        transcription.pinyin,
        transcription.roman,
      ].filter(Boolean);
      return searchableFields.some((field) => field?.includes(selected));
    },
  );

  const containsUnknown = contentUnknowns?.items?.find(
    (item) => item.input === selected,
  );

  const deleteHistoryMutation = useDeleteHistoryMutation();

  const [seeMore, setSeeMore] = useState(false);
  const [seeAllMentions, setSeeAllMentions] = useState(false);
  const { data: sentences, isLoading: isSentencesLoading } =
    useListSentencesQuery({
      component: selected,
      lang,
    });

  const { data, isLoading: isMeaningDiscoveryLoading } = useListDiscoveryQuery({
    content: selected,
    lang,
  });

  const currentSearchItem = searchHistory?.find(
    (item: any) => item?.input === selected,
  );
  const currentIndex = searchHistory?.findIndex(
    (item: any) => item?.input === selected,
  );

  const isFirstIndex = currentIndex === 0;
  const isLastIndex = currentIndex === searchHistory?.length - 1;

  const setPrevious = () => {
    if (searchHistory?.length === 1) {
      return;
    }
    const currentIndex = searchHistory?.findIndex(
      (item: any) => item?.input === selected,
    );

    if (currentIndex === 0 || currentIndex === -1) {
      return;
    }

    const prevIndex = currentIndex - 1;

    const searchItem = searchHistory?.[prevIndex];

    if (searchItem?.input) {
      setSelected(searchItem?.input);
    }
  };

  const setNext = () => {
    if (searchHistory?.length === 1) {
      return;
    }
    const currentIndex = searchHistory?.findIndex(
      (item: any) => item?.input === selected,
    );

    if (currentIndex === -1) {
      return;
    }

    const nextIndex = currentIndex + 1;

    const searchItem = searchHistory?.[nextIndex];

    if (searchItem?.input) {
      setSelected(searchItem?.input);
    }
  };

  const pinyinOrRoman = data?.pinyin || data?.roman;

  return (
    <div
      ref={containerRef}
      onMouseDown={onMouseDown}
      onTouchStart={onTouchStart}
      className={cn(
        "bg-gray-50 dark:bg-[rgb(13,14,15)] rounded p-4 sm:p-8 sm:max-w-xl",
        isMobile
          ? "w-full"
          : position
            ? "fixed z-50 w-[600px]"
            : className || "w-full sm:max-w-[600px] mt-0 sticky top-0",
        !isMobile && position && (dragOffset ? "cursor-grabbing" : "cursor-grab"),
      )}
      style={isMobile ? undefined : (position ? { left: position.x, top: position.y } : undefined)}
    >
      <div className="flex justify-between items-center">
        <div className="flex gap-4">
          <h4 className="text-2xl font-bold">
            <Link
              target="_blank"
              href={getNmmLink({ id: selected, lang, contentId })}
            >
              {selected}
            </Link>
          </h4>

          {containsUnknown ? (
            <button
              disabled={removeContentUnknownMutation.isPending}
              onClick={() => {
                removeContentUnknownMutation.mutateAsync({
                  id: containsUnknown.id,
                  contentId: contentId || "",
                });
              }}
            >
              {removeContentUnknownMutation.isPending ? (
                <Icons.loadingSpinner />
              ) : (
                <Icons.bookmarkSolid />
              )}
            </button>
          ) : (
            <button
              disabled={addContentUnknownMutation.isPending}
              onClick={() => {
                addContentUnknownMutation.mutateAsync({
                  input: selected,
                  contentId: contentId || "",
                });
              }}
            >
              {addContentUnknownMutation.isPending ? (
                <Icons.loadingSpinner />
              ) : (
                <Icons.bookmark />
              )}
            </button>
          )}

          {frequency > 0 && (
            <span className="my-2 dark:text-gray-500">
              <span className="font-semibold text-rose-500">{frequency}</span>{" "}
              mentions
            </span>
          )}
        </div>

        <button
          onClick={() => {
            setSelected(null);
            hideMenuBar();
          }}
        >
          <Icons.xMark className="text-2xl" />
        </button>
      </div>

      {isNonRomanLang(lang) && (
        <p>{pinyinOrRoman ? `${pinyinOrRoman}` : null} </p>
      )}

      {isMeaningDiscoveryLoading ? (
        <div className="my-4">
          <AnimatedLoadingText
            className="text-xl my-8"
            message="loading dictionary..."
          />

          <div className="text-gray-50 dark:text-[rgb(13,14,15)] w-[400px]"></div>
        </div>
      ) : (
        <>
          <p className="text-gray-600 dark:text-gray-400 font-light">
            {data?.en}
          </p>

          {seeMore ? (
            <p className="text-[16px] mt-4 dark:text-gray-300 text-gray-500">
              {data?.explanation ? `${data?.explanation}` : null}
            </p>
          ) : (
            <div>
              <p className="text-[16px] mt-4 dark:text-gray-300 text-gray-500">
                {data?.explanation
                  ? `${data?.explanation?.slice(0, 140)}...`
                  : null}
              </p>
            </div>
          )}

          <div className="text-gray-50 dark:text-[rgb(13,14,15)] w-[400px]"></div>
        </>
      )}

      {seeMore && (
        <div className="mt-8">
          <Tabs defaultValue="mentions">
            <TabsList className="space-x-4 bg-white dark:bg-black">
              <TabsTrigger value="mentions">Mentions</TabsTrigger>
              <TabsTrigger value="sentences">Example Sentences</TabsTrigger>
            </TabsList>

            <TabsContent value="mentions" className="mt-6">
              {mentionedTranscriptions && mentionedTranscriptions.length > 0 ? (
                <div className="space-y-4">
                  {(seeAllMentions
                    ? mentionedTranscriptions
                    : mentionedTranscriptions.slice(0, 3)
                  )?.map(
                    (transcription: ContentTranscription, index: number) => {
                      return (
                        <div
                          key={transcription.id + "-" + index}
                          className="flex gap-3 items-center"
                        >
                          <div className="flex-shrink-0">
                            {seekAndPlay && (
                              <button
                                onClick={() => seekAndPlay(transcription.start)}
                                title="Play from this time"
                              >
                                <Icons.play className="w-4 h-4" />
                              </button>
                            )}
                          </div>
                          <div className="flex-1">
                            <p
                              className={
                                lang === "zh"
                                  ? "text-xl"
                                  : "text-[14px] sm:text-lg"
                              }
                            >
                              {transcription?.hanzi || transcription?.input}
                            </p>
                          </div>
                        </div>
                      );
                    },
                  )}
                  {mentionedTranscriptions.length > 3 && (
                    <button
                      onClick={() => setSeeAllMentions(!seeAllMentions)}
                      className="text-sm text-blue-500 hover:text-blue-600 cursor-pointer"
                    >
                      {seeAllMentions
                        ? "Show less"
                        : `+${mentionedTranscriptions.length - 3} more mentions`}
                    </button>
                  )}
                </div>
              ) : (
                <p className="text-gray-500">No mentions in this content</p>
              )}
            </TabsContent>

            <TabsContent value="sentences" className="mt-6">
              {isSentencesLoading ? (
                <div className="my-4">
                  <AnimatedLoadingText
                    className="text-xl my-8"
                    message="loading sentences..."
                  />
                </div>
              ) : sentences && sentences.length > 0 ? (
                <div className="space-y-4">
                  {sentences?.slice(0, 3)?.map((sentence) => {
                    return (
                      <div key={sentence.id}>
                        {lang === "zh" && isNonRomanLang(lang) && (
                          <p className="text-gray-600 dark:text-gray-400">
                            {sentence?.pinyin || sentence?.roman}
                          </p>
                        )}
                        <p
                          className={
                            lang === "zh"
                              ? "text-2xl"
                              : "text-[16px] sm:text-xl"
                          }
                        >
                          {sentence?.hanzi || sentence?.input}
                        </p>
                        <p className="text-gray-500">{sentence?.en}</p>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p className="text-gray-500">No example sentences available</p>
              )}
            </TabsContent>
          </Tabs>
        </div>
      )}

      <div className="mt-8 text-gray-500">
        {seeMore ? (
          <button
            onClick={() => {
              setSeeMore(false);
            }}
          >
            See Less
          </button>
        ) : (
          <button
            onClick={() => {
              setSeeMore(true);
            }}
          >
            See More
          </button>
        )}
      </div>

      <div className="flex justify-between items-center">
        {searchHistory?.length > 1 && (
          <div className="mt-4 flex gap-4 text-lg">
            <button
              disabled={isFirstIndex}
              className={isFirstIndex ? "text-gray-500" : ""}
              onClick={() => {
                setPrevious();
              }}
            >
              <Icons.back />
            </button>
            <button
              disabled={isLastIndex}
              className={isLastIndex ? "text-gray-500" : ""}
              onClick={() => {
                setNext();
              }}
            >
              <Icons.front />
            </button>
          </div>
        )}

        {currentSearchItem && (
          <button
            className={cn(
              { "text-gray-500": isLastIndex },
              "hover:text-red-500",
            )}
            onDoubleClick={() => {
              deleteHistoryMutation.mutateAsync(currentSearchItem).then(() => {
                setPrevious();
              });
            }}
          >
            <Icons.trash />
          </button>
        )}
      </div>
    </div>
  );
}
