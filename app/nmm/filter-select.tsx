"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { cn } from "@/lib/utils";

export const FilterSelect = ({
  items,
  className = "",
  onValueChange,
  value,
  title,
}: {
  items: { title: string; id: string }[];
  onValueChange: (val: string) => void;
  value: string;
  title: string;
  className?: string;
}) => {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger
        className={cn(
          "w-fulltext-xs dark:border-gray-800 border-gray-400 rounded-full",
          className
        )}
      >
        <SelectValue placeholder={title} />
      </SelectTrigger>
      <SelectContent
        className={cn("bg-black dark:border-gray-900 w-[300px] text-xs")}
      >
        <SelectGroup>
          {items.map((coreTitle) => {
            return (
              <SelectItem
                value={coreTitle.id}
                key={coreTitle.id}
                className="text-xs dark:hover:text-white data-[state=unchecked]:dark:text-gray-500 transition data-[state=checked]:text-white"
              >
                {coreTitle.title}
              </SelectItem>
            );
          })}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
