import { cn } from "@/lib/utils";
import { usePreviewMode } from "./use-preview-mode";
import { Icons } from "../ui/icons.v2";

function RenderIcon({ currentMode }: any) {
  if (currentMode.current === "focus") {
    return <Icons.lightBulbDuotone className="fill-sky-600" />;
  }

  if (currentMode.current === "normal") {
    return <Icons.bookOpenDuotone />;
  }

  if (currentMode.current === "melanin") {
    return <Icons.fireDuoTone />;
  }
}

export const PreviewButton = ({ className }: { className?: string }) => {
  const { currentMode, setNextMode } = usePreviewMode();

  return (
    <button
      className={cn("text-2xl w-5", "dark:text-white text-black", className)}
      onClick={() => {
        setNextMode();
      }}
    >
      <RenderIcon currentMode={currentMode} />
    </button>
  );
};
