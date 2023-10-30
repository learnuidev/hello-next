"use client";
import { useCallback, useEffect, useRef, useState } from "react";

import { useHistoryStore } from "./use-history";

let recognition: any = null;
if ("webkitSpeechRecognition" in window) {
  // @ts-ignore
  recognition = new webkitSpeechRecognition() as any;
  recognition.continuous = true;
  recognition.lang = "zh-ZH";
}

import { persist, createJSONStorage } from "zustand/middleware";
import { create } from "zustand";

const useTranscriptStore = create((set: any, get: any) => ({
  transcripts: [],
  setTranscripts: (transcripts: any) =>
    set({ transcripts: transcripts(get().transcripts) }),
  transcript: "",
  setTranscript: (transcript: any) => set({ transcript }),
}));

export const useSpeechRecognition = ({
  lang,
  onTranslated,
}: {
  lang?: string;
  onTranslated?: any;
}) => {
  // const recognition = new webkitSpeechRecognition()

  // console.log

  const transcripts = useTranscriptStore((state: any) => state.transcripts);
  const setTranscripts = useTranscriptStore(
    (state: any) => state.setTranscripts
  );
  const transcript = useTranscriptStore((state: any) => state.transcript);
  const setText = useTranscriptStore((state: any) => state.setTranscript);

  // recognition.continuous = true
  // recognition.lang = lang || 'en-US'

  // const [transcripts, setTranscripts] = useState<any>([])
  // const [transcript, setText] = useState('')
  const [isListening, setIsListening] = useState(false);

  const history = useHistoryStore((state: any) => state.history);
  const setHistory = useHistoryStore((state: any) => state.setHistory);

  // useEffect(() => {
  //   if ('webkitSpeechRecognition' in window) {
  //     recognition = new webkitSpeechRecognition()
  //     recognition.continuous = true
  //     recognition.lang = lang || 'zh-ZH'
  //   }
  // }, [window])

  useEffect(() => {
    if (!recognition) return;
    recognition.onresult = (event: any) => {
      console.log("onresult event: ", event);

      setText(
        [...(event?.results as any)]
          .map((result) => ({
            transcript: result?.[0].transcript,
            confidence: result?.[0].confidence,
          }))
          ?.map((result: any) => {
            return result.transcript;
          })
          ?.join(" ")
      );

      const transcriptsResults = [...(event?.results as any)].map((result) => ({
        transcript: result?.[0].transcript,
        confidence: result?.[0].confidence,
      }));
      setTranscripts(() => transcriptsResults);

      onTranslated && onTranslated(transcriptsResults);

      setHistory({
        time: new Date().getTime(),
        transcripts: transcriptsResults,
      });

      console.log("EVENT", event);
      // recognition.stop()
      // setIsListening(false)
    };
  }, [onTranslated]);

  const startListening = () => {
    setText("");
    setIsListening(true);
    recognition.start();
  };
  const stopListening = () => {
    setIsListening(false);
    recognition.stop();
  };

  return {
    transcript,
    transcripts,
    startListening,
    stopListening,
    resetTranscript: () => {
      setText("");
    },
    listening: isListening,
    browserSupportsSpeechRecognition: !!recognition,
  };
};
