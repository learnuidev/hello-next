import { Skeleton } from "@/components/ui/skeleton";
import { useListMeaningsQuery } from "@/domain/sentence/meaning.queries";
import { useListSentencesQuery } from "@/domain/sentence/sentence.queries";
import { formatComponentName } from "./format-component-name";

export const PreviewComponent = ({ component }: any) => {
  const { steps, ...rest } = component;

  const { data: sentences, isLoading } = useListSentencesQuery({
    component: component?.hanzi,
    lang: component?.lang || "zh",
  });

  const { data: meaning } = useListMeaningsQuery({
    content: component?.hanzi,
    lang: component?.lang || "zh",
  });

  const stylePinyin = "font-extralight text-gray-400";

  const styleEn = "min-w-0 text-gray-500 font-extralight truncate text-[12px]";
  return (
    <div className="w-80">
      <div className="flex w-full items-center justify-between my-2 space-x-8">
        <div className="w-full items-center justify-between flex-row">
          <div className="flex items-center justify-between w-full">
            <div>
              <h1 className="text-xl font-light">{component?.hanzi}</h1>
              {component?.lang === "zh" && (
                <h2 className={stylePinyin}>{component?.pinyin}</h2>
              )}

              <h3 className={styleEn}>
                {formatComponentName(component, 2) || component?.en}
              </h3>
            </div>
          </div>
        </div>

        <div>
          {component?.level ? (
            <p className="text-xl font-extralight text-gray-600">
              {component?.level}
            </p>
          ) : (
            <h2 className={stylePinyin}>{component?.lang}</h2>
          )}
        </div>
      </div>

      {isLoading ? (
        <div className="space-y-4 mt-4">
          <Skeleton className="h-14 w-full bg-gray-900" />
          <Skeleton className="h-14 w-full bg-gray-900" />
        </div>
      ) : (
        <div className="p-0 space-y-4 mt-8">
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
                    <h4>{sentence?.hanzi || sentence?.input}</h4>
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
