import { Skeleton } from "@/components/ui/skeleton";
import { useListSentencesQuery } from "@/domain/sentence/sentence.queries";
import { BookmarkButton } from "./bookmark-button";
import { formatComponentName } from "./format-component-name";
import { useListMeaningsQuery } from "@/domain/sentence/meaning.queries";
import { useGetCurrentLang } from "@/hooks/use-get-current-lang";

interface IComp {
  hanzi: string;
  input?: string;
  level?: number;
  lang?: string;
  pinyin?: string;
  en: string;
}

export const PreviewComponent = (props: {
  character?: string;
  lang?: string;
  component: IComp;
}) => {
  const { component } = props;
  const { level, en, pinyin } = component;

  const lang = useGetCurrentLang();

  const hanzi = (component?.input || component?.hanzi || "").trim();

  const { data: meaning } = useListMeaningsQuery({
    sentenceId: props?.character || component?.input || "",
    content: props?.character || component?.input || "",
    lang: props?.lang || component?.lang || lang,
  });

  const { data: sentences, isLoading } = useListSentencesQuery({
    component: hanzi,
    lang: lang || "zh",
  });

  const stylePinyin = "font-extralight text-gray-400";

  const styleEn = "min-w-0 text-gray-500 font-extralight truncate text-[12px]";
  return (
    <div className="">
      <div className="flex w-full items-end justify-start my-2 space-x-8">
        <div className="w-full items-start justify-start flex-row">
          <div className="flex items-start justify-between w-full">
            <div>
              <h1 className="text-3xl font-light">
                {props?.character || hanzi}
              </h1>
              {lang === "zh" && (
                <h2 className={stylePinyin}>
                  {meaning?.details?.roman ||
                    meaning?.details?.pinyin ||
                    pinyin}
                </h2>
              )}

              {meaning?.details?.en && (
                <h3 className={styleEn}>
                  {meaning?.details?.en ||
                    formatComponentName(component, 2) ||
                    component?.en}
                </h3>
              )}
            </div>

            {meaning && <BookmarkButton {...meaning.details} />}
          </div>
        </div>

        <div>
          {level ? (
            <p className="text-xl font-extralight text-gray-600">{level}</p>
          ) : (
            <h2 className={stylePinyin}>{lang}</h2>
          )}
        </div>
      </div>

      {isLoading ? (
        <div className="space-y-4 mt-4">
          <Skeleton className="h-14 w-full bg-gray-300 dark:bg-gray-900" />
          <Skeleton className="h-14 w-full bg-gray-300 dark:bg-gray-900" />
        </div>
      ) : (
        <div className="p-0 space-y-4 mt-4">
          {sentences
            ?.slice(0, 2)
            ?.map(
              (sentence: {
                id: string;
                input?: string;
                hanzi: string;
                pinyin: string;
                en: string;
                explanation: string;
                createdAt: number;
                lang?: "zh" | "es" | "ml";
              }) => {
                return (
                  <section className="px-0 mx-0" key={sentence?.id}>
                    <h4 className="font-medium">
                      {sentence?.input || sentence?.hanzi}
                    </h4>
                    {component?.lang === "zh" && (
                      <p className={stylePinyin}>{sentence?.pinyin}</p>
                    )}
                    <p className={styleEn}>{sentence?.en}</p>
                    {/* <p className="text-gray-500 text-xs">{sentence?.explanation}</p> */}
                  </section>
                );
              }
            )}
        </div>
      )}
    </div>
  );
};
