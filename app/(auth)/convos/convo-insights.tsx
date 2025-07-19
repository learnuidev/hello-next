"use client";

import { SelectedCharacterContainer } from "@/components/selected-character-container";
import { useGetContentQuery } from "@/domain/content/content.queries";
import { useSelectedCharacter } from "./use-selected-character";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import {
  GreenLightbulbDuoTone,
  Icons,
  RedFireDuoTone,
} from "@/components/ui/icons.v2";
import { cn } from "@/lib/utils";

import { useListDictionaryMeaningsQuery } from "@/app/next/features/html-parser/hooks/use-dictionary-list-meanings";
import { LottieLoadingAnimation } from "@/app/nmm/lottie-loading-animation";
import { CharacterItem } from "@/components/_select-character/character-item";
import { HanziLink } from "@/components/hanzi-link";
import { NmmListContainerAll } from "@/components/nmm-list-container-all";
import { ActiveTranscription } from "@/components/youtube-page/active-transcription";
import { useCurrentTime } from "@/components/youtube-page/use-current-time-store";
import { smartSplit } from "@/components/youtube-page/utils/smart-split";
import { useIsSmall } from "@/components/youtube-page/utils/use-is-small";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";
import { formatTime } from "./_play/utils";
import { useGetContentInsightsNew } from "./use-get-content-insights.new";
import { useInsightsSettingsStore } from "./use-insights-settings-store";
import { isVideoUrl } from "./utils/is-video-url";

