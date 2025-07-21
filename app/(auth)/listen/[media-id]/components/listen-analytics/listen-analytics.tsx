import { useListDictionaryMeaningsQuery } from "@/app/next/features/html-parser/hooks/use-dictionary-list-meanings";
import { useGetMediaQuery } from "../../../hooks/use-get-media-query";
import { useMediaParams } from "../../hooks/use-media-params";
import { NmmListContainerAll } from "@/components/nmm-list-container-all";
import { HanziLink } from "@/components/hanzi-link";

export function ListenAnalytics({ mediaId }: { mediaId: string }) {
  const { data } = useGetMediaQuery(mediaId);

  const wordsRaw = [
    ...new Set(
      data?.mediaFile?.speechMarks?.chunks?.map((item) => {
        return item?.value;
      })
    ),
  ];

  // const words = data?.lang === "zh" ? wordsRaw?.map(word => {

  // }) : wordsRaw;

  const transcriptionStr = wordsRaw?.join(" ");

  const { data: _context, isLoading: isContextLoading } =
    useListDictionaryMeaningsQuery(transcriptionStr, data?.lang);

  const context = [
    ...new Set(_context?.map((item) => JSON.stringify(item))),
  ].map((item) => {
    const parsed = JSON.parse(item);

    return {
      ...parsed,
      frequency: _context?.filter((item: any) => item?.input === parsed?.input)
        ?.length,
    };
  });
  return (
    <main className="max-w-6xl m-auto p-4">
      <section className="mt-[72px] h-auto sm:min-h-[800px] rounded-2xl dark:bg-[rgb(21,22,23)] bg-gray-100 gap-4 p-4 justify-start">
        <NmmListContainerAll>
          {context?.map((char) => {
            return (
              <HanziLink
                lang={data?.lang}
                character={char}
                key={`${char?.id}`}
              />
            );
          })}
        </NmmListContainerAll>
      </section>
    </main>
  );
}
