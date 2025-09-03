/* eslint-disable @next/next/no-img-element */
import { useSpeak } from "@/app/(auth)/convos/_play/use-speak";
import "regenerator-runtime";

import { Icons } from "@/components/ui/icons.v2";
import { cn } from "@/lib/utils";
import { useDeleteTranslationMutation } from "./hooks/use-delete-translation-mutation";
import { usePhraseParams } from "./hooks/use-phrase-params";
import { useGetTranslationHistory } from "./hooks/use-get-translation-history";
import Link from "next/link";
import { WithInteractiveTitle } from "@/components/_select-character/with-interative-title";
import { useRef } from "react";

import { chineseConverter } from "mandarino/src/utils/chinese-converter";
import { textToSpeechProviders } from "@/components/_select-character/selected-character.constants";
import { PlayButtonV2 } from "@/components/_select-character/play-button-v2";
import { useAddHistoryMutation } from "@/domain/history/history.mutations";
import { useCurrentTime } from "@/components/youtube-page/use-current-time-store";
import { useAudioProviderState } from "@/components/settings-dialog/hooks/use-audio-provider-state";
import { useYoutubeRefState } from "@/components/_select-character/use-youtube-ref-state";
import { smartSplit } from "@/components/youtube-page/utils/smart-split";
import { CharacterItem } from "@/components/_select-character/character-item";
import { useIsPlayingState } from "@/components/youtube-page/use-is-playing-state";

const PhraseActionButton = ({
  onClick,
  onDoubleClick,
  children,
  href,
  as,
  className,
}: {
  className?: string;
  onClick?: () => void;
  onDoubleClick?: () => void;
  children: React.ReactNode;
  as?: string;
  href?: string;
}) => {
  if (as === "link") {
    return (
      <Link
        onDoubleClick={onDoubleClick}
        onClick={onClick}
        href={href || ""}
        className={cn(
          `text-xs dark:text-white p-2  w-8 h-8 ring-1 ring-gray-300 dark:ring-gray-700  rounded-full flex items-center justify-center transition hover:shadow-lg dark:shadow-gray-400`,
          className
        )}
      >
        {children}
      </Link>
    );
  }
  return (
    <button
      className={cn(
        "text-[14px] border-[1px] dark:text-white border-gray-300 dark:border-gray-700  w-8 h-8 rounded-full hover:shadow-lg dark:shadow-gray-400",
        className
      )}
      onDoubleClick={onDoubleClick}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export function PhraseItem({
  message,
  idx,
  showPinyin,
}: {
  message: any;
  idx: any;
  showPinyin: boolean;
}) {
  const addHistoryMutation = useAddHistoryMutation();
  const customRef: any = useRef(null) as any;
  const lang = message?.targetLang;
  const sourceLang = message?.sourceLang;
  const { contextId } = usePhraseParams();

  const { data: translationContext } = useGetTranslationHistory(contextId);

  const isSourceSameAsTarget = sourceLang === translationContext?.targetLang;

  const speakLang = isSourceSameAsTarget ? sourceLang : lang;

  const { speak } = useSpeak(speakLang, {
    utterRate: 1,
  });

  const formattedOutput = message?.output
    ?.replaceAll(/&quot;/g, '"')
    ?.replaceAll(/&#39;/g, "'");

  const _text = chineseConverter(formattedOutput);
  const { provider, setProvider } = useAudioProviderState();
  const id = `${_text}#${lang}#${provider}`;

  const { currentTime, setCurrentTime, duration } = useCurrentTime(id);

  const { isPlaying, setIsPlaying } = useIsPlayingState(id);

  const { seekAndPlay, youtubeRef } = useYoutubeRefState();

  const deleteTranslationMutation = useDeleteTranslationMutation(contextId);
  return (
    <div
      key={message.id}
      className={cn(`flex`, idx % 2 === 0 ? "justify-start" : "justify-end")}
    >
      <div
        className={cn(
          `max-w-full sm:max-w-[90%] rounded-lg p-2`,
          "dark:bg-[rgb(21,22,23)] bg-white",

          "rounded-2xl p-2 sm:p-4"
        )}
      >
        <div className="flex space-x-4 flex-col">
          <div>
            {showPinyin && (
              <p className="text-gray-400 font-extralight">{message?.pinyin}</p>
            )}

            <WithInteractiveTitle
              customRef={customRef}
              text={chineseConverter(formattedOutput)}
              lang={lang}
              // provider={textToSpeechProviders.minimax}
              // className={"text-xl"}
              className="text-xl sm:text-xl font-extralight"
            >
              <p className="text-2xl sm:text-2xl font-extralight">
                {isPlaying && lang === "zh-CN"
                  ? smartSplit({
                      input: formattedOutput,
                      lang: "zh",
                    }).map((character: any, idx: any) => {
                      const startTime =
                        (duration / (formattedOutput?.length - 1)) * idx;

                      const endTime =
                        (duration / (formattedOutput?.length - 1)) * (idx + 1);
                      return (
                        <CharacterItem
                          className={
                            currentTime >= startTime && currentTime <= endTime
                              ? "dark:text-white text-black"
                              : "text-gray-500"
                          }
                          character={character}
                          key={`timeline-tab-${idx}-${character}`}
                          onClick={() => {
                            if (duration) {
                              seekAndPlay(startTime, customRef);
                            }

                            // setWords({
                            //   word: character,
                            //   transcriptionId: item?.id,
                            //   contentId,
                            // });
                          }}
                        />
                      );
                    })
                  : formattedOutput}
              </p>
            </WithInteractiveTitle>
            <p className="text-gray-500 mt-2">{message?.input}</p>
          </div>

          <div className="flex justify-end space-x-2 mt-4">
            <PhraseActionButton
              onClick={() => {
                addHistoryMutation.mutate({
                  input: isSourceSameAsTarget
                    ? message?.input
                    : formattedOutput,
                  lang: speakLang === "zh-CN" ? "zh" : speakLang,
                  eventType: "SEARCH",
                } as any);
              }}
              as="link"
              href={`/nmm/${encodeURIComponent(isSourceSameAsTarget ? message?.input : formattedOutput)}?lang=${speakLang === "zh-CN" ? "zh" : speakLang}`}
            >
              <Icons.magnifyingGlass />
            </PhraseActionButton>

            <PhraseActionButton
            // onClick={() => {
            //   speak(isSourceSameAsTarget ? message?.input : formattedOutput);
            // }}
            >
              <PlayButtonV2
                customRef={customRef}
                text={formattedOutput}
                lang={lang}
                // className={cn(
                //   `text-sm bg-white dark:bg-black p-2 w-8 h-8 ring-1 ${"ring-slate-900/5 dark:ring-slate-800 dark:text-slate-300"} shadow-lg rounded-full flex items-center justify-center transition hover:dark:ring-slate-300`,
                //   "h-6 w-6 text-xs",
                //   "ml-1"
                // )}
              />
              {/* <Icons.volume /> */}
            </PhraseActionButton>
            <PhraseActionButton
              onDoubleClick={() => {
                deleteTranslationMutation.mutateAsync({ id: message?.id });
              }}
            >
              {deleteTranslationMutation.isPending ? (
                <Icons.loadingSpinner spinPulse />
              ) : (
                <Icons.trash />
              )}
            </PhraseActionButton>
          </div>
        </div>
      </div>
    </div>
  );
}
