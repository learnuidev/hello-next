import { getSelectedText } from "@/app/review/review-cloze-content/utils/get-selected-text";
import { CharacterItem } from "@/components/_select-character/character-item";
import { useSelectedItem } from "@/components/youtube-page/use-selected-item";
import { smartSplit } from "@/components/youtube-page/utils/smart-split";
import { useListContentUnknownsQuery } from "@/domain/content-unknowns/use-list-content-unknowns.query";
import { ContentTranscription, IContent } from "@/domain/content/content.api";
import { cn } from "@/lib/utils";
import { useCallback, useEffect, useMemo, useRef } from "react";
import { useWindowVirtualizer } from "@tanstack/react-virtual";

export const ParagraphView = ({
  content,
  currentTranscription,
  currentTime,
  seek,
  isPlaying,
}: {
  currentTranscription: ContentTranscription;
  content: IContent;
  currentTime: number;
  isPlaying: boolean;
  seek: (time: number) => void;
}) => {
  const { selected, setSelected } = useSelectedItem();

  const { data: contentUnknowns } = useListContentUnknownsQuery(content.id);

  const parentRef = useRef<HTMLDivElement>(null);
  const userScrolledRef = useRef(false);
  const userScrollTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isAutoScrollingRef = useRef(false);
  const prevActiveIndexRef = useRef<number>(-1);

  const allTranscriptions: ContentTranscription[] = useMemo(
    () => content?.transcriptions || [],
    [content?.transcriptions]
  );

  const virtualizer = useWindowVirtualizer({
    count: allTranscriptions.length,
    estimateSize: () => 80,
    overscan: 5,
    scrollMargin: parentRef.current?.offsetTop ?? 0,
  });

  const handleUserScroll = useCallback(() => {
    if (isAutoScrollingRef.current) return;
    userScrolledRef.current = true;
    if (userScrollTimerRef.current) {
      clearTimeout(userScrollTimerRef.current);
    }
    userScrollTimerRef.current = setTimeout(() => {
      userScrolledRef.current = false;
    }, 5000);
  }, []);

  useEffect(() => {
    if (!isPlaying) return;

    const activeIndex = allTranscriptions.findIndex(
      (t: ContentTranscription) =>
        t.start < currentTime && t.end > currentTime
    );

    if (activeIndex === -1 || activeIndex === prevActiveIndexRef.current) return;
    prevActiveIndexRef.current = activeIndex;

    if (userScrolledRef.current) return;

    isAutoScrollingRef.current = true;
    virtualizer.scrollToIndex(activeIndex, {
      align: "center",
      behavior: "smooth",
    });
    setTimeout(() => {
      isAutoScrollingRef.current = false;
    }, 1000);
  }, [currentTime, isPlaying, allTranscriptions, virtualizer]);

  useEffect(() => {
    window.addEventListener("scroll", handleUserScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleUserScroll);
      if (userScrollTimerRef.current) clearTimeout(userScrollTimerRef.current);
    };
  }, [handleUserScroll]);

  const virtualItems = virtualizer.getVirtualItems();

  return (
    <div className={cn("px-4 pb-24")}>
      <div className="sticky top-0 pt-4 sm:pt-12 pb-[4px] sm:pb-12 bg-gray-50 dark:bg-[rgb(9,10,11)]">
        <div className="pb-4">
          <div
            className={cn(
              `flex justify-between items-center mt-2 w-full`,
              "h-32"
            )}
          >
            <p className="space-x-2 font-extralight pb-[4px] overflow sm:text-xl text-sm">
              {currentTranscription?.en}
            </p>
          </div>
        </div>
      </div>

      <div ref={parentRef} className="pb-32">
        <div
          style={{
            height: virtualizer.getTotalSize(),
            width: "100%",
            position: "relative",
          }}
        >
          {virtualItems.map((virtualItem) => {
            const transcription = allTranscriptions[virtualItem.index];
            return (
              <div
                key={virtualItem.key}
                data-index={virtualItem.index}
                ref={virtualizer.measureElement}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  transform: `translateY(${virtualItem.start}px)`,
                }}
              >
                <p
                  onClick={() => {
                    seek(transcription?.start);
                  }}
                  className={cn(
                    "py-2 sm:py-4 text-sm sm:text-2xl",
                    isPlaying
                      ? transcription.start < currentTime &&
                        transcription.end > currentTime
                        ? "dark:text-white text-black bg-yellow-200 dark:bg-[rgb(9,10,11)]"
                        : "text-gray-500"
                      : "dark:text-white text-black"
                  )}
                >
                  {smartSplit({
                    input: transcription?.input,
                    lang: transcription?.lang,
                  })?.map((item: any, idx: any) => {
                    const containsInUnknown =
                      contentUnknowns?.items?.find((val) =>
                        val?.input?.includes(item)
                      );
                    return (
                      <span
                        key={`${item}-pinin-view-${idx}`}
                        className="py-2 sm:leading-relaxed leading-loose"
                      >
                        <CharacterItem
                          className={cn(
                            "text-lg sm:text-2xl",
                            isPlaying
                              ? transcription.start < currentTime &&
                                transcription.end > currentTime
                                ? "   !dark:text-white"
                                : "dark:text-gray-500"
                              : "",

                            containsInUnknown &&
                              "font-light dark:!text-pink-300 !text-pink-500"
                          )}
                          character={item}
                          onClick={() => {
                            const selectedText = getSelectedText();

                            if (
                              selectedText &&
                              selectedText?.length < 36
                            ) {
                              setSelected(selectedText);
                            } else {
                              setSelected(item);
                            }
                          }}
                        />
                      </span>
                    );
                  })}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
