"use client";

import { defaultExtensions } from "@/components/Editor/extensions";
import { EditorContent, useEditor } from "@tiptap/react";
import { useEffect } from "react";
import { DesktopCorrectionPanel } from "./components/DesktopCorrectionPanel";
import { MobileCorrectionPanel } from "./components/MobileCorrectionPanel";
import { MobileMenuButton } from "./components/MobileMenuButton";
import { useCorrectionPanel } from "./hooks/use-correction-panel";
import { useCorrections } from "./hooks/use-corrections";
import { useMobileDetection } from "./hooks/use-mobile-detection";

export default function Diary() {
  const isMobile = useMobileDetection();
  const {
    isCorrectionPanelOpen,
    setIsCorrectionPanelOpen,
    isMobileMenuOpen,
    setIsMobileMenuOpen,
    isMobileMenuAnimating,
    toggleMobileMenu,
    activeTab,
    setActiveTab,
  } = useCorrectionPanel();

  const editor = useEditor({
    autofocus: true,
    extensions: [...defaultExtensions],
    content: "",
  });

  const {
    correctionsMutation,
    filteredTrackedCorrections,
    usingCachedResult,
    handleEditorUpdate,
    handleEnterKey,
    applySingleChange,
    denyCorrection,
  } = useCorrections(editor);

  useEffect(() => {
    if (editor) {
      editor.on("update", handleEditorUpdate);
      // @ts-ignore
      editor.on("keydown", handleEnterKey);

      return () => {
        editor.off("update", handleEditorUpdate);
        // @ts-ignore
        editor.off("keydown", handleEnterKey);
      };
    }
  }, [editor, handleEditorUpdate, handleEnterKey]);

  // Auto-open mobile corrections panel when new corrections are available
  useEffect(() => {
    if (
      isMobile &&
      correctionsMutation.isSuccess &&
      correctionsMutation.data?.details.length > 0
    ) {
      setIsMobileMenuOpen(true);
    }
  }, [
    isMobile,
    correctionsMutation.isSuccess,
    correctionsMutation.data,
    setIsMobileMenuOpen,
  ]);

  return (
    <div className="flex flex-col md:flex-row max-w-7xl m-auto mt-12 px-4 gap-6 bg-white dark:bg-transparent">
      {/* Main editor area */}
      <div className="flex-1">
        <div className="flex justify-between items-center mb-6 md:mb-16">
          <h1 className="font-bold text-2xl md:text-3xl">the diary</h1>

          {/* Mobile corrections button */}
          {isMobile && (
            <MobileMenuButton
              toggleMobileMenu={toggleMobileMenu}
              pendingCorrectionsCount={
                filteredTrackedCorrections.filter((c) => c.status === "pending")
                  .length
              }
            />
          )}
        </div>
        <div className="lg:text-xl text-[16px]">
          <EditorContent
            autoFocus
            editor={editor}
            placeholder="Record something"
          />
        </div>
      </div>

      {/* Desktop sidebar */}
      {!isMobile && (
        <DesktopCorrectionPanel
          correctionsMutation={correctionsMutation}
          filteredTrackedCorrections={filteredTrackedCorrections}
          usingCachedResult={usingCachedResult}
          activeTab={activeTab}
          setActiveTab={setActiveTab as (tab: string) => void}
          editor={editor}
          applySingleChange={applySingleChange}
          denyCorrection={denyCorrection}
        />
      )}

      {/* Mobile sidebar */}
      {isMobile && (
        <MobileCorrectionPanel
          correctionsMutation={correctionsMutation}
          filteredTrackedCorrections={filteredTrackedCorrections}
          usingCachedResult={usingCachedResult}
          activeTab={activeTab}
          setActiveTab={setActiveTab as (tab: string) => void}
          editor={editor}
          applySingleChange={applySingleChange}
          denyCorrection={denyCorrection}
          isMobileMenuOpen={isMobileMenuOpen}
          isMobileMenuAnimating={isMobileMenuAnimating}
          toggleMobileMenu={toggleMobileMenu}
        />
      )}
    </div>
  );
}
