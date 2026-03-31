"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
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
  const searchParams = useSearchParams();
  const activeTopicSearchParams = (searchParams.get("topic") ||
    "recommendation") as TopicType;

  const [activeTopic, setActiveTopic] = useState<TopicType>(
    () => activeTopicSearchParams
  );
  const [activeTab, setActiveTab] = useState<TabType>("series");

  return (
    <div className="mx-2 sm:mx-12 mb-32">
      <SearchBar />

      <main className="mt-2">
        <TopicsList
          activeTopic={activeTopic}
          setActiveTopic={(topic: TopicType) => setActiveTopic(topic)}
        />

        <div className="mt-4">
          <div className="flex gap-12">
            {tabs.map((tab) => {
              return (
                <motion.button
                  key={tab.type}
                  onClick={() => setActiveTab(tab.type)}
                  className={cn(
                    "pb-2 font-medium transition-colors relative",
                    activeTab === tab.type
                      ? " border-rose-500"
                      : "text-gray-600 hover:text-rose-500"
                  )}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {tab.title}
                  {activeTab === tab.type && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-rose-500"
                      initial={false}
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 30,
                      }}
                    />
                  )}
                </motion.button>
              );
            })}
          </div>

          <div className="mt-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 1 }}
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
    </div>
  );
}
