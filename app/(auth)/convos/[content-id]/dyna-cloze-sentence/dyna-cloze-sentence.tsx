import { getRandomWords } from "@/app/review/review-cloze/utils/get-random-words";
import { shuffleArray } from "@/app/review/review-cloze/utils/shuffle-array";
import { PlayButtonV2 } from "@/components/_select-character/play-button-v2";
import { DynoOptionsContainer } from "@/components/dyno-cloze-core/dyno-cloze-core";
import { TheDock } from "@/components/the-dock";
import { Icons } from "@/components/ui/icons.v2";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useViewTypeStore } from "@/components/use-selected-character";
import { WordleSentence } from "@/components/wordle/wordle-sentence";
import { useListGrammarsQuery } from "@/domain/sentence/grammar.queries";
import { useListSentencesQuery } from "@/domain/sentence/sentence.queries";
import { useListDiscoveryQuery } from "@/domain/sentence/use-list-discovery-query";
import { useGetCurrentLang } from "@/hooks/use-get-current-lang";
import { useShowAutomaticallyTheDock } from "@/hooks/use-show-automatically-the-dock";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useMemo, useState } from "react";

import { NMMSettings } from "@/app/nmm/nmm-settings";
import { DynaClozeHeader } from "@/components/dyno-cloze-core/dyna-cloze-header";
import { DynoClozeLoader } from "@/components/dyno-cloze-core/dyno-cloze-loader";
import { DynaClozeNavbar } from "@/components/dyno-cloze-core/dyno-cloze-navbar";
import { useBrightModeStore } from "@/components/settings-dialog/use-bright-mode-store";
import { SpeakSentence } from "../speak/speak-sentence";
import {
  useDyanStoreRuntime,
  useDynaClozeSentence,
} from "./use-dyna-cloze-sentence";
import { getMulti } from "./utils/get-multi";

interface IDynoParams {
  parentSentence?: any;
  sentence: any;
  setWordIndex: any;
  setSentenceIndex: any;
  wordIndex: number;
  sentenceIndex: number;
  maxIndex?: number;
}
function DynoSentenceInner({
  sentence,
  setWordIndex,
  setSentenceIndex,
  wordIndex,
  sentenceIndex,
  parentSentence,
  maxIndex,
}: IDynoParams) {
  const { data, isLoading } = useListDiscoveryQuery({
    content: sentence?.input || sentence?.hanzi || "",
    lang: sentence?.lang,
  });

  const { data: grammar, isLoading: isLoadingGrammar } = useListGrammarsQuery({
    sentenceId: sentence?.input || sentence?.hanzi,
    content: sentence?.input || sentence?.hanzi,
    lang: sentence?.lang,
  });

  const finalSentence = useMemo(() => {
    return { ...(data || {}), ...sentence };
  }, [data, sentence]);

  if (isLoading) {
    return (
      <div>
        <DynoClozeLoader message="Loading meanings..." />
      </div>
    );
  }

  return (
    <DynaSentence
      maxIndex={maxIndex}
      parentSentence={parentSentence}
      sentence={finalSentence}
      setWordIndex={setWordIndex}
      setSentenceIndex={setSentenceIndex}
      wordIndex={wordIndex}
      sentenceIndex={sentenceIndex}
    />
  );
}

const WithMultiSentence = ({
  sentence,
  children,
}: {
  sentence: { hanzi?: string; input?: string; lang: string };
  children: React.ReactNode;
}) => {
  const [wordIndex, setWordIndex] = useState(0);
  const [sentenceIndex, setSentenceIndex] = useState(0);

  const multiSentences = useMemo(() => {
    return getMulti(sentence?.hanzi || sentence?.input || "")
      ?.map((item) => {
        return {
          hanzi: item,
          input: item,
          lang: sentence.lang,
        };
      })
      ?.filter((item) => !!item?.hanzi);
  }, [sentence?.hanzi, sentence?.input, sentence.lang]);

  const sentenceItem = useMemo(
    () => multiSentences?.[sentenceIndex],
    [sentenceIndex, multiSentences],
  );

  if (multiSentences?.length === 1) {
    return children;
  }

  return (
    <div>
      <DynoSentenceInner
        maxIndex={multiSentences?.length - 1}
        parentSentence={sentence}
        sentence={sentenceItem}
        setWordIndex={setWordIndex}
        setSentenceIndex={setSentenceIndex}
        wordIndex={wordIndex}
        sentenceIndex={sentenceIndex}
      />
    </div>
  );
};

