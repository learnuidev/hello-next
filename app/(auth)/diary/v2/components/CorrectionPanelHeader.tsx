import { ReactNode } from "react";
import { Settings } from "lucide-react";

interface CorrectionPanelHeaderProps {
  title: string;
  subtitle: string;
  isMobile?: boolean;
  onClose?: () => void;
  children?: ReactNode;
  onToggleSettings?: () => void;
  showSettingsButton?: boolean;
}

export const CorrectionPanelHeader = ({
  title,
  subtitle,
  isMobile = false,
  onClose,
  children,
  onToggleSettings,
  showSettingsButton = false,
}: CorrectionPanelHeaderProps) => {
  const headerClass = isMobile
    ? "sticky top-0 bg-[rgb(10,11,12)]/95 dark:bg-gray-900/95 border-b border-gray-700/80 z-10"
    : "px-5 py-4 border-b border-gray-200 dark:border-gray-700/80";

  const containerClass = isMobile
    ? "px-4 py-4 flex items-center justify-between"
    : "flex items-center justify-between";

  const titleClass = isMobile
    ? "text-base font-semibold text-gray-900 dark:text-gray-100"
    : "text-sm font-semibold text-gray-900 dark:text-gray-100";

  const subtitleClass = isMobile
    ? "text-sm text-gray-600 dark:text-gray-400 mt-0.5"
    : "text-xs dark:text-gray-400 text-gray-700 mt-0.5";

  return (
    <div className={headerClass}>
      <div className={containerClass}>
        <div>
          <h3 className={titleClass}>{title}</h3>
          <p className={subtitleClass}>{subtitle}</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={onToggleSettings}
            className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
            title="Settings"
          >
            <Settings className="w-4 h-4" />
          </button>

          {onClose && (
            <button
              onClick={onClose}
              className="text-gray-600 dark:text-gray-400 hover:text-gray-300 dark:hover:text-gray-200 transition-colors p-1"
            >
              <svg
                className={`w-${isMobile ? 6 : 5} h-${isMobile ? 6 : 5}`}
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
          )}
        </div>
      </div>
      {children}
    </div>
  );
};
