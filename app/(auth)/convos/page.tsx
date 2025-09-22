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

import { useIsNewContentFormEnabled } from "@/libs/posthog/hooks/use-is-new-content-form-enabled";

import { useViewModeStore } from "./new-convo/use-viewmode-store";
import { createIndexDBStore } from "@/libs/index-db/index-db";
import { useIsProMember } from "../plans/hooks/use-is-pro-member";
import { ContentsList } from "./contents-list";
import { NewContentV2 } from "./new-content-v2/new-content-v2";
import { useIsFreeMember } from "../plans/hooks/use-is-free-member";
import { NewBook } from "./new-book/new-book";

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
  // const [addMode, setAddMode] = useState("");
  // if (isNewContentEnabled) {
  //   return <NewContent />;
  // }

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
              // setAddMode("book");
            }}
          >
            Book
          </button>
          <button
            onClick={() => {
              router.push(`/convos?type=add&variant=content`);
              // setAddMode("content");
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
  const isFreeMember = useIsFreeMember();

  const [isTocHidden, setIsTocHidden] = useState(false);
  const contentId = useConvosStore((state: any) => state?.convoId);

  const viewMode = useViewModeStore((state: any) => state.viewMode);
  const setViewMode = useViewModeStore((state: any) => state.setViewMode);

  const selectedChar = useSelectedCharacter((state: any) => state?.character);

  const routeName = usePathname();

  const isNewContentEnabled = useIsNewContentFormEnabled();

  const router = useRouter();

  const searchParams = useSearchParams();
  const addMode = searchParams.get("type");

  const isAdd = addMode === "add";

  const toggleIsHidden = () => {
    if (isTocHidden) {
    }
  };

  if (isAdd) {
    return <ContentViewMode />;
  }

  return (
    <main className="">
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
    </main>
  );
}
