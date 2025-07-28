"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

import { useSetIfExists } from "@/app/(auth)/convos/[content-id]/hooks/use-character-context-store";
import { useGetComponentId } from "@/app/nmm/[component-id]/use-get-component-id";
import { useIsSuperAdmin } from "@/domain/auth/auth.queries";
import { useDeleteSentenceMutation } from "@/domain/sentence/use-delete-sentence-mutation";
import { useBrightModeStore } from "../settings-dialog/use-bright-mode-store";
import { chineseConverter } from "mandarino/src/utils/chinese-converter";
import { Icons } from "../ui/icons.v2";
import { useCanTrackFunction } from "../use-can-track-function";
import { getYablaLink } from "../youtube-page/utils/get-yabla-link";
import { AudioComponent } from "./audio-component";
import { CharacterItem } from "./character-item";
import { GoogleTranslateLink } from "./selected-character/google-translate-link";
import { useGetCharacterAnalytics } from "./use-get-character-analytics";
import { smartSplit } from "../youtube-page/utils/smart-split";
import { YoutubeButton } from "../youtube-page/youtube-button";
import { useGetAudioMutation } from "@/hooks/use-get-audio-mutation";
import { cn } from "@/lib/utils";
import useSound from "use-sound";
import { useEffect, useState } from "react";

function PlayBtnInner({
  audioUrl,
  className,
}: {
  audioUrl: string;
  className?: string;
}) {
  const [play, { stop, isPlaying, ...rest }] = useSound(audioUrl) as any;

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

  const [audioUrl, setAudioUrl] = useState("");

  return audioUrl ? (
    <PlayBtnInner className={className} audioUrl={audioUrl} />
  ) : (
    <button
      onClick={() => {
        getAudioMutation
          .mutateAsync({
            text: text,
            lang: lang,
          })
          .then((resp) => {
            const audio = new Audio(resp.audioUrl);
            audio.play();

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
