/* eslint-disable react-hooks/exhaustive-deps */
import { Icons } from "@/components/ui/icons.v2";
import { useListHSKWordsQuery } from "@/domain/hsk/hsk.queries";
import { useListSentencesQuery } from "@/domain/sentence/sentence.queries";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useMemo, useState } from "react";
import { useHskLevel, useReviewModeView } from "../use-review-mode";
import { HskLevelSelector } from "./hsk-level-selector";
import { getRandomWords } from "./utils/get-random-words";
import { shuffleArray } from "./utils/shuffle-array";
import { useGetCharacterLearningContext } from "@/components/_select-character/selected-character/use-get-character-learning-context";
import { CharacterItem } from "@/components/_select-character/character-item";
import { ContentClozeModeButton } from "../content-cloze-mode-button";
import { YoutubeButton } from "@/components/youtube-page/youtube-button";
import { useIsContent } from "../use-is-content";
import { useLearningMode } from "@/components/settings-dialog/learning-mode.store";
import { useGetContent } from "@/app/nmm/content/use-get-content";
import { useGetContentQuery } from "@/domain/content/content.queries";

const ClozeNavbar = ({
  onClose,
  currentCharacter,
}: {
  onClose?: () => void;
  currentCharacter: string;
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
        <div className="flex gap-4 items-center flex-row">
          <ContentClozeModeButton />
          <HskLevelSelector currentCharacter={currentCharacter} />
        </div>
      </div>
    </nav>
  );
};

export function ReviewCloze({
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
  const [showEn, setShowEn] = useState(false);
  const [clozeIndex, setClozeIndex] = useState(0);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [response, setResponse] = useState<any>(null);
  const { setReviewMode } = useReviewModeView();

  const { mode } = useLearningMode();

  const isContent = useIsContent(mode);

  const { data: content } = useGetContentQuery({ contentId: mode });

  const contextSentences = useGetCharacterLearningContext({
    lang,
    characterId: currentCharacter,
  });

  const contentSentences = useMemo(
    () =>
      isContent
        ? content?.transcriptions?.filter((transcription: any) => {
            return (transcription?.hanzi || transcription?.input)?.includes(
              currentCharacter
            );
          })
        : [],
    [isContent, content]
  );

  const { data: hskWords } = useListHSKWordsQuery();

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

  // eslint-disable-next-line react-hooks/exhaustive-deps

  const relevantContextSentences = useMemo(
    () =>
      (contextSentences || [])?.filter((sentence: any) => {
        return (
          (sentence?.hanzi || sentence?.input)?.includes(relevantHanzi) &&
          sentence?.input?.length < 20
        );
      }),
    [contextSentences, relevantHanzi]
  );

  const sentences = useMemo(
    () => [
      ...contentSentences,
      ...getRandomWords(
        [
          ...(relevantContextSentences || []),
          ...(sentencesInitial || []),
        ]?.filter((sent: any) =>
          (sent?.hanzi || sent?.input)?.includes(relevantHanzi)
        )
      ),
    ],
    [relevantHanzi, sentencesInitial, contentSentences]
  );

  const sentence = useMemo(
    () => sentences?.[questionIndex],
    [sentences, questionIndex]
  );

  const futureSentence = useMemo(
    () => sentences?.[questionIndex + 1],
    [sentences, questionIndex]
  );

  const randomThreeOptions = useMemo(
    () =>
      getRandomWords(
        irrelevantHskWords?.filter(
          (item: any) => (item?.hanzi || item?.input) !== relevantHanzi
        ),
        3
      ),
    [irrelevantHskWords, relevantHanzi, questionIndex, sentence]
  );

  const shuffledOptions = useMemo(
    () => shuffleArray([...randomThreeOptions, relevantHskWord]),
    [randomThreeOptions, relevantHanzi, questionIndex, sentence]
  );

  const sentenceHanzi = useMemo(
    () =>
      (sentence?.hanzi || sentence?.input)?.replace(relevantHanzi, " ____ "),
    [relevantHanzi, sentence?.hanzi, sentence?.input]
  );

  const checkAnswer = (answer: string) => {
    if (answer === relevantHanzi) {
      setResponse({ type: "correct", answer });
    } else {
      setResponse({ type: "incorrect", answer });
    }
  };

  const toggleEn = () => {
    return setShowEn(!showEn);
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
        <ClozeNavbar onClose={onClose} currentCharacter={currentCharacter} />

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
      <ClozeNavbar onClose={onClose} currentCharacter={currentCharacter} />

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
            {(response ? sentence?.hanzi || sentence?.input : sentenceHanzi)
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

          <Link
            target="_blank"
            href={`/convos/${sentence?.contentId}${sentence?.start ? `?start=${sentence?.start}` : ""}`}
            className="block"
          >
            <p className="text-center mt-4">{sentence?.en}</p>
          </Link>

          <div className="grid grid-cols-2 gap-8 mt-12 max-w-md m-auto lg:mt-24">
            {shuffledOptions?.map((option: any, idx: number) => (
              <button
                onClick={() => {
                  checkAnswer(option?.input || option?.hanzi);
                }}
                disabled={response?.type}
                className={cn(
                  "border-orange-400 text-black  border-[2px] p-2 dark:text-white text-lg",
                  response
                    ? response?.answer === (option?.input || option?.hanzi)
                      ? response?.type === "correct"
                        ? "bg-green-500 border-green-600 hover:bg-green-600"
                        : "bg-red-500 hover:bg-red-600"
                      : "bg-gray-800 opacity-10 text-gray-200"
                    : "",
                  "transition rounded-none",
                  response
                    ? ""
                    : "hover:bg-orange-500 hover:text-white hover:scale-110"
                )}
                key={`review-cloze-${option?.input || option?.hanzi}-${idx}-review-cloze`}
              >
                {showEn ? option?.en : option?.input || option?.hanzi}
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

              <div className="flex justify-center items-center gap-8 mt-8">
                <button
                  onClick={() => {
                    setReviewMode(null);
                  }}
                  className="hover:scale-125 transition hover:font-bold"
                >
                  <Icons.xMark className="text-2xl" />
                </button>
                {futureSentence && (
                  <button
                    onClick={() => {
                      setQuestionIndex(questionIndex + 1);
                      setResponse(null);
                    }}
                    className="hover:scale-125 transition hover:font-bold"
                  >
                    <Icons.arrowDown className="text-2xl" />
                  </button>
                )}
                <button
                  onClick={() => {
                    setClozeIndex(clozeIndex + 1);
                    setQuestionIndex(0);
                    setResponse(null);
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

            {sentence?.contentId && (
              <YoutubeButton
                sentenceInput={sentence?.input || sentence?.hanzi}
                contentId={sentence?.contentId}
                transcriptId={sentence?.id}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}
