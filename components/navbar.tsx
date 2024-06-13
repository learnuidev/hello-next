"use client";

import Link from "next/link";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMountainSun } from "@fortawesome/pro-duotone-svg-icons/faMountainSun";
import { faChartColumn } from "@fortawesome/sharp-solid-svg-icons/faChartColumn";

import { faTableTree } from "@fortawesome/sharp-solid-svg-icons/faTableTree";
import { NomadIcon } from "./ui/icons";
import { usePathname } from "next/navigation";

import React from "react";

import { faPlayCircle } from "@fortawesome/pro-thin-svg-icons";
import { belts } from "@/app/nmm/utils";
import { useListCharactersQuery } from "@/domain/lesson/character.queries";
import { useBeltStore } from "./use-belt-store";
import { useListAnswersQuery } from "@/domain/lesson/answer.queries";
import { useListComponents } from "@/domain/lesson/component.queries";
import { faPhotoFilm } from "@fortawesome/sharp-solid-svg-icons";
import { useListCharacterReviewList } from "@/hooks/use-character-review-list";
import { Icons } from "./ui/icons.v2";
import { SearchBar } from "./search-bar";
import { FloatingNavbar } from "./floating-navbar";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useReviewStore } from "@/app/review/review-store";
import { cn } from "@/lib/utils";

function useGoldenCharacters(belt: any) {
  const { data: components, isLoading } = useListComponents();

  const { data: answers } = useListAnswersQuery(
    {},
    {
      refetchOnWindowFocus: false,
      refetchOnFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
    }
  );

  const lastAnswer = answers?.[answers?.length - 1];

  return components?.filter((component: any) => {
    return (
      lastAnswer?.totalCharacters?.includes(component?.hanzi) &&
      component?.level <= belt?.maxCharacterLevel
    );
  });
}

function formatPercentage(number: number) {
  return Intl.NumberFormat("en-GB", {
    style: "percent",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(number);
}

export const NavBar = () => {
  const routeName = usePathname();
  const belt = useBeltStore((x) => x?.selectedBelt);

  const goldenChars = useGoldenCharacters(belt);

  const setSelectedBelt = useBeltStore((x) => x?.setSelectedBelt);

  const { data: learnedCharacters2 } = useListCharactersQuery();

  const { data: reviewList } = useListCharacterReviewList();

  const viewType = useReviewStore((state: any) => state.viewType);
  const setViewType = useReviewStore((state: any) => state.setViewType);

  // return <SearchBar />;

  return (
    <div className="relative">
      <div className="flex justify-between items-center w-full px-4 md:px-12 md:my-4">
        <SearchBar />
        {/* <div>hello</div> */}

        {routeName?.includes("/review") ? (
          <div className="z-40 space-x-8 ml-[-400px] flex items-center text-gray-500 font-light">
            <button
              onClick={() => {
                setViewType("day");
              }}
              className={cn(viewType === "day" ? "text-white" : "")}
            >
              day
            </button>
            <button
              onClick={() => {
                setViewType("week");
              }}
              className={cn(viewType === "week" ? "text-white" : "")}
            >
              week
            </button>
            <button
              onClick={() => {
                setViewType("month");
              }}
              className={cn(viewType === "month" ? "text-white" : "")}
            >
              month
            </button>
            <button
              onClick={() => {
                setViewType("year");
              }}
              className={cn(viewType === "year" ? "text-white" : "")}
            >
              year
            </button>
          </div>
        ) : null}

        {routeName?.includes("/review") ? (
          <div className="flex items-center space-x-4 text-gray-500">
            <button>
              <ArrowLeft className="h-5" />
            </button>

            <button className="text-sm">Today</button>

            <button>
              <ArrowRight className="h-5" />
            </button>
          </div>
        ) : null}
      </div>

      <FloatingNavbar />
    </div>
  );
};
