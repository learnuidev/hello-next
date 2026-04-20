"use client";

import { useGetContentQuery } from "@/domain/content/content.queries";

import { Dialog, DialogContent } from "@/components/ui/dialog";

import { NMMSettings } from "@/app/nmm/nmm-settings";
import { SentenceItem } from "@/components/_select-character/sentence-item";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getNmmLink } from "@/libs/utils/get-nmm-link";
import Link from "next/link";
import { useMemo } from "react";

export const ConvoContextDialog = ({
  isOpen,
  selected,
  contentId,
  closeDialog,
}: {
  isOpen: boolean;
  selected: any;
  contentId: string;
  closeDialog: () => void;
}) => {
  const { data } = useGetContentQuery({ contentId });

  const filteredTimestamps = useMemo(
    () =>
      data?.transcriptions
        ?.filter((item: any) =>
          (item?.input || item?.hanzi)?.includes(
            selected?.input || selected?.hanzi,
          ),
        )
        ?.map((item: any) => ({
          ...item,
          contentId: item?.contentId || contentId,
        })),
    [data?.transcriptions, contentId],
  );

  const containsChinglish = !!data?.transcriptions?.[0]?.chinglish;

  return (
    <Dialog open={isOpen}>
      <DialogContent
        onClick={() => {
          closeDialog();
        }}
        className="sm:max-w-2xl border-gray-900 bg-gray-50 dark:bg-black opacity-80"
      >
        <div className="flex justify-between items-center mb-4">
          <Link
            target="_blank"
            className="text-gray-500"
            href={getNmmLink({
              id: selected?.input || selected?.hanzi,
              lang: data?.lang,
              contentId,
            })}
          >
            Selected: {selected?.input || selected?.hanzi}
          </Link>

          <NMMSettings />
        </div>

        <ScrollArea className="space-y-6 w-full h-[400px] rounded-md">
          <div className="flex flex-col gap-4">
            {filteredTimestamps?.map((item: any) => {
              return (
                <SentenceItem
                  disableHistory
                  key={JSON.stringify(item)}
                  selectedComp={data}
                  selectedChar={selected}
                  lang={data?.lang}
                  currentPhrase={item}
                />
              );
            })}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};
