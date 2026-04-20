"use client";

import { Icons } from "@/components/ui/icons.v2";
import { Label } from "@/components/ui/label";

import { ChinglishButton } from "@/components/chinglish-button";
import { EnButton } from "@/components/en-button";
import { PinyinButton } from "@/components/pinyin-button";
import { ReadModeButton } from "@/components/read-mode-button";
import { PreviewButton } from "@/components/settings-dialog/preview-button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function NMMSettings({ children }: { children?: React.ReactNode }) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="w-5 justify-self-end">
          <Icons.gear className="text-2xl" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-80 dark:border-gray-900 border-gray-100 dark:bg-[rgb(21,22,23)] bg-gray-100 rounded-2xl z-50">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-bold leading-none">Settings</h4>
          </div>
          <div className="mt-4 space-y-8 pb-4">
            <div className="flex items-center space-x-2 justify-between">
              <Label htmlFor="perc">PERC</Label>
              <div className="flex gap-8 rounded-full">
                <PinyinButton className="text-2xl" />
                <EnButton className="text-2xl" />
                <ReadModeButton className="text-2xl" />
                <ChinglishButton className="text-2xl" />
              </div>
            </div>

            <div className="flex items-center gap-2 justify-between mb-4">
              <Label>Preview Mode</Label>
              <PreviewButton className="text-2xl w-8" />
            </div>

            {children}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
