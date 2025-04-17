import { useSearchQueryStore } from "./search/state";
import { WordItem } from "./word-item";
import { useListFilteredWords } from "./use-list-filtered-words";
import { useMemo } from "react";

export const WordsList = ({ words, lang, showWords }: any) => {
  const query = useSearchQueryStore((state) => state.query2);

  const filteredWords = useMemo(
    () => words?.filter((word: any) => JSON.stringify(word)?.includes(query)),
    [query, words]
  );
  if (showWords) {
    return <WordsListRemote lang={lang} words={filteredWords} />;
  } else {
    return <WordsListLegacy lang={lang} />;
  }
};

const WordsListRemote = ({
  words,
  lang,
}: {
  lang: string;
  words: { input: string; hanzi: string }[];
}) => {
  return (
    <div className="mx-4 my-4 md:mx-16 text-black dark:text-white flex flex-wrap items-center justify-start">
      {words?.map((prop: any) => {
        return (
          <WordItem lang={lang} component={prop} key={JSON.stringify(prop)} />
        );
      })}
    </div>
  );
};

const WordsListLegacy = ({ lang }: { lang: string }) => {
  const query = useSearchQueryStore((state) => state.query);

  const { data } = useListFilteredWords({ lang, query });

  return (
    <div className="mx-4 my-4 md:mx-16 text-black dark:text-white flex flex-wrap items-center justify-start">
      {data?.map((prop: any) => {
        return (
          <WordItem lang={lang} component={prop} key={JSON.stringify(prop)} />
        );
      })}
    </div>
  );
};
