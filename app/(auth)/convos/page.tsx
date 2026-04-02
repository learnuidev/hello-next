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
import { SearchBar } from "@/components/search-bar";
import { BaseTabs } from "@/components/ui/base-tabs";
import { PageContainer } from "@/components/page-container";
import { Icons } from "@/components/ui/icons.v2";

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

type ViewType = "history" | "me" | "public" | "favourites";

const tabs = [
  {
    label: "历史",
    value: "history" as ViewType,
  },
  {
    label: "我",
    value: "me" as ViewType,
  },
  {
    label: "公开",
    value: "public" as ViewType,
  },
  {
    label: "收藏",
    value: "favourites" as ViewType,
  },
];

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

  if (contentId) {
    return (
      <main>
        <ConvoDetails contentId={contentId} />
        <FloatingNavbar />
      </main>
    );
  }

  return (
    <main>
      <PageContainer>
        <SearchBar />

        <div className="mt-4 flex justify-between items-center">
          <BaseTabs
            tabs={tabs}
            activeTab={contentViewType as ViewType}
            onTabChange={setViewType}
            layoutId="activeViewTab"
            className="gap-8"
          />

          {isProMember && (
            <button
              className="text-xl dark:hover:text-white px-3 py-1 dark:text-slate-600 shadow-md rounded-full"
              onClick={() => {
                router.push(`/convos?type=add`);
              }}
            >
              <PlusIcon />
            </button>
          )}
        </div>

        <div className="mt-8">
          <ContentsList contentViewType={contentViewType} />
        </div>
      </PageContainer>

      <FloatingNavbar />
    </main>
  );
}
