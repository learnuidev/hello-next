import { useSpeak } from "@/app/(auth)/convos/_play/use-speak";
import { useGetTopTenIncorrect } from "@/app/(auth)/insights/insights-v2/precision-insight-view/use-get-top-ten-incorrect";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import "regenerator-runtime";

import { Icons } from "@/components/ui/icons.v2";
import { cleanString } from "@/data/convos/bm1/clean-string";
import { useListSentencesQuery } from "@/domain/sentence/sentence.queries";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useState } from "react";

function getRandomNumber(n: number) {
  return Math.floor(Math.random() * (n + 1));
}

export const Speak = () => {
  const [showPinyin, setShowPinyin] = useState(false);
  const [showMeta, setShowMeta] = useState(false);
  const topTenIncorrect = useGetTopTenIncorrect();
  const [index, setIndex] = useState(0);
  const [randomDataIndex, setRandomDataIndex] = useState(getRandomNumber(9));

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
    ...rest
  } = useSpeechRecognition({ transcribing: true });

  const component = topTenIncorrect?.[randomDataIndex]?.hanzi;

  const { data } = useListSentencesQuery(
    {
      component: topTenIncorrect?.[randomDataIndex]?.hanzi,
    },
    {
      enabled: Boolean(topTenIncorrect?.[randomDataIndex]?.hanzi),
    }
  );

  const phrase = data?.[index];

  const cleanedHanzi = cleanString(phrase?.hanzi);

  const { speak } = useSpeak();

  if (!phrase) {
    return null;
  }

  const formattedTransacript = transcript?.split(" ").filter(Boolean).join("");

  const filteredItems = ["。"];

  return (
    <div>
      <section className="flex justify-start flex-col w-full items-center mt-32">
        {showPinyin && <p className="text-gray-500">{phrase?.pinyin}</p>}
        <Link
          className="text-4xl"
          href={`/nmm/${encodeURIComponent(phrase?.hanzi)}`}
          target="_blank"
        >
          {cleanedHanzi?.split("").map((item: any, idx: any) => {
            const transcriptKey = formattedTransacript?.[idx];
            return (
              <span
                key={`${item}-${idx}`}
                className={cn(
                  item === component && !transcript
                    ? "text-blue-400"
                    : listening || filteredItems?.includes(item) || !transcript
                      ? ""
                      : transcriptKey === item
                        ? "text-green-400"
                        : "text-yellow-400"
                )}
              >
                {item}
              </span>
            );
          })}
        </Link>
        <p className="font-light text-gray-400">{phrase?.en}</p>

        {/* <p>
          <code>
            <pre>{JSON.stringify(transcript)}</pre>
          </code>
        </p> */}
      </section>

      <div className="text-gray-400 space-x-12 flex justify-center items-center mt-32">
        <button
          className={cn(
            "text-xl border-[1px] border-gray-700 hover:border-s-gray-500 rounded w-10 h-10"
          )}
          onClick={() => {
            speak(phrase?.hanzi);
          }}
        >
          <Icons.volume />
        </button>
        <button
          className={cn(
            "text-3xl border-[1px] rounded-full w-14 h-14",
            listening ? "text-red-500" : ""
          )}
          onClick={() => {
            if (listening) {
              SpeechRecognition.stopListening();
            } else {
              resetTranscript();
              SpeechRecognition.startListening?.({
                language: "zh-CN",
                continuous: true,
              });
            }
          }}
        >
          {listening ? <Icons.stop /> : <Icons.microphone />}
        </button>
        <button
          className={cn(
            "text-xl border-[1px] border-gray-700 hover:border-s-gray-500 rounded w-10 h-10"
          )}
          onClick={() => {
            SpeechRecognition.stopListening();
            resetTranscript();
          }}
        >
          <Icons.refresh />
        </button>
      </div>

      <div className="text-center mt-12">
        <p>{formattedTransacript}</p>
      </div>

      <div className="space-x-12 flex justify-center items-center mt-32">
        <button
          className={cn(
            "text-xl text-gray-400 hover:dark:text-white hover:text-black  hover:border-s-gray-500 rounded w-10 h-10"
          )}
          onClick={() => {
            setIndex(Math.max(0, index - 1));
          }}
        >
          <Icons.arrowLeft />
        </button>

        <button
          className={cn(
            "text-xl text-gray-400 hover:dark:text-white hover:text-black  hover:border-s-gray-500 rounded w-10 h-10"
          )}
          onClick={() => {
            setRandomDataIndex(getRandomNumber(9));
            setIndex(0);
            resetTranscript();
          }}
        >
          <Icons.refresh />
        </button>

        <button
          className={cn(
            "text-xl text-gray-400 hover:dark:text-white hover:text-black  hover:border-s-gray-500 rounded w-10 h-10"
          )}
          onClick={() => {
            setIndex(Math.min(data?.length - 1, index + 1));
            // SpeechRecognition.stopListening();
            // resetTranscript();
          }}
        >
          <Icons.arrowRight />
        </button>
      </div>

      <div className="flex justify-center space-x-4 mt-8 dark:text-gray-500">
        <button
          onClick={() => {
            setShowPinyin(!showPinyin);
          }}
        >
          {showPinyin ? "Hide Pinyin" : "Show Pinyin"}
        </button>
        <button
          onClick={() => {
            setShowMeta(!showMeta);
          }}
        >
          {showMeta ? "Hide Meta" : "Show Meta"}
        </button>
      </div>

      {showMeta && (
        <div className="max-w-2xl m-auto">
          <div className="dark:text-gray-500 mt-16">
            <code>
              <pre>{JSON.stringify(rest, null, 4)}</pre>
            </code>
          </div>

          <section className="dark:text-gray-500 mt-16">
            <code>
              <pre>{JSON.stringify(data?.[0], null, 4)}</pre>
            </code>
          </section>
        </div>
      )}
    </div>
  );
};
