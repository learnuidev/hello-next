"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  AnalyticsIcon,
  CheckIcon,
  CloseIcon,
  CloseIcon as Header,
  MicIcon,
  NextIcon,
  PauseIcon,
  PlayIcon,
  ThoughtIcon,
} from "@/components/ui/icons";
// import { useSpeechRecognition } from 'react-speech-recognition'

// import { useSearchQuery } from 'ui/react-query/search/search.queries'
// import ReactPlayer from 'react-player'
import { useHistoryStore } from "./use-history";
import { useSpeechRecognition } from "./use-speech-recognition";
import { useCurrentLesson } from "./use-current-lesson";
import { useRepeatHistoryStore } from "./use-repeat-history";

// const startListening = () = F
// setText.'

export const SpeechToText = ({
  onClear,
  handleSuggestion,
  play,
  togglePlay,
  lessonId,
}: {
  onClear: () => void;
  handleSuggestion?: () => void;
  play: any;
  lessonId: any;
  togglePlay: any;
}) => {
  const {
    transcript,
    transcripts,
    listening,
    startListening,
    stopListening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition({
    lang: "",
  });

  const history = useHistoryStore((state: any) => state.history);
  const clearHistory = useHistoryStore((state: any) => state.clearHistory);

  const setRepeatHistories = useRepeatHistoryStore(
    (state: any) => state.setHistory
  );

  const setLesson = useCurrentLesson((state: any) => state.setCurrentLesson);

  console.log("TRANSCRTIPT", transcript);

  if (browserSupportsSpeechRecognition) {
    return (
      <div className="fixed flex top-12 items-center space-x-8 dark:text-slate-500 font-light">
        <button
          className="text-4xl dark:hover:text-slate-200 transition"
          onClick={() => {
            // onClear
            setLesson("");
            stopListening();
          }}
        >
          <CloseIcon />
        </button>
        {/* <button
          className={`text-3xl bg-white dark:bg-black p-2 w-16 h-16 ring-1 ${
            listening
              ? `ring-slate-900/5 dark:ring-slate-600`
              : 'ring-slate-900/5 dark:ring-slate-800'
          } shadow-lg rounded-full flex items-center justify-center dark:hover:ring-slate-600 transition`}
          onClick={listening ? stopListening : startListening}
        >
          {listening ? (
            <CheckIcon className='transition dark:text-white text-green-500' />
          ) : (
            <MicIcon className='transition' />
          )}
        </button> */}

        <button
          className={`text-3xl bg-white dark:bg-black p-2 w-16 h-16 ring-1 ${
            play
              ? `dark:text-white ring-slate-900/5 dark:ring-white`
              : "ring-slate-900/5 dark:ring-slate-600 dark:text-slate-600"
          } shadow-lg rounded-full flex items-center justify-center transition`}
          onClick={() => {
            if (!play) {
              setRepeatHistories({
                lessonId: lessonId,
                eventType: "speech/repeat",
                eventTime: new Date().getTime(),
                // startTime: earliestTime[0],
                // scriptIndex: idx
                // item
              });
            }
            togglePlay();
          }}
        >
          {play ? <PauseIcon /> : <PlayIcon className="ml-1" />}
        </button>
        <button className="text-4xl" onClick={handleSuggestion}>
          <ThoughtIcon />
        </button>

        {/* <button
          className={
            'text-4xl dark:text-slate-500 dark:hover:text-slate-400 hover:text-slate-900'
          }
          onClick={togglePlay}
        >
          {play ? <PauseIcon /> : <PlayIcon />}
        </button> */}

        {/* <p> {transcript}</p>

        <div className={'dark:text-white mt-4'}>
          {JSON.stringify(transcripts)}
        </div> */}

        {/* {transcripts.length ? (
          <div className={'dark:text-white mt-4'}>
            {JSON.stringify(transcripts)}
          </div>
        ) : null} */}

        {/* {true ? (
          <div className='my-8'>
            <div className='flex justify-center items-center space-x-4 mb-2'>
              <h1 className='text-center font-bold text-xl'>History</h1>
              <button onClick={clearHistory}>
                <CloseIcon />
              </button>
            </div>

            <div className={'dark:text-white flex flex-col text-xs space-y-2'}>
              {(history || []).map(item => {
                return (
                  <div className={'dark:text-white'}>
                    {JSON.stringify(item)}
                  </div>
                )
              })}
            </div>
          </div>
        ) : null} */}
      </div>
    );
  }
  return (
    <div className="grow ml-4 md:ml-16 flex flex-col items-center min-h-screen overflow-y-auto">
      <Header className="my-2 md:my-16 text-black dark:text-white text-3xl font-extrabold">
        xiǎo húlí
      </Header>
    </div>
  );
};
