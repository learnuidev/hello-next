"use client";

import { usePathname, useSearchParams } from "next/navigation";
import React from "react";
import { SearchBar } from "./search-bar";
import { FloatingNavbar } from "./floating-navbar";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useReviewStore } from "@/app/review/review-store";
import { cn } from "@/lib/utils";
import { Icons } from "./ui/icons.v2";
import Link from "next/link";
import { AnimatedContentsFilter } from "./animated-contents-filter";
import { ContentDropdown } from "./_select-character/content-dropdown";
import { useLearningModeStore } from "./settings-dialog/learning-mode.store";
import { DuNavbar } from "@/app/(auth)/du/components/du-navbar";

const ReviewNavBar = () => {
  const routeName = usePathname();

  const viewType = useReviewStore((state: any) => state.viewType);
  const setViewType = useReviewStore((state: any) => state.setViewType);

  const searchParams = useSearchParams();

  const view = searchParams?.get("view");

  const isV2 = false;

  return (
    <>
      {routeName?.includes("/review") && isV2 ? (
        <div className="hidden md:block">
          <div className="z-40 space-x-8 ml-[-360px] flex items-center text-gray-500 font-light">
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
        </div>
      ) : null}

      {routeName?.includes("/review") && isV2 ? (
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
    </>
  );
};
const ContentsDropdown = () => {
  const routeName = usePathname();

  const viewType = useReviewStore((state: any) => state.viewType);
  const setViewType = useReviewStore((state: any) => state.setViewType);

  const searchParams = useSearchParams();

  const setMode = useLearningModeStore((state: any) => state.setMode);
  const mode = useLearningModeStore((state: any) => state.mode);

  const view = searchParams?.get("view");

  const isV2 = false;

  return (
    <>
      {routeName === "/" || routeName === "/nmm" ? (
        <ContentDropdown
          value={mode}
          onSelect={(val) => {
            setMode(val);
          }}
        />
      ) : null}
    </>
  );
};
export const NavBar = ({ autoFocus }: { autoFocus?: boolean }) => {
  const routeName = usePathname();

  return (
    <div className="relative">
      <div className="flex justify-between items-center w-full px-4 md:px-12">
        <SearchBar autoFocus={autoFocus} />

        <ReviewNavBar />
        {routeName !== "/" && <ContentsDropdown />}

        {routeName?.includes("learn") && (
          <Link href="/">
            <Icons.xMark />
          </Link>
        )}
        {routeName?.includes("/convos") && <AnimatedContentsFilter />}

        {routeName === "/du" && <DuNavbar />}
      </div>

      {routeName?.includes("learn") || routeName?.includes("diary") ? null : (
        <FloatingNavbar />
      )}
    </div>
  );
};
