"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  STAGE_ANCHOR,
  STAGE_BOTTOM_SPACER,
  STAGE_INTRO_ANCHOR,
  STAGE_MANUAL_SCROLL_GRACE,
  STAGE_MAX_SCROLL_SPEED,
  STAGE_SPRING_DAMPING,
  STAGE_SPRING_STIFFNESS,
  STAGE_TOP_SPACER,
} from "../components/karaoke/stage-tuning";

/**
 * How every line of the sheet is marked up. One attribute carries its position
 * in the book, the other marks the line the audio is on — the same contract the
 * sing-along sheet uses, which is what lets this loop drive either of them.
 */
export const LINE_ATTRIBUTE = "data-r-line";
export const ACTIVE_LINE_ATTRIBUTE = "data-r-line-active";

/**
 * Lines that go in with the first paint: the playhead's own neighbourhood.
 * Everything else arrives afterwards, so opening a long book never blocks the
 * thread that is playing the audio behind it.
 */
const INITIAL_BEFORE = 30;
const INITIAL_AFTER = 60;
/** ...and how much of the book is added per pass once the reader is up. */
const MOUNT_STEP = 200;

/** Below this the sheet counts as settled and stops being written to. */
const SETTLED_DISTANCE = 0.4;
const SETTLED_VELOCITY = 8;
/** Reading `scrollTop` forces a style flush, so it is trusted for a few frames. */
const RESYNC_FRAMES = 12;

export type MountedLines = { start: number; end: number };

/**
 * Index of the line the audio is on: the one that started most recently.
 *
 * Deliberately the sing-along rule rather than "the line whose start/end
 * brackets the playhead": it survives the small silences between sentences, it
 * survives content whose `end` is missing or wrong, and it means the sheet has
 * something to follow from the first sentence onwards.
 */
export const findActiveLineIndex = (lines: any[], time: number): number => {
  let result = -1;

  for (let index = 0; index < lines.length; index++) {
    const start = Number(lines[index]?.start);

    if (!Number.isFinite(start)) {
      continue;
    }

    if (start > time) {
      break;
    }

    result = index;
  }

  return result;
};

/**
 * Turns a list of lines into a self-scrolling sheet.
 *
 * The reader hands this the whole book and the index of the line being read;
 * it hands back the ref for the scroll stage, the spacers that let the first
 * and last line reach the anchor, the range of lines currently in the DOM, and
 * whether the sheet is still following the audio. The sheet then takes care of
 * itself: it glides on a spring so the line being read stays parked at
 * `STAGE_ANCHOR` of the stage, stands still while the reader scrolls by hand,
 * and picks up again when they stop.
 *
 * Every height that appears *above* the line being read — a batch of lines
 * arriving, a late font, a reflow — is measured and absorbed before the browser
 * paints, so the line under the reader's eye never drifts.
 */
