/* eslint-disable react-hooks/exhaustive-deps */
import { CharacterItem } from "@/components/_select-character/character-item";
import { useGetCharacterLearningContext } from "@/components/_select-character/selected-character/use-get-character-learning-context";
import { Icons } from "@/components/ui/icons.v2";
import { useListGrammarsQuery } from "@/domain/sentence/grammar.queries";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useMemo, useRef, useState } from "react";
import { create } from "zustand";
import {
  ContentClozeModeButton,
  useClozeContentMode,
} from "../content-cloze-mode-button";
import { useReviewModeView } from "../use-review-mode";
import { getRandomWords } from "./utils/get-random-words";
import { shuffleArray } from "./utils/shuffle-array";
import { YoutubeButton } from "@/components/youtube-page/youtube-button";
import { useLearningMode } from "@/components/settings-dialog/learning-mode.store";
import { useIsContent } from "../use-is-content";
import { useGetContentQuery } from "@/domain/content/content.queries";
import { useSearchParams } from "next/navigation";
import { ReviewItemHanzi } from "./review-item-hanzi";
import { useListSentencesQuery } from "@/domain/sentence/sentence.queries";
import { DynoOptionsContainer } from "@/components/dyno-cloze-core/dyno-cloze-core";
import {
  isMulti,
  getMulti,
} from "@/app/(auth)/convos/[content-id]/dyna-cloze-sentence/utils/get-multi";
import { useListMeaningsQuery } from "@/domain/sentence/meaning.queries";
import { useListDiscoveryQuery } from "@/domain/sentence/use-list-discovery-query";
import { PlayButtonV2 } from "@/components/_select-character/play-button-v2";

const ClozeNavbar = ({
  onClose,
  currentCharacter,
  totalSentences,
  contentSentences,
}: {
  onClose?: () => void;
  currentCharacter: string;
  contentSentences: number;
  totalSentences: number;
}) => {
  const { setReviewMode } = useReviewModeView();
  return (
    <nav className="flex w-screen fixed top-4 left-0 items-center">
      <div className="flex-1 flex justify-start px-4">
        <button
          onClick={() => {
            if (onClose) {
              onClose();
            } else {
              setReviewMode(null);
            }
          }}
        >
          <Icons.xMark className="text-2xl" />
        </button>
      </div>
      <div className="flex-1 flex justify-center px-4">
        <h1 className="text-center font-bold text-2xl">dynacloze</h1>
      </div>
      <div className="flex-1 flex justify-end px-4">
        <ContentClozeModeButton />
        {/* <HskLevelSelector currentCharacter={currentCharacter} /> */}
      </div>
    </nav>
  );
};

// const useClozeIndexStore = create((set: any, get: any) => ({
//   clozeIndex: 0,
//   setClozeIndex: (clozeIndex: any) => set({ clozeIndex }),
// }));

// const useQuestionIndexStore = create((set: any, get: any) => ({
//   questionIndex: 0,
//   setQuestionIndex: (questionIndex: any) => set({ questionIndex }),
// }));

