import { TrackedCorrection } from "../types";
import { formatTime } from "../utils/format-time";

interface CorrectionItemProps {
  correction: TrackedCorrection;
  isMobile?: boolean;
  onApply: (id: string, original: string, corrected: string) => void;
  onDeny: (id: string) => void;
}

export const CorrectionItem = ({ correction, isMobile = false, onApply, onDeny }: CorrectionItemProps) => {
  const handleClick = () => {
    if (correction.status === "pending") {
      onApply(correction.id, correction.original, correction.correction);
    }
  };

  const handleDenyClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDeny(correction.id);
  };

  return (
    <div
      className={`rounded-lg p-3 border transition-all ${
        correction.status === "applied"
          ? "bg-green-900/30 border-green-700/50 opacity-75"
          : correction.status === "denied"
            ? "bg-red-900/30 border-red-700/50 opacity-75"
            : "dark:bg-gray-800/50 border-gray-700 hover:border-blue-600/50 cursor-pointer"
      }`}
      onClick={handleClick}
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
              <span className="text-xs text-gray-600">!</span>
            </div>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <p className="text-sm text-gray-600 dark:text-gray-400 line-through truncate">
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
            onClick={handleDenyClick}
            className="text-xs text-gray-600 dark:text-gray-400 hover:text-red-400 flex-shrink-0"
          >
            Deny
          </button>
        )}
      </div>
    </div>
  );
};
