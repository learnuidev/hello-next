"use client";

import { Icons } from "@/components/ui/icons.v2";
import { cn } from "@/lib/utils";
import { useState } from "react";

import { encodeReaderSubtitleFile } from "../utils/encode-reader-subtitle-file";
import {
  decodeReaderSubtitleBytes,
  parseReaderSubtitles,
  readerSubtitleText,
} from "../utils/parse-reader-subtitles";

/** What a subtitle file turns into: an item's text, plus the times of its lines. */
export interface ReaderSubtitleUpload {
  /**
   * The title the file name suggests. Like a fetched url's title, it is only a
   * suggestion — the reader's own title wins once they have typed one.
   */
  title: string;
  /** The lines of the file, one cue per line. */
  text: string;
  fileName: string;
  /** When each of those lines is said, in milliseconds. */
  cueStarts: number[];
  cueEnds: number[];
  /**
   * The file itself, as base64 — the API keeps the original beside the text it
   * was made into, so the reader can always get their file back.
   */
  file: { name: string; content: string };
}

/**
 * A film's subtitles are a few hundred kilobytes; this is not a film. The limit
 * is the API's too (`MAX_SUBTITLE_FILE_BYTES`): the file travels as base64
 * inside the request that saves the text, and a request is not a file transfer.
 */
const MAX_FILE_BYTES = 4 * 1024 * 1024;

const SUBTITLE_EXTENSIONS = ".srt,.vtt,.webvtt,.ass,.ssa";

/**
 * A file name as a title.
 *
 * Subtitle files are named after the release they were cut for —
 * `Movie.2019.1080p.WEB-DL.zh.srt` — so the dots and underscores are the
 * separators of a title rather than part of it.
 */
const titleFromFileName = (fileName: string) =>
  fileName
    .replace(/\.[^.]+$/, "")
    .replace(/[._]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();

/**
 * Handing the reader a subtitle file.
 *
 * The file is read and parsed here, in the browser, and what comes back is the
 * text of the file: one line per cue, ready to be read and edited before it is
 * saved. The reader's own copy of the file stays on their machine — it is handed
 * up with the text when the text is saved, which is the only moment the original
 * is worth keeping. A file that cannot be read says why in place, rather than
 * replacing what the reader has already typed.
 */
export const AddReaderSubtitles = ({
  onParsed,
  className,
}: {
  onParsed: (upload: ReaderSubtitleUpload) => void;
  className?: string;
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isReading, setIsReading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFile = async (file: File) => {
    setError(null);

    if (file.size > MAX_FILE_BYTES) {
      setError("That file is too large to be a subtitle file.");
      return;
    }

    setIsReading(true);

    try {
      const bytes = await file.arrayBuffer();

      const parsed = parseReaderSubtitles(
        decodeReaderSubtitleBytes(bytes),
        file.name,
      );

      onParsed({
        title: titleFromFileName(file.name),
        text: readerSubtitleText(parsed.cues),
        fileName: file.name,
        cueStarts: parsed.cues.map((cue) => cue.start),
        cueEnds: parsed.cues.map((cue) => cue.end),
        file: {
          name: file.name,
          content: encodeReaderSubtitleFile(new Uint8Array(bytes)),
        },
      });
    } catch (parseError) {
      setError(
        parseError instanceof Error
          ? parseError.message
          : "Could not read that file.",
      );
    } finally {
      setIsReading(false);
    }
  };

  return (
    <div className={className}>
      <label
        onDragOver={(event) => {
          event.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => {
          setIsDragging(false);
        }}
        onDrop={(event) => {
          event.preventDefault();
          setIsDragging(false);

          const file = event.dataTransfer.files?.[0];

          if (file) {
            handleFile(file);
          }
        }}
        className={cn(
          "flex flex-col items-center justify-center gap-2 border-[1px] border-dashed px-6 py-12 text-center transition cursor-pointer",
          isDragging
            ? "border-rose-400 text-rose-400"
            : "border-gray-300 dark:border-gray-800 text-gray-400 hover:text-rose-400 dark:hover:text-white",
        )}
      >
        <input
          type="file"
          accept={SUBTITLE_EXTENSIONS}
          className="hidden"
          onChange={(event) => {
            const file = event.target.files?.[0];

            // Cleared so that picking the same file twice is still a change.
            event.target.value = "";

            if (file) {
              handleFile(file);
            }
          }}
        />

        {isReading ? (
          <Icons.spinner className="animate-spin text-2xl" />
        ) : (
          <Icons.upload className="text-2xl" />
        )}

        <p className="uppercase text-xs tracking-wider">
          {isReading ? "Reading the file…" : "Drop a subtitle file, or pick one"}
        </p>

        <p className="text-xs text-gray-500">
          SRT, VTT or ASS — every line of the film becomes a line to read.
        </p>
      </label>

      {error && <p className="mt-3 text-sm text-rose-500">{error}</p>}
    </div>
  );
};
