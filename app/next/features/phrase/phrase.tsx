/* eslint-disable @next/next/no-img-element */
import "regenerator-runtime";

import { formatJournalDate } from "@/app/(auth)/diary/utils/format-journal-date";
import { Icons } from "@/components/ui/icons.v2";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAddTranslationHistoryMutation } from "./hooks/use-add-translation-history-mutation";
import { useListTranslationHistory } from "./hooks/use-list-translation-history";
import { usePhraseParams } from "./hooks/use-phrase-params";
import { languages } from "./languages";
import { NewPhrase } from "./new-phrase";
import { PhraseUI } from "./phrase-ui";

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

  const [newChat, setNewChat] = useState(false);

  const cancelNewChat = () => {
    setNewChat(false);
  };

  const { data: translationsHistory } = useListTranslationHistory();

  const addTranslationHistoryMutation = useAddTranslationHistoryMutation();

  const { contextId, view } = usePhraseParams();

  if (contextId) {
    return <PhraseUI />;
  }

  if (view === "settings") {
    return <PhraseSettings />;
  }

  if (newChat) {
    return <NewPhrase cancelNewChat={cancelNewChat} />;
  }
  return (
    <div>
      <div className="space-x-12 sm:space-x-24 flex justify-center items-center mt-32">
        <button
          className="flex flex-col items-center gap-4 hover:text-white text-gray-500"
          onClick={() => {
            // setView('new')
            setNewChat(true);
            // addTranslationHistoryMutation.mutateAsync().then((resp) => {
            //   router.push(`/next?feature-id=phrase&contextId=${resp?.id}`);
            // });
          }}
        >
          {" "}
          <Icons.commentQuote className="text-3xl lg:text-5xl" />
          <span className="">
            {addTranslationHistoryMutation?.isLoading
              ? "Starting..."
              : "New Chat"}
          </span>
        </button>
        <button
          className="flex flex-col items-center gap-4 hover:text-white text-gray-500"
          onClick={() => {}}
        >
          {" "}
          <Icons.verticalStack className="text-3xl lg:text-5xl" />
          <span className="">History</span>
        </button>
        <Link
          className="flex flex-col items-center gap-4 hover:text-white text-gray-500"
          href={`/next?feature-id=phrase&view=settings`}
        >
          {" "}
          <Icons.gear className="text-3xl lg:text-5xl" />
          <span className="">Settings</span>
        </Link>
      </div>

      <section className="my-32">
        <h2 className="text-center dark:text-gray-600 font-bold text-2xl">
          Recent History
        </h2>

        <section>
          <div className="mt-12 grid grid-cols-2 mb-32 sm:grid-cols-6 md:grid-cols-9 lg:grid-cols-10 gap-4 gap-y-4 lg:gap-8">
            {translationsHistory?.slice(0, 100)?.map((history: any) => {
              const sourceLangSrc = languages.find(
                (lang) => lang.id === history.sourceLang
              );
              const targetLangSrc = languages.find(
                (lang) => lang.id === history.targetLang
              );
              return (
                <Link
                  key={JSON.stringify(history?.id)}
                  href={`/next?feature-id=phrase&contextId=${history?.id}`}
                  className="block h-18 p-4 col-span-2 lg:col-span-2 shadow-2 shadow-sm dark:shadow-gray-800 shadow-gray-200 rounded-2xl"
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
                  <div className="mt-4 flex space-x-4">
                    <img
                      src={sourceLangSrc?.src}
                      alt={sourceLangSrc?.title}
                      className="h-6"
                    />
                    <img
                      src={targetLangSrc?.src}
                      alt={targetLangSrc?.title}
                      className="h-6"
                    />
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
