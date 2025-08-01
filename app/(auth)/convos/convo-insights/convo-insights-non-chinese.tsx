"use client";

import { useGetContentQuery } from "@/domain/content/content.queries";

import { useListDictionaryMeaningsQuery } from "@/app/next/features/html-parser/hooks/use-dictionary-list-meanings";
import { LottieLoadingAnimation } from "@/app/nmm/lottie-loading-animation";
import { HanziLink } from "@/components/hanzi-link";
import { NmmListContainerAll } from "@/components/nmm-list-container-all";

export const ConvoInsightsNoNChinese = ({
  contentId,
  children,
}: {
  contentId: string;
  children: React.ReactNode;
}) => {
  const { data, isLoading } = useGetContentQuery({
    contentId,
  }) as any;

  const transcriptionStr = data?.transcriptions
    ?.map((item: any) => item?.input?.replaceAll("¿", "")?.replaceAll("¡", ""))
    ?.join(" ");

  const { data: _context, isLoading: isContextLoading } =
    useListDictionaryMeaningsQuery(transcriptionStr, data?.lang, contentId);

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

  if (data?.lang === "zh") {
    return children;
  }

  if (isContextLoading) {
    return (
      <div>
        <LottieLoadingAnimation />
      </div>
    );
  }

  return (
    <div className="my-8 bg-[rgb(11,12,13)] py-12">
      <h4 className="text-center text-2xl">Content Dictionary</h4>
      <NmmListContainerAll className="gap-4">
        {context?.map((char: any, idx: number) => {
          return (
            <HanziLink
              className={
                char?.context?.contentId === contentId
                  ? "text-yellow-500 dark:text-yellow-500 "
                  : ""
              }
              lang={data?.lang}
              frequency={char?.frequency}
              character={char}
              key={`${char?.hanzi}-chars-${idx}`}
            />
          );
        })}
      </NmmListContainerAll>
    </div>
  );
};
