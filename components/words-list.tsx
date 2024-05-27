import { useSearchQueryStore } from "./search/state";
import { WordItem } from "./word-item";
import { useListFilteredWords } from "./use-list-filtered-words";

export const WordsList = ({ words, lang, showWords }: any) => {
  if (showWords) {
    return <WordsListRemote lang={lang} words={words} />;
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
  const query = useSearchQueryStore((state) => state.query);

  const dataToShow = words?.filter((item: any) => {
    if (!query) {
      return true;
    }

    const containsNativeText = (item?.input || item?.hanzi)?.includes(
      query?.toLowerCase()
    );
    const containsEnText = item?.en?.includes(query?.toLowerCase());
    const containsRomanText = item?.roman?.includes(query?.toLowerCase());
    return containsNativeText || containsEnText || containsRomanText;
  });

  return (
    <div className="mx-4 my-4 md:mx-16 text-black dark:text-white flex flex-wrap items-center justify-start">
      {dataToShow?.map((prop: any) => {
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
