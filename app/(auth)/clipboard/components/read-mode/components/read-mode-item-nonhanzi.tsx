import { useListDictionaryMeaningsQuery } from "@/app/next/features/html-parser/hooks/use-dictionary-list-meanings";
import { Skeleton } from "@/components/ui/skeleton";
import { useListComponents } from "@/domain/lesson/component.queries";
import { cn } from "@/lib/utils";
import { useClipboardFocus } from "../../../hooks/use-clipboard-focus";
import { useClipboardHskView } from "../../../hooks/use-clipboard-hsk-view";
import { useClipboardPinyinView } from "../../../hooks/use-clipboard-pinyin-view";
import { useClipboardTranslations } from "../../../hooks/use-clipboard-translations";
import { useClipboardWords } from "../../../hooks/use-clipboard-words";
import { useGetDictionaryQuery } from "../../../hooks/use-get-dictionary-query";
import { useTranslateTextMutation } from "../../../hooks/use-translated-text-mutation";
import { useClipboardFocused } from "../hooks/use-clipboard-focused";

function WordItem({
  word,
  lang,
  sentence,
  sentenceIndex,
}: {
  word: string;
  lang: string;
  sentence: string;
  sentenceIndex: number;
}) {
  const { focused, setFocused, focusedIndex } = useClipboardFocus();
  const { setWords } = useClipboardWords();
  const { hskView } = useClipboardHskView();

  const { pinyinView } = useClipboardPinyinView();
  const { focusedWord, setFocusedWord } = useClipboardFocused();
  const { translations, setTranslations } = useClipboardTranslations();

  const { data } = useGetDictionaryQuery(lang, word);

  return (
    <span
      className={cn(
        focusedWord === data && focusedIndex === sentenceIndex
          ? "dark:text-white text-black bg-yellow-200 dark:bg-red-500"
          : "dark:text-gray-300 text-gray-800",
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
      {" "}
      {word}
      {"   "}
    </span>
  );
}

export function ReadModeItemNonHanzi({
  text,
  lang,
  sentenceIndex,
}: {
  text: string;
  lang: string;
  sentenceIndex: number;
}) {
  const { focused, setFocused, focusedIndex, setFocusedIndex } =
    useClipboardFocus();
  const { setWords } = useClipboardWords();
  const { hskView } = useClipboardHskView();

  const { pinyinView } = useClipboardPinyinView();
  const { focusedWord, setFocusedWord } = useClipboardFocused();
  const { translations, setTranslations } = useClipboardTranslations();

  const { data: context, isLoading: isContextLoading } =
    useListDictionaryMeaningsQuery(text, lang, {
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
          setFocusedIndex(sentenceIndex);
          setFocused(text);
          if (!translateTextMutation?.isLoading) {
            translateTextMutation
              .mutateAsync({
                targetLang: "en",
                sourceLang: lang,
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
          setFocusedIndex(null);
        }}
      >
        {text.split(" ").map((item: string, idx: number) => {
          return (
            <WordItem
              sentenceIndex={sentenceIndex}
              sentence={text}
              key={`${JSON.stringify(item)}-${idx}-readmode-nonhanzi`}
              lang={lang}
              word={item}
            />
          );
        })}
      </p>
    </>
  );
}
