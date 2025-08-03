"use client";

import { useListenState } from "@/app/(auth)/listen/hooks/use-listen-state";
import { useGetAudioMutation } from "@/hooks/use-get-audio-mutation";
import { cn } from "@/lib/utils";
import { useCallback, useState } from "react";
import ReactPlayer from "react-player";
import { Icons } from "../ui/icons.v2";
import { useCurrentTime } from "../youtube-page/use-current-time-store";
import { useIsPlayingState } from "../youtube-page/use-is-playing-state";
import {
  textToSpeechProviders,
  TextToSpeechProviders,
} from "./selected-character.constants";
import { useCharacterSoundState } from "./use-character-sound-state";
import { useYoutubeRefState } from "./use-youtube-ref-state";
import {
  useContextPlayContextState,
  usePlayHistoryStore,
} from "../youtube-page/hooks/use-play-history-state";

function PlayBtnInner({
  defaultPlaybackRef,
  audioUrl,
  className,
  text,
  lang,
  provider,
  customRef,
}: {
  audioUrl: string;
  className?: string;
  text: string;
  lang: string;
  provider: TextToSpeechProviders;
  customRef?: any;
  defaultPlaybackRef?: boolean;
}) {
  const autoPlay = true;

  const { playbackRate } = useListenState();

  const setHistory = usePlayHistoryStore((state) => state.setHistory);
  // const [isPlaying, setIsPlaying] = useState(false);
  const { contextId, setNewContextId } = useContextPlayContextState();

  const id = `${text}#${lang}#${provider}`;
  const { isPlaying, setIsPlaying } = useIsPlayingState(id);

  const { youtubeRef: _playerRef } = useYoutubeRefState();

  const playerRef = customRef || _playerRef;

  const { currentTime, setCurrentTime: setTime } = useCurrentTime(id);

  const play = () => {
    playerRef.current?.player?.player?.play();
    setIsPlaying(true);
  };

  const onReady = useCallback(() => {
    const timeToStart = 7 * 60 + 12.6;

    if (autoPlay) {
      try {
        play();
      } catch (err) {
        console.error(err);
      }
    }
  }, []);

  const togglePlay = useCallback(() => {
    if (playerRef?.current?.player?.isPlaying) {
      setIsPlaying(false);
      playerRef?.current?.player?.player?.pause();
    } else {
      setIsPlaying(true);
      playerRef?.current?.player?.player.play();
    }
  }, [playerRef, setIsPlaying]);

  let playerProps = {
    playbackRate: playbackRate,
    onEnded: () => {
      setIsPlaying(false);
    },
    onPlay: () => {
      setIsPlaying(true);
      setNewContextId();
    },
    onPause: () => {
      setIsPlaying(false);
    },

    onProgress: (value: any) => {
      setTime(value.playedSeconds);
    },
    onEnd: () => {
      setHistory({
        transcriptionId: `${text}`,
        contextId,
        contentId: `${text}`,
        createdAt: Date.now(),
        progressTime: currentTime,
      });
    },
    onReady: onReady,
    ref: playerRef,
    url: audioUrl,
    height: "0px",
    width: "0px",
  } as any;

  if (!defaultPlaybackRef) {
    playerProps.progressInterval = 1;
  }

  return (
    <>
      <button
        onClick={() => {
          togglePlay();
        }}
        className={className}
      >
        {isPlaying ? <Icons.pause /> : <Icons.play className="ml-1" />}
      </button>
      <div className="hidden">
        <ReactPlayer {...playerProps} />
      </div>
    </>
  );
}

export function PlayButtonV2({
  defaultPlaybackRef,
  text,
  lang,
  className,
  customRef,
}: {
  text: string;
  lang: string;
  className?: string;
  customRef?: any;
  defaultPlaybackRef?: boolean;
}) {
  const getAudioMutation = useGetAudioMutation();

  const provider = textToSpeechProviders.speechify;

  const { setCharacterSound } = useCharacterSoundState({
    input: text,
    lang,
    provider,
  });

  const [audioUrl, setAudioUrl] = useState("");

  return audioUrl ? (
    <PlayBtnInner
      defaultPlaybackRef={defaultPlaybackRef}
      customRef={customRef}
      provider={provider}
      text={text}
      lang={lang}
      className={className}
      audioUrl={audioUrl}
    />
  ) : (
    <button
      onClick={() => {
        getAudioMutation
          .mutateAsync({
            text: text,
            lang: lang,
          })
          .then((resp) => {
            setCharacterSound(resp);
            setAudioUrl(resp.audioUrl);
          });
      }}
      className={cn(className)}
    >
      {getAudioMutation?.isPending ? (
        <Icons.spinner spinPulse />
      ) : (
        <Icons.play className="ml-1" />
      )}
    </button>
  );
}
