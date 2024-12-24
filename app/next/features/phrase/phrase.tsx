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
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useJwtToken } from "../html-parser/hooks/use-jwt-token";
import { formatJournalDate } from "@/app/(auth)/diary/utils/format-journal-date";

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

const useAddTranslationHistoryMutation = () => {
  const token = useJwtToken();

  return useMutation({
    mutationFn: async () => {
      const res = await fetch(
        `${siteConfig.apiUrlV2}/v1/add-translation-history`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

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

const listTranslationHistoryQueryKey = "list-translation-history";
const useListTranslationHistory = () => {
  const token = useJwtToken();
  return useQuery<any>({
    queryKey: [listTranslationHistoryQueryKey],
    queryFn: async () => {
      const res = await fetch(
        `${siteConfig.apiUrlV2}/v1/list-translation-history`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const resJson = await res.json();

      return resJson?.sort((a: any, b: any) => b?.createdAt - a?.createdAt);
    },
  });
};

function getRandomNumber(n: number) {
  return Math.floor(Math.random() * (n + 1));
}

export const _Shuo = () => {
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
        <p className="font-light text-gray-400 text-2xl">{phrase?.output}</p>
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

function PhraseSettings() {
  return (
    <div>
      <div className="my-8 flex justify-between items-center">
        <Link href="/next?feature-id=phrase" className="text-3xl">
          <Icons.xMark />{" "}
        </Link>

        <h1> Settings</h1>

        <div></div>
      </div>
    </div>
  );
}

export const Phrase = () => {
  const router = useRouter();

  const { data: translationsHistory } = useListTranslationHistory();

  const addTranslationHistoryMutation = useAddTranslationHistoryMutation();

  const searchParams = useSearchParams();
  const contextId = searchParams?.get("contextId");
  const view = searchParams?.get("view");

  if (contextId) {
    return <_Shuo />;
  }

  if (view === "settings") {
    return <PhraseSettings />;
  }
  return (
    <div>
      <div className="space-x-24 flex justify-center items-center mt-32">
        <button
          className="flex flex-col items-center gap-4 hover:text-white text-gray-500"
          onClick={() => {
            addTranslationHistoryMutation.mutateAsync().then((resp) => {
              router.push(`/next?feature-id=phrase&contextId=${resp?.id}`);
            });
          }}
        >
          {" "}
          <Icons.commentQuote className="text-5xl" />
          <span className="">
            {addTranslationHistoryMutation?.isLoading
              ? "Starting..."
              : "New Session"}
          </span>
        </button>
        <button
          className="flex flex-col items-center gap-4 hover:text-white text-gray-500"
          onClick={() => {}}
        >
          {" "}
          <Icons.verticalStack className="text-5xl" />
          <span className="">History</span>
        </button>
        <Link
          className="flex flex-col items-center gap-4 hover:text-white text-gray-500"
          href={`/next?feature-id=phrase&view=settings`}
        >
          {" "}
          <Icons.robot className="text-5xl" />
          <span className="">Settings</span>
        </Link>
      </div>

      <section className="my-32">
        <h2 className="text-center dark:text-gray-600 font-bold text-2xl">
          Recent History
        </h2>

        <section>
          <div className="mt-12 grid grid-cols-4 mb-32 sm:grid-cols-6 md:grid-cols-9 lg:grid-cols-10 gap-4 gap-y-4 lg:gap-8">
            {translationsHistory?.slice(0, 100)?.map((history: any) => {
              return (
                <Link
                  key={JSON.stringify(history?.id)}
                  href={`/next?feature-id=phrase&contextId=${history?.id}`}
                  className="block h-36 p-4 col-span-2 lg:col-span-2 shadow-2 shadow-sm dark:shadow-gray-800 shadow-gray-200 rounded-2xl"
                >
                  <Link
                    href={`/next?feature-id=phrase&contextId=${history?.id}`}
                    className="flex justify-between items-center"
                  >
                    <div>
                      <p className="truncate text-sm">
                        {" "}
                        <span>{history?.data?.title}</span>
                      </p>
                      <p className="mt-2 font-light text-gray-400 text-sm truncate capitalize">
                        {" "}
                        <span>{formatJournalDate(history?.createdAt)}</span>
                      </p>
                    </div>
                  </Link>

                  <p className="font-extralight text-sm dark:text-gray-500">
                    <span>{history?.title || "No title..."}</span>
                  </p>

                  <div className="mt-8 flex justify-between w-full items-center">
                    <div className="flex items-center space-x-4">
                      <p className="text-gray-400 dark:text-gray-600 text-xs space-x-[2px]">
                        <span>
                          {history?.description || "No description..."}
                        </span>
                      </p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      </section>
    </div>
  );
};
