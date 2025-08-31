import { Icons } from "@/components/ui/icons.v2";

import { isNonRomanLang } from "@/components/_select-character/utils/is-non-roman-lang";
import { AnimatedLoadingText } from "@/components/animated-loading-text";
import { useSelectedItem } from "@/components/youtube-page/use-selected-item";
import { ContentTranscription } from "@/domain/content/content.api";
import { useListSentencesQuery } from "@/domain/sentence/sentence.queries";
import { useListDiscoveryQuery } from "@/domain/sentence/use-list-discovery-query";
import { useState } from "react";

export function MiniDictionary({
  lang,
  selected,
}: {
  lang: string;
  selected: string;
}) {
  const [seeMore, setSeeMore] = useState(false);
  const { data: sentences } = useListSentencesQuery({
    component: selected,
    lang,
  });

  const { setSelected } = useSelectedItem();

  const { data, isLoading: isMeaningDiscoveryLoading } = useListDiscoveryQuery({
    content: selected,
    lang,
  });

  const pinyinOrRoman = data?.pinyin || data?.roman;

  return (
    <div className="w-full sm:w-[600px] bg-gray-50 dark:bg-[rgb(13,14,15)] rounded p-4 sm:p-8 sm:mt-20 mt-0">
      <div className="flex justify-between items-center">
        <h4 className="text-2xl font-bold"> {selected} </h4>

        <button
          onClick={() => {
            setSelected(null);
          }}
        >
          <Icons.xMark className="text-2xl" />
        </button>
      </div>

      {isNonRomanLang(lang) && (
        <p>{pinyinOrRoman ? `${pinyinOrRoman}` : null} </p>
      )}

      {isMeaningDiscoveryLoading ? (
        <div className="my-4">
          <AnimatedLoadingText
            className="text-xl my-8"
            message="loading dictionary..."
          />
        </div>
      ) : (
        <>
          <p className="text-gray-600 dark:text-gray-400 font-light">
            {data?.en}
          </p>

          {seeMore ? (
            <p className="text-[16px] mt-4 dark:text-gray-300 text-gray-500">
              {data?.explanation ? `${data?.explanation}` : null}
            </p>
          ) : (
            <div>
              <p className="text-[16px] mt-4 dark:text-gray-300 text-gray-500">
                {data?.explanation
                  ? `${data?.explanation?.slice(0, 240)}...`
                  : null}
              </p>
            </div>
          )}
        </>
      )}

      {seeMore && (
        <div className="mt-8">
          <h4 className="font-bold mb-4 uppercase text-rose-400">
            Example Sentences
          </h4>
          <div className="space-y-4">
            {sentences?.slice(0, 3)?.map((sentence) => {
              return (
                <div key={sentence.id}>
                  {lang === "zh" && isNonRomanLang(lang) && (
                    <p className="text-gray-600 dark:text-gray-400">
                      {sentence?.pinyin || sentence?.roman}
                    </p>
                  )}
                  <p
                    className={
                      lang === "zh" ? "text-2xl" : "text-[16px] sm:text-xl"
                    }
                  >
                    {sentence?.hanzi || sentence?.input}
                  </p>
                  <p className="text-gray-500">{sentence?.en}</p>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <div className="mt-8 text-gray-500">
        {seeMore ? (
          <button
            onClick={() => {
              setSeeMore(false);
            }}
          >
            See Less
          </button>
        ) : (
          <button
            onClick={() => {
              setSeeMore(true);
            }}
          >
            See More
          </button>
        )}
      </div>
    </div>
  );
}
