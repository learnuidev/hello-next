"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { useState } from "react";
import { useTimelineState } from "./timeline.state";
import { PreviewComponent } from "@/app/nmm/preview-component";
import { ScrollArea } from "@/components/ui/scroll-area";
import { TimelineDatesDrawer } from "./timeline-dates-drawer";
import { useListLearnedCharactersByDate } from "@/hooks/use-list-learned-characters-by-date";
import { Icons } from "@/components/ui/icons.v2";

export const TimelineTabBody = ({
  variant,
}: {
  variant: "all" | "search" | "click" | "discovered" | "reviewed";
}) => {
  // const [focusLang, setFocusLang] = useState("");

  const focusLang = useTimelineState((state: any) => state.focusLang);
  const setFocusLang = useTimelineState((state: any) => state.setFocusLang);

  const { data: groups, isLoading: isLearnedCharactersLoading } =
    useListLearnedCharactersByDate({ variant });

  const dates = groups?.map((group: any) => group?.title);

  const firstGroup = groups?.[0];

  const [selectedDateState, setSelectedDate] = useState(dates?.[0]);

  const selectedDate = selectedDateState || firstGroup?.title;

  const selectedGroup =
    groups?.find((group: any) => group?.title === selectedDate) || firstGroup;

  const joined = selectedGroup?.items?.find(
    (item: any) => item?.status === "joined"
  );

  if (isLearnedCharactersLoading) {
    return <div className="text-center my-16"> Loading ...</div>;
  }

  const langs = [
    // @ts-ignore
    ...new Set(selectedGroup?.items?.map((item: any) => item?.lang)),
  ]?.filter(Boolean);

  return (
    <div className="mx-0 md:mx-8">
      <article className="grid grid-cols-1fr md:grid-cols-[320px_1fr]">
        <div className="ml-6 w-full hidden md:block">
          <aside className="fixed">
            <ScrollArea className="hidden md:block space-y-6 h-[400px] rounded-md">
              <div className="flex flex-col w-32 items-center space-y-4 my-24">
                {groups?.map((date: any) => {
                  return (
                    <div
                      role="button"
                      onClick={() => {
                        setSelectedDate(date?.title);
                      }}
                      key={date?.title}
                      className={`${
                        selectedDate === date?.title
                          ? "font-normal"
                          : "text-gray-600"
                      } font-extralight flex justify-between w-full items-center hover:scale-110 hover:text-white transition`}
                    >
                      <span className="block"> {date?.title} </span>
                      <span className="block text-xs px-2 font-bold">
                        ({date?.items?.length})
                      </span>
                    </div>
                  );
                })}
              </div>
            </ScrollArea>
          </aside>
        </div>

        <section
          className="w-full"
          onKeyDown={(event) => {
            if (event.key === "Escape") {
              setFocusLang("");
            }
          }}
        >
          <div className="mt-0 md:mt-[-70px] ml-4 flex gap-4 md:mb-16 mb-4">
            {langs?.map((lang: any) => {
              return (
                <button
                  className={cn(
                    focusLang
                      ? focusLang === lang
                        ? "text-white"
                        : "text-gray-500"
                      : "text-gray-300",
                    "transition text-xl font-extralight hover:scale-125"
                  )}
                  onClick={() => {
                    setFocusLang((prevLang: string) => {
                      if (prevLang) {
                        if (prevLang === lang) {
                          return "";
                        }
                        return lang;
                      } else {
                        return lang;
                      }
                    });
                  }}
                  key={lang}
                >
                  {lang}
                </button>
              );
            })}
          </div>
          <div>
            {/* <h1 className="font-extralight text-gray-400">
              {selectedGroup?.title}
            </h1> */}

            <div className="flex flex-wrap flex-row w-full">
              {selectedGroup?.items?.map((item: any, idx: any) => {
                if (item?.status === "joined") {
                  return null;
                }
                return (
                  <TooltipProvider
                    key={`${item?.input || item?.hanzi?.trim("")}-chars-${idx}`}
                  >
                    <Tooltip>
                      <TooltipTrigger className="p-3 px-0 hover:scale-110 transition">
                        <Link
                          href={
                            item?.lang
                              ? `/nmm/${item?.input || item?.hanzi}?lang=${item?.lang}`
                              : `/nmm/${item?.input || item?.hanzi}`
                          }
                          // href={`/nmm/${item?.input || item?.hanzi?.trim("")}?lang=${item?.lang || "zh"}`}
                          className={cn(
                            `py-4 pr-8 font-light`,
                            `  dark:hover:text-white p-3 transition lowercase`,
                            focusLang && langs?.length > 1
                              ? // &&
                                //   langs?.length !== 1 &&
                                //   langs?.includes(focusLang)
                                focusLang === item?.lang
                                ? "text-white text-2xl"
                                : "text-gray-700 text-2xl"
                              : "text-gray-300 text-2xl"
                          )}
                        >
                          {item?.input || item?.hanzi?.trim("")}
                        </Link>
                      </TooltipTrigger>
                      <TooltipContent className="bg-black border-gray-800">
                        <PreviewComponent component={item} />
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                );
              })}
            </div>

            {joined ? (
              <div className="ml-[-260px] my-32 text-center flex items-center justify-center flex-col">
                <p className="my-4">
                  {" "}
                  <Icons.mountainSun className="text-3xl text-gray-600" />
                </p>
                <h1 className="text-2xl font-extralight text-gray-600">
                  {" "}
                  Joined Mandarino
                </h1>
              </div>
            ) : null}
          </div>
        </section>
      </article>

      <div className="md:hidden flex w-full fixed z-50 bottom-8">
        <div className="m-auto">
          <TimelineDatesDrawer
            focusLang={focusLang}
            selectedDate={selectedDate || ""}
          />
        </div>
      </div>
    </div>
  );
};
