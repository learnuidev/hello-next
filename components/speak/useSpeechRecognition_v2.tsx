import React from "react";
import "regenerator-runtime";
// import "regenerator-runtime/runtime";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

// import "regenerator-runtime/runtime";

const langMapper: any = {
  fr: "fr-FR",
  zh: "zh-CN",
};

export const useDictaphone = (lang: string) => {
  const langInput = langMapper[lang] || langMapper.zh;
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
    ...rest
  } = useSpeechRecognition({ transcribing: true });

  const startListening = () => {
    SpeechRecognition.startListening?.({
      language: langInput,
      continuous: true,
    });
  };

  const stopListening = () => {
    SpeechRecognition.stopListening();
  };

  return {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
    ...rest,
    startListening,
    stopListening,
  };
};

const Dictaphone = () => {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
    startListening,
    stopListening,
    ...rest
  } = useDictaphone("zh");

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesnt support speech recognition.</span>;
  }

  return (
    <div>
      <p>Microphone: {listening ? "on" : "off"}</p>
      <button onClick={startListening}>Start</button>
      <button onClick={stopListening}>Stop</button>
      <button onClick={resetTranscript}>Reset</button>
      <p>{transcript}</p>

      <div>{JSON.stringify(rest)}</div>
    </div>
  );
};
export default Dictaphone;
