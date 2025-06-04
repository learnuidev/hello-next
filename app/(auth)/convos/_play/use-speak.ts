"use client";

import { useEffect, useRef, useState } from "react";

const langVars = [
  ["en-US", "en"],
  ["it-IT", "it"],
  ["sv-SE", "sv"],
  // ["fr-CA", "fr"],
  ["ms-MY", "ms"],
  ["de-DE", "de"],
  ["en-GB", "en"],
  ["he-IL", "he"],
  ["en-AU", "en"],
  ["id-ID", "id"],
  ["fr-FR", "fr"],
  ["bg-BG", "bg"],
  ["es-ES", "es"],
  ["es-MX", "es"],
  ["fi-FI", "fi"],
  ["pt-BR", "pt"],
  ["nl-BE", "nl"],
  ["ja-JP", "ja"],
  ["ro-RO", "ro"],
  ["pt-PT", "pt"],
  ["th-TH", "th"],
  ["hr-HR", "hr"],
  ["sk-SK", "sk"],
  ["hi-IN", "hi"],
  ["uk-UA", "uk"],
  ["zh-CN", "zh"],
  ["vi-VN", "vi"],
  ["ar-001", "ar"],
  // ["zh-TW", "zh"],
  ["el-GR", "el"],
  ["ru-RU", "ru"],
  ["en-IE", "en"],
  ["ca-ES", "ca"],
  ["nb-NO", "nb"],
  ["en-IN", "en"],
  ["da-DK", "da"],
  // ["zh-HK", "zh"],
  ["en-ZA", "en"],
  ["hu-HU", "hu"],
  ["nl-NL", "nl"],
  ["tr-TR", "tr"],
  ["ko-KR", "ko"],
  ["pl-PL", "pl"],
  ["cs-CZ", "cs"],
  ["es-US", "es"],
];

function getLang(id = "zh") {
  return (
    langVars?.filter((lang) => lang[1] === id || lang[0] === id)?.[0]?.[0] ||
    "zh-CN"
  );
}

export const useSpeak = (
  defLang = "zh",
  opts = {
    utterRate: 0.6,
  }
) => {
  const lang = getLang(defLang);
  const synthRef = useRef(window.speechSynthesis);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [currentString, setCurrentString] = useState("");
  const [charStartIndex, setCharStartIndex] = useState(0);
  const [charEndIndex, setCharEndIndex] = useState(0);

  const [voicesList, setVoicesList] = useState<any>({});

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

    utter.rate = opts?.utterRate || 0.6;
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
