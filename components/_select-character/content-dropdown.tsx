"use client";

import React, { useMemo } from "react";
import { useSearchParams } from "next/navigation";

import { SelectedCharacterProps } from "./select-character.types";

import { useListContentsQuery } from "@/domain/content/content.queries";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FilterSelect } from "@/app/nmm/filter-select";

export const ContentDropdown = ({
  onSelect,
  value,
}: {
  onSelect: (val: string) => void;
  value: string;
}) => {
  const { data: contents } = useListContentsQuery();

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
