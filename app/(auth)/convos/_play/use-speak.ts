"use client";

import { useEffect, useRef, useState } from "react";

export const useSpeak = () => {
  const synthRef = useRef(window.speechSynthesis);

  const [voicesList, setVoicesList] = useState<any>({});

  // console.log("VOICES LIST", voicesList);

  const selecectedVoice = voicesList?.["zh-CN"]?.filter(
    (voice: any) =>
      // this works for chrome
      voice?.name === "Li-Mu" ||
      // this is for safari
      voice?.name === "Tingting"
  )?.[0] as any;

  const speak = (word: string) => {
    const utter = new SpeechSynthesisUtterance(word);

    // utter.rate = 0.6;
    utter.lang = "zh-CN";

    // utter.voice = selecectedVoice?.voice;
    // synthRef.current.speak(utter);
    window?.speechSynthesis?.speak(utter);
  };

  useEffect(() => {
    setTimeout(() => {
      const voices = [...synthRef.current.getVoices()]
        .filter((x) => x.lang === "zh-CN")
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
    speak,
  };
};
