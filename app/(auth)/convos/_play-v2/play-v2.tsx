// import { useMusic } from "@/components/music";
import { useGetContentQuery } from "@/domain/content/content.queries";
import { useMusic } from "../_play/use-music";
import { useMusicV2 } from "./use-music-v2";
import { Icons } from "@/components/ui/icons.v2";
import { formatTime } from "../_play/utils";
import { TranscriptItem } from "../_play/transcript-item";
import { Transcription } from "@/domain/transcribe/transcribe.types";
import { useBrightModeStore } from "@/components/settings-dialog/use-bright-mode-store";

export const PlayV2 = ({ contentId }: { contentId: string }) => {
  const { data: content } = useGetContentQuery({ contentId });

  const audioUrl = content?.audio?.slow || content?.audio;
  const brightMode = useBrightModeStore((state: any) => state.mode);

  const { isPlaying, togglePlay, seek, currentTime, reset } = useMusicV2({
    url: audioUrl,
  });

  return (
    <div className="w-full">
      <div className="flex items-center justify-between w-full">
        <h1 className="text-2xl leading-9">{content?.title}</h1>{" "}
        <div className="flex space-x-8">
          <div className="space-x-4">
            <button
              className="text-2xl"
              onClick={() => {
                togglePlay();
              }}
            >
              {isPlaying ? <Icons.pause /> : <Icons.play />}
            </button>
            <button
              className="text-2xl"
              onClick={() => {
                reset();
              }}
            >
              <Icons.stop />
            </button>
          </div>

          <p className="w-16 font-extralight text-2xl text-center dark:text-slate-300 text-slate-600">
            {formatTime(currentTime)}
          </p>
        </div>
      </div>

      <div className="pt-12 space-y-12 mb-12">
        {content?.transcriptions?.map((transcription: Transcription) => {
          return (
            <TranscriptItem
              lang={content?.lang}
              key={`${transcription?.hanzi || transcription?.input}-${transcription?.pinyin}`}
              transcription={transcription}
              seek={seek}
              audioUrl={audioUrl}
              currentTime={currentTime}
              pinyinMode={brightMode}
              lessonId={content?.id}
            />
          );
        })}
      </div>
    </div>
  );
};