// const useWordIndexStore = create((set: any, get: any) => ({
//   wordIndex: 0,
//   setWordIndex: (wordIndex: any) => set({ wordIndex }),
// }));

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
  // const clozeIndex = useClozeIndexStore((state) => state.clozeIndex);
  // const setClozeIndex = useClozeIndexStore((state) => state.setClozeIndex);
  const [clozeIndex, setClozeIndex] = useState(0);

  // const questionIndex = useQuestionIndexStore((state) => state.questionIndex);
  // const setQuestionIndex = useQuestionIndexStore(
  //   (state) => state.setQuestionIndex
  // );
  const [questionIndex, setQuestionIndex] = useState(0);

  // const wordIndex = useWordIndexStore((state) => state.wordIndex);
  // const setWordIndex = useWordIndexStore((state) => state.setWordIndex);
  const [wordIndex, setWordIndex] = useState(0);
  const [response, setResponse] = useState<any>(null);
  const { setReviewMode } = useReviewModeView();

  const contextSentences = useGetCharacterLearningContext({
    lang,
    characterId: currentCharacter,
  });

  const { data: _aiSentences } = useListSentencesQuery({
    component: currentCharacter,
    lang,
  });

  const aiSentences = _aiSentences || [];

  // const { mode } = useLearningMode();

  const searchParams = useSearchParams();
  const mode = searchParams.get("mode") || "";

  const isContent = useIsContent(mode);

  const { data: content } = useGetContentQuery({ contentId: mode });

  const contentSentences = useMemo(
    () =>
      isContent
        ? content?.transcriptions
            ?.filter((transcription: any) => {
              return (transcription?.input || transcription?.hanzi)?.includes(
                currentCharacter
              );
            })
            ?.map((item: any) => {
              return {
                ...item,
                contentId: mode,
              };
            })
        : [],
    [isContent, content]
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
    [contextSentences, currentCharacter]
  );

  const sentences = useMemo(
    () => [
      ...(contentSentences || [])?.filter((sent: any) =>
        (sent?.input || sent?.hanzi)?.includes(currentCharacter)
      ),
      ...getRandomWords(
        [...(relevantContextSentences || [])]?.filter((sent: any) =>
          (sent?.input || sent?.hanzi)?.includes(currentCharacter)
        )
      ),
      ...aiSentences,
    ],
    [
      relevantContextSentences?.length,
      currentCharacter,
      contentSentences,
      aiSentences,
    ]
  );

  const { setClozeContentMode } = useClozeContentMode();

  const _sentence = useMemo(
    () => sentences?.[questionIndex],
    [sentences, questionIndex]
  );

  const isMultiSent = isMulti(_sentence?.input || _sentence?.hanzi);

  const multiSent = getMulti(_sentence?.input || _sentence?.hanzi)?.filter(
    (sent) => sent?.includes(currentCharacter)
  );

  const initSentence = useMemo(
    () =>
      isMultiSent
        ? {
            ..._sentence,
            hanzi: multiSent?.[0],
            input: multiSent?.[0],
          }
        : { _sentence, hanzi: multiSent?.[0], input: multiSent?.[0] },
    [isMultiSent, _aiSentences, multiSent]
  );

  const { data: sentence } = useListDiscoveryQuery({
    content: initSentence?.hanzi || initSentence.input,
    lang,
  });

  const futureSentence = useMemo(
    () => sentences?.[questionIndex + 1],
    [sentences, questionIndex]
  );

  const { data: grammar, isLoading: isGrammarLoading } = useListGrammarsQuery({
    sentenceId: sentence?.input || sentence?.hanzi,
    content: sentence?.input || sentence?.hanzi,
    lang: sentence?.lang,
  });

  const shuffledGrammar = useMemo(() => {
    if (!grammar) {
      return [];
    }

    return shuffleArray(
      grammar?.grammarAnalysis?.filter(
        (analysis) =>
          analysis?.input?.toLowerCase() !==
          (sentence?.input || sentence?.hanzi)?.toLowerCase()
      )
    );
  }, [grammar, sentence?.hanzi, sentence?.input]);

  const selectedGrammar = useMemo(
    () => shuffledGrammar?.[wordIndex],
    [shuffledGrammar, wordIndex]
  );

  const relevantHanzi = useMemo(
    () => selectedGrammar?.input || selectedGrammar?.hanzi,
    [selectedGrammar?.hanzi]
  );

  const toggleEn = () => {
    return setShowEn(!showEn);
  };

  const randomThreeOptions = useMemo(
    () =>
      getRandomWords(
        [
          ...new Set(
            shuffledGrammar?.filter(
              (item: any) => (item?.input || item.hanzi) !== relevantHanzi
            )
          ),
        ],
        3
      ),
    [relevantHanzi, shuffledGrammar]
  );
  const shuffledOptions = useMemo(
    () => shuffleArray([...randomThreeOptions, selectedGrammar]),
    [randomThreeOptions, relevantHanzi, questionIndex, sentence]
  );

  const sentenceHanzi = useMemo(
    () =>
      (sentence?.input || sentence?.hanzi)?.replaceAll(relevantHanzi, " ____ "),
    [relevantHanzi, sentence?.hanzi, sentence?.input]
  );

  const checkAnswer = (answer: string) => {
    if (answer === relevantHanzi) {
      setResponse({ type: "correct", answer });
    } else {
      setResponse({ type: "incorrect", answer });
    }
  };

  if (isLoading || isGrammarLoading) {
    return (
      <div>
        <p className="text-center mt-32">Loading...</p>
      </div>
    );
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

      {sentence && (
        <div className="mt-24 lg:mt-32">
          {response ? (
            <Link
              target="_blank"
              href={`/nmm/${sentence?.input || sentence?.hanzi}?lang=${lang || sentence?.lang}`}
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
            input={
              response ? sentence?.input || sentence?.hanzi : sentenceHanzi
            }
            lang={sentence?.lang}
          />

          <Link
            target="_blank"
            href={`/convos/${initSentence?.contentId}${initSentence?.start ? `?start=${initSentence?.start}` : ""}`}
            className="block"
          >
            <p className="text-center mt-4">{sentence?.en} </p>
          </Link>

          <DynoOptionsContainer>
            {shuffledOptions?.map((option: any, idx: number) => {
              if (response) {
                return (
                  <Link
                    target="_blank"
                    href={`/nmm/${option?.input || option?.hanzi}?lang=${sentence?.lang}`}
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
                        : "hover:bg-orange-500 hover:text-white hover:scale-110"
                    )}
                    key={`dynacloze-${idx}-${option?.en}-${option?.hanzi}`}
                  >
                    <span className="block">
                      {/* {JSON.stringify(option)} */}
                      {showEn
                        ? option?.en
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
                        ? response?.answer === option?.input
                          ? response?.type === "correct"
                            ? "bg-green-500 border-green-600 hover:bg-green-600"
                            : "bg-red-500 hover:bg-red-600 border-red-500"
                          : "bg-gray-800 opacity-10 text-gray-200 border-gray-500"
                        : "",
                      "transition",
                      response
                        ? ""
                        : "hover:bg-orange-500 hover:text-white hover:scale-110"
                    )}
                    key={`dynacloze-${idx}-${option?.en}`}
                  >
                    <span className="block">
                      {showEn ? option?.en : option?.input || option?.hanzi}{" "}
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
                  <Link
                    href={`/nmm/${relevantHanzi}?lang=${lang}`}
                    target="_blank"
                  >
                    {relevantHanzi}
                  </Link>
                </p>
              ) : (
                <p className="my-8 text-center text-gray-500">
                  Learn more:{" "}
                  <Link
                    href={`/nmm/${relevantHanzi}?lang=${lang}`}
                    target="_blank"
                  >
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
                      shuffledGrammar?.length === wordIndex + 1
                        ? 0
                        : Math.min(wordIndex + 1, shuffledGrammar?.length - 1)
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
            <button
              onClick={() => {
                toggleEn();
              }}
            >
              {showEn ? "Hide En" : "Show En"}
            </button>

            {isMultiSent ? (
              <PlayButtonV2
                customRef={customRef}
                text={sentence?.input || sentence?.hanzi}
                lang={sentence?.lang}
                className={cn("text-xl")}
              />
            ) : (
              initSentence?.contentId && (
                <YoutubeButton
                  sentenceInput={sentence?.input || sentence?.hanzi}
                  contentId={initSentence?.contentId}
                  transcriptId={sentence?.id}
                />
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
}
