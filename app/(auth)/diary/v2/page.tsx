"use client";

import { useEffect, useRef, useState } from "react";
import { useJwtToken } from "@/app/next/features/html-parser/hooks/use-jwt-token";
import { defaultExtensions } from "@/components/Editor/extensions";
import { useMutation } from "@tanstack/react-query";
import { EditorContent, useEditor } from "@tiptap/react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Loader2, CheckCircle, AlertCircle } from "lucide-react";

interface ListCorrectionsRequest {
  content: string;
  sourceLang?: string;
  targetLang?: string;
}

type CorrectionDetail = {
  original: string;
  correction: string;
};

type ListCorrectionsResponse = {
  correction: string;
  details: CorrectionDetail[];
};

const useListCorrectionsMutation = () => {
  const jwt = useJwtToken();

  return useMutation({
    mutationFn: async ({ content }: ListCorrectionsRequest) => {
      const response = await fetch("/api/list-corrections", {
        method: "POST",
        headers: {
          Authorization: `${jwt}`,
        },
        body: JSON.stringify({ content, sourceLang: "en", targetLang: "zh" }),
      });

      return (await response.json()) as ListCorrectionsResponse;
    },
  });
};

type CorrectionStatus = "pending" | "applied" | "denied";

type TrackedCorrection = CorrectionDetail & {
  id: string;
  status: CorrectionStatus;
  timestamp: Date;
};

type CacheEntry = {
  content: string;
  timestamp: Date;
  response: ListCorrectionsResponse;
};

