"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

import { useSetIfExists } from "@/app/(auth)/convos/[content-id]/hooks/use-character-context-store";
import { useRecentlyWatchedContent } from "@/app/(auth)/convos/use-recently-watched-content-store";
import { useGetComponentId } from "@/app/nmm/[component-id]/use-get-component-id";
import { useIsSuperAdmin } from "@/domain/auth/auth.queries";
import { useDeleteSentenceMutation } from "@/domain/sentence/use-delete-sentence-mutation";
import { formatRoman } from "@/lib/format-roman";
import { cn } from "@/lib/utils";
import { getNmmLink } from "@/libs/utils/get-nmm-link";
import {
  isChineseLang,
  pickPinyinSource,
  useSegmentTextQuery,
} from "@/libs/utils/segment-text";
import { chineseConverter } from "mandarino/src/utils/chinese-converter";
import { useMemo, useRef } from "react";
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
import { isCharacterPartOfWordMatch } from "@/lib/content-bookmark";
import { PlayButtonV2 } from "./play-button-v2";
import { useGetCharacterAnalytics } from "./use-get-character-analytics";
import { isNonRomanLang, isRomanLang } from "./utils/is-non-roman-lang";
import { WithInteractiveTitle } from "./with-interative-title";
import { useGetContentId } from "@/app/(auth)/convos/[content-id]/hooks/use-get-content-id";

/**
 * How the component the page is about is marked in a sentence.
 *
 * A patch behind the glyph, and nothing on the glyph itself: a character
 * already carries its own colour — tone, learned state, mode — and a highlight
 * that repainted it would be lying about where the character is.
 *
 * Both themes are the same purple at different weights, because the glyph they
 * sit behind is black on a white page and white on a black one. On white a thin
 * 25% wash is enough to mark the component without staining the page; on black
 * it goes solid, with a violet bloom so it reads as a lit mark rather than a
 * flat rectangle.
 */
const COMPONENT_HIGHLIGHT =
  "rounded-[4px] bg-purple-500/25 dark:bg-purple-500 dark:shadow-[0_0_12px_-2px_rgba(168,85,247,0.55)]";

