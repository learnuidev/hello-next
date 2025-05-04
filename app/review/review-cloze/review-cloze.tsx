import { Icons } from "@/components/ui/icons.v2";
import { useReviewModeView } from "../use-review-mode";
import { useUnreviwedCharacters } from "../use-unreviewed-characters";
import { useListHSKWordsQuery } from "@/domain/hsk/hsk.queries";
import { useGetCurrentReviewCharacter } from "../use-get-current-review-character";
import { useMemo, useState } from "react";
import { useListSentencesQuery } from "@/domain/sentence/sentence.queries";
import { cn } from "@/lib/utils";
import Link from "next/link";

function getThreeRandomWords(words: any) {
  // Create a shallow copy and shuffle it
  const shuffled = words?.slice()?.sort(() => 0.5 - Math.random());
  // Return the first three elements
  return shuffled?.slice(0, 3) || [];
}

function shuffleArray(arr: any) {
  const array = arr?.slice(); // Make a copy to avoid mutating the original
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]; // Swap elements
  }
  return array;
}

export function ReviewCloze() {
  const [clozeIndex, setClozeIndex] = useState(0);
  const [response, setResponse] = useState<any>(null);
  const { setReviewMode } = useReviewModeView();

  const { data: hskWords } = useListHSKWordsQuery();

  const {
    currentCharacter,
    hasReviewedAll,
    currentComponent,
    goToNextChar,
    remainingItems,
    isContent,
    isEntry,
    lang,
    hasNoChars,
  } = useGetCurrentReviewCharacter();

  const relevantHskWords = useMemo(
    () =>
      shuffleArray(
        hskWords?.filter((word: any) =>
          JSON.stringify(word)?.includes(currentCharacter?.hanzi)
        ) || []
      ),
    [currentCharacter?.hanzi, hskWords]
  );

  const relevantHskWord = useMemo(
    () => relevantHskWords?.[clozeIndex],
    [clozeIndex, relevantHskWords]
  );

  const relevantHanzi = relevantHskWord?.hanzi;

  const { data: sentences, isLoading: isSentenceLoading } =
    useListSentencesQuery({
      component: relevantHanzi,
      lang,
    });

  const relevantHanzis = useMemo(
    () => relevantHskWords?.map((word: any) => word?.hanzi),
    [relevantHskWords]
  );

  const randomThreeOptions = useMemo(
    () =>
      getThreeRandomWords(
        relevantHanzis?.filter((item: any) => item !== relevantHanzi)
      ),
    [relevantHanzi, relevantHanzis]
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

  if (isSentenceLoading) {
    return (
      <div>
        <p className="text-center mt-32">Loading...</p>
      </div>
    );
  }
  if (!sentence) {
    return (
      <div className="flex justify-center items-center flex-col mt-32">
        <h4 className="text-center mb-8">Nothing here</h4>

        <button
          onClick={() => {
            setReviewMode("classic");
          }}
        >
          {" "}
          Back to classic mode
        </button>
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="flex justify-between items-center">
        <button
          onClick={() => {
            setReviewMode(null);
          }}
        >
          <Icons.xMark />
        </button>
        <h1 className="text-center">Recloze</h1>
        <div></div>
      </div>

      {sentence && (
        <div>
          <h1 className="text-center mt-32 text-3xl">{sentenceHanzi}</h1>
          <p className="text-center mt-4">{sentence?.en}</p>

          <div className="grid grid-cols-2 gap-8 mt-12 max-w-xl m-auto">
            {shuffledOptions?.map((option: string) => (
              <button
                onClick={() => {
                  checkAnswer(option);
                }}
                disabled={response?.type}
                className={cn(
                  "bg-purple-600 p-4 hover:bg-purple-500 text-white",
                  response
                    ? response?.answer === option
                      ? response?.type === "correct"
                        ? "bg-green-500"
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
                <p className="my-8 text-center">
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
