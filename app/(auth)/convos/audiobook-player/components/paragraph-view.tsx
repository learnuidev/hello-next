import { getSelectedText } from "@/app/review/review-cloze-content/utils/get-selected-text";
import { CharacterItem } from "@/components/_select-character/character-item";
import { useSelectedItem } from "@/components/youtube-page/use-selected-item";
import { smartSplit } from "@/components/youtube-page/utils/smart-split";
import { useListContentUnknownsQuery } from "@/domain/content-unknowns/use-list-content-unknowns.query";
import { ContentTranscription, IContent } from "@/domain/content/content.api";
import { cn } from "@/lib/utils";
import { splitEvery } from "ramda";
import { useCharacterMenuBarStore } from "../hooks/use-character-menu-bar";
import { useMemo } from "react";
import { getActiveTranscriptions } from "@/components/youtube-page/get-active-transcriptions";

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

  const { setShowMenuBar } = useCharacterMenuBarStore();

  const active = 60;

  const group = useMemo(() => {
    return getActiveTranscriptions({
      limit: active,
      currentTime,
      transcriptions: content?.transcriptions || [],
    });
  }, [active, currentTime, content?.transcriptions]);

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

      <div className="pb-32">
        <div>
          <div>
            <div className="">
              <div className="text-sm sm:text-2xl gap-4">
                <div className="py-4 sm:space-y-8 space-y-2">
                  {group?.map((transcription: ContentTranscription) => {
                    return (
                      <p
                        key={JSON.stringify(transcription)}
                        onClick={() => {
                          seek(transcription?.start);
                        }}
                        className={cn(
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
                              onClick={(e) => {
                                e.stopPropagation();
                                const selectedText = getSelectedText();

                                const text =
                                  selectedText && selectedText?.length < 36
                                    ? selectedText
                                    : item;

                                setShowMenuBar({
                                  text,
                                  position: {
                                    x: e.clientX,
                                    y: e.clientY,
                                  },
                                  startTime: transcription?.start ?? null,
                                });
                              }}
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
                              />
                            </span>
                          );
                        })}
                      </p>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
