"use client";

import { GridBankMediaContent } from "../modules/media/media.types";
import { ContentItemPreview } from "./content-item-preview";
import Link from "next/link";

export const ContentsList = ({
  gridBankContents,
}: {
  gridBankContents: GridBankMediaContent[];
}) => {
  return (
    <section className="grid grid-cols-1 gap-12 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 p-4">
      {gridBankContents.map((content) => {
        return (
          <Link href={`/interview/${content.video_id}`} key={content.video_id}>
            <ContentItemPreview
              key={content.video_id}
              asset={content}
            />
          </Link>
        );
      })}
    </section>
  );
};
