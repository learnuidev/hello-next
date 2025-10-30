import { CorrectionStatus, TrackedCorrection } from "../types";

interface CorrectionTabsProps {
  activeTab: CorrectionStatus;
  onTabChange: (tab: CorrectionStatus) => void;
  trackedCorrections: TrackedCorrection[];
  isMobile?: boolean;
}

export const CorrectionTabs = ({ 
  activeTab, 
  onTabChange, 
  trackedCorrections,
  isMobile = false 
}: CorrectionTabsProps) => {
  const paddingClass = isMobile ? "py-3" : "py-2";
  const textSizeClass = isMobile ? "text-sm" : "text-xs";
  const badgeSizeClass = isMobile ? "w-5 h-5 text-sm" : "w-4 h-4 text-xs";

  return (
    <div className="flex border-b border-gray-200 dark:border-gray-700 mb-4">
      {(["pending", "applied", "denied"] as CorrectionStatus[]).map((status) => {
        const count = trackedCorrections.filter((c) => c.status === status).length;
        return (
          <button
            key={status}
            onClick={() => onTabChange(status)}
            className={`flex-1 ${paddingClass} ${textSizeClass} font-medium transition-colors relative ${
              activeTab === status
                ? "text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400"
                : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
            }`}
          >
            <span className="capitalize">{status}</span>
            {count > 0 && (
              <span className={`ml-1 inline-flex items-center justify-center ${badgeSizeClass} rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300`}>
                {count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
};
