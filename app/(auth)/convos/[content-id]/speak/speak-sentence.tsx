import { useDictaphone } from "@/components/speak/useSpeechRecognition_v2";
import { Icons } from "@/components/ui/icons.v2";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";

export const SpeakSentence = ({ sentence }: { sentence: any }) => {
  const [historyTimeline, setHistoryTimeline] = useState<string[]>([]);

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
    startListening,
    stopListening,
    ...rest
  } = useDictaphone(sentence?.lang);

  useEffect(() => {
    if (transcript && !historyTimeline?.includes(transcript)) {
      setHistoryTimeline(historyTimeline.concat(transcript));
    }
  }, [historyTimeline, transcript]);

  const router = useRouter();

  const searchParams = useSearchParams();

  const handleNext = useCallback(() => {
    resetTranscript();
    setHistoryTimeline([]);
  }, [resetTranscript]);

  const handlePrevious = useCallback(() => {
    resetTranscript();
    setHistoryTimeline([]);
  }, [resetTranscript]);

  const resetState = useCallback(() => {
    resetTranscript();
    setHistoryTimeline([]);
  }, [resetTranscript]);

  const spacedRemovedTranscript = useMemo(
    () =>
      transcript
        ?.split("")
        ?.filter((item) => item !== " ")
        ?.join(""),
    [transcript],
  );

  useEffect(() => {
    const lowerCasedTranscript = transcript?.toLowerCase();
    const filterItems = [
      "restart",
      "start over",
      "reset",
      "重新启动",
      "重启",
      "重新开始",
    ];
    if (
      filterItems?.filter((item) => lowerCasedTranscript?.includes(item))
        ?.length > 0
    ) {
      resetState();
    }

    const nextQuestions = ["下一个问题", "下一个"];
    const previousQuestions = ["上一个问题", "上一个"];

    if (
      nextQuestions?.filter((item) => lowerCasedTranscript?.includes(item))
        ?.length > 0
    ) {
      handleNext();
    }

    if (
      previousQuestions?.filter((item) => lowerCasedTranscript?.includes(item))
        ?.length > 0
    ) {
      handlePrevious();
    }

    const iwantToWatchOrListen = [
      "我要看",
      "我要看看",
      "我想看",
      "我想要看看",
      "我想看看",
      "我想听",
      "我要听",
      "我要听听",
      "我想要听",
    ];

    if (
      iwantToWatchOrListen?.filter((item) =>
        lowerCasedTranscript?.includes(item),
      )?.length > 0
    ) {
      stopListening();
      resetState();
    }
  }, [
    resetState,
    handleNext,
    handlePrevious,
    resetTranscript,
    stopListening,
    router,
    searchParams,
    transcript,
  ]);

  return (
    <main className="py-12 flex items-center justify-center flex-col mt-32">
      <div className="font-light w-full px-4 md:px-12 md:mt-2">
        <div className="flex flex-col md:flex-row justify-between items-center w-full">
          <div></div>
          <h2 className="text-gray-400 font-extralight text-lg md:text-2xl">
            Please repeat the following sentence in{" "}
            <span className="text-yellow-400">汉子</span>
          </h2>

          <div></div>
        </div>

        <div className="text-center text-xl mt-20">
          <p className="mb-4">{sentence?.en}</p>
          <p className="text-4xl">
            <Link
              href={`/nmm/${sentence?.hanzi || sentence?.input}?lang=${sentence?.lang}`}
            >
              {sentence?.hanzi || sentence?.input}
            </Link>
          </p>

          <p className="mt-12">
            {transcript ? (
              <Link
                className={
                  spacedRemovedTranscript ===
                  (sentence?.hanzi || sentence?.input)
                    ? "text-green-500"
                    : ""
                }
                href={`/nmm/${transcript}?lang=${sentence?.lang}`}
              >
                {spacedRemovedTranscript?.split("").map((item, idx: number) => {
                  const char = (sentence?.hanzi || sentence?.input)?.[idx];
                  return (
                    <span
                      className={
                        char === item ? "text-green-400" : "text-yellow-400"
                      }
                      key={`speak-response-${item}-${idx}-speak`}
                    >
                      {item}
                    </span>
                  );
                })}
              </Link>
            ) : (
              "..."
            )}
          </p>
        </div>

        <div className="flex justify-center items-center gap-12 text-2xl my-24">
          <button
            onClick={() => {
              if (!listening) {
                startListening();
                resetTranscript();
              } else {
                stopListening();
              }
            }}
          >
            {listening ? <Icons.pause /> : <Icons.microphone />}
          </button>
          <button
            onClick={() => {
              resetTranscript();
              setHistoryTimeline([]);
            }}
          >
            <Icons.reset />
          </button>
        </div>
        <div className="flex justify-center items-center gap-12 text-xl mt-12">
          <button onClick={handlePrevious}>
            <Icons.arrowLeft />
          </button>
          <button onClick={handleNext}>
            <Icons.arrowRight />
          </button>
        </div>
      </div>

      {/* <div>
        <code>
          <pre>{JSON.stringify(historyTimeline, null, 4)}</pre>
        </code>
      </div> */}
    </main>
  );
};
