import { Editor } from "@tiptap/react";
import { TrackedCorrection } from "../types";
import { CorrectionPanelHeader } from "./CorrectionPanelHeader";
import { CorrectionPanelContent } from "./CorrectionPanelContent";

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
      <div className="bg-white dark:bg-[rgb(10,11,12)]/95 backdrop-blur-md border border-gray-200 dark:border-gray-700/60 rounded-2xl shadow-xl h-fit sticky top-4 overflow-hidden">
        <CorrectionPanelHeader
          title="Corrections"
          subtitle="AI-powered writing assistant"
          isMobile={false}
        />
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
      </div>
    </div>
  );
};
