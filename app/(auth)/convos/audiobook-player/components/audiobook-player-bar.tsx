import { Slider } from "@/components/ui/slider";
import { formatTime } from "../../_play/utils";

export const AudiobookPlayerBar = ({
  duration,
  currentTime,
  handleSeekChange,
}: {
  currentTime: number;
  duration: number;
  handleSeekChange: (value: number[]) => void;
}) => {
  return (
    <div className="flex items-center gap-4 sm:px-8 px-4 pb-4">
      <Slider
        min={0}
        max={duration}
        step={1}
        value={[currentTime]}
        defaultValue={[currentTime]}
        onValueChange={handleSeekChange}
        className="w-full"
        hidden
      />
      <span className="text-sm sm:text-lg sm:w-24 w-14 font-extralight">
        {formatTime(currentTime)}
      </span>
    </div>
  );
};
