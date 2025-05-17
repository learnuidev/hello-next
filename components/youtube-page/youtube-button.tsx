import { useCallback, useEffect, useRef, useState } from "react";

import { useGetContentQuery } from "@/domain/content/content.queries";
import ReactPlayer from "react-player";

import { useSearchParams } from "next/navigation";
import { Icons } from "../ui/icons.v2";

import { useCurrentTime } from "./use-current-time-store";
import { cn } from "@/lib/utils";

export function YoutubeButton({
  contentId,
  transcriptId,
  sentenceInput,
  className,
  currentPhrase,
}: {
  contentId: string;
  transcriptId: string;
  sentenceInput: string;
  className?: string;
  currentPhrase?: any;
}) {
  const [isPlaying, setIsPlaying] = useState(false);

  const { currentTime, setCurrentTime: setTime } = useCurrentTime(contentId);

  const playerRef = useRef() as any;
  const searchParams = useSearchParams();
  const start = searchParams.get("start");
  const { data: lesson } = useGetContentQuery({ contentId: contentId });
  const finalUrl = lesson?.audio;

  const seekAndPlay = (time: any) => {
    playerRef.current.seekTo(time, "seconds");

    try {
      playerRef.current?.player?.player?.play();
      setIsPlaying(true);
    } catch (err) {
      console.error(err);
    }
  };

  const transcriptions = lesson?.transcriptions || [];

  const currentTranscription =
    currentPhrase ||
    transcriptions?.find(
      (trans: any) =>
        trans?.id === transcriptId ||
        (trans?.hanzi || trans?.input) === sentenceInput
    );

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(playerRef?.current?.getCurrentTime());
    }, 500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (currentTime > currentTranscription?.end) {
      if (playerRef?.current?.player?.isPlaying) {
        playerRef?.current?.player?.player?.pause();
        setIsPlaying(false);
      }
    }
  }, [currentTime]);

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
    if (
      currentTime > currentTranscription?.start &&
      currentTime < currentTranscription?.end
    ) {
      togglePlay();
    } else {
      seekAndPlay(currentTranscription?.start);
    }
  };

  return (
    <div>
      <div className="hidden">
        <ReactPlayer
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
