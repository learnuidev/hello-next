"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

/**
 * The dynamic loop: a section of the recording the player keeps coming back to,
 * chosen by hand and held open by the loop button.
 *
 * The whole feature is three states:
 *
 *   off        the loop button is a plain single line loop, as it always was.
 *   selecting  a section is being chosen. Both boundaries exist (the line being
 *              played when you started), and they are dragged — or snapped to
 *              by tapping lines in the text — while the audio keeps playing so
 *              the boundaries can be auditioned.
 *   active     the section is committed and loops. This is the state you leave
 *              by holding the button again, which puts the playhead back
 *              exactly where it was before any of this started.
 *
 * Two details are worth knowing before reading the code:
 *
 * 1. The section is always expressed in *transcription lines*: a boundary snaps
 *    to the start or the end of the line it is dropped on, so the loop is
 *    always "these lines", never an arbitrary 0.37 of a sentence.
 * 2. The loop itself is enforced on the player's own clock, once per frame,
 *    rather than on the 10Hz `currentTime` React is given. A wrap has to be
 *    frame accurate or the first syllable of the next line leaks through every
 *    single time round.
 */

/** Hold the loop button this long and the dynamic loop opens. */
export const HOLD_TO_START_MS = 1000;
/** This long, while it is on, and you are taken back where you were. */
export const HOLD_TO_STOP_MS = 1000;

/** How long a wrap is left alone: a seek is not instant, and re-seeking inside
 * the same one would machine-gun the audio. */
const WRAP_SETTLE_MS = 240;
/** A jump in the clock this big is a seek, not playback. */
const SEEK_JUMP_SECONDS = 0.9;
/** The two boundaries may never touch: a shorter section is not a loop. */
const MIN_SECTION_SECONDS = 0.4;
/** Slack when asking which line a moment belongs to. */
const LINE_SLACK = 0.02;
/**
 * How far before its end the end handle lands when it is dropped. Landing on the
 * end itself would be swallowed by the wrap, so the last third of a second of
 * the section — and the join back to its start — stays audible.
 */
const END_HANDLE_TAIL_SECONDS = 0.35;

export type DynamicLoopMode = "off" | "selecting" | "active";

export type LoopBoundary = "start" | "end";

export type DynamicLoopLine = {
  /** Position in the play order, which is what "line 12" means here. */
  index: number;
  start: number;
  end: number;
  id?: string;
  text: string;
};

export type DynamicLoopRange = {
  start: number;
  end: number;
  /** The lines the two boundaries landed on, for "lines 12–18". */
  startIndex: number;
  endIndex: number;
};

export type DynamicLoop = {
  mode: DynamicLoopMode;
  range: DynamicLoopRange | null;
  /** Every timed line, in play order. */
  lines: DynamicLoopLine[];
  /** False when the content has no timings yet, or the player is not ready. */
  canLoop: boolean;
  /** Where the playhead was when the section was opened. */
  returnPosition: number | null;
  /** Open the section picker (the loop button's one second hold). */
  begin: () => void;
  /** Keep the section and start looping it (a tap while picking). */
  commit: () => void;
  /** Reopen the picker for the section already looping. */
  edit: () => void;
  /** Drop the loop and go back to where the playhead was. */
  exit: () => void;
  /** Listen to the section from its start. */
  preview: () => void;
  /** The transport's play/pause, which previews the section while picking. */
  togglePreview: () => void;
  /** Live drag: snaps to the nearest line boundary. */
  setBoundary: (which: LoopBoundary, time: number) => void;
  /** Drag released: land the audio on the boundary that was chosen. */
  settleBoundary: (which: LoopBoundary) => void;
  /** Keyboard: move a boundary one line (or `delta` lines) at a time. */
  nudgeBoundary: (which: LoopBoundary, delta: number) => void;
  /** Grow the section to take in the line a tap landed on. */
  extendTo: (time: number) => void;
};

const distanceToLine = (line: DynamicLoopLine, time: number) => {
  if (time < line.start) {
    return line.start - time;
  }

  if (time > line.end) {
    return time - line.end;
  }

  return 0;
};

