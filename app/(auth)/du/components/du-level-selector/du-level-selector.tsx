import { useState } from "react";
import { duLevels } from "../../constants/du-levels";

import { Checkbox } from "@/components/ui/checkbox";
import { useDuStore } from "../../hooks/use-du-store";

export const DuLevelSelector = () => {
  const levels = useDuStore((state: any) => state.levels);
  const setLevels = useDuStore((state: any) => state.setLevels);
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:flex mb-8 sm:mb-12 gap-4 lg:space-x-8 space-x-0">
      {Object.values(duLevels).map((level) => {
        return (
          <div className="items-top flex space-x-2" key={level.id}>
            <Checkbox
              id={level?.id}
              checked={levels?.includes(level?.id)}
              onCheckedChange={(event) => {
                setLevels((prev: any) => {
                  if (event) {
                    return prev?.concat(level?.id);
                  }

                  return prev?.filter((item: any) => item !== level?.id);
                });
              }}
            />
            <div className="grid gap-1.5 leading-none">
              <label
                htmlFor="terms1"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {level.title}
              </label>
            </div>
          </div>
        );
      })}
    </div>
  );
};
