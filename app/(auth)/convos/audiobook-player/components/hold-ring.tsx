"use client";

import { useEffect, useRef } from "react";

/**
 * The ring that fills around the loop button while it is held.
 *
 * It is driven the same way the playhead is: one requestAnimationFrame loop
 * writing `strokeDashoffset` and `opacity` straight to the node, so a three
 * second hold costs no React renders at all. The progress itself belongs to
 * `useHoldGesture` — this component only draws it, and owns the two touches
 * that make the gesture feel finished: the ring stays drawn for a beat when the
 * hold completes, and a cancelled hold rewinds instead of blinking out.
 */

/** A completed hold keeps the ring on screen this long before it retracts. */
const SETTLE_MS = 170;
/** How quickly a cancelled hold rewinds (per second, exponential). */
const REWIND_RATE = 9;

const RADIUS = 18;
const SIZE = 44;

export type HoldRingTone = "start" | "stop";

const TONE_COLORS: Record<HoldRingTone, string> = {
  /** Enabling the dynamic loop — the player's accent. */
  start: "#6366f1",
  /** Leaving it, which puts you back where you were. */
  stop: "#f59e0b",
};

const HOLD_RING_CSS = `
@keyframes mn-hold-burst {
  from { opacity: 0.55; transform: scale(0.86); }
  to { opacity: 0; transform: scale(1.85); }
}

.mn-hold-burst {
  animation: mn-hold-burst 560ms cubic-bezier(0.22, 1, 0.36, 1) forwards;
}

@media (prefers-reduced-motion: reduce) {
  .mn-hold-burst {
    animation-duration: 1ms;
  }
}
`;

export const HoldRing = ({
  progressRef,
  active,
  burst,
  tone,
}: {
  /** Live 0 → 1 progress, owned by the gesture hook. */
  progressRef: React.MutableRefObject<number>;
  /** True while the pointer is down. */
  active: boolean;
  /** Increments once per completed hold. */
  burst: number;
  tone: HoldRingTone;
}) => {
  const circleRef = useRef<SVGCircleElement | null>(null);
  const displayedRef = useRef(0);
  const settleUntilRef = useRef(0);
  const activeRef = useRef(active);

  const color = TONE_COLORS[tone];

  useEffect(() => {
    activeRef.current = active;

    if (active) {
      return;
    }

    // A hold that ran to the end leaves the progress at 1: keep the ring there
    // for a beat so the completion is legible, then let the loop retract it.
    if (progressRef.current >= 0.99) {
      displayedRef.current = 1;
      settleUntilRef.current = performance.now() + SETTLE_MS;
    }
  }, [active, progressRef]);

  useEffect(() => {
    if (!active && displayedRef.current === 0) {
      return;
    }

    let frame = 0;
    let last = performance.now();

    const draw = () => {
      const circle = circleRef.current;

      if (!circle) {
        return;
      }

      const displayed = displayedRef.current;

      circle.style.strokeDashoffset = `${1 - displayed}`;
      circle.style.opacity = `${Math.min(1, displayed * 5)}`;
    };

    const tick = (now: number) => {
      const dt = Math.min(Math.max((now - last) / 1000, 0.001), 0.05);
      last = now;

      if (activeRef.current) {
        // While the finger is down the ring *is* the clock: no easing, or a
        // one second hold would report itself as shorter than it was.
        displayedRef.current = Math.min(Math.max(progressRef.current, 0), 1);
      } else if (now < settleUntilRef.current) {
        displayedRef.current = 1;
      } else {
        const displayed = displayedRef.current;

        if (displayed <= 0.002) {
          displayedRef.current = 0;
          draw();
          return;
        }

        displayedRef.current = displayed - displayed * Math.min(1, dt * REWIND_RATE);
      }

      draw();
      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(frame);
  }, [active, progressRef]);

  return (
    <>
      <style>{HOLD_RING_CSS}</style>

      <svg
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        aria-hidden
        className="pointer-events-none absolute inset-0 h-full w-full -rotate-90"
      >
        <circle
          ref={circleRef}
          cx={SIZE / 2}
          cy={SIZE / 2}
          r={RADIUS}
          fill="none"
          stroke={color}
          strokeWidth={2.5}
          strokeLinecap="round"
          pathLength={1}
          strokeDasharray="1"
          strokeDashoffset={1}
          style={{ opacity: 0 }}
        />
      </svg>

      {/* The completion flash: remounted per burst, so the keyframe replays. */}
      {burst > 0 && (
        <span
          key={burst}
          aria-hidden
          className="mn-hold-burst pointer-events-none absolute inset-0 rounded-full border-2"
          style={{ borderColor: color }}
        />
      )}
    </>
  );
};
