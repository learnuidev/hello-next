"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

import { useGetComponentId } from "@/app/nmm/[component-id]/use-get-component-id";
import { calculateColor } from "@/app/nmm/nmm-utils/calculate-color";
import { useIsSuperAdmin } from "@/domain/auth/auth.queries";
import { useDeleteSentenceMutation } from "@/domain/sentence/use-delete-sentence-mutation";
import { useReadModeStore } from "@/stores/use-readmode-store";
import { Icons } from "../ui/icons.v2";
import { useCanTrackFunction } from "../use-can-track-function";
import { AudioComponent } from "./audio-component";
import { GoogleLink } from "./selected-character/google-link";
import { useGetCharacterAnalytics } from "./use-get-character-analytics";
import { useBrightModeStore } from "../settings-dialog/use-bright-mode-store";

export const SentenceItem = (props: any) => {
  const { selectedComp, selectedChar, lang, currentPhrase } = props;

  const componentId = useGetComponentId();

  const searchParams = useSearchParams();

  const context = searchParams?.get("context");

  const unEncoded = currentPhrase?.hanzi || currentPhrase?.input;

  const isSuperAdmin = useIsSuperAdmin();

  const { trackFunction } = useCanTrackFunction(currentPhrase, {
    lang,
  });

  const router = useRouter();

  const deleteSentenceMutation = useDeleteSentenceMutation();

  const brightMode = useBrightModeStore((state: any) => state.mode);

  const characterAnalytics = useGetCharacterAnalytics({
    characterId: currentPhrase?.hanzi || currentPhrase?.input,
    lang: currentPhrase?.lang,
  });

  const Links = () => {
    const hanziOrInput = encodeURIComponent(unEncoded);
    return (
      <div className="flex justify-between items-center w-full mt-2">
        <div className="flex items-center space-x-2">
          {characterAnalytics?.precisionRate !== "0.0%" && (
            <p className="text-[16px] font-light flex space-x-2">
              <span>
                {" "}
                <Icons.bullsEyeArrowDT />
              </span>

              <span> {characterAnalytics?.precisionRate}</span>
            </p>
          )}
          <p className="text-[16px] font-light flex space-x-2">
            <span>
              {" "}
              <Icons.fireDuoTone />
            </span>

            <span> {characterAnalytics?.masteryRate}</span>
          </p>
        </div>
        <div className="flex gap-2 justify-end items-end w-full pr-2 mt-2 sm:mt-0">
          {/* {currentPhrase?.audio ? ( */}

          {/* ) : null} */}
          <AudioComponent currentPhrase={currentPhrase} />

          <Link
            onClick={trackFunction}
            // href={`/nmm/${encodeURIComponent(currentPhrase?.hanzi)}`}

            href={`/nmm/${hanziOrInput}${lang || selectedComp?.lang ? `?lang=${lang || selectedComp?.lang}` : ``}`}
            className={`text-sm bg-white dark:bg-black p-2 w-8 h-8 ring-1 ${`dark:text-white ring-slate-900/5 dark:ring-gray-800`} shadow-lg rounded-full flex items-center justify-center transition`}
          >
            <Icons.magnifyingGlass />
          </Link>

          <GoogleLink hanzi={unEncoded} className={"h-8 w-8"} />

          {isSuperAdmin && currentPhrase?.id && (
            <button
              disabled={
                deleteSentenceMutation?.isLoading ||
                deleteSentenceMutation.isSuccess
              }
              className={`text-sm bg-white dark:bg-black p-2 w-8 h-8 ring-1 ${`dark:text-white ring-slate-900/5 dark:ring-gray-800`} shadow-lg rounded-full flex items-center justify-center transition`}
              onDoubleClick={() => {
                deleteSentenceMutation?.mutateAsync({
                  id: currentPhrase?.id,
                  component: componentId,
                });
              }}
            >
              {deleteSentenceMutation?.isLoading ? (
                <Icons.spinner spinPulse />
              ) : (
                <Icons.trash />
              )}
            </button>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center justify-between py-4 w-full">
      <div role="button" className="flex flex-col w-full">
        {" "}
        <Link
          target="_blank"
          href={`https://chinese.yabla.com/chinese-english-pinyin-dictionary.php?define=${encodeURIComponent(
            currentPhrase?.hanzi
          )}`}
        >
          {brightMode && lang !== "en" && (
            <span className="text-[16px] text-gray-500 dark:text-gray-400">
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
                      ? `/nmm/${cleanedVal}?lang=${lang}&context=${currentPhrase?.hanzi || currentPhrase?.input}`
                      : `/nmm/${cleanedVal}&context=${currentPhrase?.hanzi || currentPhrase?.input}`
                  );
                }}
                className={`${
                  selectedChar?.toLowerCase() === val?.toLowerCase()
                    ? `${color} font-normal`
                    : "text-gray-700 dark:text-gray-300"
                }`}
              >
                {val}
                {currentPhrase?.input ? " " : ""}
              </span>
            );
          })}
        </span>
        {lang !== "en" && (
          <span className="text-[16px] dark:text-gray-500 text-gray-400">
            {currentPhrase?.en || currentPhrase?.title}
          </span>
        )}
      </div>

      <Links />
    </div>
  );
};
