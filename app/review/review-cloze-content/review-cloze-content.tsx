import {
  getMulti,
  isMulti,
} from "@/app/(auth)/convos/[content-id]/dyna-cloze-sentence/utils/get-multi";

import { PlayButtonV2 } from "@/components/_select-character/play-button-v2";
import { useGetCharacterLearningContext } from "@/components/_select-character/selected-character/use-get-character-learning-context";
import { DynoOptionsContainer } from "@/components/dyno-cloze-core/dyno-cloze-core";
import { DynoClozeLoader } from "@/components/dyno-cloze-core/dyno-cloze-loader";
import { DynaClozeNavbar } from "@/components/dyno-cloze-core/dyno-cloze-navbar";
import { useBrightModeStore } from "@/components/settings-dialog/use-bright-mode-store";
import { useChinglishState } from "@/components/settings-dialog/use-chinglish-state";
import { Icons } from "@/components/ui/icons.v2";
import { YoutubeButton } from "@/components/youtube-page/youtube-button";
import { useGetContentQuery } from "@/domain/content/content.queries";
import { useListGrammarsQuery } from "@/domain/sentence/grammar.queries";
import { useListSentencesQuery } from "@/domain/sentence/sentence.queries";
import { useListDiscoveryQuery } from "@/domain/sentence/use-list-discovery-query";
import { cn } from "@/lib/utils";
import { getNmmLink } from "@/libs/utils/get-nmm-link";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useMemo, useRef, useState } from "react";
import {
  ClozeWord,
  getClozeDistractors,
  getClozeWordText,
  splitSentenceWords,
} from "@/app/review/review-cloze/utils/split-sentence-words";
import { useClozeContentMode } from "../content-cloze-mode-button";
import { useIsContent } from "../use-is-content";
import { useReviewModeView } from "../use-review-mode";
import { ReviewItemHanzi } from "./review-item-hanzi";
import { getRandomWords } from "./utils/get-random-words";
import { shuffleArray } from "./utils/shuffle-array";

const ClozeNavbar = ({
  onClose,
  currentCharacter,
}: {
  onClose?: () => void;
  currentCharacter: string;
  contentSentences: number;
  totalSentences: number;
}) => {
  const { setReviewMode } = useReviewModeView();

  return (
    <DynaClozeNavbar
      hideDynaClozeR
      input={currentCharacter}
      onClose={() => {
        if (onClose) {
          onClose();
        } else {
          setReviewMode(null);
        }
      }}
    />
  );
};

