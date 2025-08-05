"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { useSetIfExists } from "@/app/(auth)/convos/[content-id]/hooks/use-character-context-store";
import { useRecentlyWatchedContent } from "@/app/(auth)/convos/use-recently-watched-content-store";
import { useGetComponentId } from "@/app/nmm/[component-id]/use-get-component-id";
import { useIsSuperAdmin } from "@/domain/auth/auth.queries";
import { useDeleteSentenceMutation } from "@/domain/sentence/use-delete-sentence-mutation";
import { cn } from "@/lib/utils";
import { chineseConverter } from "mandarino/src/utils/chinese-converter";
import { useRef } from "react";
import { useBrightModeStore } from "../settings-dialog/use-bright-mode-store";
import { Icons } from "../ui/icons.v2";
import { useCanTrackFunction } from "../use-can-track-function";
import { getYablaLink } from "../youtube-page/utils/get-yabla-link";
import { smartSplit } from "../youtube-page/utils/smart-split";
import { YoutubeButton } from "../youtube-page/youtube-button";
import { CharacterItem } from "./character-item";
import { PlayButtonV2 } from "./play-button-v2";
import { textToSpeechProviders } from "./selected-character.constants";
import { GoogleTranslateLink } from "./selected-character/google-translate-link";
import { useGetCharacterAnalytics } from "./use-get-character-analytics";
import { WithInteractiveTitle } from "./with-interative-title";
import { isRomanLang } from "./utils/is-non-roman-lang";

