"use client";

import { useEffect, useRef } from "react";

type PlayerLike = { current: any } | undefined | null;

type SmoothPlayheadOptions = {
  /** react-player ref — used as the high resolution clock when available. */
  playerRef?: PlayerLike;
  /** Current time pushed by react-player (~10 updates/second). */
  currentTime: number;
  isPlaying: boolean;
};

/**
 * A ~60fps playhead.
 *
 * `onProgress` only fires every 100ms, which is what makes the old karaoke view
 * step instead of glide. We keep a requestAnimationFrame clock that follows the
 * player itself when we can read it, and otherwise extrapolates from the last
 * progress tick — always easing into the reported value so a real seek still
 * lands exactly.
 *
 * Returns a ref (not state) on purpose: the lyric fill loop reads it every frame
 * and writes straight to the DOM, so nothing re-renders at 60fps.
 */
export const useSmoothPlayhead = ({
  playerRef,
  currentTime,
  isPlaying,
}: SmoothPlayheadOptions) => {
  const timeRef = useRef<number>(currentTime || 0);
  const propsRef = useRef({
    time: currentTime || 0,
    isPlaying,
    at: 0,
  });

  useEffect(() => {
    propsRef.current = {
      time: Number.isFinite(currentTime) ? currentTime : 0,
      isPlaying,
      at: performance.now(),
    };
  }, [currentTime, isPlaying]);

  useEffect(() => {
    let frame = 0;
    let last = performance.now();

    const tick = (now: number) => {
      frame = requestAnimationFrame(tick);

      const dt = Math.min(Math.max((now - last) / 1000, 0.001), 0.12);
      last = now;

      const {
        time: reportedTime,
        isPlaying: playing,
        at: reportedAt,
      } = propsRef.current;

      let playerTime: number | null = null;

      try {
        const raw = playerRef?.current?.getCurrentTime?.();

        if (typeof raw === "number" && Number.isFinite(raw)) {
          playerTime = raw;
        }
      } catch (err) {
        playerTime = null;
      }

      // The player's own clock is the truth, but a freshly mounted video player
      // can report nonsense before it is ready. Distrust it only while the
      // reported time is still *fresh* — once the callback has gone quiet, the
      // player is the only thing that knows about a seek we were not told about.
      const reportIsStale = now - reportedAt > 250;

      if (
        playerTime === null ||
        !playing ||
        (Math.abs(playerTime - reportedTime) > 2.5 && !reportIsStale)
      ) {
        playerTime = null;
      }

      const elapsed = Math.max(0, (now - reportedAt) / 1000);
      const extrapolated = reportedTime + (playing ? Math.min(elapsed, 0.6) : 0);
      const target = playerTime ?? extrapolated;

      const current = timeRef.current;
      const diff = target - current;

      if (Math.abs(diff) < 0.0005) {
        return;
      }

      // A seek is a jump, not a fast-forward: snapping here matters because a
      // glide would walk the highlight through every line in between (and make
      // the whole lyric sheet animate in a burst).
      if (Math.abs(diff) > 0.75) {
        timeRef.current = target;
        return;
      }

      // Otherwise ease into the reported time so playback glides instead of
      // stepping once every progress tick.
      const responsiveness = 9;

      timeRef.current = current + diff * Math.min(1, dt * responsiveness);
    };

    frame = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(frame);
  }, [playerRef]);

  return timeRef;
};
