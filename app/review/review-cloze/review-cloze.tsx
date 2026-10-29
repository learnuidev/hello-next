/* eslint-disable react-hooks/exhaustive-deps */
import { PlayButtonV2 } from "@/components/_select-character/play-button-v2";
import { useGetCharacterLearningContext } from "@/components/_select-character/selected-character/use-get-character-learning-context";
import { DynoOptionsContainer } from "@/components/dyno-cloze-core/dyno-cloze-core";
import { DynoClozeLoader } from "@/components/dyno-cloze-core/dyno-cloze-loader";
import { DynaClozeNavbar } from "@/components/dyno-cloze-core/dyno-cloze-navbar";
import { useLearningMode } from "@/components/settings-dialog/learning-mode.store";
import { Icons } from "@/components/ui/icons.v2";
import { YoutubeButton } from "@/components/youtube-page/youtube-button";
import { useGetContentQuery } from "@/domain/content/content.queries";
import { useListHSKWordsQuery } from "@/domain/hsk/hsk.queries";
import { useListGrammarsQuery } from "@/domain/sentence/grammar.queries";
import { useListSentencesQuery } from "@/domain/sentence/sentence.queries";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useMemo, useRef, useState } from "react";
import { ReviewItemHanzi } from "../review-cloze-content/review-item-hanzi";
import { useIsContent } from "../use-is-content";
import { useHskLevel, useReviewModeView } from "../use-review-mode";
import {
  ClozeWord,
  getClozeDistractors,
  getClozeWordText,
  splitSentenceWords,
} from "./utils/split-sentence-words";
import { getRandomWords } from "./utils/get-random-words";
import { shuffleArray } from "./utils/shuffle-array";
import { getNmmLink } from "@/libs/utils/get-nmm-link";