const ConvoContextDialog = ({
  isOpen,
  selected,
  contentId,
  closeDialog,
}: {
  isOpen: boolean;
  selected: any;
  contentId: string;
  closeDialog: () => void;
}) => {
  const { data } = useGetContentQuery({ contentId });

  const playerRef = useRef(null) as any;

  const filteredTimestamps = data?.transcriptions?.filter((item: any) =>
    (item?.hanzi || item?.input)?.includes(selected?.hanzi || selected?.input)
  );

  const { currentTime, setCurrentTime: setTime } = useCurrentTime(contentId);

  const isSmall = useIsSmall();

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(playerRef?.current?.getCurrentTime());
    }, 500);
    return () => clearInterval(interval);
  }, []);

  const seekAndPlay = (time: any) => {
    playerRef.current.seekTo(time, "seconds");

    try {
      playerRef.current?.player?.player?.play();
    } catch (err) {
      console.error(err);
    }
  };

  const firstTimestamp = filteredTimestamps?.[0];

  const start = firstTimestamp?.start;

  const onReady = useCallback(() => {
    const timeToStart = 7 * 60 + 12.6;

    if (start) {
      if (isVideoUrl(data?.audio)) {
        if (!currentTime && `${currentTime}` !== `${start}`) {
          seekAndPlay(start);
        }
      } else {
        playerRef.current.seekTo(start, "seconds");

        try {
          playerRef.current?.player?.player?.play();
        } catch (err) {
          console.error(err);
        }
      }
    }
  }, [start, data?.audio, currentTime]);

  // useEffect(() => {
  //   if (firstTimestamp) {
  //     seekAndPlay(firstTimestamp?.start);
  //   }
  // }, [firstTimestamp]);

  return (
    <Dialog open={isOpen}>
      <DialogContent
        onClick={() => {
          closeDialog();
        }}
        className="sm:max-w-2xl border-gray-900 bg-gray-50 dark:bg-black"
      >
        <ReactPlayer
          ref={playerRef}
          url={data?.audio || ""}
          //  playing={isPlaying}
          width="100%"
          height={isSmall ? "200px" : "450px"}
          controls
          onReady={onReady}
        />

        <ActiveTranscription
          className="h-12 mb-4 mt-0 sm:mt-0 sm:pt-0"
          currentTime={currentTime}
          transcriptions={data?.transcriptions}
          contentId={contentId}
        />

        <div>
          <Link
            target="_blank"
            href={`/nmm/${selected?.input || selected?.hanzi}?lang=${data?.lang}`}
          >
            Selected: {selected?.input || selected?.hanzi}
          </Link>
        </div>

        <div className="flex flex-col gap-4">
          {filteredTimestamps?.slice(0, 3).map((item: any) => {
            return (
              <button
                className="block w-full"
                onClick={() => {
                  seekAndPlay(item?.start);
                }}
                key={JSON.stringify(item)}
              >
                <div className="flex justify-between items-center flex-row w-full">
                  <p>
                    <span className="text-gray-500">
                      {formatTime(item?.start)}
                    </span>{" "}
                    {smartSplit({ input: item?.input, lang: data?.lang })?.map(
                      (character: any, idx: number) => {
                        return (
                          <CharacterItem
                            className="text-[16px]"
                            character={character}
                            key={`timeline-tab-${idx}-${character}`}
                          />
                        );
                      }
                    )}
                  </p>

                  <div>
                    <Link
                      target="_blank"
                      href={`/nmm/${item?.input}?lang=${data?.lang}`}
                    >
                      <Icons.magnifyingGlass />
                    </Link>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
        <div>
          {filteredTimestamps?.length > 3 && (
            <p>...{filteredTimestamps?.length - 3}+ more</p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

const ConvoInsightsHeader = ({
  totalCharacters,
  newCharacters,
  masteryRate,
  understandingRate,
}: {
  newCharacters: number;
  totalCharacters: number;
  masteryRate: number;
  understandingRate: number;
}) => {
  return (
    <div>
      <div className="flex justify-between w-full">
        <div className="flex justify-start space-x-4 sm:space-x-16">
          <h2 className="text-xl sm:text-4xl my-4 font-extralight text-gray-800 dark:text-gray-300">
            {/* {uniqueCharacters?.length}{" "} */}
            {totalCharacters}{" "}
            <span className="text-sm md:text-xl">total chars </span>
          </h2>
          <h2 className="text-xl sm:text-4xl my-4 font-extralight text-gray-800 dark:text-gray-300 space-x-2">
            <span className="text-yellow-500">
              {newCharacters}{" "}
              {/* {uniqueCharacters?.length - totalNewCharaters} */}
            </span>
            <span className="text-sm md:text-xl">new chars </span>
          </h2>
        </div>

        <div className="flex gap-8 my-4 text-2xl">
          <h2 className="font-extralight text-gray-500 dark:text-gray-300 space-x-2">
            <RedFireDuoTone />
            <span className="dark:text-gray-300 text-gray-900">
              {masteryRate}
            </span>
          </h2>

          <h2 className="font-extralight text-gray-500 dark:text-gray-300 space-x-2">
            <GreenLightbulbDuoTone />
            <span className="dark:text-gray-300 text-gray-900">
              {understandingRate}
            </span>
          </h2>
        </div>
      </div>
    </div>
  );
};

const ConvoInsightsFilter = () => {
  const viewType = useInsightsSettingsStore((state) => state.type);
  const setViewType = useInsightsSettingsStore((state) => state.setType);
  const setSortType = useInsightsSettingsStore((state) => state.setSortType);
  const sortType = useInsightsSettingsStore((state) => state.sortType);

  return (
    <div className="flex justify-between items-center">
      <div className="space-x-8 my-8">
        <button
          onClick={() => {
            setViewType("character");
          }}
          className={cn(
            viewType === "character" ? "dark:text-white" : " text-gray-500",
            "px-0 "
          )}
        >
          <Icons.seedling className="text-xl md:text-2xl" />
        </button>
        <button
          onClick={() => {
            setViewType("word");
          }}
          className={cn(
            viewType === "word" ? "dark:text-white" : " text-gray-500",
            "px-0"
          )}
        >
          <Icons.tree className="text-xl md:text-2xl" />
        </button>
      </div>
      <div className="space-x-8 my-8">
        <button
          onClick={() => {
            setSortType("popular");
          }}
          className={cn(
            sortType === "popular" ? "dark:text-white" : " text-gray-500",
            "px-0 "
          )}
        >
          <Icons.fire className="text-xl md:text-2xl" />
        </button>
        <button
          onClick={() => {
            setSortType("timeline");
          }}
          className={cn(
            sortType === "timeline" ? "dark:text-white" : " text-gray-500",
            "px-0 "
          )}
        >
          <Icons.timeline className="text-xl md:text-2xl" />
        </button>
      </div>
    </div>
  );
};

const ConvoInsightsNoNChinese = ({
  contentId,
  children,
}: {
  contentId: string;
  children: React.ReactNode;
}) => {
  const { data, isLoading } = useGetContentQuery({
    contentId,
  }) as any;

  const transcriptionStr = data?.transcriptions
    ?.map((item: any) => item?.input)
    ?.join(" ");

  const { data: _context, isLoading: isContextLoading } =
    useListDictionaryMeaningsQuery(transcriptionStr, data?.lang, contentId);

  const context = [
    ...new Set(_context?.map((item) => JSON.stringify(item))),
  ].map((item) => {
    const parsed = JSON.parse(item);

    return {
      ...parsed,
      frequency: _context?.filter((item: any) => item?.input === parsed?.input)
        ?.length,
    };
  });

  if (data?.lang === "zh") {
    return children;
  }

  if (isContextLoading) {
    return (
      <div>
        <LottieLoadingAnimation />
      </div>
    );
  }

  console.log("CONTEXT", context);

  return (
    <div className="my-8">
      <NmmListContainerAll className="gap-4">
        {context?.map((char: any, idx: number) => {
          return (
            <HanziLink
              className={
                char?.context?.contentId === contentId
                  ? "text-yellow-500 dark:text-yellow-500 "
                  : ""
              }
              lang={data?.lang}
              frequency={char?.frequency}
              character={char}
              key={`${char?.hanzi}-chars-${idx}`}
            />
          );
        })}
      </NmmListContainerAll>
    </div>
  );
};

export function ConvoInsights({ contentId }: { contentId: string }) {
  const viewType = useInsightsSettingsStore((state) => state.type);
  const [selected, setSelected] = useState(null);

  const selectedChar = useSelectedCharacter((state: any) => state?.character);

  const { data: lesson, isLoading } = useGetContentQuery({
    contentId: contentId,
  }) as any;

  const lang = lesson?.lang || lesson?.transcriptions?.[0]?.lang;

  const { data } = useGetContentInsightsNew({ contentId });

  if (isLoading || !data) {
    return <LottieLoadingAnimation />;
  }

  const {
    masteryRate,
    understandingRate,
    filteredHskWords,
    uniqueCharactersMemo,
    totalNewCharaters,
    uniqueCharacters,
  } = data;

  return selectedChar ? (
    <SelectedCharacterContainer characterId={selectedChar} />
  ) : (
    <ConvoInsightsNoNChinese contentId={contentId}>
      <div className="w-full px-4 my-4 md:my-8">
        {selected && (
          <ConvoContextDialog
            selected={selected}
            contentId={contentId}
            isOpen={!!selected}
            closeDialog={() => {
              setSelected(null);
            }}
          />
        )}
        <div>
          <ConvoInsightsHeader
            totalCharacters={uniqueCharacters?.length}
            newCharacters={uniqueCharacters?.length - totalNewCharaters}
            masteryRate={masteryRate}
            understandingRate={understandingRate}
          />

          <ConvoInsightsFilter />

          {viewType === "character" && (
            <div className="my-8">
              <NmmListContainerAll>
                {uniqueCharactersMemo.map((char: any, idx: number) => {
                  if (char.isLearned) {
                    return (
                      <HanziLink
                        onClick={() => {
                          setSelected(char);
                        }}
                        frequency={char?.frequency}
                        character={{
                          ...char,
                          input: char?.hanzi || char?.input,
                          hanzi: char?.hanzi || char?.input,
                        }}
                        key={`${char?.hanzi}-chars-${idx}`}
                        lang={lang}
                      />
                    );
                  } else {
                    const newChar: any = {
                      input: char?.hanzi || char?.input,
                      hanzi: char?.hanzi || char?.input,
                      hskLevel: 9,
                      pinyin: "",
                      en: "",
                    };
                    return (
                      <HanziLink
                        onClick={() => {
                          setSelected(newChar);
                        }}
                        lang={lang}
                        frequency={char?.frequency}
                        character={newChar}
                        key={`${char?.input}-chars-${idx}`}
                      />
                    );
                  }
                })}
              </NmmListContainerAll>
            </div>
          )}

          {viewType === "word" && (
            <div className="my-8">
              <NmmListContainerAll className="gap-4">
                {filteredHskWords?.map((char: any, idx: number) => {
                  return (
                    <HanziLink
                      lang={lang}
                      frequency={char?.frequency}
                      character={char}
                      key={`${char?.hanzi}-chars-${idx}`}
                    />
                  );
                })}
              </NmmListContainerAll>
            </div>
          )}
        </div>
      </div>
    </ConvoInsightsNoNChinese>
  );
}
