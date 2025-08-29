import { Icons } from "@/components/ui/icons.v2";
import { useGetContentQuery } from "@/domain/content/content.queries";
import { useRef, useState } from "react";
import ReactPlayer from "react-player";
import { formatTime } from "../_play/utils";
import { useCurrentTime } from "@/components/youtube-page/use-current-time-store";
import { ActiveTranscription } from "@/components/youtube-page/active-transcription";
import { useBrightModeStore } from "@/components/settings-dialog/use-bright-mode-store";
import { Slider } from "@/components/ui/slider";

function NormalView({ currentTranscription }: { currentTranscription: any }) {
  return (
    <div>
      <p className="mb-32 text-4xl">{currentTranscription?.input}</p>
      <p className="text-xl">{currentTranscription?.en}</p>
    </div>
  );
}

export const AudiobookPlayer = ({ contentId }: { contentId: string }) => {
  const [playing, setPlaying] = useState(false);
  const [duration, setDuration] = useState(0);

  const { data: content } = useGetContentQuery({ contentId });
  const { currentTime, setCurrentTime } = useCurrentTime(contentId);

  const playerRef = useRef<any>(null);

  const handlePrevious = () => {};
  const handlePause = () => {};
  const handleNext = () => {};

  const seek = (time: any) => {
    playerRef.current.seekTo(time, "seconds");
  };

  const play = () => {
    playerRef.current?.player?.player?.play();
  };

  const pause = () => {
    playerRef.current?.player?.player?.pause();
  };

  const seekAndPlay = (time: any) => {
    seek(time);
    play();
  };

  const handlePlayPause = () => {
    if (!playing) {
      play();
    } else {
      pause();
    }
  };

  const handleSeekChange = (event: number[]) => {
    seekAndPlay(event[0]);
    console.log("event", event);
  };

  const currentTranscription = content?.transcriptions?.find(
    (transcription: any) =>
      transcription?.start <= currentTime && transcription?.end >= currentTime
  );

  const showPinyin = useBrightModeStore((state: any) => state.showPinyin);

  if (!content) {
    return;
  }

  return (
    <div>
      <div className="w-full max-w-3xl mx-auto p-4">
        <ReactPlayer
          url={content?.audio}
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          width="100%"
          height="50px"
          onReady={(data) => {
            setDuration(data.getDuration());
            // console.log("DATA", );
          }}
          playing={false}
          controls={false}
          ref={playerRef}
          onProgress={(value) => {
            // setHistory({
            //   transcriptionId: currentTranscription?.id,
            //   contextId,
            //   contentId: lessonId,
            //   createdAt: Date.now(),
            //   progressTime: value.playedSeconds,
            // });
            setCurrentTime(value.playedSeconds);
          }}
        />

        <div className="flex items-center justify-center gap-4 mt-4">
          <button
            onClick={handlePrevious}
            className="p-2 rounded-full hover:bg-gray-200"
          >
            <Icons.rewind className="text-2xl" />
          </button>

          <button onClick={handlePlayPause} className="p-3 rounded-full">
            {playing ? (
              <Icons.pause className="text-4xl" />
            ) : (
              <Icons.play className="text-4xl" />
            )}
          </button>

          <button
            onClick={handleNext}
            className="p-2 rounded-full hover:bg-gray-200"
          >
            <Icons.fastForward className="text-2xl" />
          </button>
        </div>

        <div className="flex items-center gap-4 mt-4">
          <span className="text-sm">{formatTime(currentTime)}</span>
          <Slider
            min={0}
            max={duration}
            step={1}
            defaultValue={[currentTime]}
            onValueChange={handleSeekChange}
            className="w-full"
          />
          <span className="text-sm">{formatTime(duration)}</span>
        </div>
      </div>

      <div className="text-center mt-24 max-w-5xl mx-auto">
        <NormalView currentTranscription={currentTranscription} />
      </div>
    </div>
  );
};
