/* eslint-disable @next/next/no-img-element */
import "regenerator-runtime";

import { formatJournalDate } from "@/app/(auth)/diary/utils/format-journal-date";
import { Icons } from "@/components/ui/icons.v2";
import { siteConfig } from "@/lib/config";
import { useMutation, useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useJwtToken } from "../html-parser/hooks/use-jwt-token";
import { PhraseUI } from "./phrase-ui";

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
    return <PhraseUI />;
  }

  if (view === "settings") {
    return <PhraseSettings />;
  }
  return (
    <div>
      <div className="space-x-12 sm:space-x-24 flex justify-center items-center mt-32">
        <button
          className="flex flex-col items-center gap-4 hover:text-white text-gray-500"
          onClick={() => {
            addTranslationHistoryMutation.mutateAsync().then((resp) => {
              router.push(`/next?feature-id=phrase&contextId=${resp?.id}`);
            });
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

                  {/* <div className="mt-8 flex justify-between w-full items-center">
                    <div className="flex items-center space-x-4">
                      <p className="text-gray-400 dark:text-gray-600 text-xs space-x-[2px]">
                        <span>
                          {history?.description || "No description..."}
                        </span>
                      </p>
                    </div>
                  </div> */}
                </Link>
              );
            })}
          </div>
        </section>
      </section>
    </div>
  );
};
