"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Icons } from "@/components/ui/icons.v2";
import { SeriesManagement } from "./components/series-management";
import { ContentManagement } from "./components/content-management";
import { SourcesManagement } from "./components/sources-management";
import { BaseTabs } from "@/components/ui/base-tabs";

type TabType = "series" | "content" | "sources";

const tabs = [
  {
    label: "系列",
    value: "series" as TabType,
    icon: <Icons.contentSolid className="h-4 w-4" />,
  },
  {
    label: "内容",
    value: "content" as TabType,
    icon: <Icons.layerGroup className="h-4 w-4" />,
  },
  {
    label: "来源",
    value: "sources" as TabType,
    icon: <Icons.userSolid className="h-4 w-4" />,
  },
];

export default function StudioPage() {
  const [activeTab, setActiveTab] = useState<TabType>("series");

  return (
    <div className="mx-2 sm:mx-12 mb-32">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div className="mt-12">
          <h1 className="text-xl font-bold tracking-tight">Studio</h1>
          <p className="text-muted-foreground mt-1">
            管理您的内容系列、来源和管道
          </p>
        </div>
      </div>

      <BaseTabs
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        layoutId="activeTabStudio"
        className="mb-8"
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
            {activeTab === "series" && <SeriesManagement />}
            {activeTab === "content" && <ContentManagement />}
            {activeTab === "sources" && <SourcesManagement />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
