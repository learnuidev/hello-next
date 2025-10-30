import { useState } from "react";
import { Editor } from "@tiptap/react";
import { TrackedCorrection } from "../types";
import { CorrectionPanelHeader } from "./CorrectionPanelHeader";
import { CorrectionPanelContent } from "./CorrectionPanelContent";
import { SettingsPanel } from "./SettingsPanel";

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
  const [showSettings, setShowSettings] = useState(false);

  const handleApplyAll = () => {
    filteredTrackedCorrections
      .filter((c) => c.status === "pending")
      .forEach((correction) => {
        applySingleChange(
          correction.id,
          correction.original,
          correction.correction
        );
      });
  };

  const handleRejectAll = () => {
    filteredTrackedCorrections
      .filter((c) => c.status === "pending")
      .forEach((correction) => {
        denyCorrection(correction.id);
      });
  };

  const toggleSettings = () => {
    setShowSettings(!showSettings);
  };

  const pendingCount = filteredTrackedCorrections.filter((c) => c.status === "pending").length;
  const showActionButtons = pendingCount > 0;

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
        className={`fixed top-0 right-0 h-full w-full sm:w-80 bg-white dark:bg-[rgb(10,11,12)]/95 backdrop-blur-md border-l border-gray-200 dark:border-gray-700/60 shadow-2xl z-50 transform transition-transform duration-300 ease-in-out overflow-hidden ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <CorrectionPanelHeader
          title={showSettings ? "Settings" : "Corrections"}
          subtitle={showSettings ? "Language settings for corrections" : "AI-powered writing assistant"}
          isMobile={true}
          onClose={toggleMobileMenu}
          onToggleSettings={toggleSettings}
          showSettingsButton={!showSettings}
        />
        
        {showSettings ? (
          <SettingsPanel isMobile={true} onBack={toggleSettings} />
        ) : (
          <CorrectionPanelContent
            correctionsMutation={correctionsMutation}
            filteredTrackedCorrections={filteredTrackedCorrections}
            usingCachedResult={usingCachedResult}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            editor={editor}
            applySingleChange={applySingleChange}
            denyCorrection={denyCorrection}
            isMobile={true}
            showApplyAllButton={showActionButtons}
            showRejectAllButton={showActionButtons}
            onApplyAll={handleApplyAll}
            onRejectAll={handleRejectAll}
          />
        )}
      </div>
    </>
  );
};
