"use client";

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/pro-thin-svg-icons";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { AudioComponent } from "./audio-component";
import { calculateColor } from "@/app/nmm/nmm-utils/calculate-color";
import { Icons } from "../ui/icons.v2";
import { GoogleLink } from "./selected-character/google-link";

export const SentenceItem = (props: any) => {
  const {
    components,
    selectedComp,
    selectedChar,
    routeName,
    lang,
    readMode,
    discoverMutation,
    addHistoryMutation,
    currentPhrase,
  } = props;

  const router = useRouter();

  const searchParams = useSearchParams();

  const contentLang = searchParams.get("content") || "";

  const Links = () => {
    const unEncoded = currentPhrase?.hanzi || currentPhrase?.input;
    const hanziOrInput = encodeURIComponent(unEncoded);
    return (
      <div className="flex space-x-4 items-center">
        {/* {currentPhrase?.audio ? ( */}
        <AudioComponent currentPhrase={currentPhrase} />
        {/* ) : null} */}

        <GoogleLink hanzi={unEncoded} className={"h-8 w-8"} />

        <Link
          onClick={() => {
            // addHistoryMutation.mutate({
            //   lang: lang,
            //   pathName: routeName,
            //   hanzi: currentPhrase?.hanzi,
            //   contentId: selectedComp?.id || "",
            //   componentId: selectedComp?.id || "",
            //   eventType: "CONTENT_VIEWED",
            // } as any);
          }}
          // href={`/nmm/${encodeURIComponent(currentPhrase?.hanzi)}`}

          href={`/nmm/${hanziOrInput}${lang || selectedComp?.lang ? `?lang=${lang || selectedComp?.lang}` : ``}`}
          className={`text-sm bg-white dark:bg-black p-2 w-8 h-8 ring-1 ${`dark:text-white ring-slate-900/5 dark:ring-gray-800`} shadow-lg rounded-full flex items-center justify-center transition`}
        >
          <Icons.magnifyingGlass />
        </Link>
      </div>
    );
  };

  if (readMode) {
    const currentPhrasePinyin = currentPhrase?.hanzi
      ?.split("")
      ?.filter((item: any) => {
        return components?.find((component: any) => component?.hanzi === item);
      })
      .map((item: any) => {
        const currComp = components?.find(
          (component: any) => component?.hanzi === item
        );
        return {
          hanzi: currComp?.hanzi,
          pinyin: currComp?.pinyin || "??",
          unknown: true,
        };
      });

    // return "TODO";

    return (
      <div className="flex justify-between w-full">
        {lang !== "en" && currentPhrase?.input && (
          <p className="text-sm text-gray-400">{currentPhrase?.input}</p>
        )}
        <div
          role="button"
          className="pb-8 flex flex-col"
          // key={`${idx}-${char?.hanzi}-${idx}-${Math.random()}`}
        >
          <div className="flex flex-row flex-wrap space-x-[1px]">
            {currentPhrase?.hanzi
              ?.split("")
              ?.map((val: string, idy: number) => {
                const color = calculateColor({
                  tone: selectedComp?.tone_level,
                });

                const hanz = currentPhrasePinyin?.find(
                  (x: any) => x?.hanzi === val
                );

                return (
                  <div
                    key={`${val}-${idy}`}
                    className={`flex flex-wrap items-center flex-col ${
                      selectedChar === val
                        ? color
                        : "text-gray-400 dark:text-gray-300"
                    }`}
                  >
                    <button
                      onClick={() => {
                        alert("Yoo 1");
                        router.push(
                          lang ? `/nmm/${val}?lang=${lang}` : `/nmm/${val}`
                        );

                        if (hanz?.pinyin === "??") {
                          return discoverMutation.mutateAsync({
                            lang: lang || selectedComp?.lang,
                            hanzi: hanz?.hanzi,
                          });
                        }
                      }}
                      className={`text-sm ${
                        selectedChar === val
                          ? color
                          : "text-gray-500 dark:text-gray-400 "
                      }`}
                    >
                      {hanz?.pinyin?.toLocaleLowerCase() || hanz?.roman}
                    </button>

                    <button
                      onClick={() => {
                        // alert("yoo 2");

                        // addHistoryMutation.mutate({
                        //   lang: lang,
                        //   pathName: routeName,
                        //   hanzi: val,
                        //   contentId: selectedComp?.id || "",
                        //   eventType: "CONTENT_VIEWED",
                        // } as any);

                        router.push(
                          lang ? `/nmm/${val}?lang=${lang}` : `/nmm/${val}`
                        );

                        if (hanz?.pinyin === "??") {
                          return discoverMutation.mutateAsync({
                            hanzi: hanz?.hanzi,
                          });
                        }
                      }}
                    >
                      {hanz?.hanzi}
                    </button>
                  </div>
                );
              })}
          </div>

          <span className="text-sm text-gray-500">
            {currentPhrase?.en || currentPhrase?.title}
          </span>
        </div>

        {lang !== "en" && currentPhrase?.input && (
          <p className="text-sm text-gray-400">{currentPhrase?.input}</p>
        )}

        <Links />
      </div>
    );
  }

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
