/* eslint-disable @next/next/no-img-element */
"use client";
import { Icons } from "@/components/ui/icons.v2";
import { Label } from "@/components/ui/label";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Switch } from "@/components/ui/switch";

export function SettingsPopover({
  pinyinView,
  setPinyinView,
  sentenceView,
  setSentenceView,
  hskView,
  setHskView,
}: any) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="w-12 justify-self-end">
          <Icons.gear className="text-2xl" />
        </button>
        {/* <Button variant="outline">Open popover</Button> */}
      </PopoverTrigger>
      <PopoverContent className="w-80 dark:border-gray-900 border-gray-100 dark:bg-[rgb(21,22,23)] bg-gray-100 rounded-2xl">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-bold leading-none">Clipboard Settings</h4>
          </div>
          <div className="mt-4 space-y-4">
            <div className="flex items-center space-x-2 justify-between">
              <Label htmlFor="airplane-mode">Show Pinyin</Label>
              <Switch
                color="dark:bg-blue-500"
                // className="data-[state=checked]:bg-green-500 data-[state=unchecked]:bg-red-500"
                checked={pinyinView}
                onCheckedChange={() => {
                  setPinyinView((prev: any) => !prev);
                }}
              />
            </div>
            <div className="flex items-center space-x-2 justify-between">
              <Label htmlFor="airplane-mode">Show Sentences</Label>
              <Switch
                color="dark:bg-blue-500"
                // className="data-[state=checked]:bg-green-500 data-[state=unchecked]:bg-red-500"
                checked={sentenceView}
                onCheckedChange={() => {
                  setSentenceView((prev: any) => !prev);
                }}
              />
            </div>
            <div className="flex items-center space-x-2 justify-between">
              <Label htmlFor="airplane-mode">Show HSK </Label>
              <Switch
                color="dark:bg-blue-500"
                // className="data-[state=checked]:bg-green-500 data-[state=unchecked]:bg-red-500"
                checked={hskView}
                onCheckedChange={() => {
                  setHskView((prev: any) => !prev);
                }}
              />
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
