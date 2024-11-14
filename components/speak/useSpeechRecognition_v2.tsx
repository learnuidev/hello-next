import React from "react";
import "regenerator-runtime";
// import "regenerator-runtime/runtime";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

// import "regenerator-runtime/runtime";

const Dictaphone = () => {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
    ...rest
  } = useSpeechRecognition({ transcribing: true });

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesnt support speech recognition.</span>;
  }

  return (
    <div>
      <p>Microphone: {listening ? "on" : "off"}</p>
      <button
        onClick={() => {
          SpeechRecognition.startListening?.({
            language: "zh-CN",
            continuous: true,
          });
        }}
      >
        Start
      </button>
      <button
        onClick={() => {
          SpeechRecognition.stopListening();
        }}
      >
        Stop
      </button>
      <button onClick={resetTranscript}>Reset</button>
      <p>{transcript}</p>

      <div>{JSON.stringify(rest)}</div>
    </div>
  );
};
export default Dictaphone;
