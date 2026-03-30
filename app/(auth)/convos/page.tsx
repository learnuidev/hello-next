"use client";

import "@/libs/cognito/init";

import { useState } from "react";

import { NavBar } from "@/components/navbar";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { useConvosStore } from "@/stores/convos-store";
import { ConvoDetails } from "./convo-details";
import { ConvosNavBar } from "./convos-nav-bar";
import { useSelectedCharacter } from "./use-selected-character";

import { PlusIcon } from "@/components/ui/icons";

import { FloatingNavbar } from "@/components/floating-navbar";
import { createIndexDBStore } from "@/libs/index-db/index-db";
import { useIsProMember } from "../plans/hooks/use-is-pro-member";
import { ContentsList } from "./contents-list";
import { NewBook } from "./new-book/new-book";
import { NewContentV2 } from "./new-content-v2/new-content-v2";

const useViewTypeStore = createIndexDBStore({
  name: "view-type",
  handler: (set: any, get: any) => ({
    viewType: "history",
    setViewType: (f: any) =>
      typeof f === "function"
        ? set({ viewType: f(get().viewType) })
        : set({ viewType: f }),
  }),
});

const useViewType = () => {
  const viewType = useViewTypeStore((state) => state.viewType);
  const setViewType = useViewTypeStore((state) => state.setViewType);

  return [viewType, setViewType] as any;
};

const ContentViewMode = () => {
  const searchParams = useSearchParams();

  const addMode = searchParams.get("variant");

  const router = useRouter();

  if (!addMode) {
    return (
      <div className="flex justify-center items-center flex-col mt-32">
        <h1 className="text-2xl">What would you like to add</h1>

        <div className="flex gap-8 mt-12 text-xl">
          <button
            onClick={() => {
              router.push(`/convos?type=add&variant=book`);
            }}
          >
            Book
          </button>
          <button
            onClick={() => {
              router.push(`/convos?type=add&variant=content`);
            }}
          >
            Content
          </button>
        </div>
      </div>
    );
  }

  if (addMode === "content") {
    return <NewContentV2 />;
  }

  if (addMode === "book") {
    return <NewBook />;
  }
};

export default function Convos() {
  const [contentViewType, setViewType] = useViewType();

  const isProMember = useIsProMember();

  const contentId = useConvosStore((state: any) => state?.convoId);

  const selectedChar = useSelectedCharacter((state: any) => state?.character);

  const routeName = usePathname();

  const router = useRouter();

  const searchParams = useSearchParams();
  const addMode = searchParams.get("type");

  const isAdd = addMode === "add";

  if (isAdd) {
    return <ContentViewMode />;
  }

  return (
    <main className="mb-32">
      <div className="flex space-x-4 px-4 md:px-12 mt-4">
        <button
          className={
            contentViewType === "public" ? "dark:text-white" : "text-gray-500"
          }
          onClick={() => {
            setViewType("public");
          }}
        >
          Public
        </button>
        <button
          className={
            contentViewType === "me" ? "dark:text-white" : "text-gray-500"
          }
          onClick={() => {
            setViewType("me");
          }}
        >
          Me
        </button>
        <button
          className={
            contentViewType === "history" ? "dark:text-white" : "text-gray-500"
          }
          onClick={() => {
            setViewType("history");
          }}
        >
          History
        </button>
        <button
          className={
            contentViewType === "favourites"
              ? "dark:text-white"
              : "text-gray-500"
          }
          onClick={() => {
            setViewType("favourites");
          }}
        >
          Favourites
        </button>
      </div>
      {selectedChar ? null : contentId && routeName?.includes("/convos") ? (
        <ConvosNavBar />
      ) : (
        <NavBar />
      )}

      {selectedChar
        ? null
        : contentId && routeName?.includes("/convos")
          ? null
          : isProMember && (
              <div className="px-4 md:px-8 mt-4">
                <button
                  className="text-xl dark:hover:text-white md:px-4 py-1 dark:text-slate-600 shadow-md rounded-full"
                  onClick={() => {
                    router.push(`/convos?type=add`);
                    // setViewMode("convo/add");
                  }}
                >
                  <PlusIcon />
                </button>
              </div>
            )}

      {contentId ? (
        <ConvoDetails contentId={contentId} />
      ) : (
        <div className="my-8 space-y-8">
          <ContentsList contentViewType={contentViewType} />
        </div>
      )}

      <FloatingNavbar />
    </main>
  );
}
