import { useCallback, useMemo, useRef, useState } from "react";

import { useGetContentQuery } from "@/domain/content/content.queries";
import ReactPlayer from "react-player";

import { useSearchParams } from "next/navigation";
import { Icons } from "../ui/icons.v2";

import { useCurrentTime } from "./use-current-time-store";
import { cn } from "@/lib/utils";

import { create } from "zustand";

export const useIsPlayingStore = create((set: any, get: any) => ({
  isPlaying: {},
  setIsPlaying: (id: string, isPlaying: boolean) =>
    set({
      isPlaying: {
        ...get().isPlaying,
        [id]: isPlaying,
      },
    }),
}));

const useIsPlaying = ({ currentPhrase }: { currentPhrase: string }) => {
  const currentPhraseStr = JSON.stringify(currentPhrase);

  const _isPlaying: any = useIsPlayingStore((state) => state.isPlaying);

  const isPlaying = _isPlaying?.[currentPhraseStr] || false;
  const _setIsPlaying = useIsPlayingStore((state) => state.setIsPlaying);

  const setIsPlaying = (playing: boolean) => {
    _setIsPlaying(currentPhraseStr, playing);
  };

  return {
    isPlaying,
    setIsPlaying,
  };
};

export function YoutubeButton({
  contentId,
  transcriptId,
  sentenceInput,
  className,
}: {
  contentId: string;
  transcriptId: string;
  sentenceInput: string;
  className?: string;
  currentPhraseStr?: string;
}) {
  const [isPlaying, setIsPlaying] = useState(false);

  const { currentTime, setCurrentTime: setTime } = useCurrentTime(contentId);

  const playerRef = useRef(null) as any;
  const searchParams = useSearchParams();
  const start = searchParams.get("start");
  const { data: lesson } = useGetContentQuery({ contentId: contentId });
  const finalUrl = lesson?.audio;

  const seek = (time: any) => {
    playerRef.current.seekTo(time, "seconds");
  };
  const seekAndPlay = (time: any) => {
    seek(time);

    try {
      playerRef.current?.player?.player?.play();
      setIsPlaying(true);
    } catch (err) {
      console.error(err);
    }
  };

  const transcriptions = useMemo(
    () => lesson?.transcriptions || [],
    [lesson?.transcriptions]
  );

  const currentTranscription = useMemo(
    () =>
      // currentPhrase ||
      transcriptions?.find(
        (trans: any) =>
          trans?.id === transcriptId ||
          (trans?.input || trans?.hanzi) === sentenceInput ||
          (trans?.input || trans?.hanzi)?.includes(sentenceInput)
      ),
    [sentenceInput, transcriptId, transcriptions]
  );

  const togglePlay = useCallback(() => {
    if (playerRef?.current?.player?.isPlaying) {
      playerRef?.current?.player?.player?.pause();
      setIsPlaying(false);
    } else {
      playerRef?.current?.player?.player.play();
      setIsPlaying(true);
    }
  }, [playerRef]);

  const playSound = () => {
    seekAndPlay(currentTranscription?.start);

    if (
      currentTime > currentTranscription?.start &&
      currentTime < currentTranscription?.end
    ) {
      togglePlay();
    } else {
      seekAndPlay(currentTranscription?.start);
    }
  };

  if (!currentTranscription) {
    return null;
  }

  return (
    <div>
      <div className="hidden">
        <ReactPlayer
          onProgress={(value) => {
            if (currentTime > currentTranscription?.end) {
              if (playerRef?.current?.player?.isPlaying) {
                playerRef?.current?.player?.player?.pause();
                setIsPlaying(false);
                setTime(currentTranscription?.start);
                seek(currentTranscription?.start);
              }
            } else {
              setTime(value.playedSeconds);
            }
          }}
          ref={playerRef}
          url={finalUrl}
          playing={isPlaying}
          width="100%"
          height={"450px"}
          controls
        />
      </div>

      <button
        onClick={() => {
          playSound();
        }}
      >
        {isPlaying ? (
          <Icons.pause className={cn("text-2xl", className)} />
        ) : (
          <Icons.play className={cn("text-2xl", className)} />
        )}
      </button>
    </div>
  );
}
