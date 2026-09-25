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

/** How close to its own start a wrap counts as landed. */
const WRAP_LAND_SLACK = 0.4;
/** If a wrap has not landed by now the player needs a nudge. */
const WRAP_TIMEOUT_MS = 1200;
/** A jump in the clock this big is a seek, not playback. */
const SEEK_JUMP_SECONDS = 0.9;
/** A clock that has not moved for this long is not playing, whatever else says. */
const STILL_MS = 400;
/**
 * How long after a wrap the coarse loop is held off, so the two layers cannot
 * send the playhead back twice for the same crossing.
 */
const WRAP_GUARD_MS = 400;
/**
 * How long the precise clocks have to have been quiet before the coarse one is
 * believed. Longer than a frame, shorter than a progress tick.
 */
const COARSE_GRACE_MS = 250;
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

/**
 * `quiet` is a section looping with the player left alone: no picker, no strip,
 * no zoomed bar — a saved loop you tapped from the middle of a chapter and want
 * to hear again, not a section you are editing.
 */
export type DynamicLoopMode = "off" | "quiet" | "selecting" | "active";

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
  /** How many transcripts the reader has starred (via the repeat button). */
  selectionCount: number;
  /** Load a saved loop and loop it. False when it cannot be honoured. */
  playSavedLoop: (saved: { start: number; end: number }) => boolean;
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
  /**
   * Drop the loop and stay exactly where you are, still playing. Turning a loop
   * off is not a move: it should carry on from where it had got to.
   */
  stop: () => void;
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
  selection,
  duration,
  currentTime,
  playing,
  playerRef,
  seek,
  play,
  pause,
  onEnter,
  onExit,
  onCommit,
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
  /** The transcripts the reader has starred: the section to loop. */
  selection?: any[];
  onEnter?: () => void;
  /** Called once the playhead is back where it was. */
  onExit?: () => void;
  /**
   * Called when a section is committed and playback is started for it, so the
   * transport can show "playing" without waiting to be told by the player.
   */
  onCommit?: () => void;
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

  /**
   * The starred transcripts, as the section they describe.
   *
   * This is the reader's own selection — the repeat button beside a transcript
   * — and it is the section the loop button loops. Matching is by start time
   * because a starred line and the timed line it came from are the same line,
   * even when one of them has been clipped to the length of the file.
   */
  const selectionStarts = useMemo(
    () =>
      (selection || [])
        .map((line: any) => Number(line?.start))
        .filter((start) => Number.isFinite(start)),
    [selection],
  );

  const selectionRange = useMemo((): DynamicLoopRange | null => {
    if (selectionStarts.length === 0 || lines.length === 0) {
      return null;
    }

    const starred = lines.filter((line) =>
      selectionStarts.some((start) => Math.abs(start - line.start) < 0.05),
    );

    if (starred.length === 0) {
      return null;
    }

    const startIndex = starred[0].index;
    const endIndex = starred[starred.length - 1].index;

    return {
      start: lines[startIndex].start,
      end: lines[endIndex].end,
      startIndex,
      endIndex,
    };
  }, [lines, selectionStarts]);

  const selectionCount = selectionRange
    ? selectionRange.endIndex - selectionRange.startIndex + 1
    : 0;

  const rangeRef = useRef<DynamicLoopRange | null>(range);
  const playingRef = useRef(playing);
  const timeRef = useRef(currentTime);
  const returnRef = useRef<{ time: number; playing: boolean } | null>(null);
  const onEnterRef = useRef(onEnter);
  const onExitRef = useRef(onExit);
  const onCommitRef = useRef(onCommit);

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
    onCommitRef.current = onCommit;
  }, [onEnter, onExit, onCommit]);

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

  /**
   * The media element itself, when there is one to be had.
   *
   * `getInternalPlayer` is react-player's own door to it; the nested
   * `player.player` is the same element one layer in. The loop asks this element
   * for its clock, its `paused`, and writes its `currentTime` directly — because
   * that is what is actually playing, and none of it can drift out of step the
   * way a copy of the state can. A player with no element behind it (a YouTube
   * embed, say) answers null.
   */
  const getMedia = useCallback((): HTMLMediaElement | null => {
    const candidates = [
      () => playerRef?.current?.getInternalPlayer?.("player"),
      () => playerRef?.current?.getInternalPlayer?.(),
      () => playerRef?.current?.player?.player,
    ];

    for (const candidate of candidates) {
      try {
        const media = candidate();

        if (media && typeof media.currentTime === "number") {
          return media as HTMLMediaElement;
        }
      } catch (err) {
        // Try the next shape.
      }
    }

    return null;
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

    // Whatever is already looping is what the picker opens on — the quiet
    // section, the starred transcripts, or failing both the line being played,
    // which is always a real section — one line — rather than an empty range.
    const seeded =
      rangeRef.current ??
      selectionRange ??
      (line
        ? {
            start: line.start,
            end: line.end,
            startIndex: line.index,
            endIndex: line.index,
          }
        : null);

    if (!seeded) {
      return;
    }

    returnRef.current = { time, playing: playingRef.current };
    setReturnPosition(time);
    applyRange(seeded);
    setMode("selecting");
    onEnterRef.current?.();
  }, [
    applyRange,
    canLoop,
    lineAtTime,
    lines,
    nearestLine,
    readTime,
    selectionRange,
  ]);

  /**
   * Loop the starred transcripts, now.
   *
   * Starring a transcript with the repeat button beside it *is* choosing a
   * section, so this is what a tap on the loop button does with them: the same
   * section the picker would open on, committed and playing. Nothing is
   * cleared — the selection stays, ready to be looped again or changed.
   */
  /** Loops a section that is already known: from its top, right now. */
  const playRange = useCallback(
    (section: DynamicLoopRange) => {
      const time = readTime();

      returnRef.current = { time, playing: playingRef.current };
      setReturnPosition(time);
      applyRange(section);
      setMode("active");
      onEnterRef.current?.();
      // From the top of the section: you asked to loop it, so you hear all of
      // it — and playback is asked for explicitly, the way the transcript list
      // view loops, because a seek on its own can leave a player stopped.
      seek(section.start);
      play();
      onCommitRef.current?.();

      return true;
    },
    [applyRange, play, readTime, seek],
  );

  /**
   * Loads a saved loop and starts looping it.
   *
   * Its own boundaries are honoured exactly as they were saved; only the line
   * numbers are worked out again, because the transcriptions may have been re-cut
   * since, and the wrong line numbers would only mislabel the section.
   */
  const playSavedLoop = useCallback(
    (saved: { start: number; end: number }): boolean => {
      if (!canLoop) {
        return false;
      }

      // Quiet unless the picker is actually open. Clicking a saved loop while
      // one is already looping quietly must switch the loop, not escalate into
      // the dynamic view — the only way in there is holding the loop button.
      const quiet = mode === "off" || mode === "quiet";

      const limit = duration > 0 ? duration : saved.end;
      const start = Math.max(0, Math.min(saved.start, limit));
      const end = Math.min(
        limit,
        Math.max(saved.end, start + MIN_SECTION_SECONDS),
      );

      if (!(end > start)) {
        return false;
      }

      const section = {
        start,
        end,
        startIndex: indexForTime(start, 0),
        endIndex: indexForTime(Math.max(start, end - LINE_SLACK), 0),
      };

      // From the regular view, tapping a saved loop loops it and nothing else:
      // the player you were looking at stays exactly as it was, with the section
      // marked on it. Only from inside the dynamic loop does it take over the
      // bar and the strip, because there it already has them.
      if (quiet) {
        const time = readTime();

        returnRef.current = { time, playing: playingRef.current };
        setReturnPosition(time);
        applyRange(section);
        setMode("quiet");
        onEnterRef.current?.();
        seek(section.start);
        play();
        onCommitRef.current?.();

        return true;
      }

      playRange(section);

      return true;
    },
    [applyRange, canLoop, duration, indexForTime, mode, play, playRange, readTime, seek],
  );

  const commit = useCallback(() => {
    const current = rangeRef.current;

    if (!current) {
      return;
    }

    setMode("active");
    // From the top: you asked to loop a section, so you hear all of it.
    seek(current.start);
    play();
    onCommitRef.current?.();
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

  /**
   * The other way out of a section: no seek, no change of transport state — the
   * playhead simply carries on from wherever the loop had reached. This is what
   * switching a loop off means, as opposed to leaving it, which puts you back
   * where you started.
   */
  const stop = useCallback(() => {
    // Cleared first, and synchronously: the frame loop reads the ref, so nothing
    // can send the playhead back to the top in the gap before the next render.
    applyRange(null);
    setMode("off");
    setReturnPosition(null);
    returnRef.current = null;
    onExitRef.current?.();
  }, [applyRange]);

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
  // Three clocks, one decision. The element's own `timeupdate` and the frame
  // clock are the precise pair; react-player's progress tick is the coarse one
  // that keeps the loop honest in a background tab, where requestAnimationFrame
  // is throttled to a standstill and `timeupdate` slows down — and listening to
  // an audiobook in a background tab is the whole point of an audiobook.
  //
  // The element is also the authority: its clock, its `paused`, and its
  // `currentTime` written directly, with no player object in between.
  const watchRef = useRef<{
    /** What the state belongs to; a different section starts a different state. */
    key: string;
    last: number;
    lastMovedAt: number;
    /** Time of the last reading from a clock that cannot be stale. */
    preciseAt: number;
    inside: boolean;
    /** A wrap that has been asked for and not yet seen on the clock. */
    wrapping: boolean;
    wrapDeadline: number;
    endedAt: number;
  } | null>(null);

  /** The live decision, handed to whichever clock fires. */
  const enforceRef = useRef<((time: number, coarse?: boolean) => void) | null>(
    null,
  );

  /** When the playhead was last sent back to the top of the section. */
  const lastWrapAtRef = useRef(0);

  /**
   * Sends the playhead back to the start of the section, and asks for playback.
   *
   * The seek goes through the player exactly the way the transcript list view has
   * always done it — that is the path that is known to work — and `play()` is
   * called *unconditionally* afterwards. A seek on its own can leave a player
   * stopped where it was, which is what "the audio stops at the end of the loop"
   * was: it never came back.
   */
  const wrapToStart = useCallback(
    (start: number) => {
      lastWrapAtRef.current = performance.now();
      seek(start);

      // If the element did not take the seek, write it directly as well.
      const media = getMedia();

      if (media) {
        try {
          if (Math.abs(media.currentTime - start) > 0.5) {
            media.currentTime = start;
          }
        } catch (err) {
          // The player's own seek is all we have.
        }
      }

      play();
    },
    [getMedia, play, seek],
  );

  /**
   * The loop the transcript list view has always used, kept as the guarantee.
   *
   * Every time the player reports a position past the end of the section, the
   * playhead goes back to its start. Ten times a second is coarse, but it is
   * driven by the player's own progress ticks — which keep coming whatever the
   * tab is doing and whatever the element looks like — and it is the exact
   * mechanism that loops the starred transcripts in the list view today.
   *
   * It deliberately does not ask whether the audio is playing: the reported time
   * only moves when it is, and asking is how a loop ends up gated behind a flag
   * that lies. It also does not ask which mode the section is in — a section is
   * being looped the moment it exists, whether it is being previewed from the
   * picker or committed and left to run, exactly as starred transcripts loop in
   * the list view.
   */
  useEffect(() => {
    if (mode === "off" || !range) {
      return;
    }

    if (currentTime <= range.end) {
      return;
    }

    // The precise engine has just wrapped; do not wrap it a second time.
    if (performance.now() - lastWrapAtRef.current < WRAP_GUARD_MS) {
      return;
    }

    wrapToStart(range.start);
  }, [currentTime, mode, range, wrapToStart]);

  useEffect(() => {
    if (mode === "off") {
      return;
    }

    const section = rangeRef.current;

    if (!section) {
      return;
    }

    const key = `${mode}:${section.start}:${section.end}`;

    if (!watchRef.current || watchRef.current.key !== key) {
      const now = performance.now();
      const time = readTime();

      watchRef.current = {
        key,
        last: time,
        lastMovedAt: now,
        preciseAt: now,
        inside: time >= section.start && time < section.end,
        wrapping: false,
        wrapDeadline: 0,
        endedAt: 0,
      };
    }

    let frame = 0;
    /** The element the listeners are on, so it can be followed when it changes. */
    let attached: HTMLMediaElement | null = null;

    const wrap = (state: NonNullable<typeof watchRef.current>, now: number) => {
      const current = rangeRef.current;

      if (!current) {
        return;
      }

      state.wrapping = true;
      state.wrapDeadline = now + WRAP_TIMEOUT_MS;
      state.inside = true;
      state.last = current.start;
      wrapToStart(current.start);
    };

    const enforce = (time: number, coarse = false) => {
      const state = watchRef.current;

      if (!state) {
        return;
      }

      const now = performance.now();
      const current = rangeRef.current;

      // The section was dropped under us — the playhead is free again.
      if (!current) {
        return;
      }

      // The precise clocks are alive, so the coarse one stays out of the way.
      if (coarse && now - state.preciseAt < COARSE_GRACE_MS) {
        return;
      }

      if (!coarse) {
        state.preciseAt = now;
      }

      const media = getMedia();

      if (Math.abs(time - state.last) > 0.001) {
        state.lastMovedAt = now;
      }

      // The element decides whether the section should be running at all; a
      // player that cannot be asked is judged by whether its clock is moving,
      // which is the only thing a loop actually cares about.
      const running = media ? !media.paused : now - state.lastMovedAt < STILL_MS;

      // Playing out the end of the file stops the element outright, and a
      // section that ends there would otherwise never come round again.
      if (media?.ended) {
        if (now - state.endedAt > WRAP_TIMEOUT_MS) {
          state.endedAt = now;
          state.last = time;
          wrap(state, now);
        }

        return;
      }

      // Stopped: the loop is only a place on the timeline, never a seek.
      if (!running) {
        state.wrapping = false;
        state.inside = time >= current.start && time < current.end;
        state.last = time;
        return;
      }

      // Waiting for a wrap to land. One wrap is one seek however long the player
      // takes to honour it — asking again every frame is what makes a loop
      // stutter at its own boundary instead of looping over it. Landing is
      // judged on the element's clock, which is why any clock can release this.
      if (state.wrapping) {
        const actual = media ? media.currentTime : time;

        const landed =
          actual <= current.start + WRAP_LAND_SLACK ||
          actual < state.last - SEEK_JUMP_SECONDS;

        if (landed) {
          state.wrapping = false;
          state.inside = true;
          state.last = actual;
          return;
        }

        // The seek went through and nothing came of it: ask for playback too.
        if (now > state.wrapDeadline) {
          state.wrapping = false;
          play();
        }

        state.last = time;
        return;
      }

      const sought = Math.abs(time - state.last) > SEEK_JUMP_SECONDS;

      state.last = time;

      if (sought) {
        state.inside = time >= current.start && time < current.end;

        // A committed loop owns the playhead: landing after it sends you back to
        // its head, while landing before it simply plays into the section.
        if (mode === "active" && time >= current.end) {
          wrap(state, now);
        }

        return;
      }

      if (time >= current.end) {
        // While the section is still being chosen only a listening pass wraps:
        // seeking away to audition something else must not be yanked back.
        if (mode === "active" || state.inside) {
          wrap(state, now);
        }

        return;
      }

      state.inside = time >= current.start;
    };

    enforceRef.current = enforce;

    /** A reading taken from the element: never stale, whatever the tab is doing. */
    const onElementReading = () => {
      const media = getMedia();

      if (media) {
        enforce(media.currentTime);
      }
    };

    const attach = () => {
      const media = getMedia();

      if (!media || media === attached) {
        return;
      }

      if (attached) {
        attached.removeEventListener("timeupdate", onElementReading);
        attached.removeEventListener("seeked", onElementReading);
        attached.removeEventListener("ended", onElementReading);
      }

      attached = media;
      media.addEventListener("timeupdate", onElementReading);
      media.addEventListener("seeked", onElementReading);
      media.addEventListener("ended", onElementReading);
    };

    attach();

    const attachTimer = setInterval(attach, 500);

    const tick = () => {
      frame = requestAnimationFrame(tick);

      const media = getMedia();

      enforce(media ? media.currentTime : readTime());
    };

    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      clearInterval(attachTimer);

      enforceRef.current = null;

      if (attached) {
        attached.removeEventListener("timeupdate", onElementReading);
        attached.removeEventListener("seeked", onElementReading);
        attached.removeEventListener("ended", onElementReading);
      }
    };
  }, [getMedia, mode, play, readTime, wrapToStart]);

  // react-player reports its position ten times a second through its own timer,
  // and unlike a frame clock that timer keeps running in a background tab. It is
  // the safety net the frame loop cannot be.
  useEffect(() => {
    if (mode === "off") {
      return;
    }

    enforceRef.current?.(currentTime, true);
  }, [currentTime, mode]);

  return useMemo(
    () => ({
      mode,
      range,
      lines,
      canLoop,
      selectionCount,
      playSavedLoop,
      returnPosition,
      begin,
      commit,
      edit,
      exit,
      stop,
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
      selectionCount,
      playSavedLoop,
      returnPosition,
      begin,
      commit,
      edit,
      exit,
      stop,
      preview,
      togglePreview,
      setBoundary,
      settleBoundary,
      nudgeBoundary,
      extendTo,
    ],
  );
};
