"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent as ReactPointerEvent,
} from "react";

/**
 * How much of a panel stays on screen when it is pushed to an edge. Dragging a
 * panel halfway off the screen and losing it there is the one thing this must
 * not allow, so the clamp keeps a sliver in view at all times.
 */
const EDGE_MARGIN = 8;

/**
 * Where the panel sits once it has been moved. Judging by `null` — "nobody has
 * moved me" — is how the layout keeps its own place for a panel that has never
 * been dragged; carrying the width along is what keeps it from shrinking to fit
 * the room left to the right of its left edge once it is out of the layout.
 */
interface PanelPlacement {
  x: number;
  y: number;
  width: number;
}

/**
 * Drags a floating panel around the viewport.
 *
 * Nothing happens until the pointer actually moves: the placement stays `null`
 * while the panel sits where the layout put it — bottom of the screen, centred
 * — so a tap on the handle is only a tap, and only a real drag takes the panel
 * out of the layout and gives it its own coordinates. From then on it is
 * clamped to the viewport, and re-clamped when the window shrinks under it, so
 * it cannot be thrown off screen and lost.
 *
 * Pointer events carry mouse, pen and touch down one path, and the handle takes
 * pointer capture, so a drag keeps following the pointer even when it slips off
 * the handle.
 */
export function usePanelDrag() {
  const panelRef = useRef<HTMLDivElement | null>(null);
  const [placement, setPlacement] = useState<PanelPlacement | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  // Where the pointer grabbed the panel, so it moves with the pointer instead
  // of jumping its corner to the pointer, and the panel's size at that moment,
  // which is the size it keeps while it is out of the layout.
  const grabRef = useRef<{
    pointerId: number;
    offsetX: number;
    offsetY: number;
    width: number;
    x: number;
    y: number;
  } | null>(null);

  const clampToViewport = useCallback(
    (next: { x: number; y: number; width: number }): PanelPlacement => {
      const panel = panelRef.current;
      const height = panel?.offsetHeight ?? 0;

      // A panel wider (or taller) than the screen has no range to slide in: it
      // pins to the top-left margin and may overhang, which is still reachable.
      const maxX = Math.max(
        EDGE_MARGIN,
        window.innerWidth - next.width - EDGE_MARGIN,
      );
      const maxY = Math.max(
        EDGE_MARGIN,
        window.innerHeight - height - EDGE_MARGIN,
      );

      return {
        x: Math.min(Math.max(next.x, EDGE_MARGIN), maxX),
        y: Math.min(Math.max(next.y, EDGE_MARGIN), maxY),
        width: next.width,
      };
    },
    [],
  );

  const onPointerDown = useCallback((event: ReactPointerEvent<HTMLElement>) => {
    // A mouse drags with its left button only; touches and pens have no
    // buttons. The panel's own controls stay usable from the handle area.
    if (event.pointerType === "mouse" && event.button !== 0) {
      return;
    }

    if (
      (event.target as HTMLElement).closest("button, a, input, textarea, select")
    ) {
      return;
    }

    const panel = panelRef.current;
    if (!panel) {
      return;
    }

    const rect = panel.getBoundingClientRect();

    grabRef.current = {
      pointerId: event.pointerId,
      offsetX: event.clientX - rect.left,
      offsetY: event.clientY - rect.top,
      width: rect.width,
      x: rect.left,
      y: rect.top,
    };

    setIsDragging(true);

    try {
      event.currentTarget.setPointerCapture(event.pointerId);
    } catch {
      // Capture is an optimisation: without it the drag still follows the
      // pointer, it just stops at the edges of the handle.
    }

    // Keeps the browser from starting a text selection or a scroll instead.
    event.preventDefault();
  }, []);

  const onPointerMove = useCallback(
    (event: ReactPointerEvent<HTMLElement>) => {
      const grab = grabRef.current;
      if (!grab || grab.pointerId !== event.pointerId) {
        return;
      }

      // The panel leaves the layout here, on the first movement, and not on the
      // press: a tap on the handle must leave it where the layout had it.
      setPlacement(
        clampToViewport({
          x: event.clientX - grab.offsetX,
          y: event.clientY - grab.offsetY,
          width: grab.width,
        }),
      );
    },
    [clampToViewport],
  );

  const endDrag = useCallback((event: ReactPointerEvent<HTMLElement>) => {
    const grab = grabRef.current;
    if (!grab || grab.pointerId !== event.pointerId) {
      return;
    }

    grabRef.current = null;
    setIsDragging(false);

    if (event.currentTarget.hasPointerCapture?.(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  }, []);

  // A panel that has been moved is out of the layout, so a window that shrinks
  // under it would leave it hanging off an edge it can no longer fit against.
  const hasPlacement = placement !== null;
  useEffect(() => {
    if (!hasPlacement) {
      return;
    }

    const reclamp = () => {
      setPlacement((previous) =>
        previous ? clampToViewport(previous) : previous,
      );
    };

    window.addEventListener("resize", reclamp);
    return () => {
      window.removeEventListener("resize", reclamp);
    };
  }, [hasPlacement, clampToViewport]);

  /** Puts the panel back where the layout had it, centred at the bottom. */
  const reset = useCallback(() => {
    grabRef.current = null;
    setIsDragging(false);
    setPlacement(null);
  }, []);

  const handleProps = useMemo(
    () => ({
      onPointerDown,
      onPointerMove,
      onPointerUp: endDrag,
      onPointerCancel: endDrag,
      // Capture can be lost (a system gesture, a window losing focus); the drag
      // ends there rather than sticking to the pointer afterwards.
      onLostPointerCapture: endDrag,
      // A double tap drops the panel back to its home, for when it has been
      // dragged somewhere unhelpful.
      onDoubleClick: reset,
    }),
    [onPointerDown, onPointerMove, endDrag, reset],
  );

  const style: CSSProperties | undefined = placement
    ? { left: placement.x, top: placement.y, width: placement.width }
    : undefined;

  return { panelRef, handleProps, style, isDragging, hasPlacement, reset };
}
