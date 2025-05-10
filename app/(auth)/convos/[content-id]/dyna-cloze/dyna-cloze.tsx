import { useGetContentQuery } from "@/domain/content/content.queries";
import { useDynaCloze } from "./use-dyna-cloze";
import { useMemo, useState } from "react";
import { shuffleArray } from "@/app/review/review-cloze/utils/shuffle-array";
import { useListGrammarsQuery } from "@/domain/sentence/grammar.queries";
import { getRandomWords } from "@/app/review/review-cloze/utils/get-random-words";
import { cn } from "@/lib/utils";

const DynaSentence = ({ sentence }: { sentence: any }) => {
  const [wordIndex, setWordIndex] = useState(0);
  const [response, setResponse] = useState<any>(null);
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

  const sentenceHanziHidden = useMemo(() => {
    return sentence?.hanzi?.replaceAll(
      selectedGrammar?.hanzi,
      ` ${"__"?.repeat(selectedGrammar?.hanzi?.length)} `
    );
  }, [selectedGrammar?.hanzi, sentence?.hanzi]);

  const relevantHanzi = selectedGrammar?.hanzi;

  const randomThreeOptions = useMemo(
    () =>
      getRandomWords(
        [
          ...new Set(
            shuffledGrammar
              ?.filter((item: any) => item.hanzi !== relevantHanzi)
              ?.map((item: any) => item?.hanzi)
          ),
        ],
        3
      ),
    [relevantHanzi, shuffledGrammar]
  );

  const shuffledOptions = useMemo(
    () => shuffleArray([...randomThreeOptions, relevantHanzi]),
    [randomThreeOptions, relevantHanzi]
  );

  const checkAnswer = (answer: string) => {
    if (answer === relevantHanzi) {
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
        <h2 className="text-4xl">{sentenceHanziHidden}</h2>
        <p className="mt-4 text-xl">{sentence?.en}</p>
      </div>

      <div className="grid grid-cols-2 gap-8 mt-12 max-w-md m-auto lg:mt-24">
        {shuffledOptions?.map((option: string, idx: number) => (
          <button
            onClick={() => {
              checkAnswer(option);
            }}
            disabled={response?.type}
            className={cn(
              "border-orange-400 text-black  border-[2px] p-2 dark:text-white text-lg",
              response
                ? response?.answer === option
                  ? response?.type === "correct"
                    ? "bg-green-500 border-green-600 hover:bg-green-600"
                    : "bg-red-500 hover:bg-red-600"
                  : "bg-gray-800 opacity-10 text-gray-200"
                : "",
              "transition rounded-full",
              response
                ? ""
                : "hover:bg-orange-500 hover:text-white hover:scale-110"
            )}
            key={`dynacloze-${idx}-${option}`}
          >
            {option}
          </button>
        ))}
      </div>
      {/* <code>
        <pre>{JSON.stringify(sentence, null, 4)}</pre>
      </code>

      <code>
        <pre>
          <pre>{JSON.stringify(grammar, null, 4)}</pre>
        </pre>
      </code> */}

      <div className="flex justify-center items-center gap-8 my-8">
        <button
          onClick={() => {
            setWordIndex(0);
            setResponse(null);
          }}
        >
          Reset
        </button>
        <button
          onClick={() => {
            setWordIndex(Math.min(wordIndex + 1, shuffledGrammar?.length - 1));
            setResponse(null);
          }}
        >
          Inc
        </button>
      </div>
    </div>
  );
};

export const DynaCloze = ({ contentId }: { contentId: string }) => {
  const [sentenceIndex, setSentenceIndex] = useState(0);
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
      <h1 className="text-center text-2xl">Dyna Cloze</h1>{" "}
      <div>
        <DynaSentence sentence={sentence} />
      </div>
      <div className="flex justify-center items-center mt-32 gap-8">
        <button
          onClick={() => {
            setSentenceIndex(() => Math.max(sentenceIndex - 1, 0));
          }}
        >
          Previous
        </button>

        <button
          onClick={() => {
            setSentenceIndex(() =>
              Math.min(sentenceIndex + 1, content?.transcriptions?.length - 1)
            );
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
};