/** A run of the sentence — a character, or a word for space-split languages. */
type SentencePart = { text: string; start: number };

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
    // The language this sentence is actually rendered as, not the raw prop.
    lang: resolvedLang,
    // The line carries its own pinyin/romanisation already: every word takes its
    // reading from there, so 了 stays `le` and 行 stays `háng`.
    originalPinyin: pickPinyinSource(
      currentPhrase?.pinyin,
      currentPhrase?.roman,
    ),
  });

  // A phrase that segments into a single item is one word on its own: opening
  // that word only ever lands back on the phrase we are already showing, so in
  // read mode each of its characters opens its own entry instead — 尴 in 尴尬
  // opens 尴.
  const opensCharacters =
    isChineseLang(resolvedLang) && segmentedData?.length === 1;

  const openPhrase = (id: string) => {
    router.push(
      getNmmLink({
        id,
        lang,
        contentId: currentPhrase?.contentId || contentId,
      }),
    );
  };

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

  // The sentence as it is drawn. `isCharacterPartOfWordMatch` is the reader's
  // own test for "this character is part of this word", so an entry page marks
  // its component inside a sentence exactly the way the reader marks a word
  // inside one of its lines — same function, same answer, no second opinion on
  // what counts as a match.
  const phraseText = chineseConverter(
    currentPhrase?.input || currentPhrase?.hanzi || "",
  );

  /** Whether the run of text starting at `start` holds the component. */
  const runIsComponent = (sentence: string, text: string, start: number) => {
    for (let index = 0; index < (text || "").length; index += 1) {
      if (
        isCharacterPartOfWordMatch(
          sentence,
          componentId,
          text[index],
          start + index,
        )
      ) {
        return true;
      }
    }

    return false;
  };

  /** The sentence's characters, each with the offset it starts at. */
  const phraseParts = useMemo<SentencePart[]>(() => {
    let offset = 0;

    return (
      smartSplit({ input: phraseText, lang: currentPhrase?.lang }) || []
    ).map((text: string) => {
      const start = offset;

      offset += (text || "").length;

      return { text, start };
    });
  }, [phraseText, currentPhrase?.lang]);

  const phraseCharacters = useMemo<string[]>(
    () => phraseParts.map(({ text }) => text),
    [phraseParts],
  );

  // Read mode draws the line differently — the plain input, split by the
  // language — so it gets its own offsets against its own text.
  const readSentence = selectedCompInput || "";

  const readParts = useMemo<SentencePart[]>(() => {
    let offset = 0;

    return (smartSplit({ input: readSentence, lang }) || []).map(
      (text: string) => {
        const start = offset;

        offset += (text || "").length;

        return { text, start };
      },
    );
  }, [readSentence, lang]);

  const readCharacters = useMemo<string[]>(
    () => readParts.map(({ text }) => text),
    [readParts],
  );

  // The segmented line is several words side by side; the offsets are measured
  // over the words joined back into the sentence they came from.
  const segmentSentence = useMemo(
    () =>
      (segmentedData || []).map((item: any) => item?.input || "").join(""),
    [segmentedData],
  );

  const segmentStarts = useMemo<number[]>(() => {
    let offset = 0;

    return (segmentedData || []).map((item: any) => {
      const start = offset;

      offset += (item?.input || "").length;

      return start;
    });
  }, [segmentedData]);

  return (
    <div className="flex flex-col items-center justify-between p-4 w-full bg-gray-50 dark:bg-[rgb(4,5,6)] my-2 rounded-2xl">
      <div role="button" className="flex flex-col w-full">
        {readMode ? (
          <>
            <div>
              {segmentedData ? (
                segmentedData.map((item, idx) => {
                  // Where this word's first character sits in the sentence, so
                  // the searched component can be marked inside the word.
                  let charCursor = segmentStarts[idx] || 0;

                  const wordCharacters = smartSplit({
                    input: item?.input,
                    lang: lang,
                  });

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
                          // The characters below handle their own navigation
                          // when this segment is the whole phrase.
                          if (opensCharacters) return;

                          openPhrase(item?.input);
                        }}
                      >
                        {wordCharacters?.map(
                          (character: any, charIdx: any) => {
                            const at = charCursor;

                            charCursor += (character || "").length;

                            const isComponent = runIsComponent(
                              segmentSentence,
                              character || "",
                              at,
                            );

                            return (
                              <span
                                key={`${character}-pinin-view-${charIdx}`}
                                onClick={(event) => {
                                  if (!opensCharacters) return;

                                  event.stopPropagation();
                                  openPhrase(character);
                                }}
                              >
                                <CharacterItem
                                  hanzis={wordCharacters}
                                  className={cn(
                                    "text-2xl",
                                    isComponent && COMPONENT_HIGHLIGHT,
                                  )}
                                  character={character}
                                  onClick={() => {}}
                                />
                              </span>
                            );
                          },
                        )}
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
                      {readParts.map(({ text: item, start }, idx: number) => {
                        const isComponent = runIsComponent(
                          readSentence,
                          item || "",
                          start,
                        );

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
                              contentId: currentPhrase?.contentId || contentId,

                              lang,
                            })}
                            // href={`/nmm/${item}?lang=${lang || "zh"}`}
                          >
                            <CharacterItem
                              hanzis={readCharacters}
                              className={cn(
                                isComponent && COMPONENT_HIGHLIGHT,
                                selectedCompInput?.length < 8
                                  ? "lg:text-4xl text-4xl"
                                  : "text-2xl",
                              )}
                              character={item}
                            />
                          </Link>
                        );
                      })}
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
                {phraseParts.map(({ text: val, start }, idy: number) => {
                  const isComponent = runIsComponent(phraseText, val, start);

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
                        hanzis={phraseCharacters}
                        className={cn(isComponent && COMPONENT_HIGHLIGHT)}
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
