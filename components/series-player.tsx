"use client";

import { Button } from "@/components/ui/button";
import { Icons } from "@/components/ui/icons.v2";
import { SeriesContentDetails } from "@/domain/content-v2/series-content-details.types";
import { cn } from "@/lib/utils";
import { useState, useRef, useEffect, useCallback } from "react";
import { useAudioBookState } from "@/app/(auth)/convos/audiobook-player/hooks/use-audiobook-state";
import { ContentTranscription, IContent } from "@/domain/content/content.api";
import ReactPlayer from "react-player";

interface SeriesPlayerProps {
  content: SeriesContentDetails | null;
  onClose: () => void;
}

export function SeriesPlayer({ content, onClose }: SeriesPlayerProps) {
  const icontent: any = content;

  const [showTranscription, setShowTranscription] = useState(true);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [transcriptionPosition, setTranscriptionPosition] = useState({
    x: 16,
    y: 80,
  });
  const [dragOffset, setDragOffset] = useState<{ x: number; y: number } | null>(
    null,
  );
  const isDragging = useRef(false);
  const transcriptionRef = useRef<HTMLDivElement>(null);

  const {
    seekAndPlay,
    setLoop,
    loop,
    setPlaying,
    playing,
    currentTranscription,
    containsChinglish,
    playerRef,
    seekBefore,
    handlePlayPause,
    seekAfter,
    currentTime,
    setCurrentTime,
    onReady,
  } = useAudioBookState(icontent || ({} as IContent));

  const onMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if ((e.target as HTMLElement).closest("button, a")) return;
      isDragging.current = true;
      setDragOffset({
        x: e.clientX - transcriptionPosition.x,
        y: e.clientY - transcriptionPosition.y,
      });
      e.preventDefault();
    },
    [transcriptionPosition],
  );

  useEffect(() => {
    if (!dragOffset || isFullScreen) return;

    function onMouseMove(e: MouseEvent) {
      if (!isDragging.current || !dragOffset) return;
      setTranscriptionPosition({
        x: e.clientX - dragOffset.x,
        y: e.clientY - dragOffset.y,
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
  }, [dragOffset, isFullScreen]);

  if (!content) return null;

  const currentTranscriptionIndex = content.transcriptions?.findIndex(
    (trans) => trans === currentTranscription,
  );

  const renderPlayerControls = () => (
    <div className="flex items-center gap-3 flex-1 min-w-0">
      <button
        onClick={handlePlayPause}
        className="flex-shrink-0 w-10 h-10 rounded-full bg-gray-900 dark:bg-white hover:bg-gray-700 dark:hover:bg-gray-200 flex items-center justify-center transition-all"
      >
        {playing ? (
          <Icons.pause className="h-5 w-5 text-white dark:text-gray-900" />
        ) : (
          <Icons.play className="h-5 w-5 text-white dark:text-gray-900 ml-0.5" />
        )}
      </button>

      <div className="flex-1 min-w-0">
        <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-50 truncate">
          {content.title}
        </h3>
        {currentTranscription && "hanzi" in currentTranscription ? (
          <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
            {currentTranscription.hanzi}
          </p>
        ) : null}
      </div>

      <div className="flex items-center gap-2 flex-shrink-0">
        <Button
          variant="ghost"
          size="sm"
          onClick={seekBefore}
          disabled={currentTranscriptionIndex === 0}
          className="h-8 w-8 p-0"
        >
          <Icons.rotateLeft className="h-4 w-4" />
        </Button>

        <Button
          variant="ghost"
          size="sm"
          onClick={seekAfter}
          disabled={
            currentTranscriptionIndex === undefined ||
            currentTranscriptionIndex >=
              (content.transcriptions?.length || 0) - 1
          }
          className="h-8 w-8 p-0"
        >
          <Icons.rotateRight className="h-4 w-4" />
        </Button>

        <Button
          variant="ghost"
          size="sm"
          onClick={() => setLoop(loop ? null : currentTranscription)}
          className={cn("h-8 w-8 p-0", loop && "bg-gray-200 dark:bg-gray-800")}
        >
          <Icons.loop className="h-4 w-4" />
        </Button>

        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowTranscription(!showTranscription)}
          className={cn(
            "h-8 w-8 p-0",
            showTranscription && "bg-gray-200 dark:bg-gray-800",
          )}
        >
          <Icons.list className="h-4 w-4" />
        </Button>

        <Button
          variant="ghost"
          size="sm"
          onClick={onClose}
          className="h-8 w-8 p-0"
        >
          <Icons.xMark className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );

  if (isFullScreen) {
    return (
      <div className="fixed inset-0 bg-white dark:bg-gray-900 z-[100] flex flex-col">
        <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-800 px-4 py-3 bg-gray-50 dark:bg-gray-800">
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
              Transcription{" "}
              {currentTranscriptionIndex !== undefined
                ? currentTranscriptionIndex + 1
                : 0}{" "}
              / {content.transcriptions?.length || 0}
            </span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsFullScreen(false)}
            className="h-8 w-8 p-0"
          >
            <Icons.arrowDown className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto p-8">
          <div className="max-w-4xl mx-auto">
            {!currentTranscription ? (
              <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-4">
                No transcriptions available
              </p>
            ) : "hanzi" in currentTranscription ? (
              <div className="space-y-6">
                <p className="text-2xl font-medium text-gray-900 dark:text-gray-50 leading-relaxed">
                  {currentTranscription.hanzi}
                </p>
                <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                  {currentTranscription.pinyin}
                </p>
                <p className="text-lg text-gray-500 dark:text-gray-500 italic leading-relaxed">
                  {currentTranscription.chinglish}
                </p>
                <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                  {currentTranscription.en}
                </p>
              </div>
            ) : "words" in currentTranscription ? (
              <div className="space-y-6">
                <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                  {currentTranscription.words?.map((word: any, idx: number) => (
                    <span key={idx}>{word.input} </span>
                  ))}
                </p>
              </div>
            ) : (
              <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-4">
                Transcription format not supported
              </p>
            )}
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 py-3">
            {renderPlayerControls()}
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <ReactPlayer
        key={content?.mediaUrl}
        url={content?.mediaUrl || ""}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        width="0"
        height="0"
        onReady={onReady}
        playing={false}
        controls={false}
        ref={playerRef}
        progressInterval={100}
        onProgress={(value) => {
          setCurrentTime(value.playedSeconds);
        }}
      />

      <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 shadow-lg z-50">
        <div className="max-w-7xl mx-auto px-4 py-3">
          {renderPlayerControls()}
        </div>
      </div>

      {showTranscription && (
        <div
          ref={transcriptionRef}
          onMouseDown={onMouseDown}
          className="fixed bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg shadow-2xl z-[100] overflow-hidden w-96 max-h-[400px]"
          style={{
            left: transcriptionPosition.x,
            top: transcriptionPosition.y,
            cursor: dragOffset ? "grabbing" : "grab",
          }}
        >
          <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 px-4 py-2 bg-gray-50 dark:bg-gray-800">
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                Transcription{" "}
                {currentTranscriptionIndex !== undefined
                  ? currentTranscriptionIndex + 1
                  : 0}{" "}
                / {content.transcriptions?.length || 0}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsFullScreen(true)}
                className="h-6 w-6 p-0"
                title="Full screen"
              >
                <Icons.arrowUp className="h-3 w-3" />
              </Button>
              <button
                onClick={() => setShowTranscription(false)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 ml-1"
              >
                <Icons.xMark className="h-4 w-4" />
              </button>
            </div>
          </div>
          <div className="p-4 overflow-y-auto max-h-[340px]">
            {!currentTranscription ? (
              <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-4">
                No transcriptions available
              </p>
            ) : "hanzi" in currentTranscription ? (
              <div className="space-y-3">
                <p className="text-lg font-medium text-gray-900 dark:text-gray-50">
                  {currentTranscription.hanzi}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {currentTranscription.pinyin}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-500 italic">
                  {currentTranscription.chinglish}
                </p>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  {currentTranscription.en}
                </p>
              </div>
            ) : "words" in currentTranscription ? (
              <div className="space-y-2">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {currentTranscription.words?.map((word: any, idx: number) => (
                    <span key={idx}>{word.input} </span>
                  ))}
                </p>
              </div>
            ) : (
              <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-4">
                Transcription format not supported
              </p>
            )}
          </div>
        </div>
      )}
    </>
  );
}
