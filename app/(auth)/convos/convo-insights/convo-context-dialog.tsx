"use client";

import { useGetContentQuery } from "@/domain/content/content.queries";

import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { Icons } from "@/components/ui/icons.v2";

import { CharacterItem } from "@/components/_select-character/character-item";
import { ActiveTranscription } from "@/components/youtube-page/active-transcription";
import { useCurrentTime } from "@/components/youtube-page/use-current-time-store";
import { smartSplit } from "@/components/youtube-page/utils/smart-split";
import { useIsSmall } from "@/components/youtube-page/utils/use-is-small";
import Link from "next/link";
import { useCallback, useEffect, useRef } from "react";
import ReactPlayer from "react-player";
import { formatTime } from "../_play/utils";
import { isVideoUrl } from "../utils/is-video-url";
import { useWordsClickedHistoryStore } from "@/components/youtube-page/hooks/use-words-clicked-history-state";
import {
  useContextPlayContextState,
  usePlayHistoryStore,
} from "@/components/youtube-page/hooks/use-play-history-state";
import { ScrollArea } from "@/components/ui/scroll-area";
import { isYoutube } from "../utils/is-youtube";
// import { ScrollArea } from "@radix-ui/react-scroll-area";

export const ConvoContextDialog = ({
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

  const isYoutubeOrVideo = isYoutube(data?.audio) || isVideoUrl(data?.audio);

  const setWords = useWordsClickedHistoryStore((state) => state.setHistory);

  const playerRef = useRef(null) as any;

  const filteredTimestamps = data?.transcriptions?.filter((item: any) =>
    (item?.input || item?.hanzi)?.includes(selected?.input || selected?.hanzi)
  );

  const { currentTime, setCurrentTime: setTime } = useCurrentTime(contentId);

  const isSmall = useIsSmall();

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setTime(playerRef?.current?.getCurrentTime());
  //   }, 500);
  //   return () => clearInterval(interval);
  // }, []);

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

    if (isYoutube(data?.audio)) {
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
      } else {
        seekAndPlay(0);
      }
    }

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
    } else {
      seekAndPlay(0);
    }

    // if (start) {
    //   if (isVideoUrl(data?.audio)) {
    //     if (!currentTime && `${currentTime}` !== `${start}`) {
    //       seekAndPlay(start);
    //     }
    //   } else {
    //     playerRef.current.seekTo(start, "seconds");

    //     try {
    //       playerRef.current?.player?.player?.play();
    //     } catch (err) {
    //       console.error(err);
    //     }
    //   }
    // }
  }, [start, data?.audio, currentTime]);

  const { contextId, setNewContextId } = useContextPlayContextState();
  const setHistory = usePlayHistoryStore((state) => state.setHistory);

  const currentTranscription = data?.transcriptions?.find(
    (trans: any) => trans?.start <= currentTime && trans?.end >= currentTime
  );

  // useEffect(() => {
  //   if (firstTimestamp) {
  //     seekAndPlay(firstTimestamp?.start);
  //   }
  // }, [firstTimestamp]);

  return (
    <Dialog open={isOpen}>
      <DialogHeader>
        <div>
          <Link
            target="_blank"
            className="text-white"
            href={`/nmm/${selected?.input || selected?.hanzi}?lang=${data?.lang}`}
          >
            Selected: {selected?.input || selected?.hanzi}
          </Link>
        </div>
      </DialogHeader>

      <DialogContent
        onClick={() => {
          closeDialog();
        }}
        className="sm:max-w-2xl border-gray-900 bg-gray-50 dark:bg-black opacity-80"
      >
        <ReactPlayer
          ref={playerRef}
          url={data?.audio || ""}
          //  playing={isPlaying}
          width="100%"
          height={!isYoutubeOrVideo ? "50px" : isSmall ? "200px" : "450px"}
          controls
          onReady={onReady}
          onPlay={() => {
            setNewContextId();
          }}
          onProgress={(value) => {
            if (currentTranscription) {
              setHistory({
                transcriptionId: currentTranscription?.id,
                contextId,
                contentId,
                createdAt: Date.now(),
                progressTime: value.playedSeconds,
              });
            }

            setTime(value.playedSeconds);
          }}
        />

        <ActiveTranscription
          className="h-12 mb-4 mt-0 sm:mt-0 sm:pt-0"
          currentTime={currentTime}
          transcriptions={data?.transcriptions}
          contentId={contentId}
          // seekAndPlay={seekAndPlay}
        />

        <div>
          <Link
            target="_blank"
            className="text-gray-500"
            href={`/nmm/${selected?.input || selected?.hanzi}?lang=${data?.lang}`}
          >
            Selected: {selected?.input || selected?.hanzi}
          </Link>
        </div>

        <ScrollArea className="space-y-6 w-full h-[200px] rounded-md">
          <div className="flex flex-col gap-4">
            {filteredTimestamps?.map((item: any) => {
              return (
                <button
                  className="block w-full"
                  onClick={() => {
                    seekAndPlay(item?.start);
                  }}
                  key={JSON.stringify(item)}
                >
                  <div className="flex justify-between items-center gap-4 flex-row w-full">
                    <p className="flex flex-wrap items-center flex-row gap-4">
                      <span className="text-gray-500">
                        {formatTime(item?.start)}
                      </span>{" "}
                      <span>
                        {smartSplit({
                          input: item?.input,
                          lang: data?.lang,
                        })?.map((character: any, idx: number) => {
                          return (
                            <CharacterItem
                              className="text-[16px]"
                              character={character}
                              key={`timeline-tab-${idx}-${character}`}
                              onClick={() => {
                                setWords({
                                  word: character,
                                  transcriptionId: item?.id,
                                  contentId,
                                });
                              }}
                            />
                          );
                        })}
                      </span>
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
        </ScrollArea>
        {/* <div>
          {filteredTimestamps?.length > 3 && (
            <p>...{filteredTimestamps?.length - 3}+ more</p>
          )}
        </div> */}
      </DialogContent>
    </Dialog>
  );
};
