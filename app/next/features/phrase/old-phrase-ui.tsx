/* eslint-disable @next/next/no-img-element */
import { useSpeak } from "@/app/(auth)/convos/_play/use-speak";
import { useGetTopTenIncorrect } from "@/app/(auth)/insights/insights-v2/precision-insight-view/use-get-top-ten-incorrect";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import "regenerator-runtime";

import { Icons } from "@/components/ui/icons.v2";
import { siteConfig } from "@/lib/config";
import { cn } from "@/lib/utils";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { useState } from "react";
import { useJwtToken } from "../html-parser/hooks/use-jwt-token";
import { usePhraseParams } from "./hooks/use-phrase-params";

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

      return resJson?.sort((a: any, b: any) => b?.createdAt - a?.createdAt);
    },
  });
};

function getRandomNumber(n: number) {
  return Math.floor(Math.random() * (n + 1));
}

export const PhraseUI = () => {
  const [inputTranscript, setInputTranscript] = useState("");
  const [convoMode, setConvoMode] = useState("solo");
  const [showPinyin, setShowPinyin] = useState(false);
  const [sourceLang, setSourceLang] = useState("en");
  const [showMeta, setShowMeta] = useState(false);
  const topTenIncorrect = useGetTopTenIncorrect();
  const [index, setIndex] = useState(0);
  const [randomDataIndex, setRandomDataIndex] = useState(getRandomNumber(9));

  const { contextId } = usePhraseParams();

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

  const phrase = translations?.[index];

  const { speak } = useSpeak(sourceLang, {
    utterRate: 1,
  });

  const queryClient = useQueryClient();

  return (
    <div>
      <Link href="/next?feature-id=phrase" className="text-3xl mt-8 block">
        <Icons.xMark />{" "}
      </Link>

      <section className="flex justify-start flex-col w-full items-center mt-32">
        {showPinyin && (
          <p className="text-gray-500 text-2xl">{phrase?.pinyin}</p>
        )}

        <p className="text-2xl">{phrase?.input}</p>
        <p className="font-light text-gray-400 text-2xl">
          {phrase?.output?.replace(/&quot;/g, '"')}
        </p>
      </section>

      <section className="flex justify-start flex-col w-full items-center mt-32">
        <input
          onChange={(event) => {
            setInputTranscript(event.target.value);
          }}
          value={inputTranscript || transcript}
          className="text-2xl w-full bg-[rgb(9,10,11)]"
        />
      </section>

      <div className="text-gray-400 space-x-12 flex justify-center items-center mt-32">
        <button
          className={cn(
            "text-xl border-[1px] border-gray-700 hover:border-s-gray-500 rounded w-10 h-10"
          )}
          onClick={() => {
            speak(transcript);
          }}
        >
          <Icons.volume />
        </button>
        <button
          className={cn(
            "text-3xl border-[1px] rounded-full w-14 h-14",
            listening ? "text-red-500" : ""
          )}
          onClick={() => {
            if (listening) {
              SpeechRecognition.stopListening();

              const transcriptExists = inputTranscript || transcript;

              const params = getInput(transcriptExists);

              if (Boolean(transcriptExists)) {
                addTranslation.mutateAsync(params).then(() => {
                  setInputTranscript("");

                  queryClient.refetchQueries([
                    listTranslationsQueryKey,
                    contextId,
                  ] as any);
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
          {addTranslation?.isPending ? (
            <Icons.loadingSpinner spinPulse />
          ) : listening ? (
            <Icons.stop />
          ) : (
            <Icons.microphone />
          )}
        </button>
        <button
          className={cn(
            "text-xl border-[1px] border-gray-700 hover:border-s-gray-500 rounded w-10 h-10"
          )}
          onClick={() => {
            SpeechRecognition.stopListening();
            resetTranscript();
          }}
        >
          <Icons.refresh />
        </button>
      </div>

      <div className="space-x-12 flex justify-center items-center mt-32">
        <button
          className={cn(
            "text-xl text-gray-400 hover:dark:text-white hover:text-black  hover:border-s-gray-500 rounded w-10 h-10"
          )}
          onClick={() => {
            setIndex(Math.max(0, index - 1));
          }}
        >
          <Icons.arrowLeft />
        </button>

        <button
          className={cn(
            "text-xl text-gray-400 hover:dark:text-white hover:text-black  hover:border-s-gray-500 rounded w-10 h-10"
          )}
          onClick={() => {
            // setRandomDataIndex(getRandomNumber(9));
            // setIndex(0);
            resetTranscript();
          }}
        >
          <Icons.refresh />
        </button>

        <button
          className={cn(
            "text-xl text-gray-400 hover:dark:text-white hover:text-black  hover:border-s-gray-500 rounded w-10 h-10"
          )}
          onClick={() => {
            setIndex(Math.min(translations?.length - 1, index + 1));
          }}
        >
          <Icons.arrowRight />
        </button>
      </div>

      <div className="flex justify-center space-x-4 mt-8 dark:text-gray-500">
        <button
          className={sourceLang === "zh-CN" ? "text-white" : "opacity-40"}
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
      <div className="mb-32">
        <div className="flex justify-center space-x-4 mt-8 dark:text-gray-500">
          <button
            onClick={() => {
              setConvoMode((mode) => (mode === "solo" ? "convo" : "solo"));
            }}
          >
            {convoMode === "convo" ? "Solo Mode" : "Convo Mode"}
          </button>
          <button
            onClick={() => {
              setShowMeta(!showMeta);
            }}
          >
            {showMeta ? "Hide Meta" : "Show Meta"}
          </button>

          <button
            onClick={() => {
              setShowPinyin(!showPinyin);
            }}
          >
            {showPinyin ? "Hide Pinyin" : "Show Pinyin"}
          </button>
        </div>

        {showMeta && (
          <div className="max-w-2xl m-auto">
            {/* <div className="dark:text-gray-500 mt-16">
            <code>
              <pre>{JSON.stringify(props, null, 4)}</pre>
            </code>
          </div>

          <section className="dark:text-gray-500 mt-16">
            <code>
              <pre>{JSON.stringify(translations?.[0], null, 4)}</pre>
            </code>
          </section> */}
            <section className="dark:text-gray-500 mt-16">
              <code>
                <pre>{JSON.stringify(translations || [], null, 4)}</pre>
              </code>
            </section>
          </div>
        )}
      </div>
    </div>
  );
};
