import {
  getMulti,
  isMulti,
} from "@/app/(auth)/convos/[content-id]/dyna-cloze-sentence/utils/get-multi";

import { PlayButtonV2 } from "@/components/_select-character/play-button-v2";
import { useGetCharacterLearningContext } from "@/components/_select-character/selected-character/use-get-character-learning-context";
import { DynoOptionsContainer } from "@/components/dyno-cloze-core/dyno-cloze-core";
import { DynoClozeLoader } from "@/components/dyno-cloze-core/dyno-cloze-loader";
import { DynaClozeNavbar } from "@/components/dyno-cloze-core/dyno-cloze-navbar";
import { Icons } from "@/components/ui/icons.v2";
import { YoutubeButton } from "@/components/youtube-page/youtube-button";
import { useGetContentQuery } from "@/domain/content/content.queries";
import { useListGrammarsQuery } from "@/domain/sentence/grammar.queries";
import { useListSentencesQuery } from "@/domain/sentence/sentence.queries";
import { useListDiscoveryQuery } from "@/domain/sentence/use-list-discovery-query";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useMemo, useRef, useState } from "react";
import { useClozeContentMode } from "../content-cloze-mode-button";
import { useIsContent } from "../use-is-content";
import { useReviewModeView } from "../use-review-mode";
import { ReviewItemHanzi } from "./review-item-hanzi";
import { getRandomWords } from "./utils/get-random-words";
import { shuffleArray } from "./utils/shuffle-array";
import {
  useListCharactersMapQuery,
  useListCharactersQuery,
} from "@/domain/lesson/character.queries";
import { useBrightModeStore } from "@/components/settings-dialog/use-bright-mode-store";
import { useChinglishState } from "@/components/settings-dialog/use-chinglish-state";
import { getNmmLink } from "@/libs/utils/get-nmm-link";

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

  const { isLoading: listCharactersLoading } = useListCharactersQuery();
  const { isLoading: listCharactersMapLoading } = useListCharactersMapQuery();

  const { data: _aiSentences } = useListSentencesQuery({
    component: currentCharacter,
    lang,
  });

  const aiSentences = _aiSentences || [];

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

  const { data: sentence, isLoading: isSentenceLoading } =
    useListDiscoveryQuery({
      content: initSentence?.hanzi || initSentence.input,
      lang,
    });

  const futureSentence = useMemo(
    () => sentences?.[questionIndex + 1],
    [sentences, questionIndex],
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
          (sentence?.input || sentence?.hanzi)?.toLowerCase(),
      ),
    );
  }, [grammar, sentence?.hanzi, sentence?.input]);

  const selectedGrammar = useMemo(
    () => shuffledGrammar?.[wordIndex],
    [shuffledGrammar, wordIndex],
  );

  const relevantHanzi = useMemo(
    () => selectedGrammar?.input || selectedGrammar?.hanzi,
    [selectedGrammar?.hanzi],
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
              (item: any) => (item?.input || item.hanzi) !== relevantHanzi,
            ),
          ),
        ],
        3,
      ),
    [relevantHanzi, shuffledGrammar],
  );
  const shuffledOptions = useMemo(
    () => shuffleArray([...randomThreeOptions, selectedGrammar]),
    [randomThreeOptions, relevantHanzi, questionIndex, sentence],
  );

  const sentenceHanzi = useMemo(
    () =>
      (sentence?.input || sentence?.hanzi)?.replaceAll(relevantHanzi, " ____ "),
    [relevantHanzi, sentence?.hanzi, sentence?.input],
  );

  const checkAnswer = (answer: string) => {
    if (answer === relevantHanzi) {
      setResponse({ type: "correct", answer });
    } else {
      setResponse({ type: "incorrect", answer });
    }
  };

  if (isSentenceLoading) {
    return <DynoClozeLoader message="Loading sentences..." />;
  }

  if (isLoading || listCharactersLoading || listCharactersMapLoading) {
    return <DynoClozeLoader message="Loading..." />;
  }
  if (isGrammarLoading) {
    return <DynoClozeLoader message="Loading grammars..." />;
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
          {showPinyin ? (
            <Link
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

          {showEnPreview && (
            <Link
              href={`/convos/${initSentence?.contentId}${initSentence?.start ? `?start=${initSentence?.start}` : ""}`}
              className="block"
            >
              <p className="text-center mt-4">
                {showChinglish
                  ? sentence?.chinglish || sentence?.en
                  : sentence?.en}{" "}
              </p>
            </Link>
          )}

          <DynoOptionsContainer>
            {shuffledOptions?.map((option: any, idx: number) => {
              if (response) {
                return (
                  <Link
                    href={getNmmLink({
                      id: option?.hanzi || option?.input,
                      lang: sentence?.lang,
                      view: "review",
                    })}
                    // href={`/nmm/${option?.input || option?.hanzi}?lang=${sentence?.lang}`}
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
                        : "hover:bg-orange-500 hover:text-white hover:scale-110",
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
                      shuffledGrammar?.length === wordIndex + 1
                        ? 0
                        : Math.min(wordIndex + 1, shuffledGrammar?.length - 1),
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

            {initSentence?.contentId ? (
              <YoutubeButton
                sentenceInput={sentence?.input || sentence?.hanzi}
                contentId={initSentence?.contentId}
                transcriptId={sentence?.id}
              />
            ) : isMultiSent ? (
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
