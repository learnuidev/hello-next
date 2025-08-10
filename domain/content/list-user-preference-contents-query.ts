"use client";

import { useQuery } from "@tanstack/react-query";

import { listContents } from "./content.api";

import { useJwtToken } from "@/app/next/features/html-parser/hooks/use-jwt-token";
import { useGetUserPreferenceQuery } from "../user/use-get-user-preference-query";
import { useContentsStore } from "./content.queries";

export function useListUserPreferenceContentsQuery() {
  const { data } = useGetUserPreferenceQuery();

  const jwtToken = useJwtToken();

  const userPreferenceContentIds = Object.keys(data?.recentlyWatched || {});

  const contents: any = useContentsStore((state) => state.contents);
  const setContents: any = useContentsStore((state) => state.setContents);

  const contentItems = contents?.items;

  const contentIdsNotInContentItems = userPreferenceContentIds.filter(
    (contentId) => {
      const item = contentItems?.find((val: any) => val?.id === contentId);

      return !item;
    }
  );

  return useQuery({
    queryKey: [
      "use-list-user-preference-contents-query",
      JSON.stringify(contentIdsNotInContentItems),
    ],
    queryFn: async () => {
      console.log(
        "contentIdsNotInContentItems",
        contentIdsNotInContentItems?.length
      );
      if (contentIdsNotInContentItems?.length > 0) {
        const resp = await listContents(
          { contentIds: contentIdsNotInContentItems },
          { Authorization: jwtToken }
        );

        const respItems = resp?.items;

        setContents((prevContent: any) => {
          const updatedItems = (prevContent?.items || [])
            ?.filter((c: any) => {
              const contentItem = respItems?.find(
                (item: any) => item.id === c.id
              );
              return !contentItem;
            })
            .concat(respItems);

          return {
            ...prevContent,
            items: updatedItems,
          };
        });
      }
    },
  });
}
