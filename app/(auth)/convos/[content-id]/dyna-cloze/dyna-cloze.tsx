import { getRandomWords } from "@/app/review/review-cloze/utils/get-random-words";
import { shuffleArray } from "@/app/review/review-cloze/utils/shuffle-array";
import { CharacterItem } from "@/components/_select-character/character-item";
import { useBrightModeStore } from "@/components/settings-dialog/use-bright-mode-store";
import { Icons } from "@/components/ui/icons.v2";
import { useGetContentQuery } from "@/domain/content/content.queries";
import { useListGrammarsQuery } from "@/domain/sentence/grammar.queries";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useDyanStoreRuntime, useDynaCloze } from "./use-dyna-cloze";
import { useListMeaningsQuery } from "@/domain/sentence/meaning.queries";
import { getMulti } from "./utils/get-multi";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { smartSplit } from "@/components/youtube-page/utils/smart-split";
import { useGetCurrentLang } from "@/hooks/use-get-current-lang";
import { useCurrentTime } from "@/components/youtube-page/use-current-time-store";
import { YoutubeButton } from "@/components/youtube-page/youtube-button";

interface IDynoParams {
  parentSentence?: any;
  sentence: any;
  contentId: string;
  setWordIndex: any;
  setSentenceIndex: any;
  wordIndex: number;
  sentenceIndex: number;
  maxIndex?: number;
}
function DynoSentenceInner({
  sentence,
  contentId,
  setWordIndex,
  setSentenceIndex,
  wordIndex,
  sentenceIndex,
  parentSentence,
  maxIndex,
}: IDynoParams) {
  const { data, isLoading } = useListMeaningsQuery({
    content: sentence?.input || sentence?.hanzi || "",
    lang: sentence?.lang,
  });

  const finalSentence = useMemo(() => {
    return { ...data?.details, ...sentence };
  }, [data?.details, sentence]);

  if (isLoading) {
    return (
      <div>
        <p className="text-center my-32">Loading...</p>
      </div>
    );
  }
  return (
    <DynaSentence
      maxIndex={maxIndex}
      parentSentence={parentSentence}
      sentence={finalSentence}
      contentId={contentId}
      setWordIndex={setWordIndex}
      setSentenceIndex={setSentenceIndex}
      wordIndex={wordIndex}
      sentenceIndex={sentenceIndex}
    />
  );
}

