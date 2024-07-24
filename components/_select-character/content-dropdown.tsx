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
      { id: "xiaoma", title: "xiaoma" },
      { id: "yct", title: "yct" },
      ...(contents || []),
    ],
    [contents]
  );

  return (
    <Select
      value={value}
      onValueChange={(topic) => {
        onSelect(topic);
      }}
    >
      <SelectTrigger className="w-[320px] text-xs dark:border-gray-800">
        <SelectValue placeholder="Select a topic" />
      </SelectTrigger>
      <SelectContent className="bg-black dark:border-gray-900 w-[300px] text-xs">
        <SelectGroup>
          <SelectLabel>Contents</SelectLabel>

          {contentTitles?.map((topic: any) => {
            return (
              <SelectItem
                value={topic?.id}
                key={topic?.id}
                className="text-xs dark:hover:text-white data-[state=unchecked]:dark:text-gray-500 transition data-[state=checked]:text-white"
              >
                {topic?.title} {topic?.lang ? `[${topic?.lang}]` : ""}
              </SelectItem>
            );
          })}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
