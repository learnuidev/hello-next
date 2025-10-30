import { useMutation } from "@tanstack/react-query";
import { Editor } from "@tiptap/react";
import { useCallback, useRef, useEffect, useState } from "react";
import { useJwtToken } from "@/app/next/features/html-parser/hooks/use-jwt-token";
import {
  ListCorrectionsRequest,
  ListCorrectionsResponse,
  TrackedCorrection,
} from "../types";
import {
  getCachedCorrection,
  addToCache,
  shouldAnalyzeContent,
  CacheEntry,
} from "../correction-cache";

export const useListCorrectionsMutation = () => {
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

export const useCorrections = (editor: Editor | null) => {
  const [corrections, setCorrections] = useState<ListCorrectionsResponse | null>(null);
  const [trackedCorrections, setTrackedCorrections] = useState<TrackedCorrection[]>([]);
  const [contentCache, setContentCache] = useState<CacheEntry[]>([]);
  const [usingCachedResult, setUsingCachedResult] = useState(false);
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  const correctionsMutation = useListCorrectionsMutation();

  const handleCorrectionResponse = useCallback(
    (response: ListCorrectionsResponse, content?: string, isFromCache: boolean = false) => {
      setCorrections(response);
      setUsingCachedResult(isFromCache);

      // Add new corrections to tracked list with pending status
      const newTrackedCorrections: TrackedCorrection[] = response.details.map(
        (detail, index) => ({
          ...detail,
          id: `${Date.now()}-${index}`,
          status: "pending",
          timestamp: new Date(),
        })
      );

      setTrackedCorrections((prev) => [...newTrackedCorrections, ...prev]);

      // Add to cache if content is provided and not from cache
      if (content && !isFromCache) {
        setContentCache((prev) => addToCache(content, response, prev));
      }
    },
    []
  );

  const handleEditorUpdate = useCallback(() => {
    if (!editor) return;

    const content = editor.getText();

    // Clear existing timer
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    // Set new timer to check for corrections after user stops typing
    debounceTimerRef.current = setTimeout(() => {
      console.log("Debounced update triggered, content length:", content.length);
      if (shouldAnalyzeContent(content)) {
        console.log("Content passed analysis check");
        // Check cache first
        const cachedResponse = getCachedCorrection(content, contentCache);
        if (cachedResponse) {
          console.log("Using cached response");
          // Use cached response
          handleCorrectionResponse(cachedResponse, content, true);
        } else {
          console.log("Making API call for content:", content.substring(0, 50) + "...");
          // Make API call
          correctionsMutation.mutate({ content });
        }
      } else {
        console.log("Content too short to analyze");
      }
    }, 1000);
  }, [editor, contentCache, handleCorrectionResponse, correctionsMutation]);

  const handleEnterKey = useCallback(() => {
    if (!editor) return;

    const content = editor.getText();
    console.log("Enter key pressed, content length:", content.length);
    if (shouldAnalyzeContent(content)) {
      console.log("Content passed analysis check on Enter");
      // Check cache first
      const cachedResponse = getCachedCorrection(content, contentCache);
      if (cachedResponse) {
        console.log("Using cached response on Enter");
        // Use cached response
        handleCorrectionResponse(cachedResponse, content, true);
      } else {
        console.log("Making API call on Enter for content:", content.substring(0, 50) + "...");
        // Make API call
        correctionsMutation.mutate({ content });
      }
    } else {
      console.log("Content too short to analyze on Enter");
    }
  }, [editor, contentCache, handleCorrectionResponse, correctionsMutation]);

  const applyCorrection = useCallback((correction: string) => {
    if (editor) {
      // Use commands.setContent to properly update the editor
      editor.chain().focus().setContent(correction, false).run();
    }
  }, [editor]);

  const applySingleChange = useCallback(
    (correctionId: string, original: string, corrected: string) => {
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
    },
    [editor]
  );

  const denyCorrection = useCallback((correctionId: string) => {
    // Update the status of this correction to denied
    setTrackedCorrections((prev) =>
      prev.map((c) =>
        c.id === correctionId
          ? { ...c, status: "denied", timestamp: new Date() }
          : c
      )
    );
  }, []);

  // Update corrections when mutation succeeds
  useEffect(() => {
    if (correctionsMutation.isSuccess && correctionsMutation.data) {
      // Get the content that was analyzed
      const content = editor?.getText() || "";
      handleCorrectionResponse(correctionsMutation.data, content, false);
    }
  }, [
    correctionsMutation.isSuccess,
    correctionsMutation.data,
    editor,
    handleCorrectionResponse,
  ]);

  const filteredTrackedCorrections = trackedCorrections.filter(
    (item) => item?.original !== item?.correction
  );

  return {
    corrections,
    correctionsMutation,
    trackedCorrections,
    filteredTrackedCorrections,
    usingCachedResult,
    handleEditorUpdate,
    handleEnterKey,
    applyCorrection,
    applySingleChange,
    denyCorrection,
  };
};
