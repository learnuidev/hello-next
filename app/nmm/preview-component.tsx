import { Skeleton } from "@/components/ui/skeleton";
import { useListMeaningsQuery } from "@/domain/sentence/meaning.queries";
import { useListSentencesQuery } from "@/domain/sentence/sentence.queries";

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

  const styleEn = "text-gray-500 font-extralight";
  return (
    <div>
      <div>
        <div className="flex items-center space-x-2">
          <h1 className="text-2xl font-light">{component?.hanzi}</h1>
          <h2 className={stylePinyin}>{component?.pinyin}</h2>
          <h3 className={styleEn}>{component?.en}</h3>
        </div>
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
