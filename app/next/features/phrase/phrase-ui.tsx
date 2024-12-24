/* eslint-disable @next/next/no-img-element */
import { useSpeak } from "@/app/(auth)/convos/_play/use-speak";
import { useGetTopTenIncorrect } from "@/app/(auth)/insights/insights-v2/precision-insight-view/use-get-top-ten-incorrect";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import "regenerator-runtime";

import { ScrollArea } from "@/components/ui/scroll-area";

import { Nothing } from "@/app/nmm/nothing";
import { Icons } from "@/components/ui/icons.v2";
import { siteConfig } from "@/lib/config";
import { cn } from "@/lib/utils";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { useJwtToken } from "../html-parser/hooks/use-jwt-token";

const useAddTranslationMutation = () => {
  const token = useJwtToken();

  return useMutation({
    mutationFn: async (props: {
      input: string;
      sourceLang: string;
      targetLang: string;
      contextId: string;
    }) => {
      const res = await fetch(`${siteConfig.apiUrlV2}/v1/add-translation`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(props),
      });

      return res.json();
    },
  });
};

function PhraseItem({
  message,
  idx,
  showPinyin,
}: {
  message: any;
  idx: any;
  showPinyin: boolean;
}) {
  const lang = message?.sourceLang === "en" ? "zh-CN" : "en";

  const { speak } = useSpeak(lang, {
    utterRate: 1,
  });
  return (
    <div
      key={message.id}
      className={cn(`flex`, idx % 2 === 0 ? "justify-start" : "justify-end")}
    >
      <div
        className={cn(
          `max-w-[70%] rounded-lg p-2`,
          message.sourceLang === "en"
            ? "dark:bg-[rgb(21,22,23)] bg-blue-500 text-white"
            : "dark:bg-[rgb(21,22,23)] bg-white",

          "rounded-2xl px-2 py-2"
        )}
      >
        <div className="flex space-x-4 items-center">
          <div>
            {showPinyin && (
              <p className="text-gray-400 font-extralight">{message?.pinyin}</p>
            )}
            <p className="text-2xl">
              {message?.output
                ?.replaceAll(/&quot;/g, '"')
                ?.replaceAll(/&#39;/g, "'")}
            </p>
            <p className="text-gray-500">{message.input}</p>
          </div>

          <div className="mt-2 flex justify-end">
            <button
              className={cn(
                "text-xl border-[1px] border-gray-700 dark:hover:border-gray-500 w-10 h-10 rounded-full"
              )}
              onClick={() => {
                speak(message?.output);
              }}
            >
              <Icons.volume />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

const listTranslationsQueryKey = "list-translations";
const useListTranslations = (contextId: string) => {
  const token = useJwtToken();
  return useQuery<any>({
    queryKey: [listTranslationsQueryKey, contextId],
    queryFn: async () => {
      const res = await fetch(`${siteConfig.apiUrlV2}/v1/list-translations`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ contextId }),
      });

      const resJson = (await res.json()) as any;

      return resJson?.sort((a: any, b: any) => a?.createdAt - b?.createdAt);
    },
  });
};

function getRandomNumber(n: number) {
  return Math.floor(Math.random() * (n + 1));
}

export const PhraseUI = () => {
  //   const { messages, input, handleInputChange, handleSubmit } = useChat();
  const [inputTranscript, setInputTranscript] = useState("");
  const [convoMode, setConvoMode] = useState("solo");
  const [showPinyin, setShowPinyin] = useState(false);
  const [sourceLang, setSourceLang] = useState("en");
  const [showMeta, setShowMeta] = useState(false);
  const topTenIncorrect = useGetTopTenIncorrect();
  const [index, setIndex] = useState(0);
  const [randomDataIndex, setRandomDataIndex] = useState(getRandomNumber(9));

  const searchParams = useSearchParams();
  const contextId = searchParams?.get("contextId") || "";

  const getInput = (input: string) => {
    return {
      input,
      contextId,
      sourceLang: sourceLang,
      targetLang: sourceLang === "en" ? "zh-CN" : "en",
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

  console.log(
    "HANZI",
    topTenIncorrect?.[randomDataIndex]?.hanzi || topTenIncorrect?.[0]?.hanzi
  );

  const queryClient = useQueryClient();

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Chat area */}
      <div className="relative flex-1 flex flex-col dark:bg-black">
        <div className="flex justify-between dark:border-gray-700 border-b p-4 items-center">
          <div className="dark:bg-[rgb(11,12,13)] w-full bg-white">
            <h2 className="font-light dark:text-gray-400">{contextId}</h2>
          </div>

          <Link href="/next?feature-id=phrase" className="text-3xl block">
            <Icons.xMark />{" "}
          </Link>
        </div>
        {/* Messages */}
        <ScrollArea className="flex-1 p-4 dark:bg-[rgb(11,12,13)] mb-24 bg-black rounded">
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

        <div className="absolute w-full bottom-0 dark:bg-[rgb(21,22,23)] p-2 rounded bg-white border-t dark:border-gray-700 flex">
          <div className="flex flex-col w-full items-start">
            <form
              onSubmit={() => {}}
              className="w-full dark:bg-[rgb(21,22,23)] bg-white dark:border-gray-700 flex"
            >
              <textarea
                onChange={(event) => {
                  setInputTranscript(event.target.value);
                }}
                value={inputTranscript || transcript}
                placeholder="Type a message..."
                className="flex-1 mr-2 px-2 py-4 dark:bg-[rgb(21,22,23)]"
              />
              {/* <Button type="submit">
                <SendHorizontal className="h-4 w-4" />
              </Button> */}
            </form>

            <div className="flex justify-between mt-4 w-full items-center">
              <div className="mt-2 w-full flex justify-start space-x-4 dark:text-gray-500">
                <button
                  className={
                    sourceLang === "zh-CN" ? "text-white" : "opacity-40"
                  }
                  onClick={() => {
                    setSourceLang("zh-CN");
                  }}
                >
                  <img
                    src="https://static.vecteezy.com/system/resources/previews/022/120/365/non_2x/china-flag-round-shape-free-png.png"
                    alt="Chinese flag"
                    className="h-6"
                  />
                </button>
                <button
                  className={sourceLang === "en" ? "text-white" : "opacity-40"}
                  onClick={() => {
                    setSourceLang("en");
                  }}
                >
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/United-kingdom_flag_icon_round.svg/2048px-United-kingdom_flag_icon_round.svg.png"
                    alt="Chinese flag"
                    className="h-6"
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

                      if (convoMode === "convo") {
                        if (sourceLang === "zh-CN") {
                          setSourceLang("en");
                        } else {
                          setSourceLang("zh-CN");
                        }
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
                    SpeechRecognition.stopListening();
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
