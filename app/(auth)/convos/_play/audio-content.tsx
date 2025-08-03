"use client";

import { FocusIcon } from "@/components/ui/icons";
import { useState } from "react";

import Editor from "@monaco-editor/react";

import { useMusic } from "./use-music";

import { course5 } from "@/data/pronunciation_data";
import { PlayButton } from "./play-button";
//

import { useRepeatHistoryStore } from "./use-repeat-history";
import { useViewModeStore } from "./use-view-mode";

import { useModeStore, usePinyinModeStore } from "./use-mode";

import { useGetContentQuery } from "@/domain/content/content.queries";
import { useListHSKWordsQuery } from "@/domain/hsk/hsk.queries";
import { useListSpeakQuery } from "@/domain/hsk/use-list-speak-query";
import { useListGrammarsQuery } from "@/domain/sentence/grammar.queries";
import { Transcription } from "@/domain/transcribe/transcribe.types";
import { faGoogle, faSkyatlas } from "@fortawesome/free-brands-svg-icons";
import { faAtom, faLanguage } from "@fortawesome/pro-thin-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import { TranscriptItem } from "./transcript-item";
import { getYablaLink } from "@/components/youtube-page/utils/get-yabla-link";

export const Play = ({ lessonId }: { lessonId: string }) => {
  const [displayOptions, setDisplayOptions] = useState(false);
  const [lessonIndex, setLessonIndex] = useState(0);

  const params = useParams<{ "content-id": string }>();

  const [results, setResults] = useState<any>({});

  const { data: hskWords } = useListHSKWordsQuery();

  const { data } = useListSpeakQuery() as any;

  const lessonsArr = data?.lessons;

  // const results = useResults(store => store.results)

  // const characterDictionary = dictionary?.[selectedChar];

  const setRepeatHistories = useRepeatHistoryStore(
    (state: any) => state.setHistory
  );

  const setViewMode = useViewModeStore((state: any) => state.setViewMode);

  const pinyinMode = usePinyinModeStore((state: any) => state?.pinyinMode);
  const setPinyinMode = usePinyinModeStore(
    (state: any) => state?.setPinyinMode
  );

  const mode = useModeStore((state: any) => state.mode);
  const focusMode = mode === "focus";
  const setMode = useModeStore((state: any) => state.setMode);

  const lesson = course5.lessons[lessonIndex] || null;

  const { data: lesson2 } = useGetContentQuery({ contentId: lessonId });

  const lesson1 =
    lessonsArr?.find((lesson: any) => lesson?.id === lessonId) || lesson2;

  const formatNumber = (time: any) => (time > 9 ? `${time}` : `0${time}`);

  const toggleMode = (arg: any) => () => {
    setMode((prevMode: any) => {
      return prevMode === arg ? "" : arg;
    });
  };

  const formatTime = (ex: any) => {
    const example = Math.floor(ex);
    if (example > 60) {
      const minutes = Math.floor(example / 60);
      const seconds = example % 60;
      return `00:${formatNumber(minutes)}:${formatNumber(seconds)}`;
    }
    return example > 9 ? `00:00:${example}` : `00:00:0${example}`;
  };

  const searchParams = useSearchParams();

  const audioUrl = lesson1?.audio?.slow || lesson1?.audio || lesson2?.audio;

  const { play, togglePlay, seek, currentTime, reset } = useMusic({
    url: audioUrl,
  });

  const lessonItems = lesson2?.transcriptions?.map(
    (transcription: Transcription) => {
      const { start, end, hanzi, pinyin, en } = transcription;

      return [
        ["time", [[start, end, start]]],
        ["", hanzi],
        ["", pinyin],
        ["", ""],
        ["", en],
      ];
    }
  );

  const LessonNavBar = () => {
    return (
      <div className="bg-black fixed bottom-0 pt-4 flex items-center justify-between min-w-full md:px-32 bg-opacity-80">
        <p className="w-16 font-extralight text-2xl text-center dark:text-slate-300 text-slate-600">
          {formatTime(currentTime)}
        </p>

        <PlayButton
          lessonId={lesson1?.id}
          play={play}
          togglePlay={togglePlay}
          handleSuggestion={() => {
            setViewMode("suggestion");
          }}
          onClear={() => {
            setResults({});
          }}
        />
        <div className="space-x-4">
          <button onClick={toggleMode("focus")}>
            <FocusIcon
              className={`z-50 text-xl p-2 md:text-3xl ${
                focusMode
                  ? "dark:text-white text-slate-700"
                  : "dark:text-slate-400 text-slate-300"
              } dark:hover:text-slate-100 hover:text-slate-900 transition md:px-4`}
            />
          </button>
          <button
            onClick={() => {
              setPinyinMode(!pinyinMode);
            }}
          >
            <FontAwesomeIcon
              className={`z-50 text-xl p-2 md:text-3xl ${
                pinyinMode
                  ? "dark:text-white text-slate-700"
                  : "dark:text-slate-400 text-slate-300"
              } dark:hover:text-slate-100 hover:text-slate-900 transition md:px-4`}
              icon={faLanguage}
            />
          </button>
        </div>
      </div>
    );
  };

  const FocusModeTranscriptItem = ({
    transcription,
  }: {
    transcription: Transcription;
  }) => {
    const [showGrammarAnalysis, setShowGrammarAnalysis] = useState(false);
    const { data } = useListGrammarsQuery({ content: transcription?.hanzi });
    return (
      <div className={`text-center`}>
        {play && (
          <div
            role="button"
            onClick={() => {
              if (audioUrl) {
                seek(transcription?.start);
              }

              setRepeatHistories({
                lessonId: lesson1?.id || lesson2.id,
                eventType: "speech/repeat",
                eventTime: new Date().getTime(),
                startTime: transcription.start,
                hanzi: transcription.hanzi || transcription?.input,
                pinyin: transcription.pinyin,
                en: transcription.en,
                step: transcription.step,
                // item
              });
            }}
          >
            <p className={``}>{transcription?.hanzi}</p>

            {pinyinMode ? (
              <>
                <p className="dark:text-gray-400 text-md">
                  {transcription?.pinyin}
                </p>
                <p className="dark:text-gray-300 text-md">
                  {transcription?.en}
                </p>
              </>
            ) : null}
          </div>
        )}

        {play && (
          <div
            // onMouseEnter={() => {
            //   setDisplayOptions(true);
            // }}
            // onMouseLeave={() => {
            //   setDisplayOptions(false);
            // }}
            className="h-12"
          >
            {/* {displayOptions ? ( */}
            {play && true ? (
              <div className="my-8 space-x-8">
                <Link href={getYablaLink(transcription?.hanzi)} target="_blank">
                  <FontAwesomeIcon icon={faSkyatlas} />
                </Link>

                <Link
                  target="_blank"
                  href={`https://translate.google.com/?hl=zh-CN&sl=zh-CN&tl=en&text=${encodeURIComponent(
                    transcription?.hanzi
                  )}&op=translate`}
                >
                  <FontAwesomeIcon icon={faGoogle} />
                </Link>
                <button
                  onClick={() => {
                    setShowGrammarAnalysis((prev) => !prev);
                  }}
                >
                  <FontAwesomeIcon icon={faAtom} />
                </button>
              </div>
            ) : null}
          </div>
        )}

        {!play && (
          <Editor
            width={"800px"}
            height="400px"
            language="json"
            theme="vs-dark"
            value={JSON.stringify(data, null, 2)}
            // onChange={handleEditorChange}
          />

          // <code className="text-[10px] flex w-full text-start">
          //   <pre>{JSON.stringify(data, null, 2)}</pre>
          // </code>
        )}
      </div>
    );
  };

  const FocusMode = () => {
    return (
      <div className="pt-24 space-y-8">
        {lesson2?.transcriptions
          ?.filter((transcription: Transcription) => {
            return (
              transcription.start < currentTime &&
              transcription.end > currentTime
            );
          })
          .map((transcription: Transcription) => {
            return (
              <FocusModeTranscriptItem
                key={`${transcription?.hanzi}-${transcription?.pinyin}`}
                transcription={transcription}
              />
            );
          })}
      </div>
    );
  };

  const Timestamps = () => {
    return (
      <div className="flex flex-wrap">
        {(
          lesson1?.lesson ||
          lesson1?.transcriptions?.transcriptions ||
          lesson1?.lessonsV2 ||
          lessonItems
        )?.map((item: any, idx: any) => {
          if (item?.text) {
            const earliestTime = item?.[0]?.[1]?.[0]?.[0] || item?.start;
            const latestTime = item?.[0]?.[1]?.[0]?.[1] || item?.end;

            return (
              <button
                key={`${idx}-${idx}-${lesson?.id}-${idx}`}
                onClick={() => {
                  seek(earliestTime || 0);

                  setRepeatHistories({
                    lessonId: lesson1?.id || lesson2.id,
                    eventType: "speech/repeat",
                    eventTime: new Date().getTime(),
                    startTime: earliestTime || 0,
                    scriptIndex: idx,
                    // item
                  });
                }}
                className={`mx-4 my-2 text-xl dark:hover:text-white font-extralight text-black`}
              >
                <div
                  className={`${
                    earliestTime < currentTime && latestTime > currentTime
                      ? "text-slate-300 dark:text-slate-900 bg-slate-200 hover:bg-white"
                      : "text-slate-900 bg-slate-500 hover:bg-white"
                  } h-2 w-2 rounded-full transition`}
                ></div>
              </button>
            );
          }
          const [time, ...rest] = item;
          const earliestTime = time?.start ? time?.start : time[1][0];
          const latestTime = time?.end
            ? time?.end
            : time[1][time[1].length - 1];

          return (
            <button
              key={`${lesson?.id}-${idx}-912312912391239casasd`}
              onClick={() => {
                seek(earliestTime[0]);

                setRepeatHistories({
                  lessonId: lesson1?.id || lesson2.id,
                  eventType: "speech/repeat",
                  eventTime: new Date().getTime(),
                  startTime: earliestTime[0],
                  scriptIndex: idx,
                  // item
                });
              }}
              className={`mx-4 my-2 text-xl ${
                currentTime > earliestTime
                  ? "dark:text-slate-600"
                  : earliestTime[0] < currentTime && latestTime[1] > currentTime
                    ? "dark:text-slate-500"
                    : "dark:text-slate-200"
              } dark:hover:text-white font-extralight`}
            >
              {/* {formatTime(earliestTime[0])} */}
              <div
                className={` ${
                  currentTime > earliestTime
                    ? "dark:text-slate-600"
                    : earliestTime[0] < currentTime &&
                        latestTime[1] > currentTime
                      ? "dark:bg-slate-200"
                      : "dark:bg-slate-600"
                } h-2 w-2 rounded-full text`}
              ></div>
              {/* {idx + 1} */}
            </button>
          );
        })}
      </div>
    );
  };

  const Transcripts = () => {
    return (
      <div className="pt-12 space-y-12 mb-12">
        {lesson2?.transcriptions?.map((transcription: Transcription) => {
          return (
            <TranscriptItem
              lang={lesson2?.lang}
              key={`${transcription?.hanzi || transcription?.input}-${transcription?.pinyin}`}
              transcription={transcription}
              seek={seek}
              audioUrl={audioUrl}
              currentTime={currentTime}
              pinyinMode={pinyinMode}
              lessonId={lesson1?.id || lesson2?.id}
            />
          );
        })}
      </div>
    );
  };

  return (
    <div className="pt-8 grow flex flex-col items-center">
      <LessonNavBar />

      {/* timestamps */}
      <Timestamps />
      {/* timestamps */}

      {/* <div>
        <code>
          <pre>{JSON.stringify(lesson2, null, 2)}</pre>
        </code>
      </div> */}

      {focusMode ? <FocusMode /> : <Transcripts />}
    </div>
  );
};
