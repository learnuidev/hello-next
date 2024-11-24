"use client";

import { useEffect, useRef, useState } from "react";

export const useSpeak = (lang = "zh-CN") => {
  const synthRef = useRef(window.speechSynthesis);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [currentString, setCurrentString] = useState("");
  const [charStartIndex, setCharStartIndex] = useState(0);
  const [charEndIndex, setCharEndIndex] = useState(0);

  const [voicesList, setVoicesList] = useState<any>({});

  // console.log("VOICES LIST", voicesList);

  const selecectedVoice = voicesList?.[lang]?.filter(
    (voice: any) =>
      // this works for chrome
      voice?.name === "Li-Mu" ||
      // this is for safari
      voice?.name === "Tingting"
  )?.[0] as any;

  const resetState = () => {
    setIsSpeaking(false);
    setCurrentString("");
    setCharStartIndex(0);
    setCharEndIndex(0);
  };

  const speak = (word: string) => {
    stopSpeaking();
    const utter = new SpeechSynthesisUtterance(word);

    utter.onboundary = (event) => {
      if (event.charIndex >= 0) {
        setCharStartIndex(event.charIndex);
        setCharEndIndex(event.charIndex + event.charLength);
        // setCurrentWordIndex(event.charIndex);
      }
    };

    utter.onend = (event) => {
      resetState();
      console.log(
        `Utterance has finished being spoken after ${event.elapsedTime} seconds.`
      );
    };

    utter.rate = 0.6;
    utter.lang = lang;

    // utter.voice = selecectedVoice?.voice;
    // synthRef.current.speak(utter);
    setCurrentString(word);
    // if (!isSpeaking) {
    window?.speechSynthesis?.speak(utter);
    // }

    setIsSpeaking(true);
  };

  function stopSpeaking() {
    resetState();
    window.speechSynthesis.cancel();
  }

  useEffect(() => {
    setTimeout(() => {
      const voices = [...synthRef.current.getVoices()]
        .filter((x) => x.lang === lang)
        .map((item) => ({
          voice: item,
          name: item.name,
          lang: item.lang,
          voiceURI: item.voiceURI,
          localService: item.localService,
        }))
        .reduce((acc: any, curr) => {
          if (acc[curr.lang]) {
            return {
              ...acc,
              [curr.lang]: acc[curr.lang].concat(curr),
            };
          }

          return {
            ...acc,
            [curr.lang]: [curr],
          };
        }, {});

      setVoicesList(voices);
    }, 100);
  }, [synthRef]);

  return {
    isSpeaking,
    charStartIndex,
    charEndIndex,
    speak,
    currentString,
    stopSpeaking,
    voicesList,
  };
};