export const useFollowStage = ({
  bookKey,
  total,
  activeIndex,
  enabled = true,
  anchor = STAGE_ANCHOR,
}: {
  /** Identifies the book: changing it restarts the mounting passes. */
  bookKey: string;
  /** How many lines the book has. */
  total: number;
  /** Index of the line being read, or -1 before the first one starts. */
  activeIndex: number;
  enabled?: boolean;
  /** Fraction of the stage height the line being read is parked at. */
  anchor?: number;
}) => {
  const stageRef = useRef<HTMLDivElement | null>(null);
  const [stageHeight, setStageHeight] = useState(0);
  const [following, setFollowing] = useState(true);
  const [mounted, setMounted] = useState<MountedLines>(() => ({
    start: Math.max(0, (activeIndex < 0 ? 0 : activeIndex) - INITIAL_BEFORE),
    end: Math.min(total, (activeIndex < 0 ? 0 : activeIndex) + INITIAL_AFTER),
  }));

  /** Content-space scrollTop that centres the line being read (pre-paint). */
  const desiredRef = useRef<number | null>(null);
  /** Where we believe the scroll is, without reading it every frame. */
  const virtualRef = useRef<number | null>(null);
  const resyncInRef = useRef(0);
  const positionedRef = useRef(false);
  const manualScrollUntilRef = useRef(0);
  const followingRef = useRef(true);
  /** The line we measured last commit, for absorbing shifts above it. */
  const measuredRef = useRef<{ el: HTMLElement; top: number } | null>(null);

  // ── Stage height: drives both the spacers and the anchor ───────────────────
  useLayoutEffect(() => {
    const stage = stageRef.current;

    if (!stage) {
      return;
    }

    setStageHeight(stage.clientHeight);

    if (typeof ResizeObserver === "undefined") {
      return;
    }

    const observer = new ResizeObserver(() => setStageHeight(stage.clientHeight));

    observer.observe(stage);

    return () => observer.disconnect();
  }, []);

  // ── First pass: the lines around the playhead ──────────────────────────────
  const openedForRef = useRef<string | null>(null);

  useEffect(() => {
    if (total === 0) {
      return;
    }

    if (!enabled) {
      setMounted((previous) =>
        previous.start === 0 && previous.end === total
          ? previous
          : { start: 0, end: total },
      );
      return;
    }

    if (openedForRef.current === bookKey) {
      return;
    }

    openedForRef.current = bookKey;
    positionedRef.current = false;
    measuredRef.current = null;

    const centre = activeIndex < 0 ? 0 : activeIndex;

    setMounted({
      start: Math.max(0, centre - INITIAL_BEFORE),
      end: Math.min(total, centre + INITIAL_AFTER),
    });
  }, [bookKey, enabled, total, activeIndex]);

  // ── A seek lands anywhere, including past what is mounted ─────────────────
  // The sheet re-opens around the playhead instead of crawling to it: without
  // this, jumping forward would leave the audio on a line that is not on the
  // sheet at all, and the follow loop would have nothing to anchor to.
  useEffect(() => {
    if (!enabled || total === 0 || activeIndex < 0) {
      return;
    }

    setMounted((previous) => {
      if (activeIndex >= previous.start && activeIndex < previous.end) {
        return previous;
      }

      const span = INITIAL_BEFORE + INITIAL_AFTER;
      const start = Math.max(0, activeIndex - INITIAL_BEFORE);

      return { start, end: Math.min(total, start + span) };
    });
  }, [enabled, total, activeIndex]);

  // ── Then the rest of the book, a pass at a time ────────────────────────────
  useEffect(() => {
    if (!enabled || total === 0) {
      return;
    }

    if (mounted.start <= 0 && mounted.end >= total) {
      return;
    }

    const extend = () => {
      setMounted((previous) => {
        // Ahead first: that is where the audio is heading, and adding lines
        // below the playhead never moves what is already on screen.
        if (previous.end < total) {
          return {
            start: previous.start,
            end: Math.min(total, previous.end + MOUNT_STEP),
          };
        }

        if (previous.start > 0) {
          return { start: Math.max(0, previous.start - MOUNT_STEP), end: previous.end };
        }

        return previous;
      });
    };

    // On an idle frame where the browser offers one: mounting a batch of lines
    // is real work, and it must not land in the middle of a glide.
    const idle = (window as any).requestIdleCallback;

    if (typeof idle === "function") {
      const handle = idle(extend, { timeout: 500 });

      return () => (window as any).cancelIdleCallback?.(handle);
    }

    const handle = setTimeout(extend, 32);

    return () => clearTimeout(handle);
  }, [enabled, mounted, total]);

  // ── Anchor the line being read ─────────────────────────────────────────────
  // Measurements happen once per commit, before the browser paints; the frame
  // loop that follows them is pure arithmetic plus a single scrollTop write.
  useLayoutEffect(() => {
    const stage = stageRef.current;

    if (!stage || !enabled || total === 0) {
      return;
    }

    const active = stage.querySelector<HTMLElement>(
      `[${ACTIVE_LINE_ATTRIBUTE}="1"]`,
    );
    // Before the first line starts there is nothing active yet: anchor the
    // first line instead, so the sheet is positioned and waits for the audio.
    const target =
      active ??
      (activeIndex < 0
        ? stage.querySelector<HTMLElement>(`[${LINE_ATTRIBUTE}]`)
        : null);

    if (!target) {
      return;
    }

    const top = target.offsetTop;
    const measured = measuredRef.current;

    // Absorb anything that moved above the line we are following — a batch of
    // lines arriving, a font settling, a reflow — before it is painted.
    if (measured && measured.el === target && top !== measured.top) {
      stage.scrollTop += top - measured.top;
      virtualRef.current = null;
    }

    measuredRef.current = { el: target, top };

    const desired =
      top +
      target.offsetHeight / 2 -
      stage.clientHeight * (activeIndex < 0 ? STAGE_INTRO_ANCHOR : anchor);

    desiredRef.current = desired;

    // First positioning lands on the line being read instead of gliding through
    // the whole book to reach it — and it waits for the spacers to have been
    // measured, so that first landing is already in the right place.
    if (!positionedRef.current && stageHeight > 0) {
      positionedRef.current = true;
      stage.scrollTop = desired;
      virtualRef.current = desired;
    }
  });

  // ── The glide ─────────────────────────────────────────────────────────────
  useEffect(() => {
    if (!enabled) {
      return;
    }

    let frame = 0;
    let velocity = 0;
    let last = performance.now();

    const reduceMotion =
      typeof window !== "undefined" &&
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const loop = (now: number) => {
      frame = requestAnimationFrame(loop);

      const stage = stageRef.current;
      const dt = Math.min(Math.max((now - last) / 1000, 0.001), 0.05);
      last = now;

      if (!stage) {
        return;
      }

      // While the reader is scrolling by hand the sheet is theirs; the loop
      // only keeps its bookkeeping honest so following resumes from there.
      if (now < manualScrollUntilRef.current) {
        if (followingRef.current) {
          followingRef.current = false;
          setFollowing(false);
        }

        velocity = 0;
        virtualRef.current = null;
        return;
      }

      if (!followingRef.current) {
        followingRef.current = true;
        setFollowing(true);
      }

      const desired = desiredRef.current;

      if (desired === null) {
        return;
      }

      // Trust our own bookkeeping between syncs: reading scrollTop every frame
      // would force a style flush right after writing it.
      if (virtualRef.current === null || resyncInRef.current <= 0) {
        virtualRef.current = stage.scrollTop;
        resyncInRef.current = RESYNC_FRAMES;
      }

      resyncInRef.current -= 1;

      const error = desired - virtualRef.current;

      if (Math.abs(error) < SETTLED_DISTANCE && Math.abs(velocity) < SETTLED_VELOCITY) {
        velocity = 0;
        virtualRef.current = desired;
        return;
      }

      // A jump is not a fast glide: a seek, or a jump back from far down the
      // book, should land rather than fly through everything in between.
      if (reduceMotion || Math.abs(error) > stage.clientHeight * 1.5) {
        velocity = 0;
        virtualRef.current = desired;
        stage.scrollTop = desired;
        return;
      }

      const steps = Math.max(1, Math.ceil(dt / (1 / 120)));
      const step = dt / steps;

      for (let index = 0; index < steps; index++) {
        const acceleration =
          error * STAGE_SPRING_STIFFNESS - velocity * STAGE_SPRING_DAMPING;

        velocity += acceleration * step;
        velocity = Math.max(
          Math.min(velocity, STAGE_MAX_SCROLL_SPEED),
          -STAGE_MAX_SCROLL_SPEED,
        );
      }

      virtualRef.current += velocity * dt;
      stage.scrollTop = virtualRef.current;
    };

    frame = requestAnimationFrame(loop);

    return () => cancelAnimationFrame(frame);
  }, [enabled]);

  const pauseFollowing = useCallback(
    (duration = STAGE_MANUAL_SCROLL_GRACE) => {
      manualScrollUntilRef.current = performance.now() + duration;
    },
    [],
  );

  /** Hand the sheet back to the audio, wherever the reader has scrolled to. */
  const resumeFollowing = useCallback(() => {
    manualScrollUntilRef.current = 0;
  }, []);

  const onManualScroll = useCallback(() => {
    pauseFollowing();
  }, [pauseFollowing]);

  return {
    stageRef,
    topSpacer: Math.max(stageHeight * STAGE_TOP_SPACER, 0),
    bottomSpacer: Math.max(stageHeight * STAGE_BOTTOM_SPACER, 0),
    /** The part of the book currently in the DOM. */
    mounted,
    following,
    onManualScroll,
    resumeFollowing,
  };
};