const DynaSentence = ({
  sentence,
  maxIndex,
  setWordIndex,
  setSentenceIndex,
  wordIndex,
  sentenceIndex,
  parentSentence,
}: IDynoParams) => {
  const showPinyin = useBrightModeStore((state) => state.showPinyin);
  const showEnPreview = useBrightModeStore((state) => state.showEn);

  const {
    setResponse,
    response,
    showEn,
    setShowEn,
    showParent,
    setShowParent,
    sentenceIndex: parentSentenceIndex,
    setSentenceIndex: setParentSentenceIndex,
  } = useDyanStoreRuntime();

  const toggleEn = () => {
    return setShowEn(!showEn);
  };
  const toggleParent = () => {
    return setShowParent(!showParent);
  };

  const lang = useGetCurrentLang();

  const { learnMode, setLearnMode } = useDynaClozeSentence();

  const { data: meaning } = useListDiscoveryQuery({
    content: sentence?.input || sentence?.hanzi,
    lang: sentence?.lang,
  });

  const { data: grammar, isLoading } = useListGrammarsQuery({
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

  const sentenceHanzi = useMemo(
    () => sentence?.input || sentence?.hanzi,
    [sentence?.hanzi, sentence?.input],
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const replaceSelectedGrammar = (sentenceHanzi: string) => {
    return sentenceHanzi?.replaceAll(
      selectedGrammar?.input || selectedGrammar?.hanzi,
      `  ${"__".repeat((selectedGrammar?.input || selectedGrammar?.hanzi)?.length)}  `,
    );
  };

  const multiSentence = getMulti(
    parentSentence?.input || parentSentence?.hanzi,
  );

  const sentenceHanziHidden = useMemo(() => {
    return replaceSelectedGrammar(sentenceHanzi);
  }, [replaceSelectedGrammar, sentenceHanzi]);

  const relevantHanzi = selectedGrammar?.en;

  const randomThreeOptions = useMemo(
    () =>
      getRandomWords(
        [
          ...new Set(
            shuffledGrammar?.filter((item: any) => item.en !== relevantHanzi),
            // ?.map((item: any) => item?.en)
          ),
        ],
        3,
      ),
    [relevantHanzi, shuffledGrammar],
  );

  const shuffledOptions = useMemo(
    () => shuffleArray([...randomThreeOptions, selectedGrammar]),
    [randomThreeOptions, selectedGrammar],
  );

  const checkAnswer = (answer: any) => {
    if (answer?.en === relevantHanzi) {
      setResponse({ type: "correct", answer });
    } else {
      setResponse({ type: "incorrect", answer });
    }
  };

  if (isLoading) {
    return (
      <div>
        <DynoClozeLoader message="Loading grammar.." />
      </div>
    );
  }

  return (
    <div className="mt-32">
      <DynaClozeHeader
        sentence={{
          hanzi: sentenceHanzi,
          hanziHidden: sentenceHanziHidden,
          pinyin: meaning?.pinyin,
          lang: sentence?.lang,
          en: meaning?.en,
        }}
        response={response}
      />

      <DynoOptionsContainer>
        {shuffledOptions?.map((option: any, idx: number) => {
          if (response) {
            return (
              <Link
                target="_blank"
                href={`/nmm/${option?.hanzi || option?.input}?lang=${sentence?.lang}`}
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
                    : "hover:bg-orange-500 hover:text-white hover:scale-110",
                )}
                key={`dynacloze-${idx}-${option?.en}`}
              >
                <span className="block">
                  {/* {JSON.stringify(option)} */}
                  {showEn ? option?.en : option?.input || option?.hanzi}{" "}
                  {/* {response && <span>({showEn ? option?.hanzi : option?.en})</span>} */}
                </span>
              </Link>
            );
          } else {
            return (
              <button
                onClick={() => {
                  checkAnswer(option);
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

      <div className="flex justify-center items-center mt-32 gap-12 text-2xl">
        <button
          disabled={parentSentence ? false : sentenceIndex === 0}
          className={sentenceIndex === 0 ? "text-gray-500" : ""}
          onClick={() => {
            setResponse(null);
            if (0 === sentenceIndex && parentSentence) {
              setParentSentenceIndex(Math.max(parentSentenceIndex - 1, 0));
              setWordIndex(0);
              return null;
            }

            setSentenceIndex(Math.max(sentenceIndex - 1, 0));
            setWordIndex(0);
          }}
        >
          <Icons.arrowLeft />
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
        >
          <Icons.arrowDown />
        </button>

        <button
          onClick={() => {
            setResponse(null);
            if (maxIndex) {
              if (maxIndex === sentenceIndex) {
                setParentSentenceIndex(
                  Math.min(parentSentenceIndex + 1, maxIndex),
                );

                setSentenceIndex(0);
                setWordIndex(0);
                return null;
              } else {
                setSentenceIndex(Math.min(sentenceIndex + 1, maxIndex));
                return null;
              }
            }

            setWordIndex(0);
          }}
        >
          <Icons.arrowRight />
        </button>
      </div>

      <div className="flex justify-center items-center mt-8 gap-8">
        {parentSentence && (
          <button
            onClick={() => {
              toggleParent();
            }}
          >
            {showParent ? "Hide Parent" : "Show Parent"}
          </button>
        )}
        <button
          onClick={() => {
            toggleEn();
          }}
        >
          {showEn ? "Hide En" : "Show En"}
        </button>

        <button
          className="text-2xl"
          onClick={() => {
            if (learnMode === "stocastic") {
              setLearnMode("timeline");
            } else {
              setLearnMode("stocastic");
            }
          }}
        >
          {learnMode === "timeline" ? <Icons.timeline /> : <Icons.shuffle />}
        </button>

        <PlayButtonV2 text={sentenceHanzi} lang={lang} className="text-2xl" />
      </div>

      {parentSentence && showParent && (
        <div className="text-center mt-12 max-w-3xl m-auto">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <p>
                  {multiSentence?.map((sentenceItem, idx) => {
                    return (
                      <span
                        key={sentenceItem}
                        onClick={() => {
                          setSentenceIndex(idx);
                        }}
                      >
                        <span
                          className={
                            sentenceItem === sentence?.hanzi
                              ? "dark:text-white text-black"
                              : "text-gray-400 dark:text-gray-700"
                          }
                        >
                          {replaceSelectedGrammar(sentenceItem)}
                        </span>

                        <span className="text-gray-400 dark:text-gray-700">
                          {multiSentence?.length - 1 !== idx && "，"}
                        </span>
                      </span>
                    );
                  })}
                </p>
              </TooltipTrigger>
              <TooltipContent>
                <p className="dark:text-gray-300 text-gray-700 text-xs z-50 max-w-3xl">
                  {parentSentence?.en}
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      )}
    </div>
  );
};

export const DynaClozeSentence = ({
  sentence: _sentence,
}: {
  sentence: { hanzi?: string; input?: string; lang: string };
}) => {
  const [viewMode, setViewMode] = useState("dynocloze");
  const { setWordIndex, setSentenceIndex, sentenceIndex, wordIndex } =
    useDyanStoreRuntime();

  const { data: sentences } = useListSentencesQuery({
    component: _sentence?.hanzi || _sentence?.input,
    lang: _sentence?.lang,
  });

  const sentencesShuffled = useMemo(() => {
    return [_sentence, ...shuffleArray(sentences || [])];
  }, [_sentence, sentences]);

  const sentence = sentencesShuffled?.[sentenceIndex];

  const setViews = useViewTypeStore((state) => state.setViews);

  // const { selectedChar, setView, view } = data;
  const setView = () => {
    return setViews(_sentence?.input || _sentence?.hanzi || "", "");
  };

  const isAutomatic = useShowAutomaticallyTheDock();

  const maxIndex = sentencesShuffled?.length - 1;

  return (
    <div className="mb-32">
      <DynaClozeNavbar
        onClose={setView}
        input={_sentence?.input || _sentence?.hanzi || ""}
      />

      {viewMode === "dynocloze" ? (
        <WithMultiSentence sentence={sentence}>
          <DynaSentence
            maxIndex={maxIndex}
            sentence={sentence}
            setWordIndex={setWordIndex}
            setSentenceIndex={setSentenceIndex}
            wordIndex={wordIndex}
            sentenceIndex={sentenceIndex}
          />
        </WithMultiSentence>
      ) : viewMode === "wordle" ? (
        <WordleSentence currentPhrase={sentence} />
      ) : (
        viewMode === "speak" && <SpeakSentence sentence={sentence} />
      )}

      <TheDock isAutomatic={isAutomatic} className="bottom-4">
        <div className="flex items-center w-full justify-center">
          <div className="px-8  py-2 bg-gray-100 dark:bg-black no-underline group cursor-pointer relative shadow-2xl shadow-zinc-900 rounded-full p-px text-xs font-semibold leading-6  text-white inline-block">
            <div className="space-x-8 flex justify-center items-center w-full">
              <button
                className={
                  viewMode === "dynocloze"
                    ? "dark:text-white text-black"
                    : "text-gray-500"
                }
                onClick={() => {
                  setViewMode("dynocloze");
                }}
              >
                <Icons.play className="text-2xl" />
              </button>
              <button
                className={
                  viewMode === "speak"
                    ? "dark:text-white text-black"
                    : "text-gray-500"
                }
                onClick={() => {
                  setViewMode("speak");
                }}
              >
                <Icons.microphone className="text-2xl" />
              </button>
              <button
                className={
                  viewMode === "wordle"
                    ? "dark:text-white text-black"
                    : "text-gray-500"
                }
                onClick={() => {
                  setViewMode("wordle");
                }}
              >
                <Icons.typeWriter className="text-2xl" />
              </button>

              <NMMSettings />
            </div>
          </div>
        </div>
      </TheDock>
    </div>
  );
};
