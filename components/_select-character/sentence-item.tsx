"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

import { calculateColor } from "@/app/nmm/nmm-utils/calculate-color";
import { useAddHistoryMutation } from "@/domain/history/history.mutations";
import { useIsContentTrackingEnabled } from "@/domain/user/use-is-content-tracking-enabled";
import { useListTrackableCharactersQuery } from "@/hooks/use-list-trackable-characters";
import { Icons } from "../ui/icons.v2";
import { AudioComponent } from "./audio-component";
import { GoogleLink } from "./selected-character/google-link";
import { useDeleteSentenceMutation } from "@/domain/sentence/use-delete-sentence-mutation";
import { useGetComponentId } from "@/app/nmm/[component-id]/use-get-component-id";

export const SentenceItem = (props: any) => {
  const { selectedComp, selectedChar, lang, currentPhrase } = props;

  const componentId = useGetComponentId();

  const addHistoryMutation = useAddHistoryMutation();
  const trackableCharacters = useListTrackableCharactersQuery();
  const isContentTrackingEnabled = useIsContentTrackingEnabled();

  const unEncoded = currentPhrase?.hanzi || currentPhrase?.input;

  const containsTrackableCharacters =
    trackableCharacters?.filter((item) => unEncoded?.includes(item?.hanzi)) ||
    [];

  const canTrack =
    isContentTrackingEnabled && containsTrackableCharacters?.length > 0;

  const router = useRouter();

  const searchParams = useSearchParams();

  const deleteSentenceMutation = useDeleteSentenceMutation();

  const contentLang = searchParams.get("content") || "";

  const Links = () => {
    const hanziOrInput = encodeURIComponent(unEncoded);
    return (
      <div className="flex space-x-4 items-center">
        {/* {currentPhrase?.audio ? ( */}

        <AudioComponent currentPhrase={currentPhrase} />
        {/* ) : null} */}

        <Link
          onClick={() => {
            if (canTrack) {
              addHistoryMutation.mutate({
                lang: lang,
                // characterId,
                hanzi: unEncoded,
                trackingCharacters: containsTrackableCharacters?.map(
                  (item) => item?.hanzi
                ),
                eventType: "CONTENT_VIEWED",
              } as any);
            }
          }}
          // href={`/nmm/${encodeURIComponent(currentPhrase?.hanzi)}`}

          href={`/nmm/${hanziOrInput}${lang || selectedComp?.lang ? `?lang=${lang || selectedComp?.lang}` : ``}`}
          className={`text-sm bg-white dark:bg-black p-2 w-8 h-8 ring-1 ${`dark:text-white ring-slate-900/5 dark:ring-gray-800`} shadow-lg rounded-full flex items-center justify-center transition`}
        >
          <Icons.magnifyingGlass />
        </Link>

        <GoogleLink hanzi={unEncoded} className={"h-8 w-8"} />

        <button
          className={`text-sm bg-white dark:bg-black p-2 w-8 h-8 ring-1 ${`dark:text-white ring-slate-900/5 dark:ring-gray-800`} shadow-lg rounded-full flex items-center justify-center transition`}
          onClick={() => {
            deleteSentenceMutation?.mutateAsync({
              id: currentPhrase?.id,
              component: componentId,
            });
          }}
        >
          <Icons.trash />
        </button>
      </div>
    );
  };

  return (
    <div className="flex  flex-row justify-between space-x-4 py-4 items-center w-full">
      <div role="button" className="flex flex-col">
        {" "}
        <Link
          target="_blank"
          href={`https://chinese.yabla.com/chinese-english-pinyin-dictionary.php?define=${encodeURIComponent(
            currentPhrase?.hanzi
          )}`}
        >
          {lang !== "en" && (
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {currentPhrase?.pinyin || currentPhrase?.roman}
            </span>
          )}
        </Link>
        <span className="text-gray-500 dark:text-gray-300 text-lg">
          {(currentPhrase?.input
            ? currentPhrase?.input.split(" ")
            : currentPhrase?.hanzi?.split("")
          )?.map((val: string, idy: number) => {
            const color = calculateColor({
              tone: selectedComp?.tone_level,
            });

            return (
              <span
                key={`${val}-${idy}`}
                onClick={() => {
                  const cleanedVal = val
                    .replaceAll("!", "")
                    ?.replaceAll(".", "")
                    ?.replaceAll(",", "");
                  // addHistoryMutation.mutate({
                  //   hanzi: cleanedVal,
                  //   lang: lang,
                  //   pathName: routeName,
                  //   contentId: selectedComp?.id || "",
                  //   eventType: "CONTENT_VIEWED",
                  // } as any);

                  router.push(
                    lang
                      ? `/nmm/${cleanedVal}?lang=${lang}`
                      : `/nmm/${cleanedVal}`
                  );
                }}
                className={`${
                  selectedChar?.toLowerCase() === val?.toLowerCase()
                    ? `${color} font-normal`
                    : "text-gray-300 dark:text-gray-300"
                }`}
              >
                {val}
                {currentPhrase?.input ? " " : ""}
              </span>
            );
          })}
        </span>
        {lang !== "en" && (
          <span className="text-[16px] text-gray-500">
            {currentPhrase?.en || currentPhrase?.title}
          </span>
        )}
        {!currentPhrase?.hanzi && false && (
          <span className="text-xs text-gray-600">
            {currentPhrase?.explanation}
          </span>
        )}
      </div>

      <Links />
    </div>
  );
};
