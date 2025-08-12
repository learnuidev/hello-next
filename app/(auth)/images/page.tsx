"use client";

import { useListCharacterContentsQuery } from "@/domain/character-contents/use-list-character-contents-query";
import Link from "next/link";

export default function Images() {
  const { data } = useListCharacterContentsQuery({ fetchType: "user" });
  return (
    <div className="p-8">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {data?.map((content) => {
          if (content?.sourceUrl && content?.contentType?.includes("image")) {
            return (
              <div key={content?.id}>
                <Link
                  className="h-auto max-w-full rounded-lg"
                  href={`/images/${content.id}`}
                  key={content?.id}
                >
                  {/* {content?.id} */}
                  <img
                    className="h-auto max-w-full rounded-lg"
                    src={content?.sourceUrl}
                    alt=""
                  />
                </Link>
              </div>
            );
          }
        })}
      </div>
    </div>
  );
}
