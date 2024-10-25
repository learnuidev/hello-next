"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { features } from "@/app/next/components/features";

export const FeatureSelect = ({
  onValueChange,
}: {
  onValueChange: (str: string) => void;
}) => {
  return (
    <div className="my-4">
      <Select onValueChange={onValueChange}>
        <SelectTrigger className="w-[180px] border-gray-800">
          <SelectValue placeholder="Select a feature" />
        </SelectTrigger>
        <SelectContent className="border-gray-800 bg-black">
          <SelectGroup>
            {features.map((feature) => {
              return (
                <SelectItem key={feature.id} value={feature.id}>
                  {feature.name}
                </SelectItem>
              );
            })}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};
