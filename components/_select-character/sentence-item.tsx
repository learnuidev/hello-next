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
import { useSetIfExists } from "@/app/(auth)/convos/[content-id]/hooks/use-character-context-store";
import { CharacterItem } from "./character-item";

export const SentenceItem = (props: any) => {
  const { selectedComp, selectedChar, lang, currentPhrase } = props;

  const resolvedLang =
    currentPhrase?.lang || lang || selectedComp?.lang || currentPhrase?.lang;

  const componentId = useGetComponentId();

  const searchParams = useSearchParams();

  const context = searchParams?.get("context");

  const unEncoded = currentPhrase?.hanzi || currentPhrase?.input;

  const isSuperAdmin = useIsSuperAdmin();

  const { trackFunction } = useCanTrackFunction(currentPhrase, {
    lang: resolvedLang,
  });

  const setIfExists = useSetIfExists();

  const router = useRouter();

  const deleteSentenceMutation = useDeleteSentenceMutation();

  const brightMode = useBrightModeStore((state: any) => state.mode);

  const characterAnalytics = useGetCharacterAnalytics({
    characterId: currentPhrase?.hanzi || currentPhrase?.input,
    lang: resolvedLang,
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
          <AudioComponent
            currentPhrase={currentPhrase}
            className="h-6 w-6 text-xs"
          />

          <Link
            onClick={() => {
              setIfExists({ ...currentPhrase });
              trackFunction();
            }}
            href={`/nmm/${encodeURIComponent(currentPhrase?.hanzi || currentPhrase?.input)}${resolvedLang ? `?lang=${resolvedLang}` : ``}`}
            // href={`/nmm/${resolvedLang ? `?lang=${resolvedLang}` : ``}`}
            className={`text-xs bg-white dark:bg-black p-2 w-6 h-6 ring-1 ${`dark:text-white ring-slate-900/5 dark:ring-gray-800`} shadow-lg rounded-full flex items-center justify-center transition`}
          >
            <Icons.magnifyingGlass />
          </Link>

          <GoogleLink hanzi={unEncoded} className={"h-6 w-6 text-xs"} />

          {isSuperAdmin && currentPhrase?.id && (
            <button
              disabled={
                deleteSentenceMutation?.isLoading ||
                deleteSentenceMutation.isSuccess
              }
              className={`text-xs bg-white dark:bg-black p-2 w-6 h-6 ring-1 ${`dark:text-white ring-slate-900/5 dark:ring-gray-800`} shadow-lg rounded-full flex items-center justify-center transition`}
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
    <div className="flex flex-col items-center justify-between p-4 w-full bg-gray-50 dark:bg-[rgb(4,5,6)] my-2 rounded-2xl">
      <div role="button" className="flex flex-col w-full">
        {" "}
        <Link
          target="_blank"
          href={`https://chinese.yabla.com/chinese-english-pinyin-dictionary.php?define=${encodeURIComponent(
            currentPhrase?.hanzi
          )}`}
          onClick={() => {
            setIfExists({ ...currentPhrase });
          }}
        >
          {brightMode && lang !== "en" && (
            <span className="text-[16px] text-gray-600 dark:text-gray-400">
              {currentPhrase?.roman || currentPhrase?.pinyin}
            </span>
          )}
        </Link>
        <span>
          {(currentPhrase?.input || currentPhrase?.hanzi)
            ?.split("")
            ?.map((val: string, idy: number) => {
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

                    setIfExists({ ...currentPhrase });

                    router.push(
                      resolvedLang
                        ? `/nmm/${cleanedVal}?lang=${resolvedLang}&context=${currentPhrase?.hanzi || currentPhrase?.input}`
                        : `/nmm/${cleanedVal}&context=${currentPhrase?.hanzi || currentPhrase?.input}`
                    );
                  }}
                >
                  {/* {val} */}
                  <CharacterItem character={val} />
                  {/* {currentPhrase?.input ? " " : ""} */}
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
