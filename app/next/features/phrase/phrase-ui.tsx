/* eslint-disable @next/next/no-img-element */
import { useGetTopTenIncorrect } from "@/app/(auth)/insights/insights-v2/precision-insight-view/use-get-top-ten-incorrect";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import "regenerator-runtime";

import { ScrollArea } from "@/components/ui/scroll-area";

import { Nothing } from "@/app/nmm/nothing";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/ui/icons.v2";
import { cn } from "@/lib/utils";
import { useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { useState } from "react";
import { useAddTranslationMutation } from "./hooks/use-add-translation-mutation";
import { useGetTranslationHistory } from "./hooks/use-get-translation-history";
import {
  listTranslationsQueryKey,
  useListTranslations,
} from "./hooks/use-list-translations";
import { usePhraseParams } from "./hooks/use-phrase-params";
import { languages } from "./languages";
import { PhraseItem } from "./phrase-item";
import { useFeatureContext } from "../feature-context-provider";

function getRandomNumber(n: number) {
  return Math.floor(Math.random() * (n + 1));
}

export const PhraseUI = () => {
  //   const { messages, input, handleInputChange, handleSubmit } = useChat();
  const [inputTranscript, setInputTranscript] = useState("");
  const [convoMode, setConvoMode] = useState("solo");
  const [showPinyin, setShowPinyin] = useState(false);
  const [sourceLang, setSourceLang] = useState("en");
  const topTenIncorrect = useGetTopTenIncorrect();
  const [randomDataIndex, setRandomDataIndex] = useState(getRandomNumber(9));

  const { contextId } = usePhraseParams();

  const { data: translationContext } = useGetTranslationHistory(contextId);

  const sourceLangLogo = languages.find(
    (lang) => lang.id === translationContext?.sourceLang
  );
  const targetLangLogo = languages.find(
    (lang) => lang.id === translationContext?.targetLang
  );

  const getInput = (input: string) => {
    return {
      input,
      contextId,
      sourceLang:
        sourceLang === translationContext?.sourceLang
          ? translationContext?.sourceLang
          : translationContext?.targetLang,
      targetLang:
        sourceLang === translationContext?.sourceLang
          ? translationContext?.targetLang
          : translationContext?.sourceLang,
    };
  };

  const addTranslation = useAddTranslationMutation();

  const { data: translations } = useListTranslations(contextId);

  const props = useSpeechRecognition({ transcribing: true });

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
    ...rest
  } = props;

  // const randomDataIndex = useMemo(() => getRandomNumber(9), []);

  const component = topTenIncorrect?.[randomDataIndex]?.hanzi;

  const { rootUrl } = useFeatureContext();

  const queryClient = useQueryClient();

  const handleSubmit = (event: any) => {
    event.preventDefault();
    SpeechRecognition.stopListening();

    const transcriptExists = inputTranscript || transcript;

    const params = getInput(transcriptExists);

    if (Boolean(transcriptExists)) {
      addTranslation.mutateAsync(params).then((resp) => {
        setInputTranscript("");
        resetTranscript();

        queryClient.refetchQueries([listTranslationsQueryKey, contextId]);
      });
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Chat area */}
      <div className="relative flex-1 flex flex-col dark:bg-[rgb(11,12,13)]">
        <div className="flex justify-between dark:border-gray-700 border-b px-4 py-0 items-center">
          <h2 className="dark:bg-[rgb(11,12,13)] text-xs font-light dark:text-gray-400 truncate">
            {contextId}
          </h2>

          <Link href={`${rootUrl}?feature-id=phrase`} className="text-xl block">
            <Icons.xMark />{" "}
          </Link>
        </div>
        {/* Messages */}
        <ScrollArea className="flex-1 p-4 dark:bg-[rgb(11,12,13)] pb-36 bg-black rounded w-full sm:max-w-3xl m-auto">
          {translations?.length === 0 ? (
            <Nothing icon={Icons.ai} message={"Say something..."} />
          ) : (
            <div className="space-y-4">
              {translations?.map((message: any, idx: any) => (
                <PhraseItem
                  key={JSON.stringify(message)}
                  message={message}
                  idx={idx}
                  showPinyin={showPinyin}
                />
              ))}
            </div>
          )}
        </ScrollArea>

        {/* Input area */}

        <div className="absolute w-full bottom-0  p-2 rounded bg-white  dark:bg-[rgb(9,10,11)] flex">
          <div className="flex flex-col w-full items-start sm:max-w-3xl m-auto dark:bg-[rgb(21,22,23)] border-t dark:border-gray-700">
            <form
              onSubmit={handleSubmit}
              className="w-full dark:bg-[rgb(21,22,23)] bg-white dark:border-gray-700 flex p-2 rounded-full"
            >
              <textarea
                onChange={(event) => {
                  setInputTranscript(event.target.value);
                }}
                autoFocus
                value={inputTranscript || transcript}
                placeholder="Type a message..."
                className="flex-1 py-0 dark:bg-[rgb(21,22,23)] border-transparent focus:border-transparent focus:ring-0 focus:outline-none resize-none"
              />
              <Button disabled={addTranslation.isLoading} type="submit">
                <Icons.paperPlane className="text-xl dark:text-gray-600 dark:hover:text-white text-gray-700" />
              </Button>
            </form>

            <div className="flex justify-between mt-4 w-full items-center p-2">
              <div className="mt-2 w-full flex justify-start space-x-4 dark:text-gray-500">
                <button
                  className={
                    sourceLang === sourceLangLogo?.id
                      ? "text-white"
                      : "opacity-40"
                  }
                  onClick={() => {
                    setSourceLang(sourceLangLogo?.id || "");
                  }}
                >
                  <img
                    src={sourceLangLogo?.src}
                    alt={sourceLangLogo?.title}
                    className="h-8"
                  />
                </button>
                <button
                  className={
                    sourceLang === targetLangLogo?.id
                      ? "text-white"
                      : "opacity-40"
                  }
                  onClick={() => {
                    setSourceLang(targetLangLogo?.id || "");
                  }}
                >
                  <img
                    src={targetLangLogo?.src}
                    alt={targetLangLogo?.title}
                    className="h-8"
                  />
                </button>
              </div>

              <div className="text-gray-400 space-x-4 flex justify-end items-center w-full">
                <button
                  className={cn(
                    "text-xl border-[1px] border-gray-700 dark:hover:border-gray-500 w-10 h-10 rounded-full",
                    showPinyin ? "dark:text-white text-black" : "text-gray-600"
                  )}
                  onClick={() => {
                    setShowPinyin((showPinyin) => !showPinyin);
                  }}
                >
                  <Icons.language />
                </button>
                <button
                  className={cn(
                    "text-xl border-[1px] dark:border-gray-700 dark:hover:border-gray-500 w-10 h-10 rounded-full",
                    listening ? "text-red-500" : ""
                  )}
                  disabled={addTranslation.isLoading}
                  onClick={() => {
                    if (listening) {
                      SpeechRecognition.stopListening();

                      const transcriptExists = inputTranscript || transcript;

                      const params = getInput(transcriptExists);

                      if (Boolean(transcriptExists)) {
                        addTranslation.mutateAsync(params).then((resp) => {
                          setInputTranscript("");
                          resetTranscript();

                          queryClient.refetchQueries([
                            listTranslationsQueryKey,
                            contextId,
                          ]);
                        });
                      }
                    } else {
                      resetTranscript();
                      SpeechRecognition.startListening?.({
                        language: sourceLang,
                        continuous: true,
                      });
                    }
                  }}
                >
                  {addTranslation?.isLoading ? (
                    <Icons.loadingSpinner spinPulse />
                  ) : listening ? (
                    <Icons.stop />
                  ) : (
                    <Icons.microphone />
                  )}
                </button>
                <button
                  className={cn(
                    "text-xl border-[1px] border-gray-700 hover:border-gray-500 rounded-full w-10 h-10"
                  )}
                  onClick={() => {
                    resetTranscript();
                  }}
                >
                  <Icons.refresh />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
