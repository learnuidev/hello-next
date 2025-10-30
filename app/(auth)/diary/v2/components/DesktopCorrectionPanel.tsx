import { useState } from "react";
import { Editor } from "@tiptap/react";
import { TrackedCorrection } from "../types";
import { CorrectionPanelHeader } from "./CorrectionPanelHeader";
import { CorrectionPanelContent } from "./CorrectionPanelContent";
import { SettingsPanel } from "./SettingsPanel";

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
  const [showSettings, setShowSettings] = useState(false);

  const toggleSettings = () => {
    setShowSettings(!showSettings);
  };

  return (
    <div className="w-80">
      <div className="bg-white dark:bg-[rgb(10,11,12)]/95 backdrop-blur-md border border-gray-200 dark:border-gray-700/60 rounded-2xl shadow-xl h-fit sticky top-4 overflow-hidden">
        <CorrectionPanelHeader
          title={showSettings ? "Settings" : "Corrections"}
          subtitle={showSettings ? "Language settings for corrections" : "AI-powered writing assistant"}
          isMobile={false}
          onToggleSettings={toggleSettings}
          showSettingsButton={!showSettings}
        />
        {showSettings ? (
          <SettingsPanel isMobile={false} onBack={toggleSettings} />
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
            isMobile={false}
          />
        )}
      </div>
    </div>
  );
};
