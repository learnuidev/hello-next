import { Icons } from "@/components/ui/icons.v2";
import { useListHSKWordsQuery } from "@/domain/hsk/hsk.queries";
import { useListSentencesQuery } from "@/domain/sentence/sentence.queries";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useMemo, useState } from "react";
import { useGetCurrentReviewCharacter } from "../use-get-current-review-character";
import { useHskLevel, useReviewModeView } from "../use-review-mode";
import { HskLevelSelector } from "./hsk-level-selector";
import { getThreeRandomWords } from "./utils/get-three-random-words";
import { shuffleArray } from "./utils/shuffle-array";

const ClozeNavbar = ({ onClose }: { onClose?: () => void }) => {
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
        <HskLevelSelector />
      </div>
    </nav>
  );
};

export function ReviewCloze({
  currentCharacter,
  lang,
  isLoading,
  onClose,
}: {
  currentCharacter: string;
  lang: string;
  isLoading?: boolean;
  onClose?: () => void;
}) {
  const [clozeIndex, setClozeIndex] = useState(0);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [response, setResponse] = useState<any>(null);
  const { setReviewMode } = useReviewModeView();

  const { data: hskWords } = useListHSKWordsQuery();

  // const {
  //   currentCharacter,
  //   hasReviewedAll,
  //   currentComponent,
  //   goToNextChar,
  //   remainingItems,
  //   isContent,
  //   isEntry,
  //   lang,
  //   hasNoChars,
  //   isLoading: isReviewCharactersLoading,
  // } = useGetCurrentReviewCharacter();

  const { hskLevel, setHskLevel } = useHskLevel();

  const relevantHskWords = useMemo(
    () =>
      shuffleArray(
        (
          hskWords?.filter((word: any) =>
            JSON.stringify(word)?.includes(currentCharacter)
          ) || []
        ).filter((word: any) => {
          if (hskLevel == "0") {
            return true;
          }

          return word.hskLevel <= hskLevel;
        })
      ),
    [currentCharacter, hskLevel, hskWords]
  );
  const irrelevantHskWords = useMemo(
    () =>
      shuffleArray(
        hskWords?.filter(
          (word: any) => !JSON.stringify(word)?.includes(currentCharacter)
        ) || []
      ),
    [currentCharacter, hskWords]
  );

  const relevantHskWord = useMemo(
    () => relevantHskWords?.[clozeIndex],
    [clozeIndex, relevantHskWords]
  );

  const relevantHanzi = relevantHskWord?.hanzi;

  const { data: sentencesInitial, isLoading: isSentenceLoading } =
    useListSentencesQuery({
      component: relevantHanzi,
      lang,
    });

  const sentences = useMemo(
    () =>
      sentencesInitial?.filter((sent: any) =>
        sent?.hanzi?.includes(relevantHanzi)
      ),
    [relevantHanzi, sentencesInitial]
  );

  const irrelevantHanzis = useMemo(
    () => irrelevantHskWords?.map((word: any) => word?.hanzi),
    [irrelevantHskWords]
  );

  const randomThreeOptions = useMemo(
    () =>
      getThreeRandomWords(
        irrelevantHanzis?.filter((item: any) => item !== relevantHanzi)
      ),
    [irrelevantHanzis, relevantHanzi]
  );

  const shuffledOptions = useMemo(
    () => shuffleArray([...randomThreeOptions, relevantHanzi]),
    [randomThreeOptions, relevantHanzi]
  );

  const sentence = useMemo(
    () => getThreeRandomWords(sentences)?.[0],
    [sentences]
  );

  const sentenceHanzi = useMemo(
    () => sentence?.hanzi?.replace(relevantHanzi, " ____ "),
    [relevantHanzi, sentence?.hanzi]
  );

  const checkAnswer = (answer: string) => {
    if (answer === relevantHanzi) {
      setResponse({ type: "correct", answer });
    } else {
      setResponse({ type: "incorrect", answer });
    }
  };

  if (isSentenceLoading || isLoading) {
    return (
      <div>
        <p className="text-center mt-32">Loading...</p>
      </div>
    );
  }
  if (
    relevantHskWords &&
    (clozeIndex > relevantHskWords?.length - 1 || !sentence)
  ) {
    return (
      <div>
        <ClozeNavbar onClose={onClose} />

        <div className="flex justify-center items-center flex-col mt-32">
          <h4 className="text-center mb-8">Nothing here</h4>

          <div className="flex justify-between items-center gap-4">
            <button
              onClick={() => {
                setClozeIndex(0);
              }}
            >
              {" "}
              Restart
            </button>

            <button
              onClick={() => {
                setReviewMode("classic");
              }}
            >
              {" "}
              Back to classic mode
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="px-8">
      <ClozeNavbar onClose={onClose} />

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
          <h1 className="text-center text-3xl">{sentenceHanzi}</h1>
          <p className="text-center mt-4">{sentence?.en}</p>

          <div className="grid grid-cols-2 gap-8 mt-12 max-w-xl m-auto lg:mt-24">
            {shuffledOptions?.map((option: string) => (
              <button
                onClick={() => {
                  checkAnswer(option);
                }}
                disabled={response?.type}
                className={cn(
                  "bg-purple-600 p-2 hover:bg-purple-500 text-white text-lg",
                  response
                    ? response?.answer === option
                      ? response?.type === "correct"
                        ? "bg-green-500 hover:bg-green-600"
                        : "bg-red-500 hover:bg-red-600"
                      : "bg-purple-800 opacity-10 text-gray-200"
                    : "",
                  "transition"
                )}
                key={option}
              >
                {option}
              </button>
            ))}
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

              <div className="flex justify-center items-center gap-4 mt-8">
                <button
                  onClick={() => {
                    setReviewMode(null);
                  }}
                >
                  Quit
                </button>
                <button
                  onClick={() => {
                    setClozeIndex(clozeIndex + 1);
                    setResponse(null);
                  }}
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