export const SentenceItem = (props: any) => {
  const { selectedComp, selectedChar, lang, currentPhrase } = props;

  const resolvedLang =
    currentPhrase?.lang || lang || selectedComp?.lang || currentPhrase?.lang;

  const componentId = useGetComponentId();

  const { setRecentlyWatched } = useRecentlyWatchedContent();

  const unEncoded = currentPhrase?.hanzi || currentPhrase?.input;

  const isSuperAdmin = useIsSuperAdmin();
  const showPinyin = useBrightModeStore((state: any) => state.showPinyin);

  const { trackFunction } = useCanTrackFunction(currentPhrase, {
    lang: resolvedLang,
  });

  const setIfExists = useSetIfExists();

  const router = useRouter();

  const deleteSentenceMutation = useDeleteSentenceMutation();

  const characterAnalytics = useGetCharacterAnalytics({
    characterId: currentPhrase?.hanzi || currentPhrase?.input,
    lang: resolvedLang,
  });

  const customRef: any = useRef(null) as any;

  const Links = ({ customRef }: { customRef?: string }) => {
    const hanziOrInput = encodeURIComponent(unEncoded);
    return (
      <div className="flex justify-between items-center w-full mt-2">
        <div className="flex items-center space-x-2">
          {characterAnalytics?.precisionRate !== "0.0%" && (
            <p className="text-[16px] font-light flex space-x-2">
              <span>
                {" "}
                <Icons.bullsEyeArrowDT />
              </span>

              <span> {characterAnalytics?.precisionRate}</span>
            </p>
          )}
          <p className="text-[16px] font-light flex space-x-2">
            <span>
              {" "}
              <Icons.fireDuoTone />
            </span>

            <span> {characterAnalytics?.masteryRate}</span>
          </p>
        </div>
        <div className="flex gap-2 justify-end items-end w-full pr-2 mt-2 sm:mt-0">
          {/* {currentPhrase?.audio ? ( */}

          {currentPhrase?.contentId ? (
            <YoutubeButton
              // currentPhraseStr={JSON.stringify(currentPhrase)}
              className="h-6 w-6 text-xs"
              contentId={currentPhrase?.contentId}
              transcriptId={"todo"}
              sentenceInput={currentPhrase?.input || currentPhrase?.hanzi}
            />
          ) : (
            <PlayButtonV2
              customRef={customRef}
              text={currentPhrase?.input || currentPhrase?.hanzi}
              lang={lang || currentPhrase?.lang}
              className={cn(
                `text-sm bg-white dark:bg-black p-2 w-8 h-8 ring-1 ${"ring-slate-900/5 dark:ring-slate-800 dark:text-slate-300"} shadow-lg rounded-full flex items-center justify-center transition hover:dark:ring-slate-300`,
                "h-6 w-6 text-xs",
                "ml-1"
              )}
            />
          )}

          {/* ) : null} */}

          <Link
            onClick={() => {
              setIfExists({ ...currentPhrase });
              trackFunction();
            }}
            href={`/nmm/${chineseConverter(encodeURIComponent(currentPhrase?.hanzi || currentPhrase?.input))}${resolvedLang ? `?lang=${resolvedLang}` : ``}`}
            // href={`/nmm/${resolvedLang ? `?lang=${resolvedLang}` : ``}`}
            className={`text-xs bg-white dark:bg-black p-2 w-6 h-6 ring-1 ${`dark:text-white ring-slate-900/5 dark:ring-gray-800`} shadow-lg rounded-full flex items-center justify-center transition`}
          >
            <Icons.magnifyingGlass />
          </Link>

          <GoogleTranslateLink
            hanzi={unEncoded}
            className={"h-6 w-6 text-xs"}
          />

          {isSuperAdmin && currentPhrase?.id && (
            <button
              disabled={
                deleteSentenceMutation.isPending ||
                deleteSentenceMutation.isSuccess
              }
              className={`text-xs bg-white dark:bg-black p-2 w-6 h-6 ring-1 ${`dark:text-white ring-slate-900/5 dark:ring-gray-800`} shadow-lg rounded-full flex items-center justify-center transition`}
              onDoubleClick={() => {
                // @ts-ignore
                deleteSentenceMutation?.mutateAsync({
                  id: currentPhrase?.id,
                  component: componentId,
                });
              }}
            >
              {deleteSentenceMutation.isPending ? (
                <Icons.spinner spinPulse />
              ) : (
                <Icons.trash />
              )}
            </button>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center justify-between p-4 w-full bg-gray-50 dark:bg-[rgb(4,5,6)] my-2 rounded-2xl">
      <div role="button" className="flex flex-col w-full">
        {" "}
        <Link
          target="_blank"
          href={getYablaLink(currentPhrase?.hanzi)}
          onClick={() => {
            setIfExists({ ...currentPhrase });
          }}
        >
          {currentPhrase?.lang === "en" || isRomanLang(currentPhrase?.lang)
            ? null
            : showPinyin &&
              lang !== "en" && (
                <span className="text-[16px] text-gray-600 dark:text-gray-400">
                  {currentPhrase?.roman || currentPhrase?.pinyin}
                </span>
              )}
        </Link>
        <WithInteractiveTitle
          customRef={customRef}
          text={chineseConverter(currentPhrase?.input || currentPhrase?.hanzi)}
          lang={currentPhrase?.lang}
          provider={textToSpeechProviders.speechify}
          className={"text-xl"}
        >
          <span>
            {smartSplit({
              input: chineseConverter(
                currentPhrase?.input || currentPhrase?.hanzi
              ),
              lang: currentPhrase?.lang,
            })?.map((val: string, idy: number) => {
              return (
                <span
                  key={`sentence-item-${val}-${idy}`}
                  onClick={() => {
                    const cleanedVal = chineseConverter(
                      val
                        .replaceAll("!", "")
                        ?.replaceAll(".", "")
                        ?.replaceAll(",", "")
                    );

                    // addHistoryMutation.mutate({
                    //   hanzi: cleanedVal,
                    //   lang: lang,
                    //   pathName: routeName,
                    //   contentId: selectedComp?.id || "",
                    //   eventType: "CONTENT_VIEWED",
                    // } as any);

                    setIfExists({ ...currentPhrase });

                    router.push(
                      resolvedLang
                        ? `/nmm/${cleanedVal}?lang=${resolvedLang}&context=${currentPhrase?.hanzi || currentPhrase?.input}`
                        : `/nmm/${cleanedVal}&context=${currentPhrase?.hanzi || currentPhrase?.input}`
                    );
                  }}
                >
                  {/* {val} */}
                  <CharacterItem character={val} />
                  {/* {currentPhrase?.input ? " " : ""} */}
                </span>
              );
            })}
          </span>
        </WithInteractiveTitle>
        {currentPhrase?.lang === "en"
          ? null
          : lang !== "en" &&
            (currentPhrase?.contentId ? (
              <Link
                onClick={() => {
                  setRecentlyWatched({ id: currentPhrase?.contentId });
                }}
                target="_blank"
                className="text-[16px] dark:text-gray-500 text-gray-600"
                href={`/convos/${currentPhrase?.contentId}${currentPhrase?.start ? `?start=${currentPhrase?.start}` : ""}`}
              >
                {currentPhrase?.en || currentPhrase?.title}
              </Link>
            ) : (
              <span className="text-[16px] dark:text-gray-500 text-gray-600">
                {currentPhrase?.en || currentPhrase?.title}
              </span>
            ))}
      </div>

      <Links customRef={customRef} />
    </div>
  );
};
