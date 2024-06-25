"use client";

import * as React from "react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useHSKLevelStore } from "./hsk-level-store";

const hskLevels = [
  {
    value: 1,
    label: "HSK 1",
  },
  {
    value: 2,
    label: "HSK 2",
  },
  {
    value: 3,
    label: "HSK 3",
  },
  {
    value: 4,
    label: "HSK 4",
  },
  {
    value: 5,
    label: "HSK 5",
  },
  {
    value: 6,
    label: "HSK 6",
  },
  {
    value: 9,
    label: "HSK 9",
  },
];

export function HSKCombobox() {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  const setLevel = useHSKLevelStore((state) => state.setLevel);
  const level = useHSKLevelStore((state) => state.level);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger>
        {level ? `HSK ${level}` : "Select HSK Level"}
      </PopoverTrigger>
      <PopoverContent className="w-auto bg-black p-0 m-0">
        <div className="flex flex-col">
          {hskLevels.map((hskLevel) => {
            return (
              <div
                key={hskLevel.value}
                className="space-x-4 flex items-center text-light justify-between cursor-pointer hover:bg-[rgb(31,32,33)] px-4 py-2"
                onClick={() => {
                  setLevel(hskLevel.value);
                }}
              >
                <span>{hskLevel?.label}</span>

                {level === hskLevel?.value ? (
                  <span className="text-xs text-gray-400">selected</span>
                ) : (
                  <span></span>
                )}
              </div>
            );
          })}
        </div>
      </PopoverContent>
    </Popover>
  );
}
