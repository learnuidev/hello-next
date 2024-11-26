import * as React from "react";

import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

export function TimelineDatesDrawer({
  focusLang,
  groups,
  selectedDate,
  setSelectedDate,
  isOpen,
  setIsOpen,
}: {
  focusLang: string;
  isOpen: boolean;
  setIsOpen: any;
  groups: any;
  selectedDate: string;
  setSelectedDate: any;
}) {
  return (
    <Drawer open={isOpen}>
      <DrawerTrigger asChild>
        <button
          onClick={() => {
            setIsOpen(true);
          }}
          className="bg-slate-800 no-underline group cursor-pointer relative shadow-2xl shadow-zinc-900 rounded-full p-px text-xs font-semibold leading-6  text-white inline-block"
        >
          <span className="absolute inset-0 overflow-hidden rounded-full">
            <span className="absolute inset-0 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(56,189,248,0.6)_0%,rgba(56,189,248,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          </span>
          <div className="relative flex space-x-2 items-center z-10 rounded-full bg-zinc-950 py-2 px-4 ring-1 ring-white/10 ">
            <span>{selectedDate}</span>
          </div>
          <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-emerald-400/0 via-emerald-400/90 to-emerald-400/0 transition-opacity duration-500 group-hover:opacity-40" />
        </button>
        {/* <Button className="">Open Drawer</Button> */}
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader className="pb-0 mb-0">
            <DrawerTitle>Select a date</DrawerTitle>
          </DrawerHeader>
          <div className="p-4 pb-0">
            <ScrollArea className="space-y-6 h-[400px] rounded-md mb-20">
              <div className="flex flex-col space-y-4">
                {groups.map((group: { title: string }) => {
                  return (
                    <button
                      className={cn(
                        "text-2xl text-gray-400 hover:text-white font-bold tracking-tighter",
                        selectedDate === group?.title
                          ? "text-white"
                          : "text-gray-400"
                      )}
                      onClick={() => {
                        setSelectedDate(group?.title);
                        setIsOpen(false);
                      }}
                      key={group?.title}
                    >
                      {group?.title}
                    </button>
                  );
                })}
              </div>
            </ScrollArea>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
