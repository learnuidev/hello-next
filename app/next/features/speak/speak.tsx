import "regenerator-runtime";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { useSpeak } from "@/app/(auth)/convos/_play/use-speak";
import { useGetTopTenIncorrect } from "@/app/(auth)/insights/insights-v2/precision-insight-view/use-get-top-ten-incorrect";

import { useListSentencesQuery } from "@/domain/sentence/sentence.queries";
import { Icons } from "@/components/ui/icons.v2";
import { cn } from "@/lib/utils";
import { useMemo, useState } from "react";
import Link from "next/link";

function getRandomNumber(n: number) {
  return Math.floor(Math.random() * (n + 1));
}

export const Speak = () => {
  const [showPinyin, setShowPinyin] = useState(true);
  const topTenIncorrect = useGetTopTenIncorrect();

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
    ...rest
  } = useSpeechRecognition({ transcribing: true });

  const randomDataIndex = useMemo(() => getRandomNumber(9), []);

  console.log(
    "HANZI",
    topTenIncorrect?.[randomDataIndex]?.hanzi || topTenIncorrect?.[0]?.hanzi
  );
  const { data } = useListSentencesQuery(
    {
      component: topTenIncorrect?.[randomDataIndex]?.hanzi,
    },
    {
      enabled: Boolean(topTenIncorrect?.[randomDataIndex]?.hanzi),
    }
  );

  const randomPhraseIndex = useMemo(
    () => getRandomNumber(data?.length - 1),
    [data]
  );

  const phrase = data?.[randomPhraseIndex];

  const { speak } = useSpeak();

  if (!phrase) {
    return null;
  }

  const filteredItems = ["。"];

  return (
    <div>
      <section className="flex justify-start flex-col w-full items-center mt-32">
        {showPinyin && <p className="text-gray-500">{phrase?.pinyin}</p>}
        <Link
          className="text-4xl"
          href={`/nmm/${phrase?.hanzi}`}
          target="_blank"
        >
          {phrase?.hanzi?.split("").map((item: any, idx: any) => {
            const transcriptKey = transcript?.[idx];
            return (
              <span
                key={`${item}-${idx}`}
                className={cn(
                  listening || filteredItems?.includes(item) || !transcript
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
        <p>{transcript}</p>
      </div>

      <div className="flex justify-center space-x-4 mt-8 text-gray-400">
        <button
          onClick={() => {
            setShowPinyin(!showPinyin);
          }}
        >
          {showPinyin ? "Hide Pinyin" : "Show Pinyin"}
        </button>
      </div>

      <div className="text-gray-500 mt-16">
        <code>
          <pre>{JSON.stringify(rest, null, 4)}</pre>
        </code>
      </div>

      <section className="text-gray-500 mt-16">
        <code>
          <pre>{JSON.stringify(data?.[0], null, 4)}</pre>
        </code>
      </section>
    </div>
  );
};
