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
  defaultTopic,
  defaultViewType,
  isViewType,
  topicQueryParam,
  viewTabs,
  ViewType,
} from "./view-tabs";
import { BaseTopicsList } from "@/components/ui/base-topics-list";
import { SeriesList } from "@/components/new-home-page/components/series-list";
import { TopicType } from "@/domain/topic/topic.types";
import { topicsList } from "@/domain/topic/topic.constants";

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

const isTopicType = (value: string | null | undefined): value is TopicType =>
  !!value && topicsList.some((topic) => topic.type === value);

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
  const topicParam = searchParams.get(topicQueryParam);

  // The URL wins, then the saved preference, then the default tab.
  const contentViewType: ViewType = isViewType(activeParam)
    ? activeParam
    : isViewType(savedViewType)
      ? savedViewType
      : defaultViewType;

  const activeTopic: TopicType = isTopicType(topicParam)
    ? topicParam
    : defaultTopic;

  const handleTopicClick = (topicType: TopicType) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(activeTabQueryParam, "series");
    params.set(topicQueryParam, topicType);

    router.push(`/convos?${params.toString()}`);
  };

  const setViewType = (viewType: ViewType) => {
    setSavedViewType(viewType);

    const params = new URLSearchParams(searchParams.toString());
    params.set(activeTabQueryParam, viewType);

    router.push(`/convos?${params.toString()}`);
  };

  // Whatever tab is showing, the URL and the saved preference should say so.
  useEffect(() => {
    if (isAdd || contentId) {
      return;
    }

    const needsTabParam = activeParam !== contentViewType;
    const needsTopicParam =
      contentViewType === "series" && topicParam !== activeTopic;

    if (needsTabParam || needsTopicParam) {
      const params = new URLSearchParams(searchParams.toString());
      params.set(activeTabQueryParam, contentViewType);

      if (contentViewType === "series") {
        params.set(topicQueryParam, activeTopic);
      }

      setSavedViewType(contentViewType);
      router.replace(`/convos?${params.toString()}`);
      return;
    }

    if (savedViewType !== contentViewType) {
      setSavedViewType(contentViewType);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    activeParam,
    contentViewType,
    savedViewType,
    topicParam,
    activeTopic,
    isAdd,
    contentId,
  ]);

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

          {isProMember &&
            contentViewType !== "collections" &&
            contentViewType !== "series" && (
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
          {contentViewType === "series" ? (
            <div>
              <BaseTopicsList
                activeTopic={activeTopic}
                onTopicClick={handleTopicClick}
                layoutId="activeTopicTab"
                variant="button"
                animate
                buttonClassName="text-lg sm:text-md"
              />

              <div className="mt-8">
                <SeriesList activeTopic={activeTopic} />
              </div>
            </div>
          ) : contentViewType === "collections" ? (
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
