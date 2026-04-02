import { usePlayerViewModeStore } from "@/components/youtube-page/player-view-mode-store";

const options = [
  { limit: 30, title: "30s" },
  { limit: 60, title: "60s" },
  { limit: 90, title: "90s" },
  { limit: 120, title: "120s" },
  { limit: 9000, title: "All" },
];

function ActiveButton({ limit, title }: { limit: number; title: string }) {
  const active = usePlayerViewModeStore((state) => state.active);
  const setActive = usePlayerViewModeStore((state) => state.setActive);

  return (
    <button
      className={
        active === limit ? "dark:text-white text-black" : "text-gray-500"
      }
      onClick={() => {
        setActive(limit);
      }}
    >
      {title}
    </button>
  );
}

export const ActiveButtons = () => {
  return (
    <div className="space-x-4 sm:text-xl flex justify-start">
      {options.map((option) => {
        return <ActiveButton key={JSON.stringify(option)} {...option} />;
      })}
    </div>
  );
};