export default function Diary() {
  const [corrections, setCorrections] =
    useState<ListCorrectionsResponse | null>(null);
  const [isCorrectionPanelOpen, setIsCorrectionPanelOpen] = useState(true);
  const [trackedCorrections, setTrackedCorrections] = useState<
    TrackedCorrection[]
  >([]);
  const [activeTab, setActiveTab] = useState<CorrectionStatus>("pending");
  const [contentCache, setContentCache] = useState<CacheEntry[]>([]);
  const [usingCachedResult, setUsingCachedResult] = useState(false);
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  const correctionsMutation = useListCorrectionsMutation();

  const editor = useEditor({
    autofocus: false,
    extensions: [...defaultExtensions],
    content: "",
    onUpdate: ({ editor }) => {
      const content = editor.getText();

      // Clear existing timer
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }

      // Set new timer to check for corrections after user stops typing
      debounceTimerRef.current = setTimeout(() => {
        console.log(
          "Debounced update triggered, content length:",
          content.length
        );
        if (shouldAnalyzeContent(content)) {
          console.log("Content passed analysis check");
          // Check cache first
          const cachedResponse = getCachedCorrection(content);
          if (cachedResponse) {
            console.log("Using cached response");
            // Use cached response
            handleCorrectionResponse(cachedResponse, content, true);
          } else {
            console.log(
              "Making API call for content:",
              content.substring(0, 50) + "..."
            );
            // Make API call
            correctionsMutation.mutate({ content });
          }
        } else {
          console.log("Content too short to analyze");
        }
      }, 1000);
    },
    // @ts-ignore
    onKeyDown: ({ event }: any) => {
      // Trigger correction immediately when Enter is pressed
      if (event.key === "Enter") {
        const content = editor.getText();
        console.log("Enter key pressed, content length:", content.length);
        if (shouldAnalyzeContent(content)) {
          console.log("Content passed analysis check on Enter");
          // Check cache first
          const cachedResponse = getCachedCorrection(content);
          if (cachedResponse) {
            console.log("Using cached response on Enter");
            // Use cached response
            handleCorrectionResponse(cachedResponse, content, true);
          } else {
            console.log(
              "Making API call on Enter for content:",
              content.substring(0, 50) + "..."
            );
            // Make API call
            correctionsMutation.mutate({ content });
          }
        } else {
          console.log("Content too short to analyze on Enter");
        }
      }
    },
  });

  const handleCorrectionResponse = (
    response: ListCorrectionsResponse,
    content?: string,
    isFromCache: boolean = false
  ) => {
    setCorrections(response);
    setUsingCachedResult(isFromCache);

    // Add new corrections to tracked list with pending status
    const newTrackedCorrections: TrackedCorrection[] = response.details.map(
      (detail, index) => ({
        ...detail,
        id: `${Date.now()}-${index}`,
        status: "pending" as CorrectionStatus,
        timestamp: new Date(),
      })
    );

    setTrackedCorrections((prev) => [...newTrackedCorrections, ...prev]);

    // Add to cache if content is provided and not from cache
    if (content && !isFromCache) {
      addToCache(content, response);
    }
  };

  useEffect(() => {
    // Update corrections when mutation succeeds
    if (correctionsMutation.isSuccess && correctionsMutation.data) {
      // Get the content that was analyzed
      const content = editor?.getText() || "";
      handleCorrectionResponse(correctionsMutation.data, content, false);
    }
  }, [correctionsMutation.isSuccess, correctionsMutation.data, editor]);

  const applyCorrection = (correction: string) => {
    if (editor) {
      // Use commands.setContent to properly update the editor
      editor.chain().focus().setContent(correction, false).run();
    }
  };

  const applySingleChange = (
    correctionId: string,
    original: string,
    corrected: string
  ) => {
    if (editor) {
      const currentText = editor.getText();
      const correctedText = currentText.replace(original, corrected);
      editor.chain().focus().setContent(correctedText, false).run();

      // Update the status of this correction to applied
      setTrackedCorrections((prev) =>
        prev.map((c) =>
          c.id === correctionId
            ? { ...c, status: "applied", timestamp: new Date() }
            : c
        )
      );
    }
  };

  const denyCorrection = (correctionId: string) => {
    // Update the status of this correction to denied
    setTrackedCorrections((prev) =>
      prev.map((c) =>
        c.id === correctionId
          ? { ...c, status: "denied", timestamp: new Date() }
          : c
      )
    );
  };

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

  // Normalize content for better caching (remove extra whitespace, normalize line breaks)
  const normalizeContent = (content: string): string => {
    return content
      .replace(/\s+/g, " ") // Replace multiple whitespace with single space
      .replace(/\n\s*\n/g, "\n\n") // Normalize multiple line breaks
      .trim(); // Remove leading/trailing whitespace
  };

  // Check if content is already in cache (and not expired)
  const getCachedCorrection = (
    content: string
  ): ListCorrectionsResponse | null => {
    // Use exact match first for better precision
    const now = new Date();
    const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes cache TTL

    // First check for exact match
    for (const entry of contentCache) {
      if (
        entry.content === content &&
        now.getTime() - entry.timestamp.getTime() < CACHE_TTL_MS
      ) {
        return entry.response;
      }
    }

    // Then check for normalized match only if exact match not found
    const normalized = normalizeContent(content);
    for (const entry of contentCache) {
      if (
        normalizeContent(entry.content) === normalized &&
        now.getTime() - entry.timestamp.getTime() < CACHE_TTL_MS
      ) {
        return entry.response;
      }
    }

    return null;
  };

  // Add content to cache
  const addToCache = (content: string, response: ListCorrectionsResponse) => {
    setContentCache((prev) => [
      { content, timestamp: new Date(), response },
      // Keep only last 10 cached entries to prevent memory bloat
      ...prev.slice(0, 9),
    ]);
  };

  // Check if content is meaningful enough to analyze
  const shouldAnalyzeContent = (content: string): boolean => {
    const normalized = normalizeContent(content);
    // Only analyze if there are at least 5 words (lowered from 10)
    return (
      normalized.split(/\s+/).filter((word) => word.length > 0).length >= 5
    );
  };

  const filteredTrackedCorrections = trackedCorrections.filter(
    (item) => item?.original !== item?.correction
  );

  console.log("filteredTrackedCorrections", filteredTrackedCorrections);

  return (
    <div className="flex max-w-7xl m-auto mt-12 px-4 gap-6">
      {/* Main editor area */}
      <div className="flex-1">
        <h1 className="font-bold mb-12">the diary</h1>
        <EditorContent editor={editor} />
      </div>

      {/* Corrections sidebar */}
      <div className="w-80">
        <div className="bg-[rgb(10,11,12)]/95 backdrop-blur-md border border-gray-700/60 rounded-2xl shadow-xl h-fit sticky top-4 overflow-hidden dark:bg-[rgb(10,11,12)]/95 dark:border-gray-700/60">
            {/* Header */}
            <div className="px-5 py-4 border-b border-gray-700/80 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-semibold text-gray-100">
                  Corrections
                </h3>
                <p className="text-xs text-gray-400 mt-0.5">
                  AI-powered writing assistant
                </p>
              </div>
              <button
                onClick={() => setIsCorrectionPanelOpen(false)}
                className="text-gray-400 hover:text-gray-300 transition-colors"
              >
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
                  <span className="text-sm text-gray-300">
                    Analyzing text...
                  </span>
                </div>
              ) : correctionsMutation.isError ? (
                <div className="flex flex-col items-center py-8">
                  <AlertCircle className="h-8 w-8 text-red-400 mb-2" />
                  <span className="text-sm text-gray-300">
                    Unable to analyze
                  </span>
                </div>
              ) : filteredTrackedCorrections.length > 0 ? (
                <div>
                  {/* Cache indicator */}
                  {usingCachedResult && (
                    <div className="flex items-center gap-2 text-xs text-gray-400 mb-4">
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
                  <div className="flex border-b border-gray-700 mb-4">
                    {(
                      ["pending", "applied", "denied"] as CorrectionStatus[]
                    ).map((status) => {
                      const count = filteredTrackedCorrections.filter(
                        (c) => c.status === status
                      ).length;
                      return (
                        <button
                          key={status}
                          onClick={() => setActiveTab(status)}
                          className={`flex-1 py-2 text-xs font-medium transition-colors relative ${
                            activeTab === status
                              ? "text-blue-400 border-b-2 border-blue-400"
                              : "text-gray-400 hover:text-gray-200"
                          }`}
                        >
                          <span className="capitalize">{status}</span>
                          {count > 0 && (
                            <span className="ml-1 inline-flex items-center justify-center w-4 h-4 text-xs rounded-full bg-gray-700 text-gray-300">
                              {count}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* Corrections list */}
                  <div className="space-y-2">
                    {filteredTrackedCorrections
                      .filter((c) => c.status === activeTab)

                      .slice(0, 5)
                      .map((correction) => (
                        <div
                          key={correction.id}
                          className={`rounded-lg p-3 border transition-all ${
                            correction.status === "applied"
                              ? "bg-green-900/30 border-green-700/50 opacity-75"
                              : correction.status === "denied"
                                ? "bg-red-900/30 border-red-700/50 opacity-75"
                                : "bg-gray-800/50 border-gray-700 hover:border-blue-600/50 cursor-pointer"
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
                            <div className="flex-shrink-0 mt-0.5">
                              {correction.status === "applied" ? (
                                <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
                                  <svg
                                    className="w-3 h-3 text-white"
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
                                <div className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center">
                                  <svg
                                    className="w-3 h-3 text-white"
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
                                <div className="w-5 h-5 rounded-full bg-gray-300 flex items-center justify-center">
                                  <span className="text-xs text-gray-600">
                                    !
                                  </span>
                                </div>
                              )}
                            </div>

                            <div className="flex-1 min-w-0">
                              <p className="text-sm text-gray-400 line-through truncate">
                                {correction.original}
                              </p>
                              <p className="text-sm text-gray-200 truncate">
                                {correction.correction}
                              </p>
                              <p className="text-xs text-gray-500 mt-1">
                                {correction.status === "applied"
                                  ? `Applied ${formatTime(correction.timestamp)}`
                                  : correction.status === "denied"
                                    ? `Denied ${formatTime(correction.timestamp)}`
                                    : "Click to apply"}
                              </p>
                            </div>

                            {correction.status === "pending" && (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  denyCorrection(correction.id);
                                }}
                                className="text-xs text-gray-400 hover:text-red-400 flex-shrink-0"
                              >
                                Deny
                              </button>
                            )}
                          </div>
                        </div>
                      ))}

                    {filteredTrackedCorrections.filter(
                      (c) => c.status === activeTab
                    ).length > 5 && (
                      <p className="text-xs text-gray-500 text-center py-2">
                        +
                        {filteredTrackedCorrections.filter(
                          (c) => c.status === activeTab
                        ).length - 5}{" "}
                        more
                      </p>
                    )}
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center py-8">
                  <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center mb-3">
                    <CheckCircle className="h-6 w-6 text-green-500" />
                  </div>
                  <p className="text-sm font-medium text-gray-100">Perfect!</p>
                  <p className="text-xs text-gray-400 mt-1">
                    No corrections needed
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

      
    </div>
  );
}
