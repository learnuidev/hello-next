import { usePlayerViewModeStore } from "@/components/youtube-page/player-view-mode-store";

const MAX_LIMIT = 9000;
const THIRTY = 30;
const SIXTY = 60;
const NINTY = 90;

export const ActiveButtons = () => {
  const active = usePlayerViewModeStore((state) => state.active);
  const setActive = usePlayerViewModeStore((state) => state.setActive);

  return (
    <div className="space-x-4 sm:text-xl flex justify-start">
      <button
        className={
          active === THIRTY ? "dark:text-white text-black" : "text-gray-500"
        }
        onClick={() => {
          setActive(THIRTY);
        }}
      >
        30s
      </button>
      <button
        className={
          active === SIXTY ? "dark:text-white text-black" : "text-gray-500"
        }
        onClick={() => {
          setActive(SIXTY);
        }}
      >
        60s
      </button>
      <button
        className={
          active === NINTY ? "dark:text-white text-black" : "text-gray-500"
        }
        onClick={() => {
          setActive(NINTY);
        }}
      >
        90s
      </button>
      <button
        className={
          active === 120 ? "dark:text-white text-black" : "text-gray-500"
        }
        onClick={() => {
          setActive(120);
        }}
      >
        120s
      </button>
      <button
        className={
          active === 9000 ? "dark:text-white text-black" : "text-gray-500"
        }
        onClick={() => {
          setActive(MAX_LIMIT);
        }}
      >
        All
      </button>
    </div>
  );
};
