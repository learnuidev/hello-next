"use client";

import { useGetContentQuery } from "@/domain/content/content.queries";

import { Dialog, DialogContent } from "@/components/ui/dialog";
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