const WithMultiSentence = ({
  contentId,
  sentence,
  children,
}: {
  contentId: string;
  sentence: { hanzi?: string; input?: string; lang: string };
  children: React.ReactNode;
}) => {
  const [wordIndex, setWordIndex] = useState(0);
  const [sentenceIndex, setSentenceIndex] = useState(0);

  const multiSentences = useMemo(() => {
    return getMulti(sentence?.input || sentence?.hanzi || "")?.map((item) => {
      return {
        hanzi: item,
        input: item,
        lang: sentence.lang,
      };
    });
  }, [sentence?.hanzi, sentence?.input, sentence.lang]);

  const sentenceItem = useMemo(
    () => multiSentences?.[sentenceIndex],
    [sentenceIndex, multiSentences]
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
        contentId={contentId}
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
  contentId,
  maxIndex,
  setWordIndex,
  setSentenceIndex,
  wordIndex,
  sentenceIndex,
  parentSentence,
}: IDynoParams) => {
  const { data: content, isLoading } = useGetContentQuery({
    contentId,
  });

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

  const { learnMode, setLearnMode } = useDynaCloze(contentId);

  const brightMode = useBrightModeStore((state: any) => state.mode);

  const { data: grammar } = useListGrammarsQuery({
    sentenceId: sentence?.input || sentence?.hanzi,
    content: sentence?.input || sentence?.hanzi,
    lang: sentence?.lang,
  });

  const shuffledGrammar = useMemo(() => {
    if (!grammar) {
      return [];
    }

    return shuffleArray(
      grammar?.grammarAnalysis?.length <= 2
        ? grammar?.grammarAnalysis
        : grammar?.grammarAnalysis?.filter(
            (analysis) =>
              analysis?.input?.toLowerCase() !==
              (sentence?.input || sentence?.hanzi)?.toLowerCase()
          )
    );

    // return shuffleArray(grammar?.grammarAnalysis);
  }, [grammar, sentence?.hanzi, sentence?.input]);

  const selectedGrammar = useMemo(
    () => shuffledGrammar?.[wordIndex],
    [shuffledGrammar, wordIndex]
  );

  const sentenceHanzi = useMemo(
    () => sentence?.input || sentence?.hanzi,
    [sentence?.hanzi, sentence?.input]
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const replaceSelectedGrammar = (sentenceHanzi: string) => {
    return sentenceHanzi
      ?.toLowerCase()
      .replaceAll(
        (selectedGrammar?.input || selectedGrammar?.hanzi)?.toLowerCase(),
        `  ${"__".repeat((selectedGrammar?.input || selectedGrammar?.hanzi)?.length)}  `
      );
  };

  const multiSentence = getMulti(
    parentSentence?.input || parentSentence?.hanzi
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
            shuffledGrammar?.filter((item: any) => item.en !== relevantHanzi)
            // ?.map((item: any) => item?.en)
          ),
        ],
        3
      ),
    [relevantHanzi, shuffledGrammar]
  );

  const lang = useGetCurrentLang();

  const shuffledOptions = useMemo(
    () => shuffleArray([...randomThreeOptions, selectedGrammar]),
    [randomThreeOptions, selectedGrammar]
  );

  const checkAnswer = (answer: any) => {
    if (answer?.en === relevantHanzi) {
      setResponse({ type: "correct", answer });
    } else {
      setResponse({ type: "incorrect", answer });
    }
  };

  if (!grammar?.grammarAnalysis?.length) {
    return (
      <div>
        <p className="text-center my-32">Loading...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="text-center mt-12 lg:mt-24 max-w-3xl m-auto">
        {response &&
        ["zh", "ur", "ar", "ja", "ko", "ne", "hi", "fa"]?.includes(lang) ? (
          <Link
            target="_blank"
            href={`/nmm/${sentenceHanzi}?lang=${sentence?.lang}`}
            className={"block lg:text-xl text-md mb-2"}
          >
            {sentence?.roman || sentence?.pinyin}
          </Link>
        ) : (
          <p className="mb-2 dark:text-black text-white text-lg"> ...</p>
        )}
        {!brightMode || lang !== "zh" ? (
          <h1 className="block lg:text-4xl text-2xl">
            {smartSplit({
              input: response ? sentenceHanzi : sentenceHanziHidden,
              lang,
            }).map((item: string, idx: number) => {
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
        ) : (
          <Link
            href={`/convos/${contentId}?start=${sentence?.start}&view=listen`}
            target="_blank"
            className="block text-3xl"
          >
            {(response ? sentenceHanzi : sentenceHanziHidden)
              .split("")
              .map((item: string, idx: number) => {
                return (
                  <CharacterItem
                    key={`review-cloze-${idx}-${item}`}
                    character={item}
                    className="text-center font-light"
                  />
                );
              })}
          </Link>
        )}

        <Link
          target="_blank"
          href={`/nmm/${sentenceHanzi}?lang=${sentence?.lang}`}
          className={"block"}
        >
          <p className="mt-2 lg:text-xl text-md">{sentence?.en}</p>
        </Link>

        <p className="mt-2 lg:text-xl text-md">{sentence?.en}</p>
      </div>

      <div className="grid grid-cols-2 gap-8 mt-12 max-w-md m-auto lg:mt-24">
        {shuffledOptions?.map((option: any, idx: number) => {
          if (response) {
            return (
              <Link
                target="_blank"
                href={`/nmm/${option?.input || option?.hanzi}?lang=${sentence?.lang}`}
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
                  {showEn ? option?.en : option?.hanzi || option?.input}{" "}
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
                    : "hover:bg-orange-500 hover:text-white hover:scale-110"
                )}
                key={`dynacloze-${idx}-${option?.en}`}
              >
                <span className="block">
                  {showEn ? option?.en : option?.hanzi || option?.input}{" "}
                  {/* {response && <span>({showEn ? option?.hanzi : option?.en})</span>} */}
                </span>
              </button>
            );
          }
        })}
      </div>

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
                : Math.min(wordIndex + 1, shuffledGrammar?.length - 1)
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
                  Math.min(
                    parentSentenceIndex + 1,
                    content?.transcriptions?.length - 1
                  )
                );

                setSentenceIndex(0);
                setWordIndex(0);
                return null;
              } else {
                setSentenceIndex(Math.min(sentenceIndex + 1, maxIndex));
                return null;
              }
            }
            setSentenceIndex(
              Math.min(sentenceIndex + 1, content?.transcriptions?.length - 1)
            );

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

        {content?.audio && (
          <YoutubeButton
            sentenceInput={sentence?.input || sentence?.hanzi}
            contentId={contentId}
            transcriptId={sentence?.id}
          />
        )}
      </div>

      {parentSentence && showParent && (
        <div className="text-center mt-12 max-w-3xl m-auto">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <p>
                  {multiSentence?.map((sentenceItem, idx) => {
                    return (
                      <span key={sentenceItem}>
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

export const DynaCloze = ({ contentId }: { contentId: string }) => {
  const { setWordIndex, setSentenceIndex, sentenceIndex, wordIndex } =
    useDyanStoreRuntime();
  const { data: content, isLoading } = useGetContentQuery({
    contentId,
  });

  const { currentTime, setCurrentTime: setTime } = useCurrentTime(contentId);

  const currentTranscription = content?.transcriptions?.find(
    (trans: any) => trans?.start < currentTime && trans?.end > currentTime
  );

  const transcriptionIndex = content?.transcriptions?.findIndex(
    (trans: any) => trans.start === currentTranscription?.start
  );

  useEffect(() => {
    if (transcriptionIndex !== -1) {
      setSentenceIndex(transcriptionIndex);
    }
  }, []);

  const { learnMode } = useDynaCloze(contentId);

  const shuffledTranscriptions = useMemo(() => {
    if (!content?.transcriptions) {
      return [];
    }

    if (learnMode === "stocastic") {
      return shuffleArray(content?.transcriptions);
    }

    return content?.transcriptions;
  }, [content?.transcriptions, learnMode]);

  const sentence = useMemo(
    () => shuffledTranscriptions?.[sentenceIndex],
    [sentenceIndex, shuffledTranscriptions]
  );

  return (
    <div>
      <h1 className="text-center text-2xl font-mono">dynacloze</h1>{" "}
      <WithMultiSentence contentId={contentId} sentence={sentence}>
        <DynaSentence
          sentence={sentence}
          contentId={contentId}
          setWordIndex={setWordIndex}
          setSentenceIndex={setSentenceIndex}
          wordIndex={wordIndex}
          sentenceIndex={sentenceIndex}
        />
      </WithMultiSentence>
    </div>
  );
};
