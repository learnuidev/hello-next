import { useListDictionaryMeaningsQuery } from "@/app/next/features/html-parser/hooks/use-dictionary-list-meanings";
import { Skeleton } from "@/components/ui/skeleton";
import { useListComponents } from "@/domain/lesson/component.queries";
import { useClipboardFocus } from "../../../hooks/use-clipboard-focus";
import { useClipboardHskView } from "../../../hooks/use-clipboard-hsk-view";
import { useClipboardPinyinView } from "../../../hooks/use-clipboard-pinyin-view";
import { useClipboardTranslations } from "../../../hooks/use-clipboard-translations";
import { useClipboardWords } from "../../../hooks/use-clipboard-words";
import { useTranslateTextMutation } from "../../../hooks/use-translated-text-mutation";
import { useClipboardFocused } from "../hooks/use-clipboard-focused";
import { useGetCurrentLang } from "@/hooks/use-get-current-lang";
import { useGetDictionaryQuery } from "../../../hooks/use-get-dictionary-query";
import { cn } from "@/lib/utils";

function WordItem({ word }: { word: string }) {
  const { focused, setFocused } = useClipboardFocus();
  const { setWords } = useClipboardWords();
  const { hskView } = useClipboardHskView();

  const lang = useGetCurrentLang();

  const { pinyinView } = useClipboardPinyinView();
  const { focusedWord, setFocusedWord } = useClipboardFocused();
  const { translations, setTranslations } = useClipboardTranslations();

  const { data } = useGetDictionaryQuery(lang, word);

  console.log("data", data);
  return (
    <span
      className={cn(
        focusedWord === data
          ? "dark:text-white text-black"
          : "dark:text-gray-300 text-gray-400",
        "transition"
      )}
      onClick={() => {
        setFocusedWord((prevContextItem: any) =>
          prevContextItem?.id !== data?.id ? null : data
        );
      }}
      onMouseEnter={() => {
        setFocusedWord(data);
      }}
      onMouseLeave={() => {
        setFocusedWord(null);
      }}
    >
      {word}{" "}
    </span>
  );
}

export function ReadModeItemNonHanzi({ text }: any) {
  const { focused, setFocused } = useClipboardFocus();
  const { setWords } = useClipboardWords();
  const { hskView } = useClipboardHskView();

  const { pinyinView } = useClipboardPinyinView();
  const { focusedWord, setFocusedWord } = useClipboardFocused();
  const { translations, setTranslations } = useClipboardTranslations();

  const { data: context, isLoading: isContextLoading } =
    useListDictionaryMeaningsQuery(text, {
      onSuccess: (data: any) => {
        setWords((prev: any) => {
          return {
            ...prev,
            [text]: data,
          };
        });
      },
    });

  const { data: components, isLoading: isComponentsLoading } =
    useListComponents({ includeAll: true });

  const translateTextMutation = useTranslateTextMutation();

  if (isContextLoading) {
    return (
      <p>
        <Skeleton className={"h-12 dark:bg-gray-700 bg-gray-300 rounded-xl"} />
      </p>
    );
  }

  console.log("context", context);

  return (
    <>
      <p
        className={
          focused
            ? focused === text
              ? "dark:text-white text-black"
              : "text-gray-800"
            : ""
        }
        onMouseEnter={() => {
          setFocused(text);
          if (!translations?.[text] && !translateTextMutation?.isLoading) {
            translateTextMutation
              .mutateAsync({
                targetLang: "en",
                sourceLang: "zh-CN",
                input: text,
              })
              .then((resp) => {
                setTranslations((prev: any) => {
                  return {
                    ...prev,
                    [text]: resp,
                  };
                });
              });
          }
        }}
        onMouseLeave={() => {
          setFocused(null);
        }}
      >
        {text.split(" ").map((item: string, idx: number) => {
          return (
            <WordItem
              key={`${JSON.stringify(item)}-${idx}-readmode-nonhanzi`}
              word={item}
            />
          );
        })}
      </p>
    </>
  );
}
