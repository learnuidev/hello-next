import { useCorrectionSettingsStore } from "../stores/useCorrectionSettingsStore";

interface SettingsPanelProps {
  isMobile?: boolean;
  onBack?: () => void;
}

const LANGUAGES = [
  { code: "en-US", name: "English (US)" },
  { code: "en-UK", name: "English (UK)" },
  { code: "en-CA", name: "English (CA)" },
  { code: "en-JM", name: "English (Jamaican)" },
  { code: "en-PIRATE", name: "English (Pirate)" },
  { code: "en-SNOOP-DOGG", name: "English (Snoop Dogg)" },
  { code: "en-JACKIE-CHAN", name: "English (Jackie Chan)" },
  { code: "zh-CN", name: "Chinese (Mainland)" },
  { code: "zh-TW", name: "Chinese (Taiwan)" },
  { code: "es", name: "Spanish" },
  { code: "fr", name: "French" },
  { code: "de", name: "German" },
  { code: "ja", name: "Japanese" },
  { code: "ko", name: "Korean" },
  { code: "pt", name: "Portuguese" },
  { code: "ru", name: "Russian" },
  { code: "ar", name: "Arabic" },
];

export const SettingsPanel = ({
  isMobile = false,
  onBack,
}: SettingsPanelProps) => {
  const { sourceLang, targetLang, setSourceLang, setTargetLang } =
    useCorrectionSettingsStore();

  const containerClass = isMobile ? "px-4 py-4" : "px-5 py-4";

  const headerClass = isMobile
    ? "flex items-center gap-3 mb-4"
    : "flex items-center gap-2 mb-3";

  const titleClass = isMobile
    ? "text-lg font-semibold text-gray-900 dark:text-gray-100"
    : "text-sm font-semibold text-gray-900 dark:text-gray-100";

  const labelClass =
    "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2";
  const selectClass =
    "w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100";
  const infoClass =
    "bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-md p-3";
  const buttonClass =
    "text-gray-600 dark:text-gray-400 hover:text-gray-300 dark:hover:text-gray-200 transition-colors p-1";

  return (
    <div className={containerClass}>
      <div className="space-y-4">
        {/* Source Language */}
        <div>
          <label className={labelClass}>Source Language</label>
          <select
            value={sourceLang}
            onChange={(e) => setSourceLang(e.target.value)}
            className={selectClass}
          >
            {LANGUAGES.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.name}
              </option>
            ))}
          </select>
        </div>

        {/* Target Language */}
        <div>
          <label className={labelClass}>Target Language</label>
          <select
            value={targetLang}
            onChange={(e) => setTargetLang(e.target.value)}
            className={selectClass}
          >
            {LANGUAGES.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.name}
              </option>
            ))}
          </select>
        </div>

        {/* Info */}
        <div className={infoClass}>
          <p className="text-sm text-blue-800 dark:text-blue-200">
            These settings control the language pairs used for text corrections.
            Changes will apply to new corrections.
          </p>
        </div>
      </div>
    </div>
  );
};
