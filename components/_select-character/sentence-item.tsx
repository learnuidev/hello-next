"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

import { useSetIfExists } from "@/app/(auth)/convos/[content-id]/hooks/use-character-context-store";
import { useRecentlyWatchedContent } from "@/app/(auth)/convos/use-recently-watched-content-store";
import { useGetComponentId } from "@/app/nmm/[component-id]/use-get-component-id";
import { getSelectedText } from "@/app/review/review-cloze-content/utils/get-selected-text";
import { useIsSuperAdmin } from "@/domain/auth/auth.queries";
import { useDeleteSentenceMutation } from "@/domain/sentence/use-delete-sentence-mutation";
import { formatRoman } from "@/lib/format-roman";
import { cn } from "@/lib/utils";
import { getNmmLink } from "@/libs/utils/get-nmm-link";
import { useSegmentTextQuery } from "@/libs/utils/segment-text";
import { chineseConverter } from "mandarino/src/utils/chinese-converter";
import { useRef } from "react";
import { useReadModeState } from "../read-mode-button";
import { useBrightModeStore } from "../settings-dialog/use-bright-mode-store";
import { useChinglishState } from "../settings-dialog/use-chinglish-state";
import { Icons } from "../ui/icons.v2";
import { useCanTrackFunction } from "../use-can-track-function";
import { useCanTrackNavigationFunction } from "../use-can-track-navigation-function";
import { getYablaLink } from "../youtube-page/utils/get-yabla-link";
import { smartSplit } from "../youtube-page/utils/smart-split";
import { YoutubeButton } from "../youtube-page/youtube-button";
import { CharacterItem } from "./character-item";
import { PlayButtonV2 } from "./play-button-v2";
import { useGetCharacterAnalytics } from "./use-get-character-analytics";
import { isNonRomanLang, isRomanLang } from "./utils/is-non-roman-lang";
import { WithInteractiveTitle } from "./with-interative-title";
import { useGetContentId } from "@/app/(auth)/convos/[content-id]/hooks/use-get-content-id";

