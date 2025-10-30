import { AlertCircle, CheckCircle, Loader2 } from "lucide-react";
import { Editor } from "@tiptap/react";
import { TrackedCorrection } from "../types";
import { CorrectionItem } from "./CorrectionItem";
import { CorrectionTabs } from "./CorrectionTabs";

interface DesktopCorrectionPanelProps {
  correctionsMutation: any;
  filteredTrackedCorrections: TrackedCorrection[];
  usingCachedResult: boolean;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  editor: Editor | null;
  applySingleChange: (id: string, original: string, corrected: string) => void;
  denyCorrection: (id: string) => void;
}

export const DesktopCorrectionPanel = ({
  correctionsMutation,
  filteredTrackedCorrections,
  usingCachedResult,
  activeTab,
  setActiveTab,
  editor,
  applySingleChange,
  denyCorrection,
}: DesktopCorrectionPanelProps) => {
  return (
    <div className="w-80">
      <div className="dark:bg-[rgb(10,11,12)]/95 backdrop-blur-md border border-gray-700/60 rounded-2xl shadow-xl h-fit sticky top-4 overflow-hidden">
        {/* Header */}
        <div className="px-5 py-4 border-b border-gray-700/80 flex items-center justify-between">
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
              Corrections
            </h3>
            <p className="text-xs dark:text-gray-400 text-gray-700 mt-0.5">
              AI-powered writing assistant
            </p>
          </div>
          <button className="text-gray-600 dark:text-gray-400 hover:text-gray-300 transition-colors">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="px-5 py-4">
          {correctionsMutation.isPending ? (
            <div className="flex flex-col items-center justify-center py-12">
              <Loader2 className="h-6 w-6 animate-spin text-blue-500 mb-3" />
              <span className="text-sm text-gray-300">Analyzing text...</span>
            </div>
          ) : correctionsMutation.isError ? (
            <div className="flex flex-col items-center py-8">
              <AlertCircle className="h-8 w-8 text-red-400 mb-2" />
              <span className="text-sm text-gray-300">Unable to analyze</span>
            </div>
          ) : filteredTrackedCorrections.length > 0 ? (
            <div>
              {/* Cache indicator */}
              {usingCachedResult && (
                <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400 mb-4">
                  <svg
                    className="w-3 h-3"
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
                isMobile={false}
              />

              {/* Corrections list */}
              <div className="space-y-2">
                {filteredTrackedCorrections.filter((c) => c.status === activeTab)
                  .length === 0 &&
                editor?.getText()?.trim() &&
                activeTab === "pending" ? (
                  <div className="flex flex-col items-center py-6">
                    <div className="w-10 h-10 dark:bg-gray-800/50 rounded-full flex items-center justify-center mb-2">
                      <svg
                        className="h-5 w-5 text-gray-600 dark:text-gray-400"
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
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      No pending suggestions
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      Keep writing or check applied/denied tabs
                    </p>
                  </div>
                ) : filteredTrackedCorrections.filter((c) => c.status === activeTab)
                    .length === 0 &&
                  editor?.getText()?.trim() &&
                  (activeTab === "applied" || activeTab === "denied") ? (
                  <div className="flex flex-col items-center py-6">
                    <div className="w-10 h-10 dark:bg-gray-800/50 rounded-full flex items-center justify-center mb-2">
                      <svg
                        className="h-5 w-5 text-gray-600 dark:text-gray-400"
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
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      No {activeTab} corrections
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      Switch to another tab to see more
                    </p>
                  </div>
                ) : (
                  filteredTrackedCorrections
                    .filter((c) => c.status === activeTab)
                    .slice(0, 5)
                    .map((correction) => (
                      <CorrectionItem
                        key={correction.id}
                        correction={correction}
                        isMobile={false}
                        onApply={applySingleChange}
                        onDeny={denyCorrection}
                      />
                    ))
                )}

                {filteredTrackedCorrections.filter((c) => c.status === activeTab)
                  .length > 5 && (
                  <p className="text-xs text-gray-500 text-center py-2">
                    +
                    {filteredTrackedCorrections.filter((c) => c.status === activeTab)
                      .length - 5}{" "}
                    more
                  </p>
                )}
              </div>
            </div>
          ) : !editor?.getText()?.trim() ? (
            <div className="flex flex-col items-center py-8">
              <div className="w-12 h-12 bg-blue-900/30 rounded-full flex items-center justify-center mb-3">
                <svg
                  className="h-6 w-6 text-blue-400"
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
              <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                Start writing
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                Your corrections will appear here
              </p>
            </div>
          ) : (
            <div className="flex flex-col items-center py-8">
              <div className="w-12 h-12 bg-green-900/30 rounded-full flex items-center justify-center mb-3">
                <CheckCircle className="h-6 w-6 text-green-500" />
              </div>
              <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                Perfect!
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                No corrections needed
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
