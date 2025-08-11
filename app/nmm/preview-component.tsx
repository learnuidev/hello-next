import { Skeleton } from "@/components/ui/skeleton";
import { useListSentencesQuery } from "@/domain/sentence/sentence.queries";
import { BookmarkButton } from "./bookmark-button";
import { formatComponentName } from "./format-component-name";
import { useListMeaningsQuery } from "@/domain/sentence/meaning.queries";
import { useGetCurrentLang } from "@/hooks/use-get-current-lang";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useListDiscoveryQuery } from "@/domain/sentence/use-list-discovery-query";

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

  const { data: meaning } = useListDiscoveryQuery({
    content: props?.character || component?.input || "",
    lang: props?.lang || component?.lang || lang,
  });

  const { data: sentences, isLoading } = useListSentencesQuery({
    component: hanzi,
    lang: lang || "zh",
  });

  const stylePinyin = "font-light text-gray-400 text-[16px]";

  const styleEn = "min-w-0 text-gray-500 font-extralight truncate text-[16px]";
  return (
    <div className="">
      <div className="flex w-full items-start justify-start my-2 space-x-8">
        <div className="text-start w-full">
          <div>
            <h1 className="text-3xl font-light">{props?.character || hanzi}</h1>
            {lang === "zh" && (
              <h2 className={stylePinyin}>
                {meaning?.roman || meaning?.pinyin || pinyin}
              </h2>
            )}

            {meaning?.en && (
              <h3 className={styleEn}>
                {meaning?.en ||
                  formatComponentName(component, 2) ||
                  component?.en}
              </h3>
            )}
          </div>
        </div>

        <div>
          {level ? (
            <p className="text-xl font-extralight text-gray-600">{level}</p>
          ) : (
            <h2 className={stylePinyin}>{lang}</h2>
          )}

          <BookmarkButton hanzi={hanzi} lang={lang} />
        </div>
      </div>

      {isLoading ? (
        <div className="space-y-4 mt-4">
          <Skeleton className="h-14 w-full bg-gray-300 dark:bg-gray-900" />
          <Skeleton className="h-14 w-full bg-gray-300 dark:bg-gray-900" />
        </div>
      ) : (
        <ScrollArea className="space-y-6 w-full h-[300px] rounded-md pb-12">
          <div className="p-0 space-y-8 mt-4">
            {sentences?.map((sentence) => {
              return (
                <section className="text-start px-0 mx-0" key={sentence?.id}>
                  {component?.lang === "zh" && (
                    <p className={stylePinyin}>
                      {sentence?.roman || sentence?.pinyin}
                    </p>
                  )}
                  <h4 className="text-xl">
                    {sentence?.input || sentence?.hanzi}
                  </h4>
                  <p className={styleEn}>{sentence?.en}</p>
                  {/* <p className="text-gray-500 text-xs">{sentence?.explanation}</p> */}
                </section>
              );
            })}
          </div>
        </ScrollArea>
      )}
    </div>
  );
};
