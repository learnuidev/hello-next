/* eslint-disable react-hooks/exhaustive-deps */
import { CharacterItem } from "@/components/_select-character/character-item";
import { useGetCharacterLearningContext } from "@/components/_select-character/selected-character/use-get-character-learning-context";
import { Icons } from "@/components/ui/icons.v2";
import { useListHSKWordsQuery } from "@/domain/hsk/hsk.queries";
import { useListSentencesQuery } from "@/domain/sentence/sentence.queries";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useMemo, useState } from "react";
import { useHskLevel, useReviewModeView } from "../use-review-mode";
import { getRandomWords } from "./utils/get-random-words";
import { shuffleArray } from "./utils/shuffle-array";
import { useListGrammarsQuery } from "@/domain/sentence/grammar.queries";
import { ContentClozeModeButton } from "../content-cloze-mode-button";

const ClozeNavbar = ({
  onClose,
  currentCharacter,
  contentId,
}: {
  onClose?: () => void;
  currentCharacter: string;
  contentId: string;
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
        <h1 className="text-center font-bold text-2xl">cloze</h1>
      </div>
      <div className="flex-1 flex justify-end px-4">
        <ContentClozeModeButton contentId={contentId} />
        {/* <HskLevelSelector currentCharacter={currentCharacter} /> */}
      </div>
    </nav>
  );
};

export function ReviewClozeContent({
  contentId,
  currentCharacter,
  lang,
  isLoading,
  onClose,
  backButton: BackButton,
}: {
  contentId: string;
  currentCharacter: string;
  lang: string;
  isLoading?: boolean;
  onClose?: () => void;
  backButton?: any;
}) {
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

  const relevantContextSentences = useMemo(
    () =>
      (contextSentences || [])?.filter((sentence: any) => {
        return (
          (sentence?.hanzi || sentence?.input)?.includes(currentCharacter) &&
          sentence?.input?.length < 20 &&
          sentence?.input?.length > 2
        );
      }),
    [contextSentences, currentCharacter]
  );

  // const sentences = useMemo(
  //   () =>
  //     [
  //       ...(relevantContextSentences || []),
  //       // ...(sentencesInitial || []),
  //     ]?.filter((sent: any) =>
  //       (sent?.hanzi || sent?.input)?.includes(currentCharacter)
  //     ),
  //   []
  // );
  const sentences = useMemo(
    () =>
      getRandomWords(
        [
          ...(relevantContextSentences || []),
          // ...(sentencesInitial || []),
        ]?.filter((sent: any) =>
          (sent?.hanzi || sent?.input)?.includes(currentCharacter)
        )
      ),
    [relevantContextSentences?.length, currentCharacter]
  );

  const sentence = useMemo(
    () => sentences?.[questionIndex],
    [sentences, questionIndex]
  );

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
    () => selectedGrammar?.hanzi,
    [selectedGrammar?.hanzi]
  );

  const randomThreeOptions = useMemo(
    () =>
      getRandomWords(
        [
          ...new Set(
            shuffledGrammar?.filter(
              (item: any) => (item?.input || item.hanzi) !== relevantHanzi
            )
            // ?.map((item: any) => item?.en)
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
      (sentence?.input || sentence?.hanzi)?.replace(relevantHanzi, " ____ "),
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
  if (questionIndex > relevantContextSentences?.length - 1) {
    return (
      <div>
        <ClozeNavbar
          contentId={contentId}
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
    <div className="px-8">
      <ClozeNavbar
        contentId={contentId}
        onClose={onClose}
        currentCharacter={currentCharacter}
      />

      {sentence && (
        <div className="mt-24 lg:mt-32">
          {response ? (
            <Link
              target="_blank"
              href={`/nmm/${sentence?.hanzi || sentence?.input}?lang=${lang || sentence?.lang}`}
              className="block text-center mb-4"
            >
              {sentence?.pinyin}
            </Link>
          ) : (
            <p className="block text-center mb-4 dark:text-black text-white">
              ...
            </p>
          )}
          <h1 className="text-center text-3xl">
            {(response ? sentence?.input || sentence?.hanzi : sentenceHanzi)
              .split("")
              .map((item: string, idx: number) => {
                return (
                  <Link
                    href={`/nmm/${item}${sentence?.lang ? `?lang=${sentence?.lang}` : ""}`}
                    key={`review-cloze-${idx}-${item}`}
                    target="_blank"
                  >
                    <CharacterItem
                      character={item}
                      className="text-center text-3xl font-light"
                    />
                  </Link>
                );
              })}
          </h1>
          <p className="text-center mt-4">{sentence?.en}</p>

          <div className="grid grid-cols-2 gap-8 mt-12 max-w-md m-auto lg:mt-24">
            {shuffledOptions?.map((option: any, idx: number) => {
              if (response) {
                return (
                  <Link
                    target="_blank"
                    href={`/nmm/${option?.hanzi}?lang=${sentence?.lang}`}
                    // disabled={response?.type}
                    className={cn(
                      "border-orange-400 text-black  border-[2px] p-2 dark:text-white text-lg block text-center",
                      response
                        ? response?.answer?.en === option?.en
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
                        ? response?.answer?.en === option?.en
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
          </div>

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

                {sentence?.contentId && (
                  <Link
                    target="_blank"
                    href={`/convos/${sentence?.contentId}${sentence?.start ? `?start=${sentence?.start}` : ""}`}
                    className="block hover:scale-125 transition hover:font-bold"
                  >
                    <Icons.play className="text-2xl" />
                  </Link>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