export const SentenceItem = (props: any) => {
  const { selectedComp, lang, currentPhrase } = props;

  const searchParams = useSearchParams();

  const contentId = useGetContentId();

  const resolvedLang =
    currentPhrase?.lang || lang || selectedComp?.lang || currentPhrase?.lang;

  const { readMode, setReadMode } = useReadModeState();

  const showEn = useBrightModeStore((state) => state.showEn);
  const { showChinglish, setShowChinglish } = useChinglishState();

  const componentId = useGetComponentId();

  const { setRecentlyWatched } = useRecentlyWatchedContent();

  const unEncoded = currentPhrase?.hanzi || currentPhrase?.input;

  const isSuperAdmin = useIsSuperAdmin();
  const showPinyin = useBrightModeStore((state) => state.showPinyin);

  const { trackFunction } = useCanTrackFunction(currentPhrase, {
    lang: resolvedLang,
  });

  const { trackNavigationFunction } = useCanTrackNavigationFunction();

  const setIfExists = useSetIfExists();

  const router = useRouter();

  const deleteSentenceMutation = useDeleteSentenceMutation();

  const characterAnalytics = useGetCharacterAnalytics({
    characterId: currentPhrase?.hanzi || currentPhrase?.input,
    lang: resolvedLang,
  });

  const customRef: any = useRef(null) as any;

  const { data: segmentedData } = useSegmentTextQuery({
    text: currentPhrase?.input || currentPhrase?.hanzi,
    lang,
  });

  const Links = ({ customRef }: { customRef?: string }) => {
    const hanziOrInput = encodeURIComponent(unEncoded);
    return (
      <div className="flex justify-between items-center w-full mt-2">
        <div className="flex items-center space-x-2">
          {characterAnalytics?.precisionRate !== "0.0%" && (
            <p className="text-[16px] font-light flex space-x-2">
              <span>
                <Icons.lightBulbDuotone />
              </span>

              <span> {characterAnalytics?.understandingRate}</span>
            </p>
          )}
          <p className="text-[16px] font-light flex space-x-2">
            <span>
              <Icons.fireDuoTone />
            </span>

            <span> {characterAnalytics?.masteryRate}</span>
          </p>
        </div>
        <div className="flex gap-4 justify-end items-center w-full sm:mt-0">
          {currentPhrase?.contentId && currentPhrase?.id ? (
            <YoutubeButton
              className="text-md"
              disableHistory={!!props?.disableHistory}
              contentId={currentPhrase?.contentId}
              transcriptId={currentPhrase?.id}
              sentenceInput={currentPhrase?.input || currentPhrase?.hanzi}
            />
          ) : (
            <PlayButtonV2
              customRef={customRef}
              text={currentPhrase?.input || currentPhrase?.hanzi}
              lang={lang || currentPhrase?.lang}
            />
          )}

          {currentPhrase?.contentId && (
            <Link
              href={`/convos/${currentPhrase?.contentId}${currentPhrase?.start ? `?start=${currentPhrase?.start}` : ""}`}
            >
              <Icons.mandarin />
            </Link>
          )}

          <Link
            onClick={() => {
              setIfExists({ ...currentPhrase });
              trackFunction();
            }}
            href={getNmmLink({
              id: currentPhrase?.hanzi || currentPhrase?.input,
              lang: resolvedLang,
              contentId: currentPhrase?.contentId || contentId,
              context: currentPhrase?.hanzi || currentPhrase?.input,
            })}
          >
            <Icons.magnifyingGlass />
          </Link>

          {isSuperAdmin && currentPhrase?.id && !currentPhrase?.contentId && (
            <button
              disabled={
                deleteSentenceMutation.isPending ||
                deleteSentenceMutation.isSuccess
              }
              className="h-6 w-6 text-xs"
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

  const selectedCompInput = currentPhrase?.input || currentPhrase?.hanzi;

  return (
    <div className="flex flex-col items-center justify-between p-4 w-full bg-gray-50 dark:bg-[rgb(4,5,6)] my-2 rounded-2xl">
      <div role="button" className="flex flex-col w-full">
        {readMode ? (
          <>
            <div>
              {segmentedData ? (
                segmentedData.map((item, idx) => {
                  return (
                    <span
                      className={cn(
                        "inline-flex flex-col items-center justify-center",

                        ["，", "。"]?.includes(item?.input)
                          ? ""
                          : idx === 0
                            ? "pr-[2px] sm:pr-[4px]"
                            : "px-[2px] py-[0px] sm:px-[4px]",

                        "leading-none",
                        "py-[0px]",
                      )}
                      key={`${JSON.stringify(item)}-${idx}-${idx}`}
                    >
                      {item?.pinyin
                        ? isNonRomanLang(lang) &&
                          showPinyin && (
                            <span className="text-sm dark:text-gray-400 text-gray-800 lowercase">
                              {formatRoman(item)}
                            </span>
                          )
                        : null}

                      <span
                        onClick={() => {
                          const selectedText = getSelectedText();

                          router.push(
                            getNmmLink({
                              id: item?.input,
                              lang,
                              contentId: currentPhrase?.contentId || contentId,
                            }),
                          );
                        }}
                      >
                        {smartSplit({
                          input: item?.input,
                          lang: lang,
                        })?.map((character: any, idx: any) => {
                          return (
                            <span key={`${character}-pinin-view-${idx}`}>
                              <CharacterItem
                                hanzis={smartSplit({
                                  input: item?.input,
                                  lang: lang,
                                })}
                                className={"text-2xl"}
                                character={character}
                                onClick={() => {}}
                              />
                            </span>
                          );
                        })}
                      </span>
                    </span>
                  );
                })
              ) : (
                <div className="flex justify-between items-center w-full">
                  <WithInteractiveTitle
                    customRef={customRef}
                    text={selectedCompInput}
                    lang={lang}
                    className={
                      selectedCompInput?.length < 8
                        ? "lg:text-4xl text-4xl"
                        : "text-2xl"
                    }
                  >
                    <div>
                      {smartSplit({ input: selectedCompInput, lang })?.map(
                        (item: string, idx: number) => {
                          return (
                            <Link
                              className={
                                selectedCompInput?.length < 4
                                  ? "text-5xl"
                                  : "text-2xl"
                              }
                              key={`character-title-${item}-${idx}-${idx}`}
                              href={getNmmLink({
                                id: item,
                                contentId:
                                  currentPhrase?.contentId || contentId,

                                lang,
                              })}
                              // href={`/nmm/${item}?lang=${lang || "zh"}`}
                            >
                              <CharacterItem
                                hanzis={smartSplit({
                                  input: selectedCompInput,
                                  lang,
                                })}
                                className={
                                  selectedCompInput?.length < 8
                                    ? "lg:text-4xl text-4xl"
                                    : "text-2xl"
                                }
                                character={item}
                              />
                            </Link>
                          );
                        },
                      )}
                    </div>
                  </WithInteractiveTitle>
                </div>
              )}
            </div>
          </>
        ) : (
          <>
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
              text={chineseConverter(
                currentPhrase?.input || currentPhrase?.hanzi,
              )}
              lang={currentPhrase?.lang}
              className={"text-xl"}
            >
              <span>
                {smartSplit({
                  input: chineseConverter(
                    currentPhrase?.input || currentPhrase?.hanzi,
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
                            ?.replaceAll(",", ""),
                        );

                        trackNavigationFunction({
                          hanzi: cleanedVal,
                          input: cleanedVal,
                          lang: lang || currentPhrase?.lang,
                        } as any);

                        setIfExists({ ...currentPhrase });

                        const finalContentId =
                          currentPhrase?.contentId !== undefined
                            ? currentPhrase?.contentId
                            : contentId;

                        router.push(
                          getNmmLink({
                            id: cleanedVal,
                            lang: resolvedLang,
                            contentId: finalContentId,
                            context:
                              currentPhrase?.hanzi || currentPhrase?.input,
                          }),
                        );
                      }}
                    >
                      <CharacterItem
                        character={val}
                        hanzis={smartSplit({
                          input: chineseConverter(
                            currentPhrase?.input || currentPhrase?.hanzi,
                          ),
                          lang: currentPhrase?.lang,
                        })}
                      />
                    </span>
                  );
                })}
              </span>
            </WithInteractiveTitle>
          </>
        )}
        {showEn
          ? currentPhrase?.lang === "en"
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
                  {showChinglish && currentPhrase?.chinglish
                    ? currentPhrase?.chinglish
                    : currentPhrase?.en || currentPhrase?.title}
                </Link>
              ) : (
                <span className="text-[16px] dark:text-gray-500 text-gray-600">
                  {showChinglish && currentPhrase?.chinglish
                    ? currentPhrase?.chinglish
                    : currentPhrase?.en || currentPhrase?.title}
                </span>
              ))
          : null}
      </div>

      <Links customRef={customRef} />
    </div>
  );
};
