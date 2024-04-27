import { Skeleton } from "@/components/ui/skeleton";
import { useListMeaningsQuery } from "@/domain/sentence/meaning.queries";
import { useListSentencesQuery } from "@/domain/sentence/sentence.queries";
import { formatComponentName } from "./format-component-name";

export const PreviewComponent = ({ component }: any) => {
  const { steps, ...rest } = component;

  const { data: sentences, isLoading } = useListSentencesQuery({
    component: component?.hanzi,
    lang: "zh",
  });

  const { data: meaning } = useListMeaningsQuery({
    content: component?.hanzi,
    lang: "zh",
  });

  const stylePinyin = "font-extralight text-gray-400";

  const styleEn = "min-w-0 text-gray-500 font-extralight truncate text-[12px]";
  return (
    <div className="w-80">
      <div className="flex w-full items-center justify-between my-2 space-x-8">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-2xl font-light">{component?.hanzi}</h1>
            <h2 className={stylePinyin}>{component?.pinyin}</h2>
          </div>

          <h3 className={styleEn}>{formatComponentName(component)}</h3>
        </div>

        <p className="text-xl font-extralight text-gray-600">
          {component?.level}
        </p>
      </div>

      {isLoading ? (
        <div className="space-y-4 mt-4">
          <Skeleton className="h-14 w-full bg-gray-900" />
          <Skeleton className="h-14 w-full bg-gray-900" />
        </div>
      ) : (
        <div className="p-0 space-y-4 mt-4">
          {sentences
            ?.slice(0, 2)
            ?.map(
              (sentence: {
                id: string;
                hanzi: string;
                pinyin: string;
                en: string;
                explanation: string;
                createdAt: number;
                lang?: "zh" | "es" | "ml";
              }) => {
                return (
                  <section className="px-0 mx-0" key={sentence?.id}>
                    <h4>{sentence?.hanzi}</h4>
                    <p className={stylePinyin}>{sentence?.pinyin}</p>
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
