import { useSearchQueryStore } from "./search/state";
import { WordItem } from "./word-item";

export const WordsList = ({ words, lang }: any) => {
  const query = useSearchQueryStore((state) => state.query);
  return (
    <div className="mx-4 my-4 md:mx-16 text-black dark:text-white flex flex-wrap items-center justify-start">
      {words
        ?.filter((prop: any) => {
          if (!query) {
            return true;
          }

          return prop?.en?.toLowerCase()?.includes(query?.toLowerCase());
        })
        ?.sort((a: any, b: any) => a?.input?.length - b?.input?.length)
        .map((prop: any) => {
          return (
            <WordItem lang={lang} component={prop} key={JSON.stringify(prop)} />
          );
        })}
    </div>
  );
};
