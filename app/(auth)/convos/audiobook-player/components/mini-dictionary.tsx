import { Icons } from "@/components/ui/icons.v2";

import { isNonRomanLang } from "@/components/_select-character/utils/is-non-roman-lang";
import { AnimatedLoadingText } from "@/components/animated-loading-text";
import { useSelectedItem } from "@/components/youtube-page/use-selected-item";
import { useListSentencesQuery } from "@/domain/sentence/sentence.queries";
import { useListDiscoveryQuery } from "@/domain/sentence/use-list-discovery-query";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { useContentSearchHistory } from "../hooks/use-content-search-history";
import { useDeleteHistoryMutation } from "@/domain/history/delete-history.mutation";
import { getNmmLink } from "@/libs/utils/get-nmm-link";
import Link from "next/link";

import { useListContentUnknownsQuery } from "@/domain/content-unknowns/use-list-content-unknowns.query";
import { useAddContentUnknownMutation } from "@/domain/content-unknowns/use-add-content-unknown.mutation";
import { useRemoveContentUnknownMutation } from "@/domain/content-unknowns/use-remove-content-unknown.mutation";
import { useCharacterMenuBarStore } from "../hooks/use-character-menu-bar";

export function MiniDictionary({
  lang,
  selected,
  className,
  contentId,
}: {
  selected: string;
  className?: string;
  contentId?: string;
  lang: string;
}) {
  const { searchHistory, addSearchHistory } = useContentSearchHistory({
    contentId: contentId || "",
  });

  const addContentUnknownMutation = useAddContentUnknownMutation();
  const removeContentUnknownMutation = useRemoveContentUnknownMutation();

  const { data: contentUnknowns } = useListContentUnknownsQuery(contentId);

  const containsUnknown = contentUnknowns?.items?.find(
    (item) => item.input === selected
  );

  const deleteHistoryMutation = useDeleteHistoryMutation();

  const [seeMore, setSeeMore] = useState(false);
  const { data: sentences, isLoading: isSentencesLoading } =
    useListSentencesQuery({
      component: selected,
      lang,
    });

  const { setSelected } = useSelectedItem();

  const { hideMenuBar } = useCharacterMenuBarStore();

  const { data, isLoading: isMeaningDiscoveryLoading } = useListDiscoveryQuery({
    content: selected,
    lang,
  });

  const currentSearchItem = searchHistory?.find(
    (item: any) => item?.input === selected
  );
  const currentIndex = searchHistory?.findIndex(
    (item: any) => item?.input === selected
  );

  const isFirstIndex = currentIndex === 0;
  const isLastIndex = currentIndex === searchHistory?.length - 1;

  const setPrevious = () => {
    if (searchHistory?.length === 1) {
      return;
    }
    const currentIndex = searchHistory?.findIndex(
      (item: any) => item?.input === selected
    );

    if (currentIndex === 0 || currentIndex === -1) {
      return;
    }

    const prevIndex = currentIndex - 1;

    const searchItem = searchHistory?.[prevIndex];

    if (searchItem?.input) {
      setSelected(searchItem?.input);
    }
  };

  const setNext = () => {
    if (searchHistory?.length === 1) {
      return;
    }
    const currentIndex = searchHistory?.findIndex(
      (item: any) => item?.input === selected
    );

    if (currentIndex === -1) {
      return;
    }

    const nextIndex = currentIndex + 1;

    const searchItem = searchHistory?.[nextIndex];

    if (searchItem?.input) {
      setSelected(searchItem?.input);
    }
  };

  const pinyinOrRoman = data?.pinyin || data?.roman;

  return (
    <div
      className={cn(
        " bg-gray-50 dark:bg-[rgb(13,14,15)] rounded p-4 sm:p-8",
        className || "w-full sm:max-w-[600px] mt-0 sticky top-0"
      )}
    >
      <div className="flex justify-between items-center">
        <div className="flex gap-4">
          <h4 className="text-2xl font-bold">
            <Link target="_blank" href={getNmmLink({ id: selected, lang })}>
              {selected}
            </Link>
          </h4>

          {containsUnknown ? (
            <button
              disabled={removeContentUnknownMutation.isPending}
              onClick={() => {
                removeContentUnknownMutation.mutateAsync({
                  id: containsUnknown.id,
                  contentId: contentId || "",
                });
              }}
            >
              {removeContentUnknownMutation.isPending ? (
                <Icons.loadingSpinner />
              ) : (
                <Icons.bookmarkSolid />
              )}
            </button>
          ) : (
            <button
              disabled={addContentUnknownMutation.isPending}
              onClick={() => {
                addContentUnknownMutation.mutateAsync({
                  input: selected,
                  contentId: contentId || "",
                });
              }}
            >
              {addContentUnknownMutation.isPending ? (
                <Icons.loadingSpinner />
              ) : (
                <Icons.bookmark />
              )}
            </button>
          )}
        </div>

        <button
          onClick={() => {
            setSelected(null);
            hideMenuBar();
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

          <div className="text-gray-50 dark:text-[rgb(13,14,15)] w-[400px]"></div>
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
                  ? `${data?.explanation?.slice(0, 140)}...`
                  : null}
              </p>
            </div>
          )}

          <div className="text-gray-50 dark:text-[rgb(13,14,15)] w-[400px]"></div>
        </>
      )}

      {seeMore && (
        <div className="mt-8">
          <h4 className="font-bold mb-4 uppercase text-rose-400">
            Example Sentences
          </h4>
          {isSentencesLoading ? (
            <div className="my-4">
              <AnimatedLoadingText
                className="text-xl my-8"
                message="loading sentences..."
              />
            </div>
          ) : (
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
          )}
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

      <div className="flex justify-between items-center">
        {searchHistory?.length > 1 && (
          <div className="mt-4 flex gap-4 text-lg">
            <button
              disabled={isFirstIndex}
              className={isFirstIndex ? "text-gray-500" : ""}
              onClick={() => {
                setPrevious();
              }}
            >
              <Icons.back />
            </button>
            <button
              disabled={isLastIndex}
              className={isLastIndex ? "text-gray-500" : ""}
              onClick={() => {
                setNext();
              }}
            >
              <Icons.front />
            </button>
          </div>
        )}

        {currentSearchItem && (
          <button
            className={cn(
              { "text-gray-500": isLastIndex },
              "hover:text-red-500"
            )}
            onDoubleClick={() => {
              deleteHistoryMutation.mutateAsync(currentSearchItem).then(() => {
                setPrevious();
              });
            }}
          >
            <Icons.trash />
          </button>
        )}
      </div>
    </div>
  );
}
