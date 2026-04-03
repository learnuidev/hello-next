import { usePlayerViewModeStore } from "@/components/youtube-page/player-view-mode-store";

const readerViewOptions = [
  { limit: 1, title: "1" },
  { limit: 2, title: "2" },
  { limit: 4, title: "4" },
];

const defaultOptions = [
  { limit: 30, title: "30s" },
  { limit: 60, title: "60s" },
  { limit: 90, title: "90s" },
  { limit: 120, title: "120s" },
  { limit: 9000, title: "All" },
];

function ActiveButton({
  limit,
  title,
  isReaderView,
}: {
  limit: number;
  title: string;
  isReaderView?: boolean;
}) {
  const active = usePlayerViewModeStore((state) => state.active);
  const setActive = usePlayerViewModeStore((state) => state.setActive);
  const activeTimeLimit = usePlayerViewModeStore(
    (state) => state.activeTimeLimit
  );
  const setActiveTimeLimit = usePlayerViewModeStore(
    (state) => state.setActiveTimeLimit
  );
  const activeLengthLimit = usePlayerViewModeStore(
    (state) => state.activeLengthLimit
  );
  const setActiveLengthLimit = usePlayerViewModeStore(
    (state) => state.setActiveLengthLimit
  );

  const activeValue = isReaderView ? activeLengthLimit : activeTimeLimit;
  const setActiveValue = isReaderView
    ? setActiveLengthLimit
    : setActiveTimeLimit;

  return (
    <button
      className={
        activeValue === limit ? "dark:text-white text-black" : "text-gray-500"
      }
      onClick={() => {
        setActiveValue(limit);
      }}
    >
      {title}
    </button>
  );
}

export const ActiveButtons = ({ isReaderView }: { isReaderView?: boolean }) => {
  const options = isReaderView ? readerViewOptions : defaultOptions;

  return (
    <div className="space-x-4 sm:text-xl flex justify-start">
      {options.map((option) => {
        return (
          <ActiveButton
            key={JSON.stringify(option)}
            {...option}
            isReaderView={isReaderView}
          />
        );
      })}
    </div>
  );
};
