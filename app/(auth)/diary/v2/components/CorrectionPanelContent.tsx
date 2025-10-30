import { AlertCircle, CheckCircle, Loader2 } from "lucide-react";
import { Editor } from "@tiptap/react";
import { TrackedCorrection } from "../types";
import { CorrectionItem } from "./CorrectionItem";
import { CorrectionTabs } from "./CorrectionTabs";

interface CorrectionPanelContentProps {
  correctionsMutation: any;
  filteredTrackedCorrections: TrackedCorrection[];
  usingCachedResult: boolean;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  editor: Editor | null;
  applySingleChange: (id: string, original: string, corrected: string) => void;
  denyCorrection: (id: string) => void;
  isMobile?: boolean;
  showApplyAllButton?: boolean;
  showRejectAllButton?: boolean;
  onApplyAll?: () => void;
  onRejectAll?: () => void;
}

export const CorrectionPanelContent = ({
  correctionsMutation,
  filteredTrackedCorrections,
  usingCachedResult,
  activeTab,
  setActiveTab,
  editor,
  applySingleChange,
  denyCorrection,
  isMobile = false,
  showApplyAllButton = false,
  showRejectAllButton = false,
  onApplyAll,
  onRejectAll,
}: CorrectionPanelContentProps) => {
  const contentClass = isMobile
    ? "px-4 py-4 h-full overflow-y-auto pb-20"
    : "px-5 py-4";

  const containerClass = isMobile
    ? "rounded-xl p-4 border"
    : "rounded-lg p-3 border";

  const statusClass = (status: string) => {
    if (status === "applied") {
      return "bg-green-100 dark:bg-green-900/30 border-green-200 dark:border-green-700/50 opacity-75";
    }
    if (status === "denied") {
      return "bg-red-100 dark:bg-red-900/30 border-red-200 dark:border-red-700/50 opacity-75";
    }
    return "bg-white dark:bg-gray-800/50 border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600/50 cursor-pointer";
  };

  const iconSize = isMobile ? { w: 6, h: 4 } : { w: 5, h: 3 };
  const textSize = isMobile ? "text-base" : "text-sm";
  const spacing = isMobile ? "space-y-3" : "space-y-2";

  const pendingCount = filteredTrackedCorrections.filter(
    (c) => c.status === "pending"
  ).length;

  return (
    <div className={contentClass}>
      {/* Apply all button (mobile only) */}
      {isMobile && showApplyAllButton && pendingCount > 0 && (
        <div className="mb-4">
          <button
            onClick={onApplyAll}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            Apply All ({pendingCount})
          </button>
        </div>
      )}

      {/* Deny all button (mobile only) */}
      {isMobile && showRejectAllButton && pendingCount > 0 && (
        <div className="mb-6">
          <button
            onClick={onRejectAll}
            className="w-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 py-2 px-4 rounded-lg text-sm transition-colors"
          >
            Reject All
          </button>
        </div>
      )}

      {/* Content based on state */}
      {correctionsMutation.isPending ? (
        <div
          className={`flex flex-col items-center justify-center py-${isMobile ? 12 : 8}`}
        >
          <Loader2
            className={`h-${isMobile ? 8 : 6} w-${isMobile ? 8 : 6} animate-spin text-blue-500 mb-${isMobile ? 4 : 3}`}
          />
          <span className={`${textSize} text-gray-600 dark:text-gray-300`}>
            Checking for corrections...
          </span>
        </div>
      ) : correctionsMutation.isError ? (
        <div className={`flex flex-col items-center py-${isMobile ? 8 : 6}`}>
          <AlertCircle
            className={`h-${isMobile ? 12 : 8} w-${isMobile ? 12 : 8} text-red-400 mb-${isMobile ? 3 : 2}`}
          />
          <span className={`${textSize} text-gray-600 dark:text-gray-300`}>
            Unable to analyze
          </span>
        </div>
      ) : filteredTrackedCorrections.length > 0 ? (
        <div>
          {/* Cache indicator */}
          {usingCachedResult && (
            <div
              className={`flex items-center gap-2 ${isMobile ? "text-sm" : "text-xs"} text-gray-500 dark:text-gray-400 mb-${isMobile ? 6 : 4}`}
            >
              <svg
                className={`w-${isMobile ? 4 : 3} h-${isMobile ? 4 : 3}`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                  clipRule="evenodd"
                />
              </svg>
              <span>Using cached results</span>
            </div>
          )}

          {/* Tabs */}
          <CorrectionTabs
            activeTab={activeTab as any}
            onTabChange={setActiveTab}
            trackedCorrections={filteredTrackedCorrections}
            isMobile={isMobile}
          />

          {/* Corrections list */}
          <div className={spacing}>
            {filteredTrackedCorrections.filter((c) => c.status === activeTab)
              .length === 0 &&
            editor?.getText()?.trim() &&
            activeTab === "pending" ? (
              <div
                className={`flex flex-col items-center py-${isMobile ? 8 : 6}`}
              >
                <div
                  className={`w-${isMobile ? 16 : 10} h-${isMobile ? 16 : 10} bg-gray-100 dark:bg-gray-800/50 rounded-full flex items-center justify-center mb-${isMobile ? 4 : 2}`}
                >
                  <svg
                    className={`h-${isMobile ? 8 : 5} w-${isMobile ? 8 : 5} text-gray-500 dark:text-gray-400`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <p className={`${textSize} text-gray-600 dark:text-gray-400`}>
                  No pending suggestions
                </p>
                <p
                  className={`text-xs text-gray-500 dark:text-gray-500 mt-${isMobile ? 2 : 1}`}
                >
                  Keep writing or check applied/denied tabs
                </p>
              </div>
            ) : filteredTrackedCorrections.filter((c) => c.status === activeTab)
                .length === 0 &&
              editor?.getText()?.trim() &&
              (activeTab === "applied" || activeTab === "denied") ? (
              <div
                className={`flex flex-col items-center py-${isMobile ? 8 : 6}`}
              >
                <div
                  className={`w-${isMobile ? 16 : 10} h-${isMobile ? 16 : 10} bg-gray-100 dark:bg-gray-800/50 rounded-full flex items-center justify-center mb-${isMobile ? 4 : 2}`}
                >
                  <svg
                    className={`h-${isMobile ? 8 : 5} w-${isMobile ? 8 : 5} text-gray-500 dark:text-gray-400`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                    />
                  </svg>
                </div>
                <p className={`${textSize} text-gray-600 dark:text-gray-400`}>
                  No {activeTab} corrections
                </p>
                <p
                  className={`text-xs text-gray-500 dark:text-gray-500 mt-${isMobile ? 2 : 1}`}
                >
                  Switch to another tab to see more
                </p>
              </div>
            ) : (
              filteredTrackedCorrections
                .filter((c) => c.status === activeTab)
                .slice(0, isMobile ? undefined : 5)
                .map((correction) => (
                  <div
                    key={correction.id}
                    className={`${statusClass(correction.status)} transition-all`}
                    onClick={() => {
                      if (correction.status === "pending") {
                        applySingleChange(
                          correction.id,
                          correction.original,
                          correction.correction
                        );
                      }
                    }}
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 mt-1">
                        {correction.status === "applied" ? (
                          <div
                            className={`w-${iconSize.w} h-${iconSize.h} rounded-full bg-green-500 flex items-center justify-center`}
                          >
                            <svg
                              className={`w-${iconSize.w - 2} h-${iconSize.h - 1} text-white`}
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                        ) : correction.status === "denied" ? (
                          <div
                            className={`w-${iconSize.w} h-${iconSize.h} rounded-full bg-red-500 flex items-center justify-center`}
                          >
                            <svg
                              className={`w-${iconSize.w - 2} h-${iconSize.h - 1} text-white`}
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                        ) : (
                          <div
                            className={`w-${iconSize.w} h-${iconSize.h} rounded-full bg-gray-400 dark:bg-gray-500 flex items-center justify-center`}
                          >
                            <span
                              className={`text-xs text-gray-100 dark:text-gray-300`}
                            >
                              !
                            </span>
                          </div>
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <p
                          className={`${textSize} text-gray-500 dark:text-gray-400 line-through ${isMobile ? "mb-1" : "truncate"}`}
                        >
                          {correction.original}
                        </p>
                        <p
                          className={`${textSize} text-gray-900 dark:text-gray-200 ${isMobile ? "mb-2" : "truncate"}`}
                        >
                          {correction.correction}
                        </p>
                        <p
                          className={`text-xs text-gray-500 dark:text-gray-500 mt-${isMobile ? 1 : 0}`}
                        >
                          {correction.status === "applied"
                            ? `Applied ${formatTime(correction.timestamp)}`
                            : correction.status === "denied"
                              ? `Denied ${formatTime(correction.timestamp)}`
                              : isMobile
                                ? "Tap to apply"
                                : "Click to apply"}
                        </p>
                      </div>

                      {correction.status === "pending" && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            denyCorrection(correction.id);
                          }}
                          className={`${isMobile ? "text-sm" : "text-xs"} text-gray-500 dark:text-gray-400 hover:text-red-500 flex-shrink-0 ${isMobile ? "py-1 px-2 border border-gray-300 dark:border-gray-600 rounded-md" : ""}`}
                        >
                          {isMobile ? "Reject" : "Deny"}
                        </button>
                      )}
                    </div>
                  </div>
                ))
            )}

            {!isMobile &&
              filteredTrackedCorrections.filter((c) => c.status === activeTab)
                .length > 5 && (
                <p className="text-xs text-gray-500 dark:text-gray-500 text-center py-2">
                  +
                  {filteredTrackedCorrections.filter(
                    (c) => c.status === activeTab
                  ).length - 5}{" "}
                  more
                </p>
              )}
          </div>
        </div>
      ) : !editor?.getText()?.trim() ? (
        <div className={`flex flex-col items-center py-${isMobile ? 12 : 8}`}>
          <div
            className={`w-${isMobile ? 20 : 12} h-${isMobile ? 20 : 12} bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-${isMobile ? 6 : 3}`}
          >
            <svg
              className={`h-${isMobile ? 10 : 6} w-${isMobile ? 10 : 6} text-blue-500`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
          </div>
          <p
            className={`${textSize} font-medium text-gray-900 dark:text-gray-100 ${isMobile ? "mb-2" : ""}`}
          >
            Start writing
          </p>
          <p
            className={`text-xs text-gray-600 dark:text-gray-400 ${isMobile ? "text-center px-8" : "mt-1"}`}
          >
            Your corrections will appear here
          </p>
        </div>
      ) : (
        <div className={`flex flex-col items-center py-${isMobile ? 12 : 8}`}>
          <div
            className={`w-${isMobile ? 20 : 12} h-${isMobile ? 20 : 12} bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-${isMobile ? 6 : 3}`}
          >
            <CheckCircle
              className={`h-${isMobile ? 10 : 6} w-${isMobile ? 10 : 6} text-green-500`}
            />
          </div>
          <p
            className={`${textSize} font-medium text-gray-900 dark:text-gray-100 ${isMobile ? "mb-2" : ""}`}
          >
            Perfect!
          </p>
          <p
            className={`text-xs text-gray-600 dark:text-gray-400 ${isMobile ? "" : "mt-1"}`}
          >
            No corrections needed
          </p>
        </div>
      )}
    </div>
  );
};

// Helper function for formatting time
const formatTime = (date: Date) => {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);

  if (minutes < 1) return "just now";
  if (minutes === 1) return "1 min ago";
  if (minutes < 60) return `${minutes} mins ago`;

  const hours = Math.floor(minutes / 60);
  if (hours === 1) return "1 hour ago";
  if (hours < 24) return `${hours} hours ago`;

  const days = Math.floor(hours / 24);
  if (days === 1) return "1 day ago";
  return `${days} days ago`;
};
