"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/ui/icons.v2";
import { SeriesManagement } from "./components/series-management";
import { ContentManagement } from "./components/content-management";
import { SourcesManagement } from "./components/sources-management";
import { cn } from "@/lib/utils";

type TabType = "series" | "content" | "sources";

interface Tab {
  type: TabType;
  title: string;
  icon: React.ReactNode;
}

const tabs: Tab[] = [
  {
    title: "系列",
    type: "series",
    icon: <Icons.contentSolid className="h-4 w-4" />,
  },
  {
    title: "内容",
    type: "content",
    icon: <Icons.layerGroup className="h-4 w-4" />,
  },
  {
    title: "来源",
    type: "sources",
    icon: <Icons.userSolid className="h-4 w-4" />,
  },
];

export default function StudioPage() {
  const [activeTab, setActiveTab] = useState<TabType>("series");

  return (
    <div className="mx-2 sm:mx-12 mb-32">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Studio</h1>
          <p className="text-muted-foreground mt-1">
            管理您的内容系列、来源和管道
          </p>
        </div>
      </div>

      <div className="flex gap-12 mb-8">
        {tabs.map((tab) => {
          return (
            <motion.button
              key={tab.type}
              onClick={() => setActiveTab(tab.type)}
              className={cn(
                "pb-2 font-medium transition-colors relative flex items-center gap-2",
                activeTab === tab.type
                  ? " border-rose-500"
                  : "text-gray-600 hover:text-rose-500",
              )}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {tab.icon}
              {tab.title}
              {activeTab === tab.type && (
                <motion.div
                  layoutId="activeTabStudio"
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
            transition={{ duration: 0.3 }}
          >
            {activeTab === "series" && <SeriesManagement />}
            {activeTab === "content" && <ContentManagement />}
            {activeTab === "sources" && <SourcesManagement />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
