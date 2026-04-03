"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useInsightsSettingsStore, ConvoInsightsTab } from "../use-insights-settings-store";

const tabs = [
  { label: "字", value: "character" as ConvoInsightsTab },
  { label: "词", value: "word" as ConvoInsightsTab },
  { label: "句子", value: "sentence" as ConvoInsightsTab },
];

export function ConvoInsightsTabs() {
  const activeTab = useInsightsSettingsStore((state) => state.type);
  const setActiveTab = useInsightsSettingsStore((state) => state.setType);

  return (
    <div className="flex gap-12">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.value;
        return (
          <motion.button
            key={tab.value}
            onClick={() => setActiveTab(tab.value)}
            className="pb-2 text-lg sm:text-md font-medium transition-colors relative flex items-center gap-2 text-gray-600 hover:text-rose-500"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {tab.label}
            {isActive && (
              <motion.div
                layoutId="activeInsightsTab"
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
  );
}