export const useDynamicLoop = ({
  transcriptions,
  duration,
  currentTime,
  playing,
  playerRef,
  seek,
  play,
  pause,
  onEnter,
  onExit,
}: {
  transcriptions?: any[];
  duration: number;
  currentTime: number;
  playing: boolean;
  playerRef?: { current: any } | null;
  seek: (time: number) => void;
  play: () => void;
  pause: () => void;
  /** Called when the section picker opens, so the single line loop can stand down. */
  onEnter?: () => void;
  /** Called once the playhead is back where it was. */
  onExit?: () => void;
}): DynamicLoop => {
  const [mode, setMode] = useState<DynamicLoopMode>("off");
  const [range, setRange] = useState<DynamicLoopRange | null>(null);
  const [returnPosition, setReturnPosition] = useState<number | null>(null);

  const lines = useMemo(() => {
    const usable = (transcriptions || [])
      .filter(Boolean)
      .map((line: any) => ({
        id: line?.id,
        text: String(line?.input || line?.hanzi || ""),
        start: Math.max(0, Number(line?.start)),
        end: Number(line?.end),
      }))
      .filter(
        (line) =>
          Number.isFinite(line.start) &&
          Number.isFinite(line.end) &&
          line.end > line.start,
      )
      .map((line) => ({
        ...line,
        // A line running past the end of the file is clipped: a loop must never
        // ask the player to seek past what it has.
        end: duration > 0 ? Math.min(line.end, duration) : line.end,
      }))
      .filter((line) => line.end > line.start)
      .sort((a, b) => a.start - b.start);

    return usable.map((line, index) => ({ ...line, index }));
  }, [transcriptions, duration]);

  const canLoop = duration > 0 && lines.length > 0;

  const rangeRef = useRef<DynamicLoopRange | null>(range);
  const playingRef = useRef(playing);
  const timeRef = useRef(currentTime);
  const returnRef = useRef<{ time: number; playing: boolean } | null>(null);
  const onEnterRef = useRef(onEnter);
  const onExitRef = useRef(onExit);

  /**
   * Every change of section goes through here so the ref is written *now*,
   * before React commits. The frame loop reads the ref, which is what lets the
   * loop be dropped and the playhead put back in the same tick — a state
   * update alone would leave one more frame in which the wrap could win.
   */
  const applyRange = useCallback((next: DynamicLoopRange | null) => {
    rangeRef.current = next;
    setRange(next);
  }, []);

  useEffect(() => {
    playingRef.current = playing;
  }, [playing]);

  useEffect(() => {
    timeRef.current = currentTime;
  }, [currentTime]);

  useEffect(() => {
    onEnterRef.current = onEnter;
    onExitRef.current = onExit;
  }, [onEnter, onExit]);

  /** The player's own clock when it has one, the reported time otherwise. */
  const readTime = useCallback(() => {
    try {
      const raw = playerRef?.current?.getCurrentTime?.();

      if (typeof raw === "number" && Number.isFinite(raw)) {
        return raw;
      }
    } catch (err) {
      // A player that has not attached yet; the reported time will do.
    }

    return timeRef.current || 0;
  }, [playerRef]);

  /** Index of the last line that starts at or before `time` (-1 before them all). */
  const lineIndexAt = useCallback(
    (time: number) => {
      let low = 0;
      let high = lines.length - 1;
      let found = -1;

      while (low <= high) {
        const mid = (low + high) >> 1;

        if (lines[mid].start <= time) {
          found = mid;
          low = mid + 1;
        } else {
          high = mid - 1;
        }
      }

      return found;
    },
    [lines],
  );

  /** The line a moment belongs to, if it belongs to one at all. */
  const lineAtTime = useCallback(
    (time: number) => {
      const index = lineIndexAt(time);
      const line = index >= 0 ? lines[index] : null;

      return line && time <= line.end + LINE_SLACK ? line : null;
    },
    [lineIndexAt, lines],
  );

  /** The line closest to a moment — the fallback inside a silence. */
  const nearestLine = useCallback(
    (time: number) => {
      if (lines.length === 0) {
        return null;
      }

      const before = lineIndexAt(time);

      const candidates = [
        before >= 0 ? lines[before] : null,
        before + 1 < lines.length ? lines[before + 1] : null,
      ].filter(Boolean) as DynamicLoopLine[];

      if (candidates.length === 0) {
        return null;
      }

      return candidates.reduce((best, line) =>
        distanceToLine(line, time) < distanceToLine(best, time) ? line : best,
      );
    },
    [lineIndexAt, lines],
  );

  /**
   * Where a boundary lands when it is dropped at `time`.
   *
   * The line the moment falls inside wins outright, so dragging through the
   * middle of a long sentence still points at that sentence; only a drop into a
   * silence falls back to the nearest boundary of this boundary's own kind.
   */
  const snapBoundary = useCallback(
    (time: number, which: LoopBoundary) => {
      if (lines.length === 0) {
        return null;
      }

      const clamped = Math.max(
        0,
        Math.min(time, duration > 0 ? duration : time),
      );
      const containing = lineAtTime(clamped);

      if (containing) {
        return {
          time: which === "start" ? containing.start : containing.end,
          line: containing,
        };
      }

      const before = lineIndexAt(clamped);

      const left = before >= 0 ? lines[before] : null;
      const right = before + 1 < lines.length ? lines[before + 1] : null;

      const edge = (line: DynamicLoopLine) =>
        which === "start" ? line.start : line.end;

      const picked =
        !left || !right
          ? left || right
          : Math.abs(edge(left) - clamped) <= Math.abs(edge(right) - clamped)
            ? left
            : right;

      return picked ? { time: edge(picked), line: picked } : null;
    },
    [duration, lineAtTime, lineIndexAt, lines],
  );

  /** The line a moment sits in, for the labels on the section. */
  const indexForTime = useCallback(
    (time: number, fallback: number) => {
      const line = lineAtTime(time) ?? nearestLine(time);

      return line ? line.index : fallback;
    },
    [lineAtTime, nearestLine],
  );

  /**
   * Moves one boundary, keeping the section sane: the boundaries never cross and
   * the section never runs past the recording.
   */
  const clampRange = useCallback(
    (which: LoopBoundary, time: number, previous: DynamicLoopRange) => {
      if (which === "start") {
        const start = Math.max(
          0,
          Math.min(time, previous.end - MIN_SECTION_SECONDS),
        );

        return {
          ...previous,
          start,
          startIndex: indexForTime(start, previous.startIndex),
        };
      }

      const end = Math.min(
        duration > 0 ? duration : time,
        Math.max(time, previous.start + MIN_SECTION_SECONDS),
      );

      return {
        ...previous,
        end,
        endIndex: indexForTime(
          Math.max(previous.start, end - LINE_SLACK),
          previous.endIndex,
        ),
      };
    },
    [duration, indexForTime],
  );

  const begin = useCallback(() => {
    if (!canLoop) {
      return;
    }

    const time = readTime();
    const line = lineAtTime(time) ?? nearestLine(time) ?? lines[0];

    if (!line) {
      return;
    }

    returnRef.current = { time, playing: playingRef.current };
    setReturnPosition(time);
    // Opening on the line being played means the picker always starts from a
    // real section — one line — instead of an empty range to build up from.
    applyRange({
      start: line.start,
      end: line.end,
      startIndex: line.index,
      endIndex: line.index,
    });
    setMode("selecting");
    onEnterRef.current?.();
  }, [applyRange, canLoop, lineAtTime, lines, nearestLine, readTime]);

  const commit = useCallback(() => {
    const current = rangeRef.current;

    if (!current) {
      return;
    }

    setMode("active");
    // From the top: you asked to loop a section, so you hear all of it.
    seek(current.start);
    play();
  }, [play, seek]);

  const edit = useCallback(() => {
    if (!rangeRef.current) {
      return;
    }

    setMode("selecting");
  }, []);

  const exit = useCallback(() => {
    const back = returnRef.current;

    // Drop the section *first*: the frame loop reads the ref, so clearing it
    // here is what stops it from dragging the playhead back to the section in
    // the frame between the seek below and the next render.
    applyRange(null);
    setMode("off");
    setReturnPosition(null);

    if (back) {
      seek(
        Math.max(0, Math.min(back.time, duration > 0 ? duration : back.time)),
      );

      // The state you left is the state you come back to: playing if you were
      // playing, still paused if you were not.
      if (back.playing) {
        play();
      } else {
        pause();
      }
    }

    returnRef.current = null;
    onExitRef.current?.();
  }, [applyRange, duration, pause, play, seek]);

  const preview = useCallback(() => {
    const current = rangeRef.current;

    if (!current) {
      return;
    }

    seek(current.start);
    play();
  }, [play, seek]);

  const togglePreview = useCallback(() => {
    if (playingRef.current) {
      pause();
      return;
    }

    preview();
  }, [pause, preview]);

  const setBoundary = useCallback(
    (which: LoopBoundary, time: number) => {
      const previous = rangeRef.current;

      if (!previous) {
        return;
      }

      const snapped = snapBoundary(time, which);

      if (!snapped) {
        return;
      }

      applyRange(clampRange(which, snapped.time, previous));
    },
    [applyRange, clampRange, snapBoundary],
  );

  const settleBoundary = useCallback(
    (which: LoopBoundary) => {
      const current = rangeRef.current;

      if (!current) {
        return;
      }

      // Dropping a handle auditions the boundary it chose: the start plays from
      // the top of the line, the end lands just inside it so the last words —
      // and the join back to the start — are what you hear.
      seek(
        which === "start"
          ? current.start
          : Math.max(current.start, current.end - END_HANDLE_TAIL_SECONDS),
      );
    },
    [seek],
  );

  const nudgeBoundary = useCallback(
    (which: LoopBoundary, delta: number) => {
      const previous = rangeRef.current;

      if (!previous) {
        return;
      }

      const from = which === "start" ? previous.startIndex : previous.endIndex;
      const next = Math.min(Math.max(from + delta, 0), lines.length - 1);
      const line = lines[next];

      if (!line) {
        return;
      }

      applyRange(
        clampRange(which, which === "start" ? line.start : line.end, previous),
      );
    },
    [applyRange, clampRange, lines],
  );

  const extendTo = useCallback(
    (time: number) => {
      const previous = rangeRef.current;

      if (!previous) {
        return;
      }

      const line = lineAtTime(time) ?? nearestLine(time);

      if (!line) {
        return;
      }

      // Tapping a line in the text grows the section around it, which is the
      // fastest way to pick "from here to there" while reading along.
      if (line.start < previous.start) {
        applyRange(clampRange("start", line.start, previous));
        return;
      }

      if (line.end > previous.end) {
        applyRange(clampRange("end", line.end, previous));
      }
    },
    [applyRange, clampRange, lineAtTime, nearestLine],
  );

  // ── The wrap itself ───────────────────────────────────────────────────────
  // Deliberately keyed on the mode alone: the section is read from the ref, so
  // dragging a handle across a line boundary does not restart the clock.
  useEffect(() => {
    if (mode === "off" || !rangeRef.current) {
      return;
    }

    let frame = 0;
    let last = readTime();
    let inside = last >= rangeRef.current.start && last < rangeRef.current.end;
    let settleUntil = 0;

    const wrap = () => {
      const section = rangeRef.current;

      if (!section) {
        return;
      }

      settleUntil = performance.now() + WRAP_SETTLE_MS;
      inside = true;
      last = section.start;
      seek(section.start);
    };

    const tick = () => {
      frame = requestAnimationFrame(tick);

      const now = performance.now();
      const section = rangeRef.current;
      const time = readTime();

      // The section was dropped under us — the playhead is free again.
      if (!section) {
        return;
      }

      // Paused, the loop is only a place on the timeline.
      if (!playingRef.current) {
        last = time;
        inside = time >= section.start && time < section.end;
        return;
      }

      // The seek we just asked for has not landed yet.
      if (now < settleUntil) {
        last = time;
        return;
      }

      const sought = Math.abs(time - last) > SEEK_JUMP_SECONDS;

      last = time;

      if (sought) {
        inside = time >= section.start && time < section.end;

        // A committed loop owns the playhead: landing after it sends you back to
        // its head, while landing before it simply plays into the section.
        if (mode === "active" && time >= section.end) {
          wrap();
        }

        return;
      }

      if (time >= section.end) {
        // While the section is still being chosen only a listening pass wraps:
        // seeking away to audition something else must not be yanked back.
        if (mode === "active" || inside) {
          wrap();
        }

        return;
      }

      inside = time >= section.start;
    };

    frame = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(frame);
  }, [mode, readTime, seek]);

  return useMemo(
    () => ({
      mode,
      range,
      lines,
      canLoop,
      returnPosition,
      begin,
      commit,
      edit,
      exit,
      preview,
      togglePreview,
      setBoundary,
      settleBoundary,
      nudgeBoundary,
      extendTo,
    }),
    [
      mode,
      range,
      lines,
      canLoop,
      returnPosition,
      begin,
      commit,
      edit,
      exit,
      preview,
      togglePreview,
      setBoundary,
      settleBoundary,
      nudgeBoundary,
      extendTo,
    ],
  );
};
