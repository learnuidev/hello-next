import { AlertCircle, CheckCircle, Loader2 } from "lucide-react";
import { Editor } from "@tiptap/react";
import { TrackedCorrection } from "../types";
import { CorrectionTabs } from "./CorrectionTabs";
import { formatTime } from "../utils/format-time";

interface MobileCorrectionPanelProps {
  correctionsMutation: any;
  filteredTrackedCorrections: TrackedCorrection[];
  usingCachedResult: boolean;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  editor: Editor | null;
  applySingleChange: (id: string, original: string, corrected: string) => void;
  denyCorrection: (id: string) => void;
  isMobileMenuOpen: boolean;
  isMobileMenuAnimating: boolean;
  toggleMobileMenu: () => void;
}

export const MobileCorrectionPanel = ({
  correctionsMutation,
  filteredTrackedCorrections,
  usingCachedResult,
  activeTab,
  setActiveTab,
  editor,
  applySingleChange,
  denyCorrection,
  isMobileMenuOpen,
  isMobileMenuAnimating,
  toggleMobileMenu,
}: MobileCorrectionPanelProps) => {
  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300 ${
          isMobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={toggleMobileMenu}
      />

      {/* Mobile corrections panel */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-80 bg-[rgb(10,11,12)]/95 backdrop-blur-md border-l border-gray-700/60 shadow-2xl z-50 transform transition-transform duration-300 ease-in-out overflow-hidden ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Mobile header */}
        <div className="sticky top-0 bg-[rgb(10,11,12)]/95 border-b border-gray-700/80 z-10">
          <div className="px-4 py-4 flex items-center justify-between">
            <div>
              <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100">
                Corrections
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-0.5">
                AI-powered writing assistant
              </p>
            </div>
            <button
              onClick={toggleMobileMenu}
              className="text-gray-600 dark:text-gray-400 hover:text-gray-300 transition-colors p-1"
            >
              <svg
                className="w-6 h-6"
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
        </div>

        {/* Mobile content */}
        <div className="px-4 py-4 h-full overflow-y-auto pb-20">
          {/* Apply all button */}
          {filteredTrackedCorrections.filter((c) => c.status === "pending")
            .length > 0 && (
            <div className="mb-4">
              <button
                onClick={() => {
                  filteredTrackedCorrections
                    .filter((c) => c.status === "pending")
                    .forEach((correction) => {
                      applySingleChange(
                        correction.id,
                        correction.original,
                        correction.correction
                      );
                    });
                }}
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
                Apply All (
                {
                  filteredTrackedCorrections.filter(
                    (c) => c.status === "pending"
                  ).length
                }
                )
              </button>
            </div>
          )}

          {/* Deny all button */}
          {filteredTrackedCorrections.filter((c) => c.status === "pending")
            .length > 0 && (
            <div className="mb-6">
              <button
                onClick={() => {
                  filteredTrackedCorrections
                    .filter((c) => c.status === "pending")
                    .forEach((correction) => {
                      denyCorrection(correction.id);
                    });
                }}
                className="w-full dark:bg-gray-700 hover:bg-gray-600 text-gray-300 py-2 px-4 rounded-lg text-sm transition-colors"
              >
                Reject All
              </button>
            </div>
          )}

          {/* Content based on state */}
          {correctionsMutation.isPending ? (
            <div className="flex flex-col items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-blue-500 mb-4" />
              <span className="text-base text-gray-300">Analyzing text...</span>
            </div>
          ) : correctionsMutation.isError ? (
            <div className="flex flex-col items-center py-8">
              <AlertCircle className="h-12 w-12 text-red-400 mb-3" />
              <span className="text-base text-gray-300">Unable to analyze</span>
            </div>
          ) : filteredTrackedCorrections.length > 0 ? (
            <div>
              {/* Cache indicator */}
              {usingCachedResult && (
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-6">
                  <svg
                    className="w-4 h-4"
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
                isMobile={true}
              />

              {/* Corrections list */}
              <div className="space-y-3">
                {filteredTrackedCorrections.filter((c) => c.status === activeTab)
                  .length === 0 &&
                editor?.getText()?.trim() &&
                activeTab === "pending" ? (
                  <div className="flex flex-col items-center py-8">
                    <div className="w-16 h-16 dark:bg-gray-800/50 rounded-full flex items-center justify-center mb-4">
                      <svg
                        className="h-8 w-8 text-gray-600 dark:text-gray-400"
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
                    <p className="text-base text-gray-600 dark:text-gray-400">
                      No pending suggestions
                    </p>
                    <p className="text-sm text-gray-500 mt-2">
                      Keep writing or check applied/denied tabs
                    </p>
                  </div>
                ) : filteredTrackedCorrections.filter((c) => c.status === activeTab)
                    .length === 0 &&
                  editor?.getText()?.trim() &&
                  (activeTab === "applied" || activeTab === "denied") ? (
                  <div className="flex flex-col items-center py-8">
                    <div className="w-16 h-16 dark:bg-gray-800/50 rounded-full flex items-center justify-center mb-4">
                      <svg
                        className="h-8 w-8 text-gray-600 dark:text-gray-400"
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
                    <p className="text-base text-gray-600 dark:text-gray-400">
                      No {activeTab} corrections
                    </p>
                    <p className="text-sm text-gray-500 mt-2">
                      Switch to another tab to see more
                    </p>
                  </div>
                ) : (
                  filteredTrackedCorrections
                    .filter((c) => c.status === activeTab)
                    .map((correction) => (
                      <div
                        key={correction.id}
                        className={`rounded-xl p-4 border transition-all ${
                          correction.status === "applied"
                            ? "bg-green-900/30 border-green-700/50 opacity-75"
                            : correction.status === "denied"
                              ? "bg-red-900/30 border-red-700/50 opacity-75"
                              : "dark:bg-gray-800/50 border-gray-700 hover:border-blue-600/50 cursor-pointer"
                        }`}
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
                              <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
                                <svg
                                  className="w-4 h-4 text-white"
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
                              <div className="w-6 h-6 rounded-full bg-red-500 flex items-center justify-center">
                                <svg
                                  className="w-4 h-4 text-white"
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
                              <div className="w-6 h-6 rounded-full bg-gray-500 flex items-center justify-center">
                                <span className="text-sm text-gray-300">!</span>
                              </div>
                            )}
                          </div>

                          <div className="flex-1 min-w-0">
                            <p className="text-base text-gray-600 dark:text-gray-400 line-through mb-1">
                              {correction.original}
                            </p>
                            <p className="text-base text-gray-200 mb-2">
                              {correction.correction}
                            </p>
                            <p className="text-sm text-gray-500">
                              {correction.status === "applied"
                                ? `Applied ${formatTime(correction.timestamp)}`
                                : correction.status === "denied"
                                  ? `Denied ${formatTime(correction.timestamp)}`
                                  : "Tap to apply"}
                            </p>
                          </div>

                          {correction.status === "pending" && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                denyCorrection(correction.id);
                              }}
                              className="text-sm text-gray-600 dark:text-gray-400 hover:text-red-400 flex-shrink-0 py-1 px-2 border border-gray-600 rounded-md"
                            >
                              Reject
                            </button>
                          )}
                        </div>
                      </div>
                    ))
                )}
              </div>
            </div>
          ) : !editor?.getText()?.trim() ? (
            <div className="flex flex-col items-center py-12">
              <div className="w-20 h-20 bg-blue-900/30 rounded-full flex items-center justify-center mb-6">
                <svg
                  className="h-10 w-10 text-blue-400"
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
              <p className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
                Start writing
              </p>
              <p className="text-base text-gray-600 dark:text-gray-400 text-center px-8">
                Your corrections will appear here as you type
              </p>
            </div>
          ) : (
            <div className="flex flex-col items-center py-12">
              <div className="w-20 h-20 bg-green-900/30 rounded-full flex items-center justify-center mb-6">
                <CheckCircle className="h-10 w-10 text-green-500" />
              </div>
              <p className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
                Perfect!
              </p>
              <p className="text-base text-gray-600 dark:text-gray-400">
                No corrections needed
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
