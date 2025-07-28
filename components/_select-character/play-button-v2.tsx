"use client";

import { useGetAudioMutation } from "@/hooks/use-get-audio-mutation";
import { cn } from "@/lib/utils";
import { useCallback, useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";
import { Icons } from "../ui/icons.v2";
import { useCurrentTime } from "../youtube-page/use-current-time-store";
import { useCharacterSoundState } from "./use-character-sound-state";
import {
  textToSpeechProviders,
  TextToSpeechProviders,
} from "./selected-character.constants";
import { useIsPlayingState } from "../youtube-page/use-is-playing-state";

function PlayBtnInner({
  audioUrl,
  className,
  text,
  lang,
  provider,
}: {
  audioUrl: string;
  className?: string;
  text: string;
  lang: string;
  provider: TextToSpeechProviders;
}) {
  // const [play, { stop, isPlaying, ...rest }] = useSound(audioUrl) as any;
  const playerRef = useRef(null) as any;
  const autoPlay = true;
  // const [isPlaying, setIsPlaying] = useState(false);

  const id = `${text}#${lang}#${provider}`;
  const { isPlaying, setIsPlaying } = useIsPlayingState(id);

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

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(playerRef?.current?.getCurrentTime());
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <button
        onClick={() => {
          play();
        }}
        className={className}
      >
        {isPlaying ? <Icons.pause /> : <Icons.play className="ml-1" />}
      </button>
      <div className="hidden">
        <ReactPlayer
          onEnded={() => {
            setIsPlaying(false);
            console.log("play ended");
          }}
          onReady={onReady}
          ref={playerRef}
          url={audioUrl}
          height={"0px"}
          width={"0px"}
        />
      </div>
    </>
  );

  return (
    <button
      onClick={() => {
        if (audioUrl) {
          play();
        }
      }}
      className={className}
    >
      {isPlaying ? (
        <Icons.pause className="ml-1" />
      ) : (
        <Icons.play className="ml-1" />
      )}
    </button>
  );
}

export function PlayButtonV2({
  text,
  lang,
  className,
}: {
  text: string;
  lang: string;
  className?: string;
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
