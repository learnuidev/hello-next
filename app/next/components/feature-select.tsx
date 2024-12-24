"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { defaultFeature, features } from "@/app/next/components/features";
import { useSearchParams } from "next/navigation";

export const FeatureSelect = ({
  onValueChange,
}: {
  onValueChange: (str: string) => void;
}) => {
  const searchParams = useSearchParams();
  const featureId = searchParams.get("feature-id") || defaultFeature.id;
  return (
    <div className="my-4">
      <Select value={featureId} onValueChange={onValueChange}>
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