const ClozeNavbar = ({
  onClose,
  currentCharacter,
  totalSentences,
}: {
  onClose?: () => void;
  currentCharacter: string;
  totalSentences: number;
}) => {
  const { setReviewMode } = useReviewModeView();
  return (
    <DynaClozeNavbar
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

export function ReviewCloze({
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
  const [response, setResponse] = useState<any>(null);
  const { setReviewMode } = useReviewModeView();
  const [wordIndex, setWordIndex] = useState(0);

  const { mode } = useLearningMode();

  const contextSentences = useGetCharacterLearningContext({
    lang,
    characterId: currentCharacter,
  });

  const isContent = useIsContent(mode);

  const { data: content } = useGetContentQuery({ contentId: mode });

  const contentSentences = useMemo(
    () =>
      isContent
        ? content?.transcriptions
            ?.filter((transcription: any) => {
              return (transcription?.hanzi || transcription?.input)?.includes(
                currentCharacter,
              );
            })
            .map((item: any) => {
              return {
                ...item,
                contentId: mode,
              };
            })
        : [],
    [isContent, content],
  );

  const { data: hskWords } = useListHSKWordsQuery();

  const { hskLevel, setHskLevel } = useHskLevel();

  const relevantHskWords = useMemo(
    () =>
      shuffleArray(
        (
          hskWords?.filter((word: any) =>
            JSON.stringify(word)?.includes(currentCharacter),
          ) || []
        ).filter((word: any) => {
          if (hskLevel == "0") {
            return true;
          }

          return word.hskLevel <= hskLevel;
        }),
      ),
    [currentCharacter, hskLevel, hskWords],
  );
  const irrelevantHskWords = useMemo(
    () =>
      shuffleArray(
        hskWords?.filter(
          (word: any) => !JSON.stringify(word)?.includes(currentCharacter),
        ) || [],
      ),
    [currentCharacter, hskWords],
  );

  const relevantHskWord = useMemo(
    () => relevantHskWords?.[clozeIndex],
    [clozeIndex, relevantHskWords],
  );

  const _relevantHanzi = relevantHskWord?.hanzi;

  const { data: sentencesInitial, isLoading: isSentenceLoading } =
    useListSentencesQuery({
      component: _relevantHanzi,
      lang,
    });

  // eslint-disable-next-line react-hooks/exhaustive-deps

  const relevantContextSentences = useMemo(
    () =>
      (contextSentences || [])?.filter((sent: any) => {
        return (
          (sent?.input || sent?.hanzi)?.includes(_relevantHanzi) &&
          sent?.input?.length < 20
        );
      }),
    [contextSentences, _relevantHanzi],
  );

  const sentences = useMemo(
    () => [
      ...(contentSentences || [])?.filter((sent: any) =>
        (sent?.input || sent?.hanzi)?.includes(_relevantHanzi),
      ),
      ...getRandomWords(
        [
          ...(relevantContextSentences || []),
          ...(sentencesInitial || []),
        ]?.filter((sent: any) =>
          (sent?.input || sent?.hanzi)?.includes(_relevantHanzi),
        ),
      ),
    ],
    [_relevantHanzi, sentencesInitial, contentSentences],
  );

  const sentence = useMemo(
    () => sentences?.[questionIndex],
    [sentences, questionIndex],
  );

  const sentenceText = sentence?.hanzi || sentence?.input;
  const sentenceLang = sentence?.lang || lang;

  // Still fetched — but no longer waited on. The question is built from the
  // words the sentence already has, and the analysis takes over from the next
  // question on, once it is in the cache.
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
  // words of the sentence cost nothing to find in the browser.
  const splitWords = useMemo(
    () => splitSentenceWords(sentenceText, sentenceLang),
    [sentenceText, sentenceLang],
  );

  /**
   * The words one question is built from, fixed when the question opens: the
   * analysis if it had already arrived by then, the sentence's own split if it
   * had not.
   *
   * A question finishes on whatever it started on. Re-blanking the sentence
   * the moment the analysis landed would move the question out from under an
   * answer being picked, or worse, from under one already picked.
   */
  const questionWords = useRef<{ key: string; words: ClozeWord[] } | null>(
    null,
  );

  // The character and the sentence are part of the key: the same component
  // asks the next character's questions, and it must not answer them with the
  // words of the one before.
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

  const futureSentence = useMemo(
    () => sentences?.[questionIndex + 1],
    [sentences, questionIndex],
  );

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

  // English for an option is the analysis' own — a split word has none. So the
  // switch that swaps the options into English only appears once the analysis
  // is in, rather than swapping to the same words back.
  const canShowEn = !!grammar?.grammarAnalysis?.length;

  const checkAnswer = (answer: string) => {
    if (answer === relevantHanzi) {
      setResponse({ type: "correct", answer });
    } else {
      setResponse({ type: "incorrect", answer });
    }
  };

  const toggleEn = () => {
    return setShowEn(!showEn);
  };

  if (isLoading) {
    return <DynoClozeLoader message="Loading..." />;
  }

  // The sentence is the question; there is nothing to ask before it arrives.
  // The grammar analysis is not — it joins the question rather than gates it.
  if (isSentenceLoading) {
    return <DynoClozeLoader message="Loading sentences..." />;
  }

  if (
    relevantHskWords &&
    (clozeIndex > relevantHskWords?.length - 1 || !sentence)
  ) {
    return (
      <div>
        <ClozeNavbar
          totalSentences={sentences?.length}
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
        onClose={onClose}
        currentCharacter={currentCharacter}
      />

      {sentenceText && selectedWord && (
        <div className="mt-24 lg:mt-32">
          {response ? (
            <Link
              href={`/nmm/${sentenceText}?lang=${sentenceLang}`}
              className="block text-center mb-4"
            >
              {sentence?.roman || sentence?.pinyin}
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

          {/* No English on the sentence, no English on the screen — it shows up
              when a sentence that has some arrives, instead of an empty line. */}
          {!!sentence?.en && (
            <Link
              href={`/convos/${sentence?.contentId}${sentence?.start ? `?start=${sentence?.start}` : ""}`}
              className="block"
            >
              <p className="text-center mt-4">{sentence?.en}</p>
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
                      {/* A word of a split has no English of its own — until
                          the analysis lands, the option stays readable. */}
                      {showEn
                        ? option?.en || option?.hanzi || option?.input
                        : option?.hanzi || option?.input}{" "}
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
                        ? option?.en || option?.hanzi || option?.input
                        : option?.hanzi || option?.input}{" "}
                    </span>
                  </button>
                );
              }
            })}
          </DynoOptionsContainer>

          {response && (
            <div>
              {/* {response?.type === "incorrect" ? (
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
              )} */}

              <div className="flex justify-center items-center gap-8 mt-8">
                <button
                  onClick={() => {
                    setReviewMode(null);
                  }}
                  className="hover:scale-125 transition hover:font-bold"
                >
                  <Icons.xMark className="text-2xl" />
                </button>
                {futureSentence && (
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
                )}
                {futureSentence && (
                  <button
                    onClick={() => {
                      setWordIndex(0);
                      setResponse(null);
                      setQuestionIndex(questionIndex + 1);
                    }}
                    className="hover:scale-125 transition hover:font-bold"
                  >
                    <Icons.shuffle className="text-2xl" />
                  </button>
                )}
                {/* {futureSentence && ( */}
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
                    // setClozeIndex(clozeIndex + 1);
                    // setWordIndex(0);
                    // setQuestionIndex(0);
                    // setResponse(null);
                  }}
                  className="hover:scale-125 transition hover:font-bold"
                >
                  <Icons.arrowRight className="text-2xl" />
                </button>
                {/* )} */}
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

            {sentence?.contentId ? (
              <YoutubeButton
                sentenceInput={sentenceText}
                contentId={sentence?.contentId}
                transcriptId={sentence?.id}
              />
            ) : (
              <PlayButtonV2
                customRef={customRef}
                text={sentenceText}
                lang={sentenceLang}
                className={cn("text-xl")}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}
