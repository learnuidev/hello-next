"use client";

import { TopicType } from "@/domain/topic/topic.types";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { SearchBar } from "../search-bar";
import { BaseTopicsList } from "../ui/base-topics-list";
import { BaseTabs } from "../ui/base-tabs";
import { ContentList } from "./components/content-list";
import { SeriesList } from "./components/series-list";
import { PageContainer } from "../page-container";

type TabType = "series" | "content";

const tabs = [
  {
    label: "内容",
    value: "content" as TabType,
  },
  {
    label: "系列",
    value: "series" as TabType,
  },
];

export function NewHomePage() {
  const searchParams = useSearchParams();
  const activeTopicSearchParams = (searchParams.get("topic") ||
    "recommendation") as TopicType;

  const [activeTopic, setActiveTopic] = useState<TopicType>(
    () => activeTopicSearchParams
  );
  const [activeTab, setActiveTab] = useState<TabType>("series");

  const router = useRouter();

  const handleTopicClick = (topicType: TopicType) => {
    setActiveTopic(topicType);
    router.push(`/?topic=${topicType}`);
  };

  return (
    <PageContainer>
      <SearchBar />

      <main className="mt-2">
        <BaseTopicsList
          activeTopic={activeTopic}
          onTopicClick={handleTopicClick}
          layoutId="activeTopic"
          variant="link"
          animate={true}
        />

        <div className="mt-4">
          <BaseTabs
            tabs={tabs}
            activeTab={activeTab}
            onTabChange={setActiveTab}
            layoutId="activeTab"
          />

          <div className="mt-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {activeTab === "series" ? (
                  <SeriesList activeTopic={activeTopic} />
                ) : (
                  <ContentList activeTopic={activeTopic} />
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </main>
    </PageContainer>
  );
}
