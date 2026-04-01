import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { ReactNode } from "react";

export interface Tab<T extends string> {
  value: T;
  label: string;
  icon?: ReactNode;
}

export interface BaseTabsProps<T extends string> {
  tabs: Tab<T>[];
  activeTab: T;
  onTabChange: (tab: T) => void;
  layoutId?: string;
  className?: string;
  buttonClassName?: string;
  iconClassName?: string;
}

export function BaseTabs<T extends string>({
  tabs,
  activeTab,
  onTabChange,
  layoutId = "activeTab",
  className,
  buttonClassName,
  iconClassName,
}: BaseTabsProps<T>) {
  return (
    <div className={cn("flex gap-12", className)}>
      {tabs.map((tab) => {
        const isActive = activeTab === tab.value;
        return (
          <motion.button
            key={tab.value}
            onClick={() => onTabChange(tab.value)}
            className={cn(
              "pb-2 text-lg sm:text-md font-medium transition-colors relative flex items-center gap-2",
              isActive ? "text-rose-500" : "text-gray-600 hover:text-rose-500",
              buttonClassName
            )}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {tab.icon && (
              <span className={cn("inline-flex", iconClassName)}>
                {tab.icon}
              </span>
            )}
            {tab.label}
            {isActive && (
              <motion.div
                layoutId={layoutId}
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
