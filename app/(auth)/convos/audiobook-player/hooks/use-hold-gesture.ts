"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/**
 * A press and hold, with a live progress value you can draw a ring with.
 *
 * Three things make a long press survive a browser:
 *
 * 1. The pointer is captured on the element, so a hold is never handed over to
 *    the scroller halfway through (and touch is told not to scroll at all).
 * 2. Moving further than `driftTolerance` cancels the gesture — that is the way
 *    out of a hold you did not mean to start, on touch especially.
 * 3. The click that follows a release is swallowed, so a tap can never fire
 *    twice; a click that arrives with *no* pointer behind it is the keyboard's,
 *    and that one is treated as a tap.
 *
 * The progress lives in a ref on purpose: the ring reads it once per frame and
 * writes straight to the DOM, so holding a button for a second does not
 * re-render the transport a hundred and eighty times.
 */

type Options = {
  /** How long the pointer has to stay down before the hold completes. */
  holdMs: number;
  /** Called once the hold completes (the pointer is still down). */
  onComplete?: () => void;
  /** Called on a release short enough to read as a tap. */
  onTap?: () => void;
  /**
   * Anything longer than this is a hold that did not finish: nothing happens.
   * Kept well under the hold itself — a press in between is a press the user
   * backed out of, not a tap — but not so short that a deliberate tap misses.
   */
  tapMs?: number;
  /** How far the pointer may wander before the gesture gives up, in px. */
  driftTolerance?: number;
  /**
   * Turns the *hold* off — no ring, no completion. A tap still works, which is
   * what lets one button carry a plain action and a long press that is only
   * available sometimes.
   */
  holdDisabled?: boolean;
};

export const useHoldGesture = ({
  holdMs,
  onComplete,
  onTap,
  tapMs = 400,
  driftTolerance = 28,
  holdDisabled = false,
}: Options) => {
  /** 0 → 1 while the pointer is down; read by the ring, never by render. */
  const progressRef = useRef(0);
  /** True from the moment the pointer lands until it lifts (or completes). */
  const [holding, setHolding] = useState(false);
  /** Bumped on every completed hold, so the ring can replay its burst. */
  const [burst, setBurst] = useState(0);

  const frameRef = useRef(0);
  const startedAtRef = useRef(0);
  const originRef = useRef({ x: 0, y: 0 });
  const pointerRef = useRef({ x: 0, y: 0 });
  const isDownRef = useRef(false);
  const swallowClickRef = useRef(false);

  // The gesture outlives the render that started it, so everything it calls is
  // read from a ref instead of captured.
  const configRef = useRef({
    holdMs,
    tapMs,
    driftTolerance,
    onComplete,
    onTap,
    holdDisabled,
  });

  useEffect(() => {
    configRef.current = {
      holdMs,
      tapMs,
      driftTolerance,
      onComplete,
      onTap,
      holdDisabled,
    };
  }, [holdMs, tapMs, driftTolerance, onComplete, onTap, holdDisabled]);

  const stopFrame = useCallback(() => {
    if (frameRef.current) {
      cancelAnimationFrame(frameRef.current);
      frameRef.current = 0;
    }
  }, []);

  useEffect(() => stopFrame, [stopFrame]);

  const abort = useCallback(() => {
    stopFrame();
    isDownRef.current = false;
    progressRef.current = 0;
    setHolding(false);
  }, [stopFrame]);

  const complete = useCallback(() => {
    stopFrame();
    isDownRef.current = false;
    // Left at 1 on purpose: the ring stays drawn for a beat after a completed
    // hold, which is what makes it read as "done" rather than "cancelled".
    progressRef.current = 1;
    setHolding(false);
    setBurst((value) => value + 1);
    configRef.current.onComplete?.();
  }, [stopFrame]);

  const release = useCallback(
    (event: React.PointerEvent<HTMLElement>) => {
      if (!isDownRef.current) {
        return;
      }

      if (event.currentTarget.hasPointerCapture?.(event.pointerId)) {
        event.currentTarget.releasePointerCapture?.(event.pointerId);
      }

      const elapsed = performance.now() - startedAtRef.current;

      abort();

      if (elapsed <= configRef.current.tapMs) {
        configRef.current.onTap?.();
      }
    },
    [abort],
  );

  const onPointerDown = useCallback(
    (event: React.PointerEvent<HTMLElement>) => {
      const { holdDisabled: noHold, holdMs: hold } = configRef.current;

      if (isDownRef.current || event.button > 0) {
        return;
      }

      // The press is tracked even when the hold is unavailable: the release
      // still has to decide whether this was a tap.
      event.currentTarget.setPointerCapture?.(event.pointerId);

      isDownRef.current = true;
      swallowClickRef.current = true;
      originRef.current = { x: event.clientX, y: event.clientY };
      pointerRef.current = { x: event.clientX, y: event.clientY };
      startedAtRef.current = performance.now();

      if (noHold || hold <= 0) {
        return;
      }

      progressRef.current = 0;
      setHolding(true);

      const tick = (now: number) => {
        const { driftTolerance: drift, holdMs: duration } = configRef.current;
        const dx = pointerRef.current.x - originRef.current.x;
        const dy = pointerRef.current.y - originRef.current.y;

        if (Math.hypot(dx, dy) > drift) {
          abort();
          return;
        }

        const progress = Math.min((now - startedAtRef.current) / duration, 1);

        progressRef.current = progress;

        if (progress >= 1) {
          complete();
          return;
        }

        frameRef.current = requestAnimationFrame(tick);
      };

      frameRef.current = requestAnimationFrame(tick);
    },
    [abort, complete],
  );

  const onPointerMove = useCallback((event: React.PointerEvent<HTMLElement>) => {
    if (!isDownRef.current) {
      return;
    }

    pointerRef.current = { x: event.clientX, y: event.clientY };
  }, []);

  const onPointerUp = useCallback(
    (event: React.PointerEvent<HTMLElement>) => release(event),
    [release],
  );

  const onPointerCancel = useCallback(
    (event: React.PointerEvent<HTMLElement>) => {
      if (
        isDownRef.current &&
        event.currentTarget.hasPointerCapture?.(event.pointerId)
      ) {
        event.currentTarget.releasePointerCapture?.(event.pointerId);
      }

      abort();
    },
    [abort],
  );

  const onClick = useCallback(() => {
    // A click left over from the pointer gesture: already handled.
    if (swallowClickRef.current) {
      swallowClickRef.current = false;
      return;
    }

    // A click with no pointer behind it is the keyboard's.
    configRef.current.onTap?.();
  }, []);

  const onContextMenu = useCallback((event: React.MouseEvent<HTMLElement>) => {
    // Long pressing a button on touch would otherwise raise the callout menu at
    // exactly the moment the hold is supposed to complete.
    event.preventDefault();
  }, []);

  return {
    progressRef,
    holding,
    burst,
    handlers: {
      onPointerDown,
      onPointerMove,
      onPointerUp,
      onPointerCancel,
      onClick,
      onContextMenu,
    },
  };
};
