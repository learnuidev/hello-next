import { useFontSizeStore } from "../hooks/use-font-size";

export const FontSizeControls = () => {
  const { fontSize, increaseFontSize, decreaseFontSize } = useFontSizeStore();

  return (
    <div className="flex items-center space-x-2">
      <button
        className="text-gray-500 hover:text-black dark:hover:text-white transition-colors"
        onClick={decreaseFontSize}
        aria-label="Decrease font size"
      >
        A
      </button>
      <span> |</span>
      <button
        className="text-xl text-gray-500 hover:text-black dark:hover:text-white transition-colors"
        onClick={increaseFontSize}
        aria-label="Increase font size"
      >
        A
      </button>
    </div>
  );
};
