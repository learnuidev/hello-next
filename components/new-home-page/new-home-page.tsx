"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { SearchBar } from "../search-bar";
import { TopicsList } from "./components/topics-list";
import { SeriesList } from "./components/series-list";
import { ContentList } from "./components/content-list";
import { cn } from "@/lib/utils";
import { TopicType } from "@/domain/topic/topic.types";

type TabType = "series" | "content";

interface Tab {
  type: TabType;
  title: string;
}

const tabs: Tab[] = [
  {
    title: "内容",
    type: "content",
  },
  {
    title: "系列",
    type: "series",
  },
];

export function NewHomePage() {
  const [activeTab, setActiveTab] = useState<TabType>("series");
  const searchParams = useSearchParams();
  const activeTopic = searchParams.get("topic") as TopicType | null;

  return (
    <div className="mx-2 sm:mx-12 mb-32">
      <SearchBar />

      <main className="mt-2">
        <TopicsList />

        <div className="mt-4">
          <div className="flex gap-12">
            {tabs.map((tab) => {
              return (
                <button
                  key={tab.type}
                  onClick={() => setActiveTab(tab.type)}
                  className={cn(
                    "pb-2 font-medium transition-colors",
                    activeTab === tab.type
                      ? " border-rose-500"
                      : "text-gray-600 hover:text-rose-500"
                  )}
                >
                  {tab.title}
                </button>
              );
            })}
          </div>

          <div className="mt-8">
            {activeTab === "series" ? (
              <SeriesList activeTopic={activeTopic} />
            ) : (
              <ContentList activeTopic={activeTopic} />
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
