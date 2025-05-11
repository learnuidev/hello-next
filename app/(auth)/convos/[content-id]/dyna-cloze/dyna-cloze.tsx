import { useGetContentQuery } from "@/domain/content/content.queries";
import { useDyanStoreRuntime, useDynaCloze } from "./use-dyna-cloze";
import { useMemo, useState } from "react";
import { shuffleArray } from "@/app/review/review-cloze/utils/shuffle-array";
import { useListGrammarsQuery } from "@/domain/sentence/grammar.queries";
import { getRandomWords } from "@/app/review/review-cloze/utils/get-random-words";
import { cn } from "@/lib/utils";
import { Icons } from "@/components/ui/icons.v2";
import Link from "next/link";
import { CharacterItem } from "@/components/_select-character/character-item";
import { useBrightModeStore } from "@/components/settings-dialog/use-bright-mode-store";

const DynaSentence = ({
  sentence,
  contentId,
}: {
  sentence: any;
  contentId: string;
}) => {
  const { data: content, isLoading } = useGetContentQuery({
    contentId,
  });

  const {
    wordIndex,
    setWordIndex,
    setSentenceIndex,
    sentenceIndex,
    setResponse,
    response,
    showEn,
    setShowEn,
  } = useDyanStoreRuntime();

  const toggleEn = () => {
    return setShowEn(!showEn);
  };

  const brightMode = useBrightModeStore((state: any) => state.mode);

  const { data: grammar } = useListGrammarsQuery({
    sentenceId: sentence?.hanzi || sentence?.input,
    content: sentence?.hanzi || sentence?.input,
    lang: sentence?.lang,
  });

  const shuffledGrammar = useMemo(() => {
    if (!grammar) {
      return [];
    }
    return shuffleArray(grammar?.grammarAnalysis);
  }, [grammar]);

  const selectedGrammar = useMemo(
    () => shuffledGrammar?.[wordIndex],
    [shuffledGrammar, wordIndex]
  );

  const sentenceHanzi = useMemo(
    () => sentence?.hanzi || sentence?.input,
    [sentence?.hanzi, sentence?.input]
  );

  const sentenceHanziHidden = useMemo(() => {
    return sentenceHanzi?.replaceAll(selectedGrammar?.hanzi, `____`);
  }, [selectedGrammar?.hanzi, sentenceHanzi]);

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
      <div className="text-center mt-24">
        {response ? (
          <p className={"text-lg mb-2"}>
            {sentence?.pinyin || sentence?.roman}
          </p>
        ) : (
          <p className="mb-2 dark:text-black text-white text-lg"> ...</p>
        )}
        {!brightMode ? (
          <h1 className="block text-4xl">
            {(response ? sentenceHanzi : sentenceHanziHidden)
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
        ) : (
          <Link
            href={`/convos/${contentId}?start=${sentence?.start}&view=listen`}
            target="_blank"
            className="block text-4xl"
          >
            {(response ? sentenceHanzi : sentenceHanziHidden)
              .split("")
              .map((item: string, idx: number) => {
                return (
                  <CharacterItem
                    key={`review-cloze-${idx}-${item}`}
                    character={item}
                    className="text-center text-3xl font-light"
                  />
                );
              })}
          </Link>
        )}
        <p className="mt-2">{sentence?.en}</p>
      </div>

      <div className="grid grid-cols-2 gap-8 mt-12 max-w-md m-auto lg:mt-24">
        {shuffledOptions?.map((option: any, idx: number) => (
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
                  : "bg-gray-800 opacity-10 text-gray-200"
                : "",
              "transition",
              response
                ? ""
                : "hover:bg-orange-500 hover:text-white hover:scale-110"
            )}
            key={`dynacloze-${idx}-${option?.en}`}
          >
            <span className="block">
              {showEn ? option?.en : option?.hanzi}{" "}
              {/* {response && <span>({showEn ? option?.hanzi : option?.en})</span>} */}
            </span>
          </button>
        ))}
      </div>

      <div className="flex justify-center items-center mt-32 gap-12 text-2xl">
        <button
          disabled={wordIndex === 0}
          className={sentenceIndex === 0 ? "text-gray-500" : ""}
          onClick={() => {
            setSentenceIndex(Math.max(sentenceIndex - 1, 0));

            setWordIndex(0);
            setResponse(null);
          }}
        >
          <Icons.arrowLeft />
        </button>

        <button
          onClick={() => {
            setWordIndex(
              shuffledGrammar?.length - 1 === wordIndex + 1
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
            setSentenceIndex(
              Math.min(sentenceIndex + 1, content?.transcriptions?.length - 1)
            );

            setWordIndex(0);
            setResponse(null);
          }}
        >
          <Icons.arrowRight />
        </button>
      </div>

      <div className="flex justify-center items-center mt-8">
        <button
          onClick={() => {
            toggleEn();
          }}
        >
          {showEn ? "Hide En" : "Show En"}
        </button>
      </div>
    </div>
  );
};

export const DynaCloze = ({ contentId }: { contentId: string }) => {
  const { sentenceIndex, setSentenceIndex } = useDyanStoreRuntime();
  const { data: content, isLoading } = useGetContentQuery({
    contentId,
  });

  const shuffledTranscriptions = useMemo(() => {
    if (!content?.transcriptions) {
      return [];
    }

    return shuffleArray(content?.transcriptions);
  }, [content?.transcriptions]);

  const { learned, setLearned, isLearned } = useDynaCloze(contentId);

  const sentence = useMemo(
    () => shuffledTranscriptions?.[sentenceIndex],
    [sentenceIndex, shuffledTranscriptions]
  );

  return (
    <div>
      <h1 className="text-center text-2xl font-mono">dynacloze</h1>{" "}
      <DynaSentence sentence={sentence} contentId={contentId} />
    </div>
  );
};
