import { Slider } from "@/components/ui/slider";
import { formatTime } from "../../_play/utils";
import { useCallback, useRef, useState } from "react";

export const AudiobookPlayerBar = ({
  duration,
  currentTime,
  handleSeekChange,
}: {
  currentTime: number;
  duration: number;
  handleSeekChange: (value: number[]) => void;
}) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const [hoverRatio, setHoverRatio] = useState<number | null>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!trackRef.current) return;
    const rect = trackRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    setHoverRatio(x / rect.width);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setHoverRatio(null);
  }, []);

  const hoverTime = hoverRatio !== null ? hoverRatio * duration : null;
  const hoverPercent = hoverRatio !== null ? hoverRatio * 100 : 0;

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="flex items-center gap-4 sm:px-8 px-4 pb-4"
    >
      <div ref={trackRef} className="w-full relative group">
        <Slider
          hidden
          min={0}
          max={duration}
          step={1}
          value={[currentTime]}
          defaultValue={[currentTime]}
          onValueChange={handleSeekChange}
        />

        {hoverRatio !== null && (
          <>
            <div
              className="absolute top-1/2 -translate-y-1/2 left-0 h-1.5 rounded-full bg-primary/60 pointer-events-none"
              style={{ width: `${hoverPercent}%` }}
            />
            <div
              className="absolute -top-8 -translate-x-1/2 pointer-events-none px-2 py-1 rounded bg-popover text-xs font-light text-popover-foreground border shadow-md whitespace-nowrap"
              style={{ left: `${hoverPercent}%` }}
            >
              {formatTime(hoverTime)}
            </div>
          </>
        )}
      </div>
      <span className="text-sm sm:text-lg sm:w-24 w-14 font-extralight">
        {formatTime(currentTime)}
      </span>
    </div>
  );
};
