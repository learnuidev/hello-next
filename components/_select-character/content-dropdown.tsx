"use client";

import { useMemo } from "react";

import { useListContentsQuery } from "@/domain/content/content.queries";

import { FilterSelect } from "@/app/nmm/filter-select";
import { useListPublishedContentsQuery } from "@/app/(auth)/convos/[content-id]/hooks/use-list-published-contents-query";

export const ContentDropdown = ({
  onSelect,
  value,
}: {
  onSelect: (val: string) => void;
  value: string;
}) => {
  const { data } = useListPublishedContentsQuery({});

  const contents = data?.items;

  const contentTitles = useMemo(
    () => [
      { title: "all", id: "all" },
      { id: "hsk", title: "hsk" },
      { id: "hsk3", title: "hsk 3" },
      { id: "nmm", title: "nmm" },
      { id: "xiaoma", title: "speak" },
      { id: "yct", title: "yct" },
      ...(contents || []),
    ],
    [contents]
  );

  return (
    <FilterSelect
      value={value}
      onValueChange={(topic) => {
        onSelect(topic);
      }}
      className="w-[320px]"
      items={contentTitles}
      title="Select a content"
    />
  );
};
