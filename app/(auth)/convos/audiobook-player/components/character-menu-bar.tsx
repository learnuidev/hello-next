import { Icons } from "@/components/ui/icons.v2";
import { cn } from "@/lib/utils";
import { useCallback, useEffect, useRef, useState } from "react";
import { useCharacterMenuBarStore } from "../hooks/use-character-menu-bar";
import { MiniDictionary } from "./mini-dictionary";

export function CharacterMenuBar({
  seekAndPlay,
  contentId,
  lang,
}: {
  seekAndPlay?: (time: number) => void;
  contentId?: string;
  lang?: string;
}) {
  const { show, text, position, startTime, hideMenuBar } =
    useCharacterMenuBarStore();
  const menuRef = useRef<HTMLDivElement>(null);
  const [dragOffset, setDragOffset] = useState<{ x: number; y: number } | null>(null);
  const isDragging = useRef(false);

  const onMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if ((e.target as HTMLElement).closest("button, a")) return;
      isDragging.current = true;
      setDragOffset({
        x: e.clientX - position.x,
        y: e.clientY - position.y,
      });
      e.preventDefault();
    },
    [position]
  );

  useEffect(() => {
    if (!dragOffset) return;

    function onMouseMove(e: MouseEvent) {
      if (!isDragging.current || !dragOffset) return;
      useCharacterMenuBarStore.setState({
        position: {
          x: e.clientX - dragOffset.x,
          y: e.clientY - dragOffset.y,
        },
      });
    }

    function onMouseUp() {
      isDragging.current = false;
      setDragOffset(null);
    }

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };
  }, [dragOffset]);

  if (!show || !text || !lang) return null;

  return (
    <div
      ref={menuRef}
      onMouseDown={onMouseDown}
      className={cn(
        "fixed z-50 bg-white dark:bg-gray-900 border dark:border-gray-700 border-gray-200 rounded-lg shadow-lg max-w-[500px] max-h-[80vh] overflow-y-auto",
        dragOffset ? "cursor-grabbing" : "cursor-grab"
      )}
      style={{
        left: position.x,
        top: position.y,
      }}
    >
      {startTime !== null && seekAndPlay && (
        <div className="border-b dark:border-gray-700 border-gray-200">
          <button
            className="flex items-center gap-3 w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-800 text-sm"
            onClick={() => {
              seekAndPlay(startTime);
            }}
          >
            <Icons.play />
            <span>Play from here</span>
          </button>
        </div>
      )}

      <MiniDictionary
        contentId={contentId}
        selected={text}
        lang={lang}
      />
    </div>
  );
}
