"use client";

import "@/libs/cognito/init";

import { useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { useConvosStore } from "@/stores/convos-store";
import { ConvoDetails } from "./convo-details";
import { useSelectedCharacter } from "./use-selected-character";

import { PlusIcon } from "@/components/ui/icons";

import { FloatingNavbar } from "@/components/floating-navbar";
import { PageContainer } from "@/components/page-container";
import { SearchBar } from "@/components/search-bar";
import { BaseTabs } from "@/components/ui/base-tabs";
import { ContentCollectionsSections } from "@/components/content-collections/content-collections-sections";
import { createIndexDBStore } from "@/libs/index-db/index-db";
import { useIsProMember } from "../plans/hooks/use-is-pro-member";
import { ContentsList } from "./contents-list";
import {
  activeTabQueryParam,
  defaultViewType,
  isViewType,
  viewTabs,
  ViewType,
} from "./view-tabs";

import { NewContentV2 } from "./new-content-v2/new-content-v2";

const useViewTypeStore = createIndexDBStore({
  name: "view-type-v2",
  handler: (set: any, get: any) => ({
    viewType: "collections",
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

  if (addMode === "content") {
    return <NewContentV2 />;
  }
};

export default function Convos() {
  const [savedViewType, setSavedViewType] = useViewType();

  const isProMember = useIsProMember();

  const contentId = useConvosStore((state: any) => state?.convoId);

  const selectedChar = useSelectedCharacter((state: any) => state?.character);

  const routeName = usePathname();

  const router = useRouter();

  const searchParams = useSearchParams();
  const addMode = searchParams.get("type");

  const isAdd = addMode === "add";

  const activeParam = searchParams.get(activeTabQueryParam);

  // The URL wins, then the saved preference, then the default tab.
  const contentViewType: ViewType = isViewType(activeParam)
    ? activeParam
    : isViewType(savedViewType)
      ? savedViewType
      : defaultViewType;

  const setViewType = (viewType: ViewType, { replace = false } = {}) => {
    setSavedViewType(viewType);

    const params = new URLSearchParams(searchParams.toString());
    params.set(activeTabQueryParam, viewType);

    const url = `/convos?${params.toString()}`;

    if (replace) {
      router.replace(url);
    } else {
      router.push(url);
    }
  };

  // Whatever tab is showing, the URL and the saved preference should say so.
  useEffect(() => {
    if (isAdd || contentId) {
      return;
    }

    if (activeParam !== contentViewType) {
      setViewType(contentViewType, { replace: true });
      return;
    }

    if (savedViewType !== contentViewType) {
      setSavedViewType(contentViewType);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeParam, contentViewType, savedViewType, isAdd, contentId]);

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
            tabs={viewTabs}
            activeTab={contentViewType}
            onTabChange={(tab: ViewType) => setViewType(tab)}
            layoutId="activeViewTab"
            className="gap-8"
          />

          {isProMember && contentViewType !== "collections" && (
            <button
              className="text-xl dark:hover:text-white px-3 py-1 dark:text-slate-600 shadow-md rounded-full"
              onClick={() => {
                router.push(`/convos?type=add&variant=content`);
              }}
            >
              <PlusIcon />
            </button>
          )}
        </div>

        <div className="mt-8">
          {contentViewType === "collections" ? (
            <ContentCollectionsSections />
          ) : (
            <ContentsList contentViewType={contentViewType} />
          )}
        </div>
      </PageContainer>

      <FloatingNavbar />
    </main>
  );
}
