import { Icons } from "@/components/ui/icons.v2";
import { useHskLevel, useReviewModeView } from "../use-review-mode";
import { useUnreviwedCharacters } from "../use-unreviewed-characters";
import { useListHSKWordsQuery } from "@/domain/hsk/hsk.queries";
import { useGetCurrentReviewCharacter } from "../use-get-current-review-character";
import { useMemo, useState } from "react";
import { useListSentencesQuery } from "@/domain/sentence/sentence.queries";
import { cn } from "@/lib/utils";
import Link from "next/link";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetCharacterLearningContext } from "@/components/_select-character/selected-character/use-get-character-learning-context";

const hskLevels = [
  {
    title: "HSK 1",
    value: "1",
  },
  {
    title: "HSK 2",
    value: "2",
  },
  {
    title: "HSK 3",
    value: "3",
  },
  {
    title: "HSK 4",
    value: "4",
  },
  {
    title: "HSK 5",
    value: "5",
  },
  {
    title: "HSK 6",
    value: "6",
  },
  {
    title: "HSK 7-9",
    value: "9",
  },
  {
    title: "All",
    value: "0",
  },
];
const HskLevelSelector = () => {
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
    isLoading: isReviewCharactersLoading,
  } = useGetCurrentReviewCharacter();

  const { data: hskWords } = useListHSKWordsQuery();

  const { hskLevel, setHskLevel } = useHskLevel();

  const relevantHskWords = useMemo(
    () =>
      shuffleArray(
        hskWords?.filter((word: any) =>
          JSON.stringify(word)?.includes(currentCharacter?.hanzi)
        ) || []
      ),
    [currentCharacter?.hanzi, hskWords]
  );

  const modifiedHskLevels = hskLevels.map((level) => {
    const totalWords = relevantHskWords.filter((word: any) => {
      return word?.hskLevel <= level.value;
    })?.length;
    return {
      ...level,
      title:
        level.value === "0" ? level.title : `${level.title} (${totalWords})`,
    };
  });

  return (
    <Select
      value={hskLevel}
      onValueChange={(value) => {
        setHskLevel(value);
      }}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a level" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>HSK Level</SelectLabel>
          {modifiedHskLevels.map((level) => {
            return (
              <SelectItem key={level.title} value={level.value}>
                {level.title}
              </SelectItem>
            );
          })}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

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
    isLoading: isReviewCharactersLoading,
  } = useGetCurrentReviewCharacter();

  const { hskLevel, setHskLevel } = useHskLevel();

  const relevantHskWords = useMemo(
    () =>
      shuffleArray(
        (
          hskWords?.filter((word: any) =>
            JSON.stringify(word)?.includes(currentCharacter?.hanzi)
          ) || []
        ).filter((word: any) => {
          if (hskLevel == "0") {
            return true;
          }

          return word.hskLevel <= hskLevel;
        })
      ),
    [currentCharacter?.hanzi, hskLevel, hskWords]
  );
  const irrelevantHskWords = useMemo(
    () =>
      shuffleArray(
        hskWords?.filter(
          (word: any) =>
            !JSON.stringify(word)?.includes(currentCharacter?.hanzi)
        ) || []
      ),
    [currentCharacter?.hanzi, hskWords]
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

  if (isSentenceLoading || isReviewCharactersLoading) {
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
        <h1 className="text-center">cloze</h1>

        <HskLevelSelector />
      </div>

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
