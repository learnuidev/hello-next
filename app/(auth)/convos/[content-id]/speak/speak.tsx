import { useEffect, useMemo, useState } from "react";
import {
  useDyanStoreRuntime,
  useDynaCloze,
} from "../dyna-cloze/use-dyna-cloze";
import { useGetContentQuery } from "@/domain/content/content.queries";
import { useCurrentTime } from "@/components/youtube-page/use-current-time-store";
import { shuffleArray } from "@/app/review/review-cloze/utils/shuffle-array";
import { useDictaphone } from "@/components/speak/useSpeechRecognition_v2";
import { Icons } from "@/components/ui/icons.v2";
import { YoutubeButton } from "@/components/youtube-page/youtube-button";

export const Speak = ({ contentId }: { contentId: string }) => {
  const [historyTimeline, setHistoryTimeline] = useState<string[]>([]);
  const { setWordIndex, setSentenceIndex, sentenceIndex, wordIndex } =
    useDyanStoreRuntime();
  const { data: content, isLoading } = useGetContentQuery({
    contentId,
  });

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
    startListening,
    stopListening,
    ...rest
  } = useDictaphone(content?.lang || "");

  useEffect(() => {
    if (transcript && !historyTimeline?.includes(transcript)) {
      setHistoryTimeline(historyTimeline.concat(transcript));
    }
  }, [historyTimeline, transcript]);

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

  console.log("learn mode", learnMode);

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

  const totalLessons = content?.transcriptions?.length - 1;

  return (
    <main className="py-12 flex items-center justify-center flex-col">
      <div className="font-light w-full px-4 md:px-12 md:mt-2">
        <div className="flex flex-col md:flex-row justify-between items-center w-full">
          <div></div>
          <h2 className="text-gray-400 font-extralight text-lg md:text-2xl">
            Please repeat the following sentence in{" "}
            <span className="text-yellow-400">汉子</span>
          </h2>

          <div className="text-md md:text-2xl font-extralight text-gray-500">
            {sentenceIndex + 1} / {totalLessons}
          </div>
        </div>

        <div className="text-center text-xl mt-20">
          <p className="mb-4">{sentence?.en}</p>
          <p className="text-4xl">{sentence?.hanzi || sentence?.input}</p>

          <p className="mt-12">{transcript || "..."}</p>
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

          <YoutubeButton
            className="text-2xl"
            sentenceInput={sentence?.input || sentence?.hanzi}
            contentId={content.id}
            transcriptId={sentence?.id}
          />
        </div>
        <div className="flex justify-center items-center gap-12 text-xl mt-12">
          <button
            onClick={() => {
              resetTranscript();
              setHistoryTimeline([]);
              setSentenceIndex(Math.max(0, sentenceIndex - 1));
            }}
          >
            <Icons.arrowLeft />
          </button>
          <button
            onClick={() => {
              resetTranscript();
              setHistoryTimeline([]);
              setSentenceIndex(
                Math.min(content?.transcriptions?.length - 1, sentenceIndex + 1)
              );
            }}
          >
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