export function ReviewClozeContent({
  currentCharacter,
  lang,
  isLoading,
  onClose,
  backButton: BackButton,
}: {
  currentCharacter: string;
  lang: string;
  isLoading?: boolean;
  onClose?: () => void;
  backButton?: any;
}) {
  const customRef = useRef(null) as any;
  const [showEn, setShowEn] = useState(false);

  const [clozeIndex, setClozeIndex] = useState(0);

  const [questionIndex, setQuestionIndex] = useState(0);

  const [wordIndex, setWordIndex] = useState(0);
  const [response, setResponse] = useState<any>(null);
  const { setReviewMode } = useReviewModeView();

  const contextSentences = useGetCharacterLearningContext({
    lang,
    characterId: currentCharacter,
  });

  const { data: _aiSentences, isLoading: isSentencesLoading } =
    useListSentencesQuery({
      component: currentCharacter,
      lang,
    });

  const aiSentences = _aiSentences || [];

  const searchParams = useSearchParams();
  const mode = searchParams.get("mode") || "";

  const isContent = useIsContent(mode);

  const { data: content, isLoading: isContentLoading } = useGetContentQuery({
    contentId: mode,
  });

  const contentSentences = useMemo(
    () =>
      isContent
        ? content?.transcriptions
            ?.filter((transcription: any) => {
              return (transcription?.input || transcription?.hanzi)?.includes(
                currentCharacter,
              );
            })
            ?.map((item: any) => {
              return {
                ...item,
                contentId: mode,
              };
            })
        : [],
    [isContent, content],
  );

  const relevantContextSentences = useMemo(
    () =>
      (contextSentences || [])?.filter((sentence: any) => {
        return (
          (sentence?.input || sentence?.hanzi)?.includes(currentCharacter) &&
          sentence?.input?.length < 20 &&
          sentence?.input?.length > 2
        );
      }),
    [contextSentences, currentCharacter],
  );

  const sentences = useMemo(
    () => [
      ...(contentSentences || [])?.filter((sent: any) =>
        (sent?.input || sent?.hanzi)?.includes(currentCharacter),
      ),
      ...getRandomWords(
        [...(relevantContextSentences || [])]?.filter((sent: any) =>
          (sent?.input || sent?.hanzi)?.includes(currentCharacter),
        ),
      ),
      ...aiSentences,
    ],
    [
      relevantContextSentences?.length,
      currentCharacter,
      contentSentences,
      aiSentences,
    ],
  );

  const { setClozeContentMode } = useClozeContentMode();

  const _sentence = useMemo(
    () => sentences?.[questionIndex],
    [sentences, questionIndex],
  );

  const isMultiSent = isMulti(_sentence?.input || _sentence?.hanzi);

  const multiSent = getMulti(_sentence?.input || _sentence?.hanzi)?.filter(
    (sent) => sent?.includes(currentCharacter),
  );

  const showPinyin = useBrightModeStore((state) => state.showPinyin);
  const showEnPreview = useBrightModeStore((state) => state.showEn);
  const { showChinglish } = useChinglishState();

  const initSentence = useMemo(
    () =>
      isMultiSent
        ? {
            ..._sentence,
            hanzi: multiSent?.[0],
            input: multiSent?.[0],
          }
        : { ..._sentence, hanzi: multiSent?.[0], input: multiSent?.[0] },
    [isMultiSent, _aiSentences, multiSent],
  );

  // The line on screen as the sentence itself carries it — nothing is fetched
  // to know what to ask, so the question can be asked the moment the sentence
  // list lands.
  const sentenceText = initSentence?.hanzi || initSentence?.input;
  const sentenceLang = initSentence?.lang || lang;

  /**
   * The translation of that line — the "summary".
   *
   * The call is still made (and react-query keeps it for the next question),
   * but nothing waits on it any more: the blank and its options do not need
   * English, and a translation that arrives late can join the line instead of
   * holding the whole screen back while it is generated.
   */
  const { data: summary } = useListDiscoveryQuery({
    content: sentenceText,
    lang: sentenceLang,
  });

  const futureSentence = useMemo(
    () => sentences?.[questionIndex + 1],
    [sentences, questionIndex],
  );

  // Asked for the sentence itself rather than for the summary's copy of it, so
  // the two calls go off side by side instead of one after the other.
  const { data: grammar } = useListGrammarsQuery({
    sentenceId: sentenceText,
    content: sentenceText,
    lang: sentenceLang,
  });

  const grammarWords = useMemo(() => {
    if (!grammar) {
      return [] as ClozeWord[];
    }

    return shuffleArray(
      grammar?.grammarAnalysis?.filter(
        (analysis) =>
          (analysis?.input || analysis?.hanzi)?.toLowerCase() !==
          sentenceText?.toLowerCase(),
      ),
    ) as ClozeWord[];
  }, [grammar, sentenceText]);

  // Read mode's splitter, standing in while the analysis is on its way: the
  // words of the sentence are already in the browser, so the first question
  // costs nothing to put together.
  const splitWords = useMemo(
    () => splitSentenceWords(sentenceText, sentenceLang),
    [sentenceText, sentenceLang],
  );

  /**
   * The words one question is built from, fixed when the question opens: the
   * analysis if it had already arrived by then, the sentence's own split if it
   * had not.
   *
   * The analysis is slow, so most questions open on the split — and they
   * finish on it too. Re-blanking the sentence the moment the analysis landed
   * would move the question out from under an answer being picked, or worse,
   * from under one already picked; the next question is soon enough to pick
   * the analysis up.
   */
  const questionWords = useRef<{ key: string; words: ClozeWord[] } | null>(
    null,
  );

  // The character and the line are part of the key: the same component asks
  // the next character's questions, and it must not answer them with the words
  // of the one before.
  const questionKey = `${currentCharacter}|${sentenceText}|${clozeIndex}:${questionIndex}`;

  const clozeWords = useMemo(() => {
    if (!sentenceText) {
      return [] as ClozeWord[];
    }

    if (
      !questionWords.current?.words?.length ||
      questionWords.current?.key !== questionKey
    ) {
      const words = grammarWords?.length ? grammarWords : splitWords;

      // A sentence with no words in it has nothing to ask; the next render
      // (the analysis, or the sentence arriving) gets another try.
      if (!words?.length) {
        return [] as ClozeWord[];
      }

      questionWords.current = { key: questionKey, words };
    }

    return questionWords.current?.words || ([] as ClozeWord[]);
  }, [sentenceText, questionKey, grammarWords, splitWords]);

  const selectedWord = useMemo(
    () =>
      clozeWords?.length
        ? clozeWords[wordIndex % clozeWords.length]
        : undefined,
    [clozeWords, wordIndex],
  );

  const relevantHanzi = useMemo(
    () => getClozeWordText(selectedWord),
    [selectedWord],
  );

  const toggleEn = () => {
    return setShowEn(!showEn);
  };

  const randomThreeOptions = useMemo(
    () => getClozeDistractors(clozeWords, relevantHanzi),
    [clozeWords, relevantHanzi],
  );

  const shuffledOptions = useMemo(
    () => shuffleArray([...randomThreeOptions, selectedWord]),
    [randomThreeOptions, selectedWord],
  );

  const sentenceHanzi = useMemo(
    () => sentenceText?.replaceAll(relevantHanzi, " ____ "),
    [relevantHanzi, sentenceText],
  );

  const checkAnswer = (answer: string) => {
    if (answer === relevantHanzi) {
      setResponse({ type: "correct", answer });
    } else {
      setResponse({ type: "incorrect", answer });
    }
  };

  // English for an option is the analysis' own — a split word has none. So the
  // switch that swaps the options into English only appears once the analysis
  // is in, rather than swapping to the same words back.
  const canShowEn = !!grammar?.grammarAnalysis?.length;

  // The English joins the line as soon as any of its two sources has it.
  const enPreview = showChinglish
    ? summary?.chinglish || summary?.en || initSentence?.en
    : summary?.en || initSentence?.en;

  if (isLoading) {
    return <DynoClozeLoader message="Loading..." />;
  }

  // The sentence list is the question itself — there is nothing to ask before
  // it arrives. The summary and the grammar analysis are not: they join the
  // question rather than gate it.
  if (isSentencesLoading || (sentences?.length === 0 && isContentLoading)) {
    return <DynoClozeLoader message="Loading sentences..." />;
  }

  if (sentences?.length === 0) {
    return (
      <div>
        <ClozeNavbar
          totalSentences={sentences?.length}
          contentSentences={contentSentences?.length}
          onClose={onClose}
          currentCharacter={currentCharacter}
        />

        <div className="flex justify-center items-center flex-col mt-32">
          <h4 className="text-center mb-8">Nothing here</h4>

          <div className="flex justify-between items-center gap-4">
            {BackButton ? (
              <BackButton />
            ) : (
              <button
                onClick={() => {
                  setClozeContentMode("hsk");
                }}
              >
                {" "}
                Back to hsk mode
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (questionIndex > sentences?.length - 1) {
    return (
      <div>
        <ClozeNavbar
          totalSentences={sentences?.length}
          contentSentences={contentSentences?.length}
          onClose={onClose}
          currentCharacter={currentCharacter}
        />

        <div className="flex justify-center items-center flex-col mt-32">
          <h4 className="text-center mb-8">Nothing here</h4>

          <div className="flex justify-between items-center gap-4">
            <button
              onClick={() => {
                setClozeIndex(0);
                setQuestionIndex(0);
              }}
            >
              {" "}
              Restart
            </button>

            {BackButton ? (
              <BackButton />
            ) : (
              <button
                onClick={() => {
                  setReviewMode("classic");
                }}
              >
                {" "}
                Back to classic mode
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-32 px-8">
      <ClozeNavbar
        totalSentences={sentences?.length}
        contentSentences={contentSentences?.length}
        onClose={onClose}
        currentCharacter={currentCharacter}
      />

      {sentenceText && selectedWord && (
        <div className="mt-24 lg:mt-32">
          {showPinyin ? (
            <Link
              href={`/nmm/${sentenceText}?lang=${sentenceLang}`}
              className="block text-center mb-4"
            >
              {summary?.roman ||
                summary?.pinyin ||
                initSentence?.roman ||
                initSentence?.pinyin}
            </Link>
          ) : (
            <p className="block text-center mb-4 dark:text-black text-white">
              ...
            </p>
          )}

          <ReviewItemHanzi
            input={response ? sentenceText : sentenceHanzi}
            lang={sentenceLang}
          />

          {/* No English yet, no English shown — it appears with the sentence
              the moment either source has it, rather than holding the screen. */}
          {showEnPreview && !!enPreview && (
            <Link
              href={`/convos/${initSentence?.contentId}${initSentence?.start ? `?start=${initSentence?.start}` : ""}`}
              className="block"
            >
              <p className="text-center mt-4">{enPreview} </p>
            </Link>
          )}

          <DynoOptionsContainer>
            {shuffledOptions?.map((option: any, idx: number) => {
              if (response) {
                return (
                  <Link
                    href={getNmmLink({
                      id: option?.hanzi || option?.input,
                      lang: sentenceLang,
                    })}
                    className={cn(
                      "border-orange-400 text-black  border-[2px] p-2 dark:text-white text-lg block text-center",
                      response
                        ? response?.answer === (option?.input || option?.hanzi)
                          ? response?.type === "correct"
                            ? "bg-green-500 border-green-600 hover:bg-green-600"
                            : "bg-red-500 hover:bg-red-600 border-red-500"
                          : "bg-gray-800 opacity-10 text-gray-200 border-gray-500"
                        : "",
                      "transition",
                      response
                        ? ""
                        : "hover:bg-orange-500 hover:text-white hover:scale-110",
                    )}
                    key={`dynacloze-${idx}-${option?.en}-${option?.hanzi}`}
                  >
                    <span className="block">
                      {/* {JSON.stringify(option)} */}
                      {/* The words of a split have no English of their own —
                          until the analysis lands, the option stays readable
                          instead of going blank. */}
                      {showEn
                        ? option?.en || option?.input || option?.hanzi
                        : option?.input || option?.hanzi}{" "}
                      {/* {response && <span>({showEn ? option?.hanzi : option?.en})</span>} */}
                    </span>
                  </Link>
                );
              } else {
                return (
                  <button
                    onClick={() => {
                      checkAnswer(option?.input || option?.hanzi);
                    }}
                    disabled={response?.type}
                    className={cn(
                      "border-orange-400 text-black  border-[2px] p-2 dark:text-white text-lg",
                      response
                        ? response?.answer ===
                          (option?.input || option?.hanzi)
                          ? response?.type === "correct"
                            ? "bg-green-500 border-green-600 hover:bg-green-600"
                            : "bg-red-500 hover:bg-red-600 border-red-500"
                          : "bg-gray-800 opacity-10 text-gray-200 border-gray-500"
                        : "",
                      "transition",
                      response
                        ? ""
                        : "hover:bg-orange-500 hover:text-white hover:scale-110",
                    )}
                    key={`dynacloze-${idx}-${option?.en}`}
                  >
                    <span className="block">
                      {showEn
                        ? option?.en || option?.input || option?.hanzi
                        : option?.input || option?.hanzi}{" "}
                      {/* {response && <span>({showEn ? option?.hanzi : option?.en})</span>} */}
                    </span>
                  </button>
                );
              }
            })}
          </DynoOptionsContainer>

          {response && (
            <div>
              {response?.type === "incorrect" ? (
                <p className="my-8 text-center">
                  Oops, your answer is incorrect. Correct answer is:{" "}
                  <Link href={`/nmm/${relevantHanzi}?lang=${lang}`}>
                    {relevantHanzi}
                  </Link>
                </p>
              ) : (
                <p className="my-8 text-center text-gray-500">
                  Learn more:{" "}
                  <Link href={`/nmm/${relevantHanzi}?lang=${lang}`}>
                    {relevantHanzi}
                  </Link>
                </p>
              )}

              <div className="flex justify-center items-center gap-8 mt-8">
                <button
                  onClick={() => {
                    setReviewMode(null);
                  }}
                  className="hover:scale-125 transition hover:font-bold"
                >
                  <Icons.xMark className="text-2xl" />
                </button>

                <button
                  onClick={() => {
                    setWordIndex(
                      clozeWords?.length === wordIndex + 1
                        ? 0
                        : Math.min(wordIndex + 1, clozeWords?.length - 1),
                    );
                    setResponse(null);
                  }}
                  className="hover:scale-125 transition hover:font-bold"
                >
                  <Icons.arrowDown className="text-2xl" />
                </button>

                <button
                  onClick={() => {
                    if (!futureSentence) {
                      setClozeIndex(clozeIndex + 1);
                      setQuestionIndex(0);
                      setWordIndex(0);
                      setResponse(null);
                    } else {
                      setQuestionIndex(questionIndex + 1);
                      setResponse(null);
                    }
                  }}
                  className="hover:scale-125 transition hover:font-bold"
                >
                  <Icons.arrowRight className="text-2xl" />
                </button>
              </div>
            </div>
          )}

          <div className="flex justify-center items-center mt-8 gap-8">
            {/* Only the analysis has English for these options; before it
                arrives there is nothing for this button to swap. */}
            {canShowEn && (
              <button
                onClick={() => {
                  toggleEn();
                }}
              >
                {showEn ? "Hide En" : "Show En"}
              </button>
            )}

            {initSentence?.contentId ? (
              <YoutubeButton
                sentenceInput={sentenceText}
                contentId={initSentence?.contentId}
                transcriptId={initSentence?.id}
              />
            ) : isMultiSent ? (
              <PlayButtonV2
                customRef={customRef}
                text={sentenceText}
                lang={sentenceLang}
                className={cn("text-xl")}
              />
            ) : (
              initSentence?.contentId && (
                <YoutubeButton
                  sentenceInput={sentenceText}
                  contentId={initSentence?.contentId}
                  transcriptId={initSentence?.id}
                />
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
}
